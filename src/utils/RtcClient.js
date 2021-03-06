import FirebaseSignallingClient from "./FirebaseSignallingClient";

export default class RtcClient {
  constructor(remoteVideoRef, setRtcClient) {
    const config = {
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.firebaseSignallingClient = new FirebaseSignallingClient();
    this.localPeerName = "";
    this.remotePeerName = "";
    this.remoteVideoRef = remoteVideoRef;
    this._setRtcClient = setRtcClient;
    this.mediaStream = null;
  }

  setRtcClient() {
    this._setRtcClient(this);
  }

  async getUserMedia() {
    try {
      const constraints = { audio: true, video: true };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.error(error);
    }
  }

  async setMediaStream() {
    await this.getUserMedia();
    this.addTracks();
    this.setRtcClient();
  }

  addTracks() {
    this.addAudioTrack();
    this.addVideoTrack();
  }

  addAudioTrack() {
    this.rtcPeerConnection.addTrack(this.audioTrack, this.mediaStream);
  }

  addVideoTrack() {
    this.rtcPeerConnection.addTrack(this.videoTrack, this.mediaStream);
  }

  get audioTrack() {
    return this.mediaStream.getAudioTracks()[0];
  }

  get videoTrack() {
    return this.mediaStream.getVideoTracks()[0];
  }

  async offer() {
    const sessionDescription = await this.createOffer();
    await this.setLocalDescription(sessionDescription);
    await this.sendOffer();
  }

  async createOffer() {
    try {
      return await this.rtcPeerConnection.createOffer();
    } catch (e) {
      console.error(e);
    }
  }

  async setLocalDescription(sessionDescription) {
    try {
      await this.rtcPeerConnection.setLocalDescription(sessionDescription);
    } catch (e) {
      console.error(e);
    }
  }

  async sendOffer() {
    this.firebaseSignallingClient.setPeerNames(
      this.localPeerName,
      this.remotePeerName
    );

    await this.firebaseSignallingClient.sendOffer(this.localDescription);
  }

  setOntrack() {
    this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
      if (rtcTrackEvent.track.kind !== "video") return;

      const remoteMediaStream = rtcTrackEvent.streams[0];
      this.remoteVideoRef.current.srcObject = remoteMediaStream;
      this.setRtcClient();
    };

    this.setRtcClient();
  }

  async answer(sender, sessionDescription) {
    this.remotePeerName = sender;
    this.setOnicecandidateCallback();
    this.setOntrack();
    //???????????????sessionDescription?????????
    await this.setRemoteDesctiption(sessionDescription);
    const answer = await this.rtcPeerConnection.createAnswer();
    await this.rtcPeerConnection.setLocalDescription(answer);
    await this.sendAnswer();
  }

  async connect(remotePeerName) {
    try {
      this.remotePeerName = remotePeerName;
      this.setOnicecandidateCallback();
      this.setOntrack();
      await this.offer();
      this.setRtcClient();
    } catch (e) {
      console.error(e);
    }
  }

  async setRemoteDesctiption(sessionDescription) {
    await this.rtcPeerConnection.setRemoteDescription(sessionDescription);
  }

  async sendAnswer() {
    this.firebaseSignallingClient.setPeerNames(
      this.localPeerName,
      this.remotePeerName
    );

    await this.firebaseSignallingClient.sendAnswer(this.localDescription);
  }

  async saveReceiverdSessionDescription(sessionDescription) {
    try {
      await this.sessionDescription(sessionDescription);
    } catch (e) {
      console.error(e);
    }
  }

  get localDescription() {
    return this.rtcPeerConnection.localDescription.toJSON();
  }

  async addIceCandidate(candidate) {
    try {
      const iceCandidate = new RTCIceCandidate(candidate);
      await this.rtcPeerConnection.addIceCandidate(iceCandidate);
    } catch (e) {
      console.error(e);
    }
  }

  setOnicecandidateCallback() {
    this.rtcPeerConnection.onicecandidate = async ({ candidate }) => {
      if (candidate) {
        console.log({ candidate });
        await this.firebaseSignallingClient.sendCandidate(candidate.toJSON());
        //todo:remote???candidate???????????????
      }
    };
  }

  async startListening(localPeerName) {
    this.localPeerName = localPeerName;
    this.setRtcClient();
    await this.firebaseSignallingClient.remove(localPeerName);
    this.firebaseSignallingClient.database
      .ref(localPeerName)
      .on("value", async (snapshot) => {
        const data = snapshot.val();
        if (data === null) return;

        console.log({ data });
        const { candidate, sender, sessionDescription, type } = data;
        switch (type) {
          case "offer":
            await this.answer(sender, sessionDescription);
            break;
          case "answer":
            await this.saveReceiverdSessionDescription(sessionDescription);
            break;
          case "candidate":
            await this.addIceCandidate(candidate);
            break;
          default:
            this.setRtcClient();
            break;
        }
      });
  }
}

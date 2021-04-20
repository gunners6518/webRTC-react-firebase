import FirebaseSignalingClient from "./FirebaseSignalingClient";

export default class RtcClient {
  constructor(remoteVideoRef, setRtcClient) {
    const config = {
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.firebaseSignallingClient = new FirebaseSignalingClient();
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
    this.addAudioTracks();
    this.addVideoTracks();
  }

  addAudioTracks() {
    this.rtcPeerConnection.addTrack(this.audioTrack, this.mediaStream);
  }

  addVideoTracks() {
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
      console.log(e);
    }
  }

  async setLocalDescription(sessionDescription) {
    try {
      await this.rtcPeerConnection.setLocalDescription(sessionDescription);
    } catch (e) {
      console.log(e);
    }
  }

  async sendOffer() {
    this.firebaseSignallingClient.setPeerNames(
      this.localPeerName,
      this.remotePeerName
    );

    this.firebaseSignallingClient.sendOffer(this.localDescription);
  }

  senOnTrack() {
    this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
      if (rtcTrackEvent.track.kind !== "video") return;
      const trackMediaStream = rtcTrackEvent.stream[0];
      this.remoteVideoRef.current.srcObject = trackMediaStream;
      this.setRtcClient();
    };

    this.setRtcClient();
  }

  async connect(remotePeerName) {
    this.remotePeerName = remotePeerName;
    this.setOnicecandidateCallback();
    this.senOnTrack();
    await this.offer();
    this.setRtcClient();
  }

  get localDescription() {
    return this.rtcPeerConnection.localDescription.toJSON();
  }

  setOnicecandidateCallback() {
    this.rtcPeerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        //todo:remoteにcandidateを通知する
      }
    };
  }

  startListening(localPeerName) {
    this.localPeerName = localPeerName;
    this.setrtcClient();
    this.FirebaseSignalingClient.database
      .ref(localPeerName)
      .on("value", (snapshot) => {
        const data = snapshot.val();
      });
  }
}

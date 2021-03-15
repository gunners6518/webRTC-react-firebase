export default class RtcCliant {
  constructor(setRtcCliant) {
    const config = {
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.localPeerName = "";
    this.remotePeerName = "";
    this._setRtcCliant = setRtcCliant;
    this.mediaStream = null;
  }

  setRtcCliant() {
    this._setRtcCliant(this);
  }

  async getUserMedia() {
    try {
      const constraints = {
        audio: true,
        video: true,
      };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.log(error);
    }
  }

  startListening(localPeerName) {
    this.localPeerName = localPeerName;
    this.setRtcCliant();
    //todo:ここにシグナリングサーバーをリッスンする処理を追加する
  }
}

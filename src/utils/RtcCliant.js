export default class RtcCliant {
  constructor(setRtcCliant) {
    const config = {
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.localPeerName = "";
    this.remotePeerName = "";
    this._setRtcCliant = setRtcCliant;
  }

  setRtcCliant() {
    this._setRtcCliant(this);
  }
}

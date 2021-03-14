export default class RtcCliant {
  constructor() {
    const config = {
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.localPeerName = "";
    this.remotePeerName = "";
  }
}

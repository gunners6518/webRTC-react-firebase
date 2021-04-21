import firebase from "firebase/app";
import "firebase/database";

export default class FirebaseSignallingClient {
  constructor() {
    // const {
    //   REACT_APP_FIREBASE_API_KEY,
    //   REACT_APP_FIREBASE_AUTH_DOMAIN,
    //   REACT_APP_FIREBASE_DATABASE_URL,
    //   REACT_APP_FIREBASE_PROJECT_ID,
    //   REACT_APP_FIREBASE_STORAGE_BUCKET,
    //   REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    //   REACT_APP_FIREBASE_APP_ID,
    // } = process.env;

    const firebaseConfig = {
      apiKey: "AIzaSyA7QapM88YWKtagltgPN3mVFLazgy-kKEM",
      authDomain: "webrtc-react-firebase-f6ee6.firebaseapp.com",
      databaseURL:
        "https://webrtc-react-firebase-f6ee6-default-rtdb.firebaseio.com",
      projectId: "webrtc-react-firebase-f6ee6",
      storageBucket: "webrtc-react-firebase-f6ee6.appspot.com",
      messagingSenderId: "480725052719",
      appId: "1:480725052719:web:fc99afd823cbe6370bc5da",
    };
    if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();
    this.localPeerName = "";
    this.remotePeerName = "";
  }

  setPeerNames(localPeerName, remotePeerName) {
    this.localPeerName = localPeerName;
    this.remotePeerName = remotePeerName;
  }

  get targetRef() {
    return this.database.ref(this.remotePeerName);
  }

  async sendOffer(sessionDescription) {
    await this.targetRef.set({
      type: "offer",
      sender: this.localPeerName,
      sessionDescription,
    });
  }

  async sendAnswer(sessionDescription) {
    await this.targetRef.set({
      type: "answer",
      sender: this.localPeerName,
      sessionDescription,
    });
  }

  async remove(path) {
    await this.database.ref(path).remove();
  }

  async sendCandidate(candidate) {
    await this.targetRef.set({
      type: "candidate",
      sender: this.localPeerName,
      candidate,
    });
  }

  async remove(path) {
    await this.database.ref(path).remove();
  }
}

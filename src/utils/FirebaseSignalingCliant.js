import firebase from "firebase/app";
import "firebase/database";

export default class FirebaseSignalingCliant {
  constructor() {
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
}

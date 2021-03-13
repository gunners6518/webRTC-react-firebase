import React, { useState } from "react";
import { InputFormLocal } from "./InputFormLocal";
import { InputFormRemote } from "./InputFormRemote";
import { VideoArea } from "./VideoArea";

//カメラと音声の許可をブラウザで求める
const getMedia = async () => {
  const constraints = {
    audio: true,
    video: true,
  };
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
    /* ストリームを使用 */
  } catch (err) {
    /* エラーを処理 */
    console.log(err);
  }
};

getMedia();

const App = () => {
  const [localPeerName, setLocalPeerName] = useState("");
  const [remotePeerName, setRemotePeerName] = useState("");
  return (
    <>
      <InputFormLocal
        localPeerName={localPeerName}
        setLocalPeerName={setLocalPeerName}
      />
      <InputFormRemote
        remotePeerName={remotePeerName}
        setRemotePeerName={setRemotePeerName}
        localPeerName={localPeerName}
      />
      <VideoArea />
    </>
  );
};

export default App;

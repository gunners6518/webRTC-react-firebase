import React from "react";
import InputFormLocal from "./InputFormLocal";
import InputFormRemote from "./InputFormRemote";

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
  return (
    <>
      <InputFormLocal />
      <InputFormRemote />
    </>
  );
};

export default App;

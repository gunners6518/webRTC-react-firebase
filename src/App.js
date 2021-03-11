import React from "react";

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
  return <div>Hello, React!</div>;
};

export default App;

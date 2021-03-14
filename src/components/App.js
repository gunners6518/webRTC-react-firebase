import React from "react";
import { InputFormLocal } from "./InputFormLocal";
import { InputFormRemote } from "./InputFormRemote";
import { VideoArea } from "./VideoArea";
import RtcCliant from "../utils/RtcCliant";

const App = () => {
  const rtcCliant = new RtcCliant();
  console.log({ rtcCliant });
  return (
    <>
      <InputFormLocal rtcCliant={rtcCliant} />
      <InputFormRemote rtcCliant={rtcCliant} />
      <VideoArea rtcCliant={rtcCliant} />
    </>
  );
};

export default App;

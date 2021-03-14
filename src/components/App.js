import React, { useReducer, useState } from "react";
import { InputFormLocal } from "./InputFormLocal";
import { InputFormRemote } from "./InputFormRemote";
import { VideoArea } from "./VideoArea";
import RtcCliant from "../utils/RtcCliant";

const App = () => {
  const [rtcCliant, _setRtcCliant] = useState(new RtcCliant());
  const [, forceRender] = useReducer((boolean) => !boolean, false);

  const setRtcCliant = (rtcCliant) => {
    _setRtcCliant(rtcCliant);
    forceRender();
  };

  return (
    <>
      <InputFormLocal rtcCliant={rtcCliant} setRtcCliant={setRtcCliant} />
      <InputFormRemote rtcCliant={rtcCliant} setRtcCliant={setRtcCliant} />
      <VideoArea rtcCliant={rtcCliant} />
    </>
  );
};

export default App;

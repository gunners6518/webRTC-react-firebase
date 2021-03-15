import React from "react";
import { InputForms } from "./InputForms";
import { VideoArea } from "./VideoArea";
import { useRtcCliant } from "./hooks/useRtcCliant";

export const App = () => {
  const rtcCliant = useRtcCliant();

  return (
    <>
      <InputForms rtcCliant={rtcCliant} />
      <VideoArea rtcCliant={rtcCliant} />
    </>
  );
};

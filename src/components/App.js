import React from "react";
import { InputForms } from "./InputForms";
import { VideoArea } from "./VideoArea";
import useRtcClient from "./hooks/useRtcClient";

export const App = () => {
  const rtcClient = useRtcClient();

  return (
    <>
      <InputForms rtcClient={rtcClient} />
      <VideoArea rtcClient={rtcClient} />
    </>
  );
};

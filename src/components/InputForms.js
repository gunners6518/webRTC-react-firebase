import React from "react";
import { InputFormLocal } from "./InputFormLocal";
import { InputFormRemote } from "./InputFormRemote";

export const InputForms = ({ rtcClient }) => {
  if (rtcClient === null) return <></>;
  return (
    <>
      <InputFormLocal rtcClient={rtcClient} />
      <InputFormRemote rtcClient={rtcClient} />
    </>
  );
};

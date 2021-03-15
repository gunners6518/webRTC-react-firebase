import React from "react";
import { InputFormLocal } from "./InputFormLocal";
import { InputFormRemote } from "./InputFormRemote";

export const InputForms = ({ rtcCliant }) => {
  if (rtcCliant === null) return <></>;
  return (
    <>
      <InputFormLocal rtcCliant={rtcCliant} />
      <InputFormRemote rtcCliant={rtcCliant} />
    </>
  );
};

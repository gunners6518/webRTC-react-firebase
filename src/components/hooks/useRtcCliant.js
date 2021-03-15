import React, { useReducer, useState, useEffect } from "react";
import RtcCliant from "../../utils/RtcCliant";

export const useRtcCliant = () => {
  const [rtcCliant, _setRtcCliant] = useState(null);
  const [, forceRender] = useReducer((boolean) => !boolean, false);

  const setRtcCliant = (rtcCliant) => {
    _setRtcCliant(rtcCliant);
    forceRender();
  };

  useEffect(() => {
    const cliant = new RtcCliant(setRtcCliant);
    cliant.setRtcCliant();
  }, []);

  return rtcCliant;
};

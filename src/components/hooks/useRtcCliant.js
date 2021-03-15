import { useReducer, useState, useEffect } from "react";
import rtcClient from "../../utils/rtcClient";

export const usertcClient = () => {
  const [rtcClient, _setrtcClient] = useState(null);
  const [, forceRender] = useReducer((boolean) => !boolean, false);

  const setrtcClient = (rtcClient) => {
    _setrtcClient(rtcClient);
    forceRender();
  };

  useEffect(() => {
    const init = async () => {
      const cliant = new rtcClient(setrtcClient);
      await cliant.getUserMedia();
      cliant.setrtcClient();
    };
    init();
  }, []);

  return rtcClient;
};

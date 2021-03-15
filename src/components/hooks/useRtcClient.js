import { useEffect, useReducer, useRef, useState } from "react";

import RtcClient from "../../utils/RtcClient";

const useRtcClient = () => {
  const [rtcClient, _setRtcClient] = useState(null);
  const remoteVideoRef = useRef(null);
  const [, forceRender] = useReducer((boolean) => !boolean, false);

  const setRtcClient = (rtcClient) => {
    _setRtcClient(rtcClient);
    forceRender();
  };

  useEffect(() => {
    const init = async () => {
      const Client = new RtcClient(remoteVideoRef, setRtcClient);
      await Client.setMediaStream();
    };

    init();
  }, []);

  return rtcClient;
};

export default useRtcClient;

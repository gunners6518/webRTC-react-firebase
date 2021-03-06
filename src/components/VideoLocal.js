import React, { useEffect, useRef } from "react";

import { Video } from "./Video";

export const VideoLocal = ({ rtcClient }) => {
  const videoRef = useRef(null);
  const currentVideoRef = videoRef.current;
  const mediaStream = rtcClient.mediaStream;

  useEffect(() => {
    if (currentVideoRef === null) return;
    //カメラと音声の許可をブラウザで求める
    const getMedia = () => {
      try {
        currentVideoRef.srcObject = mediaStream;
      } catch (err) {
        console.error(err);
      }
    };

    getMedia();
  }, [currentVideoRef, mediaStream]);

  return (
    <div>
      <Video
        isLocal={true}
        name={rtcClient.localPeerName}
        videoRef={videoRef}
      ></Video>
    </div>
  );
};

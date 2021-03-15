import React, { useEffect, useRef } from "react";

import { Video } from "./Video";

export const VideoLocal = ({ rtcCliant }) => {
  const videoRef = useRef(null);
  let currentVideoRef = videoRef.currrent;
  const mediaStream = rtcCliant.mediaStream;

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
        name={rtcCliant.localPeerName}
        videoRef={videoRef}
      ></Video>
    </div>
  );
};

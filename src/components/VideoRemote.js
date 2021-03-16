import React from "react";
import { Video } from "./Video";

export const VideoRemote = ({ rtcClient }) => {
  const videoRef = rtcClient.remoteVideoRef;

  return (
    <div>
      <Video
        isLocal={false}
        name={rtcClient.remotePeerName}
        videoRef={videoRef}
      ></Video>
    </div>
  );
};

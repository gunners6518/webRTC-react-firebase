import React from "react";
import { Video } from "./Video";

export const VideoRemote = ({ name }) => {
  const videoRef = null;

  return (
    <div>
      <Video isLocal={false} name={name} videoRef={videoRef}></Video>
    </div>
  );
};

import React from "react";

export const Video = ({ isLocal, name, videoRef }) => {
  return (
    <div>
      <video ref={videoRef} autoPlay muted={isLocal} />
      <div>{name}</div>
    </div>
  );
};

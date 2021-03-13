import React, { useRef, useEffect } from "react";
import { Video } from "./Video";

export const VideoLocal = ({ name }) => {
  const videoRef = useRef(null);
  let currentVideoRef = videoRef.currrent;

  useEffect(() => {
    if (currentVideoRef === null) return;
    //カメラと音声の許可をブラウザで求める
    const getMedia = async () => {
      const constraints = {
        audio: true,
        video: true,
      };
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );
        videoRef.current.srcObject = mediaStream;
      } catch (err) {
        console.log(err);
      }
    };

    getMedia();
  }, [currentVideoRef]);

  return (
    <div>
      <Video isLocal={true} name={name} videoRef={videoRef}></Video>
    </div>
  );
};

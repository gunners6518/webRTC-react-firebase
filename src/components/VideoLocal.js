import React, { useRef, useEffect } from "react";

export const VideoLocal = ({ localPeerName }) => {
  const videoRef = useRef(null);
  const currentVideoRef = videoRef.currrent;

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
        currentVideoRef.srcObject = mediaStream;
      } catch (err) {
        console.log(err);
      }
    };

    getMedia();
  }, [currentVideoRef]);

  return (
    <div>
      <p> {localPeerName}</p>
    </div>
  );
};

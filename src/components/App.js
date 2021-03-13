import React, { useState } from "react";
import { InputFormLocal } from "./InputFormLocal";
import { InputFormRemote } from "./InputFormRemote";
import { VideoArea } from "./VideoArea";

const App = () => {
  const [localPeerName, setLocalPeerName] = useState("");
  const [remotePeerName, setRemotePeerName] = useState("");
  return (
    <>
      <InputFormLocal
        localPeerName={localPeerName}
        setLocalPeerName={setLocalPeerName}
      />
      <InputFormRemote
        remotePeerName={remotePeerName}
        setRemotePeerName={setRemotePeerName}
        localPeerName={localPeerName}
      />
      <VideoArea
        localPeerName={localPeerName}
        remotePeerName={remotePeerName}
      />
    </>
  );
};

export default App;

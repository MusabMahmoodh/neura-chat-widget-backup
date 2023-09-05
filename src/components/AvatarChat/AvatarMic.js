import React from "react";

import MicIcon from "../../assets/mic.svg";
const AvatarMic = () => {
  return (
    <div className="avatar-mic">
      <div className="avatar-mic-ripple"></div>
      <img className="avatar-mic-img" src={MicIcon} alt="mic" />
    </div>
  );
};

export default AvatarMic;

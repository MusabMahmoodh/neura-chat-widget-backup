//create a toggle button that will toggle the speaker on and off

import React from "react";
import SpeakeronIcon from "../../assets/speaker-on.svg";
import SpeakeroffIcon from "../../assets/speaker-off.svg";

import "./SpeakerToggleButton.scss";

const SpeakerToggleButton = ({ isSpeakerOn, toggleMic }) => {
  return (
    <div className="speaker-toggle-button" onClick={toggleMic}>
      <img className="speaker-toggle-button-icon" src={isSpeakerOn ? SpeakeronIcon : SpeakeroffIcon} alt="speaker" />
    </div>
  );
};

export default SpeakerToggleButton;

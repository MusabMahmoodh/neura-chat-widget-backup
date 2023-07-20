import React from "react";
import AgentSelect from "../AgentSelect/AgentSelect";
import SpeakerToggleButton from "../SpeakerToggle/SpeakerToggleButton";

import "./SettingsContainer.scss";

const SettingsContainer = ({ selectedAgent, updateAgent, isSpeakerOn, toggleMic }) => {
  return (
    <div className="settings-container">
      <div className="settings-wrapper">
        <div className="settings-container-header">
          {/* setting icon */}
          <span className="settings-container-header-title">Settings</span>
          {/* close icon */}
        </div>
        <div className="settings-container-body">
          <div className="settings-container-body-item">
            <p className="settings-container-body-item-title">Select Agent</p>
            <div className="settings-container-body-item-select">
              <AgentSelect agent={selectedAgent} toggleAgent={updateAgent} />
            </div>
          </div>
          <div className="settings-container-body-item">
            <p className="settings-container-body-item-title">Turn on/off Mic</p>
            <div className="settings-container-body-item-toggle">
              <SpeakerToggleButton isSpeakerOn={isSpeakerOn} toggleMic={toggleMic} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContainer;

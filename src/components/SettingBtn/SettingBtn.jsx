import React from "react";
import SettingIcon from "../../assets/settings.svg";

import "./SettingBtn.scss";

const SettingButton = ({ toggleSettings }) => {
  return (
    <div className="speaker-toggle-button" onClick={toggleSettings}>
      <img className="speaker-toggle-button-icon" src={SettingIcon} alt="settings" />
    </div>
  );
};

export default SettingButton;

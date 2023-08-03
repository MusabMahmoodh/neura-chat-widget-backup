import React from "react";
import ResetIcon from "../../assets/reset.svg";
import LogoImg from "../../assets/logo.svg";
import AiEyeLogoImg from "../../assets/AIeye.png";
import "./ConversationHeader.scss";
import SettingButton from "../SettingBtn/SettingBtn";
import { getBot } from "../../messageService";
import { BOT } from "../../constants";

const ConversationHeader = ({ remoteName, resetSession, toggleSettings }) => {
  const logo = getBot() === BOT.AIEYE ? AiEyeLogoImg : LogoImg;
  return (
    <div className="conversation-header">
      <div className="conversation-header-data">
        <img src={logo} alt={remoteName} className="conversation-header-avatar" />
        <div className="conversation-header-content">
          <p className="conversation-header-content-vendor-name">Esoft Chat Bot</p>
          <p className="conversation-header-content-subtitle">Hi there, let's start a conversation</p>
        </div>
      </div>
      <div className="conversation-header-actions">
        <div className="conversation-header-action-btn">
          <SettingButton toggleSettings={toggleSettings} />
        </div>
        <button className="conversation-header-action-btn" onClick={resetSession}>
          <img src={ResetIcon} width="20px" alt="Refresh" className="action-icon" />
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;

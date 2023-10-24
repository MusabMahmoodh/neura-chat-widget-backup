import React from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import ResetIcon from "../../assets/reset.svg";
import LogoImg from "../../assets/logo.svg";
import AiEyeLogoImg from "../../assets/AIeye.png";
import "./ConversationHeader.scss";
import SettingButton from "../SettingBtn/SettingBtn";
import { getBot } from "../../messageService";
import { BOT } from "../../constants";
import SpeakerToggleButton from "../SpeakerToggle/SpeakerToggleButton";
import { stopVoice } from "../../utils/converstionUtils";

const ConversationHeader = ({ remoteName, resetSession, toggleSettings, isSpeakerOn, toggleMic }) => {
  const { listening } = useSpeechRecognition();
  const bot = getBot();
  const logo = bot === BOT.AIEYE ? AiEyeLogoImg : LogoImg;
  const titleName =
    bot === BOT.AIEYE
      ? "AI Teaching Assistant Robot"
      : bot === BOT.DEMO_SCL
      ? "UCL"
      : bot === BOT.INSURANCE
      ? "Insurance Demoe"
      : "Esoft Chat Bot";
  const subtitle =
    bot !== BOT.AIEYE
      ? "Hi there, let's start a conversation"
      : listening
      ? "Talk to robot teacher"
      : "Text with robot teacher";

  const resetChat = () => {
    resetSession();
    stopVoice();
  };
  return (
    <div className="conversation-header">
      <div className="conversation-header-data">
        <img src={logo} alt={remoteName} className="conversation-header-avatar" />
        <div className="conversation-header-content">
          <p className="conversation-header-content-vendor-name">{titleName}</p>
          <p className="conversation-header-content-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="conversation-header-actions">
        <div className="conversation-header-action-btn">
          <SpeakerToggleButton isSpeakerOn={isSpeakerOn} toggleMic={toggleMic} />
        </div>

        <div className="conversation-header-action-btn">
          <SettingButton toggleSettings={toggleSettings} />
        </div>
        <button className="conversation-header-action-btn" onClick={resetChat}>
          <img src={ResetIcon} width="20px" alt="Refresh" className="action-icon" />
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;

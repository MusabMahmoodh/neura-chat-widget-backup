import React from "react";

import LogoImg from "../../assets/logo.svg";
import AiEyeLogoImg from "../../assets/AIeye.png";
import StartConverstionIcon from "../../assets/send.svg";
import "./WelcomeContainer.scss";
import WavingHand from "../WavingHand/WavingHand";
import { getBot } from "../../messageService";
import { BOT } from "../../constants";

const WelcomeContainer = ({ updatePage }) => {
  const logo = getBot() === BOT.AIEYE ? AiEyeLogoImg : LogoImg;
  return (
    <div className="welcome-container">
      <img src={logo} className="welcome-container-img" alt="welcome" />
      <div className="welcome-container-title">
        Hi there <WavingHand />
      </div>
      <div className="welcome-container-subtitle">Need help? Let's start a conversation!</div>
      <div className="welcome-container-button" onClick={updatePage}>
        <img className="welcome-container-button-icon" src={StartConverstionIcon} alt="chat" />
        <span className="welcome-container-button-text">New Converstaion</span>
      </div>
    </div>
  );
};

export default WelcomeContainer;

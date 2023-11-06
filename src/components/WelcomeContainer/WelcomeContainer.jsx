import React from "react";

import LogoImg from "../../assets/logo.svg";
import UCLImg from "../../assets/UCL.png";
import AiEyeLogoImg from "../../assets/AIeye.png";
import ASCII_LOGO from "../../assets/ascii.jpeg";
import StartConverstionIcon from "../../assets/send.svg";
import "./WelcomeContainer.scss";
import WavingHand from "../WavingHand/WavingHand";
import { getBot } from "../../messageService";
import { BOT } from "../../constants";

const WelcomeContainer = ({ updatePage }) => {
  const bot = getBot();
  const logo =
    bot === BOT.AIEYE ? AiEyeLogoImg : bot === BOT.DEMO_SCL ? UCLImg : bot === BOT.ASCII ? ASCII_LOGO : LogoImg;
  return (
    <div className="welcome-container">
      <img
        src={logo}
        className="welcome-container-img"
        style={{
          borderRadius: "50%",
        }}
        alt="welcome"
      />
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

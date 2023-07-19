import React from "react";

import LogoImg from "../../assets/logo.svg";
import StartConverstionIcon from "../../assets/send.svg";
import "./WelcomeContainer.scss";

const WelcomeContainer = () => {
  return (
    <div className="welcome-container">
      <img src={LogoImg} className="welcome-container-img" />
      <div className="welcome-container-title">Hi there 👋</div>
      <div className="welcome-container-subtitle">Need help? Let's start a conversation!</div>
      <div className="welcome-container-button">
        <img className="welcome-container-button-icon" src={StartConverstionIcon} alt="chat" />
        <span className="welcome-container-button-text">New Converstaion</span>
      </div>
    </div>
  );
};

export default WelcomeContainer;

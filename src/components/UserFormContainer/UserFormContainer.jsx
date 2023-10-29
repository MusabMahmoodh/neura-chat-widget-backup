import React, { useState } from "react";

import LogoImg from "../../assets/logo.svg";
import AiEyeLogoImg from "../../assets/AIeye.png";
import UCLImg from "../../assets/UCL.png";
import StartConverstionIcon from "../../assets/send.svg";

import "./UserFormContainer.scss";
import { emailValidator, nameValidator, phoneValidator } from "../../utils/inputValidator";
import { storeUserData } from "../../utils/userrUtils";
import WavingHand from "../WavingHand/WavingHand";
import AgentSelect from "../AgentSelect/AgentSelect";
import { getBot, isAvatarChat } from "../../messageService";
import { BOT } from "../../constants";
const UserFormContainer = ({ updatePage }) => {
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", inquiry: "", agent: 1 });
  const [errors, setErrors] = useState({ name: "", email: "", phone: "", inquiry: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const bot = getBot();
  const avatarChat = isAvatarChat();
  const logo = bot === BOT.AIEYE ? AiEyeLogoImg : bot === BOT.DEMO_SCL ? UCLImg : LogoImg;
  const validate = () => {
    let errors = {};
    const nameValidation = nameValidator(userData.name);
    const emailValidation = emailValidator(userData.email);
    const phoneValidation = phoneValidator(userData.phone);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.message;
    }
    if (bot !== BOT.AIEYE && !emailValidation.isValid) {
      errors.email = emailValidation.message;
    }
    if (bot !== BOT.AIEYE && !phoneValidation.isValid) {
      errors.phone = phoneValidation.message;
    }
    return errors;
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      storeUserData({ ...userData, isFirstVisit: true });
      updatePage();
    }
  };

  const welcomeMessage =
    bot === BOT.AIEYE ? "What name would you prefer to be called by?" : "Need help? Let's start a conversation!";
  return (
    <div className="user-form-container">
      <img src={logo} className="user-form-container-img" alt="logo" />
      <div className="user-form-container-title">
        Hi there <WavingHand />
      </div>
      <div className="user-form-container-subtitle">{welcomeMessage}</div>

      <form className="user-form-container-form">
        {bot !== BOT.AIEYE && (
          <label className="user-form-container-form-label" htmlFor="name">
            Name *
          </label>
        )}
        <input
          className="user-form-container-form-input"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
        />
        <div className="user-form-container-form-error">{errors.name}</div>

        <>
          <label className="user-form-container-form-label" htmlFor="email">
            Email *
          </label>
          <input
            className="user-form-container-form-input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <div className="user-form-container-form-error">{errors.email}</div>
          <label className="user-form-container-form-label" htmlFor="phone">
            Phone *
          </label>
          <input
            className="user-form-container-form-input"
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            required
            onChange={handleChange}
          />
          <div className="user-form-container-form-error">{errors.phone}</div>
          <label className="user-form-container-form-label" htmlFor="phone">
            Select agent to talk to
          </label>
        </>

        {!avatarChat && (
          <div className="user-form-container-form-select">
            <AgentSelect
              agent={userData.agent}
              toggleAgent={() =>
                setUserData((pre) => {
                  return {
                    ...pre,
                    agent: pre.agent === 1 ? 2 : 1,
                  };
                })
              }
            />
          </div>
        )}
        <div className="user-form-container-form-btn" onClick={handleSubmission}>
          <img className="user-form-container-form-btn-icon" src={StartConverstionIcon} alt="chat" />
          <span className="user-form-container-form-btn-text">Start Chat</span>
        </div>
      </form>
    </div>
  );
};

export default UserFormContainer;

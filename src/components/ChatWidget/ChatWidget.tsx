import React, { useEffect, useState } from "react";
import { WidgetContainer } from "../../WidgetContainer";

import "./ChatWidget.scss";
import WelcomeContainer from "../WelcomeContainer/WelcomeContainer";
import UserFormContainer from "../UserFormContainer/UserFormContainer";
import { OnboardStep, useUserData } from "../../useUserData";

const ChatWidget = () => {
  const [license, setLicense] = useState<string | null>(null);
  const { userData, isDataFetching, userOnoardStep, setUserOnboardStep } = useUserData();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const license = urlParams.get("license");
    setLicense(license);
  }, []);
  if (isDataFetching) {
    return <div className="widget-chat-container">Loading</div>;
  }
  if (userOnoardStep === OnboardStep.FORM_FILLING) {
    return (
      <div className="widget-chat-container">
        <UserFormContainer updatePage={() => setUserOnboardStep(OnboardStep.CHAT)} />
      </div>
    );
  }
  if (userOnoardStep === OnboardStep.CHAT) {
    return (
      <div className="widget-chat-container">
        <WidgetContainer />
      </div>
    );
  }

  return (
    <div className="widget-chat-container">
      <WelcomeContainer updatePage={() => setUserOnboardStep(OnboardStep.FORM_FILLING)} />
    </div>
  );
};

export default ChatWidget;

import React, { useEffect, useState } from "react";
import { WidgetContainer } from "../../WidgetContainer";

import "./ChatWidget.scss";
import WelcomeContainer from "../WelcomeContainer/WelcomeContainer";
import UserFormContainer from "../UserFormContainer/UserFormContainer";

const ChatWidget = () => {
  const [license, setLicense] = useState<string | null>(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const license = urlParams.get("license");
    setLicense(license);
  }, []);

  return (
    <div className="widget-chat-container">
      <UserFormContainer />
      {/* <WelcomeContainer /> */}
      {/* <WidgetContainer license={license} /> */}
    </div>
  );
};

export default ChatWidget;

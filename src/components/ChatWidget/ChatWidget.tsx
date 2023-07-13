import React, { useEffect, useState } from "react";
import { WidgetContainer } from "../../WidgetContainer";

const ChatWidget = () => {
  const [license, setLicense] = useState<string | null>(null);
  const [showWidget, setShowWidget] = useState<boolean>(false);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const license = urlParams.get("license");
    setLicense(license);
  }, []);

  return (
    <>
      {showWidget && (
        <div className="widget-chat-container">
          <WidgetContainer license={license} />
        </div>
      )}
      <button className="widget-controller-btn" onClick={() => setShowWidget((pre) => !pre)}>
        {showWidget ? "Hide" : "Show"}
      </button>
    </>
  );
};

export default ChatWidget;

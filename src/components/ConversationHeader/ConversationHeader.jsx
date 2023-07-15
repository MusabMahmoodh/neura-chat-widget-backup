import React from "react";
import ResetIcon from "../../assets/reset.svg";
import "./ConversationHeader.scss";

const ConversationHeader = ({ remoteName }) => {
  return (
    <div className="conversation-header">
      <div className="conversation-header-data">
        <img src="https://picsum.photos/200/300" alt={remoteName} className="conversation-header-avatar" />
        <div className="conversation-header-content">
          <p className="conversation-header-content-vendor-name">Esoft Chat Bot</p>
          <p className="conversation-header-content-subtitle">Hi there, let's start a conversation</p>
        </div>
      </div>
      <div className="conversation-header-actions">
        <button className="conversation-header-action-btn">
          <img src={ResetIcon} width="20px" alt="Refresh" className="action-icon" />
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;

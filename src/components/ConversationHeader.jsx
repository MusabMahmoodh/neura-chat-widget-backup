import React from "react";
import ResetIcon from "../assets/reset.svg";
const ConversationHeader = ({ remoteName }) => {
  return (
    <div className="widget-header">
      <div className="widget-header-data">
        <img src="https://picsum.photos/200/300" alt={remoteName} className="widget-header-avatar" />
        <div className="widget-header-content">
          <p className="widget-header-content-vendor-name">{remoteName}</p>
          <p className="widget-header-content-subtitle">Demo</p>
        </div>
      </div>
      <div className="widget-header-actions">
        <button className="widget-header-action-btn">
          <img src={ResetIcon} width="20px" alt="Refresh" className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;

import React from "react";

import Logo from "../../assets/ascii-logo.svg";
import "./styles.scss";
const SideBar = () => {
  return (
    <div className="avatar-chat-sidebar">
      <div className="avatar-chat-sidebar-header">
        <img src={Logo} alt="ascii-logo" width="140px" />
      </div>
      <div className="avatar-chat-sidebar-body"></div>
      <div className="avatar-chat-sidebar-footer">
        <button className="avatar-chat-sidebar-footer-button">Reset</button>
      </div>
    </div>
  );
};

export default SideBar;

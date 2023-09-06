import React from "react";

import Logo from "../../assets/ascii-logo.svg";
import "./styles.scss";
import ResponseComponent from "../ResponseComponent/ResponseComponent";
const SideBar = ({ message }) => {
  return (
    <div className="avatar-chat-sidebar">
      <div className="avatar-chat-sidebar-header">
        <img src={Logo} alt="ascii-logo" width="140px" />
      </div>
      <div className="avatar-chat-sidebar-body">
        <ResponseComponent response={message} />
      </div>
      <div className="avatar-chat-sidebar-footer">
        <button className="avatar-chat-sidebar-footer-button">Reset</button>
      </div>
    </div>
  );
};

export default SideBar;

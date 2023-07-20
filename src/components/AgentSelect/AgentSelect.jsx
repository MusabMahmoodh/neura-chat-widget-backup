import React from "react";
import MaleIcon from "../../assets/bot-boy.svg";
import FemaleIcon from "../../assets/bot-girl.svg";

import "./AgentSelect.scss";
import { stopVoice } from "../../utils/converstionUtils";

const AgentSelect = ({ agent, toggleAgent }) => {
  const wrapperClassName = (agentid) => (agent === agentid ? "agent-select__agent--selected" : "agent-select__agent");

  const agentUpdate = () => {
    stopVoice();
    toggleAgent();
  };
  return (
    <div className="agent-select">
      <div className={wrapperClassName(1)} onClick={agentUpdate}>
        <img src={MaleIcon} alt="Male agent" className="agent-select__agent-icon" />
        <span className="agent-select__agent-text">Mark</span>
      </div>
      <div className={wrapperClassName(2)} onClick={agentUpdate}>
        <img src={FemaleIcon} alt="Female agent" className="agent-select__agent-icon" />
        <span className="agent-select__agent-text">Zira</span>
      </div>
    </div>
  );
};

export default AgentSelect;

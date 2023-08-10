import React from "react";
import WeekSelectIconActive from "../../assets/WeekSelectOn.svg";
import WeekSelectIconOff from "../../assets/WeekSelectoff.svg";
import "./WeekSelect.scss";
// create an input field that allows numbers from 1 to 18
const WeekSelect = ({ onUpdate, value }) => {
  const [showInput, setShowInput] = React.useState(false);
  const toggleInput = () => {
    setShowInput((pre) => !pre);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(e.target.value);
  };
  return (
    <div className="neura-chat-week-select">
      {/* Add a button to show and hide input */}
      {showInput ? (
        <input
          value={value}
          onChange={handleUpdate}
          type="number"
          min="1"
          max="18"
          className="neura-chat-week-select-input"
        />
      ) : null}
      <button className="neura-chat-week-select-btn" onClick={toggleInput}>
        <img src={showInput ? WeekSelectIconActive : WeekSelectIconOff} alt="WeekSelect" />
      </button>
    </div>
  );
};

export default WeekSelect;

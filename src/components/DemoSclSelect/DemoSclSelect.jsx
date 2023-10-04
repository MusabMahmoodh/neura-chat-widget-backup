import React from "react";
import "./DemoSclSelect.scss";

// create an input field that allows numbers from 1 to 18

const options = ["general", "courses"];
const DemoSclSelect = ({ onUpdate, value }) => {
  const [showInput, setShowInput] = React.useState(false);
  const toggleInput = () => {
    setShowInput((pre) => !pre);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    onUpdate(e.target.value);
    setTimeout(() => {
      setShowInput(false);
    }, 500);
  };

  return (
    <div className="neura-chat-week-select">
      {/* Add a button to show and hide input */}
      {showInput ? (
        <div className="neura-chat-week-select--container">
          {options.map((option) => (
            <button
              className={option === value ? `neura-chat-week-select-btn--selected` : `neura-chat-week-select-btn`}
              key={option}
              value={option}
              onClick={handleUpdate}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
      <button className="neura-chat-week-select-toggle-btn" onClick={toggleInput}>
        ☀️
      </button>
    </div>
  );
};

export default DemoSclSelect;

import React from "react";
import WeekSelectIconActive from "../../assets/WeekSelectOn.svg";
import WeekSelectIconOff from "../../assets/WeekSelectoff.svg";
import "./WeekSelect.scss";
import { nanoid } from "nanoid";

// create an input field that allows numbers from 1 to 18

const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const WeekSelect = ({ sendMessage, onUpdate, value }) => {
  const [showInput, setShowInput] = React.useState(false);
  const toggleInput = () => {
    setShowInput((pre) => !pre);
  };

  const weekSelectedMessage = {
    _id: nanoid(),
    message: `Thank you very much. How may I help you today?`,
    sender: "remote",
    direction: "incoming",
    position: "single",
    isRead: false,
    isWeekSelectedConfirm: true,
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    onUpdate(e.target.value);
    setTimeout(() => {
      setShowInput(false);
    }, 500);
    sendMessage(weekSelectedMessage);
  };
  console.log(value);
  return (
    <div className="neura-chat-week-select">
      {/* Add a button to show and hide input */}
      {showInput ? (
        <div className="neura-chat-week-select--container">
          {weeks.map((week) => (
            <button
              className={
                Number(week) === Number(value) ? `neura-chat-week-select-btn--selected` : `neura-chat-week-select-btn`
              }
              key={week}
              value={week}
              onClick={handleUpdate}
            >
              Week-{week}
            </button>
          ))}
        </div>
      ) : null}
      <button className="neura-chat-week-select-btn" onClick={toggleInput}>
        <img src={showInput ? WeekSelectIconActive : WeekSelectIconOff} alt="WeekSelect" />
      </button>
    </div>
  );
};

export default WeekSelect;

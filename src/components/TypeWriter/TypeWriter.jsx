import React from "react";
import "./style.scss";
const TypeWriter = ({ text }) => {
  return (
    <div className="typewriter">
      <p>{text}</p>
    </div>
  );
};

export default TypeWriter;

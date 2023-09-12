import React from "react";

import "./ErrorScreen.scss";

import LimitExceedImg from "../../assets/limit-reach.gif";
const ErrorScreen: React.FC<{
  message: string;
}> = ({ message }) => {
  return (
    <div className="error-screen">
      <div className="error-screen__title">
        <h5>Error</h5>
      </div>
      <div className="error-screen__image">
        <img src={LimitExceedImg} alt="Limit Exceeded" />
      </div>
      <div className="error-screen__message">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorScreen;

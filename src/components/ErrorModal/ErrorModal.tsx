import React from "react";

import "./ErrorModal.scss";
const ErrorModal = () => {
  return (
    <div className="modal " id="errorModal" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div className="modal-content" role="document">
        <div className="modal-content__title">
          <h5 className="modal-title" id="errorModalLabel">
            Error
          </h5>
        </div>
        <div className="modal-content__message">
          <p>Something went wrong. Please try again later.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;

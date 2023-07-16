import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import MicIcon from "../../assets/mic.svg";
import TrashIcon from "../../assets/trash.svg";
import SendIcon from "../../assets/send.svg";
import SendGreenIcon from "../../assets/send-green.svg";

import "./ChatInput.scss";

const ChatInput = ({ sendMessage }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = () => {
    SpeechRecognition.stopListening();
    if (inputValue.trim() !== "") {
      sendMessage(inputValue);
    }
    setInputValue("");
  };

  const sendAudioTranscript = () => {
    SpeechRecognition.stopListening();
    if (transcript.trim() !== "") {
      sendMessage(transcript);
    }

    resetTranscript();
  };

  const resetTranscriptAndStopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handlekeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendClick();
    } else if (event.key === " " && !listening) {
      startListening();
    } else if (event.key === " " && listening) {
      sendAudioTranscript();
    }
  };

  return (
    <div className="chat-input">
      {listening ? (
        <div className="chat-input-recording">
          <button onClick={resetTranscriptAndStopListening} className="chat-input-btn chat-input-trash-icon">
            <img src={TrashIcon} alt="stop" className="chat-input-btn-img" />
          </button>
          <div className="chat-input-recording-placeholder">
            <div className="chat-input-recording-placeholder-dot"></div>
            <div className="chat-input-recording-placeholder-transcript">
              {transcript} <blink>|</blink>
            </div>
          </div>
          {transcript.trim() ? (
            <button
              className="chat-input-btn chat-input-send-icon"
              onClick={sendAudioTranscript}
              onKeyUp={handlekeyPress}
            >
              <img src={SendGreenIcon} alt="send" className="chat-input-btn-img" />
            </button>
          ) : (
            <button className="chat-input-btn chat-input-send-icon">
              <img src={SendIcon} alt="send" className="chat-input-btn-img" />
            </button>
          )}
        </div>
      ) : (
        <div className="chat-input-text">
          <input
            className="chat-input-textfield"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Write a message..."
          />
          <button onClick={startListening} onKeyUp={handlekeyPress} className="chat-input-btn chat-input-mic-icon">
            <img src={MicIcon} alt="mic" className="chat-input-btn-img" />
          </button>
          {inputValue.trim() ? (
            <button className="chat-input-btn chat-input-send-icon" onClick={handleSendClick} onKeyUp={handlekeyPress}>
              <img src={SendGreenIcon} alt="send" className="chat-input-btn-img" />
            </button>
          ) : (
            <button className="chat-input-btn chat-input-send-icon">
              <img src={SendIcon} alt="send" className="chat-input-btn-img" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatInput;

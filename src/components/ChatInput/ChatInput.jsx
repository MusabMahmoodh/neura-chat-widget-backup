import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import MicIcon from "../../assets/mic.svg";
import TrashIcon from "../../assets/trash.svg";
import SendIcon from "../../assets/send.svg";
import ReactLoading from "react-loading";

const ChatInput = ({ sendMessage }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = () => {
    SpeechRecognition.stopListening();
    sendMessage(inputValue);
    setInputValue("");
  };

  const sendAudioTranscript = () => {
    SpeechRecognition.stopListening();
    sendMessage(transcript);
    resetTranscript();
  };

  const resetTranscriptAndStopListening = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  return (
    <div className="chat-input">
      {transcript && <p className="chat-input-trasncript">{transcript} |</p>}
      {listening ? (
        <div className="chat-input-recording">
          <button onClick={resetTranscriptAndStopListening} className="chat-input-send-icon">
            <img src={TrashIcon} alt="stop" className="chat-input-send-icon-img" />
          </button>
          <div className="chat-input-recording-placeholder">
            <ReactLoading type="bubbles" color="#000" />
            <ReactLoading type="bubbles" color="#000" />
          </div>

          <button className="chat-input-send-icon" onClick={sendAudioTranscript}>
            <img src={SendIcon} alt="mic" className="chat-input-send-icon-img" />
          </button>
        </div>
      ) : (
        <div className="chat-input-text">
          <input
            className="chat-input-textfield"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a message"
          />
          {inputValue.trim() ? (
            <button className="chat-input-send-icon" onClick={handleSendClick}>
              <img src={SendIcon} alt="mic" className="chat-input-send-icon-img" />
            </button>
          ) : (
            <button onClick={startListening} className="chat-input-send-icon">
              <img src={MicIcon} alt="mic" className="chat-input-send-icon-img" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatInput;

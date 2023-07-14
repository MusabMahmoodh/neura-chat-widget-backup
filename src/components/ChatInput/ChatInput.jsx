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

  return (
    <div className="chat-input">
      {transcript && <p className="chat-input-trasncript">{transcript} |</p>}
      {listening ? (
        <div className="chat-input-recording">
          <button onClick={resetTranscriptAndStopListening} className="chat-input-icon chat-input-trash-icon">
            <img src={TrashIcon} alt="stop" className="chat-input-send-icon-img" />
          </button>
          <div className="chat-input-recording-placeholder">
            <div className="chat-input-recording-dot"></div>
            <ReactLoading type="bars" color="#5896EB" />
            <ReactLoading type="bars" color="#B7E6FF" delay={500} />
          </div>

          <button className="chat-input-icon chat-input-send-icon" onClick={sendAudioTranscript}>
            <img src={SendIcon} alt="send" className="chat-input-send-icon-img" />
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
            <button className="chat-input-icon chat-input-send-icon" onClick={handleSendClick}>
              <img src={SendIcon} alt="send" className="chat-input-send-icon-img" />
            </button>
          ) : (
            <button onClick={startListening} className="chat-input-icon chat-input-mic-icon">
              <img src={MicIcon} alt="mic" className="chat-input-send-icon-img" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatInput;

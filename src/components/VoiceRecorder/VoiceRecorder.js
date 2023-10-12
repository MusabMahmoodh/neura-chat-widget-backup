import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import ErrorScreen from "../ErrorScreen/ErrorScreen";

const VoiceRecorder = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <ErrorScreen
        subMessage="But you can continue with text chat"
        message="Browser doesn't support speech recognition"
      />
    );
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default VoiceRecorder;

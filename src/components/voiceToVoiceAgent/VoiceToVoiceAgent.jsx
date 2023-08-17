import React, { useEffect, useState } from "react";
import Siriwave from "react-siriwave";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./VoiceToVoiceAgent.scss";
import VoiceAgentMic from "../VoiceAgentMic/VoiceAgentMic";
import { useMessage } from "../../useMessage";
import { useUserData } from "../../useUserData";
import { generateTextToVoice, stopVoice } from "../../utils/converstionUtils";
import Processing from "../Processing/Processing";
import TypeWriter from "../TypeWriter/TypeWriter";
import { BOT } from "../../constants";
import { getBot } from "../../messageService";
import WeekSelect from "../WeekSelect/WeekSelect";

const VoiceToVoiceAgent = ({ voices, switchToChat }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const { messages, getApiResponse, isSpeakerOn, markMessageAsRead, updateWeek, week, addMessage } = useMessage();
  const { userData } = useUserData();
  const agent = userData.agent;

  const [isReplying, setIsReplying] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const listen = async () => {
      if (!listening) {
        setIsReplying(false);
        setIsThinking(true);
        SpeechRecognition.stopListening();
        if (transcript.trim() !== "") {
          await getApiResponse(transcript);
        }
        setIsThinking(false);
        resetTranscript();
      } else {
        console.log("listening", listening);
      }
    };
    listen();

    setInterval(() => {
      if (window.speechSynthesis.speaking) {
        setIsReplying(true);
      } else {
        setIsReplying(false);
      }
    }, 500);
    // eslint-disable-next-line
  }, [listening]);
  useEffect(() => {
    // only generate voice for remote messages
    const talk = async () => {
      if (
        messages.length > 0 &&
        messages[messages.length - 1].sender === "remote" &&
        messages[messages.length - 1].isRead === false
      ) {
        setIsThinking(false);
        setIsReplying(true);
        markMessageAsRead(messages[messages.length - 1]._id);
        // if  messages.length === 1 then wait for 2 seconds
        if (messages.length === 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        await generateTextToVoice(messages[messages.length - 1].message, voices[agent]);

        setIsReplying(false);
      }
    };
    talk();
  }, [messages, isSpeakerOn, agent, voices, markMessageAsRead]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const stopSpeaking = () => {
    stopVoice();
    setIsReplying(false);
    setIsThinking(false);
  };
  const bot = getBot();
  return (
    <div className="voice-to-voice-container">
      {bot === BOT.AIEYE && (
        <div className="voice-to-voices-week-select">
          <WeekSelect sendMessage={addMessage} onUpdate={updateWeek} value={week} />
        </div>
      )}
      <div className="voice-to-voice-title">Hey, How can I help you this afternoon?</div>
      <div className="voice-to-voice-subtitle">Click on the mic to start talking</div>
      <div className="voice-to-voice-animation">
        {!isThinking && !isReplying && listening ? (
          <Siriwave color="#6adc92" theme="ios9" />
        ) : isThinking && !isReplying ? (
          <Processing />
        ) : !isThinking && isReplying ? (
          <>
            <Siriwave color="#6adc92" theme="ios" />
            <button className="voice-to-voice-stop-speak-btn" onClick={stopSpeaking}>
              Stop Speaking
            </button>
          </>
        ) : (
          <>
            <div onClick={SpeechRecognition.startListening}>
              <VoiceAgentMic />
            </div>
          </>
        )}
      </div>
      <div className="voice-to-voice-message">
        <TypeWriter text={messages[messages.length - 1].message} />
      </div>
      {/* {(isThinking && !isReplying) || isReplying ? (
        <div className="voice-to-voice-message">
          <TypeWriter text={messages[messages.length - 1].message} />
        </div>
      ) : (
        <div className="voice-to-voice-message"></div>
      )} */}
    </div>
  );
};

export default VoiceToVoiceAgent;

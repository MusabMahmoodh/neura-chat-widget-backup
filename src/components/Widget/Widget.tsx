import React from "react";
import ConversationHeader from "../ConversationHeader/ConversationHeader";

import { CustomMessageModel } from "../../types";
import ChatInput from "../ChatInput/ChatInput";
import MessageList from "../MessageList/MessageList";

import "./Widget.scss";
import SettingsContainer from "../Settings/SettingsContainer";
export const Widget: React.FC<{
  voices: Array<any>;
  isLoadingNewMessage: boolean;
  remoteName?: string;
  messages?: Array<CustomMessageModel>;
  onSend: (message: string) => void;
  resetSession: () => void;
  isSpeakerOn: boolean;
  toggleMic: () => void;
  agent: number;
  updateAgent: (agent: number) => void;
  markMessageAsRead: (messageId: string) => void;
  updateWeek: (week: number) => void;
  week: number;
  addMessage: (message: CustomMessageModel) => void;
  sclOption: string;
  addSclOption: (sclOption: string) => void;
}> = ({
  remoteName = "",
  messages = [],
  onSend,
  isLoadingNewMessage,
  resetSession,
  isSpeakerOn,
  toggleMic,
  agent,
  updateAgent,
  voices,
  markMessageAsRead,
  updateWeek,
  week,
  addMessage,
  sclOption,
  addSclOption,
}) => {
  const [showSettings, setShowSettings] = React.useState(false);
  return (
    <div className="widget-container">
      <ConversationHeader
        resetSession={resetSession}
        remoteName={remoteName}
        toggleSettings={() => setShowSettings((pre) => !pre)}
        isSpeakerOn={isSpeakerOn}
        toggleMic={toggleMic}
      />
      {showSettings && (
        <SettingsContainer
          isSpeakerOn={isSpeakerOn}
          toggleMic={toggleMic}
          updateAgent={updateAgent}
          selectedAgent={agent}
        />
      )}

      <MessageList
        agent={agent}
        isSpeakerOn={isSpeakerOn}
        messages={messages}
        isLoadingNewMessage={isLoadingNewMessage}
        voices={voices}
        markMessageAsRead={markMessageAsRead}
        updateWeek={updateWeek}
        week={week}
        sendMessage={addMessage}
        sclOption={sclOption}
        addSclOption={addSclOption}
      />
      <ChatInput sendMessage={onSend} />
    </div>
  );
};

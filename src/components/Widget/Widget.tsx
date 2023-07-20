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
}) => {
  const [showSettings, setShowSettings] = React.useState(false);
  return (
    <div className="widget-container">
      <ConversationHeader
        resetSession={resetSession}
        remoteName={remoteName}
        toggleSettings={() => setShowSettings((pre) => !pre)}
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
      />
      <ChatInput sendMessage={onSend} />
    </div>
  );
};

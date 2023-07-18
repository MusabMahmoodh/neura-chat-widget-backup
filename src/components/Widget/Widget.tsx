import ConversationHeader from "../ConversationHeader/ConversationHeader";

import { CustomMessageModel } from "../../types";
import ChatInput from "../ChatInput/ChatInput";
import MessageList from "../MessageList/MessageList";

import "./Widget.scss";
export const Widget: React.FC<{
  isLoadingNewMessage: boolean;
  remoteName?: string;
  messages?: Array<CustomMessageModel>;
  onSend: (message: string) => void;
  resetSession: () => void;
  isSpeakerOn: boolean;
  toggleMic: () => void;
}> = ({ remoteName = "", messages = [], onSend, isLoadingNewMessage, resetSession, isSpeakerOn, toggleMic }) => {
  return (
    <div className="widget-container">
      <ConversationHeader
        resetSession={resetSession}
        remoteName={remoteName}
        isSpeakerOn={isSpeakerOn}
        toggleMic={toggleMic}
      />
      <MessageList isSpeakerOn={isSpeakerOn} messages={messages} isLoadingNewMessage={isLoadingNewMessage} />
      <ChatInput sendMessage={onSend} />
    </div>
  );
};

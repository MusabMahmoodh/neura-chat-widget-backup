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
}> = ({ remoteName = "", messages = [], onSend, isLoadingNewMessage }) => {
  return (
    <div className="widget-container">
      <ConversationHeader remoteName={remoteName} />
      <MessageList messages={messages} isLoadingNewMessage={isLoadingNewMessage} />
      <ChatInput sendMessage={onSend} />
    </div>
  );
};

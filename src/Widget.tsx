import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  Loader,
} from "@chatscope/chat-ui-kit-react";
import { CustomMessageModel } from "./WidgetContainer";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";

export const Widget: React.FC<{
  isLoadingNewMessage: boolean;
  remoteName?: string;
  messages?: Array<CustomMessageModel>;
  onSend: (message: string) => void;
}> = ({ remoteName = "", messages = [], onSend, isLoadingNewMessage }) => {
  return (
    <MainContainer>
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Content userName={remoteName} />
        </ConversationHeader>

        <MessageList>
          {messages.map((message) => (
            <Message key={message._id} model={message} />
          ))}
          {isLoadingNewMessage && <Loader />}
        </MessageList>

        <MessageInput placeholder="Type message here" attachButton={false} onSend={onSend} />
      </ChatContainer>
    </MainContainer>
  );
};

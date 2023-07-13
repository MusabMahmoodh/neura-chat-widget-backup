import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  Loader,
  TypingIndicator,
  Avatar,
  Button,
} from "@chatscope/chat-ui-kit-react";
import { CustomMessageModel } from "./WidgetContainer";
import ResetIcon from "./assets/refresh.svg";
import CloseIcon from "./assets/close.svg";

export const Widget: React.FC<{
  isLoadingNewMessage: boolean;
  remoteName?: string;
  messages?: Array<CustomMessageModel>;
  onSend: (message: string) => void;
}> = ({ remoteName = "", messages = [], onSend, isLoadingNewMessage }) => {
  return (
    <MainContainer>
      <ChatContainer
        style={{
          boxShadow: "0 5px 40px rgba(0, 0, 0, 0.16) !important",
          borderRadius: "10px !important",
        }}
      >
        <ConversationHeader>
          <Avatar src="https://picsum.photos/200/300" name="Emily" />
          <ConversationHeader.Content userName={remoteName} info="Demo" />
          <ConversationHeader.Actions>
            <Button
              style={{
                marginRight: "10px",
              }}
              icon={<img src={ResetIcon} width="20" />}
              className="widget-header-btn"
            ></Button>
            <Button icon={<img src={CloseIcon} width="18" />} className="widget-header-btn"></Button>
          </ConversationHeader.Actions>
        </ConversationHeader>

        <MessageList typingIndicator={isLoadingNewMessage && <TypingIndicator content="Generating response" />}>
          {messages.map((message) => (
            <Message key={message._id} model={message} />
          ))}
        </MessageList>

        <MessageInput placeholder="Type message here" attachButton={false} onSend={onSend} />
      </ChatContainer>
    </MainContainer>
  );
};

import ReactLoading from "react-loading";
import ConversationHeader from "../ConversationHeader/ConversationHeader";
import RobotIcon from "../../assets/bot.svg";
import UserSpeakerIcon from "../../assets/speaker.svg";
import { CustomMessageModel } from "../../types";
import ChatInput from "../ChatInput/ChatInput";

export const Widget: React.FC<{
  isLoadingNewMessage: boolean;
  remoteName?: string;
  messages?: Array<CustomMessageModel>;
  onSend: (message: string) => void;
}> = ({ remoteName = "", messages = [], onSend, isLoadingNewMessage }) => {
  return (
    <div className="widget-container">
      <ConversationHeader remoteName={remoteName} />
      <div className="widget-container-chat">
        <ul className="widget-container-message-list">
          {messages.map((message) =>
            message.sender === "remote" ? (
              <li key={message._id} className="widget-container-message-item widget-container-message-item--left">
                <div className="widget-container-message-listItemAvatar">
                  <div className="widget-container-message-avatar">
                    <img className="widget-container-message-avatar-icon" src={RobotIcon}></img>
                  </div>
                </div>
                <div className="widget-container-message-listItemText">
                  <h6 className="widget-container-message-primaryText">{message.message}</h6>
                </div>
              </li>
            ) : (
              <li key={message._id} className="widget-container-message-item widget-container-message-item--right">
                <div className="widget-container-message-listItemText">
                  <h6 className="widget-container-message-primaryText">{message.message}</h6>
                </div>
                <div className="widget-container-message-listItemAvatar">
                  <div className="widget-container-message-avatar">
                    <img className="widget-container-message-avatar-icon" src={UserSpeakerIcon}></img>
                  </div>
                </div>
              </li>
            )
          )}
          {isLoadingNewMessage && (
            <li className="widget-container-message-item widget-container-message-item--left">
              <div className="widget-container-message-listItemAvatar">
                <div className="widget-container-message-avatar">
                  <img className="widget-container-message-avatar-icon" src={RobotIcon}></img>
                </div>
              </div>
              <div className="widget-container-message-listItemText widget-container-message-listItemText--processing ">
                <h6 className="widget-container-message-primaryText"> Typing </h6>
                <ReactLoading type="bubbles" color="#000" />
              </div>
            </li>
          )}
        </ul>

        <ChatInput sendMessage={onSend} />
      </div>
    </div>
  );
};

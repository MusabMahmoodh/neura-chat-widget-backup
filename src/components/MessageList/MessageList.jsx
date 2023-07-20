import React, { useEffect, useRef } from "react";
import BoyBotIcon from "../../assets/bot-boy.svg";
import GirlBotIcon from "../../assets/bot-girl.svg";

import "./MessageList.scss";
import TypeLoader from "../TypeLoader/TypeLoader";
import ResponseComponent from "../ResponseComponent/ResponseComponent";
import { generateTextToVoice } from "../../utils/converstionUtils";
const MessageList = ({ agent, isSpeakerOn, messages, isLoadingNewMessage }) => {
  const chatListRef = useRef(null);

  useEffect(() => {
    // only generate voice for remote messages

    if (isSpeakerOn && messages.length > 1 && messages[messages.length - 1].sender === "remote") {
      generateTextToVoice(messages[messages.length - 1].message, agent);
    }

    scrollToBottom();
  }, [messages, isSpeakerOn]);

  const scrollToBottom = () => {
    if (chatListRef.current) {
      const { scrollHeight, clientHeight } = chatListRef.current;
      chatListRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  return (
    <div ref={chatListRef} className="widget-container-chat">
      <ul className="widget-container-chat-list">
        {messages.map((message) => {
          const isRemoteMessage = message.sender === "remote";
          const itemClass = isRemoteMessage
            ? "widget-container-chat-list-item--left"
            : "widget-container-chat-list-item--right";

          return (
            <li key={message._id} className={`widget-container-chat-list-item ${itemClass}`}>
              {isRemoteMessage && (
                <div className="widget-container-chat-list-item-avatarimg">
                  <div className="widget-container-chat-list-item-avatarimg-avatar">
                    <img
                      className="widget-container-chat-list-item-avatarimg-img"
                      src={agent === 1 ? BoyBotIcon : GirlBotIcon}
                      alt="User Speaker"
                    />
                  </div>
                </div>
              )}
              <div
                className={
                  isRemoteMessage
                    ? "widget-container-chat-list-item-text-wrapper"
                    : "widget-container-chat-list-item-text-wrapper widget-container-chat-list-item-text-wrapper--right"
                }
              >
                <div
                  className={
                    isRemoteMessage
                      ? "widget-container-chat-list-item-text"
                      : "widget-container-chat-list-item-text widget-container-chat-list-item-text--right"
                  }
                >
                  <ResponseComponent response={message.message} />
                </div>

                {message?.time && (
                  <span className="widget-container-chat-list-item-text-timestamp">{message?.time}</span>
                )}
              </div>
            </li>
          );
        })}
        {isLoadingNewMessage && (
          <li className="widget-container-chat-list-item widget-container-chat-list-item--left">
            <div className="widget-container-chat-list-item-avatarimg">
              <div className="widget-container-chat-list-item-avatarimg-avatar">
                <img
                  className="widget-container-chat-list-item-avatarimg-img"
                  src={agent === 1 ? BoyBotIcon : GirlBotIcon}
                  alt="Speaker "
                />
              </div>
            </div>
            <div className="widget-container-chat-list-item-text-wrapper">
              <div className="widget-container-chat-list-item-text widget-container-chat-list-item-text--processing">
                <h6 className="widget-container-chat-primaryText">Typing</h6>
                <div className="widget-container-chat-list-item-text--processing--animation">
                  <TypeLoader />
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MessageList;

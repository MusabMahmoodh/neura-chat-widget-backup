import React, { createRef, useEffect } from "react";
import BoyBotIcon from "../../assets/bot-boy.svg";
import GirlBotIcon from "../../assets/bot-girl.svg";

import "./MessageList.scss";
import TypeLoader from "../TypeLoader/TypeLoader";
import ResponseComponent from "../ResponseComponent/ResponseComponent";
import { generateTextToVoice } from "../../utils/converstionUtils";
import WeekSelect from "../WeekSelect/WeekSelect";
import { getBot } from "../../messageService";
import { BOT } from "../../constants";
import DemoSclSelect from "../DemoSclSelect/DemoSclSelect";
const MessageList = ({
  voices,
  agent,
  isSpeakerOn,
  messages,
  isLoadingNewMessage,
  markMessageAsRead,
  updateWeek,
  week,
  sendMessage,
  sclOption,
  addSclOption,
}) => {
  const chatListRef = createRef();

  const bot = getBot();

  useEffect(() => {
    // only generate voice for remote messages

    if (
      isSpeakerOn &&
      messages.length > 1 &&
      messages[messages.length - 1].sender === "remote" &&
      messages[messages.length - 1].isRead === false
    ) {
      generateTextToVoice(messages[messages.length - 1].message, voices[agent]);
      markMessageAsRead(messages[messages.length - 1]._id);
    }

    if (chatListRef.current) {
      chatListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSpeakerOn, agent, voices, markMessageAsRead, chatListRef]);

  return (
    <div className="widget-container-chat">
      {bot === BOT.AIEYE && (
        <div className="widget-container-chat-week-select">
          <WeekSelect sendMessage={sendMessage} onUpdate={updateWeek} value={week} />
        </div>
      )}
      {bot === BOT.DEMO_SCL && (
        <div className="widget-container-chat-week-select">
          <DemoSclSelect sendMessage={sendMessage} onUpdate={addSclOption} value={sclOption} />
        </div>
      )}
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
                  <ResponseComponent response={message.message} resources={message.resources} />
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
                <h6 className="widget-container-chat-primaryText">{isSpeakerOn ? "Thinking" : "Typing"}</h6>
                <div className="widget-container-chat-list-item-text--processing--animation">
                  <TypeLoader />
                </div>
              </div>
            </div>
          </li>
        )}
        <li className="widget-container-chat-list-item widget-container-chat-list-item--left" ref={chatListRef} />
      </ul>
    </div>
  );
};

export default MessageList;

import { useCallback, useEffect, useState } from "react";
import { createSession, getResponse } from "./messageService";
import { nanoid } from "nanoid";
import { CustomMessageModel, DirectionType, PositionType, SenderType } from "./types";

const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let meridiem = "";

  // Convert to 12-hour format
  if (hours >= 12) {
    meridiem = "PM";
    hours = hours === 12 ? 12 : hours - 12;
  } else {
    meridiem = "AM";
    hours = hours === 0 ? 12 : hours;
  }

  // Add leading zeros if necessary
  hours = Number(hours.toString().padStart(2, "0"));
  minutes = Number(minutes.toString().padStart(2, "0"));

  return `${hours}:${minutes} ${meridiem}`;
};

const greeTingMessage = {
  _id: "1",
  message:
    "👋 Hello! Welcome to Neura Chat Bot! How can I assist you today? Feel free to ask any questions or share any concerns you may have. I'm here to help! 😊",
  sender: "remote" as SenderType,
  direction: "incoming" as DirectionType,
  position: "single" as PositionType,
};
export const useMessage = () => {
  const [messages, setMessages] = useState<Array<CustomMessageModel>>([greeTingMessage]);
  const [isSessionCreated, setIsSessionCreated] = useState<boolean>(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(false);
  const [session, setSession] = useState<string>("");

  const generateSession = async () => {
    setIsSessionCreated(true);
    const sessionId = nanoid();
    try {
      await createSession(sessionId);
    } catch (e) {
      console.log(e);
    }

    setSession(sessionId);
    setIsLoadingResponse(false);
  };
  useEffect(() => {
    generateSession();
  }, []);

  const addMessage = useCallback(
    (message: CustomMessageModel) => {
      setMessages((messages) => [...messages, message]);
    },
    [setMessages]
  );

  const resetSession = () => {
    setMessages([greeTingMessage]);
    setIsSessionCreated(false);
    generateSession();
  };

  const getApiResponse = async (message: string) => {
    setIsLoadingResponse(true);
    const newMessage = {
      _id: nanoid(),
      message,
      sender: "me" as SenderType,
      direction: "outgoing" as DirectionType,
      position: "single" as PositionType,
      time: getCurrentTime(),
    };
    addMessage(newMessage);
    const res = await getResponse(message, session);
    const response = {
      _id: nanoid(),
      message: `${res}`,
      sender: "remote" as SenderType,
      direction: "incoming" as DirectionType,
      position: "single" as PositionType,
      time: getCurrentTime(),
    };
    addMessage(response);
    setIsLoadingResponse(false);
  };

  return { messages, getApiResponse, session, isLoadingResponse, isSessionCreated, resetSession };
};

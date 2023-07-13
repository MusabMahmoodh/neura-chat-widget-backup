import { useCallback, useEffect, useState } from "react";
import { CustomMessageModel } from "./WidgetContainer";
import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";
import { createSession, getResponse } from "./messageService";
import { randomUUID } from "crypto";
import { nanoid } from "nanoid";

const greeTingMessage = {
  _id: "1",
  message:
    "👋 Hello! Welcome to Neura Chat Bot! How can I assist you today? Feel free to ask any questions or share any concerns you may have. I'm here to help! 😊",
  sender: "remote",
  direction: "incoming" as MessageDirection,
  position: "single" as const,
};
export const useMessage = () => {
  const [messages, setMessages] = useState<Array<CustomMessageModel>>([greeTingMessage]);
  const [isSessionCreated, setIsSessionCreated] = useState<boolean>(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(false);
  const [session, setSession] = useState<string>("");

  useEffect(() => {
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
    generateSession();
  }, []);

  const addMessage = useCallback(
    (message: CustomMessageModel) => {
      setMessages((messages) => [...messages, message]);
    },
    [setMessages]
  );

  const getApiResponse = async (message: string) => {
    setIsLoadingResponse(true);
    const newMessage = {
      _id: nanoid(),
      message,
      sender: "me",
      direction: "outgoing" as MessageDirection,
      position: "single" as const,
    };
    addMessage(newMessage);
    const res = await getResponse(message, session);
    const response = {
      _id: nanoid(),
      message: `${res.text}`,
      sender: "remote",
      direction: "incoming" as MessageDirection,
      position: "single" as const,
    };
    addMessage(response);
    setIsLoadingResponse(false);
  };

  return { messages, getApiResponse, session, isLoadingResponse, isSessionCreated };
};

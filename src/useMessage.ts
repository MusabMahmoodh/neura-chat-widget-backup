import { useCallback, useEffect, useState } from "react";
import { createSession, getBot, getResponse } from "./messageService";
import { nanoid } from "nanoid";
import { CustomMessageModel, DirectionType, PositionType, SenderType } from "./types";
import { stopVoice } from "./utils/converstionUtils";
import { getUserData } from "./utils/userrUtils";
import { BOT } from "./constants";
// import { replaceEsoft, replaceGrad, replaceLinksWithText } from "./utils/textUtils";
import fingerprint from "./utils/fingerprintUtils";
// import fingerprint from "./utils/fingerprintUtils";

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

const getGreeTingMessage = (userName: string, isFirstTime: boolean) => {
  const client = getBot();
  let greeTingMessage;
  if (client === BOT.AIEYE) {
    greeTingMessage = userName
      ? {
          _id: "1",
          message: `👋 Hello **${userName}**! Welcome ${
            !isFirstTime ? "back" : ""
          }.  I am your Teaching Assistant Robot. Would you please click on ☀️ and select the week number.`,
          sender: "remote" as SenderType,
          direction: "incoming" as DirectionType,
          position: "single" as PositionType,
          isRead: false,
        }
      : {
          _id: "1",
          message: `👋 Hello ! I am your Teaching Assistant Robot. Would you please click on ☀️ and select the week number.`,
          sender: "remote" as SenderType,
          direction: "incoming" as DirectionType,
          position: "single" as PositionType,
          isRead: false,
        };
  } else {
    greeTingMessage = userName
      ? {
          _id: "1",
          message: `👋 Hello **${userName}**! Welcome ${
            !isFirstTime ? "back" : ""
          } to Neura Chat! How can I assist you today? I'm here to help! 😊`,
          sender: "remote" as SenderType,
          direction: "incoming" as DirectionType,
          position: "single" as PositionType,
          isRead: false,
        }
      : {
          _id: "1",
          message: `👋 Hello ! Welcome to Neura Chat! How can I assist you today? I'm here to help! 😊`,
          sender: "remote" as SenderType,
          direction: "incoming" as DirectionType,
          position: "single" as PositionType,
          isRead: false,
        };
  }

  return greeTingMessage;
};

export const useMessage = () => {
  const userData = getUserData();
  const client = getBot();

  const userName = userData?.name;
  const isFirstTime = userData?.isFirstVisit;
  const greeTingMessage = getGreeTingMessage(userName, isFirstTime);

  const [messages, setMessages] = useState<Array<CustomMessageModel>>([greeTingMessage]);
  const [isSessionCreated, setIsSessionCreated] = useState<boolean>(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(false);
  const [session, setSession] = useState<string>("");
  const [isSpeakerOn, setIsSpeakerOn] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLimitReached, setIsLimitReached] = useState<{
    message: string;
  } | null>();
  // only for AIeye
  const [week, setWeek] = useState<number>(5);
  const [sclOption, setSclOption] = useState<string>("general");

  const toggleSpeaker = () => {
    setIsSpeakerOn((pre) => !pre);
    if (isSpeakerOn) {
      stopVoice();
    }
  };

  const generateSession = useCallback(async () => {
    setIsSessionCreated(true);
    setIsError(false);
    const sessionId = nanoid();
    try {
      let res;
      if (client === BOT.AIEYE) {
        res = await createSession(sessionId, week, sclOption);
      } else if (client === BOT.DEMO_SCL) {
        const user = fingerprint;
        res = await fetch(
          `https://demo-college.ascii.ai/create_session?session_id=${sessionId}&user_id=${user}&lesson=ai`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        const res2 = await fetch(
          `https://ucl-api.ascii.ai/create_session?session_id=${sessionId}&user_id=${user}&lesson=ai`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        if (!res2?.ok) {
          setIsLimitReached({
            message: "You have reached the limit of 16 sessions per day. Please try again tomorrow.",
          });
        }
      } else {
        res = await createSession(sessionId);
      }
      if (res?.body?.error) {
        setIsLimitReached({
          message: res.body.error,
        });
      }
    } catch (e) {
      console.log(e);
      setIsError(true);
    }

    setSession(sessionId);
    setIsLoadingResponse(false);
  }, []);
  useEffect(() => {
    generateSession();
  }, [generateSession]);

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
    let messageForQuery = message;

    // if (BOT.DEMO_SCL === client) {
    //   messageForQuery = replaceGrad(message);
    // }

    setIsLoadingResponse(true);
    const newMessage = {
      _id: nanoid(),
      message,
      sender: "me" as SenderType,
      direction: "outgoing" as DirectionType,
      position: "single" as PositionType,
      time: getCurrentTime(),
      isRead: true,
    };
    addMessage(newMessage);
    try {
      let messageToDisplay;
      const res = await getResponse(messageForQuery, session, sclOption);
      // if (BOT.DEMO_SCL === client) {
      //   var replaceLinks = replaceLinksWithText(res, "https://neura-demo-school.netlify.app");
      //   messageToDisplay = replaceEsoft(replaceLinks);
      // } else {
      messageToDisplay = res.data;
      // }

      const response = {
        _id: nanoid(),
        message: `${messageToDisplay}`,
        resources: res.resources,
        sender: "remote" as SenderType,
        direction: "incoming" as DirectionType,
        position: "single" as PositionType,
        time: getCurrentTime(),
        isRead: false, // only remote messages need to be marked as unread
      };
      addMessage(response);
    } catch (e) {
      console.log(e);
      setIsError(true);
    }

    setIsLoadingResponse(false);
  };
  const markMessageAsRead = (id: string) => {
    setMessages((messages) =>
      messages.map((message) => {
        if (message._id === id) {
          return { ...message, isRead: true };
        }
        return message;
      })
    );
  };

  const updateWeek = (week: number) => {
    if (week > 18) {
      setWeek(18);
      return;
    }
    setWeek(week);
  };

  const addSclOption = (option: string) => {
    setSclOption(option);
  };

  return {
    addMessage,
    messages,
    getApiResponse,
    session,
    isLoadingResponse,
    isSessionCreated,
    resetSession,
    isSpeakerOn,
    toggleSpeaker,
    markMessageAsRead,
    updateWeek,
    addSclOption,
    sclOption,
    week,
    isError,
    isLimitReached,
  };
};

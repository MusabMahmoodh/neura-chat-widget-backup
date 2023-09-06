import { BOT } from "./constants";

export const getApi = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const client = urlParams.get("client");
  if (client === "esoft") {
    return "https://esoft-demo.ascii.ai";
  } else if (client === "aieye") {
    return "https://ai-eye-chatbot.ascii.ai";
  } else {
    return "https://esoft-demo.ascii.ai";
  }
};

export const getBot = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const client = urlParams.get("client");
  if (client === "esoft") {
    return BOT.ESOFT;
  } else if (client === "aieye") {
    return BOT.AIEYE;
  } else {
    return BOT.ESOFT;
  }
};

export const createSession = async (sessionId: string, week?: number) => {
  let url = `${getApi()}/create_session?session_id=${sessionId}`;
  if (week) {
    url = `${getApi()}/create_session?session_id=${sessionId}&lesson=week${week}`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  return response.json();
};

export const getResponse = async (message: string, session: string) => {
  // mock api response with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is a mocked response");
    }, 1000);
  });
};

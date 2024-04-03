import { BOT } from "./constants";
import fingerprint from "./utils/fingerprintUtils";

export const getApi = (sclOption?: string) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const client = urlParams.get("client");
  if (client === "esoft") {
    return "https://metro.ascii.ai";
  } else if (client === "aieye") {
    return "https://ai-eye-chatbot.ascii.ai";
  } else if (client === "demo_scl" && sclOption === "general") {
    return "https://ucl-api.ascii.ai";
  } else if (client === "demo_scl" && sclOption === "courses") {
    return "https://demo-college.ascii.ai";
  } else if (client === "insurance") {
    return "https://insurance.ascii.ai";
  } else if (client === "ascii-web") {
    return "https://ascii-chat.ascii.ai";
  } else {
    return "https://metro.ascii.ai";
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
  } else if (client === "demo_scl") {
    return BOT.DEMO_SCL;
  } else if (client === "insurance") {
    return BOT.INSURANCE;
  } else if (client === "ascii-web") {
    return BOT.ASCII;
  } else {
    return BOT.AIEYE;
  }
};

export const isAvatarChat = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const _ = urlParams.get("avatarChat");
  if (_ === "1") {
    return true;
  }

  return false;
};

export const createSession = async (sessionId: string, week?: number | "ai", sclOption?: string) => {
  const user = fingerprint;
  let url = `${getApi(sclOption)}/create_session?session_id=${sessionId}&user_id=${user}`;
  if (typeof week === "number") {
    url = `${getApi(sclOption)}/create_session?session_id=${sessionId}&user_id=${user}&lesson=week${week}`;
  } else if (week === "ai") {
    url = `${getApi(sclOption)}/create_session?session_id=${sessionId}&user_id=${user}&lesson=ai`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  return response.json();
};

export const getResponse = async (message: string, session: string, sclOption?: string) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const client = urlParams.get("client");
  const sessionUrl = client === "demo_scl" && sclOption === "general" ? "generate_with_source" : "generate";
  let response;

  response = await fetch(`${getApi(sclOption)}/${sessionUrl}?session_id=${session}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_input: message,
    }),
  });

  const data = await response.json();
  const dataGenereated = data.generated;
  return { data: dataGenereated, resources: data.source };
  // mock api response with delay
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve("This is a mocked response");
  //   }, 1000);
  // });
};

const getApi = () => {
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

export const createSession = async (sessionId: string) => {
  const response = await fetch(`${getApi()}/create_session?session_id=${sessionId}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  return response.json();
};

export const getResponse = async (message: string, session: string) => {
  const response = await fetch(`${getApi()}/generate?session_id=${session}`, {
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
  return data.generated;
};

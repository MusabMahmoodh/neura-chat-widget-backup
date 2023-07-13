function getRandomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createSession = async (sessionId: string) => {
  const response = await fetch(`https://esoft-demo.ascii.ai/create_session?session_id=${sessionId}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  return response.json();
};

export const getResponse = async (message: string, session: string) => {
  const response = await fetch(`https://esoft-demo.ascii.ai/generate?session_id=${session}`, {
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

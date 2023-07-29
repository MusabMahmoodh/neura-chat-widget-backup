export const generateTextToVoice = async (text: string, voice: any) => {
  const filteredText = text.replace(/<[^>]*>?/gm, "");
  //remove url
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const filteredText2 = filteredText.replace(urlRegex, "");
  //remove emoji

  //remve 👋,😊
  const filteredText3 = filteredText2.replace("👋", "");
  const filteredText4 = filteredText3.replace("😊", "");

  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";
  speech.text = filteredText4;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  speech.voice = voice;

  window.speechSynthesis.speak(speech);
};

export const stopVoice = () => {
  window.speechSynthesis.cancel();
};

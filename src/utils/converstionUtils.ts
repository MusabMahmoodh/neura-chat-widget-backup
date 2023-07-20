export const generateTextToVoice = (text: string, voice: any) => {
  console.log("generateTextToVoice", text, voice);
  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  speech.voice = voice;

  window.speechSynthesis.speak(speech);
};

export const stopVoice = () => {
  window.speechSynthesis.cancel();
};

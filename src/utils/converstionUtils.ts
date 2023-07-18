export const generateTextToVoice = (text: string) => {
  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
};

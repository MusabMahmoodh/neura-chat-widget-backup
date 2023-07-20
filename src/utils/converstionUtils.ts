export const generateTextToVoice = (text: string, agent: number) => {
  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  // window.speechSynthesis.addEventListener("voiceschanged", () => {
  const voices = window.speechSynthesis.getVoices();
  speech.voice = voices[agent];

  window.speechSynthesis.speak(speech);
  // });
};

export const stopVoice = () => {
  window.speechSynthesis.cancel();
};

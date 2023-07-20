export const generateTextToVoice = (text: string) => {
  let speech = new SpeechSynthesisUtterance();
  speech.lang = "en-US";
  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  speech.voice = window.speechSynthesis.getVoices()[1];

  window.speechSynthesis.speak(speech);
};

export const stopVoice = () => {
  window.speechSynthesis.cancel();
};

export const getVoiceSelection = () => {
  const voices = window.speechSynthesis.getVoices();

  return {
    male: voices[1],
    female: voices[2],
  };
};

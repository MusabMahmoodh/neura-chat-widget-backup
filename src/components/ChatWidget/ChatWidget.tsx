import React, { useEffect, useState } from "react";
import { WidgetContainer } from "../../WidgetContainer";

import "./ChatWidget.scss";
import WelcomeContainer from "../WelcomeContainer/WelcomeContainer";
import UserFormContainer from "../UserFormContainer/UserFormContainer";
import { OnboardStep, useUserData } from "../../useUserData";
import VoiceToVoiceAgent from "../voiceToVoiceAgent/VoiceToVoiceAgent";
import TalkingAvatar from "../AvatarChat/TalkingAvatar";

const ChatWidget = () => {
  const [license, setLicense] = useState<string | null>(null);
  const [isAppLoaded, setIsAppLoaded] = useState<boolean>(false);
  const { isDataFetching, userOnoardStep, setUserOnboardStep } = useUserData();

  const updatePage = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const voiceOnly = urlParams.get("voiceOnly");
    const avatarChat = urlParams.get("avatarChat");

    if (voiceOnly === "1") {
      setUserOnboardStep(OnboardStep.VOICE_ONLY);
    } else if (avatarChat === "1") {
      setUserOnboardStep(OnboardStep.AVATAR_CHAT);
    } else {
      setUserOnboardStep(OnboardStep.CHAT);
    }
  };

  const [voices, setVoices] = useState<Array<any>>([]);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const license = urlParams.get("license");

    setLicense(license);
    window.speechSynthesis.addEventListener("voiceschanged", async () => {
      const voices: Array<any> = await window.speechSynthesis.getVoices();
      setVoices([...voices]);
      setIsAppLoaded(true);
    });
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", () => {});
    };
  }, []);
  // if (!isAppLoaded) {
  //   return <div className="widget-chat-container">Loading</div>;
  // }
  // if (isDataFetching) {
  //   return <div className="widget-chat-container">Loading</div>;
  // }

  if (userOnoardStep === OnboardStep.FORM_FILLING) {
    return (
      <div className="widget-chat-container">
        <UserFormContainer updatePage={updatePage} />
      </div>
    );
  }
  if (userOnoardStep === OnboardStep.CHAT) {
    return (
      <div className="widget-chat-container">
        <WidgetContainer
          license={license}
          voices={voices}
          switchToVoice={() => setUserOnboardStep(OnboardStep.VOICE_ONLY)}
        />
      </div>
    );
  }

  if (userOnoardStep === OnboardStep.VOICE_ONLY) {
    return <VoiceToVoiceAgent voices={voices} switchToChat={() => setUserOnboardStep(OnboardStep.CHAT)} />;
  }

  if (userOnoardStep === OnboardStep.AVATAR_CHAT) {
    return <TalkingAvatar />;
  }
  return (
    <div className="widget-chat-container">
      <WelcomeContainer updatePage={() => setUserOnboardStep(OnboardStep.FORM_FILLING)} />
    </div>
  );
};

export default ChatWidget;

import { useEffect, useState } from "react";
import { getUserData, storeUserData } from "./utils/userrUtils";

export enum OnboardStep {
  WELCOME = 0,
  FORM_FILLING = 1,
  CHAT = 2,
  VOICE_ONLY = 3,
  AVATAR_CHAT = 4,
}
export const useUserData = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    agent: 1,
  });
  const [userOnoardStep, setUserOnboardStep] = useState(OnboardStep.WELCOME); // 0: not started, 1: started --> form, 2: completed --> to chat
  const [isDataFetching, setIsDataFetching] = useState(false);

  const updateAgent = () => {
    const agent = userData.agent === 1 ? 2 : 1;
    setUserData((pre) => ({ ...pre, agent }));
    storeUserData({ ...userData, agent });
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const voiceOnly = urlParams.get("voiceOnly");
    const avatarChat = urlParams.get("avatarChat");
    setIsDataFetching(true);
    const data = getUserData();

    if (data?.name) {
      storeUserData({ ...data, isFirstVisit: false });
      setUserData(data);
      if (voiceOnly === "1") {
        setUserOnboardStep(OnboardStep.VOICE_ONLY);
      } else if (avatarChat === "1") {
        setUserOnboardStep(OnboardStep.AVATAR_CHAT);
      } else {
        setUserOnboardStep(OnboardStep.CHAT);
      }
    }
    setIsDataFetching(false);
  }, []);

  return { userData, isDataFetching, userOnoardStep, setUserOnboardStep, updateAgent };
};

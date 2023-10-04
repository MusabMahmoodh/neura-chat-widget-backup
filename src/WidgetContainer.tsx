import { useMemo } from "react";
import { Widget } from "./components/Widget/Widget";
import { useMessage } from "./useMessage";
import { useUserData } from "./useUserData";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";

export const WidgetContainer: React.FC<{
  voices: Array<any>;
  license?: string | null;
  greeting?: string;
  switchToVoice: () => void;
}> = ({ license = "", greeting = "", voices, switchToVoice }) => {
  const {
    messages,
    getApiResponse,
    resetSession,
    isLoadingResponse,
    isSpeakerOn,
    toggleSpeaker,
    markMessageAsRead,
    updateWeek,
    week,
    addMessage,
    isLimitReached,
    sclOption,
    addSclOption,
  } = useMessage();
  const { userData, updateAgent } = useUserData();

  const remoteName = useMemo(() => {
    if (license === "123") {
      return "Company1";
    } else if (license === "456") {
      return "Company2";
    } else if (license === "789") {
      return "Company3";
    }
  }, [license]);

  if (isLimitReached != null && isLimitReached.message) {
    return <ErrorScreen message={isLimitReached.message} />;
  }

  return (
    <>
      <Widget
        isLoadingNewMessage={isLoadingResponse}
        remoteName={remoteName}
        messages={messages}
        onSend={getApiResponse}
        resetSession={resetSession}
        isSpeakerOn={isSpeakerOn}
        toggleMic={toggleSpeaker}
        agent={userData.agent}
        updateAgent={updateAgent}
        voices={voices}
        markMessageAsRead={markMessageAsRead}
        updateWeek={updateWeek}
        week={week}
        addMessage={addMessage}
        sclOption={sclOption}
        addSclOption={addSclOption}
      />
    </>
  );
};

import { useMemo } from "react";
import { Widget } from "./components/Widget/Widget";
import { useMessage } from "./useMessage";

export const WidgetContainer: React.FC<{
  license?: string | null;
  greeting?: string;
}> = ({ license = "", greeting = "" }) => {
  const { messages, getApiResponse, resetSession, isLoadingResponse, isSpeakerOn, toggleSpeaker } = useMessage();

  const remoteName = useMemo(() => {
    if (license === "123") {
      return "Company1";
    } else if (license === "456") {
      return "Company2";
    } else if (license === "789") {
      return "Company3";
    }
  }, [license]);

  return (
    <Widget
      isLoadingNewMessage={isLoadingResponse}
      remoteName={remoteName}
      messages={messages}
      onSend={getApiResponse}
      resetSession={resetSession}
      isSpeakerOn={isSpeakerOn}
      toggleMic={toggleSpeaker}
    />
  );
};

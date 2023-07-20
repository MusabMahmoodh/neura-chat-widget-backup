import "./App.scss";
import ChatWidget from "./components/ChatWidget/ChatWidget";
import { UserType, useAppStore } from "./store";

function App() {
  //get user data from store
  const user = useAppStore((state: any) => state.user);
  return <ChatWidget />;
}

export default App;

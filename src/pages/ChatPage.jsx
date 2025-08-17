import { useLocation } from "react-router-dom";
import Chat from "../components/Chat";

const ChatPage = () => {
  const location = useLocation();
  const { username } = location.state;

  return <Chat username={username} />;
};

export default ChatPage;
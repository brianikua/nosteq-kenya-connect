import { useState } from "react";
import ChatLauncher from "./chat/ChatLauncher";
import ChatPanel from "./chat/ChatPanel";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatLauncher isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      {isOpen && <ChatPanel />}
    </>
  );
};

export default ChatWidget;

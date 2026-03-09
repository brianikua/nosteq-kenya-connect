import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ChatLauncher from "./chat/ChatLauncher";
import ChatPanel from "./chat/ChatPanel";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatLauncher isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <AnimatePresence>
        {isOpen && <ChatPanel />}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;

import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";

interface ChatLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatLauncher = ({ isOpen, onToggle }: ChatLauncherProps) => (
  <>
    <motion.button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
        isOpen
          ? "bg-destructive text-destructive-foreground"
          : "bg-[#25D366] text-white"
      }`}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      animate={isOpen ? {} : { 
        scale: [1, 1.1, 1],
        boxShadow: [
          "0 10px 15px -3px rgba(0,0,0,0.1)",
          "0 20px 25px -5px rgba(37,211,102,0.3)",
          "0 10px 15px -3px rgba(0,0,0,0.1)"
        ]
      }}
      transition={isOpen ? {} : {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
    </motion.button>

    {!isOpen && (
      <div className="fixed bottom-[88px] right-6 z-50 animate-fade-in">
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg max-w-[200px]">
          <p className="text-sm text-foreground">👋 Need help?</p>
          <p className="text-xs text-muted-foreground mt-1">Chat with us now</p>
        </div>
        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
      </div>
    )}
  </>
);

export default ChatLauncher;

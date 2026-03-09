import { MessageCircle, X } from "lucide-react";

interface ChatLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatLauncher = ({ isOpen, onToggle }: ChatLauncherProps) => (
  <>
    <button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
        isOpen
          ? "bg-destructive text-destructive-foreground"
          : "bg-[#25D366] text-white"
      }`}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
    </button>

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

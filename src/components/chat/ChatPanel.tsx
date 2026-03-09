import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import QuickReplies from "./QuickReplies";
import ContactTab from "./ContactTab";

const ChatPanel = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "contact">("chat");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleWhatsAppChat = () => {
    const text = message
      ? `Hello! My name is ${name || "Customer"}. ${message}`
      : "Hello! I'd like to inquire about your services.";
    window.open(`https://wa.me/254743101738?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-xl overflow-hidden origin-bottom-right"
    >
      {/* Header */}
      <div className="p-4" style={{ background: "var(--gradient-brand)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-white">Nosteq Support</h4>
            <p className="text-sm text-white/80 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Online · Replies instantly
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["chat", "contact"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 max-h-[400px] overflow-y-auto">
        {activeTab === "chat" ? (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-accent rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                <p className="text-sm">
                  Hello! 👋 I'm your Nosteq assistant. We've helped 5,000+ businesses with fiber internet, CCTV security, data centers, and custom software. How can we help you today?
                </p>
              </div>
            </div>

            <QuickReplies onSelect={setMessage} />

            <div className="space-y-3 pt-2">
              <div>
                <Input
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-accent/50"
                />
                {!name.trim() && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Adding your name helps us personalize the conversation
                  </p>
                )}
              </div>
              <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-accent/50 resize-none"
                rows={3}
              />
              <Button
                onClick={handleWhatsAppChat}
                disabled={!message.trim()}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaWhatsapp className="w-5 h-5 mr-2" />
                Continue on WhatsApp
              </Button>
            </div>
          </div>
        ) : (
          <ContactTab />
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-accent/30">
        <p className="text-xs text-center text-muted-foreground">
          Powered by Nosteq Networks
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;

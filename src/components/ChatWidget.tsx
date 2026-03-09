import { useState } from "react";
import { MessageCircle, X, Phone, Mail, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "contact">("chat");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleWhatsAppChat = () => {
    const text = message 
      ? `Hello! My name is ${name || "Customer"}. ${message}`
      : "Hello! I'd like to inquire about your services.";
    window.open(`https://wa.me/254743101738?text=${encodeURIComponent(text)}`, "_blank");
  };

  const quickReplies = [
    "Show fintech & banking case studies",
    "I need Fiber Internet for my business",
    "I need CCTV & branch security setup",
    "I need a Data Center / server room upgrade",
    "I need custom Software & App Development",
    "Request a quote for my project",
    "I need technical support",
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${
          isOpen 
            ? "bg-destructive text-destructive-foreground" 
            : "bg-[#25D366] text-white"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Notification Badge */}
      {!isOpen && (
        <div className="fixed bottom-[88px] right-6 z-50 animate-fade-in">
          <div className="bg-card border border-border rounded-lg p-3 shadow-lg max-w-[200px]">
            <p className="text-sm text-foreground">👋 Need help?</p>
            <p className="text-xs text-muted-foreground mt-1">Chat with us now</p>
          </div>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-xl overflow-hidden animate-fade-in">
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
                      Hello! 👋 How can we help you today? Choose an option below or type your message.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(reply)}
                      className="text-xs px-3 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                <div className="space-y-3 pt-2">
                  <Input
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-accent/50"
                  />
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-accent/50 resize-none"
                    rows={3}
                  />
                  <Button 
                    onClick={handleWhatsAppChat}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                  >
                    <FaWhatsapp className="w-5 h-5 mr-2" />
                    Continue on WhatsApp
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Reach us through any of these channels:
                </p>

                <a
                  href="https://wa.me/254743101738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <FaWhatsapp className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">WhatsApp</h5>
                    <p className="text-xs text-muted-foreground">+254 743 101 738</p>
                  </div>
                </a>

                <a
                  href="tel:+254743101738"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">Phone</h5>
                    <p className="text-xs text-muted-foreground">+254 743 101 738</p>
                  </div>
                </a>

                <a
                  href="mailto:info@nosteq.co.ke"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">Email</h5>
                    <p className="text-xs text-muted-foreground">info@nosteq.co.ke</p>
                  </div>
                </a>

                <div className="p-4 bg-accent rounded-xl">
                  <h5 className="font-semibold text-sm mb-2">Business Hours</h5>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Mon – Fri: 8:00 AM – 6:00 PM</p>
                    <p>Saturday: 9:00 AM – 4:00 PM</p>
                    <p>Sunday: Closed (Emergency support available)</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border bg-accent/30">
            <p className="text-xs text-center text-muted-foreground">
              Powered by Nosteq Networks
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

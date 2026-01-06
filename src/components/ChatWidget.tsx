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
      ? `Habari! My name is ${name || "Customer"}. ${message}`
      : "Habari! I'd like to inquire about your services.";
    window.open(`https://wa.me/254743101738?text=${encodeURIComponent(text)}`, "_blank");
  };

  const quickReplies = [
    "I need fiber internet",
    "CCTV installation inquiry",
    "Request a quote",
    "Technical support"
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen 
            ? "bg-destructive text-destructive-foreground rotate-90" 
            : "bg-[#25D366] text-white animate-pulse"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>

      {/* Notification Badge */}
      {!isOpen && (
        <div className="fixed bottom-20 right-6 z-50 animate-fade-in">
          <div className="bg-card border border-border rounded-lg p-3 shadow-xl max-w-[200px]">
            <p className="text-sm text-foreground">
              👋 Karibu! Need help?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Chat with us now
            </p>
          </div>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card border-r border-b border-border rotate-45" />
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold">Nosteq Support</h4>
                <p className="text-sm opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online now • Replies instantly
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === "chat"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === "contact"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contact
            </button>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[400px] overflow-y-auto">
            {activeTab === "chat" ? (
              <div className="space-y-4">
                {/* Welcome Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                    <p className="text-sm">
                      Karibu Nosteq! 👋 How can we help you today? Choose an option below or type your message.
                    </p>
                  </div>
                </div>

                {/* Quick Replies */}
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(reply)}
                      className="text-xs px-3 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div className="space-y-3 pt-2">
                  <Input
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-muted/50"
                  />
                  <Textarea
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-muted/50 resize-none"
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

                {/* Contact Options */}
                <a
                  href="https://wa.me/254743101738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20">
                    <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <h5 className="font-semibold">WhatsApp</h5>
                    <p className="text-sm text-muted-foreground">+254 743 101 738</p>
                  </div>
                </a>

                <a
                  href="tel:+254743101738"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold">Phone Call</h5>
                    <p className="text-sm text-muted-foreground">+254 743 101 738</p>
                  </div>
                </a>

                <a
                  href="mailto:info@nosteq.co.ke"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-secondary hover:bg-secondary/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h5 className="font-semibold">Email</h5>
                    <p className="text-sm text-muted-foreground">info@nosteq.co.ke</p>
                  </div>
                </a>

                {/* Business Hours */}
                <div className="p-4 bg-muted/50 rounded-xl">
                  <h5 className="font-semibold text-sm mb-2">Business Hours</h5>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed (Emergency support available)</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border bg-muted/30">
            <p className="text-xs text-center text-muted-foreground">
              Powered by Nosteq Networks • Kiambu, Kenya 🇰🇪
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
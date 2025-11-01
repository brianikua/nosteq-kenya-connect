import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp integration
    const whatsappMessage = `New Quote Request%0A%0AName: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0ALocation: ${formData.location}%0AService: ${formData.service}`;
    window.open(`https://wa.me/254743101738?text=${whatsappMessage}`, "_blank");
    
    toast({
      title: "Quote Request Sent!",
      description: "Our team will contact you shortly via WhatsApp.",
    });
    
    onClose();
    setFormData({ name: "", phone: "", email: "", location: "", service: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-lg border-border">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl gradient-text">Get Instant Quote</DialogTitle>
          <DialogDescription>
            Fill in your details and we'll send you a customized quote immediately
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="quote-name">Full Name *</Label>
            <Input
              id="quote-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quote-phone">Phone *</Label>
              <Input
                id="quote-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+254 7XX XXX XXX"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="quote-email">Email</Label>
              <Input
                id="quote-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="quote-location">Location *</Label>
            <Input
              id="quote-location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Kiambu, Nairobi"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="quote-service">Service Interest *</Label>
            <Select
              required
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internet">Fiber Internet</SelectItem>
                <SelectItem value="cctv">CCTV & Security</SelectItem>
                <SelectItem value="it">IT Solutions</SelectItem>
                <SelectItem value="smart">Smart Home</SelectItem>
                <SelectItem value="voip">VoIP & Telephony</SelectItem>
                <SelectItem value="hosting">Data Center Hosting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" variant="hero" className="w-full" size="lg">
            <Send className="w-4 h-4 mr-2" />
            Request Quote
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;

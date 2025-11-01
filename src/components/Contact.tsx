import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp integration
    const whatsappMessage = `New inquiry from ${formData.name}%0A%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AService: ${formData.service}%0A%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/254743101738?text=${whatsappMessage}`, "_blank");
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you shortly via WhatsApp.",
    });
    
    // Reset form
    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-muted/30 relative">
      <div className="absolute inset-0 kitenge-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Wasiliana Nasi</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Get in touch with Kenya's tech experts
          </p>
          <div className="flag-divider w-32 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card/80 backdrop-blur-sm border-border animate-fade-in">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form and we'll respond within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 7XX XXX XXX"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="service">Service Interest *</Label>
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

                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirements..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full" size="lg">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Get in Touch</CardTitle>
                <CardDescription>We're here to help you get connected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a href="tel:+254743101738" className="text-muted-foreground hover:text-primary transition-colors">
                      +254 743 101 738
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a href="mailto:info@nosteq.co.ke" className="text-muted-foreground hover:text-secondary transition-colors">
                      info@nosteq.co.ke
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-muted-foreground">
                      Banana Hill, Kiambu<br />
                      Kenya
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <CardContent className="p-6 text-center">
                <h4 className="font-heading text-xl font-bold mb-2">Business Hours</h4>
                <p className="text-muted-foreground mb-1">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-muted-foreground mb-1">Saturday: 9:00 AM - 4:00 PM</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
                <p className="text-sm text-primary font-semibold mt-4">24/7 Emergency Support Available</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

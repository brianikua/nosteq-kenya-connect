import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `New inquiry from ${formData.name}%0A%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AService: ${formData.service}%0A%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/254743101738?text=${whatsappMessage}`, "_blank");
    toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-accent/30 relative">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-2 md:mb-3">Let's Talk</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              Tell Us What <span className="gradient-text">You Need</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              No sales pitch — just a conversation about what's not working and how we can help fix it.
            </p>
            <div className="brand-divider w-24 mx-auto mt-6 md:mt-8" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          <ScrollReveal direction="left">
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="pb-4 md:pb-6">
                <CardTitle className="font-heading text-xl md:text-2xl">Send Us a Message</CardTitle>
                <CardDescription className="text-sm">Fill out the form and we'll respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+254 7XX XXX XXX" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="service">Service Interest *</Label>
                    <Select required value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select a service" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internet">Fiber Internet</SelectItem>
                        <SelectItem value="cctv">CCTV & Security</SelectItem>
                        <SelectItem value="datacenter">Data Center Solutions</SelectItem>
                        <SelectItem value="networking">Structured Cabling & Networks</SelectItem>
                        <SelectItem value="software">Software Development</SelectItem>
                        <SelectItem value="consulting">IT Consulting</SelectItem>
                        <SelectItem value="smart">Smart Building Automation</SelectItem>
                        <SelectItem value="voip">VoIP & Communications</SelectItem>
                        <SelectItem value="hosting">Cloud & Hosting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea id="message" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your requirements..." rows={4} className="mt-1" />
                  </div>
                  <Button type="submit" variant="hero" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="space-y-4 md:space-y-6">
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-4 md:pb-6">
                  <CardTitle className="font-heading text-xl md:text-2xl">Contact Information</CardTitle>
                  <CardDescription className="text-sm">Reach us through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 md:space-y-6">
                  {[
                    { icon: Phone, label: "Phone", value: "+254 743 101 738", href: "tel:+254743101738" },
                    { icon: Mail, label: "Email", value: "info@nosteq.co.ke", href: "mailto:info@nosteq.co.ke" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">{item.label}</h4>
                        <a href={item.href} className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors break-all">{item.value}</a>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-0.5 md:mb-1 text-sm md:text-base">Office</h4>
                      <p className="text-sm md:text-base text-muted-foreground">Banana Hill, Kiambu<br />Kenya</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-5 md:p-6 text-center">
                  <h4 className="font-heading text-lg md:text-xl font-bold mb-2 md:mb-3">Business Hours</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
                    <p>Saturday: 9:00 AM – 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                  <p className="text-xs md:text-sm text-primary font-semibold mt-3 md:mt-4">24/7 Emergency Support Available</p>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;

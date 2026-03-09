import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import cctvImage from "@/assets/cctv-install.jpg";
import serverImage from "@/assets/server-room.jpg";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  { text: "We used to lose hours every week to network issues. Since Nosteq came in, we haven't thought about connectivity once — it just works. That's exactly what we needed.", author: "Jane W.", role: "Operations Director", location: "Financial Services", rating: 5 },
  { text: "What impressed us most wasn't just the CCTV quality — it was how they took time to understand our security concerns before recommending anything. The 8-floor install was seamless.", author: "John K.", role: "Facilities Manager", location: "Commercial Real Estate", rating: 5 },
  { text: "We were spending a fortune on disconnected IT systems. Nosteq helped us consolidate everything and the savings were immediate. They genuinely care about your bottom line.", author: "Sarah M.", role: "CEO", location: "Tech Startup", rating: 5 },
  { text: "Most ISPs give you a number to call when things break. Nosteq gave us a dedicated account manager who knows our setup inside out. That personal touch makes all the difference.", author: "Michael O.", role: "IT Manager", location: "Media Company", rating: 5 },
];

const About = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="about" className="py-24 section-dark relative overflow-hidden">
      <div className="absolute inset-0 subtle-pattern" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">About Us</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              The People Behind <span className="gradient-text">Your Network</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just another IT company. We're the team that picks up the phone at 2am when your server goes down.
            </p>
            <div className="brand-divider w-24 mx-auto mt-8" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-4">How We Got Here</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Nosteq started with a simple frustration: businesses in East Africa deserved better IT infrastructure than what was available. So we built a company around that belief.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Today, we're a <span className="text-primary font-semibold">fully licensed, multi-certified</span> IT company serving everyone from startups running their first office to banks processing millions of daily transactions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our approach is simple: <span className="text-primary font-semibold">understand first, then build</span>. Every solution we deliver is designed around your actual needs — not a cookie-cutter package from a product catalog.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "5,000+", label: "Happy Clients", color: "text-primary" },
                  { value: "10+", label: "Years in the Field", color: "text-primary" },
                  { value: "24/7", label: "Real Human Support", color: "text-secondary" },
                ].map((stat, i) => (
                  <Card key={i} className="bg-accent text-center p-5 border-border shadow-sm">
                    <div className={`font-heading text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img src={cctvImage} alt="Our team installing enterprise CCTV systems" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg mt-8">
                <img src={serverImage} alt="Inside our data center facility" className="w-full h-64 object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-3xl font-bold text-center mb-8">
              Don't Take Our Word — <span className="gradient-text">Hear From Clients</span>
            </h3>
            
            <Card className="bg-card border-border shadow-sm relative overflow-hidden">
              <div className="absolute top-6 left-6 text-primary/10"><Quote className="w-16 h-16" /></div>
              <CardContent className="p-8 md:p-12 relative">
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-heading font-bold text-lg">{testimonials[currentTestimonial].author}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role} · {testimonials[currentTestimonial].location}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={prevTestimonial}><ChevronLeft className="w-4 h-4" /></Button>
                    <Button variant="outline" size="icon" onClick={nextTestimonial}><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </div>
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button key={index} onClick={() => setCurrentTestimonial(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentTestimonial ? "bg-primary w-8" : "bg-border"}`} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;

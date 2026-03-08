import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import cctvImage from "@/assets/cctv-install.jpg";
import serverImage from "@/assets/server-room.jpg";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  { text: "Nosteq completely transformed our office connectivity. Zero downtime since installation, and the support team responds within minutes. A true enterprise-grade partner.", author: "Jane W.", role: "Operations Director", location: "Financial Services", rating: 5 },
  { text: "The CCTV installation was completed ahead of schedule with crystal-clear feeds across all 8 floors. Their attention to detail and professionalism is unmatched.", author: "John K.", role: "Facilities Manager", location: "Commercial Real Estate", rating: 5 },
  { text: "Their IT consulting saved us significant costs by consolidating our infrastructure. The team understood our needs perfectly and delivered beyond expectations.", author: "Sarah M.", role: "CEO", location: "Tech Startup", rating: 5 },
  { text: "Reliable fiber with consistent speeds at all hours. The dedicated account manager makes everything seamless — from billing to technical support.", author: "Michael O.", role: "IT Manager", location: "Media Company", rating: 5 },
];

const About = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 subtle-pattern" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">About Us</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">Nosteq?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A trusted technology partner delivering international-grade IT solutions.
            </p>
            <div className="brand-divider w-24 mx-auto mt-8" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-4">Our Story</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Nosteq Networks Limited is a full-service IT technology company delivering enterprise-grade connectivity, security, and infrastructure solutions.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    <span className="text-primary font-semibold">Fully licensed and certified</span>, we serve residential, commercial, and enterprise clients with solutions that meet international standards for reliability, performance, and security.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our mission is to bridge the digital divide by bringing <span className="text-primary font-semibold">world-class IT infrastructure</span> to every client, powered by deep technical expertise and a commitment to excellence.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "5000+", label: "Active Clients", color: "text-primary" },
                  { value: "10+", label: "Years Experience", color: "text-primary" },
                  { value: "24/7", label: "Support", color: "text-secondary" },
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
                <img src={cctvImage} alt="Enterprise CCTV installation" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg mt-8">
                <img src={serverImage} alt="Nosteq data center infrastructure" className="w-full h-64 object-cover" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-3xl font-bold text-center mb-8">
              What Our <span className="gradient-text">Clients Say</span>
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

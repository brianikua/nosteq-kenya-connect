import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import cctvImage from "@/assets/cctv-install.jpg";
import serverImage from "@/assets/server-room.jpg";

const testimonials = [
  {
    text: "Switched to Nosteq – zero downtime, blazing speeds! Best decision for my shamba. My business runs smoothly now, even during peak hours.",
    author: "Jane Wanjiku",
    role: "Business Owner",
    location: "Kiambu",
    rating: 5
  },
  {
    text: "CCTV install was flawless. Crystal-clear feeds 24/7, like watching over my herd. The team was professional and finished ahead of schedule.",
    author: "John Kimani",
    role: "Homeowner",
    location: "Nairobi",
    rating: 5
  },
  {
    text: "Their IT solutions saved our office thousands. Highly recommend – truly Kenyan ingenuity! The support team is always responsive.",
    author: "Sarah Muthoni",
    role: "CEO, Corp Ltd",
    location: "Westlands",
    rating: 5
  },
  {
    text: "Affordable, reliable fiber. 5 stars – Hakuna Matata connectivity! Gaming has never been this smooth. Upload speeds are incredible too.",
    author: "Mike Otieno",
    role: "Gamer & Streamer",
    location: "Banana Hill",
    rating: 5
  }
];

const About = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 kitenge-pattern opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Kwa Nini Nosteq?</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Kenya's Premier Tech Innovator
          </p>
          <div className="flag-divider w-32 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Company Story */}
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-4">Our Story</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nosteq Networks Limited, headquartered in <span className="text-foreground font-semibold">Kiambu</span>, delivers cutting-edge connectivity and security solutions across Nairobi and beyond.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <span className="text-secondary font-semibold">Licensed by CA Kenya</span>, we empower homes, businesses, and enterprises with reliable tech that honors Kenyan heritage – from savannah speeds to urban security.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to bridge the digital divide, bringing <span className="text-primary font-semibold">world-class internet infrastructure</span> to every corner of Kenya, powered by local expertise and global standards.
                </p>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-primary/10 border-primary/30 text-center p-4">
                <div className="font-heading text-3xl font-bold text-primary">5000+</div>
                <div className="text-xs text-muted-foreground mt-1">Happy Customers</div>
              </Card>
              <Card className="bg-secondary/10 border-secondary/30 text-center p-4">
                <div className="font-heading text-3xl font-bold text-secondary">10+</div>
                <div className="text-xs text-muted-foreground mt-1">Years Experience</div>
              </Card>
              <Card className="bg-accent/10 border-accent/30 text-center p-4">
                <div className="font-heading text-3xl font-bold text-accent">24/7</div>
                <div className="text-xs text-muted-foreground mt-1">Support Available</div>
              </Card>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="rounded-xl overflow-hidden maasai-border cyber-glow">
              <img src={cctvImage} alt="CCTV installation in Kenyan building" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden maasai-border cyber-glow mt-8">
              <img src={serverImage} alt="Nosteq data center with Kenyan cultural elements" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-heading text-3xl font-bold text-center mb-8">
            What Our <span className="gradient-text">Customers Say</span>
          </h3>
          
          <Card className="bg-card/80 backdrop-blur-sm border-border relative overflow-hidden">
            <div className="absolute top-6 left-6 text-primary/20">
              <Quote className="w-16 h-16" />
            </div>
            
            <CardContent className="p-8 md:p-12 relative">
              <div className="mb-6 flex gap-1">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-heading font-bold text-lg">{testimonials[currentTestimonial].author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prevTestimonial}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextTestimonial}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial ? "bg-primary w-8" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;

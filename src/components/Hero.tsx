import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroTechnicians from "@/assets/hero-technicians.jpg";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroProps {
  onQuoteClick: () => void;
}

const Hero = ({ onQuoteClick }: HeroProps) => {
  const scrollToPackages = () => {
    const element = document.getElementById("packages");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium text-primary maasai-border">
                <Zap className="inline w-4 h-4 mr-2" />
                Licensed by CA Kenya
              </span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">Karibu</span> Nosteq<br />
              Networks Limited
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              <span className="font-semibold text-foreground">Powering Kenya's Digital Future</span>
              <br />
              Blazing-Fast Fiber Internet | Enterprise IT Solutions | 24/7 CCTV Security | Unmatched Reliability, Inspired by Kenyan Strength
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Button variant="hero" size="lg" onClick={scrollToPackages}>
                View Packages
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="cta" size="lg" onClick={onQuoteClick}>
                Get Instant Quote
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start pt-8">
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-primary">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-secondary">1Gbps</div>
                <div className="text-xs text-muted-foreground">Max Speed</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-3xl font-bold text-accent">24/7</div>
                <div className="text-xs text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-2xl overflow-hidden maasai-border cyber-glow">
              <img
                src={heroTechnicians}
                alt="Nosteq technicians installing fiber optic cables in Kenya"
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

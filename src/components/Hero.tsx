import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroTechnicians from "@/assets/hero-technicians.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import ScrollReveal from "./ScrollReveal";

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
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="text-center md:text-left space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary-foreground backdrop-blur-sm">
                  <Zap className="inline w-4 h-4 mr-2" />
                  Certified IT Infrastructure Partner
                </span>
              </div>
              
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-primary-foreground">
                Full-Stack IT
                <br />
                <span className="gradient-text">Technology</span>
                <br />
                Solutions
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl leading-relaxed">
                Enterprise fiber networks · Intelligent CCTV security · Data center infrastructure · Custom software development — all under one roof.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                <Button variant="hero" size="lg" onClick={scrollToPackages}>
                  View Packages
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="cta" size="lg" onClick={onQuoteClick}>
                  Get a Free Quote
                </Button>
              </div>

              <div className="flex flex-wrap gap-8 justify-center md:justify-start pt-6">
                {[
                  { value: "99.9%", label: "Uptime SLA" },
                  { value: "1Gbps", label: "Max Speed" },
                  { value: "24/7", label: "Support" },
                  { value: "5000+", label: "Clients Served" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-heading text-3xl font-bold text-primary-foreground">{stat.value}</div>
                    <div className="text-sm text-primary-foreground/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroTechnicians}
                  alt="Nosteq engineering team deploying enterprise infrastructure"
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

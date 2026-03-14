import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroTechnicians from "@/assets/hero-technicians.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import ScrollReveal from "./ScrollReveal";
import { getContent } from "@/lib/contentStore";

interface HeroProps {
  onQuoteClick: () => void;
}

const PARTICLE_COUNT = 40;

// Brand colors: Blue (215, 90%, 52%) & Maroon (345, 65%, 35%)
const BRAND_BLUE = { r: 26, g: 115, b: 232 };
const BRAND_MAROON = { r: 147, g: 31, b: 63 };

function createParticles(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const particles = Array.from({ length: PARTICLE_COUNT }, () => {
    const isBlue = Math.random() > 0.4; // 60% blue, 40% maroon
    const color = isBlue ? BRAND_BLUE : BRAND_MAROON;
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      color,
    };
  });

  let animId: number;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections with gradient-like colors
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const alpha = 0.12 * (1 - dist / 150);
          // Blend the two particle colors for the line
          const c1 = particles[i].color;
          const c2 = particles[j].color;
          const avgR = Math.round((c1.r + c2.r) / 2);
          const avgG = Math.round((c1.g + c2.g) / 2);
          const avgB = Math.round((c1.b + c2.b) / 2);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }

    animId = requestAnimationFrame(draw);
  }

  draw();
  return () => cancelAnimationFrame(animId);
}

const Hero = ({ onQuoteClick }: HeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const content = getContent();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cleanup = createParticles(canvas, ctx);
    return () => {
      cleanup();
      window.removeEventListener("resize", resize);
    };
  }, []);

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

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
      />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="text-center md:text-left space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary-foreground backdrop-blur-sm">
                  <Zap className="inline w-4 h-4 mr-2" />
                  {content.hero.badge}
                </span>
              </div>
              
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-primary-foreground">
                We Build the
                <br />
                <span className="gradient-text">IT Backbone</span>
                <br />
                Your Business Runs On
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl leading-relaxed">
                From lightning-fast fiber to intelligent security, data centers to custom software — we handle it all so you can focus on what you do best.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
                <Button variant="hero" size="lg" onClick={scrollToPackages}>
                  See What We Offer
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="cta" size="lg" onClick={onQuoteClick}>
                  Talk to Our Team — Free
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

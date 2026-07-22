import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import heroTechnicians from "@/assets/hero-technicians.jpg";
import fiberImg from "@/assets/services/fiber-internet.jpg";
import cctvImg from "@/assets/services/cctv-security.jpg";
import serverImg from "@/assets/server-room.jpg";
import dataCenterImg from "@/assets/services/data-center.jpg";
import cablingImg from "@/assets/services/structured-cabling.jpg";
import smartBuildingImg from "@/assets/services/smart-building.jpg";
import voipImg from "@/assets/services/voip-communications.jpg";
import ScrollReveal from "./ScrollReveal";
import { useSiteContent } from "@/lib/contentStore";

interface HeroProps {
  onQuoteClick: () => void;
}

const Hero = ({ onQuoteClick }: HeroProps) => {
  const content = useSiteContent();

  const scrollToPackages = () => {
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-background overflow-hidden">
      {/* Soft editorial backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 right-[-10%] w-[520px] h-[520px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-[-10%] w-[420px] h-[420px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute inset-0 subtle-pattern opacity-60" />
      </div>

      <div className="container mx-auto px-4">
        {/* Editorial masthead: eyebrow + big serif headline */}
        <ScrollReveal>
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="eyebrow">{content.hero.badge}</span>
              <span className="h-px flex-1 max-w-[120px] bg-border" />
            </div>

            <h1 className="font-heading text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.98] text-foreground">
              {content.hero.heading[0]}
              <br />
              <span className="italic text-primary">{content.hero.heading[1]}</span>
              <br />
              {content.hero.heading[2]}
            </h1>
          </div>
        </ScrollReveal>

        {/* Two-column: lede + visual */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-12 lg:mt-16 items-start">
          <ScrollReveal direction="left" delay={0.05}>
            <div className="lg:col-span-5 space-y-8">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                {content.hero.subheading}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="lg" onClick={scrollToPackages}>
                  See what we offer
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={onQuoteClick}>
                  Talk to our team
                </Button>
              </div>

              {/* Live NOC badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-border bg-card shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-foreground">Live NOC · 99.99% uptime this month</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[440px] md:h-[520px]">
                <div className="col-span-4 row-span-6 relative rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)] group">
                  <img src={heroTechnicians} alt="Nosteq engineering team deploying enterprise infrastructure" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div className="backdrop-blur-md bg-white/85 px-3 py-2 rounded-lg">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Field engineering</div>
                      <div className="text-sm font-semibold text-foreground">Deployments · Nairobi</div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-md group">
                  <img src={fiberImg} alt="Fiber backbone" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-widest text-white">Fiber</div>
                </div>
                <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-md group">
                  <img src={serverImg} alt="Data halls" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-widest text-white">Data halls</div>
                </div>
                <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-md group">
                  <img src={cctvImg} alt="Security" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-widest text-white">Security</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Hero stats — editorial rule */}
        <div className="mt-16 md:mt-20 border-t border-border pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.hero.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance strip */}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> CA-licensed ISP</span>
          <span>·</span>
          <span>ISO-aligned processes</span>
          <span>·</span>
          <span>KYC-first onboarding</span>
          <span>·</span>
          <span>24/7 NOC</span>
        </div>

        {/* Marquee — teaser strip */}
        <div className="mt-12 relative overflow-hidden rounded-xl border border-border bg-muted/50">
          <div className="flex gap-3 py-3 animate-marquee whitespace-nowrap">
            {[fiberImg, cctvImg, serverImg, dataCenterImg, cablingImg, smartBuildingImg, voipImg, heroTechnicians, fiberImg, cctvImg, serverImg, dataCenterImg].map((src, i) => (
              <img key={i} src={src} alt="" className="h-14 w-24 object-cover rounded-md flex-shrink-0 opacity-90" />
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-muted to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-muted to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

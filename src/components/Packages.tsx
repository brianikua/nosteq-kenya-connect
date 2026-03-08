import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "./ScrollReveal";

const homePackages = [
  { name: "Starter", speed: "8 Mbps", price: "2,000", description: "Ideal for basic browsing and email", features: ["Basic browsing & email", "Social media access", "Light video calls", "Free installation", "24/7 support"], popular: false },
  { name: "Pro", speed: "15 Mbps", price: "2,500", description: "Great for streaming and remote work", features: ["HD streaming (720p)", "Video calls & conferencing", "Multiple devices (5+)", "Free installation", "Priority support"], popular: false },
  { name: "Turbo", speed: "50 Mbps", price: "3,000", description: "High performance for demanding users", features: ["4K streaming", "Online gaming", "Work from home ready", "Free router upgrade", "Dedicated support line"], popular: true },
  { name: "Ultra", speed: "100 Mbps+", price: "4,000+", description: "Maximum speed, zero compromise", features: ["Unlimited everything", "Enterprise-ready", "Static IP available", "Premium equipment", "Account manager"], popular: false },
];

const businessPackages = [
  { name: "SME Starter", speed: "20 Mbps", price: "5,000", description: "Built for small businesses", features: ["Up to 10 devices", "Business-grade router", "99.5% uptime SLA", "Email & web hosting", "8am-8pm support"], popular: false },
  { name: "Corporate", speed: "50 Mbps", price: "8,500", description: "Reliable connectivity for growing teams", features: ["Up to 25 devices", "Static IP address", "99.7% uptime SLA", "VPN connectivity", "Priority 24/7 support"], popular: false },
  { name: "Enterprise", speed: "100 Mbps", price: "15,000", description: "Dedicated performance for large organizations", features: ["Unlimited devices", "Dedicated bandwidth", "99.9% uptime SLA", "Free backup line", "Dedicated account manager"], popular: true },
  { name: "Premium", speed: "200 Mbps+", price: "25,000+", description: "Maximum performance, custom SLA", features: ["Scalable bandwidth", "Multiple static IPs", "99.95% uptime guarantee", "On-site support", "Custom SLA terms"], popular: false },
];

const Packages = () => {
  const [planType, setPlanType] = useState<"home" | "business">("home");

  return (
    <section id="packages" className="py-24 bg-accent/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="gradient-text">Internet Package</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. All packages include unlimited data and free installation.
            </p>
            
            <div className="inline-flex items-center gap-1 p-1 bg-card rounded-lg border border-border shadow-sm">
              <button onClick={() => setPlanType("home")} className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${planType === "home" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>Home</button>
              <button onClick={() => setPlanType("business")} className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${planType === "business" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>Business</button>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {(planType === "home" ? homePackages : businessPackages).map((pkg, index) => (
            <ScrollReveal key={`${planType}-${index}`} delay={index * 0.08}>
              <Card className={`relative bg-card transition-all duration-300 hover:-translate-y-1 h-full ${pkg.popular ? "border-primary border-2 shadow-[0_8px_30px_hsl(var(--primary)/0.15)]" : "border-border shadow-sm"}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground font-semibold px-4 py-1 shadow-md">
                      <Sparkles className="w-3 h-3 mr-1 inline" />
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="font-heading text-2xl mb-1">{pkg.name}</CardTitle>
                  <div className="mt-4"><span className="text-4xl font-bold text-primary">{pkg.speed}</span></div>
                  <div className="mt-4">
                    <span className="text-sm text-muted-foreground">From </span>
                    <span className="text-3xl font-bold text-foreground">KES {pkg.price}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="text-xs mt-2">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={pkg.popular ? "hero" : "outline"} className="w-full mt-6" onClick={() => window.open(`https://wa.me/254743101738?text=Hi, I'm interested in the ${pkg.name} package (${pkg.speed})`, "_blank")}>
                    Subscribe Now
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">All packages include unlimited data & free standard installation</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="px-4 py-2"><Shield className="w-4 h-4 mr-2 inline" />24/7 Support</Badge>
              <Badge variant="outline" className="px-4 py-2"><Check className="w-4 h-4 mr-2 inline" />No Hidden Fees</Badge>
              <Badge variant="outline" className="px-4 py-2"><Sparkles className="w-4 h-4 mr-2 inline" />Free Installation</Badge>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Packages;

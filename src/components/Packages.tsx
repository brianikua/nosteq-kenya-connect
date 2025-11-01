import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const homePackages = [
  {
    name: "Starter",
    swahili: "Mwanzo",
    speed: "8 Mbps",
    price: "2,000",
    description: "Perfect for village connectivity",
    features: [
      "Basic browsing & email",
      "Social media access",
      "Light video calls",
      "Free installation",
      "24/7 support"
    ],
    popular: false
  },
  {
    name: "Pro",
    swahili: "Mtaalamu",
    speed: "15 Mbps",
    price: "2,500",
    description: "Inspired by bustling Kenyan markets",
    features: [
      "HD streaming (720p)",
      "Video calls & conferencing",
      "Multiple devices (5+)",
      "Free installation",
      "Priority support"
    ],
    popular: false
  },
  {
    name: "Turbo",
    swahili: "Haraka Sana",
    speed: "50 Mbps",
    price: "3,000",
    description: "Fast as a Kenyan marathon runner",
    features: [
      "4K streaming",
      "Online gaming",
      "Work from home ready",
      "Free router upgrade",
      "Dedicated support line"
    ],
    popular: true
  },
  {
    name: "Ultra",
    swahili: "Bora Kabisa",
    speed: "100 Mbps+",
    price: "4,000+",
    description: "Powering Kenya's digital safari",
    features: [
      "Unlimited everything",
      "Enterprise-ready",
      "Static IP available",
      "Premium equipment",
      "Account manager"
    ],
    popular: false
  }
];

const businessPackages = [
  {
    name: "SME Starter",
    swahili: "Biashara Ndogo",
    speed: "20 Mbps",
    price: "5,000",
    description: "Perfect for small businesses",
    features: [
      "Up to 10 devices",
      "Business-grade router",
      "99.5% uptime SLA",
      "Email & web hosting",
      "8am-8pm support"
    ],
    popular: false
  },
  {
    name: "Corporate",
    swahili: "Kampuni",
    speed: "50 Mbps",
    price: "8,500",
    description: "Built for growing enterprises",
    features: [
      "Up to 25 devices",
      "Static IP address",
      "99.7% uptime SLA",
      "VPN connectivity",
      "Priority 24/7 support"
    ],
    popular: false
  },
  {
    name: "Enterprise",
    swahili: "Biashara Kubwa",
    speed: "100 Mbps",
    price: "15,000",
    description: "Powering Kenya's business leaders",
    features: [
      "Unlimited devices",
      "Dedicated bandwidth",
      "99.9% uptime SLA",
      "Free backup line",
      "Dedicated account manager"
    ],
    popular: true
  },
  {
    name: "Premium",
    swahili: "Bora Zaidi",
    speed: "200 Mbps+",
    price: "25,000+",
    description: "Maximum performance for large organizations",
    features: [
      "Scalable bandwidth",
      "Multiple static IPs",
      "99.95% uptime guarantee",
      "On-site support",
      "Custom SLA terms"
    ],
    popular: false
  }
];

const Packages = () => {
  const [planType, setPlanType] = useState<"home" | "business">("home");

  return (
    <section id="packages" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Chagua Paketi Yako</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Scalable packages for every Kenyan need
          </p>
          
          {/* Plan Type Toggle */}
          <div className="inline-flex items-center gap-2 p-1 bg-card rounded-lg border border-border">
            <button
              onClick={() => setPlanType("home")}
              className={`px-6 py-2 rounded-md transition-all ${
                planType === "home"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setPlanType("business")}
              className={`px-6 py-2 rounded-md transition-all ${
                planType === "business"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Business
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {(planType === "home" ? homePackages : businessPackages).map((pkg, index) => (
            <Card
              key={index}
              className={`relative bg-card/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 animate-fade-in ${
                pkg.popular ? "border-primary border-2 shadow-[0_0_40px_hsl(var(--primary)/0.3)]" : "border-border"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-accent to-secondary text-foreground font-bold px-4 py-1 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="font-heading text-2xl mb-1">
                  {pkg.name}
                  <span className="block text-sm text-primary font-normal italic mt-1">"{pkg.swahili}"</span>
                </CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold gradient-text">{pkg.speed}</span>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground">From </span>
                  <span className="text-3xl font-bold">KES {pkg.price}</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <CardDescription className="text-xs mt-2 italic">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={pkg.popular ? "hero" : "outline"}
                  className="w-full mt-6"
                  onClick={() => window.open(`https://wa.me/254743101738?text=Hi, I'm interested in the ${pkg.name} package (${pkg.speed})`, "_blank")}
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">All packages include unlimited data & free installation</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2">
              <Shield className="w-4 h-4 mr-2 inline" />
              24/7 Support
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Check className="w-4 h-4 mr-2 inline" />
              No Hidden Fees
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Free Installation
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;

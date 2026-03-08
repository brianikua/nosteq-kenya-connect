import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gauge, Shield, Network, Lightbulb, Phone, Server, ArrowRight, Cable, Database, Code } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: Gauge,
    title: "Fiber Internet Provision",
    description: "High-speed fiber connectivity up to 1Gbps with 99.9% uptime SLA. Dedicated and shared bandwidth options for residential and commercial clients.",
    badge: "Up to 1Gbps"
  },
  {
    icon: Shield,
    title: "CCTV & Security Systems",
    description: "Enterprise-grade 4K surveillance with AI-powered analytics, remote monitoring, access control, and 24/7 incident response.",
    badge: "4K · AI Analytics"
  },
  {
    icon: Cable,
    title: "Structured Cabling & Networks",
    description: "End-to-end structured cabling for voice, data, and video. LAN/WAN design, fiber optics, and unified communications infrastructure.",
    badge: "Voice · Data · Video"
  },
  {
    icon: Database,
    title: "Data Center Solutions",
    description: "Complete data center design and deployment — server racks, cooling, power management, and redundant infrastructure built for maximum uptime.",
    badge: "Enterprise Grade"
  },
  {
    icon: Code,
    title: "Software & App Development",
    description: "Custom web applications, mobile apps, ERP systems, and digital platforms tailored to your business processes and growth goals.",
    badge: "Custom Solutions"
  },
  {
    icon: Network,
    title: "IT Consulting & Integration",
    description: "Strategic IT planning, cloud migration, cybersecurity audits, and enterprise systems integration for seamless digital transformation.",
    badge: "Full Stack IT"
  },
  {
    icon: Lightbulb,
    title: "Smart Building Automation",
    description: "IoT-enabled building management, energy optimization, access control, and intelligent environmental monitoring systems.",
    badge: "IoT Enabled"
  },
  {
    icon: Phone,
    title: "VoIP & Unified Communications",
    description: "Cloud PBX, HD video conferencing, and unified communications platforms that scale with your organization.",
    badge: "HD Quality"
  },
  {
    icon: Server,
    title: "Cloud & Hosting Services",
    description: "Secure colocation, VPS, dedicated servers, and managed cloud infrastructure with redundant power and cooling.",
    badge: "99.9% Uptime"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 subtle-pattern" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Comprehensive <span className="gradient-text">Technology Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From fiber installation to enterprise software — we deliver full-spectrum IT solutions built for reliability and scale.
            </p>
            <div className="brand-divider w-24 mx-auto mt-8" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={index} delay={index * 0.06}>
              <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 card-hover group h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium">
                      {service.badge}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-lg">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <Button variant="ghost" size="sm" className="group/btn text-primary px-0">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

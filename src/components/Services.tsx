import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gauge, Shield, Cable, Database, Code, Network, Lightbulb, Phone, Server, Wifi, Monitor, Cloud, Lock, Cpu, Radio, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { servicesData } from "@/data/services";
import { useSiteContent } from "@/lib/contentStore";
import ScrollReveal from "./ScrollReveal";

const iconMap: Record<string, LucideIcon> = {
  Gauge, Shield, Cable, Database, Code, Network, Lightbulb, Phone, Server, Wifi, Monitor, Cloud, Lock, Cpu, Radio,
};

const Services = () => {
  const { services: cmsServices } = useSiteContent();
  // Merge CMS overrides on top of static services; fall back to static-only when CMS is empty
  const displayServices = cmsServices.length > 0
    ? cmsServices.map((cms) => {
        const staticService = servicesData.find((s) => s.slug === cms.slug);
        return {
          slug: cms.slug,
          title: cms.title,
          badge: cms.badge,
          tagline: cms.tagline,
          icon: iconMap[cms.iconName] || staticService?.icon || Network,
        };
      })
    : servicesData.map((s) => ({ slug: s.slug, title: s.title, badge: s.badge, tagline: s.tagline, icon: s.icon }));
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 subtle-pattern" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Infrastructure Powering Our IaaS</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Every Layer of Your <span className="gradient-text">Connectivity Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our Internet-as-a-Service platform sits on top of ten dedicated engineering practices — from fiber and data centers to CCTV and structured cabling. One provider, one SLA, one invoice.
            </p>
            <div className="brand-divider w-24 mx-auto mt-8" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service, index) => (
            <ScrollReveal key={index} delay={index * 0.06}>
              <Link to={`/services/${service.slug}`} className="block h-full">
                <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 card-hover group h-full cursor-pointer">
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
                      {service.tagline}
                    </CardDescription>
                    <div className="group/btn text-primary text-sm font-medium flex items-center">
                      See how it works
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

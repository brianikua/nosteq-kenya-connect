import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { servicesData } from "@/data/services";
import ScrollReveal from "./ScrollReveal";

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
          {servicesData.map((service, index) => (
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
                    {service.tagline}
                  </CardDescription>
                  <Link to={`/services/${service.slug}`}>
                    <Button variant="ghost" size="sm" className="group/btn text-primary px-0">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
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

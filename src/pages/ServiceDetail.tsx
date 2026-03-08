import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { servicesData } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);
  const currentIndex = servicesData.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null;
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/#services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 subtle-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <Link to="/#services" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <span className="px-4 py-1.5 bg-secondary/10 text-secondary text-sm rounded-full font-medium">
                {service.badge}
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              {service.tagline}
            </p>
            <div className="brand-divider w-24" />
          </ScrollReveal>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-16 relative">
        <div className="absolute inset-0 subtle-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">What's Included</h2>
              <div className="space-y-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">Key Benefits</h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12 text-center">Our Process</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Card className="bg-card border-border h-full relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-heading font-bold text-muted/20">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold text-lg mb-2">{item.step}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies & Use Cases */}
      <section className="py-16 relative">
        <div className="absolute inset-0 subtle-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Technologies We Use</h2>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-accent text-foreground text-sm rounded-lg font-medium border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">Ideal For</h2>
              <div className="flex flex-wrap gap-3">
                {service.useCases.map((useCase, i) => (
                  <span key={i} className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-lg font-medium">
                    {useCase}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Card className="bg-card border-primary/20 p-8 md:p-12 text-center">
              <CardContent className="p-0">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                  Ready to get started with {service.title}?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Let's discuss your requirements and design a solution that fits your needs and budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/#contact">
                    <Button size="lg" className="bg-primary text-primary-foreground">
                      Get a Free Quote
                    </Button>
                  </Link>
                  <Link to="/#contact">
                    <Button size="lg" variant="outline">
                      Schedule a Consultation
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Prev/Next Navigation */}
      <section className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {prevService ? (
              <Link to={`/services/${prevService.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm">{prevService.title}</span>
              </Link>
            ) : <div />}
            {nextService ? (
              <Link to={`/services/${nextService.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
                <span className="text-sm">{nextService.title}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;

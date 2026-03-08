import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, Quote, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { servicesData } from "@/data/services";
import { serviceGalleries } from "@/data/serviceGallery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);
  const currentIndex = servicesData.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : null;
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : null;
  const gallery = slug ? serviceGalleries[slug] || [] : [];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!service) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Service Not Found</h1>
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

      {/* Hero with Image */}
      <section className="pt-16 md:pt-24 pb-0 relative">
        <div className="w-full h-[240px] sm:h-[300px] md:h-[420px] relative overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 -mt-24 sm:-mt-28 md:-mt-32">
          <ScrollReveal>
            <Link to="/#services" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6 md:mb-8 group text-sm">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-xl flex items-center justify-center border border-border shrink-0">
                <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
              <span className="px-3 py-1 md:px-4 md:py-1.5 bg-secondary/10 text-secondary text-xs md:text-sm rounded-full font-medium">
                {service.badge}
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
              {service.title}
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mb-6 md:mb-8">
              {service.tagline}
            </p>
            <div className="brand-divider w-24" />
          </ScrollReveal>
        </div>
      </section>

      {/* Overview */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl">
              <h2 className="font-heading text-xl md:text-3xl font-bold mb-4 md:mb-6">Overview</h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Project Gallery */}
      {gallery.length > 0 && (
        <section className="py-10 md:py-16 relative">
          <div className="absolute inset-0 subtle-pattern" />
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-12">
                <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-2 md:mb-3">Our Work</p>
                <h2 className="font-heading text-xl md:text-3xl font-bold">Project Gallery</h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {gallery.map((img, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div
                    className="group relative overflow-hidden rounded-lg md:rounded-xl cursor-pointer aspect-square"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 md:p-4">
                      <p className="text-xs md:text-sm text-foreground font-medium line-clamp-2">{img.caption}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && gallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[60] bg-background/95 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 z-10 text-muted-foreground hover:text-foreground transition-colors bg-background/50 rounded-full p-2"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-2 bg-background/50 rounded-full"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(Math.max(0, lightboxIndex - 1)); }}
          >
            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center px-10 sm:px-12" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[lightboxIndex].src}
              alt={gallery[lightboxIndex].caption}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <p className="text-muted-foreground mt-3 md:mt-4 text-center text-sm md:text-base">{gallery[lightboxIndex].caption}</p>
          </div>
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-2 bg-background/50 rounded-full"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(Math.min(gallery.length - 1, lightboxIndex + 1)); }}
          >
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      )}

      {/* Features & Benefits */}
      <section className="py-10 md:py-16 relative">
        <div className="absolute inset-0 subtle-pattern" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal>
              <h2 className="font-heading text-xl md:text-3xl font-bold mb-6 md:mb-8">What's Included</h2>
              <div className="space-y-3 md:space-y-4">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-xl md:text-3xl font-bold mb-6 md:mb-8">Key Benefits</h2>
              <div className="space-y-3 md:space-y-4">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                    <span className="text-sm md:text-base text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-heading text-xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Our Process</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {service.process.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Card className="bg-card border-border h-full relative overflow-hidden">
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 text-4xl md:text-6xl font-heading font-bold text-muted/20">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <CardContent className="pt-4 md:pt-6 pb-4">
                    <h3 className="font-heading font-semibold text-sm md:text-lg mb-1 md:mb-2">{item.step}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      {service.testimonials.length > 0 && (
        <section className="py-10 md:py-16 relative">
          <div className="absolute inset-0 subtle-pattern" />
          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-8 md:mb-12">
                <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-2 md:mb-3">Client Stories</p>
                <h2 className="font-heading text-xl md:text-3xl font-bold">What Our Clients Say</h2>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
              {service.testimonials.map((testimonial, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <Card className="bg-card border-border h-full relative overflow-hidden">
                    <CardContent className="pt-6 pb-6 md:pt-8 md:pb-8">
                      <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/20 mb-3 md:mb-4" />
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-1 mb-3 md:mb-4">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3 h-3 md:w-4 md:h-4 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <div className="border-t border-border pt-3 md:pt-4">
                        <p className="font-heading font-semibold text-sm md:text-base text-foreground">{testimonial.name}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technologies & Use Cases */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal>
              <h2 className="font-heading text-xl md:text-3xl font-bold mb-4 md:mb-6">Technologies We Use</h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {service.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-accent text-foreground text-xs md:text-sm rounded-lg font-medium border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-heading text-xl md:text-3xl font-bold mb-4 md:mb-6">Ideal For</h2>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {service.useCases.map((useCase, i) => (
                  <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary text-xs md:text-sm rounded-lg font-medium">
                    {useCase}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Card className="bg-card border-primary/20 p-6 md:p-12 text-center">
              <CardContent className="p-0">
                <h2 className="font-heading text-xl md:text-3xl font-bold mb-3 md:mb-4">
                  Ready to get started with {service.title}?
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto">
                  Let's discuss your requirements and design a solution that fits your needs and budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <Link to="/#contact">
                    <Button size="lg" className="bg-primary text-primary-foreground w-full sm:w-auto">
                      Get a Free Quote
                    </Button>
                  </Link>
                  <Link to="/#contact">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
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
      <section className="py-6 md:py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center gap-4">
            {prevService ? (
              <Link to={`/services/${prevService.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group min-w-0">
                <ArrowLeft className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs sm:text-sm truncate">{prevService.title}</span>
              </Link>
            ) : <div />}
            {nextService ? (
              <Link to={`/services/${nextService.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group min-w-0 text-right">
                <span className="text-xs sm:text-sm truncate">{nextService.title}</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
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

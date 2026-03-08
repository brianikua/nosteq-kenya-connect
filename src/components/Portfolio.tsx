import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Calendar, ArrowRight, ExternalLink, CheckCircle2, Clock, Zap } from "lucide-react";
import { projects, categories, statusConfig, type Project } from "@/data/projects";
import ScrollReveal from "./ScrollReveal";

const statusIcons = { CheckCircle2, Zap, Clock };

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();
  const filteredProjects = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 md:py-24 relative bg-accent/30">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-2 md:mb-3">Real Projects, Real Results</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              See What We've <span className="gradient-text">Built</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Every project tells a story — from the problem that kept someone up at night to the solution that fixed it. Dive into any case study to see the full picture.
            </p>
            <div className="brand-divider w-24 mx-auto mt-6 md:mt-8" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            {categories.map((category) => (
              <Button key={category} variant={activeCategory === category ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(category)} className="text-xs md:text-sm">
                {category}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => {
            const status = statusConfig[project.status];
            const StatusIcon = statusIcons[status.icon as keyof typeof statusIcons];
            return (
              <ScrollReveal key={project.id} delay={index * 0.06}>
                <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 overflow-hidden group card-hover h-full flex flex-col">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <Badge className="absolute top-2 left-2 md:top-3 md:left-3 bg-primary text-primary-foreground text-[10px] md:text-xs">{project.category}</Badge>
                    <div className={`absolute top-2 right-2 md:top-3 md:right-3 flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${status.color} backdrop-blur-sm`}>
                      <StatusIcon className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      {status.label}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3">
                      <h3 className="font-heading font-bold text-sm md:text-lg text-white leading-tight">{project.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-3 md:p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-1.5 md:mb-2">
                      <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" /><span className="truncate">{project.client}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                      <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" /><span className="truncate">{project.location}</span>
                      <span className="ml-auto flex items-center gap-1 shrink-0"><Calendar className="w-3 h-3" />{project.year}</span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center px-2 py-1 md:px-3 md:py-1.5 bg-accent rounded-md">
                          <div className="text-xs md:text-sm font-bold text-primary">{value}</div>
                          <div className="text-[10px] md:text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full group/btn text-primary mt-auto text-xs md:text-sm"
                      onClick={() => navigate(`/case-study/${project.id}`)}
                    >
                      View Case Study <ArrowRight className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="text-center mt-10 md:mt-16 space-y-4">
            <Button variant="outline" size="lg" className="group" onClick={() => navigate("/portfolio")}>
              View All Case Studies <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center pt-2">
              <p className="text-sm md:text-base text-muted-foreground text-center">Ready to build your next mission-critical project?</p>
              <Button variant="hero" className="group w-full sm:w-auto" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Get in Touch <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Portfolio;

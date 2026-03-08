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
    <section id="portfolio" className="py-24 relative bg-accent/30">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Our Work</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Project <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Delivering mission-critical IT infrastructure for fintech, banking, healthcare, and enterprise clients.
            </p>
            <div className="brand-divider w-24 mx-auto mt-8" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button key={category} variant={activeCategory === category ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(category)}>
                {category}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => {
            const status = statusConfig[project.status];
            const StatusIcon = statusIcons[status.icon as keyof typeof statusIcons];
            return (
              <ScrollReveal key={project.id} delay={index * 0.06}>
                <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 overflow-hidden group card-hover h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">{project.category}</Badge>
                    <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color} backdrop-blur-sm`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-heading font-bold text-lg text-white leading-tight">{project.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Building2 className="w-4 h-4 shrink-0" /><span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 shrink-0" /><span>{project.location}</span>
                      <span className="ml-auto flex items-center gap-1 shrink-0"><Calendar className="w-3 h-3" />{project.year}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center px-3 py-1.5 bg-accent rounded-md">
                          <div className="text-sm font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full group/btn text-primary mt-auto"
                      onClick={() => navigate(`/case-study/${project.id}`)}
                    >
                      View Case Study <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <p className="text-muted-foreground">Ready to build your next mission-critical project?</p>
              <Button variant="hero" className="group" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
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

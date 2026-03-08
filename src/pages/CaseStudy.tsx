import { useParams, useNavigate } from "react-router-dom";
import { projects, statusConfig } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Building2, MapPin, Clock, CheckCircle2, Zap, Shield, Quote, ArrowRight, ExternalLink } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const statusIcons = { CheckCircle2, Zap, Clock };

const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")} variant="hero">Back to Home</Button>
        </div>
      </div>
    );
  }

  const status = statusConfig[project.status];
  const StatusIcon = statusIcons[status.icon as keyof typeof statusIcons];
  const currentIndex = projects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${project.image})` }} />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <Button variant="ghost" className="text-primary-foreground/70 hover:text-primary-foreground mb-4 md:mb-6 -ml-2 text-sm" onClick={() => navigate("/#portfolio")}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
            </Button>

            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Badge className="bg-primary/20 text-primary-foreground border-0 text-xs">{project.category}</Badge>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                <StatusIcon className="w-3 h-3" /> {status.label}
              </div>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4 md:mb-6 max-w-4xl">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-3 md:gap-6 text-primary-foreground/70 text-xs md:text-sm mb-6 md:mb-8">
              <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> {project.client}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" /> {project.location}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 md:w-4 md:h-4" /> {project.duration}</span>
            </div>

            {/* Key Metrics */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              {Object.entries(project.stats).map(([key, value]) => (
                <div key={key} className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg md:rounded-xl px-4 py-3 md:px-6 md:py-4 text-center min-w-[80px] md:min-w-[100px]">
                  <div className="text-lg md:text-2xl font-bold text-primary-foreground">{value}</div>
                  <div className="text-[10px] md:text-xs text-primary-foreground/60 capitalize mt-0.5 md:mt-1">{key}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">

            {/* Overview */}
            <ScrollReveal>
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-bold mb-3 md:mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{project.description}</p>
              </div>
            </ScrollReveal>

            {/* The Challenge */}
            <ScrollReveal>
              <Card className="bg-secondary/5 border-secondary/20">
                <CardContent className="p-5 md:p-8">
                  <h2 className="font-heading text-xl md:text-2xl font-bold mb-3 md:mb-4 text-secondary">The Challenge</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{project.challenge}</p>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Our Approach */}
            <ScrollReveal>
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-bold mb-3 md:mb-4">Our Approach</h2>
                <p className="text-muted-foreground leading-relaxed mb-5 md:mb-6 text-sm md:text-base">{project.approach}</p>
                
                <h3 className="font-heading text-base md:text-lg font-semibold mb-3 md:mb-4">Project Scope</h3>
                <ul className="space-y-2 md:space-y-3">
                  {project.scope.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground text-sm md:text-base">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Before / After */}
            <ScrollReveal>
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-bold mb-4 md:mb-6">Before & After</h2>
                <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                  <div className="overflow-hidden rounded-xl border border-border min-w-[400px]">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-accent">
                          <th className="text-left font-heading font-semibold text-xs md:text-sm px-3 md:px-6 py-3 md:py-4">Metric</th>
                          <th className="text-center font-heading font-semibold text-xs md:text-sm px-3 md:px-6 py-3 md:py-4 text-secondary">Before</th>
                          <th className="text-center font-heading font-semibold text-xs md:text-sm px-3 md:px-6 py-3 md:py-4 text-primary">After</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.beforeAfter.map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-accent/50"}>
                            <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-foreground">{row.metric}</td>
                            <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-center text-muted-foreground">{row.before}</td>
                            <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-center font-semibold text-primary">{row.after}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Technologies */}
            <ScrollReveal>
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-bold mb-3 md:mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2">{tech}</Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Outcome */}
            <ScrollReveal>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-5 md:p-8">
                  <h2 className="font-heading text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" /> Outcome & Impact
                  </h2>
                  <p className="text-foreground leading-relaxed text-base md:text-lg">{project.outcome}</p>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Testimonial */}
            {project.testimonial && (
              <ScrollReveal>
                <Card className="bg-card border-border relative overflow-hidden">
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 text-primary/10"><Quote className="w-12 h-12 md:w-16 md:h-16" /></div>
                  <CardContent className="p-6 md:p-12 relative">
                    <p className="text-base md:text-xl text-foreground mb-4 md:mb-6 leading-relaxed italic">
                      "{project.testimonial.quote}"
                    </p>
                    <div>
                      <div className="font-heading font-bold text-sm md:text-base">{project.testimonial.author}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{project.testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            )}

            {/* CTA */}
            <ScrollReveal>
              <div className="text-center bg-accent rounded-2xl p-6 md:p-10 border border-border">
                <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 md:mb-3">Need a Similar Solution?</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-lg mx-auto">
                  Let's discuss how Nosteq can deliver the same level of excellence for your organization.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto" onClick={() => navigate("/#contact")}>
                    Get in Touch
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.open(`https://wa.me/254743101738?text=Hi, I'd like to discuss a project similar to "${project.title}"`, "_blank")}>
                    WhatsApp Us
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 md:pt-8 border-t border-border gap-4">
              {prevProject ? (
                <Button variant="ghost" onClick={() => navigate(`/case-study/${prevProject.id}`)} className="text-muted-foreground hover:text-primary min-w-0 px-2 md:px-4">
                  <ArrowLeft className="w-4 h-4 mr-1 md:mr-2 shrink-0" />
                  <span className="hidden sm:inline truncate">{prevProject.title}</span>
                  <span className="sm:hidden">Previous</span>
                </Button>
              ) : <div />}
              {nextProject ? (
                <Button variant="ghost" onClick={() => navigate(`/case-study/${nextProject.id}`)} className="text-muted-foreground hover:text-primary min-w-0 px-2 md:px-4">
                  <span className="hidden sm:inline truncate">{nextProject.title}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="w-4 h-4 ml-1 md:ml-2 shrink-0" />
                </Button>
              ) : <div />}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudy;

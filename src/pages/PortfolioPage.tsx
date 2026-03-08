import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Building2, Calendar, ArrowRight, CheckCircle2, Clock, Zap, Search, Filter } from "lucide-react";
import { projects, categories, statusConfig } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const statusIcons = { CheckCircle2, Zap, Clock };
const statusFilters = [
  { value: "all", label: "All Status" },
  { value: "live", label: "Live" },
  { value: "completed", label: "Completed" },
  { value: "ongoing", label: "In Progress" },
] as const;

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = projects.filter(p => {
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3 text-primary-foreground/60">Case Studies</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-4">
              Our Project <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mb-8">
              Explore our complete body of work — from fintech infrastructure to enterprise security. Each project includes detailed case studies with measurable outcomes.
            </p>
            <div className="flex flex-wrap gap-4 text-primary-foreground/80 text-sm">
              <span className="bg-primary-foreground/10 rounded-full px-4 py-2">{projects.length} Projects</span>
              <span className="bg-primary-foreground/10 rounded-full px-4 py-2">{projects.filter(p => p.status === "live").length} Live Systems</span>
              <span className="bg-primary-foreground/10 rounded-full px-4 py-2">{new Set(projects.map(p => p.category)).size} Specializations</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-card/95 backdrop-blur-lg border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 flex-1">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className="text-xs"
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex gap-1 bg-accent rounded-lg p-1">
              {statusFilters.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStatusFilter(s.value)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    statusFilter === s.value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-8">
            Showing {filtered.length} of {projects.length} projects
            {activeCategory !== "All" && <> in <span className="font-medium text-foreground">{activeCategory}</span></>}
            {search && <> matching "<span className="font-medium text-foreground">{search}</span>"</>}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Filter className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms.</p>
              <Button variant="outline" onClick={() => { setActiveCategory("All"); setStatusFilter("all"); setSearch(""); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((project, index) => {
                const status = statusConfig[project.status];
                const StatusIcon = statusIcons[status.icon as keyof typeof statusIcons];
                return (
                  <ScrollReveal key={project.id} delay={index * 0.05}>
                    <Card
                      className="bg-card border-border hover:border-primary/30 transition-all duration-300 overflow-hidden group card-hover h-full flex flex-col cursor-pointer"
                      onClick={() => navigate(`/case-study/${project.id}`)}
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">{project.category}</Badge>
                        <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color} backdrop-blur-sm`}>
                          <StatusIcon className="w-3 h-3" /> {status.label}
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-heading font-bold text-xl text-white leading-tight">{project.title}</h3>
                        </div>
                      </div>

                      <CardContent className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5">
                          <Building2 className="w-4 h-4 shrink-0" /><span>{project.client}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="w-4 h-4 shrink-0" /><span>{project.location}</span>
                          <span className="ml-auto flex items-center gap-1 shrink-0"><Calendar className="w-3 h-3" />{project.year}</span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-3 flex-1">{project.description}</p>

                        {/* Before/After preview */}
                        {project.beforeAfter.length > 0 && (
                          <div className="mb-4 space-y-2">
                            {project.beforeAfter.slice(0, 2).map((ba, i) => (
                              <div key={i} className="flex items-center justify-between text-xs bg-accent rounded-lg px-3 py-2">
                                <span className="text-muted-foreground">{ba.metric}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-muted-foreground line-through">{ba.before}</span>
                                  <ArrowRight className="w-3 h-3 text-primary" />
                                  <span className="font-semibold text-primary">{ba.after}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs px-2 py-0.5">{tech}</Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5">+{project.technologies.length - 4}</Badge>
                          )}
                        </div>

                        <Button variant="ghost" size="sm" className="w-full group/btn text-primary mt-auto">
                          Read Full Case Study <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold mb-3">Ready to Be Our Next Success Story?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Let's discuss how Nosteq can deliver international-grade IT solutions for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" onClick={() => navigate("/#contact")}>Get in Touch</Button>
              <Button variant="outline" size="lg" onClick={() => window.open("https://wa.me/254743101738?text=Hi, I'd like to discuss a project with Nosteq", "_blank")}>WhatsApp Us</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;

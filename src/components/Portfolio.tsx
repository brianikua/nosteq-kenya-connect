import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import cctvInstall from "@/assets/cctv-install.jpg";
import serverRoom from "@/assets/server-room.jpg";
import heroTechnicians from "@/assets/hero-technicians.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import ScrollReveal from "./ScrollReveal";

const categories = ["All", "Fiber Installation", "CCTV & Security", "Data Center", "Network Setup", "Software"];

const projects = [
  { title: "Corporate Fiber Network", client: "Financial Services HQ", location: "Nairobi CBD", category: "Fiber Installation", description: "Complete 1Gbps fiber optic installation serving 500+ workstations with redundant connections and failover.", image: heroBg, year: "2024", stats: { speed: "1Gbps", devices: "500+" } },
  { title: "Shopping Mall Surveillance", client: "Major Retail Complex", location: "Nairobi", category: "CCTV & Security", description: "120+ 4K cameras with AI-powered analytics covering parking, corridors, and entry points with centralized monitoring.", image: cctvInstall, year: "2024", stats: { cameras: "120+", coverage: "100%" } },
  { title: "Tier 3 Data Center", client: "Technology Solutions Provider", location: "Westlands", category: "Data Center", description: "Complete data center build-out with 50 server racks, redundant cooling, and 99.99% uptime infrastructure.", image: serverRoom, year: "2023", stats: { racks: "50", uptime: "99.99%" } },
  { title: "Hospital Network Infrastructure", client: "Leading Healthcare Facility", location: "Nairobi", category: "Network Setup", description: "Structured cabling and network infrastructure for voice, data, and video across 8 floors.", image: heroTechnicians, year: "2024", stats: { floors: "8", points: "2000+" } },
  { title: "Residential Estate Fiber", client: "Premium Residential Estate", location: "Nairobi", category: "Fiber Installation", description: "FTTH deployment to 200 homes with dedicated fiber connections and smart home integration.", image: heroBg, year: "2023", stats: { homes: "200", speed: "500Mbps" } },
  { title: "Banking Security System", client: "Leading Commercial Bank", location: "Multiple Branches", category: "CCTV & Security", description: "Enterprise security deployment across 15 branches with centralized monitoring.", image: cctvInstall, year: "2024", stats: { branches: "15", cameras: "300+" } },
  { title: "ERP System Development", client: "Manufacturing Company", location: "Industrial Area", category: "Software", description: "Custom ERP solution covering inventory, HR, and accounting with mobile integration.", image: serverRoom, year: "2024", stats: { modules: "12", users: "150+" } },
  { title: "Campus Network Deployment", client: "International School", location: "Nairobi", category: "Network Setup", description: "Full campus network with enterprise WiFi, labs, and learning management system.", image: heroTechnicians, year: "2023", stats: { buildings: "6", students: "1500+" } },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
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
              A selection of completed projects demonstrating our expertise across industries.
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
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={index} delay={index * 0.06}>
              <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 overflow-hidden group card-hover h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{project.category}</Badge>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-heading font-bold text-lg text-white">{project.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Building2 className="w-4 h-4" /><span>{project.client}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" /><span>{project.location}</span>
                    <span className="ml-auto flex items-center gap-1"><Calendar className="w-3 h-3" />{project.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex gap-3 mb-4">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center px-3 py-1.5 bg-accent rounded-md">
                        <div className="text-sm font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full group/btn text-primary">
                    View Details <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <p className="text-muted-foreground">Ready to start your next project?</p>
              <Button variant="hero" className="group">
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

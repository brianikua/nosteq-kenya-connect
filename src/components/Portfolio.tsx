import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Calendar, ArrowRight, ExternalLink } from "lucide-react";
import cctvInstall from "@/assets/cctv-install.jpg";
import serverRoom from "@/assets/server-room.jpg";
import heroTechnicians from "@/assets/hero-technicians.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const categories = ["All", "Fiber Installation", "CCTV & Security", "Data Center", "Network Setup", "Software"];

const projects = [
  {
    title: "Corporate Fiber Network",
    client: "Safaricom HQ Annex",
    location: "Nairobi CBD",
    category: "Fiber Installation",
    description: "Complete 1Gbps fiber optic installation serving 500+ workstations with redundant connections.",
    image: heroBg,
    year: "2024",
    stats: { speed: "1Gbps", devices: "500+" }
  },
  {
    title: "Shopping Mall CCTV",
    client: "Thika Road Mall",
    location: "Thika Road, Nairobi",
    category: "CCTV & Security",
    description: "Installed 120+ 4K cameras with AI-powered analytics, covering parking, corridors, and entry points.",
    image: cctvInstall,
    year: "2024",
    stats: { cameras: "120+", coverage: "100%" }
  },
  {
    title: "Tier 3 Data Center",
    client: "KenTech Solutions",
    location: "Westlands, Nairobi",
    category: "Data Center",
    description: "Complete data center setup with 50 server racks, redundant cooling, and 99.99% uptime infrastructure.",
    image: serverRoom,
    year: "2023",
    stats: { racks: "50", uptime: "99.99%" }
  },
  {
    title: "Hospital Network Infrastructure",
    client: "Aga Khan Hospital",
    location: "Parklands, Nairobi",
    category: "Network Setup",
    description: "Structured cabling and network setup for voice, data, and video across 8 floors with unified communications.",
    image: heroTechnicians,
    year: "2024",
    stats: { floors: "8", points: "2000+" }
  },
  {
    title: "Residential Estate Fiber",
    client: "Runda Paradise Estate",
    location: "Runda, Nairobi",
    category: "Fiber Installation",
    description: "FTTH deployment to 200 homes with dedicated fiber connections and smart home integration options.",
    image: heroBg,
    year: "2023",
    stats: { homes: "200", speed: "500Mbps" }
  },
  {
    title: "Bank Security System",
    client: "Kenya Commercial Bank",
    location: "Multiple Branches",
    category: "CCTV & Security",
    description: "Enterprise security deployment across 15 branches with centralized monitoring and access control.",
    image: cctvInstall,
    year: "2024",
    stats: { branches: "15", cameras: "300+" }
  },
  {
    title: "ERP System Development",
    client: "Safari Manufacturing Ltd",
    location: "Industrial Area, Nairobi",
    category: "Software",
    description: "Custom ERP solution for inventory, HR, and accounting with mobile app integration for field teams.",
    image: serverRoom,
    year: "2024",
    stats: { modules: "12", users: "150+" }
  },
  {
    title: "School Campus Network",
    client: "Brookhouse International",
    location: "Karen, Nairobi",
    category: "Network Setup",
    description: "Full campus network with WiFi coverage, computer labs, and integrated learning management system.",
    image: heroTechnicians,
    year: "2023",
    stats: { buildings: "6", students: "1500+" }
  }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 relative bg-muted/30">
      <div className="absolute inset-0 kitenge-pattern opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kazi Yetu – Showcasing excellence across Kenya
          </p>
          <div className="flag-divider w-32 mx-auto mt-6" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`transition-all ${
                activeCategory === category 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:border-primary/50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <Badge className="absolute top-3 left-3 bg-primary/90">
                  {project.category}
                </Badge>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {project.title}
                  </h3>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>{project.client}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                  <span className="ml-auto flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.year}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Project Stats */}
                <div className="flex gap-3 mb-4">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="text-center px-3 py-1 bg-muted/50 rounded-md">
                      <div className="text-sm font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                <Button variant="ghost" size="sm" className="w-full group/btn">
                  View Details
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <p className="text-muted-foreground">
              Want to see your project featured here?
            </p>
            <Button variant="cta" className="group">
              Start Your Project
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default Portfolio;
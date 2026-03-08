import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Building2, Calendar, ArrowRight, ExternalLink, CheckCircle2, Clock, Shield, Zap, X } from "lucide-react";
import cctvInstall from "@/assets/cctv-install.jpg";
import serverRoom from "@/assets/server-room.jpg";
import heroTechnicians from "@/assets/hero-technicians.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import ScrollReveal from "./ScrollReveal";

const categories = ["All", "Fintech & Banking", "CCTV & Security", "Data Center", "Enterprise Network", "Software & Cloud"];

type ProjectStatus = "completed" | "live" | "ongoing";

interface Project {
  title: string;
  client: string;
  location: string;
  category: string;
  description: string;
  image: string;
  year: string;
  status: ProjectStatus;
  stats: Record<string, string>;
  scope: string[];
  technologies: string[];
  outcome: string;
  duration: string;
}

const projects: Project[] = [
  {
    title: "Core Banking Network Infrastructure",
    client: "Tier-1 Commercial Bank",
    location: "Nairobi · 42 Branches",
    category: "Fintech & Banking",
    description: "Redundant fiber backbone connecting 42 branches with sub-5ms latency for real-time transaction processing, mobile banking APIs, and PCI-DSS compliant network segmentation.",
    image: heroBg,
    year: "2024",
    status: "live",
    stats: { branches: "42", latency: "<5ms", uptime: "99.99%" },
    scope: ["Fiber backbone deployment across all branches", "PCI-DSS compliant network segmentation", "Redundant failover with automatic switchover", "Real-time transaction monitoring dashboard", "24/7 NOC support integration"],
    technologies: ["MPLS", "SD-WAN", "Cisco Meraki", "Fortinet NGFW", "Grafana"],
    outcome: "Reduced transaction latency by 68% and achieved zero unplanned downtime in the first 12 months of operation.",
    duration: "8 months"
  },
  {
    title: "Digital Payment Platform Security",
    client: "Leading Mobile Money Provider",
    location: "East Africa · Multi-Region",
    category: "Fintech & Banking",
    description: "End-to-end security infrastructure for a mobile money platform processing 2M+ daily transactions — including AI-powered fraud detection, biometric access control, and SOC setup.",
    image: cctvInstall,
    year: "2024",
    status: "live",
    stats: { transactions: "2M+/day", fraud: "99.7%", response: "<2s" },
    scope: ["AI-driven fraud detection & prevention system", "Biometric access control for data centers", "Security Operations Center (SOC) setup", "Real-time threat intelligence integration", "Regulatory compliance (CBK, PCI-DSS)"],
    technologies: ["Splunk SIEM", "CrowdStrike", "Palo Alto", "HID Biometrics", "Custom ML Models"],
    outcome: "Fraud detection rate improved to 99.7% with false positives reduced by 82%. Platform passed all CBK compliance audits.",
    duration: "6 months"
  },
  {
    title: "Tier 3+ Fintech Data Center",
    client: "Insurance & Fintech Group",
    location: "Westlands, Nairobi",
    category: "Data Center",
    description: "Purpose-built Tier 3+ data center for an insurance-fintech group hosting core insurance platforms, claims processing, and customer-facing APIs with N+1 redundancy.",
    image: serverRoom,
    year: "2024",
    status: "completed",
    stats: { racks: "60", uptime: "99.99%", PUE: "1.4" },
    scope: ["60-rack data hall with hot/cold aisle containment", "N+1 redundant power and cooling systems", "Fire suppression (FM-200) and environmental monitoring", "Secure colocation zones for partner fintechs", "Disaster recovery and backup infrastructure"],
    technologies: ["APC InfraStruXure", "Schneider EcoStruxure", "Veeam Backup", "VMware vSphere", "Juniper Networks"],
    outcome: "Achieved Tier 3+ certification. Hosting 12 fintech partners with zero data loss incidents since deployment.",
    duration: "10 months"
  },
  {
    title: "Hospital Digital Health Network",
    client: "Regional Healthcare Network",
    location: "Nairobi · 3 Campuses",
    category: "Enterprise Network",
    description: "HIPAA-aligned network infrastructure across 3 hospital campuses supporting EHR systems, telemedicine, IoT medical devices, and integrated billing with insurance APIs.",
    image: heroTechnicians,
    year: "2024",
    status: "live",
    stats: { campuses: "3", devices: "4000+", uptime: "99.95%" },
    scope: ["Structured cabling across 24 floors", "Segmented VLANs for medical devices, admin, and guest", "Telemedicine video conferencing infrastructure", "Integration with NHIF and private insurance APIs", "Redundant WAN links between campuses"],
    technologies: ["Aruba CX Switches", "Cisco DNA Center", "Ruckus WiFi 6E", "Cerner EHR Integration", "Zscaler ZPA"],
    outcome: "Enabled real-time EHR access across all campuses. Telemedicine visits increased by 340% within 6 months.",
    duration: "7 months"
  },
  {
    title: "SACCO Digital Banking Platform",
    client: "Top-10 SACCO",
    location: "Kenya · Nationwide",
    category: "Software & Cloud",
    description: "Custom digital banking platform for a SACCO with 500K+ members — mobile app, USSD channel, loan management, M-Pesa integration, and real-time financial reporting.",
    image: heroBg,
    year: "2024",
    status: "live",
    stats: { members: "500K+", channels: "4", loans: "10K+/mo" },
    scope: ["Mobile banking app (iOS & Android)", "USSD banking channel for feature phones", "Automated loan origination & scoring engine", "M-Pesa, bank, and card payment integrations", "Real-time dashboards for management"],
    technologies: ["React Native", "Node.js", "PostgreSQL", "Safaricom Daraja API", "AWS EKS", "Redis"],
    outcome: "Member digital adoption reached 78% within 3 months. Loan processing time reduced from 5 days to 4 hours.",
    duration: "9 months"
  },
  {
    title: "Microfinance Branch Security",
    client: "Pan-African MFI",
    location: "Kenya · Uganda · Tanzania",
    category: "CCTV & Security",
    description: "Unified security deployment across 85 microfinance branches in 3 countries — 4K cameras, vault monitoring, access control, and centralized cloud-based surveillance.",
    image: cctvInstall,
    year: "2024",
    status: "ongoing",
    stats: { branches: "85", countries: "3", cameras: "600+" },
    scope: ["4K IP camera deployment per branch", "Biometric access control for vaults and server rooms", "Cloud-based centralized monitoring platform", "AI-powered anomaly detection", "Compliance with local banking security regulations"],
    technologies: ["Hikvision DeepinView", "Genetec Security Center", "AWS S3 Storage", "HID iCLASS SE", "Custom Alert Dashboard"],
    outcome: "Phase 1 (Kenya) complete with 92% reduction in security incidents. Uganda and Tanzania rollout on track for Q2 2025.",
    duration: "14 months (phased)"
  },
  {
    title: "Insurance Claims Automation",
    client: "General Insurance Provider",
    location: "Nairobi",
    category: "Software & Cloud",
    description: "AI-powered claims processing platform with document OCR, fraud scoring, automated adjudication, and integration with reinsurance partners via secure APIs.",
    image: serverRoom,
    year: "2025",
    status: "ongoing",
    stats: { claims: "5K+/mo", automation: "72%", accuracy: "96%" },
    scope: ["Document OCR and intelligent data extraction", "ML-based fraud scoring model", "Automated claims adjudication workflow", "Reinsurance partner API integrations", "Customer self-service portal"],
    technologies: ["Python", "TensorFlow", "FastAPI", "React", "Azure Cognitive Services", "Kafka"],
    outcome: "Claims processing time reduced by 65%. Automated adjudication handling 72% of standard claims without manual intervention.",
    duration: "5 months (ongoing)"
  },
  {
    title: "Forex Trading Infrastructure",
    client: "Licensed Forex Bureau",
    location: "Nairobi · Mombasa",
    category: "Enterprise Network",
    description: "Low-latency trading infrastructure with redundant connectivity, real-time rate feeds, secure client portals, and compliance-ready audit logging across 2 locations.",
    image: heroTechnicians,
    year: "2024",
    status: "completed",
    stats: { locations: "2", latency: "<3ms", availability: "99.99%" },
    scope: ["Dual-path fiber with automatic failover", "Low-latency network optimization", "Secure client transaction portal", "Real-time FX rate feed integration", "Full audit trail and compliance logging"],
    technologies: ["Juniper SRX", "F5 BIG-IP", "Elasticsearch", "React", "Node.js", "CloudFlare"],
    outcome: "Trade execution latency reduced to under 3ms. Zero compliance findings in CBK audit.",
    duration: "4 months"
  },
];

const statusConfig: Record<ProjectStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  completed: { label: "Completed", color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  live: { label: "Live & Operational", color: "bg-primary/10 text-primary", icon: Zap },
  ongoing: { label: "In Progress", color: "bg-secondary/10 text-secondary", icon: Clock },
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
            return (
              <ScrollReveal key={index} delay={index * 0.06}>
                <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 overflow-hidden group card-hover h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">{project.category}</Badge>
                    <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color} backdrop-blur-sm`}>
                      <status.icon className="w-3 h-3" />
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
                      onClick={() => setSelectedProject(project)}
                    >
                      View Details <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (() => {
            const status = statusConfig[selectedProject.status];
            return (
              <>
                {/* Modal Header Image */}
                <div className="relative h-56 overflow-hidden rounded-t-lg">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <Badge className="bg-primary text-primary-foreground text-xs mb-2">{selectedProject.category}</Badge>
                    <h3 className="font-heading font-bold text-2xl text-white leading-tight">{selectedProject.title}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Meta Row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Building2 className="w-4 h-4" /> {selectedProject.client}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-4 h-4" /> {selectedProject.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-4 h-4" /> {selectedProject.duration}
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      <status.icon className="w-3 h-3" /> {status.label}
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(selectedProject.stats).map(([key, value]) => (
                      <div key={key} className="text-center px-4 py-2.5 bg-accent rounded-lg flex-1 min-w-[80px]">
                        <div className="text-lg font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-2">Overview</h4>
                    <p className="text-foreground leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Scope */}
                  <div>
                    <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Project Scope</h4>
                    <ul className="space-y-2">
                      {selectedProject.scope.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs font-medium px-3 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="bg-accent rounded-xl p-5 border border-border">
                    <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Outcome & Impact
                    </h4>
                    <p className="text-foreground leading-relaxed text-sm">{selectedProject.outcome}</p>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      variant="hero"
                      className="flex-1"
                      onClick={() => {
                        setSelectedProject(null);
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Start a Similar Project
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(`https://wa.me/254743101738?text=Hi, I'd like to discuss a project similar to "${selectedProject.title}"`, "_blank")}
                    >
                      Discuss on WhatsApp
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;

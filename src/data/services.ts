import { Gauge, Shield, Network, Lightbulb, Phone, Server, Cable, Database, Code } from "lucide-react";

export interface ServiceDetail {
  slug: string;
  icon: typeof Gauge;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  process: { step: string; description: string }[];
  technologies: string[];
  useCases: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: "fiber-internet",
    icon: Gauge,
    title: "Fiber Internet Provision",
    badge: "Up to 1Gbps",
    tagline: "Blazing-fast, reliable connectivity that powers your business forward.",
    description: "We deliver enterprise-grade fiber optic internet solutions designed for maximum speed and reliability. Whether you need dedicated lines for mission-critical operations or shared bandwidth for everyday use, our fiber infrastructure ensures your business stays connected with minimal latency and maximum uptime.",
    features: [
      "Dedicated & shared bandwidth options (10Mbps – 1Gbps)",
      "99.9% uptime SLA with redundant routing",
      "Symmetric upload and download speeds",
      "24/7 network monitoring and support",
      "Scalable bandwidth on demand",
      "Last-mile fiber installation and commissioning"
    ],
    benefits: [
      "Eliminate slow connections that bottleneck productivity",
      "Support cloud applications, VoIP, and video conferencing seamlessly",
      "Reduce downtime with carrier-grade infrastructure",
      "Future-proof your connectivity as your business grows"
    ],
    process: [
      { step: "Site Survey", description: "We assess your location, existing infrastructure, and bandwidth requirements." },
      { step: "Network Design", description: "Custom fiber route planning with redundancy and scalability in mind." },
      { step: "Installation", description: "Professional fiber laying, splicing, and termination by certified technicians." },
      { step: "Testing & Handover", description: "End-to-end testing, speed verification, and SLA documentation." }
    ],
    technologies: ["GPON", "FTTH", "FTTB", "MPLS", "SD-WAN", "BGP Routing"],
    useCases: ["Corporate offices", "Co-working spaces", "Hotels & hospitality", "Industrial parks", "Residential estates"]
  },
  {
    slug: "cctv-security",
    icon: Shield,
    title: "CCTV & Security Systems",
    badge: "4K · AI Analytics",
    tagline: "Intelligent surveillance that protects what matters most.",
    description: "Our security solutions go beyond basic cameras. We design and deploy comprehensive surveillance ecosystems featuring 4K resolution cameras, AI-powered analytics for threat detection, biometric access control, and 24/7 remote monitoring — all managed from a unified platform.",
    features: [
      "4K and 8MP IP cameras with night vision",
      "AI-powered motion detection and facial recognition",
      "Remote viewing via mobile app and web portal",
      "Biometric and card-based access control",
      "Perimeter intrusion detection systems",
      "Cloud and on-premise video storage (30–90 days)"
    ],
    benefits: [
      "Deter theft, vandalism, and unauthorized access",
      "Get instant alerts on suspicious activity",
      "Review incidents with crystal-clear footage",
      "Reduce security personnel costs with smart automation"
    ],
    process: [
      { step: "Security Audit", description: "We evaluate your premises, identify vulnerabilities, and map critical zones." },
      { step: "System Design", description: "Camera placement planning, access point mapping, and storage calculations." },
      { step: "Installation", description: "Professional mounting, cabling, and network integration." },
      { step: "Configuration & Training", description: "System setup, alert rules, and hands-on training for your team." }
    ],
    technologies: ["Hikvision", "Dahua", "ZKTeco", "Milestone VMS", "ONVIF", "PoE Networking"],
    useCases: ["Commercial buildings", "Warehouses", "Retail stores", "Residential compounds", "Schools & hospitals"]
  },
  {
    slug: "structured-cabling",
    icon: Cable,
    title: "Structured Cabling & Networks",
    badge: "Voice · Data · Video",
    tagline: "The backbone of your digital infrastructure, built to last.",
    description: "A well-designed cabling infrastructure is the foundation of every reliable network. We provide end-to-end structured cabling services — from Cat6A copper to single-mode fiber — ensuring your voice, data, and video systems operate flawlessly on a unified, standards-compliant platform.",
    features: [
      "Cat5e, Cat6, Cat6A, and fiber optic cabling",
      "Patch panel and rack management",
      "Cable certification and testing (Fluke)",
      "Floor and ceiling trunking systems",
      "MDF/IDF room buildout",
      "Labeling, documentation, and as-built drawings"
    ],
    benefits: [
      "Reduce network downtime caused by poor cabling",
      "Support high-bandwidth applications like video and cloud",
      "Simplify troubleshooting with organized infrastructure",
      "Add capacity easily as your team grows"
    ],
    process: [
      { step: "Requirements Gathering", description: "We map your floor plan, user count, and application needs." },
      { step: "Design & BOQ", description: "Detailed cabling design with bill of quantities and timeline." },
      { step: "Installation", description: "Professional cable pulling, termination, and rack dressing." },
      { step: "Certification", description: "Every link tested and certified to TIA/EIA standards." }
    ],
    technologies: ["Cat6A", "Single-mode Fiber", "Multi-mode Fiber", "TIA-568", "Panduit", "Commscope"],
    useCases: ["New office buildouts", "Data centers", "Campus networks", "Hospital IT infrastructure", "Government buildings"]
  },
  {
    slug: "data-center",
    icon: Database,
    title: "Data Center Solutions",
    badge: "Enterprise Grade",
    tagline: "Purpose-built environments for your most critical infrastructure.",
    description: "We design, build, and manage data center environments that meet the highest standards of reliability and performance. From server rack deployment to precision cooling and redundant power systems, we create infrastructure that keeps your operations running around the clock.",
    features: [
      "Server rack and cabinet installation",
      "Precision cooling and hot/cold aisle containment",
      "UPS and redundant power distribution",
      "Environmental monitoring (temperature, humidity, fire)",
      "Physical security and access control",
      "Capacity planning and scalability design"
    ],
    benefits: [
      "Maximize uptime with redundant systems",
      "Protect hardware investments with optimal environments",
      "Meet compliance requirements for data handling",
      "Scale infrastructure without full rebuilds"
    ],
    process: [
      { step: "Assessment", description: "We evaluate your current infrastructure, growth projections, and compliance needs." },
      { step: "Design", description: "Detailed layout, power calculations, cooling design, and redundancy planning." },
      { step: "Build", description: "Professional installation of racks, cabling, power, and cooling systems." },
      { step: "Commission", description: "Load testing, monitoring setup, and operational documentation." }
    ],
    technologies: ["APC", "Schneider Electric", "Vertiv", "DCIM", "ASHRAE", "Tier II/III Design"],
    useCases: ["Enterprise server rooms", "Colocation facilities", "Telecom hubs", "Financial institutions", "ISP infrastructure"]
  },
  {
    slug: "software-development",
    icon: Code,
    title: "Software & App Development",
    badge: "Custom Solutions",
    tagline: "Digital products engineered around your business processes.",
    description: "We build custom software solutions that solve real business problems. From web applications and mobile apps to ERP systems and automation tools, our development team delivers scalable, maintainable software tailored to your workflows and growth objectives.",
    features: [
      "Custom web application development",
      "Native and cross-platform mobile apps",
      "ERP and CRM system development",
      "API design and third-party integrations",
      "UI/UX design and prototyping",
      "Ongoing maintenance and support"
    ],
    benefits: [
      "Automate manual processes and reduce errors",
      "Get software that fits your workflow, not the other way around",
      "Own your intellectual property completely",
      "Scale features as your business evolves"
    ],
    process: [
      { step: "Discovery", description: "We map your business processes, pain points, and desired outcomes." },
      { step: "Design & Prototype", description: "Wireframes, mockups, and interactive prototypes for validation." },
      { step: "Development", description: "Agile sprints with regular demos and feedback cycles." },
      { step: "Launch & Support", description: "Deployment, user training, and ongoing maintenance." }
    ],
    technologies: ["React", "Node.js", "Flutter", "PostgreSQL", "AWS", "Docker"],
    useCases: ["Internal business tools", "Customer-facing portals", "E-commerce platforms", "Inventory management", "Booking systems"]
  },
  {
    slug: "it-consulting",
    icon: Network,
    title: "IT Consulting & Integration",
    badge: "Full Stack IT",
    tagline: "Strategic technology guidance for confident digital transformation.",
    description: "Our consulting services bridge the gap between business goals and technology execution. We provide IT strategy, architecture planning, cybersecurity assessments, and systems integration to help organizations modernize their infrastructure and operate more efficiently.",
    features: [
      "IT infrastructure assessment and roadmapping",
      "Cloud migration strategy and execution",
      "Cybersecurity audits and compliance",
      "Enterprise systems integration (ERP, CRM, HR)",
      "Vendor evaluation and procurement support",
      "IT policy development and governance"
    ],
    benefits: [
      "Make technology investments that align with business goals",
      "Reduce risk with professional security assessments",
      "Avoid vendor lock-in with independent advisory",
      "Accelerate digital transformation timelines"
    ],
    process: [
      { step: "Discovery Workshop", description: "We understand your business, current tech stack, and strategic goals." },
      { step: "Assessment Report", description: "Detailed findings with risk analysis and prioritized recommendations." },
      { step: "Implementation Plan", description: "Phased roadmap with timelines, budgets, and resource requirements." },
      { step: "Execution Support", description: "Hands-on guidance through implementation and change management." }
    ],
    technologies: ["Microsoft 365", "Azure", "AWS", "Google Workspace", "Fortinet", "VMware"],
    useCases: ["Digital transformation programs", "Mergers & acquisitions IT", "Compliance preparation", "Cloud migration", "IT department setup"]
  },
  {
    slug: "smart-building",
    icon: Lightbulb,
    title: "Smart Building Automation",
    badge: "IoT Enabled",
    tagline: "Intelligent buildings that optimize comfort, security, and efficiency.",
    description: "We integrate IoT sensors, automation controllers, and management platforms to create buildings that think for themselves. From lighting and HVAC control to occupancy analytics and energy optimization, our smart building solutions reduce costs while enhancing occupant experience.",
    features: [
      "Automated lighting and HVAC control",
      "Occupancy and environmental sensors",
      "Energy monitoring and optimization",
      "Centralized building management system (BMS)",
      "Integrated access control and security",
      "Mobile app for remote building management"
    ],
    benefits: [
      "Reduce energy consumption by up to 30%",
      "Improve occupant comfort and productivity",
      "Gain real-time visibility into building operations",
      "Lower maintenance costs with predictive analytics"
    ],
    process: [
      { step: "Building Assessment", description: "We audit your building systems, energy usage, and automation potential." },
      { step: "Solution Design", description: "Sensor mapping, controller selection, and integration architecture." },
      { step: "Installation", description: "Sensor deployment, controller wiring, and network integration." },
      { step: "Commissioning", description: "System tuning, automation rules, and dashboard setup." }
    ],
    technologies: ["KNX", "BACnet", "Modbus", "LoRaWAN", "Zigbee", "Niagara Framework"],
    useCases: ["Commercial offices", "Hotels", "Shopping malls", "Hospitals", "Smart homes"]
  },
  {
    slug: "voip-communications",
    icon: Phone,
    title: "VoIP & Unified Communications",
    badge: "HD Quality",
    tagline: "Crystal-clear communications that keep your team connected anywhere.",
    description: "We deploy cloud and on-premise VoIP solutions that unify voice, video, messaging, and collaboration into a single platform. Our systems scale from small offices to enterprise call centers, delivering HD call quality and seamless integration with your existing tools.",
    features: [
      "Cloud PBX and on-premise IP PBX",
      "HD voice and video calling",
      "Auto-attendant and IVR systems",
      "Call recording and analytics",
      "CRM and helpdesk integration",
      "Mobile and desktop softphones"
    ],
    benefits: [
      "Cut phone bills by up to 60% vs traditional lines",
      "Enable remote and hybrid work with softphones",
      "Improve customer service with smart call routing",
      "Scale phone lines without hardware changes"
    ],
    process: [
      { step: "Needs Analysis", description: "We assess your call volumes, locations, and integration requirements." },
      { step: "System Design", description: "Extension planning, call flow design, and network readiness check." },
      { step: "Deployment", description: "System installation, phone provisioning, and network optimization." },
      { step: "Training & Go-Live", description: "User training, number porting, and cutover to the new system." }
    ],
    technologies: ["3CX", "Asterisk", "Yealink", "Grandstream", "SIP Trunking", "WebRTC"],
    useCases: ["Call centers", "Multi-branch offices", "Remote teams", "Hotels", "Healthcare facilities"]
  },
  {
    slug: "cloud-hosting",
    icon: Server,
    title: "Cloud & Hosting Services",
    badge: "99.9% Uptime",
    tagline: "Secure, scalable infrastructure you can count on.",
    description: "From colocation and VPS to fully managed cloud environments, we provide hosting solutions built on redundant infrastructure with enterprise-grade security. Our data centers feature N+1 power, precision cooling, and 24/7 monitoring to ensure your applications are always available.",
    features: [
      "Colocation with redundant power and cooling",
      "Virtual private servers (VPS)",
      "Dedicated server hosting",
      "Managed cloud infrastructure",
      "Automated backups and disaster recovery",
      "DDoS protection and firewall management"
    ],
    benefits: [
      "Eliminate the cost of maintaining your own server room",
      "Scale resources up or down on demand",
      "Protect data with enterprise-grade security",
      "Ensure business continuity with automated backups"
    ],
    process: [
      { step: "Requirements Review", description: "We analyze your workloads, compliance needs, and performance requirements." },
      { step: "Solution Architecture", description: "Infrastructure sizing, redundancy design, and migration planning." },
      { step: "Migration & Setup", description: "Seamless migration with minimal downtime and thorough testing." },
      { step: "Managed Operations", description: "24/7 monitoring, patching, backups, and performance optimization." }
    ],
    technologies: ["VMware", "Proxmox", "cPanel", "CloudLinux", "Veeam", "pfSense"],
    useCases: ["Web application hosting", "Email servers", "Database hosting", "Development environments", "Disaster recovery sites"]
  }
];

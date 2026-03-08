import { Gauge, Shield, Network, Lightbulb, Phone, Server, Cable, Database, Code } from "lucide-react";

import fiberImg from "@/assets/services/fiber-internet.jpg";
import cctvImg from "@/assets/services/cctv-security.jpg";
import cablingImg from "@/assets/services/structured-cabling.jpg";
import dataCenterImg from "@/assets/services/data-center.jpg";
import softwareImg from "@/assets/services/software-development.jpg";
import consultingImg from "@/assets/services/it-consulting.jpg";
import smartBuildingImg from "@/assets/services/smart-building.jpg";
import voipImg from "@/assets/services/voip-communications.jpg";
import cloudImg from "@/assets/services/cloud-hosting.jpg";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface ServiceDetail {
  slug: string;
  icon: typeof Gauge;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
  process: { step: string; description: string }[];
  technologies: string[];
  useCases: string[];
  testimonials: Testimonial[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: "fiber-internet",
    icon: Gauge,
    title: "Fiber Internet Provision",
    badge: "Up to 1Gbps",
    tagline: "Slow internet costs you more than you think. We fix that.",
    description: "We install and manage fiber optic internet that actually delivers what it promises. Whether your team needs dedicated lines for banking systems or shared bandwidth for daily work, we design connectivity that won't let you down — with real speeds, real uptime, and real people you can call when you need help.",
    image: fiberImg,
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
    useCases: ["Corporate offices", "Co-working spaces", "Hotels & hospitality", "Industrial parks", "Residential estates"],
    testimonials: [
      { quote: "Since switching to their fiber service, our office has experienced zero downtime and our cloud applications run flawlessly. The 500Mbps dedicated line was a game-changer for our 200-person team.", name: "James Mwangi", role: "IT Director", company: "KenyaTech Solutions" },
      { quote: "The installation was completed ahead of schedule and the symmetric speeds have transformed how we collaborate with our global offices. Excellent service from start to finish.", name: "Sarah Ochieng", role: "Operations Manager", company: "East African Logistics Ltd" }
    ]
  },
  {
    slug: "cctv-security",
    icon: Shield,
    title: "CCTV & Security Systems",
    badge: "4K · AI Analytics",
    tagline: "Your eyes can't be everywhere. Our cameras can.",
    description: "We go way beyond sticking cameras on walls. We design complete security ecosystems — 4K cameras with AI that actually knows the difference between a cat and an intruder, biometric access control, and remote monitoring you can check from your phone at 3am. Because peace of mind shouldn't require guesswork.",
    image: cctvImg,
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
    useCases: ["Commercial buildings", "Warehouses", "Retail stores", "Residential compounds", "Schools & hospitals"],
    testimonials: [
      { quote: "The AI-powered analytics have reduced false alarms by 90%. We now get alerts only for genuine threats, and the 4K footage quality has been invaluable in incident investigations.", name: "Peter Kamau", role: "Security Manager", company: "Nairobi Central Mall" },
      { quote: "They secured our entire 50-acre compound with 120 cameras and biometric access. The mobile app lets me monitor everything in real-time even when I'm traveling.", name: "Grace Wanjiku", role: "CEO", company: "Greenfield Estates" }
    ]
  },
  {
    slug: "structured-cabling",
    icon: Cable,
    title: "Structured Cabling & Networks",
    badge: "Voice · Data · Video",
    tagline: "Bad cabling is behind more network problems than people realize.",
    description: "That random network drop? The laggy video call? Nine times out of ten, it's the cabling. We build structured cabling systems — from Cat6A copper to single-mode fiber — that give your voice, data, and video a solid foundation. Properly labeled, tested, certified, and built to last decades, not months.",
    image: cablingImg,
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
    useCases: ["New office buildouts", "Data centers", "Campus networks", "Hospital IT infrastructure", "Government buildings"],
    testimonials: [
      { quote: "They cabled our 12-floor headquarters in 6 weeks — on time and budget. Every cable was certified and the documentation made future maintenance effortless.", name: "David Otieno", role: "Facilities Director", company: "Pan-African Insurance Group" },
      { quote: "The structured cabling upgrade eliminated our recurring network issues. We went from daily complaints to zero network tickets. Truly professional work.", name: "Alice Njeri", role: "Head of IT", company: "Strathmore University Hospital" }
    ]
  },
  {
    slug: "data-center",
    icon: Database,
    title: "Data Center Solutions",
    badge: "Enterprise Grade",
    tagline: "Where your most critical systems live — built to never go down.",
    description: "Your servers deserve better than a dusty closet with a desk fan. We design and build proper data center environments with precision cooling, redundant power, fire suppression, and monitoring that catches problems before they become outages. Whether you're building from scratch or upgrading what you have.",
    image: dataCenterImg,
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
    useCases: ["Enterprise server rooms", "Colocation facilities", "Telecom hubs", "Financial institutions", "ISP infrastructure"],
    testimonials: [
      { quote: "Our new server room handles 3x the capacity of the old one while consuming 40% less power. The hot/cold aisle design and monitoring dashboard give us complete control.", name: "Michael Odhiambo", role: "CTO", company: "Digital Finance Africa" },
      { quote: "They transformed an empty floor into a Tier II+ data center in 8 weeks. Every detail — from fire suppression to cable management — was meticulously executed.", name: "Robert Kiptoo", role: "Infrastructure Lead", company: "Safaricom Business" }
    ]
  },
  {
    slug: "software-development",
    icon: Code,
    title: "Software & App Development",
    badge: "Custom Solutions",
    tagline: "Software that fits how your business actually works — not the other way around.",
    description: "Off-the-shelf software forces you to change your workflow. We build the opposite: custom web apps, mobile apps, ERPs, and automation tools designed around how your team actually operates. You own the code, you control the roadmap, and we stick around to make sure everything keeps running smoothly.",
    image: softwareImg,
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
    useCases: ["Internal business tools", "Customer-facing portals", "E-commerce platforms", "Inventory management", "Booking systems"],
    testimonials: [
      { quote: "They built our entire fleet management platform from scratch — GPS tracking, route optimization, and driver scoring. It reduced our fuel costs by 25% in the first quarter.", name: "Samuel Kirimi", role: "Managing Director", company: "Trans-Kenya Logistics" },
      { quote: "The custom CRM they developed integrates perfectly with our existing systems. Our sales team productivity increased by 40% and we finally have real-time pipeline visibility.", name: "Lucy Mutua", role: "VP Sales", company: "Continental Property Group" }
    ]
  },
  {
    slug: "it-consulting",
    icon: Network,
    title: "IT Consulting & Integration",
    badge: "Full Stack IT",
    tagline: "Strategic technology guidance for confident digital transformation.",
    description: "Our consulting services bridge the gap between business goals and technology execution. We provide IT strategy, architecture planning, cybersecurity assessments, and systems integration to help organizations modernize their infrastructure and operate more efficiently.",
    image: consultingImg,
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
    useCases: ["Digital transformation programs", "Mergers & acquisitions IT", "Compliance preparation", "Cloud migration", "IT department setup"],
    testimonials: [
      { quote: "Their cybersecurity audit uncovered critical vulnerabilities we had no idea existed. The remediation roadmap they provided was clear, prioritized, and saved us from potential data breaches.", name: "Catherine Muthoni", role: "CISO", company: "National Bank of Kenya" },
      { quote: "The cloud migration strategy they designed moved our entire on-premise infrastructure to Azure in 3 months with zero data loss. Operational costs dropped by 35%.", name: "Brian Wekesa", role: "IT Manager", company: "East African Breweries" }
    ]
  },
  {
    slug: "smart-building",
    icon: Lightbulb,
    title: "Smart Building Automation",
    badge: "IoT Enabled",
    tagline: "Intelligent buildings that optimize comfort, security, and efficiency.",
    description: "We integrate IoT sensors, automation controllers, and management platforms to create buildings that think for themselves. From lighting and HVAC control to occupancy analytics and energy optimization, our smart building solutions reduce costs while enhancing occupant experience.",
    image: smartBuildingImg,
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
    useCases: ["Commercial offices", "Hotels", "Shopping malls", "Hospitals", "Smart homes"],
    testimonials: [
      { quote: "The smart building system cut our electricity bill by 28% in the first year. The occupancy-based lighting and HVAC control alone justified the entire investment.", name: "Francis Ngugi", role: "Property Manager", company: "Westlands Business Park" },
      { quote: "Guests constantly compliment the seamless environment. Temperature, lighting, and access — everything is automated and the BMS dashboard gives us complete oversight.", name: "Amina Hassan", role: "General Manager", company: "Serena Suites Hotel" }
    ]
  },
  {
    slug: "voip-communications",
    icon: Phone,
    title: "VoIP & Unified Communications",
    badge: "HD Quality",
    tagline: "Crystal-clear communications that keep your team connected anywhere.",
    description: "We deploy cloud and on-premise VoIP solutions that unify voice, video, messaging, and collaboration into a single platform. Our systems scale from small offices to enterprise call centers, delivering HD call quality and seamless integration with your existing tools.",
    image: voipImg,
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
    useCases: ["Call centers", "Multi-branch offices", "Remote teams", "Hotels", "Healthcare facilities"],
    testimonials: [
      { quote: "Moving from traditional PBX to their cloud VoIP solution saved us KES 2.4M annually. The call quality is superior and our remote team finally feels connected.", name: "John Kipchoge", role: "Finance Director", company: "Rift Valley Insurance" },
      { quote: "The IVR system and CRM integration transformed our call center. Average handling time dropped by 35% and customer satisfaction scores are at an all-time high.", name: "Diana Akinyi", role: "Customer Service Head", company: "Jumia Kenya" }
    ]
  },
  {
    slug: "cloud-hosting",
    icon: Server,
    title: "Cloud & Hosting Services",
    badge: "99.9% Uptime",
    tagline: "Secure, scalable infrastructure you can count on.",
    description: "From colocation and VPS to fully managed cloud environments, we provide hosting solutions built on redundant infrastructure with enterprise-grade security. Our data centers feature N+1 power, precision cooling, and 24/7 monitoring to ensure your applications are always available.",
    image: cloudImg,
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
    useCases: ["Web application hosting", "Email servers", "Database hosting", "Development environments", "Disaster recovery sites"],
    testimonials: [
      { quote: "We migrated 15 production servers to their managed cloud. Uptime has been 99.99% for 18 months straight, and the automated backups saved us during a ransomware attempt.", name: "Martin Njoroge", role: "Head of Technology", company: "M-KOPA Solar" },
      { quote: "Their colocation facility is world-class. Redundant power, 24/7 security, and the support team responds within minutes. It's like having our own enterprise data center without the overhead.", name: "Elizabeth Chebet", role: "Systems Administrator", company: "Kenya Power & Lighting" }
    ]
  }
];

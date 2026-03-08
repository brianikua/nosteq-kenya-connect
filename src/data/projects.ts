import cctvInstall from "@/assets/cctv-install.jpg";
import serverRoom from "@/assets/server-room.jpg";
import heroTechnicians from "@/assets/hero-technicians.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export type ProjectStatus = "completed" | "live" | "ongoing";

export interface BeforeAfter {
  metric: string;
  before: string;
  after: string;
}

export interface Project {
  id: string;
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
  challenge: string;
  approach: string;
  beforeAfter: BeforeAfter[];
  testimonial?: { quote: string; author: string; role: string };
}

export const categories = ["All", "Fintech & Banking", "CCTV & Security", "Data Center", "Enterprise Network", "Software & Cloud"];

export const projects: Project[] = [
  {
    id: "core-banking-network",
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
    duration: "8 months",
    challenge: "The bank's legacy copper-based network suffered from frequent outages, high latency during peak hours, and lacked the segmentation required for PCI-DSS compliance. Branch-level connectivity was inconsistent, causing failed mobile banking transactions and customer dissatisfaction.",
    approach: "We designed a phased migration strategy — rolling out fiber to high-traffic branches first while maintaining legacy connectivity as fallback. Each branch received dual-path fiber with SD-WAN overlay for intelligent traffic routing, and network segmentation was implemented using Fortinet NGFW with zero-trust policies.",
    beforeAfter: [
      { metric: "Transaction Latency", before: "45–120ms", after: "<5ms" },
      { metric: "Monthly Downtime", before: "12+ hours", after: "0 hours" },
      { metric: "PCI-DSS Compliance", before: "Partial", after: "Full certification" },
      { metric: "Failed Transactions", before: "3.2% rate", after: "0.04% rate" },
      { metric: "Branch Bandwidth", before: "10 Mbps shared", after: "100 Mbps dedicated" },
    ],
    testimonial: { quote: "Nosteq delivered exactly what we needed — reliable, compliant, and fast. Our mobile banking platform hasn't had a single network-related failure since the upgrade.", author: "CTO", role: "Tier-1 Commercial Bank" },
  },
  {
    id: "digital-payment-security",
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
    duration: "6 months",
    challenge: "The platform was experiencing a surge in sophisticated fraud attempts — SIM swap attacks, API-level exploits, and social engineering. Existing rule-based detection was catching only 61% of fraudulent transactions, resulting in significant financial losses and regulatory pressure.",
    approach: "We deployed a multi-layered security architecture: ML-based fraud scoring at the transaction level, behavioral analytics for anomaly detection, and a 24/7 SOC with Splunk SIEM for real-time monitoring. Physical security was hardened with biometric access for all critical infrastructure.",
    beforeAfter: [
      { metric: "Fraud Detection Rate", before: "61%", after: "99.7%" },
      { metric: "False Positive Rate", before: "18%", after: "3.2%" },
      { metric: "Incident Response Time", before: "45 minutes", after: "<2 minutes" },
      { metric: "Monthly Fraud Losses", before: "KES 12M+", after: "KES 800K" },
      { metric: "Compliance Status", before: "3 open findings", after: "Full clearance" },
    ],
    testimonial: { quote: "The transformation in our security posture has been remarkable. We went from firefighting fraud incidents daily to a proactive, intelligence-driven approach.", author: "CISO", role: "Mobile Money Provider" },
  },
  {
    id: "fintech-data-center",
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
    duration: "10 months",
    challenge: "The group was running critical insurance and fintech workloads from a shared commercial data center with inadequate cooling, single points of failure in power, and no compliance certification — putting customer data and regulatory standing at risk.",
    approach: "We designed and built a purpose-built facility with hot/cold aisle containment, N+1 redundancy on all critical systems, FM-200 fire suppression, and isolated colocation zones. The facility was engineered to meet Tier 3+ standards from the ground up.",
    beforeAfter: [
      { metric: "Annual Downtime", before: "28 hours", after: "<26 minutes" },
      { metric: "Power Usage Effectiveness", before: "2.1", after: "1.4" },
      { metric: "Data Center Certification", before: "None", after: "Tier 3+" },
      { metric: "Colocation Partners", before: "0", after: "12 fintechs" },
      { metric: "Energy Cost", before: "KES 4.2M/mo", after: "KES 2.8M/mo" },
    ],
    testimonial: { quote: "Having our own Tier 3+ facility has been transformational — for our operations, our partners, and our credibility with regulators.", author: "Group CIO", role: "Insurance & Fintech Group" },
  },
  {
    id: "hospital-network",
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
    duration: "7 months",
    challenge: "Patient records were siloed across campuses with no real-time access. Doctors relied on physical file transfers. The existing network couldn't support telemedicine or IoT medical devices, and insurance claim submissions were manual and error-prone.",
    approach: "We deployed a unified network fabric across all three campuses with dedicated VLANs for medical devices, administrative systems, and guest access. WiFi 6E was rolled out for high-density clinical areas, and secure APIs were built for insurance integration.",
    beforeAfter: [
      { metric: "EHR Access Time", before: "24–48 hours (inter-campus)", after: "Real-time" },
      { metric: "Telemedicine Visits", before: "~50/month", after: "2,200+/month" },
      { metric: "Insurance Claim Processing", before: "14 days manual", after: "2 days automated" },
      { metric: "Network Devices Supported", before: "800", after: "4,000+" },
      { metric: "WiFi Coverage", before: "60% of campus", after: "100% of campus" },
    ],
    testimonial: { quote: "Our doctors can now access any patient's records instantly from any campus. The telemedicine capability alone has transformed how we serve rural patients.", author: "Medical Director", role: "Regional Healthcare Network" },
  },
  {
    id: "sacco-digital-banking",
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
    duration: "9 months",
    challenge: "The SACCO relied entirely on branch visits for transactions. Members in rural areas had limited access, loan applications took 5+ days to process manually, and management had no real-time visibility into financial performance.",
    approach: "We built a multi-channel digital platform — mobile app for smartphone users, USSD for feature phones — with an automated loan scoring engine that uses member history, savings patterns, and guarantor data. M-Pesa integration enabled instant disbursements and repayments.",
    beforeAfter: [
      { metric: "Digital Adoption", before: "0%", after: "78% of members" },
      { metric: "Loan Processing Time", before: "5 days", after: "4 hours" },
      { metric: "Monthly Loan Volume", before: "2,500", after: "10,000+" },
      { metric: "Branch Visit Dependency", before: "100%", after: "22%" },
      { metric: "Management Reporting", before: "Monthly (manual)", after: "Real-time dashboard" },
    ],
    testimonial: { quote: "Our members can now save, borrow, and transact from anywhere. The USSD channel was a game-changer for our rural members who don't have smartphones.", author: "CEO", role: "Top-10 SACCO" },
  },
  {
    id: "microfinance-security",
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
    duration: "14 months (phased)",
    challenge: "Security was managed independently at each branch with no centralized visibility. Vault access was key-based with no audit trail. Incident response depended on local guards with no real-time alerting to HQ.",
    approach: "We designed a standardized security package per branch — 4K cameras with DeepinView AI, biometric vault access, and cloud-connected monitoring. A centralized dashboard at HQ provides real-time feeds, AI-powered alerts, and full audit trails across all 3 countries.",
    beforeAfter: [
      { metric: "Security Incidents (monthly)", before: "12 per country", after: "1 per country" },
      { metric: "Vault Access Control", before: "Physical keys", after: "Biometric + audit trail" },
      { metric: "Incident Response Time", before: "30+ minutes", after: "<3 minutes" },
      { metric: "Central Visibility", before: "None", after: "Real-time across 85 branches" },
      { metric: "Regulatory Compliance", before: "2 countries non-compliant", after: "Full compliance" },
    ],
    testimonial: { quote: "For the first time, our regional directors can see every branch in real-time. The AI alerts have been a revelation — we catch issues before they escalate.", author: "Head of Security", role: "Pan-African MFI" },
  },
  {
    id: "insurance-claims-automation",
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
    duration: "5 months (ongoing)",
    challenge: "Claims were processed entirely manually — documents were scanned, printed, and reviewed by adjusters. Average processing took 21 days. Fraud detection was reactive, and reinsurance reporting was done via spreadsheets sent monthly.",
    approach: "We built an intelligent pipeline: OCR extracts claim data from uploaded documents, ML models score for fraud risk, and a rules engine auto-adjudicates standard claims. Complex cases are routed to human adjusters with AI-assisted recommendations.",
    beforeAfter: [
      { metric: "Claims Processing Time", before: "21 days", after: "7 days" },
      { metric: "Automated Adjudication", before: "0%", after: "72%" },
      { metric: "Document Processing", before: "Manual data entry", after: "AI OCR extraction" },
      { metric: "Fraud Detection", before: "Reactive/manual", after: "Real-time ML scoring" },
      { metric: "Customer Satisfaction", before: "52% CSAT", after: "89% CSAT" },
    ],
    testimonial: { quote: "What used to take our team 3 weeks now happens in days — and the accuracy is actually better. The self-service portal has dramatically reduced call center volume.", author: "VP Claims", role: "General Insurance Provider" },
  },
  {
    id: "forex-trading-infrastructure",
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
    duration: "4 months",
    challenge: "The bureau's trading platform suffered from inconsistent connectivity between Nairobi and Mombasa, causing rate discrepancies and failed trades during peak hours. Audit logging was incomplete, creating compliance risk with CBK.",
    approach: "We deployed dual-path fiber with sub-3ms latency between locations, implemented F5 load balancing for the trading platform, and built a comprehensive audit logging system with Elasticsearch for real-time compliance reporting.",
    beforeAfter: [
      { metric: "Trade Execution Latency", before: "50–200ms", after: "<3ms" },
      { metric: "Failed Trades (monthly)", before: "340+", after: "< 5" },
      { metric: "Inter-office Connectivity", before: "Single DSL link", after: "Dual fiber + 4G failover" },
      { metric: "Audit Compliance", before: "Incomplete logs", after: "Full real-time audit trail" },
      { metric: "Platform Availability", before: "97.2%", after: "99.99%" },
    ],
    testimonial: { quote: "Our traders now have the speed and reliability they need. The compliance logging alone was worth the investment — our last CBK audit was the smoothest we've ever had.", author: "Managing Director", role: "Licensed Forex Bureau" },
  },
];

export const statusConfig: Record<ProjectStatus, { label: string; color: string; icon: string }> = {
  completed: { label: "Completed", color: "bg-muted text-muted-foreground", icon: "CheckCircle2" },
  live: { label: "Live & Operational", color: "bg-primary/10 text-primary", icon: "Zap" },
  ongoing: { label: "In Progress", color: "bg-secondary/10 text-secondary", icon: "Clock" },
};

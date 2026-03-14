import { mediaItems, type MediaItem } from "@/data/media";

// ============================================
// CONTENT STORE — localStorage-based CMS
// ============================================
// All site content can be edited via /admin
// Changes persist in localStorage and override
// the default static data from data files.

const STORAGE_KEY = "nosteq_admin_content";

export interface HeroContent {
  badge: string;
  heading: string[];
  subheading: string;
  stats: { value: string; label: string }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  category: string;
  questions: FAQItem[];
}

export interface PackageItem {
  name: string;
  speed: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
}

export interface TestimonialItem {
  text: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

export interface AboutContent {
  story: string[];
  stats: { value: string; label: string }[];
  testimonials: TestimonialItem[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string[];
}

export interface ServiceEditItem {
  slug: string;
  iconName: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  useCases: string[];
}

export interface SiteContent {
  hero: HeroContent;
  services: ServiceEditItem[];
  homePackages: PackageItem[];
  businessPackages: PackageItem[];
  faqs: FAQSection[];
  about: AboutContent;
  contact: ContactInfo;
  media: MediaItem[];
}

// Default content extracted from components
const defaultContent: SiteContent = {
  hero: {
    badge: "Trusted by 5,000+ Businesses Across East Africa",
    heading: ["We Build the", "IT Backbone", "Your Business Runs On"],
    subheading: "From lightning-fast fiber to intelligent security, data centers to custom software — we handle it all so you can focus on what you do best.",
    stats: [
      { value: "99.9%", label: "Uptime SLA" },
      { value: "1Gbps", label: "Max Speed" },
      { value: "24/7", label: "Support" },
      { value: "5000+", label: "Clients Served" },
    ],
  },
  services: [
    { slug: "fiber-internet", iconName: "Gauge", title: "Fiber Internet Provision", badge: "Up to 1Gbps", tagline: "Slow internet costs you more than you think. We fix that.", description: "", features: [], benefits: [], technologies: [], useCases: [] },
    { slug: "cctv-security", iconName: "Shield", title: "CCTV & Security Systems", badge: "4K · AI Analytics", tagline: "Your eyes can't be everywhere. Our cameras can.", description: "", features: [], benefits: [], technologies: [], useCases: [] },
    { slug: "structured-cabling", iconName: "Cable", title: "Structured Cabling & Networks", badge: "Voice · Data · Video", tagline: "Bad cabling is behind more network problems than people realize.", description: "", features: [], benefits: [], technologies: [], useCases: [] },
    { slug: "data-center", iconName: "Database", title: "Data Center Solutions", badge: "Enterprise Grade", tagline: "Where your most critical systems live — built to never go down.", description: "", features: [], benefits: [], technologies: [], useCases: [] },
    { slug: "software-development", iconName: "Code", title: "Software & App Development", badge: "Custom Solutions", tagline: "Software that fits how your business actually works — not the other way around.", description: "", features: [], benefits: [], technologies: [], useCases: [] },
    { slug: "it-consulting", iconName: "Network", title: "IT Consulting & Integration", badge: "Full Stack IT", tagline: "Not sure where to start with your IT? That's literally what we're here for.", description: "", features: [], benefits: [], technologies: [], useCases: [] },
    { slug: "smart-building", iconName: "Lightbulb", title: "Smart Building Automation", badge: "IoT Enabled", tagline: "Buildings that adjust lighting, temperature, and access without anyone lifting a finger.", description: "", features: [], benefits: [], technologies: [], useCases: [] },
    { slug: "voip-communications", iconName: "Phone", title: "VoIP & Unified Communications", badge: "HD Quality", tagline: "Ditch the old phone system. Talk to anyone, anywhere, crystal clear.", description: "", features: [], benefits: [], technologies: [], useCases: [] },
    { slug: "cloud-hosting", iconName: "Server", title: "Cloud & Hosting Services", badge: "99.9% Uptime", tagline: "Your apps and data, always available — without managing a single server.", description: "", features: [], benefits: [], technologies: [], useCases: [] },
  ],
  homePackages: [
    { name: "Starter", speed: "8 Mbps", price: "2,000", description: "Perfect for browsing, emails, and staying connected", features: ["Smooth browsing & email", "Social media & messaging", "Light video calls", "Free installation", "24/7 support"], popular: false },
    { name: "Pro", speed: "15 Mbps", price: "2,500", description: "Stream, video-call, and work from home — comfortably", features: ["HD streaming (720p)", "Reliable video conferencing", "5+ devices at once", "Free installation", "Priority support"], popular: false },
    { name: "Turbo", speed: "50 Mbps", price: "3,000", description: "The sweet spot — fast enough for almost anything", features: ["4K streaming, no buffering", "Lag-free gaming", "Work-from-home powerhouse", "Free router upgrade", "Dedicated support line"], popular: true },
    { name: "Ultra", speed: "100 Mbps+", price: "4,000+", description: "For power users who refuse to compromise", features: ["Unlimited everything", "Enterprise-grade speed", "Static IP included", "Premium WiFi 6 router", "Personal account manager"], popular: false },
  ],
  businessPackages: [
    { name: "SME Starter", speed: "20 Mbps", price: "5,000", description: "Everything a small team needs to stay productive", features: ["Up to 10 devices", "Business-grade router", "99.5% uptime SLA", "Email & web hosting", "8am–8pm support"], popular: false },
    { name: "Corporate", speed: "50 Mbps", price: "8,500", description: "For growing teams that can't afford downtime", features: ["Up to 25 devices", "Static IP address", "99.7% uptime SLA", "Secure VPN ready", "Priority 24/7 support"], popular: false },
    { name: "Enterprise", speed: "100 Mbps", price: "15,000", description: "Dedicated bandwidth — your speed, nobody else's", features: ["Unlimited devices", "100% dedicated line", "99.9% uptime SLA", "Free backup connection", "Dedicated account manager"], popular: true },
    { name: "Premium", speed: "200 Mbps+", price: "25,000+", description: "Custom-built for organizations that need it all", features: ["Scalable on demand", "Multiple static IPs", "99.95% uptime guarantee", "On-site support team", "Custom SLA terms"], popular: false },
  ],
  faqs: [
    {
      category: "Getting Started",
      questions: [
        { question: "How quickly can you set up my fiber connection?", answer: "If fiber already reaches your building, we'll have you online in 2–4 hours. If we need to lay new fiber to your location, expect 5–7 business days." },
        { question: "Will I need to pay for installation?", answer: "Nope — installation is completely free when you sign up for 6 months or longer." },
        { question: "What equipment do I get?", answer: "Every package comes with a high-performance WiFi router, a fiber ONT device, and all the cabling needed." },
        { question: "Are you available in my area?", answer: "We currently cover Nairobi, Kiambu, Thika, and surrounding areas — and we're expanding fast." },
      ]
    },
    {
      category: "Money Matters",
      questions: [
        { question: "Can I switch my plan anytime?", answer: "Absolutely. Upgrading takes effect immediately. Downgrading kicks in at your next billing cycle." },
        { question: "How can I pay?", answer: "M-Pesa, bank transfer, card, or Airtel Money. Businesses can set up invoiced billing." },
      ]
    },
    {
      category: "Support & Reliability",
      questions: [
        { question: "What's your uptime guarantee?", answer: "99.9% across all packages — and we put our money where our mouth is." },
        { question: "Something's wrong with my connection — who do I call?", answer: "Our 24/7 team at +254 743 101 738 — call or WhatsApp." },
      ]
    }
  ],
  about: {
    story: [
      "Nosteq started with a simple frustration: businesses in East Africa deserved better IT infrastructure than what was available.",
      "Today, we're a fully licensed, multi-certified IT company serving everyone from startups to banks processing millions of daily transactions.",
      "Our approach is simple: understand first, then build.",
    ],
    stats: [
      { value: "5,000+", label: "Happy Clients" },
      { value: "10+", label: "Years in the Field" },
      { value: "24/7", label: "Real Human Support" },
    ],
    testimonials: [
      { text: "We used to lose hours every week to network issues. Since Nosteq came in, we haven't thought about connectivity once.", author: "Jane W.", role: "Operations Director", location: "Financial Services", rating: 5 },
      { text: "What impressed us most wasn't just the CCTV quality — it was how they took time to understand our security concerns.", author: "John K.", role: "Facilities Manager", location: "Commercial Real Estate", rating: 5 },
      { text: "We were spending a fortune on disconnected IT systems. Nosteq helped us consolidate everything.", author: "Sarah M.", role: "CEO", location: "Tech Startup", rating: 5 },
      { text: "Most ISPs give you a number to call when things break. Nosteq gave us a dedicated account manager.", author: "Michael O.", role: "IT Manager", location: "Media Company", rating: 5 },
    ],
  },
  contact: {
    phone: "+254 743 101 738",
    email: "info@nosteq.co.ke",
    address: "Banana Hill, Kiambu\nKenya",
    hours: ["Monday – Friday: 8:00 AM – 6:00 PM", "Saturday: 9:00 AM – 4:00 PM", "Sunday: Closed"],
  },
  media: mediaItems,
};

export function getContent(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultContent, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error("Failed to load admin content:", e);
  }
  return defaultContent;
}

export function saveContent(content: Partial<SiteContent>) {
  try {
    const current = getContent();
    const updated = { ...current, ...content };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save admin content:", e);
  }
}

export function resetContent() {
  localStorage.removeItem(STORAGE_KEY);
  return defaultContent;
}

export { defaultContent };

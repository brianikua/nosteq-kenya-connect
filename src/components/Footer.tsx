import { Network, Facebook, Instagram, Linkedin, Twitter, Youtube, Github, Globe } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { useSiteContent } from "@/lib/contentStore";

const socialIconMap: Record<string, any> = {
  LinkedIn: Linkedin,
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  YouTube: Youtube,
  GitHub: Github,
  TikTok: FaTiktok,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const { footer } = useSiteContent();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyright = (footer.copyright || "").replace("{year}", String(currentYear));

  return (
    <footer className="section-dark border-t border-border">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Network className="w-7 h-7 md:w-8 md:h-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-lg md:text-xl">{footer.brandName}</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{footer.brandTagline}</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground max-w-md mb-4 leading-relaxed">
                {footer.description}
              </p>
              <div className="brand-divider w-20" />
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                {footer.quickLinks.map((link) => (
                  <li key={link.id}>
                    <a href={`/#${link.id}`} onClick={(e) => handleNavClick(e, link.id)} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-3 md:mb-4 text-sm md:text-base">Contact Us</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                {footer.contactLines.map((line, i) => (
                  <li key={i} className="break-words">{line}</li>
                ))}
                {footer.supportNote && (
                  <li className="text-primary font-semibold pt-1 md:pt-2">{footer.supportNote}</li>
                )}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <div className="border-t border-border pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs md:text-sm text-muted-foreground text-center md:text-left">{copyright}</div>
          <div className="flex gap-2 md:gap-3">
            {footer.socials.map((social) => {
              const Icon = socialIconMap[social.platform] || Globe;
              return (
                <a key={social.platform} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 md:w-10 md:h-10 bg-accent hover:bg-primary/10 rounded-full flex items-center justify-center transition-all hover:scale-105 group" aria-label={social.platform}>
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

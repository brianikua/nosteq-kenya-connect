import { Wifi, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 kitenge-pattern opacity-10" />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Wifi className="w-10 h-10 text-primary network-pulse" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl gradient-text">Nosteq Networks</h3>
                <p className="text-xs text-muted-foreground">Powering Kenya's Digital Future</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Kenya's premier ISP delivering ultra-fast fiber internet, CCTV security, and comprehensive IT solutions. 
              Licensed by CA Kenya, serving homes and businesses across Nairobi and beyond.
            </p>
            <div className="flag-divider w-24" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection("hero")} className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")} className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("packages")} className="text-muted-foreground hover:text-primary transition-colors">
                  Packages
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+254743101738" className="hover:text-primary transition-colors">
                  +254 743 101 738
                </a>
              </li>
              <li>
                <a href="mailto:info@nosteq.co.ke" className="hover:text-primary transition-colors">
                  info@nosteq.co.ke
                </a>
              </li>
              <li>Banana Hill, Kiambu</li>
              <li className="text-primary font-semibold pt-2">24/7 Support Available</li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Nosteq Networks Limited. All Rights Reserved.
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/nosteq-networks"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-muted hover:bg-primary/20 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.facebook.com/NosteqWIFI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-muted hover:bg-primary/20 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/nosteqwifi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-muted hover:bg-secondary/20 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
            </a>
            <a
              href="https://www.tiktok.com/@nosteq.network.li"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-muted hover:bg-accent/20 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
              aria-label="TikTok"
            >
              <FaTiktok className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="https://twitter.com/nosteqkenya"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-muted hover:bg-primary/20 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
              aria-label="Twitter/X"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

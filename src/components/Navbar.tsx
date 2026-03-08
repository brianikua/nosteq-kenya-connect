import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Network } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Packages", href: "/#packages" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace("/#", "");
    // If already on homepage, smooth scroll instead of hard navigation
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
    } else {
      // Let the native <a> handle cross-page navigation
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-lg shadow-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/#hero" onClick={(e) => handleNavClick(e, "/#hero")} className="flex items-center gap-3 cursor-pointer">
            <Network className={`w-8 h-8 ${isScrolled ? 'text-primary' : 'text-primary-foreground'}`} />
            <div>
              <h1 className={`font-heading font-bold text-xl ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
                Nosteq Networks
              </h1>
              <p className={`text-xs ${isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/60'}`}>
                Full IT Technology
              </p>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? "text-foreground hover:text-primary" : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
              <Button variant="hero" size="sm">
                Get Quote
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/98 backdrop-blur-lg border-t border-border animate-slide-in">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-left py-2 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
              <Button variant="hero" className="w-full">
                Get Quote
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

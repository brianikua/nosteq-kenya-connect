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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.replace("/#", "");
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-card/95 backdrop-blur-lg shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/#hero" onClick={(e) => handleNavClick(e, "/#hero")} className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0">
            <Network className={`w-7 h-7 md:w-8 md:h-8 shrink-0 ${isScrolled || isMobileMenuOpen ? 'text-primary' : 'text-primary-foreground'}`} />
            <div className="min-w-0">
              <h1 className={`font-heading font-bold text-lg md:text-xl truncate ${isScrolled || isMobileMenuOpen ? 'text-foreground' : 'text-primary-foreground'}`}>
                Nosteq Networks
              </h1>
              <p className={`text-[10px] md:text-xs ${isScrolled || isMobileMenuOpen ? 'text-muted-foreground' : 'text-primary-foreground/60'}`}>
                Get Connected
              </p>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
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
            className={`lg:hidden p-2 -mr-2 ${isScrolled || isMobileMenuOpen ? 'text-foreground' : 'text-primary-foreground'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card/98 backdrop-blur-lg border-t border-border animate-slide-in max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-left py-3 px-3 hover:text-primary hover:bg-accent/50 rounded-lg transition-colors text-base font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 pb-1">
              <a href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
                <Button variant="hero" className="w-full" size="lg">
                  Get Quote
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Wifi } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flag-divider" />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="relative">
              <Wifi className="w-10 h-10 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl gradient-text">Nosteq Networks</h1>
              <p className="text-xs text-muted-foreground">Powering Kenya's Future</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("services")} className="text-sm font-medium hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("packages")} className="text-sm font-medium hover:text-primary transition-colors">
              Packages
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="text-sm font-medium hover:text-primary transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("about")} className="text-sm font-medium hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </button>
            <Button variant="hero" size="sm" onClick={() => scrollToSection("contact")}>
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground"
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
            <button onClick={() => scrollToSection("services")} className="text-left py-2 hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("packages")} className="text-left py-2 hover:text-primary transition-colors">
              Packages
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="text-left py-2 hover:text-primary transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("about")} className="text-left py-2 hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-left py-2 hover:text-primary transition-colors">
              Contact
            </button>
            <Button variant="hero" className="w-full" onClick={() => scrollToSection("contact")}>
              Get Quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

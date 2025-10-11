import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "pricing", "faq"];
      const scrollPos = window.scrollY + 120;
      let current = "";
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPos) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* ✅ New SVG Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <svg width="180" height="50" viewBox="0 0 280 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-105">
            {/* Network nodes */}
            <circle cx="25" cy="25" r="6" fill="#ec4899" />
            <circle cx="45" cy="25" r="6" fill="#9333ea" />
            <circle cx="25" cy="45" r="6" fill="#f97316" />
            <circle cx="45" cy="45" r="6" fill="#ec4899" />
            <circle cx="35" cy="35" r="8" fill="url(#brain-gradient)" />
            
            {/* Connections */}
            <line x1="25" y1="25" x2="35" y2="35" stroke="#ec4899" strokeWidth="2" opacity="0.5" />
            <line x1="45" y1="25" x2="35" y2="35" stroke="#9333ea" strokeWidth="2" opacity="0.5" />
            <line x1="25" y1="45" x2="35" y2="35" stroke="#f97316" strokeWidth="2" opacity="0.5" />
            <line x1="45" y1="45" x2="35" y2="35" stroke="#ec4899" strokeWidth="2" opacity="0.5" />
            
            {/* Text */}
            <text x="75" y="48" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#1f2937">
              Influ<tspan fill="#ec4899">Match</tspan>
            </text>
            <text x="225" y="48" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#f97316">
              .ai
            </text>
            
            <defs>
              <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={(e) => handleSmoothScroll(e, link.id)}
              className={`relative text-foreground transition-colors hover:text-primary ${
                activeSection === link.id ? "text-primary font-semibold" : ""
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary rounded-full transition-all" />
              )}
            </a>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="hover:text-primary transition-colors">
              Login
            </Button>
          </Link>
          <Link to="/signup/company">
            <Button variant="default" className="shadow-md hover:shadow-lg transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

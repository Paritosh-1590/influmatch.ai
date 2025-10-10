import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-primary-foreground font-bold text-xl">IM</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            InfluMatch.ai
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/#pricing" className="text-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/#faq" className="text-foreground hover:text-primary transition-colors">
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/signup/company">
            <Button variant="default">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

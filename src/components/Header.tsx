import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Blog", to: "/blog" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-display font-bold text-xl text-deep-slate">
          Syntax<span className="text-primary">IT</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === l.to
                  ? "text-primary bg-primary/5"
                  : "text-slate-text hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+1234567890" className="flex items-center gap-2 text-sm font-medium text-primary">
            <Phone className="h-4 w-4" />
            +1 (234) 567-890
          </a>
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-card p-4 space-y-2">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-md ${
                location.pathname === l.to ? "text-primary bg-primary/5" : "text-slate-text"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a href="tel:+1234567890" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary">
            <Phone className="h-4 w-4" /> +1 (234) 567-890
          </a>
          <Button asChild className="w-full">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      )}
    </header>
  );
}

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-deep-slate text-light-slate">
      <div className="container section-padding">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-display font-bold text-xl mb-4">
              Syntax<span className="text-primary">IT</span>
            </h3>
            <p className="text-sm text-light-slate/70 leading-relaxed">
              Empowering businesses with cutting-edge technology solutions. Your trusted partner in digital transformation.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-light-slate/70">
              {["About", "Services", "Portfolio", "Blog", "Careers"].map((l) => (
                <li key={l}>
                  <Link to={`/${l.toLowerCase()}`} className="hover:text-primary transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-light-slate/70">
              {["Web Development", "AI & ML Solutions", "Mobile Apps", "Digital Marketing"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-light-slate/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                123 Tech Avenue, Silicon Valley, CA 94025
              </li>
              <li>
                <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a href="mailto:info@syntaxitsolution.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  info@syntaxitsolution.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-light-slate/10 text-center text-sm text-light-slate/50">
          © {new Date().getFullYear()} Syntax IT Solution. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

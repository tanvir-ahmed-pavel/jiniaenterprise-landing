import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pt-20 pb-10 overflow-hidden">
      {/* Premium Dark Glass Background */}
      <div className="absolute inset-0 glass-dark -z-10 rounded-t-[3rem] md:rounded-t-[5rem]" />
      
      {/* Decorative Blur Spot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-green-500/30 to-transparent" />

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Identity */}
          <div className="space-y-8">
            <Link href="/" className="group inline-flex flex-col">
              <span className="text-3xl font-heading font-black tracking-tighter text-white group-hover:text-green-400 transition-colors">
                JINIA
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500 mt-1">
                Enterprise
              </span>
            </Link>
            
            <p className="text-sm text-white/50 leading-relaxed font-medium">
              {siteConfig.tagline}. A legacy of excellence serving global NGOs, embassies, and premium individuals.
            </p>

            <div className="flex gap-4">
              {[
                { icon: MessageSquare, href: `https://wa.me/${siteConfig.whatsapp}`, label: "WhatsApp" },
                { icon: Phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}`, label: "Call" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-green-500 hover:text-green-950 transition-all duration-500 hover:-translate-y-1 shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:pl-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8 italic">
              Experience
            </h4>
            <ul className="space-y-4">
              {[
                { href: "/vehicles", label: "Premium Fleet" },
                { href: "/services", label: "Our Services" },
                { href: "/booking", label: "Reserve" },
                { href: "/about", label: "Our Story" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm font-bold text-white/60 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Menu */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8 italic">
              Curated Services
            </h4>
            <ul className="space-y-4 text-sm font-bold text-white/50">
              <li>Corporate Mobility</li>
              <li>Diplomatic Logistics</li>
              <li>Airport Concierge</li>
              <li>Events & Delegations</li>
              <li>Luxury Monthly Leasing</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8 italic">
              Connect
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                  <MapPin className="h-4 w-4 text-orange-400" />
                </div>
                <div className="text-sm font-medium text-white/60 leading-relaxed">
                  Gulshan North Commercial Area, <br />
                  Gulshan-2, Dhaka-1212
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/20">
                  <Phone className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex flex-col gap-1 text-sm font-bold text-white/70">
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-green-400 transition-colors">
                    {siteConfig.phone}
                  </a>
                  <span className="text-[10px] text-white/30 font-medium">Available 24/7</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <a
                  href={`mailto:jiniaenterprise.com@gmail.com`}
                  className="text-sm font-bold text-white/70 hover:text-blue-400 transition-colors"
                >
                  jiniaenterprise.com@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            &copy; {currentYear} Jinia Enterprise. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500/50 italic">
              &ldquo;{siteConfig.philosophy}&rdquo;
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

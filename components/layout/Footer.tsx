import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { SilkRibbonBackdrop } from "@/components/ui/SilkRibbonBackdrop";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 pt-16 pb-12 overflow-hidden bg-radial from-emerald-950/95 via-[#031d14] to-[#01120c] rounded-t-[3rem] sm:rounded-t-[4rem] md:rounded-t-[5rem] border-t border-amber-400/20 shadow-[0_-12px_36px_rgba(1,18,12,0.4)]">
      {/* ── Signature Diagonal Silk Ribbon Point of Interest (Subtle Dark Theme) ── */}
      <SilkRibbonBackdrop variant="dark" className="opacity-35" />

      {/* ── Sleek, Subtle Golden Top Rim Line ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-400/50 to-transparent z-10" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-8">
          {/* Brand Identity */}
          <div className="space-y-6 xl:col-span-3">
            <Link href="/" className="group inline-flex flex-col">
              <span className="text-2xl font-heading font-black tracking-wider text-white group-hover:text-emerald-400 transition-colors">
                JINIA
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mt-1">
                Enterprise
              </span>
            </Link>
            
            <p className="text-xs text-white/60 leading-relaxed font-medium">
              {siteConfig.tagline}. Dedicated to delivering premium, secure, and punctual transportation for corporate leaders, embassies, and distinguished travelers.
            </p>

            <div className="flex gap-3">
              {[
                { icon: MessageSquare, href: `https://wa.me/${siteConfig.whatsapp}`, label: "WhatsApp Hotline" },
                { icon: Phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}`, label: "Direct Call" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-emerald-500 hover:text-emerald-950 transition-all duration-300 shadow-md"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:pl-0 xl:pl-4 xl:col-span-4">
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400/80 mb-6">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { href: "/vehicles", label: "Fleet Collection" },
                { href: "/car-rental-dhaka", label: "Car Rental Dhaka" },
                { href: "/airport-car-rental", label: "Airport Transfer" },
                { href: "/corporate-car-rental", label: "Corporate Rental" },
                { href: "/monthly-car-rental", label: "Monthly Rental" },
                { href: "/pricing", label: "Pricing" },
                { href: "/locations", label: "Locations" },
                { href: "/routes", label: "Routes" },
                { href: "/compare", label: "Compare" },
                { href: "/reviews", label: "Reviews" },
                { href: "/policies", label: "Policies" },
                { href: "/glossary", label: "Glossary" },
                { href: "/faq", label: "FAQ" },
                { href: "/booking", label: "Reserve Vehicle" },
                { href: "/about", label: "About Jinia" },
                { href: "/contact", label: "Contact Desk" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-emerald-400 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Menu */}
          <div className="xl:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400/80 mb-6">
              Core Solutions
            </h4>
            <ul className="space-y-3 text-xs font-medium text-white/60">
              {[
                { href: "/car-rental-with-driver", label: "Car rental with driver" },
                { href: "/airport-car-rental", label: "Airport meet & greet" },
                { href: "/corporate-car-rental", label: "Corporate & embassy fleet" },
                { href: "/monthly-car-rental", label: "Monthly chauffeur hire" },
                { href: "/services", label: "All concierge services" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6 xl:col-span-3">
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400/80 mb-6">
              Concierge Office
            </h4>
            <div className="space-y-4">
              <a
                href="https://maps.google.com/?q=Unicorn+Plaza+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 group p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-emerald-950 transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="text-xs font-medium text-white/70 leading-relaxed group-hover:text-white transition-colors">
                  40/2, Unicorn Plaza (Level-2), <br />
                  Shop-9,10, Dhaka 1212
                </div>
              </a>

              <div className="flex gap-3 p-2 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 text-emerald-400">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-xs font-bold text-white/80">
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-emerald-400 transition-colors">
                    {siteConfig.phone}
                  </a>
                  <span className="text-[10px] text-emerald-400/70 font-semibold mt-0.5">24/7 Priority Support</span>
                </div>
              </div>

              <div className="flex gap-3 p-2 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 text-emerald-400">
                  <Mail className="h-4 w-4" />
                </div>
                <a
                  href={`mailto:jiniaenterprise.com@gmail.com`}
                  className="text-xs font-semibold text-white/80 hover:text-emerald-400 transition-colors self-center"
                >
                  jiniaenterprise.com@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-white/40">
            &copy; {currentYear} Jinia Enterprise. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold text-emerald-400/80 italic">
              &ldquo;{siteConfig.philosophy}&rdquo;
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

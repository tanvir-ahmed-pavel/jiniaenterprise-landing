import Link from "next/link";
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { SilkRibbonBackdrop } from "@/components/ui/SilkRibbonBackdrop";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pt-16 pb-12 overflow-hidden bg-emerald-950">
      {/* ── Signature Diagonal Silk Ribbon Point of Interest ── */}
      <SilkRibbonBackdrop className="opacity-45" />

      {/* Premium Dark Glass Background Layer */}
      <div className="absolute inset-0 bg-emerald-950/80 -z-10 rounded-t-[2.5rem] md:rounded-t-[4rem]" />
      
      {/* ── Prominent Shiny Golden Top Border & Edge Glow ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_18px_rgba(251,191,36,0.7)]" />
      <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-amber-200 to-transparent opacity-90" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Identity */}
          <div className="space-y-6">
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
          <div className="lg:pl-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400/80 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/vehicles", label: "Fleet Collection" },
                { href: "/services", label: "Concierge Services" },
                { href: "/booking", label: "Reserve Vehicle" },
                { href: "/about", label: "About Jinia" },
                { href: "/blog", label: "Travel Journal" },
                { href: "/contact", label: "Contact Desk" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-emerald-400 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Menu */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400/80 mb-6">
              Core Solutions
            </h4>
            <ul className="space-y-3 text-xs font-medium text-white/60">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Executive & Diplomatic Chauffeur</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Airport Protocol & Meet & Greet</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Long-Term Corporate Fleet Leasing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Luxury Microbus & AC Tourist Bus</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Events & Foreign Delegation Transport</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
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

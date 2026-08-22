"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Only go transparent on the homepage; every other page always uses the solid style
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/vehicles", label: "Fleet" },
    { href: "/services", label: "Services" },
    { href: "/car-rental-dhaka", label: "Dhaka" },
    { href: "/blog", label: "Journal" },
    { href: "/booking", label: "Reserve" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "Story" },
    { href: "/contact", label: "Connect" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none transition-all duration-500">
      <nav
        className={cn(
          "pointer-events-auto mx-auto max-w-7xl rounded-2xl sm:rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isTransparent
            ? "py-3 sm:py-4 px-4 sm:px-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/5"
            : "py-3 px-4 sm:px-6 bg-white/85 backdrop-blur-2xl border border-white/80 shadow-[0_12px_40px_-10px_rgba(10,25,18,0.1)] ring-1 ring-black/5"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative p-1.5 rounded-xl bg-white/10 border border-white/10 shadow-sm transition-transform duration-500 group-hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Jinia Enterprise"
                className={cn(
                  "h-8 sm:h-9 w-auto transition-transform duration-500",
                  isTransparent && "drop-shadow-md brightness-0 invert"
                )}
              />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-base sm:text-lg font-heading font-black tracking-wider leading-none transition-colors duration-500",
                isTransparent ? "text-white" : "text-emerald-950"
              )}>
                JINIA
              </span>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-[0.25em] leading-none mt-0.5 transition-colors duration-500",
                isTransparent ? "text-emerald-300" : "text-emerald-700"
              )}>
                Enterprise
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center p-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
                    isTransparent
                      ? isActive
                        ? "bg-white text-emerald-950 shadow-md shadow-black/10"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      : isActive
                        ? "bg-emerald-900 text-white shadow-md shadow-emerald-950/10"
                        : "text-emerald-950/70 hover:text-emerald-950 hover:bg-emerald-50/80"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className={cn(
              "hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors",
              isTransparent 
                ? "text-emerald-300 border-emerald-400/30 bg-emerald-950/40" 
                : "text-emerald-800 border-emerald-200 bg-emerald-50/70"
            )}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>24/7 Concierge</span>
            </div>

            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2 rounded-full font-bold text-xs h-10 px-3.5 transition-all duration-300",
                  isTransparent 
                    ? "text-white hover:bg-white/15" 
                    : "text-emerald-950 hover:bg-emerald-50"
                )}
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call</span>
              </Button>
            </a>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="sm" 
                className={cn(
                  "gap-2 px-5 h-10 rounded-full shadow-lg transition-all duration-300 hover:scale-105 font-bold uppercase text-[11px] tracking-wider",
                  isTransparent 
                    ? "bg-white text-emerald-950 hover:bg-emerald-50 shadow-white/10" 
                    : "bg-emerald-900 text-white hover:bg-emerald-800 shadow-emerald-950/20"
                )}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "flex items-center lg:hidden w-10 h-10 rounded-xl justify-center transition-all duration-300 shadow-sm",
              isTransparent
                ? "bg-white/15 text-white hover:bg-white/25 border border-white/20"
                : "bg-emerald-50 text-emerald-950 hover:bg-emerald-100 border border-emerald-200/60"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={cn(
            "fixed inset-0 w-full h-screen bg-emerald-950/98 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-40 lg:hidden flex flex-col items-center justify-between py-24 px-6",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none -translate-y-8"
          )}
        >
          <div className="flex flex-col items-center space-y-4 w-full">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-4 opacity-70">
              Menu Navigation
            </span>
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group relative flex flex-col items-center transition-all duration-500",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
                style={{ transitionDelay: `${100 + idx * 50}ms` }}
              >
                <span className="text-3xl sm:text-4xl font-heading font-black text-white group-hover:text-emerald-400 transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
          
          <div className={cn(
            "flex flex-col gap-3 w-full max-w-sm pt-8 transition-all duration-700 delay-300",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              <Button
                variant="outline"
                className="w-full h-14 gap-3 rounded-2xl border-white/20 text-white bg-white/5 hover:bg-white/10 text-sm font-bold uppercase tracking-wider"
              >
                <Phone className="h-4 w-4 text-emerald-400" /> Direct Call: {siteConfig.phone}
              </Button>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full h-14 gap-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-sm font-black uppercase tracking-wider shadow-xl shadow-emerald-500/20">
                <MessageSquare className="h-4 w-4" /> WhatsApp Hotline
              </Button>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

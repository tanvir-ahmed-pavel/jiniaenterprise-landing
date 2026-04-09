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
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname, isOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/vehicles", label: "Fleet" },
    { href: "/services", label: "Services" },
    { href: "/booking", label: "Reserve" },
    { href: "/about", label: "Story" },
    { href: "/blog", label: "Journal" },
    { href: "/contact", label: "Connect" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
        isTransparent
          ? "py-6 bg-transparent border-b border-transparent"
          : "py-4 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-xl shadow-black/5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-4">
          <div className="relative">
            <img
              src="/images/logo.png"
              alt="Jinia Enterprise"
              className={cn(
                "h-12 w-auto transition-transform duration-500 group-hover:scale-110",
                isTransparent && "drop-shadow-2xl brightness-0 invert"
              )}
            />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-lg font-heading font-black tracking-widest leading-none transition-colors duration-500",
              isTransparent ? "text-white" : "text-green-950"
            )}>
              JINIA
            </span>
            <span className={cn(
              "text-[10px] font-black uppercase tracking-[0.3em] leading-none mt-1 transition-colors duration-500",
              isTransparent ? "text-white/60" : "text-green-600"
            )}>
              Enterprise
            </span>
          </div>
        </Link>

        {/* Desktop Navigation — Artistic Minimalist */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300",
                  isTransparent 
                    ? "text-white/80 hover:text-white" 
                    : "text-green-950/60 hover:text-green-950",
                  isActive && (isTransparent ? "text-white" : "text-green-800")
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-px transition-all duration-300",
                  isTransparent ? "bg-white" : "bg-green-700",
                  isActive ? "w-full" : "group-hover:w-full"
                )} />
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="group">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-3 rounded-2xl transition-all duration-500 font-bold",
                isTransparent 
                  ? "text-white hover:bg-white/10" 
                  : "text-green-900 hover:bg-green-50"
              )}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xl:inline">{siteConfig.phone}</span>
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
                "gap-3 px-6 rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-1 font-black uppercase text-[10px] tracking-widest",
                isTransparent 
                  ? "bg-white text-green-950 hover:bg-green-50" 
                  : "bg-green-950 text-white hover:bg-green-900 shadow-green-950/20"
              )}
            >
              <MessageSquare className="h-4 w-4" />
              Connect
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle — Bespoke Design */}
        <button
          className={cn(
            "flex items-center lg:hidden w-12 h-12 rounded-2xl justify-center transition-all duration-500",
            isTransparent
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-green-50 text-green-950 hover:bg-green-100"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav — Artistic Glass Sheet */}
      <div
        className={cn(
          "fixed inset-0 w-full h-screen bg-white/98 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-40 lg:hidden flex flex-col items-center justify-between py-24 px-8",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="flex flex-col items-center space-y-4 w-full">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-green-600 mb-8 opacity-40">Main Navigation</span>
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "group relative flex flex-col items-center transition-all duration-700",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${150 + idx * 70}ms` }}
            >
              <span className="text-5xl sm:text-6xl font-heading font-black text-green-950 tracking-tighter group-hover:text-green-600 transition-colors italic">
                {link.label}
              </span>
              <span className="h-0.5 w-0 bg-green-500 group-hover:w-full transition-all duration-500 rounded-full" />
            </Link>
          ))}
        </div>
        
        <div className={cn(
          "flex flex-col gap-4 w-full max-w-sm pt-12 transition-all duration-1000 delay-500",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="w-full h-px bg-green-100 mb-4" />
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
            <Button
              variant="outline"
              className="w-full h-16 gap-4 rounded-3xl border-green-100 text-green-950 text-base font-black uppercase tracking-widest"
            >
              <Phone className="h-4 w-4" /> Call Concierge
            </Button>
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full h-16 gap-4 rounded-3xl bg-green-950 text-white text-base font-black uppercase tracking-widest shadow-2xl shadow-green-950/20">
              <MessageSquare className="h-4 w-4" /> WhatsApp Axis
            </Button>
          </a>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-5 pointer-events-none">
          <span className="text-[15rem] font-heading font-black italic tracking-tighter">JINIA</span>
        </div>
      </div>
    </nav>
  );
}

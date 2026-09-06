"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, MessageSquare, ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  /** At the very top the bar sits on the hero with no plate of its own; the
   *  white background and rule fade in once the page has moved under it.
   *  Type stays dark throughout — the hero is light, not a dark photograph. */
  const [isAtTop, setIsAtTop] = useState(true);
  /** Tucks away on the way down and comes back on the way up. */
  const [isHidden, setIsHidden] = useState(false);
  const isTransparent = false;
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setIsAtTop(y < 8);
      setIsHidden(y > 140 && y > lastScrollY);
      lastScrollY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const initial = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) || []
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleMenuKeyDown);
    requestAnimationFrame(() => mobileMenuCloseRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleMenuKeyDown);
      if (previouslyFocused && document.contains(previouslyFocused)) {
        requestAnimationFrame(() => previouslyFocused.focus());
      }
    };
  }, [isOpen]);

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

  // Labels are the vocabulary of a chauffeur service, not of a SaaS product.
  const menus = {
    Fleet: [
      { label: "The fleet", description: "Premium cars, SUVs, microbuses, and buses for every journey.", href: "/vehicles" },
      { label: "Start a booking", description: "Share your dates and route; the desk will return a clear quote.", href: "/booking" },
      { label: "Airport transfers", description: "A calm, reliable handoff from Hazrat Shahjalal to your destination.", href: "/airport-car-rental" },
      { label: "Corporate mobility", description: "Daily, monthly, and delegation transport for busy teams.", href: "/corporate-car-rental" },
      { label: "Self-drive rental", description: "Flexible vehicle rental when you want to take the wheel.", href: "/self-drive-car-rental" },
    ],
    Services: [
      { label: "For businesses", description: "Reliable transport programs for offices, events, and teams.", href: "/corporate-car-rental" },
      { label: "For travelers", description: "Airport pickups, city rides, and long-distance travel across Bangladesh.", href: "/car-rental-bangladesh" },
      { label: "For delegations", description: "Synchronized VIP convoys with one point of contact.", href: "/services" },
      { label: "For monthly needs", description: "A dedicated car and driver for the rhythm of your month.", href: "/monthly-car-rental" },
    ],
    Company: [
      { label: "How it works", description: "From first message to a car at your door.", href: "/faq" },
      { label: "Journal", description: "Guides to getting around Dhaka and Bangladesh.", href: "/blog" },
      { label: "About Jinia", description: "The people and standards behind the service.", href: "/about" },
      { label: "Contact concierge", description: "Ask a question or request a tailored quote.", href: "/contact" },
    ],
  } as const;

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 w-full pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.455,0.03,0.515,0.955)]", isHidden && "-translate-y-full")}>
      <nav
        className={cn(
          "jinia-nav pointer-events-auto mx-auto border-b px-4 py-3 sm:px-6 lg:px-10",
          isTransparent
            ? "border-white/15"
            : isAtTop
              ? "border-transparent bg-transparent"
              : "is-solid border-emerald-950/10 bg-white/95"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative p-1 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Jinia Enterprise"
                width={144}
                height={48}
                className={cn(
                  "h-8 sm:h-9 w-auto transition-transform duration-500",
                  isTransparent && "drop-shadow-[0_6px_18px_-14px_rgba(6,52,38,.30)] brightness-0 invert"
                )}
              />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-base sm:text-lg font-heading font-medium tracking-[0.05em] leading-none transition-colors duration-500",
                isTransparent ? "text-white" : "text-emerald-950"
              )}>
                JINIA
              </span>
              <span className={cn(
                "text-[9px] font-medium uppercase tracking-[0.08em] leading-none mt-0.5 transition-colors duration-500",
                isTransparent ? "text-emerald-300" : "text-emerald-700"
              )}>
                Enterprise
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7" onMouseLeave={() => setActiveMenu(null)}>
            {(Object.keys(menus) as Array<keyof typeof menus>).map((label) => (
              <div key={label} className="relative" onMouseEnter={() => setActiveMenu(label)}>
                <button
                  type="button"
                  onFocus={() => setActiveMenu(label)}
                  className={cn("group relative flex items-center gap-1.5 py-2 text-sm font-medium transition-colors", activeMenu === label ? "text-emerald-950" : "text-emerald-950/60 hover:text-emerald-950")}
                  aria-expanded={activeMenu === label}
                >
                  {label}<ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-500", activeMenu === label && "rotate-180")} />
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px origin-left bg-amber-400 transition-transform duration-300 ease-out",
                      activeMenu === label ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </button>
                <div className={cn("absolute left-1/2 top-full w-[min(760px,calc(100vw-48px))] -translate-x-1/2 pt-4 transition-all duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)]", activeMenu === label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none")}>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5 rounded-[4px] border border-emerald-950/10 bg-white p-7 shadow-[0_24px_80px_-24px_rgba(6,52,38,0.28)]">
                    <div className="col-span-2 border-b border-emerald-950/10 pb-4">
                      <p className="type-label text-emerald-700">Jinia Enterprise</p>
                      <p className="mt-1 text-sm text-emerald-950/55">A considered way to move through Dhaka.</p>
                    </div>
                    {menus[label].map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setActiveMenu(null)} className="group flex gap-3 rounded-sm p-2 -m-2 transition-colors hover:bg-emerald-50/70">
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span><span className="block text-sm font-medium text-emerald-950">{item.label}</span><span className="mt-1 block max-w-[250px] text-xs leading-relaxed text-emerald-950/55">{item.description}</span></span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <Link
              href="/booking"
              className="group relative flex items-center py-2 text-sm font-medium text-emerald-950 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-4"
            >
              Reserve
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-amber-400 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className={cn(
              "hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors",
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
                  "gap-2 rounded-full font-medium text-xs h-10 px-3.5 transition-all duration-300",
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
                  "gap-2 px-5 h-10 rounded-full shadow-[0_12px_30px_-24px_rgba(6,52,38,.35)] transition-all duration-300 hover:scale-105 font-medium uppercase text-[11px] tracking-wider",
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
            ref={mobileMenuTriggerRef}
            type="button"
            className={cn(
              "flex items-center lg:hidden w-11 h-11 rounded-xl justify-center transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
              isTransparent
                ? "bg-white/15 text-white hover:bg-white/25 border border-white/20"
                : "bg-emerald-50 text-emerald-950 hover:bg-emerald-100 border border-emerald-200/60"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          ref={mobileMenuRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-navigation-title"
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={cn(
            "fixed inset-0 w-full min-h-dvh overflow-y-auto bg-emerald-950/98 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-40 lg:hidden flex flex-col items-center justify-between px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none -translate-y-8"
          )}
        >
          <div className="flex w-full max-w-sm items-center justify-between border-b border-white/15 pb-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-emerald-400 opacity-80">
                Jinia Enterprise
              </p>
              <h2 id="mobile-navigation-title" className="mt-1 text-sm font-medium text-white">
                Menu navigation
              </h2>
            </div>
            <button
              ref={mobileMenuCloseRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile primary navigation" className="w-full max-w-sm py-10">
            <ul className="space-y-1">
              {navLinks.map((link, idx) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group flex min-h-12 items-center justify-between rounded-xl px-3 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-inset",
                      isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    )}
                    style={{ transitionDelay: `${100 + idx * 50}ms` }}
                  >
                    <span className="type-display text-3xl sm:text-4xl font-heading text-white transition-colors group-hover:text-emerald-400">
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className={cn(
            "flex flex-col gap-3 w-full max-w-sm pt-8 transition-all duration-700 delay-300",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              <Button
                variant="outline"
                className="w-full h-14 gap-3 rounded-2xl border-white/20 text-white bg-white/5 hover:bg-white/10 text-sm font-medium uppercase tracking-wider"
              >
                <Phone className="h-4 w-4 text-emerald-400" /> Direct Call: {siteConfig.phone}
              </Button>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full h-14 gap-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-sm font-medium uppercase tracking-wider shadow-[0_18px_44px_-32px_rgba(6,52,38,.40)] shadow-emerald-500/20">
                <MessageSquare className="h-4 w-4" /> WhatsApp Hotline
              </Button>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

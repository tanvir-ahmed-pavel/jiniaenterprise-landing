"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type Item = { label: string; description: string; href: string };
type Group = { label: string; href?: string; items?: Item[]; feature?: { title: string; body: string; image: string; tint: string; href: string } };

const NAV: Group[] = [
  {
    label: "Fleet",
    items: [
      { label: "All cars", description: "Sedans, SUVs, MPVs, microbuses and coaches, every one with a driver.", href: "/vehicles" },
      { label: "Pricing", description: "How day, monthly and outstation rates are worked out.", href: "/pricing" },
      { label: "Compare classes", description: "Sedan or SUV, MPV or microbus: which fits your group.", href: "/compare" },
    ],
    feature: { title: "Land Cruiser Prado", body: "The protocol favourite. See it in the fleet.", image: "/images/vehicles/photos/toyota-land-cruiser-prado-2016-20-side.webp", tint: "var(--color-tile-sage)", href: "/vehicles/toyota-prado" },
  },
  {
    label: "Services",
    items: [
      { label: "Airport transfers", description: "Flight-tracked pickups at Hazrat Shahjalal, name board at arrivals.", href: "/airport-car-rental" },
      { label: "Corporate & embassy", description: "Daily, monthly and delegation transport with one coordinator.", href: "/corporate-car-rental" },
      { label: "Monthly with driver", description: "A dedicated car and driver, billed monthly.", href: "/monthly-car-rental" },
      { label: "Car rental in Dhaka", description: "City hire by the day, with a driver who knows the roads.", href: "/car-rental-dhaka" },
    ],
    feature: { title: "Delegations", body: "Matched vehicles moving together on protocol time.", image: "/images/services/delegation.webp", tint: "var(--color-tile-stone)", href: "/services" },
  },
  {
    label: "Travel",
    items: [
      { label: "Outstation routes", description: "Chattogram, Sylhet, Cox’s Bazar, Sreemangal and more.", href: "/routes" },
      { label: "Areas we cover", description: "Gulshan, Banani, Baridhara, Uttara and every part of Dhaka.", href: "/locations" },
      { label: "Journal", description: "Guides to getting around Dhaka and Bangladesh.", href: "/blog" },
    ],
    feature: { title: "Out of town", body: "Driver rest, overnights and timings agreed before you leave.", image: "/images/vehicles/photos/toyota-x-noah-2015-18-side.webp", tint: "var(--color-tile-sand)", href: "/routes" },
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const openWizard = () => window.dispatchEvent(new Event("jinia:open-wizard"));

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="group flex shrink-0 items-center gap-2.5" aria-label="Jinia Enterprise, home">
      <Image src="/images/logo.png" alt="" width={300} height={242} priority className="h-10 w-auto transition-transform duration-500 group-hover:-rotate-3 sm:h-11" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.15rem] font-semibold tracking-[-0.03em] text-ink">Jinia</span>
        <span className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">Enterprise</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    // One read per frame, and a little hysteresis: the bar only hides after
    // a deliberate 24px downward scroll and only returns after 12px upward,
    // so small trackpad jitters don't make it bounce.
    let last = window.scrollY;
    let anchor = last;
    let dir = 0;
    let raf = 0;
    const read = () => {
      raf = 0;
      const y = window.scrollY;
      setAtTop(y < 24);
      const d = y > last ? 1 : y < last ? -1 : 0;
      if (d && d !== dir) { dir = d; anchor = last; }
      if (dir === 1 && y > 160 && y - anchor > 24) setHidden(true);
      if (dir === -1 && anchor - y > 12) setHidden(false);
      if (y < 160) setHidden(false);
      if (Math.abs(y - last) > 4) setMenu(null);
      last = y;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    raf = requestAnimationFrame(read);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    const id = requestAnimationFrame(() => { setOpen(false); setMenu(null); });
    return () => cancelAnimationFrame(id);
  }, [path]);

  useEffect(() => {
    if (!open) return;
    window.dispatchEvent(new CustomEvent("jinia:overlay", { detail: 1 }));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    requestAnimationFrame(() => closeBtn.current?.focus());
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", k); window.dispatchEvent(new CustomEvent("jinia:overlay", { detail: -1 })); };
  }, [open]);

  const enter = (label: string) => { window.clearTimeout(closeTimer.current); setMenu(label); };
  const leave = () => { closeTimer.current = window.setTimeout(() => setMenu(null), 140); };
  const active = NAV.find((g) => g.label === menu && g.items);
  const isOn = (g: Group) => (g.href ? path === g.href : g.items?.some((i) => path.startsWith(i.href)));

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform", hidden && !menu && "-translate-y-[120%]")}>
        <div className={cn("transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]", atTop ? "px-0 pt-0" : "px-3 pt-2 sm:px-4 sm:pt-3")}>
          <nav
            aria-label="Main"
            onMouseLeave={leave}
            className={cn(
              "mx-auto flex items-center justify-between gap-4 rounded-full transition-[max-width,padding,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              atTop
                ? "max-w-[100rem] bg-white/0 px-4 py-3 shadow-none ring-1 ring-transparent sm:px-6 lg:px-10"
                : "max-w-6xl bg-white/92 py-2 pl-3 pr-2 shadow-[0_14px_40px_-24px_rgba(8,30,20,.45)] ring-1 ring-ink/8 backdrop-blur-xl sm:pl-4",
            )}
          >
            <Logo />

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV.map((g) => (
                <li key={g.label} onMouseEnter={() => (g.items ? enter(g.label) : setMenu(null))}>
                  {g.items ? (
                    <button
                      type="button"
                      aria-expanded={menu === g.label}
                      onClick={() => setMenu(menu === g.label ? null : g.label)}
                      className={cn("flex h-10 items-center gap-1 rounded-full px-4 text-sm font-semibold transition-colors", menu === g.label || isOn(g) ? "bg-paper-deep text-ink" : "text-ink/65 hover:text-ink")}
                    >
                      {g.label}
                      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", menu === g.label && "rotate-180")} />
                    </button>
                  ) : (
                    <Link href={g.href!} className={cn("flex h-10 items-center rounded-full px-4 text-sm font-semibold transition-colors", isOn(g) ? "bg-paper-deep text-ink" : "text-ink/65 hover:text-ink")}>
                      {g.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`} className="group hidden h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-ink/75 transition-colors hover:text-ink xl:flex">
                <WhatsAppIcon className="h-[1.1rem] w-[1.1rem] text-[#128C4B]" /> <span className="tabular-nums">{whatsappDisplay}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-ink/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <button type="button" onClick={openWizard} className="group flex h-10 items-center gap-2 rounded-full bg-ink pl-4 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft sm:h-11">
                <span className="hidden sm:inline">Request a car</span>
                <span className="sm:hidden">Request</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-ink transition-transform group-hover:translate-x-0.5 sm:h-8 sm:w-8"><ArrowRight className="h-3.5 w-3.5" /></span>
              </button>
              <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="site-menu" className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-deep text-ink lg:hidden">
                <Menu className="h-[1.1rem] w-[1.1rem]" />
              </button>
            </div>
          </nav>

          {/* Desktop mega panel */}
          <div onMouseEnter={() => menu && enter(menu)} onMouseLeave={leave} className={cn("mx-auto hidden max-w-6xl px-0 pt-2 transition-[opacity,transform] duration-300 lg:block", active ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0")}>
            {active && (
              <div className="grid grid-cols-12 gap-2 rounded-[2rem] bg-white p-2 shadow-[0_30px_80px_-30px_rgba(8,30,20,.4)] ring-1 ring-ink/8">
                <ul className="col-span-7 grid content-start gap-1 p-2">
                  {active.items!.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} onClick={() => setMenu(null)} className="group flex items-start justify-between gap-4 rounded-2xl p-4 transition-colors hover:bg-paper-deep">
                        <span>
                          <span className="block font-semibold">{it.label}</span>
                          <span className="mt-0.5 block text-sm text-ink/55">{it.description}</span>
                        </span>
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ink/30 transition-colors group-hover:text-ink" />
                      </Link>
                    </li>
                  ))}
                </ul>
                {active.feature && (
                  <Link href={active.feature.href} onClick={() => setMenu(null)} className="group col-span-5 flex flex-col justify-between overflow-hidden rounded-[1.6rem] p-6" style={{ backgroundColor: active.feature.tint }}>
                    <span>
                      <span className="block font-heading text-2xl font-semibold tracking-[-0.03em]">{active.feature.title}</span>
                      <span className="mt-1 block text-sm text-ink/60">{active.feature.body}</span>
                    </span>
                    <span className="relative mt-4 block aspect-[16/8]">
                      <Image src={active.feature.image} alt="" fill sizes="420px" className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2 group-hover:scale-105" />
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Phone menu sheet */}
      <div aria-hidden onClick={() => setOpen(false)} className={cn("fixed inset-0 z-[58] bg-ink/40 transition-opacity duration-300 lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")} />
      <div
        ref={sheet}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={cn("fixed inset-y-0 right-0 z-[59] flex w-full max-w-md flex-col bg-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden", open ? "translate-x-0" : "translate-x-full")}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Logo onClick={() => setOpen(false)} />
          <button ref={closeBtn} type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-deep"><X className="h-[1.1rem] w-[1.1rem]" /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
          {NAV.map((g, n) => (
            <div key={g.label} className="border-b border-ink/10 py-4">
              {g.items ? (
                <details className="group" open={n === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between">
                    <span className="font-heading text-[2rem] font-semibold tracking-[-0.04em]"><span className="mr-3 align-top text-xs tabular-nums text-gold-deep">0{n + 1}</span>{g.label}</span>
                    <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-3 grid gap-1 pl-7">
                    {g.items.map((it) => (
                      <li key={it.href}><Link href={it.href} onClick={() => setOpen(false)} className="block rounded-xl py-2 text-base text-ink/70 hover:text-ink">{it.label}</Link></li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link href={g.href!} onClick={() => setOpen(false)} className="flex items-center justify-between font-heading text-[2rem] font-semibold tracking-[-0.04em]">
                  <span><span className="mr-3 align-top text-xs tabular-nums text-gold-deep">0{n + 1}</span>{g.label}</span>
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="grid gap-2 border-t border-ink/10 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
          <button type="button" onClick={() => { setOpen(false); openWizard(); }} className="flex h-14 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-paper">Request a car <ArrowRight className="h-4 w-4" /></button>
          <div className="grid grid-cols-2 gap-2">
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-ink"><WhatsAppIcon className="h-4 w-4" /> {whatsappDisplay}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold ring-1 ring-ink/15"><Phone className="h-4 w-4" /> Call</a>
          </div>
        </div>
      </div>
    </>
  );
}

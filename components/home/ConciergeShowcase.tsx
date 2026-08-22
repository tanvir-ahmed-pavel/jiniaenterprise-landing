"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plane,
  Briefcase,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  Car,
  CheckCircle2,
  ArrowLeft,
  CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConciergePackage {
  id: string;
  number: string;
  title: string;
  badge: string;
  icon: React.ElementType;
  image: string;
  tagline: string;
  quickSummary: string;
  steps: string[];
  metrics: { label: string; value: string }[];
  fleet: string;
  pricingHint: string;
  statusBadge: string;
}

const conciergePackages: ConciergePackage[] = [
  {
    id: "airport",
    number: "01",
    title: "Airport VIP Transfer",
    badge: "Hazrat Shahjalal (DAC)",
    icon: Plane,
    image: "/images/concierge/airport-vip.jpg",
    tagline: "Flight lands. Chauffeur is already waiting at arrival gate.",
    quickSummary: "Automated flight tracking, arrival meet & greet with custom nameboard, and pre-cooled luxury vehicle with pre-paid expressway tolls.",
    steps: [
      "1. Automated Inbound Flight Tracking",
      "2. Gate Meet & Greet with Nameboard",
      "3. Expressway Fast-Track to Hotel/Home",
    ],
    metrics: [
      { label: "Punctuality", value: "100% On-Time" },
      { label: "Signboard", value: "Included" },
      { label: "Expressway", value: "Pre-Paid Tolls" },
      { label: "Delays", value: "Auto-Tracked" },
    ],
    fleet: "Prado TX · Alphard Lounge · Premio · Hiace GL",
    pricingHint: "Fixed All-Inclusive Rate",
    statusBadge: "Live Radar Tracking",
  },
  {
    id: "monthly",
    number: "02",
    title: "Monthly & Expat Retainer",
    badge: "30-Day+ Dedicated Contract",
    icon: CalendarClock,
    image: "/images/concierge/monthly-contract.jpg",
    tagline: "Dedicated vehicle and full-time chauffeur without fleet ownership hassles.",
    quickSummary: "Assigned vetted chauffeur, complete vehicle maintenance & fitness handled, instant replacement vehicle backup, and consolidated monthly VAT invoicing.",
    steps: [
      "1. Assigned Dedicated Vetted Driver",
      "2. Instant SLA Replacement Backup Car",
      "3. Consolidated Monthly VAT Invoice",
    ],
    metrics: [
      { label: "Contract", value: "Monthly / Yearly" },
      { label: "Backup SLA", value: "Guaranteed Car" },
      { label: "Maintenance", value: "100% Covered" },
      { label: "Billing", value: "Monthly VAT Bill" },
    ],
    fleet: "Premio · Allion · Corolla Cross · Harrier · Alphard",
    pricingHint: "Custom Monthly Package",
    statusBadge: "Dedicated Driver & Car",
  },
  {
    id: "corporate",
    number: "03",
    title: "Executive Daily Chauffeur",
    badge: "10–12 Hr Dedicated Daily",
    icon: Briefcase,
    image: "/images/concierge/corporate-chauffeur.jpg",
    tagline: "One dedicated driver. One luxury car. Your whole workday.",
    quickSummary: "Retain the same vetted chauffeur and premium sedan or SUV for seamless multi-stop city meetings, factory EPZ visits, and commutes.",
    steps: [
      "1. Morning Chauffeur Standby at Residence",
      "2. Unlimited Multi-Stop City & EPZ Routing",
      "3. Evening Return with Hassle-Free Bill",
    ],
    metrics: [
      { label: "Availability", value: "10–12 Hr Standby" },
      { label: "Routing", value: "Dhaka & Factory EPZ" },
      { label: "Chauffeur", value: "BRTA Licensed" },
      { label: "Billing", value: "Daily / Weekly" },
    ],
    fleet: "Premio Executive · Corolla Cross · Harrier · Hiace",
    pricingHint: "Daily & Outstation Rates",
    statusBadge: "100% Dedicated Standby",
  },
  {
    id: "delegation",
    number: "04",
    title: "Embassy & Delegation Convoys",
    badge: "Multi-Vehicle Protocol",
    icon: ShieldAlert,
    image: "/images/concierge/delegation-convoy.jpg",
    tagline: "Synchronized tactical mobility for VIP delegations.",
    quickSummary: "High-protocol synchronized motorcades overseen by a senior coordinator for summits, diplomatic missions, and state VIPs.",
    steps: [
      "1. Advance Route Recon & Convoy Planning",
      "2. Pilot Escort + VIP Cabin + Support Sync",
      "3. Live GPS Grid Lock & Desk Telemetry",
    ],
    metrics: [
      { label: "Fleet Sync", value: "Multi-Car Protocol" },
      { label: "Coordination", value: "Senior Desk Lead" },
      { label: "Drivers", value: "Police Vetted" },
      { label: "Telemetry", value: "Live GPS Fleet Grid" },
    ],
    fleet: "Prado TXL Escort · Alphard Cabin · Coaster Bus",
    pricingHint: "Custom Itinerary Quote",
    statusBadge: "Synchronized Convoy",
  },
];

export function ConciergeShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to center a specific card
  const scrollToCard = useCallback((index: number) => {
    setActiveIndex(index);
    const card = cardRefs.current[index];
    const track = trackRef.current;
    if (card && track) {
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const scrollOffset = card.offsetLeft - (trackRect.width / 2) + (cardRect.width / 2);
      track.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  }, []);

  const handleNext = () => {
    const next = (activeIndex + 1) % conciergePackages.length;
    scrollToCard(next);
  };

  const handlePrev = () => {
    const prev = (activeIndex - 1 + conciergePackages.length) % conciergePackages.length;
    scrollToCard(prev);
  };

  // Auto-scroll loop
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % conciergePackages.length;
        scrollToCard(next);
        return next;
      });
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, scrollToCard]);

  // Sync activeIndex on manual user swipe/scroll
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(trackCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (closestIdx !== activeIndex) {
      setActiveIndex(closestIdx);
    }
  };

  return (
    <section 
      className="py-16 sm:py-24 relative overflow-hidden w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="space-y-8">
        
        {/* Section Header (Contained in Max-Width Container) */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-2 border-b border-emerald-900/10">
            <div className="max-w-2xl space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-emerald-800 bg-emerald-100/80 border border-emerald-200/80 shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>Flagship Solutions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-emerald-950 tracking-tight leading-tight">
                How We <span className="text-gradient-emerald">Move Dhaka.</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                Curated chauffeur protocols for airport VIPs, monthly expat contracts, corporate workdays, and diplomatic delegations.
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-xs font-black text-emerald-900/60 tracking-widest tabular-nums px-2">
                0{activeIndex + 1} / 0{conciergePackages.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous solution"
                  className="w-10 h-10 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-950 flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next solution"
                  className="w-10 h-10 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-950 flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Edge-to-Edge Center-Snapping Horizontal Track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="w-full flex gap-6 sm:gap-8 overflow-x-auto py-6 px-4 sm:px-8 lg:px-[max(2rem,calc((100vw-1160px)/2))] snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {conciergePackages.map((pkg, idx) => {
            const PkgIcon = pkg.icon;
            const isActive = idx === activeIndex;

            return (
              <div
                key={pkg.id}
                ref={(el) => { cardRefs.current[idx] = el; }}
                onClick={() => scrollToCard(idx)}
                style={{ scrollSnapAlign: "center" }}
                className={cn(
                  "w-[90vw] sm:w-[580px] md:w-[720px] lg:w-[860px] xl:w-[940px] shrink-0 rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer snap-center relative shadow-xl grid md:grid-cols-12",
                  isActive
                    ? "border-emerald-500/60 bg-emerald-950 text-white shadow-[0_24px_60px_-15px_rgba(2,24,16,0.65)] scale-[1.0] opacity-100 ring-2 ring-emerald-400/25"
                    : "border-emerald-900/40 bg-emerald-950/85 text-white/80 scale-[0.98] opacity-75 hover:opacity-95"
                )}
              >
                {/* Left (60%): Clean Specs & Guided Timeline */}
                <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 relative z-10">
                  <div className="space-y-4">
                    {/* Badge Strip */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-300 flex items-center gap-1.5">
                        <PkgIcon className="h-3.5 w-3.5" />
                        {pkg.badge}
                      </span>
                      <span className="text-xs font-semibold text-emerald-200/60">•</span>
                      <span className="text-xs font-bold text-amber-300">{pkg.pricingHint}</span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight">
                        {pkg.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm font-semibold text-emerald-100/90 leading-relaxed">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Step-by-Step Flow (Clear Guidance) */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/8 space-y-1.5">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1">
                        How It Works
                      </p>
                      {pkg.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-emerald-100/85 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* 4 Clean Specs Chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-white/10">
                      {pkg.metrics.map((m) => (
                        <div key={m.label} className="p-2 rounded-xl bg-white/5 border border-white/6 text-center">
                          <span className="text-[8px] uppercase tracking-widest text-emerald-300/80 font-bold block">
                            {m.label}
                          </span>
                          <span className="text-xs font-bold text-white block mt-0.5 truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Dedicated Fleet Line */}
                    <div className="text-xs text-emerald-200/75 flex items-center gap-1.5">
                      <Car className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-white/90">Dedicated Fleet:</span>
                      <span className="truncate">{pkg.fleet}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-3">
                    <Link href={`/booking?type=${pkg.id}`} className="flex-1">
                      <Button className="w-full h-11 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-black uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer">
                        Reserve Solution
                        <ChevronRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </Link>

                    <a
                      href={`https://wa.me/8801716633445?text=${encodeURIComponent(
                        `Hi Jinia — Quote for ${pkg.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      <MessageSquare className="h-4 w-4 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Right (40%): Cinematic Image Showcase */}
                <div className="md:col-span-5 relative min-h-[260px] md:min-h-[440px] bg-emerald-900/40 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-950/20 to-transparent md:bg-linear-to-l md:from-transparent md:to-emerald-950/90" />
                  
                  {/* Floating Status Badge */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-400/30 text-[10px] font-bold text-emerald-300 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{pkg.statusBadge}</span>
                  </div>

                  {/* Bottom Assurance */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white/90">
                    <span className="flex items-center gap-1.5 font-bold text-emerald-300">
                      <ShieldCheck className="h-4 w-4" />
                      BRTA Licensed Driver
                    </span>
                    <span className="text-[10px] font-semibold text-white/60">Fixed Rate</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination Selector Pills */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 pt-2">
            {conciergePackages.map((pkg, i) => (
              <button
                key={pkg.id}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to ${pkg.title}`}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-2",
                  i === activeIndex
                    ? "bg-emerald-900 text-white shadow-md shadow-emerald-900/20 ring-1 ring-emerald-500"
                    : "bg-emerald-900/10 text-emerald-950/60 hover:bg-emerald-900/20"
                )}
              >
                <span className="text-[10px] font-black text-emerald-500">{pkg.number}</span>
                <span>{pkg.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

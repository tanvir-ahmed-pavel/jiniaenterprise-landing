"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Plane, 
  Briefcase, 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Sparkles, 
  ShieldCheck, 
  Pause,
  Play,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConciergePackage {
  id: string;
  title: string;
  badge: string;
  icon: React.ElementType;
  image: string;
  tagline: string;
  description: string;
  idealFor: string;
  fleetOptions: string[];
  features: string[];
  pricingHint: string;
}

const conciergePackages: ConciergePackage[] = [
  {
    id: "airport",
    title: "Airport VIP Transfer",
    badge: "Hazrat Shahjalal (DAC)",
    icon: Plane,
    image: "/images/concierge/airport-vip.jpg",
    tagline: "Runway-to-Hotel Seamless Transit",
    description: "Zero waiting. Inbound flight tracking, signboard terminal greeting, and luxury luggage escort straight to your pre-cooled vehicle.",
    idealFor: "International Executives, Dignitaries & Expats",
    fleetOptions: ["Prado TX", "Alphard Royal", "Premio / Allion", "Hiace VIP"],
    features: [
      "Live flight delay tracking",
      "Signboard gate greeting & luggage escort",
      "60 mins complimentary waiting",
      "Chilled water & onboard WiFi",
    ],
    pricingHint: "Fixed transparent rates",
  },
  {
    id: "corporate",
    title: "Executive Daily Chauffeur",
    badge: "10-12 Hour Dedicated",
    icon: Briefcase,
    image: "/images/concierge/corporate-chauffeur.jpg",
    tagline: "Dedicated Mobility for Leadership",
    description: "Seamless all-day transit across Gulshan, Banani, Motijheel, and industrial corridors with an English-fluent, discreet chauffeur.",
    idealFor: "CEOs, Directors & Delegation Teams",
    fleetOptions: ["Toyota Premio", "Corolla Cross", "Hiace Super GL"],
    features: [
      "10-12 hour dedicated driver & vehicle",
      "English-proficient, suited chauffeurs",
      "Dhaka peak congestion bypass routes",
      "Monthly corporate billing & VAT receipts",
    ],
    pricingHint: "Flexible daily & monthly terms",
  },
  {
    id: "delegation",
    title: "Embassy & Motorcade Convoys",
    badge: "Diplomatic Protocol",
    icon: ShieldAlert,
    image: "/images/concierge/delegation-convoy.jpg",
    tagline: "Multi-Vehicle Escort & High Security",
    description: "Complete transport logistics for international trade delegations, VIP summits, and diplomatic convoys with dedicated coordinators.",
    idealFor: "Embassies, Global NGOs & VIP Summits",
    fleetOptions: ["Land Cruiser Prado", "Toyota Coaster (29 Seat)", "Multi-Car Convoy"],
    features: [
      "Dedicated senior coordinator on-site",
      "Synchronized convoy radio dispatch",
      "NDA guaranteed professional drivers",
      "Custom security protocol integration",
    ],
    pricingHint: "Bespoke quotations on request",
  },
];

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per slide

export function ConciergeShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activePackage = conciergePackages[activeIndex];
  const Icon = activePackage.icon;

  // Auto-advance carousel timer with smooth progress bar
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / AUTOPLAY_INTERVAL) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % conciergePackages.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [activeIndex, isPaused]);

  const selectSlide = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % conciergePackages.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + conciergePackages.length) % conciergePackages.length);
    setProgress(0);
  };

  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-emerald-950/5 via-emerald-950/2 to-transparent relative overflow-hidden">
      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-dot-subtle pointer-events-none opacity-30" />

      <div className="container relative z-10 space-y-8 sm:space-y-12">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-emerald-800 bg-emerald-100/90 border border-emerald-300/80 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Flagship Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-emerald-950 tracking-tight leading-[1.1]">
              Concierge Services. <span className="text-gradient-emerald">Flawlessly Executed.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium max-w-xl">
              Engineered for embassies, international organizations, and corporate leadership who require zero margin for error.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Auto-carousel Controls */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-gray-200 shadow-xs">
              <button
                onClick={prevSlide}
                aria-label="Previous Service"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-emerald-950 transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Resume auto play" : "Pause auto play"}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-emerald-950 transition-colors cursor-pointer"
                title={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play className="h-3.5 w-3.5 fill-current" /> : <Pause className="h-3.5 w-3.5 fill-current" />}
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Service"
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-emerald-950 transition-colors cursor-pointer"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <Link href="/services" className="shrink-0">
              <Button variant="outline" className="h-11 px-5 rounded-xl border-emerald-200 text-emerald-950 hover:bg-emerald-50 gap-2 font-bold text-xs uppercase tracking-wider group shadow-xs">
                <span>View All Services</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Responsive & Easy-to-Trace Carousel Tabs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {conciergePackages.map((item, index) => {
            const isSelected = activeIndex === index;
            const ItemIcon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectSlide(index)}
                className={cn(
                  "relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group",
                  isSelected
                    ? "bg-white border-emerald-600 shadow-xl shadow-emerald-950/10 ring-2 ring-emerald-500/20"
                    : "bg-white/70 hover:bg-white border-gray-200 hover:border-emerald-300 shadow-xs"
                )}
              >
                {/* Active Progress Bar Underlay */}
                {isSelected && !isPaused && (
                  <div 
                    className="absolute top-0 left-0 bottom-0 bg-emerald-50/70 -z-1 transition-all duration-75 ease-linear pointer-events-none"
                    style={{ width: `${progress}%` }}
                  />
                )}

                {/* Top Accent Line on Active */}
                <div 
                  className={cn(
                    "absolute top-0 left-0 right-0 h-1 transition-all duration-300",
                    isSelected ? "bg-emerald-600" : "bg-transparent group-hover:bg-emerald-200"
                  )}
                />

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md transition-colors",
                    isSelected 
                      ? "bg-emerald-900 text-white" 
                      : "bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-800"
                  )}>
                    0{index + 1}
                  </span>
                  <span className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    isSelected ? "bg-emerald-100 text-emerald-900" : "bg-gray-50 text-gray-400 group-hover:text-emerald-700"
                  )}>
                    <ItemIcon className="h-4 w-4" />
                  </span>
                </div>

                <h3 className={cn(
                  "font-heading font-black text-sm sm:text-base transition-colors line-clamp-1",
                  isSelected ? "text-emerald-950" : "text-gray-700 group-hover:text-emerald-950"
                )}>
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5 line-clamp-1">
                  {item.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* ── Main Showcase Stage Card ── */}
        <div 
          className="rounded-3xl overflow-hidden bg-white border border-gray-200/90 shadow-2xl shadow-emerald-950/8 transition-all duration-300"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid lg:grid-cols-12 items-stretch min-h-[520px]">
            {/* Left Content Side */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-5 animate-fade-in" key={`content-${activePackage.id}`}>
                {/* Header Meta */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-900 flex items-center justify-center border border-emerald-300/60 shadow-xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 inline-block">
                      {activePackage.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-black text-emerald-950 tracking-tight mt-0.5">
                      {activePackage.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
                  {activePackage.description}
                </p>

                {/* 4 Feature Checklist Capsules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {activePackage.features.map((feat, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/2 hover:bg-emerald-950/4 border border-gray-100 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-xs font-bold text-gray-800 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended Fleet Tags */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                    Available Fleet:
                  </span>
                  {activePackage.fleetOptions.map((fleet, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 rounded-lg bg-emerald-50 text-[11px] font-bold text-emerald-900 border border-emerald-200/80 shadow-2xs"
                    >
                      {fleet}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Trace Indicators */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={`/booking?type=${activePackage.id}`} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto h-12 px-7 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-wider gap-2 shadow-lg shadow-emerald-950/15 cursor-pointer">
                      <span>Reserve Package</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <a 
                    href={`https://wa.me/8801716633445?text=Hello%20Jinia%20Enterprise,%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(activePackage.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-5 rounded-xl border-emerald-200 text-emerald-950 hover:bg-emerald-50 gap-2 font-bold text-xs uppercase tracking-wider cursor-pointer">
                      <span>WhatsApp Quote</span>
                    </Button>
                  </a>
                </div>

                {/* Slide index & auto status */}
                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-gray-400 font-bold">
                  <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                    <Clock className="h-3.5 w-3.5" />
                    <span>0{activeIndex + 1} / 0{conciergePackages.length}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Photography Art Frame */}
            <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[380px] lg:min-h-full overflow-hidden bg-emerald-950">
              <img
                key={`img-${activePackage.id}`}
                src={activePackage.image}
                alt={activePackage.title}
                className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 hover:scale-105 animate-fade-in"
              />
              <div className="absolute inset-0 bg-linear-to-t from-emerald-950/90 via-emerald-950/20 to-transparent pointer-events-none" />
              
              {/* Floating Protocol Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-between shadow-xl">
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-emerald-400">Jinia Protocol Verified</p>
                  <p className="text-xs sm:text-sm font-bold text-white/95 mt-0.5">{activePackage.tagline}</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 border border-emerald-400/30 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";
import { Users, Fuel, Star, Calendar, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Zap, Eye, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageCarousel } from "./ImageCarousel";

const formatPrice = (price: number) => "৳" + price.toLocaleString("en-BD");

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
  seats: number;
  engine_cc?: number | null;
  features?: string[];
  rental_types?: string[];
  description?: string;
  images?: string[];
  image_url?: string | null;
  starting_price?: number | null;
  price_label?: string;
  is_active: boolean;
  sort_order: number;
  is_featured?: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
  isWide?: boolean;
  onQuickInspect?: () => void;
}

const CATEGORY_CONFIG: Record<string, { badge: string; dot: string; glow: string; accent: string }> = {
  Economy:  { badge: "text-emerald-800 bg-white/95 border-emerald-200/80",   dot: "bg-emerald-500",  glow: "rgba(16,185,129,0.12)",  accent: "from-emerald-500/20 to-transparent" },
  Standard: { badge: "text-blue-800 bg-white/95 border-blue-200/80",         dot: "bg-blue-500",     glow: "rgba(59,130,246,0.12)",  accent: "from-blue-500/20 to-transparent" },
  Premium:  { badge: "text-amber-900 bg-white/95 border-amber-300/80",       dot: "bg-amber-500",   glow: "rgba(245,158,11,0.14)",  accent: "from-amber-500/20 to-transparent" },
  SUV:      { badge: "text-emerald-950 bg-emerald-100/95 border-emerald-300", dot: "bg-emerald-600", glow: "rgba(5,150,105,0.14)",   accent: "from-emerald-600/20 to-transparent" },
  Microbus: { badge: "text-teal-900 bg-white/95 border-teal-200/80",         dot: "bg-teal-500",    glow: "rgba(20,184,166,0.12)",  accent: "from-teal-500/20 to-transparent" },
  Bus:      { badge: "text-indigo-900 bg-white/95 border-indigo-200/80",     dot: "bg-indigo-500",  glow: "rgba(99,102,241,0.12)",  accent: "from-indigo-500/20 to-transparent" },
};

export const VehicleCard = memo(function VehicleCard({
  vehicle,
  priority = false,
  isWide = false,
  onQuickInspect,
}: VehicleCardProps) {
  const displayImages = useMemo(() => {
    return vehicle.images && vehicle.images.length > 0
      ? vehicle.images
      : vehicle.image_url
      ? [vehicle.image_url]
      : [];
  }, [vehicle.images, vehicle.image_url]);

  const cat = CATEGORY_CONFIG[vehicle.category] ?? {
    badge: "text-gray-800 bg-white/95 border-gray-200",
    dot: "bg-emerald-500",
    glow: "rgba(16,185,129,0.12)",
    accent: "from-emerald-500/20 to-transparent",
  };

  const isPremium = vehicle.category === "Premium" || vehicle.is_featured;

  // ════════════════ WIDE 2-COLUMN BENTO CARD LAYOUT ════════════════
  if (isWide) {
    return (
      <div className="group/card block h-full relative">
        <div
          className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
          style={{ background: `radial-gradient(ellipse at 50% 80%, ${cat.glow} 0%, transparent 70%)` }}
        />

        <div
          className={cn(
            "relative z-10 grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden rounded-3xl transition-all duration-400 ease-out",
            "bg-white/90 border border-amber-300/80 shadow-[0_8px_30px_-6px_rgba(10,25,18,0.08),0_0_0_1px_rgba(251,191,36,0.15)]",
            "hover:bg-white hover:border-amber-400 hover:shadow-[0_24px_50px_-10px_rgba(10,25,18,0.12)]"
          )}
        >
          {/* Left: Wide Image Container (6 cols) */}
          <div className="md:col-span-6 relative min-h-[240px] md:min-h-[320px] overflow-hidden bg-emerald-950/5">
            <ImageCarousel
              images={displayImages}
              vehicleName={vehicle.name}
              priority={priority}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/20 pointer-events-none z-10" />

            {/* Badges */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-start z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-amber-950 shadow-md">
                <Star className="h-3 w-3 fill-amber-950" />
                Featured Flagship
              </span>

              {onQuickInspect && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onQuickInspect();
                  }}
                  aria-label="Quick specs preview"
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-emerald-900 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer shadow-md"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Price Badge */}
            {vehicle.starting_price && (
              <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 shadow-lg text-right">
                  <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-bold block leading-none">
                    {vehicle.price_label || "From"}
                  </span>
                  <span className="text-base font-black text-white leading-none mt-0.5 block">
                    {formatPrice(vehicle.starting_price)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Content & Specs (6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 uppercase tracking-wider">
                  {vehicle.category}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-semibold text-emerald-700">Chauffeur Included</span>
              </div>

              <div>
                <h3 className="text-2xl font-heading font-black text-emerald-950 leading-tight">
                  {vehicle.name}
                </h3>
                {vehicle.description && (
                  <p className="mt-1.5 text-xs text-gray-600 line-clamp-2 leading-relaxed font-medium">
                    {vehicle.description}
                  </p>
                )}
              </div>

              {/* 3 Specs chips */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-emerald-950/[0.03] border border-emerald-950/6 text-center">
                <div>
                  <Users className="h-3.5 w-3.5 text-emerald-700 mx-auto mb-0.5" />
                  <span className="font-black text-emerald-950 text-xs block">{vehicle.seats} Seats</span>
                  <span className="text-[9px] text-gray-400 uppercase font-medium">Capacity</span>
                </div>
                <div className="border-x border-emerald-900/10">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-700 mx-auto mb-0.5" />
                  <span className="font-black text-emerald-950 text-xs block">20°C AC</span>
                  <span className="text-[9px] text-gray-400 uppercase font-medium">Climate</span>
                </div>
                <div>
                  <Fuel className="h-3.5 w-3.5 text-emerald-700 mx-auto mb-0.5" />
                  <span className="font-black text-emerald-950 text-xs block">{vehicle.engine_cc ? `${vehicle.engine_cc}cc` : "VIP"}</span>
                  <span className="text-[9px] text-gray-400 uppercase font-medium">Engine</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-emerald-900/8">
              <Link
                href={`/booking?vehicle=${vehicle.slug || vehicle.id}`}
                className="flex-1 h-11 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-900 hover:bg-emerald-800 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                Reserve Solution
              </Link>

              {onQuickInspect && (
                <button
                  type="button"
                  onClick={onQuickInspect}
                  className="h-11 px-4 rounded-xl border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5 text-emerald-700" />
                  <span>Specs</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════ STANDARD 1-COLUMN CARD LAYOUT ════════════════
  return (
    <div className="group/card block h-full relative">
      <div
        className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
        style={{ background: `radial-gradient(ellipse at 50% 80%, ${cat.glow} 0%, transparent 70%)` }}
      />

      <div
        className={cn(
          "relative z-10 flex flex-col h-full overflow-hidden rounded-3xl transition-all duration-400 ease-out",
          "bg-white/85 border border-white/90 shadow-[0_4px_24px_-4px_rgba(10,25,18,0.06),inset_0_1px_0_rgba(255,255,255,0.95)]",
          "hover:bg-white hover:-translate-y-1 hover:border-emerald-300/80 hover:shadow-[0_20px_40px_-10px_rgba(10,25,18,0.1)]"
        )}
      >
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-emerald-950/5 shrink-0">
          <ImageCarousel
            images={displayImages}
            vehicleName={vehicle.name}
            priority={priority}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/18 via-transparent to-black/30 pointer-events-none z-10" />

          {/* Top badges row */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20 pointer-events-none">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md border",
                cat.badge
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", cat.dot)} />
              {vehicle.category}
            </span>

            <div className="flex items-center gap-1.5 pointer-events-auto">
              {onQuickInspect && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onQuickInspect();
                  }}
                  aria-label="Quick specs preview"
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-emerald-900 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer shadow-md"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Price badge */}
          {vehicle.starting_price && (
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
              <div className="px-3 py-1.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 shadow-lg text-right">
                <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-bold block leading-none">
                  {vehicle.price_label || "From"}
                </span>
                <span className="text-sm font-black text-white leading-none mt-0.5 block">
                  {formatPrice(vehicle.starting_price)}
                </span>
              </div>
            </div>
          )}

          {/* Driver Included Badge */}
          <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-950/80 backdrop-blur-md border border-emerald-400/20 text-[10px] font-bold text-emerald-300">
              <ShieldCheck className="h-3 w-3" />
              Chauffeur Included
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-black text-emerald-950 leading-tight group-hover/card:text-emerald-800 transition-colors">
              {vehicle.name}
            </h3>
            {vehicle.description && (
              <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium">
                {vehicle.description}
              </p>
            )}
          </div>

          {/* 3 Specs chips bar */}
          <div className="grid grid-cols-3 gap-1.5 p-2 rounded-2xl bg-emerald-950/[0.03] border border-emerald-950/6">
            <div className="flex flex-col items-center gap-0.5 py-1.5 px-2">
              <Users className="h-3.5 w-3.5 text-emerald-700 mb-0.5" />
              <span className="font-black text-emerald-950 leading-none text-xs">{vehicle.seats} Seats</span>
              <span className="text-gray-400 font-medium leading-none text-[9px] uppercase tracking-wider">Capacity</span>
            </div>

            <div className="flex flex-col items-center gap-0.5 py-1.5 px-2 border-x border-emerald-900/8">
              {vehicle.engine_cc ? (
                <>
                  <Fuel className="h-3.5 w-3.5 text-emerald-700 mb-0.5" />
                  <span className="font-black text-emerald-950 leading-none text-xs">{vehicle.engine_cc}cc</span>
                  <span className="text-gray-400 font-medium leading-none text-[9px] uppercase tracking-wider">Engine</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-700 mb-0.5" />
                  <span className="font-black text-emerald-950 leading-none text-xs">AC</span>
                  <span className="text-gray-400 font-medium leading-none text-[9px] uppercase tracking-wider">Chauffeur</span>
                </>
              )}
            </div>

            <div className="flex flex-col items-center gap-0.5 py-1.5 px-2">
              <Calendar className="h-3.5 w-3.5 text-emerald-700 mb-0.5" />
              <span className="font-black text-emerald-950 leading-none text-xs text-center truncate w-full">
                {vehicle.rental_types?.[0] || "Daily"}
              </span>
              <span className="text-gray-400 font-medium leading-none text-[9px] uppercase tracking-wider">Retainer</span>
            </div>
          </div>

          <div className="flex-1" />

          {/* CTA row */}
          <div className="flex items-center gap-2 pt-2 border-t border-emerald-900/8">
            <Link
              href={`/booking?vehicle=${vehicle.slug || vehicle.id}`}
              className="flex-1 h-11 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 bg-emerald-900 hover:bg-emerald-800 text-white shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              Reserve
            </Link>

            {onQuickInspect && (
              <button
                type="button"
                onClick={onQuickInspect}
                className="h-11 px-3.5 rounded-xl border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-950 text-xs font-bold flex items-center gap-1 transition-all duration-200 cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5 text-emerald-700" />
                <span>Specs</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

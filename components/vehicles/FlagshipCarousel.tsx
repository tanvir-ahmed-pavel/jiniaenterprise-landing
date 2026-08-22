"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles, Users, Fuel, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: string;
  seats: number;
  engine_cc?: number | null;
  description?: string;
  images?: string[];
  image_url?: string | null;
  starting_price?: number | null;
  price_label?: string;
  is_featured?: boolean;
}

interface FlagshipCarouselProps {
  vehicles: Vehicle[];
}

const formatPrice = (p: number) => "৳" + p.toLocaleString("en-BD");

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export function FlagshipCarousel({ vehicles }: FlagshipCarouselProps) {
  const featured = vehicles.filter((v) => v.is_featured);

  const [[index, dir], setPage] = useState([0, 0]);

  const go = useCallback(
    (next: number) => {
      const clamped = (next + featured.length) % featured.length;
      setPage([clamped, next > index ? 1 : -1]);
    },
    [index, featured.length]
  );

  useEffect(() => {
    const t = setTimeout(() => go(index + 1), 6000);
    return () => clearTimeout(t);
  }, [index, go]);

  if (featured.length < 2) return null;

  const vehicle = featured[index];
  const image = vehicle.images?.[0] || vehicle.image_url || "";

  return (
    <section className="w-full bg-[#0a0f0c] overflow-hidden mb-20">
      {/* Top label row */}
      <div className="flex items-center justify-between px-8 md:px-20 py-6 border-b border-white/8">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">
          Flagship Collection
        </span>
        <span className="text-[10px] font-semibold text-white/25 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
        </span>
      </div>

      {/* Card area */}
      <div className="relative grid md:grid-cols-2 items-center gap-0 min-h-[560px] md:min-h-[600px]">

        {/* Left — text */}
        <div className="px-8 md:px-20 py-14 md:py-20 relative z-10">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={vehicle.id + "-text"}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 0] }}
              className="space-y-7"
            >
              {/* Category */}
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-400 flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                {vehicle.category}
              </span>

              {/* Name */}
              <div>
                <h2 className="text-4xl md:text-5xl xl:text-6xl font-heading font-black text-white leading-[1.05] tracking-tight">
                  {vehicle.name}
                </h2>
                <p className="mt-3 text-sm text-white/45 leading-relaxed max-w-sm">
                  {vehicle.description || "Premium chauffeur-driven comfort for every journey."}
                </p>
              </div>

              {/* Specs */}
              <div className="flex items-center gap-8 py-5 border-y border-white/8">
                <div>
                  <span className="text-2xl font-heading font-black text-white">{vehicle.seats}</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/30 font-medium block mt-0.5">Seats</span>
                </div>
                {vehicle.engine_cc && (
                  <div>
                    <span className="text-2xl font-heading font-black text-white">{vehicle.engine_cc}</span>
                    <span className="text-[9px] uppercase tracking-widest text-white/30 font-medium block mt-0.5">CC</span>
                  </div>
                )}
                {vehicle.starting_price && (
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-amber-400/60 font-medium block mb-0.5">From</span>
                    <span className="text-2xl font-heading font-black text-white">
                      {formatPrice(vehicle.starting_price)}
                      <span className="text-xs text-white/30 font-medium ml-1">/{vehicle.price_label || "day"}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3">
                <Link
                  href={`/booking?vehicle=${vehicle.slug}`}
                  className="h-11 px-6 rounded-xl bg-white text-emerald-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  Reserve
                </Link>
                <Link
                  href={`/vehicles/${vehicle.slug}`}
                  className="h-11 px-4 rounded-xl border border-white/12 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-white/6 transition-colors group/btn"
                >
                  View details
                  <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right — image */}
        <div className="relative h-[300px] md:h-full min-h-[360px] flex items-center justify-center overflow-hidden px-6 md:px-12 py-10">
          {/* ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 60% 60%, rgba(16,185,129,0.13) 0%, transparent 70%)",
            }}
          />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={vehicle.id + "-img"}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 0], delay: 0.05 }}
              className="relative w-full max-w-[560px] aspect-[16/10]"
            >
              {image ? (
                <Image
                  src={image}
                  alt={vehicle.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
                  <ShieldCheck className="h-12 w-12 text-white/15" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left / right nav arrows */}
        <button
          onClick={() => go(index - 1)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/12 bg-white/5 hover:bg-white/12 flex items-center justify-center text-white/50 hover:text-white transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => go(index + 1)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/12 bg-white/5 hover:bg-white/12 flex items-center justify-center text-white/50 hover:text-white transition-all"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Bottom — dots + progress bar */}
      <div className="flex flex-col items-center gap-4 px-8 pb-10 pt-4 border-t border-white/8">
        <div className="flex items-center gap-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === index
                  ? "w-6 h-1.5 bg-amber-400"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

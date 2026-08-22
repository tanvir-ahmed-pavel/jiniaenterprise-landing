"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Phone, MessageSquare, ShieldCheck, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SilkyHeroCanvas } from "@/components/home/SilkyHeroCanvas";
import { siteConfig } from "@/lib/config";

export function ExpandingFinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track the full scroll lifecycle: from entering view to leaving view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Zero-lag, highly-responsive spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.4,
    restDelta: 0.001,
  });

  // ── Bi-Directional Full-Lifecycle Expansion & Earlier Shrinking ──
  // 1. Approaches (0 -> 0.30): Expands from 82% to 100% full viewport
  // 2. Centered (0.30 -> 0.48): Stays 100% full-screen
  // 3. Leaves (0.48 -> 0.80): Starts shrinking earlier back to original compact card (82%)
  const width = useTransform(smoothProgress, [0, 0.30, 0.48, 0.80], ["82%", "100%", "100%", "82%"]);
  const height = useTransform(smoothProgress, [0, 0.30, 0.48, 0.80], ["76%", "100%", "100%", "76%"]);
  const borderRadius = useTransform(smoothProgress, [0, 0.30, 0.48, 0.80], [44, 0, 0, 44]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.30, 0.48, 0.80], [0.3, 1, 1, 0.3]);
  const borderOpacity = useTransform(smoothProgress, [0, 0.20, 0.30, 0.48, 0.60, 0.80], [0.4, 0.2, 0, 0, 0.2, 0.4]);

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden w-full h-screen min-h-[680px] flex items-center justify-center bg-emerald-950/10"
    >
      <motion.div
        style={{
          width,
          height,
          borderRadius,
        }}
        className="mx-auto text-center relative overflow-hidden bg-emerald-950 shadow-[0_24px_70px_-15px_rgba(2,24,16,0.85)] border border-emerald-500/20 flex flex-col items-center justify-center p-6 sm:p-12 z-10 will-change-[width,height,border-radius]"
      >
        {/* Dynamic Border Highlight */}
        <motion.div 
          style={{ opacity: borderOpacity }}
          className="absolute inset-0 border border-emerald-400/40 pointer-events-none rounded-[inherit]"
        />

        {/* Ambient Top Glow Halo */}
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-72 bg-emerald-400/20 blur-[120px] pointer-events-none z-1" 
        />

        {/* Interactive Silky Canvas Background */}
        <SilkyHeroCanvas className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Crisp, Stable, Centered Content */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 backdrop-blur-md shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span>Executive Fleet & Chauffeurs</span>
          </div>

          {/* Clean Bold Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-[1.1] tracking-tight">
            Ready for a Better Way to Travel?
          </h2>

          {/* Clean Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-emerald-100/85 font-medium max-w-lg mx-auto leading-relaxed">
            Daily, airport, and corporate rentals across Dhaka with licensed professional chauffeurs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-3.5 pt-2">
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              <Button 
                size="lg" 
                className="h-14 px-8 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-black uppercase tracking-wider text-xs shadow-xl shadow-white/10 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Phone className="mr-2.5 h-4 w-4 text-emerald-700" /> 
                Call: {siteConfig.phone}
              </Button>
            </a>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                "Hi Jinia Enterprise — I would like to book a vehicle / request a quote."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black uppercase tracking-wider text-xs shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <MessageSquare className="mr-2.5 h-4 w-4 text-emerald-950" /> 
                WhatsApp Desk
              </Button>
            </a>
          </div>

          {/* Minimal Trust Assurances */}
          <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-emerald-200/75">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Fixed Fair Pricing
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Licensed Drivers
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-400" />
              24/7 Helpline
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  ShieldCheck,
  MapPin,
  Receipt,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  Send,
  UserCheck,
  Clock,
  FileCheck2,
  Snowflake,
  Shield,
  Star,
  Download,
  Phone,
  Navigation,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface JourneyStep {
  number: string;
  stepName: string;
  title: string;
  badge: string;
  icon: React.ElementType;
  youDo: string;
  weDeliver: string;
  guarantee: string;
  simTitle: string;
  simDescription: string;
}

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    stepName: "Step 01 · Request",
    title: "You Message Us",
    badge: "< 2 Mins Reply",
    icon: MessageSquare,
    youDo: "Send your pickup location, destination, date, and preferred car category via WhatsApp or quick form.",
    weDeliver: "We instantly reply with vehicle photos and a guaranteed fixed, all-inclusive rate.",
    guarantee: "100% Zero Surge Guarantee",
    simTitle: "Instant Quote Dispatcher",
    simDescription: "Live fare quotation with fixed tolls & zero surge guarantee.",
  },
  {
    number: "02",
    stepName: "Step 02 · Dossier",
    title: "Meet Driver on Paper",
    badge: "Sent 1 Hr Ahead",
    icon: ShieldCheck,
    youDo: "Save your assigned chauffeur's direct mobile number on your phone.",
    weDeliver: "We send driver full name, verified BRTA photo ID, direct mobile, and car license plate.",
    guarantee: "Police & Background Vetted",
    simTitle: "Verified Chauffeur Dossier",
    simDescription: "Full photo ID, police clearance, and direct chauffeur mobile dispatched.",
  },
  {
    number: "03",
    stepName: "Step 03 · Pickup",
    title: "Precision Arrival",
    badge: "15 Mins Early",
    icon: MapPin,
    youDo: "Step out to your gate or arrivals hall whenever you are ready.",
    weDeliver: "Your chauffeur is on standby with pre-cooled AC cabin and assists with your luggage.",
    guarantee: "20°C Pre-Cooled AC Ready",
    simTitle: "Live Gate Standby Radar",
    simDescription: "Chauffeur on standby 15 mins early with 20°C pre-cooled cabin.",
  },
  {
    number: "04",
    stepName: "Step 04 · Settle",
    title: "Transparent Checkout",
    badge: "Zero Surcharges",
    icon: Receipt,
    youDo: "Settle via cash, card, bKash, or company monthly corporate billing.",
    weDeliver: "Itemized instant digital tax invoice and VAT receipt sent directly to your email/phone.",
    guarantee: "Official Corporate VAT Invoice",
    simTitle: "Digital VAT E-Invoice",
    simDescription: "Transparent itemized receipt with NBR-compliant corporate VAT.",
  },
];

export function UserJourneySection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-progress through steps unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const active = journeySteps[activeStep];

  return (
    <section 
      className="py-16 sm:py-24 bg-linear-to-b from-transparent via-emerald-950/[0.025] to-transparent relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-2 border-b border-emerald-900/10">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-emerald-800 bg-emerald-100/80 border border-emerald-200/80 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>The Client Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-emerald-950 tracking-tight leading-tight">
              How a Booking <span className="text-gradient-emerald">Actually Feels.</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Click any step below to interact with our real-time chauffeur dispatch & transparency protocol.
            </p>
          </div>

          {/* Step Progress Pill */}
          <div className="flex items-center gap-2 self-end md:self-auto bg-white/90 p-1.5 rounded-2xl border border-emerald-200 shadow-2xs">
            {journeySteps.map((step, idx) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                aria-label={`Select step ${step.number}`}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-heading font-black transition-all duration-300 cursor-pointer flex items-center gap-1.5",
                  activeStep === idx
                    ? "bg-emerald-900 text-white shadow-sm"
                    : "text-emerald-950/60 hover:bg-emerald-50 hover:text-emerald-950"
                )}
              >
                <span>{step.number}</span>
                <span className="hidden sm:inline font-sans text-[11px] font-semibold">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4-Step Interactive Horizontal Swipe on Mobile / 4-Column Grid on Desktop */}
        <div className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 pt-2 snap-x snap-mandatory scrollbar-none -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
          {journeySteps.map((step, idx) => {
            const isActive = activeStep === idx;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                style={{ scrollSnapAlign: "center" }}
                className={cn(
                  "w-[82vw] sm:w-[330px] lg:w-auto shrink-0 lg:shrink flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-400 relative cursor-pointer snap-center",
                  isActive
                    ? "bg-white border-2 border-emerald-500 shadow-[0_20px_45px_-10px_rgba(16,185,129,0.22)] ring-4 ring-emerald-500/10 scale-[1.02]"
                    : "bg-white/80 border border-emerald-100/80 hover:border-emerald-300 hover:bg-white shadow-[0_4px_20px_-4px_rgba(10,25,18,0.06)]"
                )}
              >
                {/* Top Badge & Number */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "w-9 h-9 rounded-2xl font-heading font-black text-xs flex items-center justify-center transition-colors shadow-md",
                      isActive ? "bg-emerald-500 text-emerald-950 font-black" : "bg-emerald-900 text-white"
                    )}>
                      {step.number}
                    </span>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors",
                      isActive
                        ? "text-emerald-950 bg-emerald-100 border-emerald-300"
                        : "text-emerald-800 bg-emerald-50 border-emerald-200"
                    )}>
                      {step.badge}
                    </span>
                  </div>

                  {/* Step Name & Title */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 block">
                      {step.stepName}
                    </span>
                    <h3 className="text-xl font-heading font-black text-emerald-950 mt-1">
                      {step.title}
                    </h3>
                  </div>

                  {/* Flow Details: You vs Jinia */}
                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-2xl bg-gray-50/90 border border-gray-100 space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-gray-500 block">
                        You Provide
                      </span>
                      <p className="text-xs text-gray-700 font-medium leading-relaxed">
                        {step.youDo}
                      </p>
                    </div>

                    <div className={cn(
                      "p-3 rounded-2xl border space-y-1 transition-colors",
                      isActive ? "bg-emerald-100/70 border-emerald-300" : "bg-emerald-50/70 border-emerald-100"
                    )}>
                      <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700 block">
                        Jinia Delivers
                      </span>
                      <p className="text-xs text-emerald-950 font-semibold leading-relaxed">
                        {step.weDeliver}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Active Pulse & Guarantee */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{step.guarantee}</span>
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ════════ INTERACTIVE LIVE DEMONSTRATION STAGE ════════ */}
        <div className="rounded-3xl border border-emerald-800/80 bg-emerald-950 text-white p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Step Explanation */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-black uppercase tracking-wider text-emerald-300">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>Live Simulation · Step {active.number}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight">
                {active.simTitle}
              </h3>
              <p className="text-sm text-emerald-100/80 font-medium leading-relaxed">
                {active.simDescription}
              </p>
              
              <div className="pt-2 flex items-center gap-3">
                <Link href="/booking">
                  <Button className="h-11 px-6 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-black uppercase tracking-wider text-xs shadow-md cursor-pointer">
                    Book Ride
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/8801716633445"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-bold text-white flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Right: Dynamic Interactive Simulation Widget */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.number}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-5 sm:p-6 shadow-2xl"
                >
                  {/* Step 1 Interactive Widget: Instant Fare Calculator */}
                  {activeStep === 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold text-white">Instant WhatsApp Quote Generator</span>
                        </div>
                        <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                          ● Automated
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-[9px] text-white/50 uppercase">Airport Drop</p>
                          <p className="font-bold text-white mt-0.5">Gulshan → DAC</p>
                          <p className="text-[10px] text-emerald-300 font-bold mt-1">৳2,500 Fixed</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30">
                          <p className="text-[9px] text-emerald-300 uppercase">Full-Day City</p>
                          <p className="font-bold text-white mt-0.5">10-Hr Dedicated</p>
                          <p className="text-[10px] text-amber-300 font-bold mt-1">৳4,500 All-In</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-[9px] text-white/50 uppercase">Factory EPZ</p>
                          <p className="font-bold text-white mt-0.5">Dhaka → Savar</p>
                          <p className="text-[10px] text-emerald-300 font-bold mt-1">৳5,200 Fixed</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2 Interactive Widget: Chauffeur Dossier Pass */}
                  {activeStep === 1 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold text-white">Chauffeur Security Pass (WhatsApp Dispatch)</span>
                        </div>
                        <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                          ● BRTA Cleared
                        </span>
                      </div>
                      <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-emerald-800 border border-emerald-400/30 flex items-center justify-center text-white font-black text-sm">
                          MD. R
                        </div>
                        <div className="space-y-0.5 text-xs">
                          <p className="font-bold text-white">Md. Rafiqul Islam (Senior Chauffeur)</p>
                          <p className="text-[11px] text-emerald-300 font-semibold">BRTA License: #84920-DH · Mobile: +880 1716-633445</p>
                          <p className="text-[10px] text-white/60">Vehicle: Toyota Premio (Dhaka Metro-GA 34-8921)</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 Interactive Widget: Early Standby Radar */}
                  {activeStep === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <Navigation className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold text-white">Live Gate Standby Radar</span>
                        </div>
                        <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                          ● 15 Mins Early
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                          <Clock className="h-4 w-4 text-emerald-300 mx-auto mb-1" />
                          <p className="font-bold text-white">Arrived 06:45 AM</p>
                          <p className="text-[10px] text-white/60">15m ahead of time</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                          <Snowflake className="h-4 w-4 text-sky-300 mx-auto mb-1" />
                          <p className="font-bold text-white">Cabin at 20°C</p>
                          <p className="text-[10px] text-white/60">AC pre-cooled</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                          <Car className="h-4 w-4 text-amber-300 mx-auto mb-1" />
                          <p className="font-bold text-white">Gate Standby</p>
                          <p className="text-[10px] text-white/60">Trunk ready</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 Interactive Widget: Digital Tax Receipt */}
                  {activeStep === 3 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <FileCheck2 className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold text-white">Digital NBR VAT Invoice & Tax Receipt</span>
                        </div>
                        <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                          ● 100% Compliant
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">Invoice #JN-2026-8942</p>
                          <p className="text-[11px] text-emerald-300">Total: ৳4,500 (Includes Fuel, Driver & VAT)</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-400/30">
                          PAID & CLEARED
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-center">
          <Link href="/booking">
            <Button size="lg" className="h-12 px-8 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-black uppercase tracking-wider text-xs shadow-lg cursor-pointer">
              <span>Start Your Booking Now</span>
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
          <a
            href="https://wa.me/8801716633445"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900 hover:text-emerald-700 px-4 py-3"
          >
            <MessageSquare className="h-4 w-4 text-emerald-600" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

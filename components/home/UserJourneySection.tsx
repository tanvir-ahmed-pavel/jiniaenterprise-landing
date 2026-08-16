"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Car, 
  ShieldCheck, 
  MapPin, 
  Receipt, 
  ArrowRight, 
  Check, 
  Sparkles,
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SilkRibbonBackdrop } from "@/components/ui/SilkRibbonBackdrop";

interface JourneyStep {
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badge: string;
  description: string;
  highlights: string[];
}

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "1. Choose Your Car & Route",
    subtitle: "Select Vehicle & Dates",
    icon: Car,
    badge: "Step 1: Pick Car",
    description: "Browse our sedans, SUVs, microbuses, or buses. Choose your pickup date, time, and trip details with transparent pricing.",
    highlights: [
      "Instant confirmation via Phone or WhatsApp",
      "Fixed prices with no hidden charges",
      "Cars, VIP SUVs & AC Buses available",
    ],
  },
  {
    number: "02",
    title: "2. Receive Driver Details",
    subtitle: "Verified Driver Assigned",
    icon: ShieldCheck,
    badge: "Step 2: Assignment",
    description: "We assign an experienced, polite driver and share their name, phone number, and vehicle registration number in advance.",
    highlights: [
      "BRTA licensed & background-verified driver",
      "Clean, sanitized, and pre-checked car",
      "Driver contact info sent before trip",
    ],
  },
  {
    number: "03",
    title: "3. Driver Arrives On Time",
    subtitle: "Pickup at Your Doorstep",
    icon: MapPin,
    badge: "Step 3: Pickup",
    description: "Your driver arrives early at your doorstep, office, or airport terminal, ready to assist with luggage and take you smoothly on your way.",
    highlights: [
      "Always 15 minutes early for pickup",
      "Airport signboard greeting at DAC",
      "Air-conditioned & clean comfortable cabin",
    ],
  },
  {
    number: "04",
    title: "4. Enjoy the Ride & Pay Easily",
    subtitle: "Multiple Payment Options",
    icon: Receipt,
    badge: "Step 4: Completion",
    description: "Relax throughout your journey. Pay conveniently using bKash, Credit Card, Cash, or Bank Transfer with an official receipt.",
    highlights: [
      "bKash, Cards, Cash & Bank Transfer",
      "Official VAT & tax invoice for companies",
      "24/7 helpline if you need help on the road",
    ],
  },
];

export function UserJourneySection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = journeySteps[activeStep];
  const IconComponent = current.icon;

  return (
    <section className="py-20 sm:py-28 bg-linear-to-b from-emerald-950/[0.03] via-transparent to-emerald-950/[0.04] relative overflow-hidden">
      {/* Subtle Background */}
      <SilkRibbonBackdrop className="opacity-35" />
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-30" />

      <div className="container relative z-10 space-y-12">
        {/* Section Header - Concise & Scannable */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-emerald-700 text-xs font-black uppercase tracking-[0.2em] bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200/80 inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-emerald-600" />
              <span>Easy Booking Process</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-emerald-950 tracking-tight leading-tight">
              How It Works. <span className="text-gradient-emerald">Simple 4 Steps.</span>
            </h2>
          </div>
          <p className="text-sm text-gray-500 font-medium max-w-sm">
            Booking a car with driver in Dhaka has never been easier. Safe, punctual, and hassle-free.
          </p>
        </div>

        {/* 4 Interactive Visual Step Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {journeySteps.map((step, idx) => {
            const isSelected = activeStep === idx;
            const StepIcon = step.icon;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 relative ${
                  isSelected
                    ? "bg-emerald-950 text-white border-emerald-900 shadow-xl scale-[1.02]"
                    : "bg-gray-50/70 hover:bg-emerald-50/60 text-gray-700 border-gray-200 hover:border-emerald-300"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl font-heading font-black italic ${
                    isSelected ? "text-emerald-400" : "text-gray-300 group-hover:text-emerald-600"
                  }`}>
                    {step.number}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? "bg-white/10 text-emerald-300" : "bg-white text-gray-500 shadow-xs"
                  }`}>
                    <StepIcon className="h-4 w-4" />
                  </div>
                </div>

                <h4 className={`text-sm font-heading font-black leading-snug line-clamp-1 ${
                  isSelected ? "text-white" : "text-emerald-950"
                }`}>
                  {step.title}
                </h4>
                <p className={`text-[11px] mt-1 font-medium truncate ${
                  isSelected ? "text-emerald-200/80" : "text-gray-500"
                }`}>
                  {step.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Box - Compact & Scannable */}
        <div className="editorial-card rounded-3xl p-8 sm:p-10 border border-emerald-100 bg-white shadow-lg">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Highlights */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 text-[10px] font-black uppercase tracking-widest bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
                  {current.badge}
                </span>
                <span className="text-xs font-bold text-gray-400">Step {activeStep + 1} of 4</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-black text-emerald-950">
                {current.title}
              </h3>

              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                {current.description}
              </p>

              {/* 3 Quick Highlight Tags */}
              <div className="grid sm:grid-cols-3 gap-2.5 pt-2">
                {current.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                    <span className="text-xs font-bold text-gray-800 leading-tight">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-3">
                <Link href="/booking">
                  <Button size="sm" className="h-11 px-6 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider gap-2">
                    <span>Book a Vehicle Now</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <a href="tel:+8801716633445">
                  <Button variant="outline" size="sm" className="h-11 px-4 rounded-xl border-gray-200 text-emerald-950 hover:bg-emerald-50 gap-2 font-bold text-xs uppercase tracking-wider">
                    <PhoneCall className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Call Helpline</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Quick Assurance Badge */}
            <div className="lg:col-span-5">
              <div className="bg-emerald-950 rounded-2xl p-6 text-white space-y-4 border border-emerald-800 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-white/10 text-emerald-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Our Promise</p>
                      <h4 className="font-heading font-extrabold text-white text-sm">Safe & On Time</h4>
                    </div>
                  </div>
                  <span className="text-xl font-black italic text-emerald-400">{current.number}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-emerald-400 font-bold">100% On-Time</p>
                    <p className="text-[10px] text-white/60">Punctuality Guarantee</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-emerald-400 font-bold">Polite & Verified</p>
                    <p className="text-[10px] text-white/60">Experienced Drivers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

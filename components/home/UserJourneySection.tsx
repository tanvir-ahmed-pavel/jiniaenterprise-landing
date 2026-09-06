"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, ShieldCheck, MapPin, Receipt, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const journeySteps = [
  { number: "01", title: "Tell us", detail: "Share your route and date.", icon: MessageSquare },
  { number: "02", title: "Meet your driver", detail: "Get the name, car, and plate.", icon: ShieldCheck },
  { number: "03", title: "Ride ready", detail: "Your car waits, clean and cool.", icon: MapPin },
  { number: "04", title: "Pay simply", detail: "One clear, itemized rate.", icon: Receipt },
];

export function UserJourneySection() {
  const [activeStep, setActiveStep] = useState(0);
  const active = journeySteps[activeStep];
  const ActiveIcon = active.icon;

  return (
    <section className="py-16 sm:py-24 bg-emerald-950/[0.025] relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-emerald-900/10">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-700">The simple part</span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-emerald-950 leading-tight">
              From message to moving.
            </h2>
          </div>
          <Link href="/booking">
            <Button className="h-11 px-5 rounded-xl bg-emerald-900 text-white hover:bg-emerald-800 gap-2 text-xs font-medium uppercase tracking-wider">
              Book a ride <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "min-h-40 sm:min-h-44 rounded-2xl p-4 text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between",
                    isActive
                      ? "bg-white border-emerald-400 shadow-[0_12px_30px_-24px_rgba(6,52,38,.35)] shadow-emerald-950/10"
                      : "bg-white/60 border-emerald-100 hover:border-emerald-300"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={cn("h-5 w-5", isActive ? "text-emerald-600" : "text-emerald-900/40")} />
                    <span className="text-[10px] font-medium text-emerald-900/40">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-heading font-medium text-emerald-950">{step.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{step.detail}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl bg-emerald-950 p-6 sm:p-8 text-white flex items-center gap-5 min-h-40">
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-emerald-400 text-emerald-950 flex items-center justify-center">
              <ActiveIcon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-emerald-300">Step {active.number}</p>
              <h3 className="mt-1 text-2xl font-heading font-medium">{active.title}</h3>
              <p className="mt-1 text-sm text-emerald-100/70">{active.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

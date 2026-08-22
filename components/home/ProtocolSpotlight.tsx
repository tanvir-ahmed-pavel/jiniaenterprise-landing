"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  Navigation, 
  CheckCircle2, 
  Users, 
  ArrowRight,
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SilkRibbonBackdrop } from "@/components/ui/SilkRibbonBackdrop";

export function ProtocolSpotlight() {
  const protocolPillars = [
    {
      title: "Experienced & Polite Drivers",
      subtitle: "Licensed & Background-Checked",
      icon: Users,
      badge: "Verified Drivers",
      points: [
        "BRTA professional driving license verified",
        "Police background checked & well-mannered",
        "Familiar with Dhaka shortcuts & highway routes",
      ],
    },
    {
      title: "Clean & Maintained Vehicles",
      subtitle: "Air-Conditioned & Serviced",
      icon: ShieldCheck,
      badge: "Regularly Serviced",
      points: [
        "Powerful AC and freshly cleaned interior",
        "Daily tyre, engine & oil check before pickup",
        "Emergency spare tyre & safety toolkit on board",
      ],
    },
    {
      title: "24/7 Helpline & Support",
      subtitle: "Always Here to Help You",
      icon: Navigation,
      badge: "Fast Response",
      points: [
        "Immediate customer support on call & WhatsApp",
        "Quick backup car replacement if needed",
        "Honest, fixed rates with no hidden charges",
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-linear-to-b from-emerald-950/[0.04] via-emerald-950/[0.02] to-emerald-950/[0.05] relative overflow-hidden">
      <SilkRibbonBackdrop flip className="opacity-35" />
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-30" />

      <div className="container relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-emerald-700 text-xs font-black uppercase tracking-[0.2em] bg-emerald-100/80 px-3.5 py-1.5 rounded-full border border-emerald-200/80 inline-flex items-center gap-2">
              <Award className="h-3.5 w-3.5 text-emerald-600" />
              <span>Safety & Service Guarantee</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-emerald-950 tracking-tight leading-tight">
              Why You Can <span className="text-gradient-emerald">Rely on Us.</span>
            </h2>
          </div>
          <p className="text-sm text-gray-500 font-medium max-w-sm">
            We focus on your safety, comfort, and peace of mind on every single trip.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {protocolPillars.map((pillar, idx) => {
            const PillarIcon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="editorial-card rounded-3xl p-7 flex flex-col justify-between border border-gray-200 hover:border-emerald-300 transition-all duration-300 group bg-white shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-900 group-hover:text-white transition-colors duration-300">
                      <PillarIcon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-heading font-black text-emerald-950">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">{pillar.subtitle}</p>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {pillar.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-xs text-gray-700 font-semibold leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-gray-400">Pillar 0{idx + 1}</span>
                  <span className="font-black text-emerald-700 uppercase tracking-wider">Quality Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative editorial-card rounded-3xl p-7 sm:p-9 bg-emerald-950 text-white border border-emerald-800 shadow-xl overflow-hidden">
          <SilkRibbonBackdrop variant="dark" className="opacity-30" />
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-400/35 to-transparent" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center lg:text-left max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Corporate & Monthly Rentals</span>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                Need Long-Term Cars or Regular Staff Pickup?
              </h3>
              <p className="text-xs text-emerald-200/80">
                Get special monthly rates, customized vehicle options, and monthly VAT invoicing.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link href="/contact">
                <Button size="sm" className="h-11 px-6 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs uppercase tracking-wider gap-2">
                  <span>Contact Our Team</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <a href="tel:+8801716633445">
                <Button variant="outline" size="sm" className="h-11 px-5 rounded-xl border-white/20 text-white hover:bg-white/10 gap-2 font-bold text-xs uppercase tracking-wider">
                  <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
                  <span>+88 01716 633445</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

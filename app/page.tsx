import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { HeroBookingWidget } from "@/components/forms/HeroBookingWidget";
import { UserJourneySection } from "@/components/home/UserJourneySection";
import { ConciergeShowcase } from "@/components/home/ConciergeShowcase";
import { ProtocolSpotlight } from "@/components/home/ProtocolSpotlight";
import { ExpandingFinalCTA } from "@/components/home/ExpandingFinalCTA";
import { HomeBlogSection } from "@/components/home/HomeBlogSection";
import { SilkyHeroCanvas } from "@/components/home/SilkyHeroCanvas";
import { SilkRibbonBackdrop } from "@/components/ui/SilkRibbonBackdrop";
import {
  siteConfig,
  corporateClients,
} from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import { createMetadata } from "@/lib/seo/metadata";
import {
  Phone,
  Calendar,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Car Rental in Dhaka with Driver",
  description:
    "Book chauffeur-driven car and bus rental in Dhaka. Daily, monthly, corporate, and airport transfer service from Jinia Enterprise.",
  path: "/",
  keywords: [
    "car rental Dhaka",
    "car rental with driver Dhaka",
    "airport transfer Dhaka",
    "corporate car rental Bangladesh",
    "monthly car rental Dhaka",
    "Jinia Enterprise",
  ],
});

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
  is_featured: boolean;
}

async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(6);

  if (error) {
    // Fallback: is_featured/sort_order columns may not exist yet.
    // Run: ALTER TABLE vehicles ADD COLUMN sort_order INTEGER DEFAULT 0;
    //      ALTER TABLE vehicles ADD COLUMN is_featured BOOLEAN DEFAULT false;
    const { data: fallbackData } = await supabase
      .from("vehicles")
      .select("*")
      .eq("is_active", true)
      .limit(6);
    return (fallbackData as Vehicle[]) || [];
  }

  return (data as Vehicle[]) || [];
}

export default async function Home() {
  const featuredVehicles = await getFeaturedVehicles();

  const trustStats = [
    { value: "10+", label: "Years in Service" },
    { value: "2,500+", label: "Successful Trips" },
    { value: "100%", label: "Verified Drivers" },
    { value: "24/7", label: "Customer Helpline" },
  ];

  return (
    <div className="flex flex-col">
      {/* ════════ HERO SECTION ════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden -mt-16 pt-24 pb-16">
        {/* Interactive Silky Green & Golden Canvas */}
        <SilkyHeroCanvas />

        {/* Ambient Dark Emerald Subtle Vignette */}
        <div className="absolute inset-0 bg-linear-to-b from-emerald-950/40 via-transparent to-[hsl(var(--background))] pointer-events-none z-1" />

        {/* Content */}
        <div className="container relative z-10 py-12 md:py-16">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-200 bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg animate-fade-in">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>Dhaka&apos;s Trusted Car & Bus Rental Service</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="font-heading font-black tracking-tight leading-[1.05] text-white">
                <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                  Rent Clean Cars & Buses
                </span>
                <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-gold italic mt-1">
                  With Professional Drivers
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-2xl mx-auto font-medium leading-relaxed">
                Daily, monthly, and airport car rentals across Dhaka & Bangladesh. 
                Reliable vehicles, experienced drivers, and fair, transparent rates.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3.5 justify-center items-center pt-2">
              <Link href="/vehicles">
                <Button
                  size="lg"
                  className="gap-2.5 px-8 h-14 text-sm font-black uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-2xl shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all duration-300"
                >
                  <Calendar className="h-4 w-4" /> View All Vehicles
                </Button>
              </Link>
              
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2.5 px-6 h-14 text-sm font-bold text-white border-white/20 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all duration-300"
                >
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>Call Us Now</span>
                </Button>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="gap-2.5 px-6 h-14 text-sm font-bold bg-white text-emerald-950 hover:bg-emerald-50 rounded-2xl shadow-lg transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-600" />
                  <span>WhatsApp Us</span>
                </Button>
              </a>
            </div>

            {/* Quick Booking Widget */}
            <div className="pt-6 relative z-20">
              <HeroBookingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ TRUST STATS STRIP ════════ */}
      <section className="relative -mt-8 z-20 container mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-6 glass-card bg-white/80 border border-white shadow-xl rounded-3xl">
          {trustStats.map((stat) => (
            <div key={stat.label} className="text-center p-3 sm:p-4 rounded-2xl bg-emerald-50/50">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-emerald-950">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ CONCIERGE CAPABILITY SHOWCASE ════════ */}
      <ConciergeShowcase />

      {/* ════════ HOW A BOOKING FEELS ════════ */}
      <UserJourneySection />

      {/* ════════ FEATURED FLEET — after intent is clear ════════ */}
      {featuredVehicles.length > 0 && (
        <section className="py-24 sm:py-32 bg-linear-to-b from-transparent via-emerald-950/[0.035] to-transparent relative overflow-hidden">
          <SilkRibbonBackdrop className="opacity-40" />

          <div className="container space-y-14 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="max-w-xl space-y-3">
                <span className="text-emerald-700 text-xs font-black uppercase tracking-[0.2em] bg-emerald-100/70 px-3.5 py-1.5 rounded-full border border-emerald-200">
                  Featured Fleet
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-emerald-950 leading-tight">
                  Pick the car that fits{" "}
                  <span className="text-gradient-emerald">the trip you just planned.</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  Sedans, VIP SUVs, family microbuses, and AC coaches—with professional drivers.
                </p>
              </div>
              <Link href="/vehicles">
                <Button variant="outline" className="px-6 h-12 rounded-xl border-emerald-200 text-emerald-900 hover:bg-emerald-50 gap-2 font-bold text-xs uppercase tracking-wider group">
                  View all vehicles <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ PROTOCOL & SAFETY STANDARDS ════════ */}
      <ProtocolSpotlight />

      {/* ════════ TRUSTED CLIENTS — MARQUEE ════════ */}
      <section className="py-24 sm:py-32 overflow-hidden bg-emerald-950/5 relative">
        <SilkRibbonBackdrop flip className="opacity-30" />

        <div className="container mb-12 text-center space-y-3 max-w-3xl relative z-10">
          <span className="text-emerald-700 text-xs font-black uppercase tracking-[0.2em] bg-emerald-100/70 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Trusted by Top Clients
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-emerald-950">
            Serving Embassies, Corporates & Families
          </h2>
          <p className="text-sm text-gray-600 font-medium">
            Over a decade of reliable, safe, and punctual car & bus rental services across Bangladesh.
          </p>
        </div>

        <div className="relative mb-4 pause-on-hover z-10">
          <div className="flex animate-marquee gap-4 w-max">
            {[...corporateClients, ...corporateClients].map((client, i) => (
              <div
                key={`r1-${i}`}
                className="px-6 py-4 rounded-2xl bg-white border border-emerald-100 text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-3 shadow-xs hover:bg-emerald-900 hover:text-white transition-all duration-300"
              >
                <div className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  client.type === "Embassy" ? "bg-emerald-500" : client.type === "International Organization" ? "bg-blue-500" : "bg-amber-500"
                )} />
                <span>{client.name}</span>
                <span className="text-[10px] opacity-60 font-semibold lowercase">({client.type})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative pause-on-hover z-10">
          <div className="flex animate-marquee-reverse gap-4 w-max">
            {[...corporateClients.slice().reverse(), ...corporateClients.slice().reverse()].map((client, i) => (
              <div
                key={`r2-${i}`}
                className="px-6 py-4 rounded-2xl bg-white border border-emerald-100 text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-3 shadow-xs hover:bg-emerald-900 hover:text-white transition-all duration-300"
              >
                <div className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  client.type === "Embassy" ? "bg-emerald-500" : client.type === "International Organization" ? "bg-blue-500" : "bg-amber-500"
                )} />
                <span>{client.name}</span>
                <span className="text-[10px] opacity-60 font-semibold lowercase">({client.type})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SEO SERVICE PILLARS ════════ */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="max-w-2xl mb-10 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700">
              Popular searches
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-emerald-950 tracking-tight">
              Car rental services in Dhaka.
            </h2>
            <p className="text-gray-600 font-medium">
              Straight answers for chauffeur hire, airport transfers, corporate fleets, and monthly packages.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/car-rental-dhaka", label: "Car rental in Dhaka", desc: "City & outstation with driver" },
              { href: "/car-rental-with-driver", label: "With driver", desc: "Licensed chauffeur packages" },
              { href: "/airport-car-rental", label: "Airport transfer", desc: "DAC pickup & drop" },
              { href: "/corporate-car-rental", label: "Corporate rental", desc: "Embassy & company fleets" },
              { href: "/monthly-car-rental", label: "Monthly rental", desc: "Long-term commute hire" },
              { href: "/faq", label: "FAQ", desc: "Fuel, hours, booking answers" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-emerald-100 bg-white/70 p-6 hover:border-emerald-300 hover:bg-white transition-colors"
              >
                <p className="font-heading font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FINAL CTA WITH SCROLL-DRIVEN EXPAND ANIMATION ════════ */}
      <ExpandingFinalCTA />

      {/* ════════ LATEST BLOG ARTICLES & GUIDES ════════ */}
      <HomeBlogSection />
    </div>
  );
}

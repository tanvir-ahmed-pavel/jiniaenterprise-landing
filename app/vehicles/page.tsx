import { VehicleGrid } from "@/components/vehicles/VehicleGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { createStaticClient } from "@/lib/supabase/static";
import { createClient } from "@/lib/supabase/server";
import { Phone, MessageSquare, Sparkles, ShieldCheck, Snowflake, FileCheck2, Car, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo/metadata";
import { sampleVehicles, siteConfig } from "@/lib/config";

export const revalidate = 60; // Revalidate at most every 60 seconds

export const metadata = createMetadata({
  title: "Car Rental Fleet in Dhaka",
  description:
    "Browse sedans, SUVs, microbuses, and coaches for chauffeur-driven daily, weekly, and monthly rental in Dhaka.",
  path: "/vehicles",
});

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
  seats: number;
  engine_cc?: number | null;
  features?: string[];
  rental_types: string[];
  description?: string;
  images?: string[];
  image_url?: string | null;
  starting_price?: number | null;
  price_label?: string;
  is_active: boolean;
  sort_order: number;
  is_featured: boolean;
}

async function getVehicles(): Promise<Vehicle[]> {
  try {
    const staticClient = createStaticClient();
    const supabase = staticClient || (await createClient());

    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Vehicle[];
    }
  } catch (e) {
    console.error("Error fetching vehicles from DB, falling back to sample data:", e);
  }

  // Graceful fallback to verified sample vehicle fleet
  return sampleVehicles as unknown as Vehicle[];
}

export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <div className="pb-24">
      <PageHeader 
        title="Executive Fleet."
        subtitle="Chauffeur-Driven Precision"
        description="Every vehicle in our collection is handpicked, climate-conditioned, and maintained to the highest standards with vetted professional chauffeurs."
        breadcrumbs={[{ label: "Fleet" }]}
      />

      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-6 sm:mt-10">
        
        {/* Dynamic Fleet Telemetry Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-white/80 border border-emerald-900/10 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Car className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-emerald-950">{vehicles.length}+ Premium Models</p>
              <p className="text-[11px] text-gray-500 font-medium">100% First-Hand Fleet</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-emerald-900/10 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-emerald-950">Licensed Chauffeurs</p>
              <p className="text-[11px] text-gray-500 font-medium">BRTA & Police Verified</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-emerald-900/10 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Snowflake className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-emerald-950">20°C Pre-Cooled Cabins</p>
              <p className="text-[11px] text-gray-500 font-medium">Climate-Ready on Arrival</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-emerald-900/10 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-emerald-950">Corporate VAT Billing</p>
              <p className="text-[11px] text-gray-500 font-medium">100% Transparent Invoices</p>
            </div>
          </div>
        </div>

        {/* Vehicle Grid with Live Multi-Filters & Quick Specs Drawer */}
        <VehicleGrid vehicles={vehicles} />

        {/* Bespoke VIP Concierge Assistance CTA */}
        <div className="relative glass-card p-10 sm:p-14 md:p-20 text-center overflow-hidden bg-emerald-950 rounded-3xl border border-emerald-800/80 shadow-2xl mt-16">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[16rem] font-heading font-black italic whitespace-nowrap text-white">
              BESPOKE
            </span>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-emerald-300 bg-emerald-500/20 border border-emerald-400/30">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Specialized Retainers</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
              Looking for a Long-Term Corporate or Diplomatic Fleet?
            </h2>
            <p className="text-emerald-100/80 font-medium text-sm sm:text-base leading-relaxed">
              We arrange customized multi-month retentions, custom pilot escorts, and dedicated company fleet deployments with dedicated senior coordinators.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Button size="lg" className="h-13 px-8 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-black uppercase tracking-wider text-xs shadow-lg cursor-pointer">
                  <Phone className="mr-2.5 h-4 w-4 text-emerald-700" /> Personal Call: {siteConfig.phone}
                </Button>
              </a>
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hi Jinia Enterprise — I would like a quote for a custom fleet retainer.")}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-13 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black uppercase tracking-wider text-xs shadow-lg cursor-pointer">
                  <MessageSquare className="mr-2.5 h-4 w-4 text-emerald-950" /> WhatsApp Concierge
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

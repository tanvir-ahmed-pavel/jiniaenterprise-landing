import { VehicleGrid } from "@/components/vehicles/VehicleGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { createStaticClient } from "@/lib/supabase/static";
import { createClient } from "@/lib/supabase/server";
import { ShieldCheck, Snowflake, FileCheck2, Car } from "lucide-react";
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
      .select("id,name,slug,category,seats,engine_cc,features,rental_types,description,images,image_url,starting_price,price_label,is_active,sort_order,is_featured")
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
              <p className="font-medium text-emerald-950">{vehicles.length}+ Premium Models</p>
              <p className="text-[11px] text-gray-500 font-medium">100% First-Hand Fleet</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-emerald-900/10 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <p className="font-medium text-emerald-950">Licensed Chauffeurs</p>
              <p className="text-[11px] text-gray-500 font-medium">BRTA & Police Verified</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-emerald-900/10 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Snowflake className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <p className="font-medium text-emerald-950">20°C Pre-Cooled Cabins</p>
              <p className="text-[11px] text-gray-500 font-medium">Climate-Ready on Arrival</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-emerald-900/10 shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div className="text-xs">
              <p className="font-medium text-emerald-950">Corporate VAT Billing</p>
              <p className="text-[11px] text-gray-500 font-medium">100% Transparent Invoices</p>
            </div>
          </div>
        </div>

        {/* Vehicle Grid with Live Multi-Filters & Quick Specs Drawer */}
        <VehicleGrid vehicles={vehicles} />

        {/* Long-term enquiry. Same dark studio ground as the home CTA — no
            glass card, no 16rem ghost word behind it. */}
        <section className="jinia-on-dark relative isolate mt-20 overflow-hidden rounded-2xl bg-[#0d1310] bg-[radial-gradient(95%_90%_at_50%_10%,#26332c_0%,#161f1a_50%,#0d1310_85%)] px-6 py-20 text-center sm:px-12 sm:py-24">
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="flex items-center justify-center gap-3 type-label text-amber-300/80">
              <span aria-hidden className="h-px w-6 shrink-0 bg-amber-400" />
              Standing arrangements
            </p>
            <h2 className="type-display mx-auto mt-5 max-w-[18ch] font-heading text-[2rem] text-white sm:text-[2.75rem]">
              Need a fleet for months, not a car for a day?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/55">
              Companies, NGOs, and embassies run monthly arrangements with us — named coordinator,
              monthly billing, and a backup vehicle held for the days one is needed.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-emerald-950 transition-colors hover:bg-amber-300"
              >
                Call {siteConfig.phone}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hi Jinia Enterprise — I would like a quote for a long-term fleet arrangement.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-7 text-sm font-medium text-white transition-colors hover:border-amber-300"
              >
                WhatsApp the desk
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

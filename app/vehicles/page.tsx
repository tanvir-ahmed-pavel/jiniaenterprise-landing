import { Metadata } from "next";
import { VehicleGrid } from "@/components/vehicles/VehicleGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { createStaticClient } from "@/lib/supabase/static";
import { createClient } from "@/lib/supabase/server";
import { Phone, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 60; // Revalidate at most every 60 seconds

export const metadata: Metadata = {
  title: "Our Vehicle Fleet | Jinia Enterprise",
  description:
    "Browse our fleet of well-maintained vehicles including sedans, SUVs, vans, and buses for daily, weekly, and monthly rental in Dhaka.",
};

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
  const staticClient = createStaticClient();
  const supabase = staticClient || (await createClient());

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    const { data: fallbackData, error: fallbackError } = await supabase
      .from("vehicles")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (fallbackError) {
      console.error("Error fetching vehicles:", fallbackError);
      return [];
    }
    return (fallbackData as Vehicle[]) || [];
  }

  return (data as Vehicle[]) || [];
}

export default async function VehiclesPage() {
  const vehicles = await getVehicles();

  return (
    <div className="pb-24">
      <PageHeader 
        title="Selective Fleet."
        subtitle="Uncompromising Quality"
        description="Every vehicle in our collection is handpicked and maintained to the highest standards, ensuring a seamless experience for your journey."
        breadcrumbs={[{ label: "Fleet" }]}
      />

      <div className="container">
        {/* Vehicle Grid with Interactive Filter Pills */}
        {vehicles.length > 0 ? (
          <VehicleGrid vehicles={vehicles} />
        ) : (
          <div className="text-center py-32 mb-16 glass-card max-w-2xl mx-auto rounded-3xl">
            <Sparkles className="h-12 w-12 text-emerald-300 mx-auto mb-6" />
            <p className="text-gray-500 font-medium italic">
              Our fleet is currently reaching its destination. <br />
              Please check back shortly for available selections.
            </p>
          </div>
        )}

        {/* Premium CTA */}
        <div className="relative glass-card p-12 md:p-20 text-center overflow-hidden bg-emerald-950 rounded-3xl border border-emerald-900/50 shadow-2xl">
          {/* Decorative Text background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-[18rem] font-heading font-black italic whitespace-nowrap text-white">
              CUSTOM CARE
            </span>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white italic leading-tight">
              A Bespoke Journey <br /> <span className="text-emerald-400">Awaits You.</span>
            </h2>
            <p className="text-white/70 font-medium text-lg leading-relaxed">
              Cannot find the exact vehicle you have in mind? Contact our concierge team for specialized arrangements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
              <a href="tel:+8801716633445">
                <Button size="lg" className="h-14 px-8 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-black uppercase tracking-[0.2em] text-[10px] shadow-lg">
                  <Phone className="mr-3 h-4 w-4" /> Personal Call
                </Button>
              </a>
              <a href="https://wa.me/8801716633445" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-[0.2em] text-[10px]">
                  <MessageSquare className="mr-3 h-4 w-4" /> WhatsApp Connect
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


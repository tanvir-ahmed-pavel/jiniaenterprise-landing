import React from "react";
import { BookingForm } from "@/components/forms/BookingForm";
import { siteConfig } from "@/lib/config";
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Car,
  Headphones,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Book Car Rental in Dhaka with Driver | Jinia Enterprise",
  description:
    "Fast and easy car and bus rental in Dhaka. Choose your preferred vehicle, pickup time, and location — or reserve instantly via WhatsApp.",
  path: "/booking",
});

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category?: string;
  seats?: number;
  engine_cc?: number | null;
  features?: string[];
  rental_types?: string[];
  description?: string;
  images?: string[];
  image_url?: string | null;
  starting_price?: number | null;
  price_label?: string;
  is_active?: boolean;
}

interface BookingPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  
  const vehicleQuery = typeof resolvedParams.vehicle === "string" ? resolvedParams.vehicle : undefined;
  const rentalTypeQuery = typeof resolvedParams.type === "string" ? resolvedParams.type : undefined;
  const pickupQuery = typeof resolvedParams.pickup === "string" ? resolvedParams.pickup : undefined;
  const dateQuery = typeof resolvedParams.date === "string" ? resolvedParams.date : undefined;

  const supabase = await createClient();
  const { data: rawVehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const vehicles = (rawVehicles as Vehicle[]) || [];

  // Match vehicle by slug or ID
  const matchedVehicle = vehicleQuery
    ? vehicles.find((v) => v.slug === vehicleQuery || v.id === vehicleQuery)
    : undefined;

  const preselectedVehicleId = matchedVehicle ? matchedVehicle.id : (vehicleQuery || "");

  return (
    <div className="pb-24 bg-linear-to-b from-emerald-950/5 via-transparent to-transparent">
      <PageHeader 
        title="Reserve Your Ride."
        subtitle="Simple & Fast Booking"
        description="Select your vehicle, pickup date, and destination. Our concierge desk will confirm availability and driver assignment within 15–30 minutes."
        breadcrumbs={[{ label: "Reserve Vehicle" }]}
      />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* Main Booking Form (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-emerald-900/10 shadow-xl shadow-emerald-950/5">
              <BookingForm 
                preselectedVehicleId={preselectedVehicleId}
                initialRentalType={rentalTypeQuery || "daily"}
                initialPickupLocation={pickupQuery || ""}
                initialPickupDate={dateQuery || ""}
                vehicles={vehicles || []} 
              />
            </div>
          </div>

          {/* Sidebar: Instant Help & Trust Guarantees (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Instant Concierge Channels */}
            <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950 text-white shadow-xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">
                  Prefer Direct Contact?
                </span>
                <h3 className="text-xl font-heading font-black text-white">
                  Instant Booking Desk
                </h3>
                <p className="text-xs text-emerald-200/80 font-medium">
                  Need a car urgently or customized multi-vehicle delegation? Reach our duty manager right away.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-emerald-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block">
                      Direct Hotline
                    </span>
                    <span className="text-sm font-black text-white block">
                      {siteConfig.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    "Hi Jinia Enterprise! I would like to book a vehicle / get an instant rental quote."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 transition-all duration-300 shadow-lg shadow-emerald-500/20 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-950/70 block">
                      WhatsApp Live Desk
                    </span>
                    <span className="text-sm font-black text-emerald-950 block">
                      Instant Chat & Quote
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Jinia Service Guarantees Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-emerald-900/10 shadow-lg space-y-4">
              <h4 className="text-sm font-heading font-black text-emerald-950 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Our Service Promises</span>
              </h4>

              <div className="space-y-3 text-xs text-gray-600 font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">BRTA Licensed Drivers</strong>
                    Police-vetted, disciplined chauffeurs trained in safe city & highway navigation.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Spotless & AC-Maintained Fleet</strong>
                    Clean interiors, fully operational air conditioning, and fuel-efficient engines.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Transparent Fair Billing</strong>
                    Clear fuel, toll, and driver allowance terms agreed upfront with zero surprise fees.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block font-bold">Replacement Vehicle SLA</strong>
                    Immediate replacement vehicle dispatched in case of technical issues.
                  </div>
                </div>
              </div>
            </div>

            {/* Office & Timing */}
            <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 text-xs text-gray-600 space-y-3">
              <div className="flex items-center gap-2 font-bold text-emerald-950">
                <MapPin className="h-4 w-4 text-emerald-700" />
                <span>Dhaka Operations Office</span>
              </div>
              <p className="leading-relaxed">
                {siteConfig.address.line1}, {siteConfig.address.line2}<br />
                {siteConfig.address.area}, {siteConfig.address.city}
              </p>
              <div className="flex items-center gap-2 text-emerald-800 font-semibold pt-1 border-t border-emerald-200/60">
                <Clock className="h-3.5 w-3.5" />
                <span>Helpline: 24 Hours / 7 Days Active</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

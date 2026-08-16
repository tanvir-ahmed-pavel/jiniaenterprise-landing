"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";
import { Users, Fuel, Star, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageCarousel } from "./ImageCarousel";

const formatPrice = (price: number) => "৳" + price.toLocaleString("en-BD");

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
  is_featured?: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

const CATEGORY_COLORS: { [key: string]: string } = {
  Economy: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Standard: "text-blue-700 bg-blue-50 border-blue-200",
  Premium: "text-amber-700 bg-amber-50 border-amber-200",
  SUV: "text-emerald-800 bg-emerald-100 border-emerald-300",
  Microbus: "text-teal-700 bg-teal-50 border-teal-200",
  Bus: "text-indigo-700 bg-indigo-50 border-indigo-200",
};

export const VehicleCard = memo(function VehicleCard({
  vehicle,
  priority = false,
}: VehicleCardProps) {
  const displayImages = useMemo(() => {
    return vehicle.images && vehicle.images.length > 0
      ? vehicle.images
      : vehicle.image_url
      ? [vehicle.image_url]
      : [];
  }, [vehicle.images, vehicle.image_url]);

  return (
    <div className="group/card block h-full relative">
      <div className="glass-card flex flex-col h-full overflow-hidden border border-white/80 hover:border-emerald-300/80 transition-all duration-300 rounded-3xl shadow-[0_4px_20px_-4px_rgba(10,25,18,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(16,185,129,0.15)] transform-gpu relative">
        {/* Visual Header / Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-emerald-950/5">
          <ImageCarousel
            images={displayImages}
            vehicleName={vehicle.name}
            priority={priority}
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20 pointer-events-none">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-xs",
                CATEGORY_COLORS[vehicle.category] || "text-gray-700 bg-white/95 border-gray-200"
              )}
            >
              {vehicle.category}
            </span>

            {vehicle.is_featured && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-linear-to-r from-amber-400 to-amber-500 text-emerald-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                <Star className="h-3 w-3 fill-current" />
                <span>VIP Choice</span>
              </span>
            )}
          </div>

          {/* Price Tag — Prominent Luxury Label */}
          {vehicle.starting_price && (
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
              <div className="px-3 py-1.5 bg-white/95 rounded-xl border border-white/80 shadow-sm">
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block leading-none mb-0.5">
                  Rates From
                </span>
                <span className="text-sm font-black text-emerald-950 leading-none">
                  {formatPrice(vehicle.starting_price)}
                  <span className="text-[10px] font-semibold text-emerald-700 ml-1">
                    /{vehicle.price_label || "day"}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 gap-4">
          <div className="space-y-1">
            <Link href={`/vehicles/${vehicle.slug}`} className="focus:outline-none">
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-emerald-950 group-hover/card:text-emerald-700 transition-colors duration-200 line-clamp-1">
                {vehicle.name}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 line-clamp-1 font-medium">
              {vehicle.description || "Executive chauffeur & premium comfort for your travel."}
            </p>
          </div>

          {/* Spec Grid */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-black/5 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/50">
              <Users className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold text-emerald-950 truncate">
                {vehicle.seats} Seats
              </span>
            </div>

            {vehicle.engine_cc ? (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/50">
                <Fuel className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold text-emerald-950 truncate">
                  {vehicle.engine_cc} CC
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/50">
                <Star className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span className="font-semibold text-emerald-950 truncate">
                  AC & Chauffeur
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 col-span-2 p-2 rounded-xl bg-blue-50/40">
              <Calendar className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span className="font-semibold text-gray-700 line-clamp-1">
                {vehicle.rental_types?.slice(0, 3).join(" • ") || "Daily • Monthly • Corporate"}
              </span>
            </div>
          </div>

          {/* Animated Footer Action */}
          <div className="mt-auto pt-2">
            <Link
              href={`/vehicles/${vehicle.slug}`}
              className="flex items-center justify-between text-emerald-900 font-bold text-xs uppercase tracking-wider focus:outline-none"
            >
              <span>Explore Fleet Details</span>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100/80 text-emerald-800 group-hover/card:bg-emerald-900 group-hover/card:text-white transition-all duration-200 shadow-xs">
                <ArrowRight className="h-3.5 w-3.5 group-hover/card:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

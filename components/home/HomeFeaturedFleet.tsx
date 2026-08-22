"use client";

import React, { useState } from "react";
import Link from "next/link";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { VehicleDetailsModal, ModalVehicle } from "@/components/vehicles/VehicleDetailsModal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Car } from "lucide-react";

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

interface HomeFeaturedFleetProps {
  vehicles: Vehicle[];
}

export function HomeFeaturedFleet({ vehicles }: HomeFeaturedFleetProps) {
  const [inspectVehicle, setInspectVehicle] = useState<ModalVehicle | null>(null);

  if (!vehicles || vehicles.length === 0) return null;

  return (
    <>
      {/* Featured Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {vehicles.map((vehicle, idx) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            priority={idx < 3}
            onQuickInspect={() => setInspectVehicle(vehicle)}
          />
        ))}
      </div>

      {/* Prominent Bottom Collection CTA */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <Link href="/vehicles" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-white font-black uppercase tracking-wider text-xs shadow-xl shadow-emerald-950/10 hover:scale-102 transition-all duration-300 gap-3 cursor-pointer group"
          >
            <Car className="h-4 w-4 text-emerald-400" />
            <span>Explore Complete Fleet & Bus Collection</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Interactive Details Modal */}
      <VehicleDetailsModal
        vehicle={inspectVehicle}
        onClose={() => setInspectVehicle(null)}
      />
    </>
  );
}

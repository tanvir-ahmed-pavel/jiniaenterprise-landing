"use client";

import { useState, useMemo } from "react";
import { VehicleCard } from "./VehicleCard";
import { Sparkles, Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
  seats: number;
  engine_cc?: number | null;
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

interface VehicleGridProps {
  vehicles: Vehicle[];
}

const CATEGORIES = ["All", "Economy", "Standard", "Premium", "SUV", "Microbus", "Bus"] as const;

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredVehicles = useMemo(() => {
    if (selectedCategory === "All") return vehicles;
    return vehicles.filter((v) => v.category === selectedCategory);
  }, [vehicles, selectedCategory]);

  // Compute vehicle count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: vehicles.length };
    vehicles.forEach((v) => {
      counts[v.category] = (counts[v.category] || 0) + 1;
    });
    return counts;
  }, [vehicles]);

  return (
    <div className="space-y-12 mb-24">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
        {CATEGORIES.map((category) => {
          const count = categoryCounts[category] || 0;
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 border",
                isSelected
                  ? "bg-emerald-900 text-white border-emerald-900 shadow-md shadow-emerald-900/10"
                  : "bg-white/80 hover:bg-emerald-50 text-emerald-950/80 border-emerald-950/10 hover:border-emerald-300"
              )}
            >
              <span>{category}</span>
              {count > 0 && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-extrabold",
                    isSelected ? "bg-emerald-800 text-emerald-100" : "bg-emerald-100/70 text-emerald-800"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid of Vehicles */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredVehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index * 40, 240)}ms` }}
            >
              <VehicleCard vehicle={vehicle} priority={index < 3} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-card max-w-xl mx-auto rounded-3xl p-8 border border-white/80">
          <Car className="h-12 w-12 text-emerald-700/30 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-emerald-950 mb-1">
            No {selectedCategory} Vehicles Available
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            We currently don't have vehicles listed under this category. Please check other categories or contact our concierge.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="px-6 py-2.5 rounded-full bg-emerald-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-800 transition-colors"
          >
            Show All Fleet
          </button>
        </div>
      )}
    </div>
  );
}


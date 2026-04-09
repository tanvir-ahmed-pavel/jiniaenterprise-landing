import Link from "next/link";
import { Users, Calendar, ArrowRight, Fuel, Star } from "lucide-react";
import { ImageCarousel } from "@/components/vehicles/ImageCarousel";
import { cn } from "@/lib/utils";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
  seats: number;
  engine_cc?: number | null;
  rental_types?: string[];
  image_url?: string | null;
  images?: string[];
  starting_price?: number | null;
  price_label?: string;
  description?: string;
  is_featured: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const categoryColors: Record<string, string> = {
    Economy: "text-emerald-600 bg-emerald-50 border-emerald-100",
    Standard: "text-blue-600 bg-blue-50 border-blue-100",
    Premium: "text-amber-600 bg-amber-50 border-amber-100",
    SUV: "text-purple-600 bg-purple-50 border-purple-100",
    Microbus: "text-teal-600 bg-teal-50 border-teal-100",
    Bus: "text-indigo-600 bg-indigo-50 border-indigo-100",
  };

  const displayImages = vehicle.images || (vehicle.image_url ? [vehicle.image_url] : []);

  return (
    <Link 
      href={`/vehicles/${vehicle.slug}`} 
      className="group/card block h-full focus:outline-none"
    >
      <div className="glass-card flex flex-col h-full overflow-hidden border-white/40 ring-1 ring-black/5">
        {/* Visual Header / Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <ImageCarousel 
            images={displayImages} 
            vehicleName={vehicle.name} 
            priority={priority}
          />
          
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20 pointer-events-none">
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border shadow-sm",
              categoryColors[vehicle.category] || "text-gray-600 bg-white/80 border-white"
            )}>
              {vehicle.category}
            </span>
            
            {vehicle.is_featured && (
              <span className="p-1.5 rounded-full bg-amber-400 text-white shadow-lg animate-float">
                <Star className="h-3 w-3 fill-current" />
              </span>
            )}
          </div>

          {/* Price Tag — Minimalist */}
          {vehicle.starting_price && (
            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl border border-white/50 shadow-sm">
                <span className="text-[10px] text-gray-500 block leading-none mb-0.5">Starts from</span>
                <span className="text-sm font-black text-green-900 leading-none">
                  {formatPrice(vehicle.starting_price)}
                  <span className="text-[10px] font-normal text-gray-400 ml-1">/{vehicle.price_label || "day"}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1 gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-heading font-extrabold text-green-950 group-hover/card:text-green-700 transition-colors duration-300 line-clamp-1">
              {vehicle.name}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-1 font-medium">
              {vehicle.description || "Premium comfort for your journey."}
            </p>
          </div>

          {/* Spec Grid — More Dynamic Layout */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2 border-t border-black/[0.03]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <Users className="h-3.5 w-3.5 text-green-600" />
              </div>
              <span className="text-xs font-semibold text-gray-700">{vehicle.seats} Seats</span>
            </div>
            
            {vehicle.engine_cc && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <Fuel className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <span className="text-xs font-semibold text-gray-700">{vehicle.engine_cc} CC</span>
              </div>
            )}

            <div className="flex items-center gap-2 col-span-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Calendar className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <span className="text-xs font-semibold text-gray-700 line-clamp-1">
                {vehicle.rental_types?.slice(0, 2).join(" • ") || "Daily/Monthly"}
              </span>
            </div>
          </div>

          {/* Animated Footer Action */}
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between group/btn text-green-800 font-bold text-sm tracking-tight transition-all">
              <span>View Details</span>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-700 group-hover/card:bg-green-600 group-hover/card:text-white transition-all duration-500 ease-out shadow-sm group-hover/card:shadow-green-200">
                <ArrowRight className="h-4 w-4 group-hover/card:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, ArrowRight, Fuel } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Luxury" | "Bus";
  seats: number;
  engine_cc?: number | null;
  rental_types?: string[];
  image_url?: string | null;
  images?: string[];
  starting_price?: number | null;
  price_label?: string;
  description?: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const categoryStyles = {
    Economy:
      "bg-green-500/15 text-green-700 border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]",
    Luxury:
      "bg-amber-500/15 text-amber-700 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    Bus: "bg-blue-500/15 text-blue-700 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
  };

  const displayImage = vehicle.images?.[0] || vehicle.image_url;

  return (
    <Card className="overflow-hidden cursor-pointer group">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-50/50 to-green-100/50 overflow-hidden">
        {displayImage ? (
          <img
            src={displayImage}
            alt={vehicle.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <span className="text-green-400/60 text-lg font-medium">
              {vehicle.name}
            </span>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
              categoryStyles[vehicle.category]
            }`}
          >
            {vehicle.category}
          </span>
        </div>

        {/* Price Badge */}
        {vehicle.starting_price && (
          <div className="absolute bottom-3 right-3">
            <div
              className="px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/30 shadow-lg"
              style={{ background: "rgba(255, 255, 255, 0.7)" }}
            >
              <p className="text-[10px] text-gray-600">Starting from</p>
              <p className="text-green-800 font-bold text-sm">
                {formatPrice(vehicle.starting_price)}
                <span className="text-[10px] font-normal text-gray-500 ml-1">
                  /{vehicle.price_label || "day"}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-green-800 group-hover:text-green-600 transition-colors duration-300">
          {vehicle.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 pb-2">
        {/* Seats & Engine */}
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg icon-glow flex items-center justify-center">
              <Users className="h-3.5 w-3.5 text-green-600" />
            </div>
            <span className="text-sm">{vehicle.seats} Seats</span>
          </div>
          {vehicle.engine_cc && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg icon-glow flex items-center justify-center">
                <Fuel className="h-3.5 w-3.5 text-green-600" />
              </div>
              <span className="text-sm">{vehicle.engine_cc} CC</span>
            </div>
          )}
        </div>

        {/* Rental Types */}
        <div className="flex items-center gap-2 text-gray-600">
          <div className="w-6 h-6 rounded-lg icon-glow flex items-center justify-center">
            <Calendar className="h-3.5 w-3.5 text-green-600" />
          </div>
          <span className="text-sm">
            {vehicle.rental_types?.slice(0, 3).join(", ") || "Daily"}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/vehicles/${vehicle.slug}`} className="w-full">
          <Button variant="outline" className="w-full gap-2">
            View Details{" "}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

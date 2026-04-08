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
import { ImageCarousel } from "@/components/vehicles/ImageCarousel";

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
  const categoryStyles: Record<string, string> = {
    Economy: "bg-green-100 text-green-900 border-green-300 shadow-md",
    Standard: "bg-blue-100 text-blue-900 border-blue-300 shadow-md",
    Premium: "bg-amber-100 text-amber-900 border-amber-300 shadow-md",
    SUV: "bg-purple-100 text-purple-900 border-purple-300 shadow-md",
    Microbus: "bg-teal-100 text-teal-900 border-teal-300 shadow-md",
    Bus: "bg-indigo-100 text-indigo-900 border-indigo-300 shadow-md",
  };

  const displayImage = vehicle.images?.[0] || vehicle.image_url;

  return (
    <Link href={`/vehicles/${vehicle.slug}`} className="block h-full group focus:outline-none focus:ring-2 focus:ring-green-500 rounded-xl">
      <Card className="overflow-hidden h-full cursor-pointer hover:shadow-[0_8px_30px_rgba(34,197,94,0.12)]">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-50/50 to-green-100/50 overflow-hidden">
        {displayImage ? (
          <ImageCarousel images={vehicle.images || (vehicle.image_url ? [vehicle.image_url] : [])} vehicleName={vehicle.name} />
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
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
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
        <Button variant="outline" className="w-full gap-2 pointer-events-none group-hover:bg-green-50 group-hover:text-green-700 group-hover:border-green-200">
          View Details{" "}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardFooter>
    </Card>
    </Link>
  );
}

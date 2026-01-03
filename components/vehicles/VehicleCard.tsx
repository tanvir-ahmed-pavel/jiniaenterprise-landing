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

// Format price in BDT
function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const categoryColors = {
    Economy: "bg-green-100 text-green-700",
    Luxury: "bg-amber-100 text-amber-700",
    Bus: "bg-blue-100 text-blue-700",
  };

  // Use first image from images array, fallback to image_url
  const displayImage = vehicle.images?.[0] || vehicle.image_url;

  return (
    <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 cursor-pointer border-green-100 hover:border-green-300 group">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
        {displayImage ? (
          <img
            src={displayImage}
            alt={vehicle.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-green-300 text-lg font-medium">
              {vehicle.name}
            </span>
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              categoryColors[vehicle.category]
            }`}
          >
            {vehicle.category}
          </span>
        </div>
        {/* Price Badge */}
        {vehicle.starting_price && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-green-700 font-bold">
                {formatPrice(vehicle.starting_price)}
                <span className="text-xs font-normal text-gray-500 ml-1">
                  /{vehicle.price_label || "day"}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-green-800 group-hover:text-green-600 transition-colors">
          {vehicle.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 pb-2">
        {/* Seats & Engine */}
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-green-600" />
            <span className="text-sm">{vehicle.seats} Seats</span>
          </div>
          {vehicle.engine_cc && (
            <div className="flex items-center gap-1">
              <Fuel className="h-4 w-4 text-green-600" />
              <span className="text-sm">{vehicle.engine_cc} CC</span>
            </div>
          )}
        </div>

        {/* Rental Types */}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4 text-green-600" />
          <span className="text-sm">
            {vehicle.rental_types?.slice(0, 3).join(", ") || "Daily"}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/vehicles/${vehicle.slug}`} className="w-full">
          <Button variant="outline" className="w-full gap-2">
            View Details{" "}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

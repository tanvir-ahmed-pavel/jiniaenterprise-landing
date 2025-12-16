import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, ArrowRight } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Luxury" | "Bus";
  seats: number;
  rental_types: string[];
  image_url: string;
  description?: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const categoryColors = {
    Economy: "bg-green-100 text-green-700",
    Luxury: "bg-amber-100 text-amber-700",
    Bus: "bg-blue-100 text-blue-700",
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 cursor-pointer border-green-100 hover:border-green-300 group">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <span className="text-green-300 text-lg font-medium">
            {vehicle.name}
          </span>
        </div>
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
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-green-800 group-hover:text-green-600 transition-colors">
          {vehicle.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 pb-2">
        {/* Seats */}
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="h-4 w-4 text-green-600" />
          <span className="text-sm">{vehicle.seats} Seats</span>
        </div>

        {/* Rental Types */}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4 text-green-600" />
          <span className="text-sm">
            {vehicle.rental_types.slice(0, 3).join(", ")}
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

import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { createClient } from "@/lib/supabase/server";
import { Phone, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Vehicle Fleet | Jinia Enterprise",
  description:
    "Browse our fleet of well-maintained vehicles including sedans, SUVs, vans, and buses for daily, weekly, and monthly rental in Dhaka.",
};

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Luxury" | "Bus";
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
}

async function getVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }

  return (data as Vehicle[]) || [];
}

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  const categories = ["All", "Economy", "Luxury", "Bus"] as const;

  return (
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-heading font-bold text-green-700">
            Our Vehicle Fleet
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of well-maintained vehicles. All vehicles
            are first-hand and maintained in excellent condition.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-green-100 text-green-700 hover:bg-green-200"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-16">
            <p className="text-gray-500 text-lg">
              No vehicles available at the moment. Please check back later.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-green-600 text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
            Contact us directly and we&apos;ll help you find the perfect vehicle
            for your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+8801716633445">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-white text-green-700 hover:bg-green-50 font-bold"
              >
                <Phone className="h-5 w-5" /> Call Now
              </Button>
            </a>
            <a
              href="https://wa.me/8801716633445"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2 bg-transparent text-white border-white hover:bg-white hover:text-green-700"
              >
                <MessageSquare className="h-5 w-5" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

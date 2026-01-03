import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InquiryForm } from "@/components/forms/InquiryForm";
import {
  Users,
  Check,
  Phone,
  MessageSquare,
  Car,
  Fuel,
  Tag,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

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

// Fetch vehicle data from Supabase
async function getVehicle(slug: string): Promise<Vehicle | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Vehicle;
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);

  if (!vehicle) {
    return { title: "Vehicle Not Found" };
  }

  return {
    title: `${vehicle.name} for Rent | Jinia Enterprise`,
    description:
      vehicle.description || `Rent a ${vehicle.name} with Jinia Enterprise.`,
  };
}

// Generate static params for build time optimization (optional but good for performance)
export async function generateStaticParams() {
  const supabase = createStaticClient();

  if (!supabase) return [];

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("slug")
    .eq("is_active", true);

  return (
    (vehicles as unknown as { slug: string }[])?.map((vehicle) => ({
      slug: vehicle.slug,
    })) || []
  );
}

export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);

  if (!vehicle) {
    notFound();
  }

  const categoryColors = {
    Economy: "bg-green-500",
    Luxury: "bg-amber-500",
    Bus: "bg-blue-500",
  };

  // Use first image from images array or fallback to image_url
  const displayImage = vehicle.images?.[0] || vehicle.image_url;

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Vehicle Info */}
          <div className="space-y-6">
            {/* Image Gallery */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="h-24 w-24 text-gray-300" />
                </div>
              )}
              <Badge
                className={`absolute top-4 left-4 ${
                  categoryColors[vehicle.category]
                } text-white`}
              >
                {vehicle.category}
              </Badge>
            </div>

            {/* Price Card if available */}
            {vehicle.starting_price && (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                <span className="text-gray-600 font-medium">
                  Starting Price
                </span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-700">
                    {formatPrice(vehicle.starting_price)}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    / {vehicle.price_label || "day"}
                  </span>
                </div>
              </div>
            )}

            {/* Vehicle Details */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-heading font-bold">
                {vehicle.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <Users className="h-4 w-4" />
                  {vehicle.seats} Seats
                </span>

                {vehicle.engine_cc && (
                  <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    <Fuel className="h-4 w-4" />
                    {vehicle.engine_cc} CC
                  </span>
                )}

                <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <Tag className="h-4 w-4" />
                  {vehicle.category} Class
                </span>
              </div>

              {vehicle.description && (
                <div
                  className="text-gray-600 leading-relaxed prose prose-green max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: vehicle.description.replace(/\n/g, "<br/>"),
                  }}
                />
              )}

              {/* Rental Types */}
              {vehicle.rental_types && vehicle.rental_types.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="font-semibold">Available For:</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.rental_types.map((type) => (
                      <Badge key={type} variant="secondary">
                        {type} Rental
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="font-semibold">Features:</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Check className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Contact */}
              <div className="flex gap-3 pt-4">
                <a href={`tel:${siteConfig.phone}`} className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I'm interested in renting the ${vehicle.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white border-none">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Request a Quote</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <InquiryForm
                  vehicleName={vehicle.name}
                  vehicleId={vehicle.id}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

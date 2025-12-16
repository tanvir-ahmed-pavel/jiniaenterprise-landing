import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { sampleVehicles } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Users, Check, Phone, MessageSquare, Car } from "lucide-react";
import { siteConfig } from "@/lib/config";

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = sampleVehicles.find((v) => v.slug === slug);

  if (!vehicle) {
    return { title: "Vehicle Not Found" };
  }

  return {
    title: `${vehicle.name} for Rent | Jinia Enterprise`,
    description: vehicle.description,
  };
}

export async function generateStaticParams() {
  return sampleVehicles.map((vehicle) => ({
    slug: vehicle.slug,
  }));
}

export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = sampleVehicles.find((v) => v.slug === slug);

  if (!vehicle) {
    notFound();
  }

  const categoryColors = {
    Economy: "bg-blue-500",
    Luxury: "bg-amber-500",
    Bus: "bg-green-500",
  };

  return (
    <div className="py-12">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Vehicle Info */}
          <div className="space-y-6">
            {/* Image Gallery */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted">
              {vehicle.image_url ? (
                <Image
                  src={vehicle.image_url}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Car className="h-24 w-24 text-muted-foreground/30" />
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

            {/* Vehicle Details */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-heading font-bold">
                {vehicle.name}
              </h1>

              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {vehicle.seats} Seats
                </span>
                <span className="text-sm">•</span>
                <span>{vehicle.category} Class</span>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {vehicle.description}
              </p>

              {/* Rental Types */}
              <div className="space-y-2">
                <h3 className="font-semibold">Available For:</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.rental_types.map((type) => (
                    <Badge key={type} variant="secondary">
                      {type} Rental
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h3 className="font-semibold">Features:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {vehicle.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

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
                  <Button className="w-full gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white">
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

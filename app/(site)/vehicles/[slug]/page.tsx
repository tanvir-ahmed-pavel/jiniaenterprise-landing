import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ImageCarousel } from "@/components/vehicles/ImageCarousel";
import {
  Users,
  Check,
  Phone,
  MessageSquare,
  Fuel,
  Tag,
} from "lucide-react";
import { sampleVehicles, siteConfig } from "@/lib/config";
import { createStaticClient } from "@/lib/supabase/static";
import { createMetadata } from "@/lib/seo/metadata";
import { orderVehicleImages } from "@/lib/vehicles/images";
import { RESPONSE_PROMISE, getTelHref, getWhatsAppHref } from "@/lib/business/identity";
import { CITY_DAY_HOURS, PRICE_EXTRAS, fleetPrices, formatBdt, getFleetPrice, getQuotablePriceSentence } from "@/content/fleet-prices";
import { getPublicVehicleSlug, getStoredSlugCandidates, getVehiclePath } from "@/lib/vehicles/slugs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbSchema,
  getVehicleSchema,
} from "@/lib/seo/schema";

// Rebuilt in the background at most every 5 minutes, so admin edits show up
// without a redeploy.
export const revalidate = 300;

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
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
  sort_order: number;
  is_featured: boolean;
}

// Fetch vehicle data from Supabase
// Cookie-free client: public data, and reading cookies would make a slug that
// was not prebuilt at deploy time fail to render.
async function getVehicle(slug: string): Promise<Vehicle | null> {
  const supabase = createStaticClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("id,name,slug,category,seats,engine_cc,features,rental_types,description,images,image_url,starting_price,price_label,is_active,sort_order,is_featured")
      .in("slug", getStoredSlugCandidates(slug))
      .limit(1)
      .maybeSingle();

    if (!error && data) return data as Vehicle;
  }

  const candidates = getStoredSlugCandidates(slug);
  return (sampleVehicles as unknown as Vehicle[]).find((vehicle) => candidates.includes(vehicle.slug)) || null;
}

/**
 * Names, price and the quotable sentence come from the shared price table
 * when the vehicle is listed there, so the page, its JSON-LD, the cards, the
 * pricing page and the estimator can never disagree.
 */
function describeVehicle(vehicle: Vehicle) {
  const row = getFleetPrice(vehicle.slug);
  const model = row?.model ?? vehicle.name.replace(/\s*\(.*\)\s*$/, "").trim();
  const years = row?.years;
  const seats = row?.seats ?? vehicle.seats;
  const dayRate = row ? row.dayRate : vehicle.starting_price ?? null;
  // Two units of the same model (Noah, Prado, H1) need the years in the
  // title, or both pages would share one.
  const sharedModel = fleetPrices.filter((r) => r.model === model).length > 1;
  const title = `${model}${sharedModel && years ? ` ${years}` : ""} Rental with Driver in Dhaka | ${seats} Seats`;
  const heading = `${model}${years ? ` (${years})` : ""} rental with driver`;
  const sentence = row
    ? getQuotablePriceSentence({ ...row, dayRate })
    : getQuotablePriceSentence({
        slug: vehicle.slug,
        name: vehicle.name,
        model,
        seats,
        kind: "Sedan",
        dayRate,
        monthlyFrom: null,
      });
  return { row, model, years, seats, dayRate, title, heading, sentence };
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

  const facts = describeVehicle(vehicle);

  return createMetadata({
    title: facts.title,
    description: facts.sentence,
    path: getVehiclePath(vehicle.slug),
    image: orderVehicleImages(vehicle.images, vehicle.image_url)[0] || undefined,
  });
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
      slug: getPublicVehicleSlug(vehicle.slug),
    })) || []
  );
}

export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);

  if (!vehicle) {
    notFound();
  }

  const facts = describeVehicle(vehicle);
  const photoAlt = `${facts.model} ${facts.seats}-seater ${facts.row?.kind.toLowerCase() ?? "car"} for rent with driver in Dhaka`;

  const description =
    vehicle.description ||
    `Rent a ${vehicle.name} with a professional driver in Dhaka.`;

  return (
    <div className="pb-24 pt-28 sm:pt-36">
      <JsonLd
        data={[
          getVehicleSchema({
            name: vehicle.name,
            description,
            path: getVehiclePath(vehicle.slug),
            image: orderVehicleImages(vehicle.images, vehicle.image_url)[0],
            seats: facts.seats,
            category: vehicle.category,
            dayRate: facts.dayRate,
          }),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Fleet", path: "/vehicles" },
            { name: vehicle.name, path: getVehiclePath(vehicle.slug) },
          ]),
        ]}
      />
      <div className="container">
        <div className="mb-12 max-w-3xl">
          <p className="border-l-2 border-amber-400 pl-3 text-[11px] font-medium uppercase tracking-[0.08em] text-emerald-700">Jinia Fleet / {vehicle.category}</p>
          <h1 className="mt-5 text-4xl font-heading font-medium leading-[0.98] text-emerald-950 sm:text-6xl">{facts.heading}</h1>
          {/* One self-contained sentence an assistant can quote as-is. */}
          <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-emerald-950/75 sm:text-lg">{facts.sentence}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Vehicle Info */}
          <div className="space-y-6">
            {/* Image Gallery */}
            <div className="relative aspect-16/10 overflow-hidden rounded-lg border border-emerald-950/15 bg-[#fbfcfa]">
              <ImageCarousel
                images={orderVehicleImages(vehicle.images, vehicle.image_url)}
                vehicleName={facts.model}
                alt={photoAlt}
                priority
              />
              <span className="absolute left-4 top-4 z-30 border-l-2 border-amber-400 bg-white/90 py-1 pl-2.5 pr-3 text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-950">
                {vehicle.category}
              </span>
            </div>

            {/* One price, one unit. Monthly is stated separately so a reader
                never has to guess which period a number covers. */}
            <dl className="grid grid-cols-2 border-y border-emerald-950/15 py-4 tabular-nums">
              <div>
                <dt className="text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-950/55">Day rate</dt>
                <dd className="mt-1 text-emerald-950">
                  {facts.dayRate ? (
                    <>
                      <span className="text-2xl font-heading font-medium">From {formatBdt(facts.dayRate)}</span>
                      <span className="text-sm text-emerald-950/60"> / day</span>
                      <span className="mt-1 block text-xs text-emerald-950/55">{CITY_DAY_HOURS}, Dhaka city</span>
                    </>
                  ) : (
                    <span className="text-base font-medium">Quoted on request</span>
                  )}
                </dd>
              </div>
              <div className="border-l border-emerald-950/10 pl-4">
                <dt className="text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-950/55">Monthly</dt>
                <dd className="mt-1 text-emerald-950">
                  {facts.row?.monthlyFrom ? (
                    <span className="text-2xl font-heading font-medium">From {formatBdt(facts.row.monthlyFrom)}</span>
                  ) : (
                    <span className="text-base font-medium">Quoted for your hours</span>
                  )}
                </dd>
              </div>
            </dl>
            <p className="text-sm leading-relaxed text-emerald-950/60">
              {PRICE_EXTRAS}{" "}
              <Link href="/policies/overtime-and-fuel" className="underline underline-offset-4">Overtime &amp; fuel policy</Link>
            </p>

            {/* Vehicle Details */}
            <div className="space-y-6">

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-emerald-950/10 pb-5 text-emerald-950/65">
                <span className="flex items-center gap-2 text-sm tabular-nums">
                  <Users className="h-4 w-4" />
                  {facts.seats} seats · with driver
                </span>

                {vehicle.engine_cc && (
                  <span className="flex items-center gap-2 text-sm">
                    <Fuel className="h-4 w-4" />
                    {vehicle.engine_cc} CC
                  </span>
                )}

                <span className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4" />
                  {vehicle.category} Class
                </span>
              </div>

              {vehicle.description && (
                <div
                  className="max-w-none text-base leading-relaxed text-emerald-950/65"
                  dangerouslySetInnerHTML={{
                    __html: vehicle.description.replace(/\n/g, "<br/>"),
                  }}
                />
              )}

              {/* Rental Types */}
              {vehicle.rental_types && vehicle.rental_types.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-950/55">Available for</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {vehicle.rental_types.map((type) => (
                      <span key={type} className="border-b border-emerald-950/20 pb-1 text-sm font-normal text-emerald-950">{type} rental</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {vehicle.features && vehicle.features.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-[10px] font-medium uppercase tracking-[0.05em] text-emerald-950/55">Features</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-emerald-950/65"
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
                <a href={getTelHref()} className="flex-1">
                  <Button variant="outline" className="w-full gap-2 rounded-lg border-emerald-950/25">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                </a>
                <a
                  href={getWhatsAppHref(`Hi Jinia, I'd like to rent the ${facts.heading.replace(" rental with driver", "")} with driver.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full gap-2 rounded-lg bg-emerald-950 text-white hover:bg-emerald-800">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div>
            <Card className="sticky top-24 rounded-lg border-emerald-950/15 bg-white shadow-none">
              <CardHeader>
                <CardTitle>Request a Quote</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below. {RESPONSE_PROMISE.sentence}
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

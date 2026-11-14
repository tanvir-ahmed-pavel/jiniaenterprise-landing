import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { RequestProvider } from "@/components/trip/RequestProvider";
import { classOfName, hireTerms } from "@/lib/vehicles/fleet";
import { SimilarCars, VehicleActions, VehicleStage } from "@/components/trip/VehicleDetail";
import { getFleetRows, toStoreVehicles, type FleetRow } from "@/lib/vehicles/store";
import { sampleVehicles, siteConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { createMetadata } from "@/lib/seo/metadata";
import { orderVehicleImages } from "@/lib/vehicles/images";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbSchema,
  getVehicleSchema,
} from "@/lib/seo/schema";

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
async function getVehicle(slug: string): Promise<Vehicle | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("id,name,slug,category,seats,engine_cc,features,rental_types,description,images,image_url,starting_price,price_label,is_active,sort_order,is_featured")
    .eq("slug", slug)
    .single();

  if (!error && data) return data as Vehicle;

  return (sampleVehicles as unknown as Vehicle[]).find((vehicle) => vehicle.slug === slug) || null;
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

  const description =
    vehicle.description ||
    `Rent a ${vehicle.name} with a professional driver in Dhaka from Jinia Enterprise.`;

  return createMetadata({
    title: `${vehicle.name} Rental in Dhaka | With Driver`,
    description,
    path: `/vehicles/${vehicle.slug}`,
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
      slug: vehicle.slug,
    })) || []
  );
}

export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const [vehicle, rows] = await Promise.all([getVehicle(slug), getFleetRows()]);

  if (!vehicle) {
    notFound();
  }

  const [car] = toStoreVehicles([vehicle as unknown as FleetRow]);
  const cls = classOfName(car.name);
  const similar = toStoreVehicles(rows)
    .filter((v) => v.id !== car.id && cls && classOfName(v.name)?.id === cls.id)
    .slice(0, 3);

  const description =
    vehicle.description ||
    `Rent a ${vehicle.name} with a professional driver in Dhaka.`;

  // "Hyundai H1 (2019-20)" → name in grotesk, model years in the serif accent.
  const name = vehicle.name.trim();
  const yearAt = name.indexOf("(");
  const title = yearAt > 0 ? name.slice(0, yearAt).trim() : name;
  const years = yearAt > 0 ? name.slice(yearAt).replace(/[()]/g, "").trim() : "";
  const ac = car.features.some((f) => /air/i.test(f));

  const specs = [
    { k: "Seats", v: String(vehicle.seats) },
    { k: "Driver", v: "Included" },
    { k: "Hire", v: hireTerms(car.rental_types) },
    vehicle.engine_cc ? { k: "Engine", v: `${vehicle.engine_cc} cc` } : { k: "Cabin", v: ac ? "Air-conditioned" : "Standard" },
  ];

  return (
    <RequestProvider>
      <div className="bg-white pb-24 pt-24 text-ink sm:pt-32">
        <JsonLd
          data={[
            getVehicleSchema({
              name: vehicle.name,
              description,
              path: `/vehicles/${vehicle.slug}`,
              image: orderVehicleImages(vehicle.images, vehicle.image_url)[0],
              seats: vehicle.seats,
              category: vehicle.category,
            }),
            getBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Fleet", path: "/vehicles" },
              { name: vehicle.name, path: `/vehicles/${vehicle.slug}` },
            ]),
          ]}
        />

        <div className="container">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 text-[0.8rem] text-ink/45">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span aria-hidden className="text-ink/25">/</span>
            <Link href="/vehicles" className="hover:text-ink">Fleet</Link>
            <span aria-hidden className="text-ink/25">/</span>
            <span aria-current="page" className="text-ink/70">{title}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">{cls?.label ?? vehicle.category} · {vehicle.seats} seats</p>
              <h1 className="type-display mt-3 font-heading text-[clamp(2.6rem,8vw,5.2rem)] [overflow-wrap:anywhere]">
                {title}
                {years && <> <span className="type-accent text-gold-deep">{years}</span></>}
              </h1>
              <div className="mt-8">
                <VehicleStage v={car} />
              </div>
            </div>

            <aside className="min-w-0 lg:col-span-5 lg:pt-24">
              <div className="lg:sticky lg:top-28">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/45">Day rate from</p>
                <p className="mt-1 font-heading text-[clamp(2.4rem,6vw,3.4rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                  {vehicle.starting_price ? `৳${vehicle.starting_price.toLocaleString("en-US")}` : "On request"}
                </p>
                <p className="mt-2 text-sm text-ink/55">With driver, inside Dhaka. Fuel, hours and overtime are spelled out in your quote.</p>

                <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10">
                  {specs.map((s) => (
                    <div key={s.k} className="bg-paper-deep p-4">
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">{s.k}</dt>
                      <dd className="mt-1 text-sm font-semibold">{s.v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6">
                  <VehicleActions v={car} whatsapp={siteConfig.whatsapp} phone={siteConfig.phone} />
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-16 grid gap-12 border-t border-ink/10 pt-12 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <h2 className="type-display font-heading text-[clamp(2rem,5vw,3.2rem)]">About <span className="type-accent text-gold-deep">this car.</span></h2>
              <p className="mt-5 max-w-2xl whitespace-pre-line text-base leading-relaxed text-ink/65">{description}</p>
              {car.features.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2">
                  {car.features.map((f) => (
                    <li key={f} className="rounded-full bg-paper-deep px-3.5 py-2 text-sm font-medium">{f}</li>
                  ))}
                </ul>
              )}
              {vehicle.rental_types?.length > 0 && (
                <p className="mt-6 text-sm text-ink/55">Available for {vehicle.rental_types.map((t) => t.toLowerCase()).join(", ")} hire.</p>
              )}
            </div>

            <div className="min-w-0 lg:col-span-5">
              <h2 className="type-heading font-heading text-2xl">Rather write it out?</h2>
              <p className="mt-2 text-sm text-ink/55">Send the details and the desk replies with a quote.</p>
              <div className="mt-6 rounded-[1.6rem] bg-paper-deep p-5 sm:p-7">
                <InquiryForm vehicleName={vehicle.name} vehicleId={vehicle.id} />
              </div>
            </div>
          </div>

          {similar.length > 0 && (
            <section className="mt-20">
              <div className="mb-6 flex items-end justify-between gap-4">
                <h2 className="type-display font-heading text-[clamp(2rem,5vw,3.2rem)]">Also in <span className="type-accent text-gold-deep">{cls?.label ?? "the fleet"}.</span></h2>
                <Link href="/vehicles" className="shrink-0 text-sm font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">All cars</Link>
              </div>
              <SimilarCars list={similar} />
            </section>
          )}
        </div>
      </div>
    </RequestProvider>
  );
}

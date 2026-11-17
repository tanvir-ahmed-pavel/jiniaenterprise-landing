import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { RequestProvider } from "@/components/trip/RequestProvider";
import { plainText, specRows } from "@/lib/vehicles/details";
import { classOfName, hireTerms } from "@/lib/vehicles/fleet";
import { PickThisCar, SimilarCars, VehicleActions, VehicleStage } from "@/components/trip/VehicleDetail";
import { getFleetRows, toStoreVehicles, type FleetRow } from "@/lib/vehicles/store";
import { sampleVehicles, siteConfig } from "@/lib/config";
import { createPublicReadClient } from "@/lib/supabase/static";
import { createStaticClient } from "@/lib/supabase/static";
import { createMetadata } from "@/lib/seo/metadata";
import { orderVehicleImages } from "@/lib/vehicles/images";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbSchema,
  getVehicleSchema,
} from "@/lib/seo/schema";

// Refresh the fleet and blog data every minute while still serving prerendered HTML.
export const revalidate = 60;

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
  const supabase = createPublicReadClient();
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

  const base =
    plainText(vehicle.description ?? "") ||
    `Rent a ${vehicle.name} with a professional driver in Dhaka from Jinia Enterprise.`;
  const description = vehicle.starting_price
    ? `${base} Day rate from ৳${vehicle.starting_price.toLocaleString("en-US")} with driver.`
    : base;

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
    plainText(vehicle.description ?? "") ||
    `Rent a ${vehicle.name} with a professional driver in Dhaka.`;

  // "Hyundai H1 (2019-20)" → name in grotesk, model years in the serif accent.
  const name = vehicle.name.trim();
  const yearAt = name.indexOf("(");
  const title = yearAt > 0 ? name.slice(0, yearAt).trim() : name;
  const years = yearAt > 0 ? name.slice(yearAt).replace(/[()]/g, "").trim() : "";
  const ac = car.features.some((f) => /air/i.test(f));

  // The same spec sheet the drawer shows, so the permalink page carries every fact.
  const specs: Array<{ k: string; v: string }> = [
    { k: "Seats", v: String(vehicle.seats) },
    { k: "Driver", v: "Included" },
    { k: "Hire", v: hireTerms(car.rental_types) },
    ...specRows(car.details).map(([k, v]) => ({ k, v })),
    ...(car.details.engine_cc ? [] : [{ k: "Cabin", v: ac ? "Air-conditioned" : "Standard" }]),
  ];

  const glance = specs.filter((s) => ["Seats", "Hire", "Transmission", "Fuel", "Engine", "Cabin"].includes(s.k));
  const steps: Array<[string, string]> = [
    ["Pick this car", "Plan a trip in it, or message the desk."],
    ["Tell us the trip", "Date, pickup point, and where you are going."],
    ["Get one fixed price", vehicle.starting_price ? "Usually inside the hour. No deposit to ask." : "The desk replies with a fixed price, usually inside the hour."],
  ];

  return (
    <RequestProvider>
      <PickThisCar v={car} />
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
              price: car.starting_price,
              modelYear: car.details.model_year,
              fuelType: car.details.fuel_type,
              transmission: car.details.transmission,
              engineCc: car.details.engine_cc,
              colour: car.details.colour,
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
            <Link href="/" className="inline-flex items-center py-3 -my-3 hover:text-ink">Home</Link>
            <span aria-hidden className="text-ink/25">/</span>
            <Link href="/vehicles" className="inline-flex items-center py-3 -my-3 hover:text-ink">Fleet</Link>
            <span aria-hidden className="text-ink/25">/</span>
            <span aria-current="page" className="text-ink/70">{title}</span>
          </nav>

          <header className="mt-6 sm:mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">{cls?.label ?? vehicle.category} · {vehicle.seats} seats</p>
            <h1 className="type-display mt-3 font-heading text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] [overflow-wrap:anywhere]">
              {title}
              {years && <> <span className="type-accent text-gold-deep">{years}</span></>}
            </h1>
          </header>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <VehicleStage v={car} />
              <ul aria-label="At a glance" className="mt-4 flex flex-wrap gap-2">
                {glance.map((s) => (
                  <li key={s.k} className="flex min-w-[7.5rem] flex-1 flex-col rounded-2xl bg-paper-deep px-4 py-3">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">{s.k}</span>
                    <span className="mt-1 text-sm font-semibold">{s.v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="min-w-0 lg:col-span-5">
              <div className="rounded-[1.6rem] border border-ink/10 p-6 sm:p-7 lg:sticky lg:top-28">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/45">{vehicle.starting_price ? "Day rate from" : "Rate"}</p>
                <p className="mt-1 font-heading text-[clamp(2.4rem,6vw,3.4rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                  {vehicle.starting_price ? `৳${vehicle.starting_price.toLocaleString("en-US")}` : "Quote on request"}
                </p>
                <p className="mt-2 text-sm text-ink/55">
                  {vehicle.starting_price ? "With driver, inside Dhaka. Fuel, hours and overtime are spelled out in your quote." : "With driver. The desk replies with a fixed price for your trip."}
                </p>

                <div className="mt-6">
                  <VehicleActions v={car} whatsapp={siteConfig.whatsapp} phone={siteConfig.phone} />
                  <a href="#booking" className="mt-3 block text-center text-sm font-semibold text-ink/60 underline decoration-gold decoration-2 underline-offset-[6px] hover:text-ink">Prefer to write it out? Use the form below</a>
                </div>

                <div className="mt-7 border-t border-ink/10 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">How it works</p>
                  <ol className="mt-4 space-y-4">
                    {steps.map(([t, d], i) => (
                      <li key={t} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper">{i + 1}</span>
                        <span className="text-sm leading-relaxed">
                          <span className="block font-semibold">{t}</span>
                          <span className="text-ink/60">{d}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-16 grid gap-12 border-t border-ink/10 pt-12 lg:grid-cols-12 lg:gap-12">
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
              {car.details.insurance && (
                <div className="mt-8 rounded-2xl bg-paper-deep p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">Insurance</p>
                  <p className="mt-2 text-sm leading-relaxed">{car.details.insurance}</p>
                </div>
              )}
            </div>

            <div className="min-w-0 lg:col-span-5">
              <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em]">Specifications</h2>
              <dl className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {specs.map((s) => (
                  <div key={s.k} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="text-sm text-ink/55">{s.k}</dt>
                    <dd className="text-right text-sm font-semibold">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div id="booking" className="mt-16 grid scroll-mt-28 gap-10 border-t border-ink/10 pt-12 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-5">
              <h2 className="type-heading font-heading text-2xl">Rather write it out?</h2>
              <p className="mt-2 text-sm text-ink/55">Send the details and the desk replies with a quote. Nothing is charged here.</p>
              <p className="mt-6 text-sm text-ink/55">Prefer a call? <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-[5px]">{siteConfig.phone}</a></p>
            </div>
            <div className="min-w-0 lg:col-span-7">
              <div className="rounded-[1.6rem] bg-paper-deep p-5 sm:p-7">
                <InquiryForm vehicleName={vehicle.name} vehicleId={vehicle.id} />
              </div>
            </div>
          </div>

          {similar.length > 0 && (
            <section className="mt-20 border-t border-ink/10 pt-12">
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

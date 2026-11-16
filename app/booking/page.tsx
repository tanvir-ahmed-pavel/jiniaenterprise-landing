import { BookingForm } from "@/components/forms/BookingForm";
import { siteConfig } from "@/lib/config";
import { createPublicReadClient } from "@/lib/supabase/static";
import { PageHeader } from "@/components/layout/PageHeader";
import { Eyebrow } from "@/components/layout/Section";
import { createMetadata } from "@/lib/seo/metadata";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";

// Refresh the fleet and blog data every minute while still serving prerendered HTML.
export const revalidate = 60;

export const metadata = createMetadata({
  title: "Book Car Rental in Dhaka",
  description:
    "Request a chauffeur-driven car rental in Dhaka. Choose vehicle class, dates, and pickup details — or call and WhatsApp the desk.",
  path: "/booking",
});

const promises = [
  "No deposit taken to hold a booking",
  "A reply inside the hour, from a person",
  "Driver name and vehicle sent before pickup",
  "Monthly billing available for companies",
  "One price for the trip, quoted up front",
];

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ vehicle?: string | string[] }>;
}) {
  const params = await searchParams;
  const supabase = createPublicReadClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .order("name");

  const requestedVehicle = Array.isArray(params.vehicle) ? params.vehicle[0] : params.vehicle;
  const preselectedVehicle = requestedVehicle
    ? (vehicles as Array<{ id: string; slug: string }> | null)?.find(
        (vehicle) => vehicle.id === requestedVehicle || vehicle.slug === requestedVehicle,
      )?.id
    : undefined;

  return (
    <div className="bg-white text-ink">
      <PageHeader
        title="Request a vehicle."
        subtitle="Booking"
        description="Tell us the date, the pickup and how long you need the car. Nothing is charged here; the desk replies with a fixed price for that exact trip."
        breadcrumbs={[{ label: "Booking" }]}
      />

      <section className="container py-12 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <BookingForm vehicles={vehicles || []} preselectedVehicle={preselectedVehicle} />
          </div>

          <aside className="min-w-0 space-y-10 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.6rem] bg-tile-sand p-6 sm:p-8">
              <Eyebrow>Rather talk</Eyebrow>
              <h2 className="type-display mt-3 font-heading text-[clamp(1.9rem,5vw,2.6rem)]">
                The desk is <span className="type-accent text-gold-deep">open.</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                A person answers, usually inside the hour. Send the trip in one message.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`}
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold transition-colors hover:bg-paper"
                >
                  <WhatsAppIcon className="h-[1.1rem] w-[1.1rem] text-[#128C4B]" />
                  <span className="tabular-nums">{whatsappDisplay}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-ink/15 transition-colors hover:bg-white"
                >
                  <Phone className="h-4 w-4 text-gold-deep" /> Call the desk
                </a>
              </div>
            </div>

            <div>
              <Eyebrow>What you get</Eyebrow>
              <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {promises.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5 text-sm text-ink/70">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <Eyebrow>The office</Eyebrow>
                <address className="mt-4 not-italic text-sm leading-relaxed text-ink/65">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.area}, {siteConfig.address.city}
                </address>
              </div>
              <div>
                <Eyebrow>Hours</Eyebrow>
                <div className="mt-4 text-sm leading-relaxed text-ink/65">
                  <p>Saturday to Thursday, 9:00 AM – 8:00 PM</p>
                  <p>Friday, 10:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

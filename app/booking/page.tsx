import { BookingForm } from "@/components/forms/BookingForm";
import { siteConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/layout/PageHeader";
import { Eyebrow } from "@/components/layout/Section";
import { createMetadata } from "@/lib/seo/metadata";

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

export default async function BookingPage() {
  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .order("name");

  return (
    <div>
      <PageHeader
        title="Request a vehicle."
        subtitle="Booking"
        description="Tell us the date, the pickup, and how long you need the car. We will come back with a clear price for that exact trip."
        breadcrumbs={[{ label: "Booking" }]}
      />

      <section className="container py-20 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <div>
            <Eyebrow>Booking request</Eyebrow>
            <h2 className="type-display mt-5 max-w-[14ch] font-heading text-[2.25rem] text-emerald-950 sm:text-[3rem]">
              The details we need.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-950/60">
              Nothing is charged here. The desk reads every request and replies with a quote you can
              accept, change, or ignore.
            </p>

            <div className="mt-10 border-t border-emerald-950/10 pt-10">
              <BookingForm vehicles={vehicles || []} />
            </div>
          </div>

          {/* Sidebar: three hairline blocks, no glass, no floating badge. */}
          <aside className="space-y-12 lg:sticky lg:top-28 lg:self-start">
            <div>
              <Eyebrow>Rather talk</Eyebrow>
              <div className="mt-5 divide-y divide-emerald-950/10 border-y border-emerald-950/10">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-emerald-700"
                >
                  <span className="type-label text-emerald-950/50">Call the desk</span>
                  <span className="type-heading font-heading text-base text-emerald-950 group-hover:text-emerald-700">
                    {siteConfig.phone}
                  </span>
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-emerald-700"
                >
                  <span className="type-label text-emerald-950/50">WhatsApp</span>
                  <span className="type-heading font-heading text-base text-emerald-950 group-hover:text-emerald-700">
                    Live chat
                  </span>
                </a>
              </div>
            </div>

            <div>
              <Eyebrow>The office</Eyebrow>
              <address className="mt-5 not-italic text-sm leading-relaxed text-emerald-950/65">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.area}, {siteConfig.address.city}
              </address>
              <div className="mt-5 border-t border-emerald-950/10 pt-5 text-sm leading-relaxed text-emerald-950/55">
                <p>Saturday to Thursday, 9:00 AM – 8:00 PM</p>
                <p>Friday, 10:00 AM – 6:00 PM</p>
              </div>
            </div>

            <div>
              <Eyebrow>What you get</Eyebrow>
              <ul className="mt-5 divide-y divide-emerald-950/10 border-y border-emerald-950/10">
                {promises.map((item) => (
                  <li key={item} className="flex items-baseline gap-3 py-3.5 text-sm text-emerald-950/65">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

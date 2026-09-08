import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, groupTransportOptions, siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Eyebrow,
  SectionIntro,
  PrimaryAction,
  GhostAction,
  DarkPanel,
} from "@/components/layout/Section";

export const metadata = createMetadata({
  title: "Car Rental Services in Dhaka",
  description:
    "Daily, monthly, corporate, chauffeur, bus rental, and airport transfer services in Dhaka from Jinia Enterprise.",
  path: "/services",
});

/** Only some services have a studio cutout. The rest lead with type, which is
 *  the honest layout — a placeholder photo would read worse than none. */
const serviceVisuals: Record<string, string> = {
  "Daily Car Rental with Driver": "/images/studio/executive-chauffeur-white.png",
  "Corporate Fleet Rental": "/images/studio/delegation-convoy-white.png",
  "Airport Pickup & Drop": "/images/studio/airport-arrival-white.png",
};

const serviceLinks: Record<string, string> = {
  "Daily Car Rental with Driver": "/car-rental-with-driver",
  "Weekly Car Rental": "/car-rental-dhaka",
  "Monthly Car Rental": "/monthly-car-rental",
  "Corporate Fleet Rental": "/corporate-car-rental",
  "Driver-Only Service": "/car-rental-with-driver",
  "Airport Pickup & Drop": "/airport-car-rental",
  "Microbus & AC Bus Rental": "/car-rental-bangladesh",
  "24/7 Roadside Assistance": "/contact",
};

const advantages = [
  { title: "First-hand fleet", text: "Every vehicle is bought new and maintained on schedule, not sourced per booking." },
  { title: "Answered within the hour", text: "A person reads your request and replies with a real quote, not an auto-reply." },
  { title: "The whole country", text: "Dhaka daily, and outstation movement to every district in Bangladesh." },
  { title: "Drivers we vetted", text: "BRTA-licensed, police-verified, and briefed on the route before they arrive." },
];

export default function ServicesPage() {
  const featured = services.filter((service) => serviceVisuals[service.title]);
  const rest = services.filter((service) => !serviceVisuals[service.title]);

  return (
    <div>
      <PageHeader
        title="What we run."
        subtitle="Services"
        description="Daily and monthly chauffeur hire, corporate fleets, airport movement, and group transport — arranged by a desk that answers."
        breadcrumbs={[{ label: "Services" }]}
      />

      {/* The catalogue. Aligned three-up, hairline under each entry, the same
          rhythm the home page uses for its service row. */}
      <section className="container py-24 sm:py-32">
        <SectionIntro
          eyebrow="The catalogue"
          title="For every kind of important day."
          lede="Eight ways to book us. Most clients start with one and end up on a monthly arrangement."
        />

        {/* Only three services have a studio cutout. Rather than hold an empty
            4:3 hole for the other five, the page splits: a photographed row,
            then the rest as a typographic index. */}
        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-3">
          {featured.map((service, index) => (
            <Link key={service.id} href={serviceLinks[service.title] ?? "/booking"} className="group flex flex-col">
              <span className="type-label tabular-nums text-amber-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="jinia-grounded-scene relative mt-3 aspect-[4/3]">
                <Image
                  src={serviceVisuals[service.title]}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex flex-1 items-start justify-between gap-4 border-t border-emerald-950/15 pt-4 transition-colors group-hover:border-amber-400">
                <div>
                  <h3 className="type-heading font-heading text-lg text-emerald-950">{service.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-emerald-950/60">{service.description}</p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-emerald-600 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        <ul className="mt-16 divide-y divide-emerald-950/10 border-y border-emerald-950/10">
          {rest.map((service, index) => (
            <li key={service.id}>
              <Link
                href={serviceLinks[service.title] ?? "/booking"}
                className="group grid gap-2 py-6 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <span className="type-label tabular-nums text-amber-600">
                  {String(featured.length + index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="type-heading font-heading text-lg text-emerald-950 transition-colors group-hover:text-emerald-700">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-emerald-950/60">
                    {service.description}
                  </p>
                </div>
                <ArrowUpRight className="hidden h-5 w-5 shrink-0 self-center text-emerald-600 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Group and corporate. Text left, list right, one hairline between —
          no card, no ghost word, no dark slab in the middle of a light page. */}
      <section className="border-y border-emerald-950/10 bg-[#f6faf7] py-24 sm:py-32">
        <div className="container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-20">
          <div className="max-w-xl">
            <Eyebrow>Group &amp; corporate</Eyebrow>
            <h2 className="type-display mt-5 max-w-[14ch] font-heading text-[2.25rem] text-emerald-950 sm:text-[3rem]">
              Moving a delegation, not a passenger.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-emerald-950/60 sm:text-lg">
              Companies, NGOs, and embassies run standing arrangements with us — monthly billing, a
              named coordinator, and a backup vehicle held for the days one is needed.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryAction href="/contact">Talk to the desk</PrimaryAction>
              <GhostAction href="/corporate-car-rental">Corporate rental</GhostAction>
            </div>
          </div>

          <ul className="divide-y divide-emerald-950/10 border-y border-emerald-950/10">
            {groupTransportOptions.map((option) => (
              <li key={option} className="flex items-baseline gap-4 py-4">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                <span className="text-sm leading-relaxed text-emerald-950/70">{option}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why us. Numbered, on hairlines — the icon-tile grid was the single
          most template-looking block on the site. */}
      <section className="container py-24 sm:py-32">
        <SectionIntro eyebrow="Why Jinia" title="What you are actually paying for." />
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item, index) => (
            <div key={item.title} className="border-t border-emerald-950/15 pt-5">
              <span className="type-label tabular-nums text-amber-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="type-heading mt-3 font-heading text-lg text-emerald-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-950/60">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <DarkPanel>
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Ready when you are</Eyebrow>
          </div>
          <h2 className="type-display mx-auto mt-5 max-w-[16ch] font-heading text-[2.25rem] sm:text-[3rem]">
            Tell us the date and the pickup.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/55">
            No deposit to ask. We reply with a clear price for your route, vehicle, and hours.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <PrimaryAction href="/booking" tone="dark">Start booking</PrimaryAction>
            <GhostAction href={`https://wa.me/${siteConfig.whatsapp}`} external tone="dark">
              WhatsApp the desk
            </GhostAction>
          </div>
        </div>
      </DarkPanel>
    </div>
  );
}

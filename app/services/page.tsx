import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { services, groupTransportOptions, siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/layout/PageHeader";
import { OpenWizardButton } from "@/components/wizard/OpenWizardButton";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";

export const metadata = createMetadata({
  title: "Car Rental Services in Dhaka",
  description:
    "Daily, monthly, corporate, chauffeur, bus rental, and airport transfer services in Dhaka from Jinia Enterprise.",
  path: "/services",
});

/** Scene art for the services that have it. The other two lead with type. */
const serviceVisuals: Record<string, string> = {
  "Daily Car Rental with Driver": "/images/services/executive.webp",
  "Weekly Car Rental": "/images/services/outstation.webp",
  "Monthly Car Rental": "/images/services/monthly.webp",
  "Corporate Fleet Rental": "/images/services/delegation.webp",
  "Airport Pickup & Drop": "/images/services/airport.webp",
  "Microbus & AC Bus Rental": "/images/vehicles/photos/nissan-civilian-29-seater-side.webp",
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

const tints = ["bg-tile-sand", "bg-tile-mist", "bg-tile-sage", "bg-tile-stone", "bg-tile-butter"];

const advantages = [
  { title: "First-hand fleet", text: "Every vehicle is bought new and maintained on schedule, not sourced per booking." },
  { title: "Answered within the hour", text: "A person reads your request and replies with a real quote, not an auto-reply." },
  { title: "The whole country", text: "Dhaka daily, and outstation movement to every district in Bangladesh." },
  { title: "Drivers we vetted", text: "BRTA-licensed, police-verified, and briefed on the route before they arrive." },
];

const eyebrow = "text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep";

function RequestButton({ label }: { label: string }) {
  return (
    <OpenWizardButton className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
      {label}
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5"><ArrowRight className="h-4 w-4" /></span>
    </OpenWizardButton>
  );
}

export default function ServicesPage() {
  const featured = services.filter((service) => serviceVisuals[service.title]);
  const rest = services.filter((service) => !serviceVisuals[service.title]);

  return (
    <div className="overflow-x-clip bg-white text-ink">
      <PageHeader
        title="What we run."
        subtitle="Services"
        description="Daily and monthly chauffeur hire, corporate fleets, airport movement, and group transport — arranged by a desk that answers."
        breadcrumbs={[{ label: "Services" }]}
      />

      {/* The catalogue: scene cards, then the two type-only services. */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={eyebrow}>The catalogue</p>
              <h2 className="type-display mt-4 max-w-[16ch] font-heading text-[clamp(2.4rem,5vw,4.2rem)]">
                For every kind of <span className="type-accent text-gold-deep">important day.</span>
              </h2>
            </div>
            <p className="max-w-sm text-base text-ink/60">Eight ways to book us. Most clients start with one and end up on a monthly arrangement.</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service, index) => (
              <Link
                key={service.id}
                href={serviceLinks[service.title] ?? "/booking"}
                className={`group flex flex-col overflow-hidden rounded-[2rem] p-6 sm:p-7 ${tints[index % tints.length]}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-heading text-sm font-semibold tabular-nums text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-ink/15 transition-colors group-hover:bg-ink group-hover:text-paper">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-[1.6rem] font-semibold leading-tight tracking-[-0.035em]">{service.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">{service.description}</p>
                <div className="relative mt-6 aspect-[16/10] w-full">
                  <Image
                    src={serviceVisuals[service.title]}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-contain object-bottom transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {rest.map((service, index) => (
              <Link
                key={service.id}
                href={serviceLinks[service.title] ?? "/booking"}
                className="group flex items-start justify-between gap-6 rounded-[2rem] bg-paper-deep p-6 sm:p-7"
              >
                <div className="min-w-0">
                  <span className="font-heading text-sm font-semibold tabular-nums text-gold-deep">{String(featured.length + index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-heading text-[1.6rem] font-semibold leading-tight tracking-[-0.035em]">{service.title}</h3>
                  <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink/65">{service.description}</p>
                </div>
                <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-ink/15 transition-colors group-hover:bg-ink group-hover:text-paper">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Group and corporate. */}
      <section className="border-y border-ink/10 bg-paper py-20 sm:py-28">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            <p className={eyebrow}>Group &amp; corporate</p>
            <h2 className="type-display mt-4 font-heading text-[clamp(2.4rem,5vw,4.2rem)]">
              Moving a delegation, <span className="type-accent text-gold-deep">not a passenger.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
              Companies, NGOs, and embassies run standing arrangements with us — monthly billing, a
              named coordinator, and a backup vehicle held for the days one is needed.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <RequestButton label="Request a quote" />
              <Link href="/corporate-car-rental" className="inline-flex h-14 items-center rounded-full px-6 text-sm font-semibold ring-1 ring-ink/20 transition-colors hover:bg-white">
                Corporate rental
              </Link>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <div className="rounded-[2rem] bg-tile-sage p-6 sm:p-8">
              <div className="relative aspect-[16/7] w-full">
                <Image
                  src="/images/vehicles/photos/toyota-hiace-2012-15-side.webp"
                  alt="Toyota Hiace microbus for group transport"
                  fill
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  className="object-contain object-bottom"
                />
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {groupTransportOptions.map((option) => (
                  <li key={option} className="rounded-full bg-paper/70 px-3.5 py-2 text-sm font-semibold">{option}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why us. */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container">
          <p className={eyebrow}>Why Jinia</p>
          <h2 className="type-display mt-4 font-heading text-[clamp(2.4rem,5vw,4.2rem)]">
            What you are <span className="type-accent text-gold-deep">paying for.</span>
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, index) => (
              <div key={item.title} className="rounded-[1.6rem] bg-paper-deep p-6 sm:p-7">
                <span className="font-heading text-sm font-semibold tabular-nums text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-heading text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing. */}
      <section className="bg-tile-sand py-20 text-ink sm:py-28">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className={eyebrow}>Ready when you are</p>
            <h2 className="type-display mt-4 font-heading text-[clamp(2.6rem,6vw,5rem)]">
              Tell us the date <span className="type-accent text-gold-deep">and the pickup.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-sm text-base text-ink/65">No deposit to ask. We reply with a clear price for your route, vehicle, and hours.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <RequestButton label="Request a car" />
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`}
                className="group inline-flex h-14 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-ink/20 transition-colors hover:bg-white"
              >
                <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" /> <span className="tabular-nums">{whatsappDisplay}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-gold-deep">
              <Phone className="h-4 w-4 text-gold-deep" /> {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

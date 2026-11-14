import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getLocalBusinessSchema } from "@/lib/seo/schema";
import {
  businessIdentity,
  getFormattedAddress,
  getTelHref,
  getWhatsAppHref,
} from "@/lib/business/identity";

export const metadata = createMetadata({
  title: "Contact Jinia Enterprise — Dhaka Car Rental Desk",
  description:
    "Call, WhatsApp, or visit Jinia Enterprise in Gulshan, Dhaka. Request car rental quotes, airport transfers, and corporate fleet support.",
  path: "/contact",
});

const eyebrow = "text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep";
const label = "text-xs font-semibold uppercase tracking-[0.16em] text-ink/45";

const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Jinia Enterprise, ${getFormattedAddress()}`
)}`;

const phones = [businessIdentity.phone, businessIdentity.phoneSecondary, businessIdentity.phoneLandline].filter(
  (p): p is string => Boolean(p)
);

export default function ContactPage() {
  return (
    <div className="overflow-x-clip bg-white text-ink">
      <JsonLd
        data={[
          getLocalBusinessSchema(),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageHeader
        title="Talk to the desk."
        subtitle="Contact"
        description="Call, WhatsApp, email, or come to the Gulshan office. A person answers, and a real quote follows."
        breadcrumbs={[{ label: "Contact" }]}
      />

      {/* Three fastest ways in, as large tap tiles. */}
      <section className="bg-white pt-12 sm:pt-16">
        <div className="container grid gap-3 md:grid-cols-3">
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`}
            className="group flex min-h-36 flex-col justify-between rounded-[1.8rem] bg-tile-sage p-6 sm:p-7"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/70"><WhatsAppIcon className="h-5 w-5" /></span>
              <ArrowUpRight className="h-4 w-4 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <div className="mt-6">
              <p className={label}>WhatsApp · fastest</p>
              <p className="mt-1 font-heading text-2xl font-semibold tracking-[-0.03em] tabular-nums">{whatsappDisplay}</p>
            </div>
          </a>
          <a href={getTelHref()} className="group flex min-h-36 flex-col justify-between rounded-[1.8rem] bg-tile-sand p-6 sm:p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/70"><Phone className="h-5 w-5" /></span>
            <div className="mt-6">
              <p className={label}>Call the desk</p>
              <p className="mt-1 font-heading text-2xl font-semibold tracking-[-0.03em] tabular-nums transition-colors group-hover:text-gold-deep">{businessIdentity.phone}</p>
            </div>
          </a>
          <a href={`mailto:${businessIdentity.email}`} className="group flex min-h-36 flex-col justify-between rounded-[1.8rem] bg-tile-mist p-6 sm:p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/70"><Mail className="h-5 w-5" /></span>
            <div className="mt-6 min-w-0">
              <p className={label}>Email</p>
              <p className="mt-1 break-all font-heading text-lg font-semibold tracking-[-0.02em] transition-colors group-hover:text-gold-deep">{businessIdentity.email}</p>
            </div>
          </a>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* Details + map */}
          <div className="min-w-0 lg:col-span-6">
            <p className={eyebrow}>Direct channels</p>
            <h2 className="type-display mt-4 font-heading text-[clamp(2.4rem,5vw,4.2rem)]">
              Every way <span className="type-accent text-gold-deep">to reach us.</span>
            </h2>

            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className={label}>Phone</dt>
                <dd className="mt-2 flex flex-col">
                  {phones.map((p) => (
                    <a key={p} href={getTelHref(p)} className="inline-flex min-h-11 items-center gap-2 text-base font-semibold tabular-nums transition-colors hover:text-gold-deep">
                      <Phone className="h-4 w-4 text-gold-deep" />{p}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className={label}>Hours</dt>
                <dd className="mt-2 space-y-1 text-sm leading-relaxed text-ink/70">
                  <p><span className="font-semibold text-ink">Sat–Thu</span> 9am–8pm</p>
                  <p><span className="font-semibold text-ink">Fri</span> 10am–6pm</p>
                  <p className="text-ink/55">Airport and night runs by arrangement</p>
                </dd>
              </div>
              <div>
                <dt className={label}>Office</dt>
                <dd className="mt-2">
                  <address className="text-sm not-italic leading-relaxed text-ink/70">{getFormattedAddress()}</address>
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-gold decoration-2 underline-offset-[6px]"
                  >
                    <MapPin className="h-4 w-4 text-gold-deep" /> Open in Google Maps
                    <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </dd>
              </div>
              <div>
                <dt className={label}>Service areas</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/70">
                  Dhaka — Gulshan, Banani, Uttara, Dhanmondi and beyond — Hazrat Shahjalal airport, and
                  outstation routes to every district in Bangladesh.
                </dd>
              </div>
            </dl>

            <div className="mt-10 overflow-hidden rounded-[1.6rem] bg-paper-deep">
              <div className="aspect-[4/3] sm:aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0164267879956!2d90.41455431498149!3d23.793769084567995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70dab33%3A0x4b606d63ecb0c1a5!2sGulshan%202%20Circle!5e0!3m2!1sen!2sbd!4v1702700000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Jinia Enterprise Location — Gulshan, Dhaka"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="min-w-0 lg:sticky lg:top-28 lg:col-span-6">
            <p className={eyebrow}>Send a message</p>
            <h2 className="type-display mt-4 font-heading text-[clamp(2.2rem,4vw,3.2rem)]">
              Request <span className="type-accent text-gold-deep">a quote.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/55">
              Share pickup, dates, and vehicle preference and we will price the exact trip.
            </p>
            <div className="mt-6 rounded-[1.6rem] bg-paper-deep p-5 sm:p-7">
              <InquiryForm source="contact_page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

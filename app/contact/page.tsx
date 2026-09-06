import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Eyebrow } from "@/components/layout/Section";
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

/** Contact details as a definition list on hairlines. The old page wrapped each
 *  of six lines in a rounded icon tile, which is six boxes to say six things. */
const channels: Array<{ label: string; value: React.ReactNode }> = [
  {
    label: "Phone",
    value: (
      <div className="flex flex-col gap-1">
        <a href={getTelHref()} className="transition-colors hover:text-emerald-700">
          {businessIdentity.phone}
        </a>
        {businessIdentity.phoneSecondary && (
          <a href={getTelHref(businessIdentity.phoneSecondary)} className="transition-colors hover:text-emerald-700">
            {businessIdentity.phoneSecondary}
          </a>
        )}
      </div>
    ),
  },
  {
    label: "WhatsApp",
    value: (
      <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-700">
        {businessIdentity.phone}
      </a>
    ),
  },
  {
    label: "Email",
    value: (
      <a href={`mailto:${businessIdentity.email}`} className="break-all transition-colors hover:text-emerald-700">
        {businessIdentity.email}
      </a>
    ),
  },
  {
    label: "Office",
    value: <address className="not-italic leading-relaxed">{getFormattedAddress()}</address>,
  },
  {
    label: "Hours",
    value: (
      <div className="space-y-1">
        <p>Saturday to Thursday, 9:00 AM – 8:00 PM</p>
        <p>Friday, 10:00 AM – 6:00 PM</p>
      </div>
    ),
  },
  {
    label: "Service areas",
    value: (
      <p className="leading-relaxed">
        Dhaka — Gulshan, Banani, Uttara, Dhanmondi and beyond — Hazrat Shahjalal airport, and
        outstation routes to every district in Bangladesh.
      </p>
    ),
  },
];

export default function ContactPage() {
  return (
    <div>
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

      <section className="container py-20 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-24">
          <div>
            <Eyebrow>Direct channels</Eyebrow>
            <h2 className="type-display mt-5 max-w-[12ch] font-heading text-[2.25rem] text-emerald-950 sm:text-[3rem]">
              Every way to reach us.
            </h2>

            <dl className="mt-10 divide-y divide-emerald-950/10 border-y border-emerald-950/10">
              {channels.map((channel) => (
                <div key={channel.label} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="type-label text-emerald-700">{channel.label}</dt>
                  <dd className="text-sm leading-relaxed text-emerald-950/70">{channel.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 overflow-hidden rounded-lg border border-emerald-950/10">
              <div className="aspect-video grayscale transition-all duration-700 hover:grayscale-0">
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

          <div className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-emerald-950/10 bg-white p-6 sm:p-9">
              <span aria-hidden className="mb-6 block h-px w-full bg-linear-to-r from-transparent via-amber-400 to-transparent" />
              <Eyebrow>Send a message</Eyebrow>
              <h2 className="type-display mt-4 font-heading text-[1.9rem] text-emerald-950 sm:text-[2.25rem]">
                Request a quote.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-emerald-950/55">
                Share pickup, dates, and vehicle preference and we will price the exact trip.
              </p>
              <div className="mt-8">
                <InquiryForm source="contact_page" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

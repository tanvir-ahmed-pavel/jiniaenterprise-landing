import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/schema";
import { siteFaqs } from "@/lib/seo/content";
import { Plus } from "lucide-react";
import { ClosingCta, PillLinks } from "@/components/seo/ContentPageShell";

export const metadata = createMetadata({
  title: "Car Rental FAQ — Dhaka",
  description:
    "Answers about chauffeur-driven car rental in Dhaka: drivers, airport pickup, fuel, monthly packages, and how to book with Jinia Enterprise.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="bg-white pb-20 text-ink sm:pb-28">
      <JsonLd
        data={[
          getFAQSchema(siteFaqs),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <PageHeader
        title="FAQ."
        subtitle="Clear answers"
        description="Practical answers about car rental with driver, airport transfers, and monthly packages in Dhaka."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <div className="container space-y-16 pt-10 sm:space-y-20 sm:pt-14">
        <div className="max-w-4xl">
          {siteFaqs.map((faq) => (
            <details
              key={faq.question}
              className="jx-faq group mb-3 rounded-2xl bg-paper-deep px-5 transition-colors open:bg-tile-sand sm:px-6"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-left sm:gap-6 [&::-webkit-details-marker]:hidden">
                <h2 className="text-base font-semibold tracking-tight sm:text-lg">{faq.question}</h2>
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper transition-transform duration-300 group-open:rotate-45"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-2 text-[0.95rem] leading-relaxed text-ink/65 sm:pr-12">{faq.answer}</p>
            </details>
          ))}
        </div>

        <PillLinks
          links={[
            { href: "/booking", label: "Booking form" },
            { href: "/pricing", label: "Pricing" },
            { href: "/glossary", label: "Definitions" },
          ]}
        />

        <ClosingCta title="Still need a quote?" />
      </div>
    </div>
  );
}

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/schema";
import { siteFaqs } from "@/lib/seo/content";
import { businessIdentity, getTelHref, getWhatsAppHref } from "@/lib/business/identity";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";

export const metadata = createMetadata({
  title: "Car Rental FAQ — Dhaka",
  description:
    "Answers about chauffeur-driven car rental in Dhaka: drivers, airport pickup, fuel, monthly packages, and how to book with Jinia Enterprise.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="pb-24">
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

      <div className="container max-w-3xl space-y-6">
        {siteFaqs.map((faq) => (
          <article
            key={faq.question}
            className="rounded-2xl border border-emerald-100 bg-white/70 p-6 md:p-8"
          >
            <h2 className="text-xl font-heading font-bold text-emerald-950">
              {faq.question}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
          </article>
        ))}

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <p className="font-heading font-bold text-emerald-950 text-lg">
              Still need a quote?
            </p>
            <p className="text-sm text-emerald-900/70 mt-1">
              {businessIdentity.phone} · {businessIdentity.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={getTelHref()}>
              <Button className="gap-2 rounded-full bg-emerald-900">
                <Phone className="h-4 w-4" /> Call
              </Button>
            </a>
            <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2 rounded-full">
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </Button>
            </a>
            <Link href="/booking">
              <Button variant="ghost" className="rounded-full">
                Booking form
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

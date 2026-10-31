import Link from "next/link";
import { getVehiclePath } from "@/lib/vehicles/slugs";
import { formatBdt, getFleetPrice } from "@/content/fleet-prices";
import { createMetadata } from "@/lib/seo/metadata";
import { ContentPageShell } from "@/components/seo/ContentPageShell";
import { pricingPage, pricingFaqs, indicativeFromPrices } from "@/content/pricing";

export const metadata = createMetadata({
  title: pricingPage.title,
  description: pricingPage.description,
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <ContentPageShell
      title="Pricing, explained."
      subtitle="Transparent methodology"
      description={pricingPage.description}
      path="/pricing"
      breadcrumbLabel="Pricing"
      answer={pricingPage.answer}
      serviceName="Car Rental Pricing"
      sections={[
        {
          heading: "How we price",
          body: pricingPage.methodology.map((m) => `• ${m}`).join("\n"),
        },
        {
          heading: "What changes the quote",
          body: pricingPage.factorsAffectingPrice.map((f) => `• ${f}`).join("\n"),
        },
        {
          heading: "How to get today’s rate",
          body: pricingPage.howToGetAQuote.map((s, i) => `${i + 1}. ${s}`).join("\n"),
        },
        {
          heading: "What we don’t invent online",
          body: pricingPage.whatWeDoNotPublish.map((w) => `• ${w}`).join("\n"),
        },
      ]}
      faqs={pricingFaqs}
      related={[
        { href: "/vehicles", label: "Fleet" },
        { href: "/booking", label: "Request quote" },
        { href: "/monthly-car-rental", label: "Monthly packages" },
        { href: "/faq", label: "FAQ" },
      ]}
      updatedAt="2026-10-31"
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-medium text-emerald-950">
          Day rates with driver, Dhaka city
        </h2>
        <p className="text-sm text-gray-600 font-medium">
          {pricingPage.priceDisclaimer}
        </p>
        <div className="overflow-x-auto rounded-2xl border border-emerald-100">
          <table className="w-full text-sm">
            <thead className="bg-emerald-950 text-white">
              <tr>
                <th scope="col" className="text-left p-3 font-medium">Vehicle</th>
                <th scope="col" className="text-left p-3 font-medium">Seats</th>
                <th scope="col" className="text-left p-3 font-medium">From</th>
                <th scope="col" className="text-left p-3 font-medium">Unit</th>
              </tr>
            </thead>
            <tbody>
              {indicativeFromPrices.map((row) => (
                <tr key={row.slug} className="border-t border-emerald-50 bg-white/80">
                  <td className="p-3 font-normal text-emerald-950">
                    <Link href={getVehiclePath(row.slug)} className="hover:text-emerald-700">
                      {row.name}
                    </Link>
                  </td>
                  <td className="p-3 tabular-nums text-emerald-950/70">
                    {getFleetPrice(row.slug)?.seats}
                  </td>
                  <td className="p-3 font-medium tabular-nums text-emerald-800">
                    {formatBdt(row.startingPriceBdt)}
                  </td>
                  <td className="p-3 text-gray-600">{row.priceLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ContentPageShell>
  );
}

import Link from "next/link";
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
      updatedAt="2026-08-21"
    >
      <section>
        <h2 className="type-display font-heading text-[clamp(1.8rem,4.5vw,2.6rem)] text-ink">
          Indicative “from” <span className="type-accent text-gold-deep">day rates.</span>
        </h2>
        <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-ink/55">
          {pricingPage.priceDisclaimer}
        </p>
        <div className="mt-6 overflow-x-auto rounded-[1.4rem] bg-paper-deep">
          <table className="w-full min-w-[20rem] text-sm">
            <thead>
              <tr className="text-left text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">
                <th scope="col" className="px-4 py-4 font-semibold sm:px-6">Vehicle</th>
                <th scope="col" className="px-4 py-4 font-semibold sm:px-6">From (BDT)</th>
                <th scope="col" className="px-4 py-4 font-semibold sm:px-6">Unit</th>
              </tr>
            </thead>
            <tbody>
              {indicativeFromPrices.map((row) => (
                <tr key={row.slug} className="border-t border-ink/10">
                  <td className="px-4 py-1 sm:px-6">
                    <Link
                      href={`/vehicles/${row.slug}`}
                      className="inline-flex min-h-11 items-center font-semibold text-ink underline decoration-ink/15 decoration-2 underline-offset-4 transition-colors hover:decoration-gold"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-1 font-heading text-base font-semibold tabular-nums tracking-[-0.02em] text-ink sm:px-6">
                    ৳{row.startingPriceBdt.toLocaleString("en-BD")}
                  </td>
                  <td className="px-4 py-1 text-ink/55 sm:px-6">{row.priceLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </ContentPageShell>
  );
}

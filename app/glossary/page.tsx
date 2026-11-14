import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/layout/PageHeader";
import { definitions } from "@/content/definitions";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { PillLinks } from "@/components/seo/ContentPageShell";

export const metadata = createMetadata({
  title: "Car Rental Definitions — Dhaka",
  description:
    "Plain definitions for with driver, full-day, airport transfer, outstation, overtime, and other car rental terms used by Jinia Enterprise.",
  path: "/glossary",
});

export default function GlossaryPage() {
  return (
    <div className="bg-white pb-20 text-ink sm:pb-28">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Glossary", path: "/glossary" },
        ])}
      />
      <PageHeader
        title="Definitions."
        subtitle="No jargon traps"
        description="What we mean when we say full-day, outstation, or with driver."
        breadcrumbs={[{ label: "Glossary" }]}
      />
      <div className="container space-y-16 pt-10 sm:pt-14">
        <div className="max-w-4xl divide-y divide-ink/10 border-y border-ink/10">
          {definitions.map((d) => (
            <article
              key={d.slug}
              id={d.slug}
              className="grid scroll-mt-28 gap-3 py-8 sm:grid-cols-12 sm:gap-8"
            >
              <div className="sm:col-span-4">
                <h2 className="type-heading font-heading text-xl text-ink sm:text-2xl">{d.term}</h2>
              </div>
              <div className="sm:col-span-8">
                <p className="text-base font-medium leading-relaxed text-ink/80">
                  {d.shortDefinition}
                </p>
                {d.details.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {d.details.map((line) => (
                      <li key={line} className="flex gap-3 text-sm leading-relaxed text-ink/60">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
        <PillLinks
          links={[
            { href: "/faq", label: "FAQ" },
            { href: "/pricing", label: "Pricing" },
            { href: "/policies", label: "Policies" },
            { href: "/car-rental-with-driver", label: "With driver" },
          ]}
        />
      </div>
    </div>
  );
}

import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/layout/PageHeader";
import { definitions } from "@/content/definitions";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/seo/schema";
import { RelatedLinks } from "@/components/seo/RelatedLinks";

export const metadata = createMetadata({
  title: "Car Rental Definitions — Dhaka",
  description:
    "Plain definitions for with driver, full-day, airport transfer, outstation, overtime, and other car rental terms used by Jinia Enterprise.",
  path: "/glossary",
});

export default function GlossaryPage() {
  return (
    <div className="pb-24">
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
      <div className="container max-w-3xl space-y-4">
        {definitions.map((d) => (
          <article
            key={d.slug}
            id={d.slug}
            className="rounded-2xl border border-emerald-100 bg-white/70 p-6 scroll-mt-28"
          >
            <h2 className="text-xl font-heading font-black text-emerald-950">
              {d.term}
            </h2>
            <p className="mt-2 text-gray-700 font-medium leading-relaxed">
              {d.shortDefinition}
            </p>
            {d.details.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {d.details.map((line) => (
                  <li key={line} className="text-sm text-gray-500 leading-relaxed">
                    • {line}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
        <RelatedLinks
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

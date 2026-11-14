import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { createMetadata } from "@/lib/seo/metadata";
import { policies } from "@/content/policies";
import { ArrowRight } from "lucide-react";

export const metadata = createMetadata({
  title: "Rental Policies — Jinia Enterprise",
  description:
    "Cancellation, overtime, fuel, privacy, outstation, and rental terms for chauffeur-driven bookings with Jinia Enterprise.",
  path: "/policies",
});

export default function PoliciesIndexPage() {
  return (
    <div className="bg-white pb-20 text-ink sm:pb-28">
      <PageHeader
        title="Policies."
        subtitle="Clear expectations"
        description="Operational rules we typically follow—confirm the final wording on your quote."
        breadcrumbs={[{ label: "Policies" }]}
      />
      <div className="container grid gap-3 pt-10 sm:grid-cols-2 sm:pt-14">
        {policies.map((policy) => (
          <Link
            key={policy.slug}
            href={`/policies/${policy.slug}`}
            className="group flex min-h-full flex-col rounded-[1.6rem] bg-paper-deep p-6 transition-colors hover:bg-tile-sand sm:p-7"
          >
            <h2 className="type-heading font-heading text-xl text-ink sm:text-2xl">
              {policy.title.split(" — ")[0]}
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">{policy.answer}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink">
              Read policy <ArrowRight className="h-4 w-4 text-gold-deep transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

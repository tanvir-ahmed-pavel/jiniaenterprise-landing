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
    <div className="pb-24">
      <PageHeader
        title="Policies."
        subtitle="Clear expectations"
        description="Operational rules we typically follow—confirm the final wording on your quote."
        breadcrumbs={[{ label: "Policies" }]}
      />
      <div className="container grid sm:grid-cols-2 gap-4">
        {policies.map((policy) => (
          <Link
            key={policy.slug}
            href={`/policies/${policy.slug}`}
            className="rounded-3xl border border-emerald-100 bg-white/70 p-6 hover:border-emerald-300 transition-colors group"
          >
            <h2 className="text-lg font-heading font-black text-emerald-950 group-hover:text-emerald-700">
              {policy.title.split(" — ")[0]}
            </h2>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{policy.answer}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-800">
              Read policy <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

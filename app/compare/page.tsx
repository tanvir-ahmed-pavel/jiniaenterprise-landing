import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { createMetadata } from "@/lib/seo/metadata";
import { comparisons } from "@/content/comparisons";
import { ArrowRight } from "lucide-react";

export const metadata = createMetadata({
  title: "Compare Car Rental Options in Dhaka",
  description:
    "Noah vs Hiace, sedan vs SUV, daily vs monthly—practical comparisons for chauffeur-driven rentals with Jinia Enterprise.",
  path: "/compare",
});

export default function CompareIndexPage() {
  return (
    <div className="pb-24">
      <PageHeader
        title="Compare options."
        subtitle="Choose by use case"
        description="Side-by-side guides so you pick capacity and package type with confidence."
        breadcrumbs={[{ label: "Compare" }]}
      />
      <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {comparisons.map((c) => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="rounded-3xl border border-emerald-100 bg-white/70 p-6 hover:border-emerald-300 transition-colors group"
          >
            <h2 className="text-lg font-heading font-black text-emerald-950 group-hover:text-emerald-700">
              {c.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{c.answer}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-800">
              Open comparison <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

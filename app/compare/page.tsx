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
    <div className="bg-white pb-20 text-ink sm:pb-28">
      <PageHeader
        title="Compare options."
        subtitle="Choose by use case"
        description="Side-by-side guides so you pick capacity and package type with confidence."
        breadcrumbs={[{ label: "Compare" }]}
      />
      <div className="container grid gap-3 pt-10 sm:grid-cols-2 sm:pt-14 lg:grid-cols-3">
        {comparisons.map((c) => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="group flex min-h-full flex-col rounded-[1.6rem] bg-paper-deep p-6 transition-colors hover:bg-tile-sand sm:p-7"
          >
            <h2 className="type-heading font-heading text-xl text-ink sm:text-2xl">
              {c.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">{c.answer}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink">
              Open comparison <ArrowRight className="h-4 w-4 text-gold-deep transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

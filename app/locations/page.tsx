import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { createMetadata } from "@/lib/seo/metadata";
import { locations } from "@/content/locations";
import { ArrowRight } from "lucide-react";

export const metadata = createMetadata({
  title: "Car Rental Locations in Dhaka",
  description:
    "Chauffeur-driven car rental coverage across Gulshan, Banani, Uttara, Dhanmondi, Mirpur, and more. Local pickup notes from Jinia Enterprise.",
  path: "/locations",
});

export default function LocationsIndexPage() {
  return (
    <div className="bg-white pb-20 text-ink sm:pb-28">
      <PageHeader
        title="Dhaka locations."
        subtitle="Where we pick you up"
        description="Area pages with real pickup context—not copy-paste keyword shells."
        breadcrumbs={[{ label: "Locations" }]}
      />
      <div className="container grid gap-3 pt-10 sm:grid-cols-2 sm:pt-14 lg:grid-cols-3">
        {locations.map((loc) => (
          <Link
            key={loc.slug}
            href={`/locations/${loc.slug}`}
            className="group flex min-h-full flex-col rounded-[1.6rem] bg-paper-deep p-6 transition-colors hover:bg-tile-sand sm:p-7"
          >
            <h2 className="type-heading font-heading text-xl text-ink sm:text-2xl">
              {loc.name}
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">{loc.answer}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink">
              Open area guide <ArrowRight className="h-4 w-4 text-gold-deep transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

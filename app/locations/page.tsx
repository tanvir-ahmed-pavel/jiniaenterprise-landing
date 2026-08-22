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
    <div className="pb-24">
      <PageHeader
        title="Dhaka locations."
        subtitle="Where we pick you up"
        description="Area pages with real pickup context—not copy-paste keyword shells."
        breadcrumbs={[{ label: "Locations" }]}
      />
      <div className="container grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((loc) => (
          <Link
            key={loc.slug}
            href={`/locations/${loc.slug}`}
            className="group rounded-3xl border border-emerald-100 bg-white/70 p-6 hover:border-emerald-300 hover:bg-white transition-colors"
          >
            <h2 className="text-xl font-heading font-black text-emerald-950 group-hover:text-emerald-700">
              {loc.name}
            </h2>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{loc.answer}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-800">
              Open area guide <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { createMetadata } from "@/lib/seo/metadata";
import { routes } from "@/content/routes";
import { ArrowRight } from "lucide-react";

export const metadata = createMetadata({
  title: "Outstation Car Rental Routes from Dhaka",
  description:
    "Chauffeur-driven routes from Dhaka to Cox’s Bazar, Sylhet, Chattogram, and Sreemangal—journey notes and booking steps.",
  path: "/routes",
});

export default function RoutesIndexPage() {
  return (
    <div className="pb-24">
      <PageHeader
        title="Outstation routes."
        subtitle="Dhaka departures"
        description="Practical route pages for trips we actually arrange—with approximate durations, not fantasy ETAs."
        breadcrumbs={[{ label: "Routes" }]}
      />
      <div className="container grid sm:grid-cols-2 gap-4">
        {routes.map((route) => (
          <Link
            key={route.slug}
            href={`/routes/${route.slug}`}
            className="group rounded-3xl border border-emerald-100 bg-white/70 p-6 hover:border-emerald-300 transition-colors"
          >
            <h2 className="text-xl font-heading font-black text-emerald-950 group-hover:text-emerald-700">
              {route.title.replace(" Car Rental with Driver", "")}
            </h2>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{route.answer}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-800">
              Route guide <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

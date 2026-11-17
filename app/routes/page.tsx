import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { createMetadata } from "@/lib/seo/metadata";
import { routes } from "@/content/routes";
import { ArrowRight } from "lucide-react";

export const metadata = createMetadata({
  title: "Outstation Car Rental Routes from Dhaka",
  description:
    "Chauffeur-driven routes from Dhaka to Cox’s Bazar, Sylhet, Rajshahi, Khulna, Barishal, Bandarban, Kuakata, and more. Journey notes and booking steps for each.",
  path: "/routes",
});

export default function RoutesIndexPage() {
  return (
    <div className="bg-white pb-20 text-ink sm:pb-28">
      <PageHeader
        title="Outstation routes."
        subtitle="Dhaka departures"
        description="Practical route pages for trips we actually arrange—with approximate durations, not fantasy ETAs."
        breadcrumbs={[{ label: "Routes" }]}
      />
      <div className="container grid gap-3 pt-10 sm:grid-cols-2 sm:pt-14">
        {routes.map((route) => (
          <Link
            key={route.slug}
            href={`/routes/${route.slug}`}
            className="group flex min-h-full flex-col rounded-[1.6rem] bg-paper-deep p-6 transition-colors hover:bg-tile-sand sm:p-7"
          >
            <h2 className="type-heading font-heading text-xl text-ink sm:text-2xl">
              {route.title.replace(" Car Rental with Driver", "")}
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/60">{route.answer}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-ink">
              Route guide <ArrowRight className="h-4 w-4 text-gold-deep transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

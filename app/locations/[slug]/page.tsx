import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { ContentPageShell } from "@/components/seo/ContentPageShell";
import { getLocationBySlug, locations } from "@/content/locations";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) return { title: "Location not found" };
  return createMetadata({
    title: loc.title,
    description: loc.description,
    path: `/locations/${loc.slug}`,
  });
}

export default async function LocationDetailPage({ params }: Props) {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  return (
    <ContentPageShell
      title={`Car rental in ${loc.name}.`}
      subtitle="Local pickup guide"
      description={loc.description}
      path={`/locations/${loc.slug}`}
      breadcrumbLabel={loc.name}
      breadcrumbs={[
        { label: "Locations", href: "/locations" },
        { label: loc.name },
      ]}
      answer={loc.answer}
      serviceName={`Car Rental in ${loc.name}`}
      sections={[
        { heading: "Coverage", body: loc.coverageNotes },
        { heading: "Pickup tips", body: loc.pickupTips },
        { heading: "Airport notes", body: loc.airportNotes },
        {
          heading: "Nearby landmarks",
          body: loc.landmarks.map((l) => `• ${l}`).join("\n"),
        },
        {
          heading: "Popular trips from here",
          body: loc.popularTrips.map((t) => `• ${t}`).join("\n"),
        },
      ]}
      faqs={loc.faqs}
      related={[
        ...loc.relatedPaths.map((href) => ({
          href,
          label: href.replace(/^\//, "").replace(/-/g, " "),
        })),
        { href: "/locations", label: "All locations" },
        { href: "/airport-car-rental", label: "Airport transfer" },
      ]}
      updatedAt="2026-08-21"
    />
  );
}

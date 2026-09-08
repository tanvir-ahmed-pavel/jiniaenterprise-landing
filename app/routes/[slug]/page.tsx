import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { ContentPageShell } from "@/components/seo/ContentPageShell";
import { getRouteBySlug, routes } from "@/content/routes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return { title: "Route not found" };
  return createMetadata({
    title: route.title,
    description: route.description,
    path: `/routes/${route.slug}`,
  });
}

export default async function RouteDetailPage({ params }: Props) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) notFound();

  return (
    <ContentPageShell
      title={route.title.replace(" Car Rental with Driver", ".")}
      subtitle="Outstation with driver"
      description={route.description}
      path={`/routes/${route.slug}`}
      breadcrumbLabel={route.slug}
      breadcrumbs={[
        { label: "Routes", href: "/routes" },
        { label: route.title.split(" Car")[0] },
      ]}
      answer={route.answer}
      serviceName={route.title}
      sections={[
        { heading: "Typical duration", body: route.typicalDuration },
        {
          heading: "Vehicle suggestions",
          body: route.vehicleSuggestions.map((v) => `• ${v}`).join("\n"),
        },
        { heading: "Luggage", body: route.luggageNotes },
        { heading: "One-way vs round-trip", body: route.oneWayVsRoundTrip },
        { heading: "Overnight policy", body: route.overnightPolicy },
        { heading: "Stops & considerations", body: route.stopsConsiderations },
        {
          heading: "How to book",
          body: route.bookingSteps.map((s, i) => `${i + 1}. ${s}`).join("\n"),
        },
      ]}
      faqs={route.faqs}
      related={[
        { href: "/routes", label: "All routes" },
        { href: "/car-rental-with-driver", label: "With driver" },
        { href: "/vehicles", label: "Fleet" },
        { href: "/pricing", label: "Pricing method" },
      ]}
      updatedAt="2026-08-21"
    />
  );
}

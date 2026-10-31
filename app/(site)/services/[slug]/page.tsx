import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { ContentPageShell } from "@/components/seo/ContentPageShell";
import {
  getServiceDetailBySlug,
  serviceDetails,
} from "@/content/service-details";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);
  if (!service) return { title: "Service not found" };
  return createMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);
  if (!service) notFound();

  return (
    <ContentPageShell
      title={`${service.title}.`}
      subtitle="Service detail"
      description={service.description}
      path={`/services/${service.slug}`}
      breadcrumbLabel={service.slug}
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: service.title },
      ]}
      answer={service.answer}
      serviceName={service.title}
      sections={[
        { heading: "Who it’s for", body: service.whoFor },
        {
          heading: "What’s typically included",
          body: service.whatsIncluded.map((i) => `• ${i}`).join("\n"),
        },
        {
          heading: "How it works",
          body: service.howItWorks.map((s, i) => `${i + 1}. ${s}`).join("\n"),
        },
        { heading: "Vehicles", body: service.vehicleNotes },
        {
          heading: "Planning tips",
          body: service.planningTips.map((t) => `• ${t}`).join("\n"),
        },
      ]}
      faqs={service.faqs}
      related={service.relatedPaths.map((href) => ({
        href,
        label: href.replace(/^\//, "").replace(/-/g, " "),
      }))}
      updatedAt="2026-08-21"
    />
  );
}

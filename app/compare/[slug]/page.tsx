import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { ContentPageShell } from "@/components/seo/ContentPageShell";
import { getComparisonBySlug, comparisons } from "@/content/comparisons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return { title: "Comparison not found" };
  return createMetadata({
    title: comparison.title,
    description: comparison.description,
    path: `/compare/${comparison.slug}`,
  });
}

export default async function ComparisonDetailPage({ params }: Props) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  return (
    <ContentPageShell
      title={`${comparison.title}.`}
      subtitle="Comparison"
      description={comparison.description}
      path={`/compare/${comparison.slug}`}
      breadcrumbLabel={comparison.slug}
      breadcrumbs={[
        { label: "Compare", href: "/compare" },
        { label: comparison.title },
      ]}
      answer={comparison.answer}
      sections={[
        {
          heading: comparison.left.name,
          body: comparison.left.points.map((p) => `• ${p}`).join("\n"),
        },
        {
          heading: comparison.right.name,
          body: comparison.right.points.map((p) => `• ${p}`).join("\n"),
        },
        {
          heading: "Shared considerations",
          body: comparison.sharedConsiderations.map((p) => `• ${p}`).join("\n"),
        },
        {
          heading: `Choose ${comparison.left.name} when`,
          body: comparison.chooseLeftWhen.map((p) => `• ${p}`).join("\n"),
        },
        {
          heading: `Choose ${comparison.right.name} when`,
          body: comparison.chooseRightWhen.map((p) => `• ${p}`).join("\n"),
        },
      ]}
      faqs={comparison.faqs}
      related={[
        ...comparison.relatedPaths.map((href) => ({
          href,
          label: href.replace(/^\//, "").replace(/-/g, " "),
        })),
        { href: "/compare", label: "All comparisons" },
      ]}
      updatedAt="2026-08-21"
    />
  );
}

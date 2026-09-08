import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { ContentPageShell } from "@/components/seo/ContentPageShell";
import { getPolicyBySlug, policies } from "@/content/policies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);
  if (!policy) return { title: "Policy not found" };
  return createMetadata({
    title: policy.title,
    description: policy.description,
    path: `/policies/${policy.slug}`,
  });
}

export default async function PolicyDetailPage({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);
  if (!policy) notFound();

  return (
    <ContentPageShell
      title={`${policy.title.split(" — ")[0]}.`}
      subtitle="Policy"
      description={policy.description}
      path={`/policies/${policy.slug}`}
      breadcrumbLabel={policy.slug}
      breadcrumbs={[
        { label: "Policies", href: "/policies" },
        { label: policy.title.split(" — ")[0] },
      ]}
      answer={policy.answer}
      sections={policy.sections}
      faqs={policy.faqs}
      related={[
        { href: "/policies", label: "All policies" },
        { href: "/pricing", label: "Pricing method" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact" },
      ]}
      updatedAt="2026-08-21"
    />
  );
}

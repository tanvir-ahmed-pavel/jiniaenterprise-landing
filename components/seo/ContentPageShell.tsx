import type { FaqItem } from "@/lib/seo/types";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { LastUpdated } from "@/components/seo/LastUpdated";
import { BusinessContact } from "@/components/business/BusinessContact";
import {
  getBreadcrumbSchema,
  getFAQSchema,
  getServiceSchema,
} from "@/lib/seo/schema";
import {
  businessIdentity,
  getTelHref,
  getWhatsAppHref,
} from "@/lib/business/identity";
import Link from "next/link";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Section = { heading: string; body: string };

type Props = {
  title: string;
  subtitle?: string;
  description: string;
  path: string;
  breadcrumbLabel: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  answer: string;
  sections: Section[];
  faqs?: FaqItem[];
  related?: Array<{ href: string; label: string }>;
  serviceName?: string;
  children?: React.ReactNode;
  updatedAt?: string;
};

export function ContentPageShell({
  title,
  subtitle,
  description,
  path,
  breadcrumbLabel,
  breadcrumbs,
  answer,
  sections,
  faqs = [],
  related = [],
  serviceName,
  children,
  updatedAt,
}: Props) {
  const crumbs = breadcrumbs ?? [{ label: breadcrumbLabel }];
  const schemaCrumbs = [
    { name: "Home", path: "/" },
    ...crumbs.map((c, i) => ({
      name: c.label,
      path: c.href ?? (i === crumbs.length - 1 ? path : c.href ?? path),
    })),
  ];

  const schemas: Array<Record<string, unknown>> = [
    getBreadcrumbSchema(schemaCrumbs),
  ];
  if (serviceName) {
    schemas.unshift(
      getServiceSchema({
        name: serviceName,
        description,
        path,
        serviceType: serviceName,
      }),
    );
  }
  if (faqs.length) schemas.push(getFAQSchema(faqs));

  return (
    <div className="pb-24">
      <JsonLd data={schemas} />
      <PageHeader
        title={title}
        subtitle={subtitle}
        description={description}
        breadcrumbs={crumbs}
      />

      <div className="container max-w-3xl space-y-12">
        {updatedAt && <LastUpdated date={updatedAt} />}

        <section className="rounded-3xl border border-emerald-200/60 bg-white/70 p-8 md:p-10 shadow-sm space-y-6">
          <p className="text-lg md:text-xl font-medium text-emerald-950 leading-relaxed">
            {answer}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={getTelHref()}>
              <Button className="gap-2 rounded-full bg-emerald-900 hover:bg-emerald-800">
                <Phone className="h-4 w-4" />
                Call {businessIdentity.phone}
              </Button>
            </a>
            <a
              href={getWhatsAppHref(`Hello, I need a quote related to ${title}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2 rounded-full border-emerald-300">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
            </a>
            <Link href="/booking">
              <Button variant="ghost" className="gap-2 rounded-full">
                Booking form <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {children}

        {sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-heading font-black text-emerald-950 tracking-tight">
              {section.heading}
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium whitespace-pre-line">
              {section.body}
            </p>
          </section>
        ))}

        {faqs.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-heading font-black text-emerald-950 tracking-tight">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-emerald-100 bg-white/60 p-6"
                >
                  <h3 className="text-lg font-heading font-bold text-emerald-950">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && <RelatedLinks links={related} />}

        <BusinessContact />
      </div>
    </div>
  );
}

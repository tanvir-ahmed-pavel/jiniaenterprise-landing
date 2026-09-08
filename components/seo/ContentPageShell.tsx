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

      <div className="container max-w-3xl space-y-14 pt-14">
        {updatedAt && <LastUpdated date={updatedAt} />}

        <section className="border-y border-emerald-950/10 py-8 md:py-10 space-y-6">
          <p className="type-body text-lg leading-relaxed text-emerald-950/85 md:text-xl">
            {answer}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={getTelHref()}>
              <Button className="h-11 gap-2 rounded-full bg-emerald-950 px-6 text-sm font-medium hover:bg-emerald-800">
                <Phone className="h-4 w-4" />
                Call {businessIdentity.phone}
              </Button>
            </a>
            <a
              href={getWhatsAppHref(`Hello, I need a quote related to ${title}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="h-11 gap-2 rounded-full border-emerald-950/15 px-6 text-sm font-medium hover:border-amber-400">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
            </a>
            <Link href="/booking">
              <Button variant="ghost" className="h-11 gap-2 rounded-full px-5 text-sm font-medium">
                Booking form <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {children}

        {sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="type-heading font-heading text-[1.65rem] text-emerald-950 md:text-[2rem]">
              {section.heading}
            </h2>
            <p className="type-body text-[0.975rem] leading-relaxed text-emerald-950/60 whitespace-pre-line sm:text-base">
              {section.body}
            </p>
          </section>
        ))}

        {faqs.length > 0 && (
          <section className="space-y-6">
            <h2 className="type-heading font-heading text-[1.65rem] text-emerald-950 md:text-[2rem]">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border-t border-emerald-950/10 py-6"
                >
                  <h3 className="type-heading font-heading text-lg text-emerald-950">
                    {faq.question}
                  </h3>
                  <p className="type-body mt-3 text-[0.95rem] leading-relaxed text-emerald-950/60">{faq.answer}</p>
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

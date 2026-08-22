import Link from "next/link";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
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
import type { FaqItem } from "@/lib/seo/types";

type RelatedLink = { href: string; label: string };

type SeoPillarPageProps = {
  title: string;
  subtitle: string;
  description: string;
  path: string;
  breadcrumbLabel: string;
  answer: string;
  sections: Array<{ heading: string; body: string }>;
  faqs?: FaqItem[];
  related?: RelatedLink[];
  serviceName: string;
};

export function SeoPillarPage({
  title,
  subtitle,
  description,
  path,
  breadcrumbLabel,
  answer,
  sections,
  faqs = [],
  related = [],
  serviceName,
}: SeoPillarPageProps) {
  const schemas = [
    getServiceSchema({
      name: serviceName,
      description,
      path,
      serviceType: serviceName,
    }),
    getBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: breadcrumbLabel, path },
    ]),
    ...(faqs.length ? [getFAQSchema(faqs)] : []),
  ];

  return (
    <div className="pb-24">
      <JsonLd data={schemas} />
      <PageHeader
        title={title}
        subtitle={subtitle}
        description={description}
        breadcrumbs={[{ label: breadcrumbLabel }]}
      />

      <div className="container max-w-3xl space-y-14">
        <section className="rounded-3xl border border-emerald-200/60 bg-white/70 p-8 md:p-10 shadow-sm">
          <p className="text-lg md:text-xl font-medium text-emerald-950 leading-relaxed">
            {answer}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={getTelHref()}>
              <Button className="gap-2 rounded-full bg-emerald-900 hover:bg-emerald-800">
                <Phone className="h-4 w-4" />
                Call {businessIdentity.phone}
              </Button>
            </a>
            <a
              href={getWhatsAppHref(
                `Hello, I need a quote for ${serviceName}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="gap-2 rounded-full border-emerald-300"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
            </a>
            <Link href="/booking">
              <Button variant="ghost" className="gap-2 rounded-full">
                Request booking <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-heading font-black text-emerald-950 tracking-tight">
              {section.heading}
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium">
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
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-heading font-black text-emerald-950">
              Related services
            </h2>
            <ul className="flex flex-wrap gap-3">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-3xl bg-emerald-950 text-white p-8 md:p-10 space-y-3">
          <h2 className="text-2xl font-heading font-black">
            Talk to the Dhaka desk
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-xl">
            {businessIdentity.brandName} · {businessIdentity.address.street},{" "}
            {businessIdentity.address.locality}, {businessIdentity.address.city}{" "}
            {businessIdentity.address.postalCode}
          </p>
          <p className="text-emerald-300 text-sm font-semibold">
            {businessIdentity.phone} · {businessIdentity.email}
          </p>
        </section>
      </div>
    </div>
  );
}

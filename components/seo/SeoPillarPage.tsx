import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactActions } from "@/components/business/ContactActions";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbSchema,
  getFAQSchema,
  getServiceSchema,
} from "@/lib/seo/schema";
import { businessIdentity } from "@/lib/business/identity";
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
  /** Extra sections rendered after the answer block. */
  children?: React.ReactNode;
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
  children,
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

      <div className="container max-w-3xl space-y-14 pt-14">
        <section className="border-y border-emerald-950/10 py-8 md:py-10">
          <p className="type-body text-lg leading-relaxed text-emerald-950/85 md:text-xl">
            {answer}
          </p>
          <ContactActions className="mt-8" whatsappMessage={`Hello Jinia, I need a quote for ${serviceName}.`} bookingLabel="Request booking" />
        </section>

        {children}

        {sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="type-heading font-heading text-[1.65rem] text-emerald-950 md:text-[2rem]">
              {section.heading}
            </h2>
            <p className="type-body text-[0.975rem] leading-relaxed text-emerald-950/60 sm:text-base">
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
                  <p className="type-body mt-3 text-[0.95rem] leading-relaxed text-emerald-950/60">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="space-y-4">
            <h2 className="type-heading font-heading text-xl text-emerald-950">
              Related services
            </h2>
            <ul className="flex flex-wrap gap-3">
              {related.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 border-b border-emerald-950/15 pb-1 text-sm font-normal text-emerald-950/75 transition-colors hover:border-amber-400 hover:text-emerald-700"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="jinia-on-dark space-y-3 rounded-2xl bg-[#0d1310] bg-[radial-gradient(110%_120%_at_50%_0%,#26332c_0%,#161f1a_50%,#0d1310_85%)] p-8 text-white md:p-10">
          <h2 className="type-heading font-heading text-2xl">
            Talk to the desk
          </h2>
          <p className="type-body max-w-xl text-sm leading-relaxed text-white/60">
            {businessIdentity.brandName} · {businessIdentity.address.street},{" "}
            {businessIdentity.address.locality}, {businessIdentity.address.city}{" "}
            {businessIdentity.address.postalCode} · serving Dhaka and every district in Bangladesh
          </p>
          <p className="text-sm font-normal text-amber-300">
            {businessIdentity.phone} · {businessIdentity.email}
          </p>
        </section>
      </div>
    </div>
  );
}

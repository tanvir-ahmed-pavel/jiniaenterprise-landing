import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  AnswerCard,
  ClosingCta,
  FaqList,
  PillLinks,
  ProseSections,
} from "@/components/seo/ContentPageShell";
import {
  getBreadcrumbSchema,
  getFAQSchema,
  getServiceSchema,
} from "@/lib/seo/schema";
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

  const whatsappMessage = `Hello, I need a quote for ${serviceName}.`;

  return (
    <div className="bg-white pb-20 text-ink sm:pb-28">
      <JsonLd data={schemas} />
      <PageHeader
        title={title}
        subtitle={subtitle}
        description={description}
        breadcrumbs={[{ label: breadcrumbLabel }]}
      />

      <div className="container space-y-16 pt-10 sm:space-y-20 sm:pt-14">
        <div className="max-w-4xl">
          <AnswerCard answer={answer} whatsappMessage={whatsappMessage} bookingLabel="Request booking" />
        </div>

        <ProseSections sections={sections} />

        {faqs.length > 0 && (
          <div className="max-w-4xl">
            <FaqList faqs={faqs} />
          </div>
        )}

        <PillLinks links={related} title="Related services" />

        <ClosingCta whatsappMessage={whatsappMessage} />
      </div>
    </div>
  );
}

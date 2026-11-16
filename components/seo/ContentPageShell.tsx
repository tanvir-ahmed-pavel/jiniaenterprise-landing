import type { FaqItem } from "@/lib/seo/types";
import { PageHeader } from "@/components/layout/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBreadcrumbSchema,
  getFAQSchema,
  getServiceSchema,
} from "@/lib/seo/schema";
import {
  businessIdentity,
  getFormattedAddress,
  getTelHref,
  getWhatsAppHref,
} from "@/lib/business/identity";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone, Plus } from "lucide-react";
import { OpenWizardButton } from "@/components/wizard/OpenWizardButton";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";

type Section = { heading: string; body: string };
type LinkItem = { href: string; label: string };

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
  related?: LinkItem[];
  serviceName?: string;
  children?: React.ReactNode;
  updatedAt?: string;
};

/* ------------------------------------------------------------------ */
/* Shared parts. SeoPillarPage and the FAQ page are built from these   */
/* so every content page reads the same way as the home page.         */
/* ------------------------------------------------------------------ */

const primaryCta =
  "group inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft";
const goldCircle =
  "flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5";

/** Primary request button: opens the site-wide request wizard. */
export function RequestQuoteButton({ label = "Request a quote" }: { label?: string }) {
  return (
    <OpenWizardButton className={primaryCta}>
      {label}
      <span className={goldCircle}>
        <ArrowRight className="h-4 w-4" />
      </span>
    </OpenWizardButton>
  );
}

/** WhatsApp pill with the number and an "opens elsewhere" cue. */
export function WhatsAppPill({ message, className = "" }: { message?: string; className?: string }) {
  return (
    <a
      href={getWhatsAppHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`}
      className={`group inline-flex h-14 items-center gap-2 rounded-full px-5 text-sm font-semibold text-ink ring-1 ring-ink/15 transition-colors hover:bg-white ${className}`}
    >
      <WhatsAppIcon className="h-[1.1rem] w-[1.1rem] text-[#128C4B]" />
      <span className="tabular-nums">{whatsappDisplay}</span>
      <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

/** "Display words" + serif accent on the last word, like the home headings. */
export function AccentHeading({
  text,
  as: Tag = "h2",
  className = "text-[clamp(2rem,5vw,3.2rem)]",
}: {
  text: string;
  as?: "h2" | "h3";
  className?: string;
}) {
  const t = text.trim();
  const cut = t.lastIndexOf(" ");
  const head = cut < 0 ? "" : t.slice(0, cut + 1);
  const tail = cut < 0 ? t : t.slice(cut + 1);
  return (
    <Tag className={`type-display font-heading text-ink [overflow-wrap:anywhere] ${className}`}>
      {head}
      <span className="type-accent text-gold-deep">{tail}</span>
    </Tag>
  );
}

function formatUpdated(date: string): string {
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return date;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(value);
}

/** The short answer up top, on a soft tint with the three ways to reach the desk. */
export function AnswerCard({
  answer,
  whatsappMessage,
  bookingLabel = "Booking form",
  updatedAt,
}: {
  answer: string;
  whatsappMessage?: string;
  bookingLabel?: string;
  updatedAt?: string;
}) {
  return (
    <section aria-label="The short answer" className="rounded-[1.6rem] bg-paper-deep p-6 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">The short answer</p>
        {updatedAt && (
          <p className="text-xs font-medium text-ink/45">Updated {formatUpdated(updatedAt)}</p>
        )}
      </div>
      <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink/85 sm:text-xl">{answer}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <RequestQuoteButton />
        <WhatsAppPill message={whatsappMessage} />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
        <a
          href={getTelHref()}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink/70 transition-colors hover:text-ink"
        >
          <Phone className="h-4 w-4 text-gold-deep" /> Call {businessIdentity.phone}
        </a>
        <Link
          href="/booking"
          className="inline-flex min-h-11 items-center font-semibold underline decoration-gold decoration-2 underline-offset-[6px]"
        >
          {bookingLabel}
        </Link>
      </div>
    </section>
  );
}

/** Body copy: clean heading + paragraph, held to a reading width. */
export function ProseSections({ sections }: { sections: Section[] }) {
  if (!sections.length) return null;
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.heading} className="max-w-[68ch]">
          <h2 className="type-display font-heading text-[clamp(1.8rem,4.5vw,2.6rem)] text-ink">
            {section.heading}
          </h2>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-ink/65 sm:text-[1.05rem]">
            {section.body}
          </p>
        </section>
      ))}
    </div>
  );
}

/** FAQs in the home page's `jx-faq` disclosure style. */
export function FaqList({
  faqs,
  title = "Common questions.",
  headingLevel = "h2",
}: {
  faqs: FaqItem[];
  title?: string;
  headingLevel?: "h2" | "h3";
}) {
  if (!faqs.length) return null;
  return (
    <section>
      <AccentHeading text={title} as={headingLevel} />
      <div className="mt-8">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="jx-faq group mb-3 rounded-2xl bg-paper-deep px-5 transition-colors open:bg-tile-sand sm:px-6"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-semibold tracking-tight sm:gap-6 sm:text-lg [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper transition-transform duration-300 group-open:rotate-45"
              >
                <Plus className="h-4 w-4" />
              </span>
            </summary>
            <p className="max-w-2xl pb-6 pr-2 text-[0.95rem] leading-relaxed text-ink/65 sm:pr-12">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Related pages as pill links. */
export function PillLinks({ links, title = "Related pages" }: { links: LinkItem[]; title?: string }) {
  if (!links.length) return null;
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex h-11 items-center gap-1.5 rounded-full bg-paper-deep px-4 text-sm font-semibold text-ink transition-colors hover:bg-tile-sand"
            >
              {link.label}
              <ArrowRight className="h-3.5 w-3.5 text-gold-deep transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Closing card: sand tint, the request button, WhatsApp, and the desk's details. */
export function ClosingCta({
  whatsappMessage,
  title = "Talk to the desk.",
  lede = "Tell us the trip. A person replies with one fixed price, usually inside the hour. No deposit to ask.",
}: {
  whatsappMessage?: string;
  title?: string;
  lede?: string;
}) {
  const { brandName, phone, phoneSecondary, email } = businessIdentity;
  return (
    <section className="rounded-[2rem] bg-tile-sand p-6 text-ink sm:p-12">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">The desk is open 24/7</p>
          <AccentHeading text={title} className="mt-4 text-[clamp(2.4rem,7vw,4.4rem)]" />
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/65">{lede}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
          <RequestQuoteButton />
          <WhatsAppPill message={whatsappMessage} />
        </div>
      </div>

      <address className="mt-10 grid gap-6 border-t border-ink/10 pt-8 not-italic sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Call</p>
          <a href={getTelHref()} className="mt-2 inline-flex min-h-11 items-center text-base font-semibold hover:text-gold-deep">
            {phone}
          </a>
          {phoneSecondary && (
            <a href={getTelHref(phoneSecondary)} className="block py-3 -my-3 text-sm text-ink/60 hover:text-gold-deep">
              {phoneSecondary}
            </a>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Email</p>
          <a href={`mailto:${email}`} className="mt-2 inline-flex min-h-11 items-center break-all text-sm font-semibold hover:text-gold-deep">
            {email}
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Office</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            {brandName}
            <br />
            {getFormattedAddress()}
          </p>
        </div>
      </address>
    </section>
  );
}

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

  const whatsappMessage = `Hello, I need a quote related to ${title}.`;

  return (
    <div className="bg-white pb-20 text-ink sm:pb-28">
      <JsonLd data={schemas} />
      <PageHeader
        title={title}
        subtitle={subtitle}
        description={description}
        breadcrumbs={crumbs}
      />

      <div className="container space-y-16 pt-10 sm:space-y-20 sm:pt-14">
        <div className="max-w-4xl">
          <AnswerCard answer={answer} whatsappMessage={whatsappMessage} updatedAt={updatedAt} />
        </div>

        {children && <div className="max-w-4xl space-y-16">{children}</div>}

        <ProseSections sections={sections} />

        {faqs.length > 0 && (
          <div className="max-w-4xl">
            <FaqList faqs={faqs} />
          </div>
        )}

        <PillLinks links={related} />

        <ClosingCta whatsappMessage={whatsappMessage} />
      </div>
    </div>
  );
}

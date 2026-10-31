import Link from "next/link";
import { ChevronRight, MessageSquare, Phone } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getFAQSchema, getServiceSchema } from "@/lib/seo/schema";
import { getTelHref, getWhatsAppHref, getFormattedAddress } from "@/lib/business/identity";
import { BN_COPY, bnPriceRows, type BnPage } from "@/content/bn/pages";
import { MeetAndGreetSign } from "@/components/airport/MeetAndGreetSign";

/**
 * Layout for the /bn pages. Same structure as the English content pages,
 * all copy in Bangla, all text in the server HTML.
 */
export function BanglaPageShell({ page }: { page: BnPage }) {
  const crumbPaths = page.breadcrumb.map((crumb, index) =>
    index === page.breadcrumb.length - 1
      ? page.path
      : crumb.href ?? (page.path.includes("/services/") ? "/services" : "/routes"),
  );

  const schemas = [
    {
      ...getServiceSchema({
        name: page.serviceName,
        description: page.metaDescription,
        path: page.path,
        serviceType: page.serviceName,
      }),
      inLanguage: "bn-BD",
    },
    getBreadcrumbSchema([
      { name: BN_COPY.home, path: "/" },
      ...page.breadcrumb.map((crumb, index) => ({ name: crumb.label, path: crumbPaths[index] })),
    ]),
    { ...getFAQSchema(page.faqs), inLanguage: "bn-BD" },
  ];

  return (
    <div className="pb-24">
      <JsonLd data={schemas} />

      <section className="relative -mt-16 overflow-hidden border-b border-emerald-950/10 bg-[radial-gradient(120%_85%_at_50%_-10%,rgba(198,157,75,.08),transparent_60%),linear-gradient(180deg,#f2f7f3_0%,#fbfdfb_70%,#ffffff_100%)] pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="container max-w-4xl">
          <nav aria-label="ব্রেডক্রাম্ব" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-emerald-950/55">
            <Link href="/" className="hover:text-emerald-700">{BN_COPY.home}</Link>
            {page.breadcrumb.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-2">
                <ChevronRight aria-hidden className="h-3 w-3 text-emerald-950/30" />
                {index === page.breadcrumb.length - 1 ? (
                  <span className="text-emerald-800">{crumb.label}</span>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          <p className="flex items-center gap-3 font-board text-xs tracking-[0.12em] text-emerald-700">
            <span aria-hidden className="h-px w-6 bg-amber-400" />
            {page.eyebrow}
          </p>
          <h1 className="mt-6 text-[2.3rem] font-semibold leading-[1.2] text-emerald-950 sm:text-[3.2rem]">
            {page.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-emerald-950/70">{page.intro}</p>
          <p className="mt-4 text-sm">
            <Link href={page.enPath} hrefLang="en-BD" lang="en" className="text-emerald-800 underline underline-offset-4">
              {BN_COPY.englishVersion}
            </Link>
          </p>
        </div>
      </section>

      <div className="container max-w-3xl space-y-14 pt-14">
        <section className="space-y-6 border-y border-emerald-950/10 py-8 md:py-10">
          <p className="text-lg leading-[1.9] text-emerald-950/85 md:text-xl">{page.answer}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={getWhatsAppHref(page.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="bn_whatsapp"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-950 px-6 text-base font-medium text-white transition-colors hover:bg-emerald-800"
            >
              <MessageSquare aria-hidden className="h-4 w-4" /> {BN_COPY.whatsapp}
            </a>
            <a
              href={getTelHref()}
              data-umami-event="bn_call"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-emerald-950/20 px-6 text-base font-medium text-emerald-950 transition-colors hover:border-amber-400"
            >
              <Phone aria-hidden className="h-4 w-4" /> {BN_COPY.call}
            </a>
          </div>
        </section>

        {page.showPriceTable && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-emerald-950 md:text-[1.75rem]">{BN_COPY.prices}</h2>
            <div className="overflow-x-auto rounded-lg border border-emerald-950/12">
              <table className="w-full text-base">
                <thead className="bg-emerald-950 text-white">
                  <tr>
                    <th scope="col" className="p-3 text-left font-medium">{BN_COPY.vehicle}</th>
                    <th scope="col" className="p-3 text-left font-medium">{BN_COPY.seats}</th>
                    <th scope="col" className="p-3 text-left font-medium">{BN_COPY.from}</th>
                  </tr>
                </thead>
                <tbody>
                  {bnPriceRows.map((row) => (
                    <tr key={row.label} className="border-t border-emerald-950/8">
                      <td className="p-3 text-emerald-950">{row.label}</td>
                      <td className="p-3 text-emerald-950/70">{row.seats}</td>
                      <td className="p-3 font-medium text-emerald-900">{row.from}/দিন</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm leading-relaxed text-emerald-950/65">{BN_COPY.pricesNote}</p>
          </section>
        )}

        {page.steps && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-emerald-950 md:text-[1.75rem]">{page.steps.title}</h2>
            <MeetAndGreetSign
              lang="bn"
              steps={page.steps.items}
            />
          </section>
        )}

        {page.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-2xl font-semibold text-emerald-950 md:text-[1.75rem]">{section.heading}</h2>
            <p className="text-base leading-[1.9] text-emerald-950/70 sm:text-[1.0625rem]">{section.body}</p>
          </section>
        ))}

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-emerald-950 md:text-[1.75rem]">{BN_COPY.faq}</h2>
          {page.faqs.map((faq) => (
            <div key={faq.question} className="border-t border-emerald-950/10 py-5">
              <h3 className="text-lg font-semibold text-emerald-950">{faq.question}</h3>
              <p className="mt-2 text-base leading-[1.9] text-emerald-950/70">{faq.answer}</p>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-950">{BN_COPY.related}</h2>
          <ul className="flex flex-wrap gap-2">
            {page.related.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-full border border-emerald-950/15 px-4 text-sm text-emerald-950 transition-colors hover:border-amber-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg bg-emerald-950 p-8 text-white">
          <h2 className="text-xl font-semibold">{BN_COPY.contact}</h2>
          <p className="mt-3 leading-relaxed text-white/75">{BN_COPY.brand} · {BN_COPY.address}</p>
          <p lang="en" className="mt-1 text-sm text-white/50">{getFormattedAddress()}</p>
          <p className="mt-3 text-amber-300">{BN_COPY.call}</p>
        </section>
      </div>
    </div>
  );
}

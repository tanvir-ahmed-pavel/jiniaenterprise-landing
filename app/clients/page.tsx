import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { clientService } from "@/lib/supabase/admin-service";
import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/layout/PageHeader";
import { CountUp } from "@/components/trip/CountUp";
import { OpenWizardButton } from "@/components/wizard/OpenWizardButton";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";
import { siteConfig } from "@/lib/config";

export const revalidate = 60; // Revalidate every minute

export const metadata = createMetadata({
  title: "Corporate & Embassy Clients in Dhaka",
  description:
    "Jinia Enterprise serves embassies, international organizations, and corporations with chauffeur-driven transport and executive fleet rental across Bangladesh.",
  path: "/clients",
});

const eyebrow = "text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep";

function monogram(name: string) {
  return name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default async function ClientsPage() {
  const clients = await clientService.getActive();

  const embassies = clients.filter((c) => c.type === "Embassy");
  const organizations = clients.filter((c) => c.type === "International Organization");
  const corporates = clients.filter((c) => c.type !== "Embassy" && c.type !== "International Organization");

  const sections = [
    {
      id: "embassies",
      label: "Embassies & missions",
      title: "Embassies &",
      accent: "missions",
      subtitle: "High-security diplomatic transport with BRTA-verified protocol chauffeurs",
      items: embassies,
      bg: "bg-tile-mist",
    },
    {
      id: "organizations",
      label: "International organizations",
      title: "International",
      accent: "organizations",
      subtitle: "United Nations agencies, humanitarian missions & development councils",
      items: organizations,
      bg: "bg-tile-sage",
    },
    {
      id: "corporates",
      label: "Corporate enterprises",
      title: "Corporate",
      accent: "enterprises",
      subtitle: "Executive staff commutes, factory EPZ visits, and long-term fleet retainers",
      items: corporates,
      bg: "bg-tile-sand",
    },
  ].filter((s) => s.items.length > 0);

  const counts = [
    { v: String(clients.length), l: "Clients served" },
    ...sections.map((s) => ({ v: String(s.items.length), l: s.label })),
  ];

  return (
    <div className="overflow-x-clip bg-white text-ink">
      <PageHeader
        title="Distinguished Clients."
        subtitle="Trusted Partnerships"
        description="Serving embassies, international diplomatic missions, and leading multinational enterprises across Bangladesh for over a decade."
        breadcrumbs={[{ label: "Clients" }]}
      />

      {/* Counts, the home page's hairline row. */}
      <section className="bg-white pt-12 sm:pt-16">
        <div className="container">
          <dl className="grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4">
            {counts.map((s, i) => (
              <div key={s.l} className={`pt-6 ${i % 2 ? "border-l border-ink/15 pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-ink/15 lg:pl-6" : ""} ${i > 1 ? "mt-6 lg:mt-0" : ""}`}>
                <dd className="font-heading text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.05em]"><CountUp value={s.v} /></dd>
                <dt className="mt-2 text-xs font-medium text-ink/55">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The list, grouped by type. Names only — no invented quotes. */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container space-y-4">
          {sections.map((section) => (
            <div key={section.id} className={`rounded-[2rem] p-6 sm:p-9 ${section.bg}`}>
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <p className={eyebrow}>{section.items.length} {section.items.length === 1 ? "client" : "clients"}</p>
                  <h2 className="type-display mt-4 font-heading text-[clamp(2rem,4vw,3rem)]">
                    {section.title} <span className="type-accent text-gold-deep">{section.accent}</span>
                  </h2>
                  <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-ink/65">{section.subtitle}</p>
                </div>
                <ul className="grid content-start gap-2 sm:grid-cols-2 lg:col-span-8">
                  {section.items.map((client) => {
                    const inner = (
                      <>
                        {client.logo_url ? (
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={client.logo_url} alt="" className="max-h-full max-w-full object-contain" />
                          </span>
                        ) : (
                          <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper text-xs font-semibold text-ink/60">
                            {monogram(client.name)}
                          </span>
                        )}
                        <span className="min-w-0 flex-1 font-heading text-base font-semibold leading-snug tracking-[-0.02em]">{client.name}</span>
                        {client.website_url && <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                      </>
                    );
                    const cls = "flex min-h-14 items-center gap-3 rounded-2xl bg-paper/70 px-3 py-2.5";
                    return (
                      <li key={client.id || client.name}>
                        {client.website_url ? (
                          <a href={client.website_url} target="_blank" rel="noopener noreferrer" aria-label={`${client.name} website (opens in a new tab)`} className={`group ${cls} transition-colors hover:bg-paper`}>
                            {inner}
                          </a>
                        ) : (
                          <div className={cls}>{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate retainer closing. */}
      <section className="bg-paper-deep py-20 text-ink sm:py-28">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className={eyebrow}>Corporate transport solutions</p>
            <h2 className="type-display mt-4 font-heading text-[clamp(2.4rem,5.5vw,4.6rem)]">
              Partner with Dhaka&rsquo;s most <span className="type-accent text-gold-deep">reliable fleet.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-sm text-base text-ink/65">
              Custom monthly lease retainers, executive chauffeur standby, and centralized VAT billing for corporations and diplomatic missions.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <OpenWizardButton className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
                Request a quote
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5"><ArrowRight className="h-4 w-4" /></span>
              </OpenWizardButton>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                  "Hello Jinia Enterprise, I would like to inquire about corporate / embassy vehicle services."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp the corporate desk on ${whatsappDisplay} (opens WhatsApp)`}
                className="group inline-flex h-14 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-ink/20 transition-colors hover:bg-white"
              >
                <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" /> <span className="tabular-nums">{whatsappDisplay}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <Link href="/contact" className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">
              Corporate inquiry <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { companyHistory, whyChooseUs, siteConfig, teamMembers } from "@/lib/config";
import { PageHeader } from "@/components/layout/PageHeader";
import { CountUp } from "@/components/trip/CountUp";
import { OpenWizardButton } from "@/components/wizard/OpenWizardButton";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";

export const metadata = createMetadata({
  title: "About Jinia Enterprise — Car Rental in Dhaka",
  description:
    "Jinia Enterprise has provided chauffeur-driven car and bus rental in Dhaka since 2014. Learn our story, fleet, and how we serve corporates and embassies.",
  path: "/about",
});

const stats = [
  { v: "10+", l: "Years in service" },
  { v: "50+", l: "Vehicles in fleet" },
  { v: "100%", l: "Verified drivers" },
  { v: "24/7", l: "Customer helpline" },
];

const guides = [
  { label: "Mission", text: companyHistory.mission, bg: "bg-tile-sage" },
  { label: "Vision", text: companyHistory.vision, bg: "bg-tile-mist" },
];

const teamTints = ["bg-tile-sand", "bg-tile-sage", "bg-tile-mist", "bg-tile-stone"];

const eyebrow = "text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep";

function initials(name: string) {
  return name
    .replace(/^MD\.\s*/, "")
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export default function AboutPage() {
  return (
    <div className="overflow-x-clip bg-white text-ink">
      <PageHeader
        title="Since 2014."
        subtitle="Our story"
        description="A decade of chauffeur-driven car and bus rental — built one standing arrangement at a time, for corporates, embassies, and families across Bangladesh."
        breadcrumbs={[{ label: "Story" }]}
      />

      {/* Numbers, the home page's hairline row. */}
      <section className="bg-white pt-12 sm:pt-16">
        <div className="container">
          <dl className="grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.l} className={`pt-6 ${i % 2 ? "border-l border-ink/15 pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-ink/15 lg:pl-6" : ""} ${i > 1 ? "mt-6 lg:mt-0" : ""}`}>
                <dd className="font-heading text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.05em]"><CountUp value={s.v} /></dd>
                <dt className="mt-2 text-xs font-medium text-ink/55">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The story, set as an essay. */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className={eyebrow}>The beginning</p>
              <h2 className="type-display mt-4 font-heading text-[clamp(2.4rem,5vw,4.2rem)]">
                Who we <span className="type-accent text-gold-deep">are.</span>
              </h2>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-ink/65 sm:text-lg">
              {companyHistory.story.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 rounded-[1.6rem] bg-tile-butter p-6 sm:p-8">
              <p className={eyebrow}>Our promise</p>
              <p className="mt-3 text-base leading-relaxed text-ink/75 sm:text-lg">{companyHistory.promise}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, vision, values — three soft tiles. */}
      <section className="border-y border-ink/10 bg-paper py-20 sm:py-28">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={eyebrow}>What guides us</p>
              <h2 className="type-display mt-4 max-w-[16ch] font-heading text-[clamp(2.4rem,5vw,4.2rem)]">
                The rules <span className="type-accent text-gold-deep">we keep.</span>
              </h2>
            </div>
            <p className="max-w-sm text-base text-ink/60">Mission, vision and the values behind every booking the desk takes.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {guides.map((g) => (
              <div key={g.label} className={`rounded-[1.8rem] p-7 sm:p-8 ${g.bg}`}>
                <p className="font-heading text-2xl font-semibold tracking-[-0.03em]">{g.label}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/65">{g.text}</p>
              </div>
            ))}
            <div className="rounded-[1.8rem] bg-tile-sand p-7 sm:p-8">
              <p className="font-heading text-2xl font-semibold tracking-[-0.03em]">Values</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {companyHistory.values.map((value) => (
                  <li key={value} className="rounded-full bg-paper/70 px-3.5 py-2 text-sm font-semibold">{value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The team. */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={eyebrow}>The desk</p>
              <h2 className="type-display mt-4 font-heading text-[clamp(2.4rem,5vw,4.2rem)]">
                The people <span className="type-accent text-gold-deep">who answer.</span>
              </h2>
            </div>
            <p className="max-w-sm text-base text-ink/60">Small team, long tenure. You will speak to the same names each time you book.</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <article key={member.id} className={`group flex flex-col overflow-hidden rounded-[1.8rem] ${teamTints[i % teamTints.length]}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {member.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-paper/70 font-heading text-2xl font-semibold text-ink/70">
                        {initials(member.name)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">{member.role}</p>
                  <h3 className="mt-2 font-heading text-xl font-semibold tracking-[-0.03em]">{member.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us. */}
      <section className="border-t border-ink/10 bg-white py-20 sm:py-28">
        <div className="container grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className={eyebrow}>Why Jinia</p>
              <h2 className="type-display mt-4 font-heading text-[clamp(2.4rem,5vw,4.2rem)]">
                What you are <span className="type-accent text-gold-deep">paying for.</span>
              </h2>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {whyChooseUs.map((item, index) => (
              <div key={item.title} className="rounded-[1.6rem] bg-paper-deep p-6 sm:p-7">
                <span className="font-heading text-sm font-semibold tabular-nums text-gold-deep">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-heading text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing: the philosophy line, then the ways to start. */}
      <section className="bg-tile-sand py-20 text-ink sm:py-28">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className={eyebrow}>How we think about it</p>
            <blockquote className="type-display mt-4 font-heading text-[clamp(2rem,4.6vw,3.6rem)]">
              &ldquo;{siteConfig.philosophy.replace(/\.$/, "")}<span className="type-accent text-gold-deep">.</span>&rdquo;
            </blockquote>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <div className="flex flex-wrap items-center gap-3">
              <OpenWizardButton className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
                Request a car
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5"><ArrowRight className="h-4 w-4" /></span>
              </OpenWizardButton>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`}
                className="group inline-flex h-14 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-ink/20 transition-colors hover:bg-white"
              >
                <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" /> <span className="tabular-nums">{whatsappDisplay}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink/60">
              {siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.city}
            </p>
            <Link href="/contact" className="group mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">
              Visit the office <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

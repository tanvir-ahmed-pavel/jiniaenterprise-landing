import { createMetadata } from "@/lib/seo/metadata";
import { companyHistory, whyChooseUs, siteConfig, teamMembers } from "@/lib/config";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Eyebrow,
  SectionIntro,
  PrimaryAction,
  GhostAction,
  StatStrip,
  DarkPanel,
} from "@/components/layout/Section";

export const metadata = createMetadata({
  title: "About Jinia Enterprise — Car Rental in Dhaka",
  description:
    "Jinia Enterprise has provided chauffeur-driven car and bus rental in Dhaka since 2014. Learn our story, fleet, and how we serve corporates and embassies.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="Since 2014."
        subtitle="Our story"
        description="A decade of chauffeur-driven car and bus rental — built one standing arrangement at a time, for corporates, embassies, and families across Bangladesh."
        breadcrumbs={[{ label: "Story" }]}
      />

      <StatStrip
        items={[
          { value: "10+", label: "Years in service" },
          { value: "50+", label: "Vehicles in fleet" },
          { value: "100%", label: "Verified drivers" },
          { value: "24/7", label: "Customer helpline" },
        ]}
      />

      {/* The story, set as an essay. The old page put it in a glass card next
          to two more cards; prose reads better with a rule and some air. */}
      <section className="container py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>The beginning</Eyebrow>
            <h2 className="type-display mt-5 max-w-[12ch] font-heading text-[2.25rem] text-emerald-950 sm:text-[3rem]">
              Who we are.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-emerald-950/65 sm:text-lg">
            {companyHistory.story.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="border-t border-emerald-950/15 pt-6">
              <p className="type-label text-emerald-700">Our promise</p>
              <p className="mt-3 text-base leading-relaxed text-emerald-950/70 sm:text-lg">
                {companyHistory.promise}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, vision, values — three columns on hairlines, no icon tiles. */}
      <section className="border-y border-emerald-950/10 bg-[#f6faf7] py-24 sm:py-32">
        <div className="container">
          <SectionIntro eyebrow="What guides us" title="Mission, vision, and the rules we keep." />

          <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {[
              { label: "Mission", text: companyHistory.mission },
              { label: "Vision", text: companyHistory.vision },
            ].map((item) => (
              <div key={item.label} className="border-t border-emerald-950/15 pt-5">
                <p className="type-label text-emerald-700">{item.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-emerald-950/65">{item.text}</p>
              </div>
            ))}

            <div className="border-t border-emerald-950/15 pt-5">
              <p className="type-label text-emerald-700">Values</p>
              <ul className="mt-3 space-y-2">
                {companyHistory.values.map((value) => (
                  <li key={value} className="flex items-baseline gap-3 text-sm text-emerald-950/65">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The team. Portraits sit on the page, not in ringed glass frames. */}
      <section className="container py-24 sm:py-32">
        <SectionIntro
          eyebrow="The desk"
          title="The people who answer."
          lede="Small team, long tenure. You will speak to the same names each time you book."
        />

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="group flex flex-col">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#eef4f0]">
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  /* No portrait for this desk yet — a monogram reads as
                     deliberate where a broken image or a stock icon does not. */
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="type-display font-heading text-4xl text-emerald-950/15">
                      {member.name
                        .replace(/^MD\.\s*/, "")
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-emerald-950/15 pt-4 transition-colors group-hover:border-amber-400">
                <h3 className="type-heading font-heading text-lg text-emerald-950">{member.name}</h3>
                <p className="type-label mt-1 text-emerald-700">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-emerald-950/60">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us — a two-column list, not eighteen bordered icon boxes. */}
      <section className="border-t border-emerald-950/10 py-24 sm:py-32">
        <div className="container">
          <SectionIntro eyebrow="Why Jinia" title="What you are actually paying for." />
          <div className="mt-12 grid gap-x-12 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <div key={item.title} className="border-t border-emerald-950/15 pt-5">
                <span className="type-label tabular-nums text-amber-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="type-heading mt-3 font-heading text-lg text-emerald-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-emerald-950/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The philosophy line closes the page on the dark studio ground, which
          is where the home page puts its one moment of contrast too. */}
      <DarkPanel>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Eyebrow>How we think about it</Eyebrow>
          </div>
          <blockquote className="type-display mx-auto mt-6 max-w-[22ch] font-heading text-[1.9rem] leading-tight sm:text-[2.6rem]">
            &ldquo;{siteConfig.philosophy}&rdquo;
          </blockquote>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <PrimaryAction href="/booking" tone="dark">Start booking</PrimaryAction>
            <GhostAction href="/contact" tone="dark">Visit the office</GhostAction>
          </div>
          <p className="type-label mt-8 text-white/45">
            40/2, Unicorn Plaza (Level-2), Shop-9,10, Dhaka 1212 · {siteConfig.phone}
          </p>
        </div>
      </DarkPanel>
    </div>
  );
}

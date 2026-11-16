import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CheckCheck, Phone, Plus } from "lucide-react";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";
import { corporateClients, siteConfig, type ClientTestimonial } from "@/lib/config";
import { clientService } from "@/lib/supabase/admin-service";
import { createMetadata } from "@/lib/seo/metadata";
import { siteFaqs } from "@/content/faqs";
import { getFleetRows, toStoreVehicles } from "@/lib/vehicles/store";
import { classFloor, vehicleClasses, type ClassId } from "@/lib/trip/data";
import { RequestProvider } from "@/components/trip/RequestProvider";
import { Convoy } from "@/components/trip/Convoy";
import { HeroTrip } from "@/components/trip/HeroTrip";
import { FleetStore } from "@/components/trip/FleetStore";
import { ServiceCard, type Service } from "@/components/trip/ServiceCard";
import { Magnetic, PinnedRail, VelocityMarquee } from "@/components/trip/Motion";
import { OpenTrip } from "@/components/trip/OpenTrip";
import { ClientVoices } from "@/components/trip/ClientVoices";
import { CountUp } from "@/components/trip/CountUp";
import { StackCards } from "@/components/trip/StackCards";

// Refresh the fleet and blog data every minute while still serving prerendered HTML.
export const revalidate = 60;

export const metadata = createMetadata({
  title: "Car Rental in Dhaka with Driver | Jinia Enterprise",
  description: "Book chauffeur-driven car and bus rental in Dhaka. Daily, monthly, corporate, and airport transfer service from Jinia Enterprise.",
  path: "/",
  keywords: ["car rental Dhaka", "car rental with driver Dhaka", "airport transfer Dhaka", "corporate car rental Bangladesh", "monthly car rental Dhaka", "Jinia Enterprise"],
});

const services: Service[] = [
  { id: "airport", trip: "transfer", no: "01", title: "Airport", accent: "arrivals", body: "Flight-tracked pickups at Hazrat Shahjalal. Your driver is at the arrivals rail with your name, and waits if the flight is late.", points: ["Flight tracking", "Name board", "Luggage help"], image: "/images/services/airport.webp", href: "/airport-car-rental", bg: "var(--color-tile-sand)" },
  { id: "executive", trip: "day", no: "02", title: "Executive", accent: "days", body: "One car and one driver for the whole working day: meetings, site visits, dinner. Ten to twelve hours inside Dhaka.", points: ["10–12 hours", "Same driver", "City routes"], image: "/images/services/executive.webp", href: "/corporate-car-rental", bg: "var(--color-tile-mist)" },
  { id: "delegation", trip: "delegation", no: "03", title: "Delegation", accent: "convoys", body: "Matched vehicles moving together on protocol time, with one coordinator as your single point of contact.", points: ["Matched fleet", "One coordinator", "Protocol timing"], image: "/images/services/delegation.webp", href: "/services", bg: "var(--color-tile-stone)" },
  { id: "monthly", trip: "monthly", no: "04", title: "Monthly", accent: "contracts", body: "A dedicated car and driver for staff, expats and directors, billed monthly, with backup support where arranged.", points: ["Dedicated driver", "Monthly billing", "Backup support"], image: "/images/services/monthly.webp", href: "/monthly-car-rental", bg: "var(--color-tile-sage)" },
  { id: "outstation", trip: "outstation", no: "05", title: "Out of", accent: "town", body: "Chattogram, Sylhet, Cox’s Bazar, Sreemangal. Driver rest, overnights and timings are agreed before you leave.", points: ["Every division", "Overnights agreed", "Multi-stop"], image: "/images/services/outstation.webp", href: "/routes", bg: "var(--color-forest)", dark: true },
];

const steps = [
  { title: "Describe the trip", body: "Pick the kind of trip, fill in the sentence, choose a car type or a specific car. Under a minute.", bg: "var(--color-tile-sand)", mock: "plan" },
  { title: "It reaches the desk", body: "Your request lands on WhatsApp as one clear brief. A person reads it, not a bot.", bg: "var(--color-tile-sage)", mock: "chat" },
  { title: "One fixed quote", body: "Usually inside the hour: one price with fuel, tolls, hours and overtime spelled out. No deposit to ask.", bg: "var(--color-tile-mist)", mock: "quote" },
  { title: "Meet your driver", body: "Driver name, phone and plate arrive before pickup. The car is clean, cool and early.", bg: "var(--color-forest)", dark: true, mock: "driver" },
] as const;


/** Tiny interface sketches for the storyboard. Not screenshots of anything
 *  real — they show what each step looks like from the visitor's side. */
function StepMock({ kind }: { kind: (typeof steps)[number]["mock"] }) {
  if (kind === "plan")
    return (
      <div className="rounded-2xl bg-paper p-5 text-[0.95rem] leading-relaxed text-ink/55 shadow-sm">
        Pick me up at <b className="border-b-2 border-gold font-semibold text-ink">DAC Airport</b> and take me to <b className="border-b-2 border-gold font-semibold text-ink">Gulshan</b> in an <b className="border-b-2 border-gold font-semibold text-ink">SUV</b>.
        <div className="mt-4 flex gap-2">{["Sedan", "MPV", "SUV"].map((x, i) => <span key={x} className={`rounded-full px-3 py-1 text-xs font-semibold ${i === 2 ? "bg-ink text-paper" : "bg-paper-deep text-ink/60"}`}>{x}</span>)}</div>
      </div>
    );
  if (kind === "chat")
    return (
      <div className="space-y-2 rounded-2xl bg-[#e9e4da] p-4 text-[0.8rem]">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#d8f2c9] px-3.5 py-2.5 text-ink shadow-sm">
          <p className="font-semibold">Please quote this trip:</p>
          <p className="mt-1 text-ink/70">Airport &amp; transfers · DAC → Gulshan<br />SUV · tomorrow, leaving 09:00</p>
          <p className="mt-1 flex items-center justify-end gap-1 text-[0.65rem] text-ink/45">09:12 <CheckCheck className="h-3.5 w-3.5 text-sky-600" /></p>
        </div>
        <div className="max-w-[70%] rounded-2xl rounded-tl-sm bg-paper px-3.5 py-2.5 text-ink shadow-sm">Received, preparing your quote.<p className="mt-1 text-right text-[0.65rem] text-ink/45">09:14</p></div>
      </div>
    );
  if (kind === "quote")
    return (
      <div className="rounded-2xl bg-paper p-5 shadow-sm">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">Quote · fixed</p>
        <div className="mt-2 flex items-baseline justify-between"><p className="font-semibold">SUV with driver</p><p className="font-heading text-2xl font-semibold">৳ ••,•••</p></div>
        <ul className="mt-3 space-y-1.5 text-sm text-ink/65">{["Fuel and tolls", "Hours and overtime rate", "Waiting at arrivals"].map((x) => <li key={x} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold-deep" />{x}</li>)}</ul>
      </div>
    );
  return (
    <div className="rounded-2xl bg-paper/10 p-5 ring-1 ring-paper/15">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold font-semibold text-ink">MD</span>
        <div><p className="font-semibold">Your driver</p><p className="text-xs text-paper/60">Name and phone shared before pickup</p></div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl bg-paper px-4 py-3 text-ink">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">Plate</span>
        <span className="font-mono text-sm font-semibold tracking-wider">DHAKA METRO ••-••••</span>
      </div>
    </div>
  );
}

const stats = [
  { v: "2014", l: "Driving Dhaka since" },
  { v: "2,500+", l: "Trips completed" },
  { v: "16", l: "Models in the fleet" },
  { v: "24/7", l: "Concierge desk" },
];

export default async function Home() {
  const [rows, activeClients] = await Promise.all([getFleetRows(), clientService.getActive()]);
  const clients = activeClients.length > 0 ? activeClients.map((c) => ({ name: c.name, type: c.type as string })) : corporateClients;

  const floors = Object.fromEntries(vehicleClasses.map((c) => [c.id, classFloor(c, rows)])) as Record<ClassId, number | null>;
  const storeVehicles = toStoreVehicles(rows);
  // Testimonials are managed per client in admin. Only published ones show,
  // locally and live alike. SHOW_TESTIMONIAL_DRAFTS=1 previews the drafts.
  const toVoice = (c: (typeof activeClients)[number]): ClientTestimonial => ({
    quote: c.testimonial_quote ?? "",
    author: c.testimonial_author ?? "",
    role: c.testimonial_role ?? "",
    client: c.name,
    approved: !!c.testimonial_published,
  });
  const withQuote = activeClients.filter((c) => c.testimonial_quote?.trim());
  const approvedVoices = withQuote.filter((c) => c.testimonial_published).map(toVoice);
  const sampleVoices = approvedVoices.length === 0 && process.env.SHOW_TESTIMONIAL_DRAFTS === "1";
  const voiceItems = approvedVoices.length ? approvedVoices : sampleVoices ? withQuote.map(toVoice) : [];
  const liveStats = stats.map((s) => (s.l === "Models in the fleet" ? { ...s, v: String(rows.length || 16) } : s));

  return (
    <RequestProvider>
      <main className="overflow-x-clip bg-white text-ink">

        {/* 1 ── Trip builder */}
        <div id="plan"><HeroTrip floors={floors} whatsapp={siteConfig.whatsapp} /></div>

        {/* 2 ── Velocity marquee */}
        <section aria-label="Services" className="border-y border-ink/10 bg-white py-6 sm:py-8">
          <VelocityMarquee words={["Airport", "Executive", "Monthly", "Delegation", "Outstation"]} className="font-heading text-[clamp(3.5rem,10vw,9rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-ink" />
        </section>

        {/* 3 ── Services, pinned rail */}
        <section className="bg-white py-20 lg:py-0">
          <PinnedRail
            intro={
              <div className="container flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <h2 className="type-display font-heading text-[clamp(2.6rem,5.5vw,5rem)]">Five ways <span className="type-accent text-gold-deep">to ride.</span></h2>
                <p className="max-w-sm text-base text-ink/60">Every booking gets a verified driver, a clean air-conditioned car and a desk that answers. Pick one to start your request.</p>
              </div>
            }
          >
            {services.map((s) => <ServiceCard key={s.id} s={s} />)}
            <div aria-hidden className="w-1 shrink-0 lg:w-10" />
          </PinnedRail>
        </section>

        {/* 4 ── Proof: client credits + numbers */}
        <section className="border-y border-ink/10 bg-paper py-20 sm:py-28">
          <div className="container">
            <div className="flex items-end justify-between gap-4">
              <h2 className="type-display font-heading text-[clamp(2.4rem,5vw,4.2rem)]">In their <span className="type-accent text-gold-deep">words.</span></h2>
              <Link href="/clients" className="inline-flex shrink-0 items-center py-3 -my-3 text-sm font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">All {clients.length} clients</Link>
            </div>
            <div className="mt-8">
              <ClientVoices items={voiceItems} sample={sampleVoices} clients={clients} />
            </div>
            <div className="mt-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Moving them every week</p>
              <VelocityMarquee words={clients.map((c) => c.name)} className="jx-marquee font-heading text-[clamp(1.3rem,2.4vw,2rem)] font-semibold tracking-[-0.03em] text-ink/70" />
            </div>
            <dl className="mt-14 grid grid-cols-2 border-t border-ink/15 lg:grid-cols-4">
              {liveStats.map((s, i) => (
                <div key={s.l} className={`pt-6 ${i % 2 ? "pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-ink/15 lg:pl-6" : ""} ${i % 2 ? "border-l border-ink/15" : ""} ${i > 1 ? "mt-6 lg:mt-0" : ""}`}>
                  <dd className="font-heading text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.05em]"><CountUp value={s.v} /></dd>
                  <dt className="mt-2 text-xs font-medium text-ink/55">{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 5 ── Fleet store */}
        <section className="bg-white py-20 sm:py-28">
          <div className="container">
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="type-display font-heading text-[clamp(2.6rem,5.5vw,5rem)]">Choose <span className="type-accent text-gold-deep">your car.</span></h2>
              <p className="max-w-sm text-base text-ink/60">Every car comes with a driver. Want a specific one? Choose it and it goes on your request in place of the class.</p>
            </div>
            <FleetStore vehicles={storeVehicles} featuredOnly />
            <p className="mt-10 text-sm text-ink/55">BMW and Mercedes executive sedans are available on request through the desk. <Link href="/vehicles" className="font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4">Full fleet page</Link></p>
          </div>
        </section>

        {/* 6 ── How it works: a storyboard */}
        <section className="bg-white py-20 sm:py-28">
          <div className="container grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="type-display font-heading text-[clamp(2.6rem,5vw,4.6rem)]">How it <span className="type-accent text-gold-deep">works.</span></h2>
                <p className="mt-5 max-w-xs text-base text-ink/60">From the sentence at the top of this page to a car at your door.</p>
                <ol className="mt-8 hidden space-y-3 lg:block">
                  {steps.map((s, i) => <li key={s.title} className="flex items-center gap-3 text-sm font-semibold text-ink/55"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper-deep text-xs text-ink">{i + 1}</span>{s.title}</li>)}
                </ol>
              </div>
            </div>
            <div className="lg:col-span-8">
              <StackCards>
                {steps.map((s, i) => (
                  <div key={s.title} className="grid min-h-[30rem] gap-8 rounded-[2rem] p-7 shadow-[0_-24px_48px_-36px_rgba(8,30,20,.45)] sm:p-10 md:min-h-[24rem] md:grid-cols-2 md:items-center" style={{ background: s.bg, color: "dark" in s ? "var(--color-paper)" : undefined }}>
                    <div>
                      <span className={`text-xs font-semibold uppercase tracking-[0.16em] ${"dark" in s ? "text-gold" : "text-gold-deep"}`}>Step {i + 1}</span>
                      <h3 className="type-display mt-4 font-heading text-[clamp(2rem,3.4vw,3rem)]">{s.title}</h3>
                      <p className={`mt-3 max-w-sm text-base leading-relaxed ${"dark" in s ? "text-paper/70" : "text-ink/65"}`}>{s.body}</p>
                    </div>
                    <StepMock kind={s.mock} />
                  </div>
                ))}
              </StackCards>
            </div>
          </div>
        </section>

        {/* 7 ── FAQ */}
        <section className="border-t border-ink/10 bg-white py-20 sm:py-28">
          <div className="container grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="type-display font-heading text-[clamp(2.6rem,5vw,4.6rem)]">Good <span className="type-accent text-gold-deep">questions.</span></h2>
              <Link href="/faq" className="group mt-6 inline-flex items-center gap-2 py-3 -my-3 text-sm font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">
                All questions <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="lg:col-span-8">
              {siteFaqs.slice(0, 6).map((f) => (
                <details key={f.question} className="jx-faq group mb-3 rounded-2xl bg-paper-deep px-6 transition-colors open:bg-tile-sand">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper transition-transform duration-300 group-open:rotate-45">
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 pr-12 text-[0.95rem] leading-relaxed text-ink/65">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 8 ── Closing */}
        <section id="closing" className="relative overflow-hidden bg-tile-sand text-ink">
          <div className="container pb-16 pt-20 sm:pt-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">The desk is open 24/7</p>
                <h2 className="type-display mt-4 font-heading text-[clamp(4.5rem,14vw,12rem)] leading-[0.85]">Let’s <span className="type-accent text-gold-deep">go.</span></h2>
              </div>
              <div className="lg:col-span-5 lg:pb-4">
                <p className="max-w-sm text-base text-ink/65">Tell us the trip in four taps. A person replies with one fixed price, usually inside the hour. No deposit to ask.</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Magnetic strength={0.25}><OpenTrip /></Magnetic>
                  <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`} className="group inline-flex h-14 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-ink/20 transition-colors hover:bg-white">
                    <WhatsAppIcon className="h-[1.1rem] w-[1.1rem] text-[#128C4B]" /> <span className="tabular-nums">{whatsappDisplay}</span> <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
            <Convoy floors={floors} />
            <dl className="mt-12 grid gap-8 text-ink sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Call</dt>
                <dd className="mt-2 space-y-1">
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 py-2.5 -my-2.5 text-lg font-semibold hover:text-gold-deep"><Phone className="h-4 w-4 text-gold-deep" />{siteConfig.phone}</a>
                  <a href={`tel:${siteConfig.phone2.replace(/\s/g, "")}`} className="block py-3 -my-3 pl-6 text-sm text-ink/60 hover:text-gold-deep">{siteConfig.phone2}</a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Email</dt>
                <dd className="mt-2"><a href={`mailto:${siteConfig.email}`} className="inline-block py-3 -my-3 break-all text-sm font-semibold hover:text-gold-deep">{siteConfig.email}</a></dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Office</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/70">{siteConfig.address.line1}, {siteConfig.address.line2}<br />{siteConfig.address.city}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">Hours</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink/70">Sat–Thu 9am–8pm, Fri 10am–6pm<br />Airport and night runs by arrangement</dd>
              </div>
            </dl>
          </div>
        </section>

      </main>
    </RequestProvider>
  );
}

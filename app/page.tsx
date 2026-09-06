import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, CarFront, Clock3, MessageSquare, Plane, ShieldCheck } from "lucide-react";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { BookingRail } from "@/components/forms/BookingRail";
import { clientTestimonials, corporateClients, siteConfig } from "@/lib/config";
import { clientService } from "@/lib/supabase/admin-service";
import { createClient } from "@/lib/supabase/server";
import { createMetadata } from "@/lib/seo/metadata";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SilkBackground } from "@/components/SilkBackground";
import { ClientConstellation } from "@/components/home/ClientConstellation";
import { ScrollParallax } from "@/components/home/ScrollParallax";

export const metadata = createMetadata({
  title: "Car Rental in Dhaka with Driver",
  description: "Book chauffeur-driven car and bus rental in Dhaka. Daily, monthly, corporate, and airport transfer service from Jinia Enterprise.",
  path: "/",
  keywords: ["car rental Dhaka", "car rental with driver Dhaka", "airport transfer Dhaka", "corporate car rental Bangladesh", "monthly car rental Dhaka", "Jinia Enterprise"],
});

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
  seats: number;
  engine_cc?: number | null;
  features?: string[];
  rental_types?: string[];
  description?: string;
  images?: string[];
  image_url?: string | null;
  starting_price?: number | null;
  price_label?: string;
  is_active: boolean;
  sort_order: number;
  is_featured: boolean;
}

async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("Error fetching featured vehicles:", error);
    return [];
  }
  return ((data as Vehicle[]) || []).slice(0, 6);
}

const services = [
  {
    title: "Airport VIP Transfer",
    description: "Flight lands. Chauffeur is already waiting at arrival gate.",
    image: "/images/studio/airport-arrival-white.png",
    icon: Plane,
    href: "/airport-car-rental",
  },
  {
    title: "Executive Daily Chauffeur",
    description: "One dedicated driver. One luxury car. Your whole workday.",
    image: "/images/studio/executive-chauffeur-white.png",
    icon: BriefcaseBusiness,
    href: "/corporate-car-rental",
  },
  {
    title: "Embassy & Delegation Convoys",
    description: "Synchronized mobility for VIP delegations.",
    image: "/images/studio/delegation-convoy-white.png",
    icon: ShieldCheck,
    href: "/services",
  },
];

/** One eyebrow treatment site-wide: gold hairline, then the label. Gold is the
 *  structure that ties sections together, not a decoration applied per section. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 type-label text-emerald-700">
      <span aria-hidden className="h-px w-6 shrink-0 bg-amber-400" />
      {children}
    </p>
  );
}

export default async function Home() {
  const [featuredVehicles, activeClients] = await Promise.all([getFeaturedVehicles(), clientService.getActive()]);
  const clients = activeClients.length > 0
    ? activeClients.map((client) => ({ name: client.name, type: client.type, logo: client.logo_url }))
    : corporateClients;

  return (
    <main className="overflow-x-clip bg-white text-emerald-950">
      <ScrollParallax />
      <HeroCarousel whatsapp={siteConfig.whatsapp} />

      <BookingRail />

      <section className="container grid grid-cols-2 border-b border-emerald-950/10 py-7 sm:grid-cols-4">
        {[{ value: "10+", label: "Years in service" }, { value: "2,500+", label: "Successful trips" }, { value: "100%", label: "Verified drivers" }, { value: "24/7", label: "Customer helpline" }].map((item, index) => (
          <div key={item.label} className={`px-4 py-3 ${index % 2 === 1 ? "border-l border-emerald-950/10 sm:border-l" : ""} ${index > 1 ? "border-t border-emerald-950/10 sm:border-t-0" : ""} ${index > 0 ? "sm:border-l sm:border-emerald-950/10" : ""}`}>
            <p className="type-display font-heading text-[2rem] sm:text-[2.5rem]">{item.value}</p>
            <p className="type-label mt-2 text-emerald-950/50">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Copy leads, photograph follows, and nothing moves. This scene is the
          quiet beat between the booking rail and the service grid — motion here
          was working against it. */}
      <section className="container py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          <div className="max-w-xl">
            <Eyebrow>The arrival</Eyebrow>
            <h2 className="type-display mt-5 max-w-[15ch] font-heading text-[2.25rem] sm:text-[3.25rem]">Before the door opens, the service has already begun.</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-emerald-950/65 sm:text-lg">A cool cabin. A chauffeur who knows the route. A handoff that does not need explaining. Jinia is designed around the moments that set the tone for everything after.</p>
            <div className="type-label mt-9 grid grid-cols-3 border-t border-emerald-950/15 pt-5 text-emerald-950/60">
              <span>Flight-aware</span>
              <span>Verified driver</span>
              <span className="text-right">Ready vehicle</span>
            </div>
          </div>

          <div className="jinia-grounded-scene relative mx-auto aspect-[5/4] w-full max-w-[46rem] lg:mx-0 lg:ml-auto">
            <Image src="/images/studio/arrival-prado.png" alt="Chauffeur welcoming a passenger beside a graphite Toyota Land Cruiser Prado" fill sizes="(max-width: 1024px) 92vw, 46rem" className="mix-blend-multiply object-contain" />
            <div className="type-label absolute bottom-0 left-0 right-0 flex items-end justify-between text-emerald-950/45">
              <span>Hazrat Shahjalal / DAC</span>
              <span>04:45</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="max-w-2xl">
          <Eyebrow>Where you need to be</Eyebrow>
          <h2 className="type-display mt-5 max-w-[15ch] font-heading text-[2.25rem] sm:text-[3.25rem]">For every kind of important day.</h2>
        </div>
        {/* Aligned, not staggered: the photos already vary in scale, so an
            offset grid reads as a layout bug rather than as editorial. */}
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {services.map((service, index) => {
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col"
                data-reveal=""
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <span className="type-label tabular-nums text-amber-600">0{index + 1}</span>
                <div className="jinia-grounded-scene relative mt-3 aspect-[4/3]">
                  <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="mix-blend-multiply object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 flex flex-1 items-start justify-between gap-4 border-t border-emerald-950/15 pt-4 transition-colors group-hover:border-amber-400">
                  <div>
                    <h3 className="type-heading font-heading text-lg">{service.title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-emerald-950/60">{service.description}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-emerald-600 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-y border-emerald-950/10 bg-white py-24 sm:py-32">
        <SilkBackground />
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <Eyebrow>Simple by design</Eyebrow>
            <h2 className="type-display mt-5 font-heading text-[2.25rem] text-emerald-950 sm:text-[3.25rem]">One message.<br />A car at your door.</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-emerald-950/60">A direct, considered route from your plan to a prepared car. No noise, no back-and-forth.</p>
          </div>
          <div className="jinia-process-steps mt-16 grid border-y sm:grid-cols-3">
            {[{ icon: MessageSquare, title: "Share the plan", text: "Pickup, destination, date." }, { icon: Clock3, title: "Get your quote", text: "A clear fixed rate." }, { icon: CarFront, title: "Meet your car", text: "Clean, cool, and ready." }].map((step, index) => {
              const Icon = step.icon;
              return <div key={step.title} className="group px-6 py-8 sm:px-8 sm:not-last:border-r sm:not-last:border-emerald-950/15"><span className="type-label font-heading text-amber-700">0{index + 1}</span><Icon className="mt-12 h-5 w-5 text-emerald-800 transition-transform duration-500 ease-out group-hover:-translate-y-1" strokeWidth={1.8} /><h3 className="type-heading mt-5 font-heading text-lg text-emerald-950">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-emerald-950/75">{step.text}</p></div>;
            })}
          </div>
        </div>
      </section>

      {featuredVehicles.length > 0 && <section className="container py-24 sm:py-32">
        <div className="flex flex-col justify-between gap-5 border-b border-emerald-950/10 pb-6 sm:flex-row sm:items-end">
          <div><Eyebrow>The fleet</Eyebrow><h2 className="type-display mt-4 font-heading text-[2.25rem] sm:text-[3rem]">The cars Dhaka asks for.</h2><p className="mt-3 text-sm font-medium text-emerald-950/60">BMW and Mercedes sedans are available on request through our concierge desk.</p></div>
          <Link href="/vehicles" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-950 transition-colors hover:text-emerald-600">View all vehicles <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featuredVehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div>
      </section>}

      <ClientConstellation clients={clients} testimonials={clientTestimonials} />

      {/* A quiet closing note. The CTA deliberately shares the page's white
          canvas: no image treatment, no extra atmosphere, just the service
          promise and a clear next step. */}
      <section className="relative overflow-hidden border-y border-emerald-950/10 bg-white py-16 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(88%,72rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="flex items-center justify-center gap-3 type-label text-emerald-700">
              <span aria-hidden className="h-px w-7 bg-amber-400" />
              The Jinia concierge desk
              <span aria-hidden className="h-px w-7 bg-amber-400" />
            </p>
            <h2 className="type-display mx-auto mt-6 max-w-[15ch] font-heading text-[2.65rem] text-emerald-950 sm:text-[3.7rem] lg:text-[4.5rem]">
              Your next journey starts with a message.
            </h2>
            <p className="mx-auto mt-6 max-w-[43ch] text-base leading-relaxed text-emerald-950/65">
              Tell us where the day is taking you. We will put the right car, chauffeur, and timing in place.
            </p>

            <div className="relative mx-auto mt-7 aspect-[3.25/1] w-full max-w-4xl overflow-hidden">
              <Image
                src="/images/vehicles/cta-three-vehicle-white-studio-v2.png"
                alt="Jinia Enterprise's premium chauffeur fleet: an executive SUV, people carrier, and sedan"
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover object-[center_64%]"
              />
            </div>

            <div className="mx-auto mt-4 flex max-w-xl flex-col items-center gap-5 border-y border-emerald-950/15 py-5 sm:flex-row sm:justify-between">
              <p className="text-center text-sm leading-snug text-emerald-950/60 sm:text-left">
                <span className="block font-medium text-emerald-950">A real person replies.</span>
                Most quotes arrive inside the hour.
              </p>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-emerald-950 px-6 text-sm font-normal text-white transition-colors hover:bg-emerald-800"
              >
                <MessageSquare aria-hidden className="h-4 w-4" /> Get a quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import { MessageSquare, Phone } from "lucide-react";
import { DeparturesBoard } from "@/components/home/DeparturesBoard";
import { RESPONSE_PROMISE, businessIdentity, getTelHref, getWhatsAppHref } from "@/lib/business/identity";

/**
 * Home hero. Left: what the business is (the page's only H1) and the two ways
 * people book. Right: the departures board over the car photo; on phones the
 * photo sits under the board. Server-rendered, no client JavaScript.
 */
export function HeroDepartures() {
  return (
    <section className="relative -mt-16 overflow-hidden bg-[var(--jinia-paper)] pt-24 sm:pt-28 lg:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_85%_10%,rgba(217,164,0,.10),transparent_60%),radial-gradient(70%_60%_at_0%_100%,rgba(11,61,46,.07),transparent_60%)]" />

      <div className="container relative grid gap-10 pb-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:pb-20">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 font-board text-[11px] tracking-[0.18em] text-[var(--jinia-green)]">
            <span aria-hidden className="h-px w-6 bg-[var(--jinia-gold)]" />
            DAC · DHAKA · SINCE {businessIdentity.foundingYear}
          </p>
          <h1 className="mt-5 font-heading text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.02em] text-[var(--jinia-ink)] sm:text-[3.6rem] lg:text-[4.1rem]">
            Car rental with driver in Dhaka
          </h1>
          <p className="mt-4 font-heading text-xl text-[var(--jinia-ink-muted)] sm:text-2xl">
            A better way to get there.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={getWhatsAppHref("Hello Jinia, I'd like a quote for a car with driver.")}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="hero_whatsapp"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-[var(--jinia-green)] px-7 text-base font-medium text-white shadow-[0_18px_40px_-24px_rgba(11,61,46,.8)] transition-colors hover:bg-[#0f5a43]"
            >
              <MessageSquare aria-hidden className="h-5 w-5" /> WhatsApp us
            </a>
            <a
              href={getTelHref()}
              data-umami-event="hero_call"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-[var(--jinia-line)] bg-white px-7 text-base font-medium tabular-nums text-[var(--jinia-ink)] transition-colors hover:border-[var(--jinia-gold)]"
            >
              <Phone aria-hidden className="h-5 w-5 text-[var(--jinia-green)]" /> Call {businessIdentity.phone}
            </a>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-[var(--jinia-ink-muted)]">
            <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--jinia-signal)]" />
            {RESPONSE_PROMISE.short} · No deposit to ask
          </p>
        </div>

        <div className="relative flex flex-col">
          {/* Under the board, its roofline tucked behind the board's edge. */}
          <div className="relative order-2 mx-auto -mt-8 aspect-[16/7] w-[108%] max-w-none sm:-mt-12 lg:-mt-16">
            <Image
              src="/images/vehicles/front/toyota-alphard-cream-grounded-v4.png"
              alt="Cream Toyota Alphard, one of the chauffeur-driven cars for rent in Dhaka"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 92vw, 640px"
              className="object-contain object-bottom"
            />
          </div>
          <div className="relative z-10 order-1">
            <DeparturesBoard />
          </div>
        </div>
      </div>
    </section>
  );
}

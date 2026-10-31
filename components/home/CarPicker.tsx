"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { formatBdt, getFleetLabel, type SeatBand } from "@/content/fleet-prices";
import { seatBands, vehiclesForBand } from "@/content/home-board";
import { getVehiclePath } from "@/lib/vehicles/slugs";

type Luggage = "light" | "normal" | "heavy";

const LUGGAGE: Array<{ value: Luggage; label: string; hint: string }> = [
  { value: "light", label: "Light", hint: "Hand bags" },
  { value: "normal", label: "One bag each", hint: "A suitcase per person" },
  { value: "heavy", label: "Lots", hint: "Airport run, wedding, family trip" },
];

const ORDER: SeatBand[] = ["1-4", "5-7", "8-12", "13-29"];

/** Heavy luggage moves a group up one size; nothing else changes the rule. */
function recommend(band: SeatBand, luggage: Luggage): SeatBand {
  if (luggage !== "heavy") return band;
  const next = ORDER[ORDER.indexOf(band) + 1];
  return band === "13-29" ? band : next ?? band;
}

const chip = (active: boolean) =>
  `inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
    active
      ? "border-[var(--jinia-green)] bg-[var(--jinia-green)] text-white"
      : "border-[var(--jinia-line)] bg-white text-[var(--jinia-ink)] hover:border-[var(--jinia-gold)]"
  }`;

export function CarPicker() {
  const id = useId();
  const [band, setBand] = useState<SeatBand>("1-4");
  const [luggage, setLuggage] = useState<Luggage>("normal");
  const target = recommend(band, luggage);
  const cars = vehiclesForBand(target);
  const bumped = target !== band;

  return (
    <section aria-labelledby={`${id}-title`} className="border-y border-[var(--jinia-line)] bg-[var(--jinia-paper)] py-20 sm:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 font-board text-[11px] tracking-[0.18em] text-[var(--jinia-green)]">
            <span aria-hidden className="h-px w-6 bg-[var(--jinia-gold)]" />
            WHICH CAR FITS?
          </p>
          <h2 id={`${id}-title`} className="mt-4 font-heading text-[2.1rem] font-semibold leading-[1.08] text-[var(--jinia-ink)] sm:text-[2.6rem]">
            Tell us who&apos;s travelling.
          </h2>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-8">
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-[var(--jinia-ink)]">Passengers</legend>
              <div className="flex flex-wrap gap-2">
                {seatBands.map((b) => (
                  <button key={b.band} type="button" aria-pressed={band === b.band} onClick={() => setBand(b.band)} className={chip(band === b.band)}>
                    {b.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-[var(--jinia-ink)]">Luggage</legend>
              <div className="flex flex-wrap gap-2">
                {LUGGAGE.map((l) => (
                  <button key={l.value} type="button" aria-pressed={luggage === l.value} onClick={() => setLuggage(l.value)} className={chip(luggage === l.value)} title={l.hint}>
                    {l.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div aria-live="polite">
            <p className="text-sm text-[var(--jinia-ink-muted)]">
              {bumped ? "With that much luggage, go one size up:" : "Good fits:"}
            </p>
            <ul className="mt-3 divide-y divide-[var(--jinia-line)] border-y border-[var(--jinia-line)]">
              {cars.map((row) => (
                <li key={row.slug}>
                  <Link
                    href={getVehiclePath(row.slug)}
                    className="group flex min-h-16 items-center justify-between gap-4 py-3 transition-colors hover:bg-white"
                  >
                    <span>
                      <span className="block text-base font-medium text-[var(--jinia-ink)]">{getFleetLabel(row)}</span>
                      <span className="block text-sm tabular-nums text-[var(--jinia-ink-muted)]">
                        {row.seats} seats · {row.kind} · with driver
                      </span>
                    </span>
                    <span className="flex items-center gap-3 text-right text-sm font-medium tabular-nums text-[var(--jinia-ink)]">
                      {row.dayRate ? `from ${formatBdt(row.dayRate)}/day` : "on request"}
                      <ArrowUpRight aria-hidden className="h-4 w-4 text-[var(--jinia-green)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

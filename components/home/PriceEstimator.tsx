"use client";

import { useId, useMemo, useState } from "react";
import { MessageSquare } from "lucide-react";
import { CITY_DAY_HOURS, formatBdt, getFleetLabel, type SeatBand } from "@/content/fleet-prices";
import { seatBands, vehiclesForBand } from "@/content/home-board";
import { getWhatsAppHref } from "@/lib/business/identity";

type TripType = "city" | "airport" | "outstation" | "monthly";

const TRIPS: Array<{ value: TripType; label: string }> = [
  { value: "city", label: "City, full day (10–12 hrs)" },
  { value: "airport", label: "Airport pickup or drop" },
  { value: "outstation", label: "Outstation (outside Dhaka)" },
  { value: "monthly", label: "Monthly" },
];

const field =
  "h-12 w-full rounded-md border border-[var(--jinia-line)] bg-white px-3 text-base text-[var(--jinia-ink)] outline-none focus:border-[var(--jinia-gold)]";
const label = "mb-2 block text-sm font-medium text-[var(--jinia-ink)]";

/**
 * Instant estimate from the published price table only. City days multiply
 * the published day rates; airport, outstation and monthly trips have no
 * published rate yet, so the estimator says so instead of guessing.
 */
export function PriceEstimator() {
  const id = useId();
  const [trip, setTrip] = useState<TripType>("city");
  const [band, setBand] = useState<SeatBand>("5-7");
  const [vehicle, setVehicle] = useState<string>("");
  const [days, setDays] = useState(1);

  const options = useMemo(() => vehiclesForBand(band), [band]);
  const chosen = options.find((row) => row.slug === vehicle);
  const priced = (chosen ? [chosen] : options).filter((row) => row.dayRate !== null);
  const low = priced.length ? Math.min(...priced.map((r) => r.dayRate as number)) * days : null;
  const high = priced.length ? Math.max(...priced.map((r) => r.dayRate as number)) * days : null;
  const bandLabel = seatBands.find((b) => b.band === band)?.label ?? band;
  const tripLabel = TRIPS.find((t) => t.value === trip)?.label ?? trip;
  const vehicleText = chosen ? getFleetLabel(chosen) : `any vehicle for ${bandLabel}`;

  let headline: string;
  let detail: string;
  if (trip === "city" && low !== null && high !== null) {
    headline = low === high ? `Estimated from ${formatBdt(low)}` : `Estimated from ${formatBdt(low)}–${formatBdt(high)}`;
    detail = `${days} ${days === 1 ? "day" : "days"} × published day rate, about ${CITY_DAY_HOURS} a day inside Dhaka.`;
  } else if (trip === "city") {
    headline = "Quoted on request";
    detail = "This vehicle has no published day rate yet.";
  } else if (trip === "airport") {
    headline = "Quoted per transfer";
    detail = "Send your flight number and drop-off area and the desk replies with one fixed price.";
  } else if (trip === "outstation") {
    headline = "Quoted per trip";
    detail = "City day rates don't apply outside Dhaka. Driving time, nights away and fuel go into one written quote.";
  } else {
    headline = "Quoted for your hours";
    detail = "Monthly packages are priced on your daily hours and routes, not a day rate × 30.";
  }

  const message = [
    "Hello Jinia, I'd like a quote:",
    `Trip: ${tripLabel}`,
    `Vehicle: ${vehicleText}`,
    trip === "city" || trip === "outstation" ? `Days: ${days}` : null,
    trip === "city" && low !== null ? `Website estimate: ${headline.replace("Estimated from ", "from ")}` : null,
    "Date and pickup: ",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section id="estimate" aria-labelledby={`${id}-title`} className="bg-white py-20 sm:py-24">
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="max-w-md">
          <p className="flex items-center gap-3 font-board text-[11px] tracking-[0.18em] text-[var(--jinia-green)]">
            <span aria-hidden className="h-px w-6 bg-[var(--jinia-gold)]" />
            INSTANT ESTIMATE
          </p>
          <h2 id={`${id}-title`} className="mt-4 font-heading text-[2.1rem] font-semibold leading-[1.08] text-[var(--jinia-ink)] sm:text-[2.6rem]">
            What will it cost?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--jinia-ink-muted)]">
            From the same price table as every vehicle page. Fuel, overtime, tolls and parking are
            included or billed as written on your quote.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--jinia-line)] bg-[var(--jinia-paper)] p-5 sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-trip`} className={label}>Trip type</label>
              <select id={`${id}-trip`} className={field} value={trip} onChange={(e) => setTrip(e.target.value as TripType)}>
                {TRIPS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-band`} className={label}>Seats needed</label>
              <select
                id={`${id}-band`}
                className={field}
                value={band}
                onChange={(e) => {
                  setBand(e.target.value as SeatBand);
                  setVehicle("");
                }}
              >
                {seatBands.map((b) => (
                  <option key={b.band} value={b.band}>{b.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-vehicle`} className={label}>Vehicle</label>
              <select id={`${id}-vehicle`} className={field} value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                <option value="">Any for {bandLabel}</option>
                {options.map((row) => (
                  <option key={row.slug} value={row.slug}>
                    {getFleetLabel(row)}
                    {row.dayRate ? ` · ${formatBdt(row.dayRate)}/day` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-days`} className={label}>Days</label>
              <input
                id={`${id}-days`}
                type="number"
                inputMode="numeric"
                min={1}
                max={30}
                className={`${field} tabular-nums`}
                value={days}
                disabled={trip === "airport" || trip === "monthly"}
                onChange={(e) => setDays(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
              />
            </div>
          </div>

          <div aria-live="polite" className="mt-6 border-t border-[var(--jinia-line)] pt-6">
            <p className="font-heading text-[1.7rem] font-semibold tabular-nums text-[var(--jinia-ink)] sm:text-[2.1rem]">{headline}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--jinia-ink-muted)]">{detail}</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--jinia-ink-muted)]">
              Extra: fuel, tolls, parking and overtime as quoted; multi-day outstation trips may add the driver&apos;s lodging.
            </p>
          </div>

          <a
            href={getWhatsAppHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="estimator_whatsapp"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--jinia-green)] px-6 text-base font-medium text-white transition-colors hover:bg-[#0f5a43]"
          >
            <MessageSquare aria-hidden className="h-4 w-4" /> Send this to WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

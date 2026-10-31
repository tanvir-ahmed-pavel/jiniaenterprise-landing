"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { BANGLADESH_PATH, BANGLADESH_VIEWBOX, CITY_POINTS } from "@/content/geo/bangladesh";
import { routeFacts, type RouteFact } from "@/content/home-board";
import { formatBdt } from "@/content/fleet-prices";

const DHAKA = CITY_POINTS.DHAKA;

/** A gentle arc from Dhaka to a city, bowed to the right of travel. */
function arc(to: readonly [number, number]): string {
  const [x1, y1] = DHAKA;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const bow = 0.18;
  return `M${x1},${y1} Q${mx - dy * bow},${my + dx * bow} ${x2},${y2}`;
}

function facts(route: RouteFact): string {
  return [
    `${route.driveTime} by road`,
    route.distanceKm ? `${route.distanceKm} km` : null,
    route.fromBdt ? `from ${formatBdt(route.fromBdt)}` : "quoted per trip",
  ]
    .filter(Boolean)
    .join(" · ");
}

export function RouteMap() {
  const id = useId();
  const [active, setActive] = useState<string>(routeFacts[0].slug);
  const current = routeFacts.find((r) => r.slug === active) ?? routeFacts[0];

  return (
    <section aria-labelledby={`${id}-title`} className="bg-white py-20 sm:py-24">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="flex items-center gap-3 font-board text-[11px] tracking-[0.18em] text-[var(--jinia-green)]">
            <span aria-hidden className="h-px w-6 bg-[var(--jinia-gold)]" />
            OUTSTATION ROUTES
          </p>
          <h2 id={`${id}-title`} className="mt-4 font-heading text-[2.1rem] font-semibold leading-[1.08] text-[var(--jinia-ink)] sm:text-[2.6rem]">
            From Dhaka to the coast and the tea hills.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--jinia-ink-muted)]">
            One driver, one car, door to door. Drive times are approximate and include normal rest stops.
          </p>

          {/* The same facts as the map, as text: for crawlers, screen readers and small screens. */}
          <ul className="mt-8 divide-y divide-[var(--jinia-line)] border-y border-[var(--jinia-line)]">
            {routeFacts.map((route) => (
              <li key={route.slug}>
                <Link
                  href={`/routes/${route.slug}`}
                  onMouseEnter={() => setActive(route.slug)}
                  onFocus={() => setActive(route.slug)}
                  className={`group flex min-h-14 flex-col gap-1 py-3 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${active === route.slug ? "text-[var(--jinia-ink)]" : "text-[var(--jinia-ink-muted)]"}`}
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-base font-medium">Dhaka → {route.city}</span>
                    {route.code && <span className="font-board text-xs text-[var(--jinia-green)]">{route.code}</span>}
                  </span>
                  <span className="flex items-center gap-2 text-sm tabular-nums sm:text-right">
                    {facts(route)}
                    <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-[var(--jinia-green)]" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative mx-auto w-full max-w-[420px]">
          <svg viewBox={BANGLADESH_VIEWBOX} role="img" aria-labelledby={`${id}-map`} className="h-auto w-full">
            <title id={`${id}-map`}>Map of Bangladesh with routes from Dhaka to Cox&apos;s Bazar, Chattogram, Sylhet and Sreemangal</title>
            <path d={BANGLADESH_PATH} fill="var(--jinia-green-soft)" stroke="var(--jinia-green)" strokeOpacity="0.35" strokeWidth="1" />
            {routeFacts.map((route) => {
              const point = CITY_POINTS[route.point];
              const on = route.slug === active;
              return (
                <g key={route.slug}>
                  <path
                    d={arc(point)}
                    fill="none"
                    stroke={on ? "var(--jinia-gold)" : "var(--jinia-green)"}
                    strokeOpacity={on ? 1 : 0.45}
                    strokeWidth={on ? 2.5 : 1.5}
                    strokeDasharray={on ? undefined : "4 4"}
                    className="transition-[stroke,stroke-width] duration-300"
                  />
                  <a
                    href={`/routes/${route.slug}`}
                    onMouseEnter={() => setActive(route.slug)}
                    onFocus={() => setActive(route.slug)}
                    aria-label={`Dhaka to ${route.city}: ${facts(route)}`}
                  >
                    <circle cx={point[0]} cy={point[1]} r="16" fill="transparent" />
                    <circle cx={point[0]} cy={point[1]} r={on ? 6 : 4.5} fill={on ? "var(--jinia-gold)" : "var(--jinia-green)"} stroke="white" strokeWidth="1.5" />
                    <text x={point[0] - 10} y={point[1] + 4} textAnchor="end" className="font-board" fontSize={route.code ? 12 : 10} fill="var(--jinia-ink)">
                      {route.code ?? route.city.toUpperCase()}
                    </text>
                  </a>
                </g>
              );
            })}
            <circle cx={DHAKA[0]} cy={DHAKA[1]} r="7" fill="var(--jinia-green)" stroke="white" strokeWidth="2" />
            <text x={DHAKA[0] - 12} y={DHAKA[1] + 4} textAnchor="end" className="font-board" fontSize="13" fontWeight="500" fill="var(--jinia-ink)">DHAKA</text>
          </svg>

          <figcaption
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 hidden max-w-[13rem] sm:block rounded-lg border border-[var(--jinia-line)] bg-white/95 p-4 shadow-[0_16px_40px_-28px_rgba(6,30,22,.6)] backdrop-blur"
          >
            <span className="block font-board text-xs text-[var(--jinia-green)]">DHAKA → {current.code ?? current.city.toUpperCase()}</span>
            <span className="mt-1 block text-base font-semibold text-[var(--jinia-ink)]">{current.city}</span>
            <span className="mt-2 block text-sm tabular-nums text-[var(--jinia-ink-muted)]">{facts(current)}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/**
 * Data for the home page's departures board, estimator, car picker and route
 * map. Prices come only from content/fleet-prices.ts; drive times only from
 * the route pages (content/routes.ts). Anything not published is null and
 * renders as "On request" / "Quoted per trip", never as a guessed number.
 */
import { fleetPrices, getLowestDayRate, type FleetPrice, type SeatBand } from "@/content/fleet-prices";

export type BoardRow = {
  route: string;
  /** Spoken form for screen readers, e.g. "Dhaka airport to Gulshan". */
  routeLabel: string;
  vehicle: string;
  /** BDT, or null when not published. */
  from: number | null;
  remark: string;
  href: string;
};

const cheapest = (filter: (row: FleetPrice) => boolean) => getLowestDayRate(filter)?.dayRate ?? null;

export const boardRows: BoardRow[] = [
  {
    route: "CITY · 10–12H",
    routeLabel: "Dhaka city, full day",
    vehicle: "SEDAN",
    from: cheapest((r) => r.kind === "Sedan"),
    remark: "WITH DRIVER",
    href: "/vehicles",
  },
  {
    route: "CITY · 10–12H",
    routeLabel: "Dhaka city, full day",
    vehicle: "NOAH",
    from: cheapest((r) => r.model === "Toyota Noah"),
    remark: "7 SEATS",
    href: "/vehicles/toyota-noah-2012-14",
  },
  {
    route: "CITY · 10–12H",
    routeLabel: "Dhaka city, full day",
    vehicle: "HIACE",
    from: cheapest((r) => r.model === "Toyota Hiace"),
    remark: "12 SEATS",
    href: "/vehicles/toyota-hiace",
  },
  {
    // TODO(owner): publish an airport transfer price to show it here.
    route: "DAC → GULSHAN",
    routeLabel: "Dhaka airport to Gulshan",
    vehicle: "SEDAN",
    from: null,
    remark: "MEET & GREET",
    href: "/services/airport-transfer",
  },
  {
    // TODO(owner): publish a Cox's Bazar trip price to show it here.
    route: "DHAKA → CXB",
    routeLabel: "Dhaka to Cox's Bazar",
    vehicle: "HIACE",
    from: null,
    remark: "8–12 HRS",
    href: "/routes/dhaka-to-coxs-bazar",
  },
  {
    // TODO(owner): publish a monthly rate to show it here.
    route: "MONTHLY",
    routeLabel: "Monthly with driver",
    vehicle: "SEDAN",
    from: null,
    remark: "OFFICE COMMUTE",
    href: "/monthly-car-rental",
  },
];

export type RouteFact = {
  slug: string;
  /** IATA code where the city has an airport; null otherwise (no made-up codes). */
  code: string | null;
  city: string;
  /** Approximate road time, as published on the route page. */
  driveTime: string;
  /** TODO(owner): road distance in km; not published yet, so not shown. */
  distanceKm: number | null;
  /** TODO(owner): starting trip price; not published yet, so not shown. */
  fromBdt: number | null;
  point: "CXB" | "ZYL" | "CGP" | "SREEMANGAL";
};

export const routeFacts: RouteFact[] = [
  { slug: "dhaka-to-coxs-bazar", code: "CXB", city: "Cox's Bazar", driveTime: "8–12 hrs", distanceKm: null, fromBdt: null, point: "CXB" },
  { slug: "dhaka-to-chattogram", code: "CGP", city: "Chattogram", driveTime: "6–9 hrs", distanceKm: null, fromBdt: null, point: "CGP" },
  { slug: "dhaka-to-sylhet", code: "ZYL", city: "Sylhet", driveTime: "6–9 hrs", distanceKm: null, fromBdt: null, point: "ZYL" },
  { slug: "dhaka-to-sreemangal", code: null, city: "Sreemangal", driveTime: "4–7 hrs", distanceKm: null, fromBdt: null, point: "SREEMANGAL" },
];

export const seatBands: Array<{ band: SeatBand; label: string; models: string[] }> = [
  { band: "1-4", label: "1–4 people", models: ["Toyota Premio", "Toyota Axio", "Toyota Allion"] },
  { band: "5-7", label: "5–7 people", models: ["Toyota Noah", "Toyota Land Cruiser Prado", "Nissan X-Trail"] },
  { band: "8-12", label: "8–12 people", models: ["Toyota Hiace", "Hyundai H1"] },
  { band: "13-29", label: "13–29 people", models: ["Nissan Civilian bus"] },
];

/** Vehicles for a seat band, cheapest first, from the shared price table. */
export function vehiclesForBand(band: SeatBand): FleetPrice[] {
  const models = seatBands.find((b) => b.band === band)?.models ?? [];
  return fleetPrices
    .filter((row) => models.includes(row.model))
    .sort((a, b) => (a.dayRate ?? Infinity) - (b.dayRate ?? Infinity));
}

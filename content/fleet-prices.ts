/**
 * THE price table. The pricing page, vehicle pages, fleet cards, the
 * estimator and the departures board all read from here, so a number can
 * only ever be wrong in one place.
 *
 * Day rates are the "starting_price" values published on the live vehicle
 * pages on 31 Oct 2026 (entered by the owner in the admin). Where this table
 * has a rate it wins over the database value on the public site.
 *
 * TODO(owner): confirm every day rate below, and the duty window
 *   (CITY_DAY_HOURS). The old /pricing table listed Hyundai H1 at ৳4,500 and
 *   H1 (New) at ৳6,000; the live vehicle pages say ৳8,000 and ৳7,000. This
 *   table uses the live vehicle-page figures.
 * TODO(owner): monthly rates — none are published, so `monthlyFrom` is null
 *   everywhere and the site says "monthly: quoted".
 */

import { getPublicVehicleSlug } from "@/lib/vehicles/slugs";

export type SeatBand = "1-4" | "5-7" | "8-12" | "13-29";

export type FleetPrice = {
  /** Public slug (the URL), see lib/vehicles/slugs.ts. */
  slug: string;
  name: string;
  /** Short model name for titles: "Toyota Noah". */
  model: string;
  years?: string;
  seats: number;
  kind: "Sedan" | "MPV" | "SUV" | "Microbus" | "Bus" | "Pickup";
  /** BDT, full day in Dhaka city. null = quoted on request. */
  dayRate: number | null;
  /** BDT per month. null = quoted on request. */
  monthlyFrom: number | null;
};

/** Duty window a city day rate covers, per /policies/overtime-and-fuel. */
export const CITY_DAY_HOURS = "10–12 hours";
export const CITY_DAY_UNIT = `per day (${CITY_DAY_HOURS}, Dhaka city)`;

/** What a city day rate does not settle by itself, per /policies/overtime-and-fuel. */
export const PRICE_EXTRAS =
  "Fuel, overtime, tolls and parking are included or billed as written on your quote; outstation trips are quoted separately.";

export const fleetPrices: FleetPrice[] = [
  { slug: "toyota-corolla", name: "Toyota X-Corolla / G-Corolla", model: "Toyota Corolla", years: "2001–2006", seats: 5, kind: "Sedan", dayRate: 3000, monthlyFrom: null },
  { slug: "toyota-allion", name: "Toyota Allion", model: "Toyota Allion", years: "2012–15", seats: 5, kind: "Sedan", dayRate: 3500, monthlyFrom: null },
  { slug: "toyota-axio", name: "Toyota Axio", model: "Toyota Axio", years: "2012–15", seats: 5, kind: "Sedan", dayRate: 3500, monthlyFrom: null },
  { slug: "toyota-premio", name: "Toyota F-Premio", model: "Toyota Premio", years: "2012–15", seats: 5, kind: "Sedan", dayRate: 3500, monthlyFrom: null },
  { slug: "toyota-corolla-cross", name: "Toyota Corolla Cross", model: "Toyota Corolla Cross", seats: 5, kind: "SUV", dayRate: null, monthlyFrom: null },
  { slug: "hilux-pickup", name: "Toyota Hilux Double Cabin Pickup", model: "Toyota Hilux", years: "2016", seats: 5, kind: "Pickup", dayRate: 4500, monthlyFrom: null },
  { slug: "toyota-noah-2012-14", name: "Toyota X-Noah", model: "Toyota Noah", years: "2012–14", seats: 7, kind: "MPV", dayRate: 3500, monthlyFrom: null },
  { slug: "toyota-noah-2015-18", name: "Toyota X-Noah", model: "Toyota Noah", years: "2015–18", seats: 7, kind: "MPV", dayRate: 4000, monthlyFrom: null },
  { slug: "nissan-xtrail", name: "Nissan X-Trail", model: "Nissan X-Trail", years: "2017", seats: 7, kind: "SUV", dayRate: 7000, monthlyFrom: null },
  { slug: "toyota-alphard", name: "Toyota Alphard", model: "Toyota Alphard", years: "2017–19", seats: 7, kind: "MPV", dayRate: 12000, monthlyFrom: null },
  { slug: "toyota-land-cruiser-prado-2012-15", name: "Toyota Land Cruiser Prado", model: "Toyota Land Cruiser Prado", years: "2012–15", seats: 7, kind: "SUV", dayRate: 13000, monthlyFrom: null },
  { slug: "toyota-land-cruiser-prado-2016-20", name: "Toyota Land Cruiser Prado", model: "Toyota Land Cruiser Prado", years: "2016–20", seats: 7, kind: "SUV", dayRate: 15000, monthlyFrom: null },
  { slug: "toyota-hiace", name: "Toyota Hiace", model: "Toyota Hiace", years: "2012–15", seats: 12, kind: "Microbus", dayRate: 4000, monthlyFrom: null },
  { slug: "hyundai-h1-2017-18", name: "Hyundai H1", model: "Hyundai H1", years: "2017–18", seats: 12, kind: "Microbus", dayRate: 7000, monthlyFrom: null },
  { slug: "hyundai-h1-2019-20", name: "Hyundai H1", model: "Hyundai H1", years: "2019–20", seats: 12, kind: "Microbus", dayRate: 8000, monthlyFrom: null },
  { slug: "nissan-civilian-42", name: "Nissan Civilian A/C bus", model: "Nissan Civilian bus", seats: 29, kind: "Bus", dayRate: 14000, monthlyFrom: null },
];

export function getFleetPrice(storedOrPublicSlug: string): FleetPrice | undefined {
  const slug = getPublicVehicleSlug(storedOrPublicSlug);
  return fleetPrices.find((row) => row.slug === slug);
}

export function formatBdt(amount: number): string {
  return `৳${amount.toLocaleString("en-US")}`;
}

export function getSeatBand(seats: number): SeatBand {
  if (seats <= 4) return "1-4";
  if (seats <= 7) return "5-7";
  if (seats <= 12) return "8-12";
  return "13-29";
}

/** Cheapest published day rate in the fleet, e.g. for "from ৳3,000/day". */
export function getLowestDayRate(filter: (row: FleetPrice) => boolean = () => true): FleetPrice | undefined {
  return fleetPrices
    .filter((row) => row.dayRate !== null && filter(row))
    .sort((a, b) => (a.dayRate ?? 0) - (b.dayRate ?? 0))[0];
}

/** Full label with years, e.g. "Toyota X-Noah (2012–14)". */
export function getFleetLabel(row: Pick<FleetPrice, "name" | "years">): string {
  return row.years ? `${row.name} (${row.years})` : row.name;
}

/**
 * One sentence an assistant can quote verbatim. Built only from the table
 * and the published overtime-and-fuel policy.
 */
export function getQuotablePriceSentence(row: FleetPrice): string {
  const label = `${getFleetLabel(row)} (${row.seats} seats)`;
  if (row.dayRate === null) {
    return `${label} with driver in Dhaka: day rate quoted on request. ${PRICE_EXTRAS}`;
  }
  return `${label} with driver in Dhaka: from ${formatBdt(row.dayRate)} per day for about ${CITY_DAY_HOURS} within the city. ${PRICE_EXTRAS}`;
}

/** Apply the published table to a database row before it reaches any UI. */
export function withPublishedPrice<T extends { slug: string; starting_price?: number | null; seats: number; price_label?: string }>(
  vehicle: T,
): T {
  const row = getFleetPrice(vehicle.slug);
  if (!row) return vehicle;
  return { ...vehicle, starting_price: row.dayRate, seats: row.seats, price_label: "per day" };
}

/**
 * Places, vehicle classes and estimates for the trip builder.
 *
 * Places carry real coordinates; the illustrated map projects them, and
 * distances come from the great-circle distance times a road factor. Times
 * are ranges between an off-peak and a peak Dhaka speed. Nothing here is a
 * fare — prices are the day rates from the fleet table.
 */

export type Place = {
  id: string;
  label: string;
  short: string;
  lat: number;
  lon: number;
  kind: "airport" | "district";
  /** Which side of its dot the map label sits on. */
  side?: "left" | "right";
  /** Road distance multiplier when the straight line is misleading
   *  (Mirpur sits behind the cantonment; roads go round it). */
  detour?: number;
};

export const places: Place[] = [
  { id: "dac", label: "Hazrat Shahjalal Airport (DAC)", short: "DAC Airport", lat: 23.8433, lon: 90.3978, kind: "airport", side: "right" },
  { id: "uttara", label: "Uttara", short: "Uttara", lat: 23.8759, lon: 90.3795, kind: "district", side: "left" },
  { id: "bashundhara", label: "Bashundhara R/A", short: "Bashundhara", lat: 23.8193, lon: 90.4526, kind: "district", side: "right" },
  { id: "baridhara", label: "Baridhara diplomatic zone", short: "Baridhara", lat: 23.8, lon: 90.4211, kind: "district", side: "right" },
  { id: "gulshan", label: "Gulshan", short: "Gulshan", lat: 23.7925, lon: 90.4078, kind: "district", side: "right" },
  { id: "banani", label: "Banani", short: "Banani", lat: 23.794, lon: 90.4043, kind: "district", side: "left" },
  { id: "mirpur", label: "Mirpur", short: "Mirpur", lat: 23.8223, lon: 90.3654, kind: "district", side: "left", detour: 3 },
  { id: "tejgaon", label: "Tejgaon", short: "Tejgaon", lat: 23.7639, lon: 90.3925, kind: "district", side: "left" },
  { id: "dhanmondi", label: "Dhanmondi", short: "Dhanmondi", lat: 23.7461, lon: 90.3742, kind: "district", side: "left" },
  { id: "motijheel", label: "Motijheel", short: "Motijheel", lat: 23.733, lon: 90.4172, kind: "district", side: "right" },
  { id: "old-dhaka", label: "Old Dhaka", short: "Old Dhaka", lat: 23.7104, lon: 90.4074, kind: "district", side: "right" },
];

/** Outstation runs: road distance and the approximate durations already
 *  published on the route pages. */
export type Outstation = { id: string; label: string; km: number; hours: [number, number]; bearing: number; href: string };
export const outstations: Outstation[] = [
  { id: "chattogram", label: "Chattogram", km: 250, hours: [6, 9], bearing: 135, href: "/routes/dhaka-to-chattogram" },
  { id: "coxs-bazar", label: "Cox’s Bazar", km: 400, hours: [8, 12], bearing: 150, href: "/routes/dhaka-to-coxs-bazar" },
  { id: "sylhet", label: "Sylhet", km: 240, hours: [6, 9], bearing: 55, href: "/routes/dhaka-to-sylhet" },
  { id: "sreemangal", label: "Sreemangal", km: 190, hours: [4, 7], bearing: 80, href: "/routes/dhaka-to-sreemangal" },
];

export const placeById = (id: string) => places.find((p) => p.id === id);
export const outstationById = (id: string) => outstations.find((o) => o.id === id);

const ROAD_FACTOR = 1.35;
/** km/h: early-morning run vs. weekday peak. */
const SPEED_OFFPEAK = 24;
const SPEED_PEAK = 10;

function haversineKm(a: Place, b: Place) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export type Estimate = { km: number; time: string; minutes: [number, number]; outstation?: Outstation };

export function estimate(fromId: string, toId: string): Estimate | null {
  const out = outstationById(toId);
  if (out) return { km: out.km, time: `${out.hours[0]}–${out.hours[1]} h`, minutes: [out.hours[0] * 60, out.hours[1] * 60], outstation: out };
  const a = placeById(fromId);
  const b = placeById(toId);
  if (!a || !b || a.id === b.id) return null;
  const factor = Math.max(ROAD_FACTOR, a.detour ?? 0, b.detour ?? 0);
  const km = Math.max(2, Math.round(haversineKm(a, b) * factor));
  const lo = Math.max(10, Math.round(((km / SPEED_OFFPEAK) * 60) / 5) * 5);
  const hi = Math.max(lo + 10, Math.round(((km / SPEED_PEAK) * 60) / 5) * 5);
  const hm = (m: number) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}`);
  const time = hi < 90 ? `${lo}–${hi} min` : `${hm(lo)} – ${hm(hi)}`;
  return { km, time, minutes: [lo, hi] };
}

/* ── Map projection ───────────────────────────────────────────── */
export const MAP = { w: 640, h: 720, lon: 90.409, lat: 23.885, k: 3200 };
export function project(p: { lat: number; lon: number }) {
  return { x: MAP.w / 2 + (p.lon - MAP.lon) * MAP.k, y: 80 + (MAP.lat - p.lat) * MAP.k * 1.09 };
}

/* ── Vehicle classes ──────────────────────────────────────────── */
export type ClassId = "sedan" | "mpv" | "suv" | "microbus" | "coach";
export type VehicleClass = { id: ClassId; label: string; seats: string; examples: string; match: RegExp; tint: string; image: string };

export const vehicleClasses: VehicleClass[] = [
  { id: "sedan", label: "Sedan", seats: "up to 4", examples: "Premio · Allion · Axio", match: /premio|allion|axio|corolla(?!\s*cross)/i, tint: "var(--color-tile-stone)", image: "/images/vehicles/photos/toyota-f-premio-2012-15-side.webp" },
  { id: "mpv", label: "MPV", seats: "up to 6", examples: "Noah · Alphard", match: /noah|alphard/i, tint: "var(--color-tile-sand)", image: "/images/vehicles/photos/toyota-alphard-2017-19-side.webp" },
  { id: "suv", label: "SUV", seats: "up to 6", examples: "X-Trail · Land Cruiser Prado", match: /prado|x-?trail/i, tint: "var(--color-tile-sage)", image: "/images/vehicles/photos/toyota-land-cruiser-prado-2016-20-side.webp" },
  { id: "microbus", label: "Microbus", seats: "up to 11", examples: "Hiace · Hyundai H-1", match: /hiace|h-?1\b/i, tint: "var(--color-tile-mist)", image: "/images/vehicles/photos/hyundai-h1-2019-20-side.webp" },
  { id: "coach", label: "Coach", seats: "up to 28", examples: "Nissan Civilian", match: /civilian|coach|bus/i, tint: "var(--color-tile-butter)", image: "/images/vehicles/photos/nissan-civilian-29-seater-side.webp" },
];

export type PricedVehicle = { name: string; starting_price?: number | null };
export function classFloor(cls: VehicleClass, vehicles: PricedVehicle[]) {
  const prices = vehicles.filter((v) => cls.match.test(v.name) && v.starting_price).map((v) => v.starting_price as number);
  return prices.length ? Math.min(...prices) : null;
}

/* ── Departure-hour traffic model ─────────────────────────────── */
/** Travel-time multiplier over a free-flowing road, by hour of day. A model
 *  of a typical Dhaka weekday — the shape (quiet nights, a long morning
 *  build, a heavier evening) is what matters; the desk confirms timings. */
export const TRAFFIC = [1, 1, 1, 1, 1, 1.05, 1.2, 1.6, 2.1, 2.4, 2.2, 1.9, 1.8, 1.8, 1.9, 2, 2.2, 2.5, 2.6, 2.4, 2, 1.6, 1.3, 1.1];

export function trafficLabel(m: number) {
  if (m < 1.3) return "Clear roads";
  if (m < 1.9) return "Moderate";
  if (m < 2.3) return "Heavy";
  return "Very heavy";
}

const FREE_FLOW_KMH = 26;

/** Minutes for a trip leaving at `hour`, as [likely, low, high]. City trips
 *  scale with the hour's multiplier; outstation trips add the time it takes
 *  to get out of Dhaka at that hour on top of the published highway range. */
export function driveMinutes(km: number, hour: number, outstation?: Outstation): [number, number, number] {
  const m = TRAFFIC[((hour % 24) + 24) % 24];
  const r5 = (n: number) => Math.max(10, Math.round(n / 5) * 5);
  if (outstation) {
    const exit = (m - 1) * 50;
    const lo = outstation.hours[0] * 60 + exit;
    const hi = outstation.hours[1] * 60 + exit;
    return [r5((lo + hi) / 2), r5(lo), r5(hi)];
  }
  const base = (km / FREE_FLOW_KMH) * 60;
  return [r5(base * m), r5(base * m * 0.85), r5(base * m * 1.2)];
}

export function fmtDuration(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const mm = min % 60;
  return mm ? `${h} h ${mm} min` : `${h} h`;
}

export function fmtClock(totalMin: number) {
  const t = ((Math.round(totalMin) % 1440) + 1440) % 1440;
  const h = Math.floor(t / 60);
  const m = t % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/* ── Trip types ───────────────────────────────────────────────── */
export type TripTypeId = "transfer" | "day" | "monthly" | "delegation" | "outstation";
export type TripType = { id: TripTypeId; label: string; short: string; count?: { label: string; unit: [string, string]; min: number; max: number; default: number } };

export const tripTypes: TripType[] = [
  { id: "transfer", label: "Airport & transfers", short: "Transfer" },
  { id: "day", label: "Full day", short: "Full day", count: { label: "Days", unit: ["day", "days"], min: 1, max: 14, default: 1 } },
  { id: "monthly", label: "Monthly", short: "Monthly", count: { label: "Months", unit: ["month", "months"], min: 1, max: 12, default: 1 } },
  { id: "delegation", label: "Delegation", short: "Delegation", count: { label: "Vehicles", unit: ["vehicle", "vehicles"], min: 2, max: 12, default: 3 } },
  { id: "outstation", label: "Out of town", short: "Outstation", count: { label: "Days", unit: ["day", "days"], min: 1, max: 10, default: 2 } },
];

export const article = (word: string) => (/^[AEFHILMNORSX]/.test(word) ? "an" : "a");

import { SITE_URL } from "@/lib/seo/canonical";
import { plainText } from "@/lib/vehicles/details";
import type { FleetRow } from "@/lib/vehicles/store";

/** One car as the public API and agents see it: facts, rate status and its page. */
export type PublicVehicle = {
  name: string;
  slug: string;
  url: string;
  seats: number;
  day_rate_bdt: number | null;
  rate_status: "published" | "quote_required";
  features: string[];
  rental_types: string[];
  description: string;
  specs: {
    model_year: number | null;
    engine_cc: number | null;
    transmission: string | null;
    fuel_type: string | null;
    colour: string | null;
    luggage_bags: number | null;
    insurance: string | null;
    billed: string;
  };
};

export function toPublicVehicle(r: FleetRow): PublicVehicle {
  return {
    name: r.name,
    slug: r.slug,
    url: `${SITE_URL}/vehicles/${r.slug}`,
    seats: r.seats,
    day_rate_bdt: r.starting_price ?? null,
    rate_status: r.starting_price ? "published" : "quote_required",
    features: r.features ?? [],
    rental_types: r.rental_types ?? [],
    description: plainText(r.description ?? ""),
    specs: {
      model_year: r.model_year ?? null,
      engine_cc: r.engine_cc ?? null,
      transmission: r.transmission ?? null,
      fuel_type: r.fuel_type ?? null,
      colour: r.colour ?? null,
      luggage_bags: r.luggage_bags ?? null,
      insurance: r.insurance?.trim() || null,
      billed: r.price_label || "per day",
    },
  };
}

/** Headers for public, read-only JSON: browsers and CDNs may keep it a minute. */
export const PUBLIC_JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
  "Access-Control-Allow-Origin": "*",
};

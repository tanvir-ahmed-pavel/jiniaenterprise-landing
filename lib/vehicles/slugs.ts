/**
 * Public vehicle URLs.
 *
 * The database still carries some auto-generated slugs ("-copy-8zlbl") and
 * slugs that name the wrong model year. The site publishes the clean slug on
 * the right; the old one 308-redirects to it (see next.config.ts) and every
 * internal link is built through `getPublicVehicleSlug`, so nothing on the
 * site points at an old URL.
 *
 * Renaming the rows in Supabase (supabase/migrations/20261031120000_clean_vehicle_slugs.sql)
 * is safe at any time: lookups accept either form.
 */
export const LEGACY_VEHICLE_SLUGS: Record<string, string> = {
  "toyota-land-cruiser-prado-2012-15-copy-8zlbl": "toyota-land-cruiser-prado-2016-20",
  "toyota-prado": "toyota-land-cruiser-prado-2012-15",
  "toyota-x-noah-2015-18-ny98u": "toyota-noah-2015-18",
  "toyota-noah": "toyota-noah-2012-14",
  "toyota-corolla-cross-jsbl1": "toyota-corolla-cross",
  "hyundai-h1-new": "hyundai-h1-2017-18",
  "hyundai-h1": "hyundai-h1-2019-20",
};

const PUBLIC_TO_LEGACY: Record<string, string> = Object.fromEntries(
  Object.entries(LEGACY_VEHICLE_SLUGS).map(([legacy, clean]) => [clean, legacy]),
);

/** The slug the site links to, for a slug as stored in the database. */
export function getPublicVehicleSlug(storedSlug: string): string {
  return LEGACY_VEHICLE_SLUGS[storedSlug] ?? storedSlug;
}

/** Every slug a public URL may be stored under, newest first. */
export function getStoredSlugCandidates(publicSlug: string): string[] {
  const legacy = PUBLIC_TO_LEGACY[publicSlug];
  return legacy ? [publicSlug, legacy] : [publicSlug];
}

export function getVehiclePath(storedSlug: string): string {
  return `/vehicles/${getPublicVehicleSlug(storedSlug)}`;
}

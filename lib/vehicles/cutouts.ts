/**
 * Transparent cutouts generated from the studio photographs in
 * /public/images/vehicles/variants (white sweep removed, floor reflection kept
 * as a soft shadow). Vehicle rows point at hosted images whose filenames
 * share the same base ("hyundai-h1-2019-20-front-…"), so the base is how a
 * row finds its cutout.
 */
const CUTOUT_BASES = [
  "bmw-executive-2017-20",
  "hilux-double-cabin-2016",
  "hyundai-h1-2017-18",
  "hyundai-h1-2019-20",
  "mercedes-executive-2020-22",
  "nissan-civilian-29-seater",
  "nissan-x-trail-2017",
  "toyota-allion-2012-15",
  "toyota-alphard-2017-19",
  "toyota-axio-2012-15",
  "toyota-corolla-2001-06",
  "toyota-corolla-cross",
  "toyota-f-premio-2012-15",
  "toyota-hiace-2012-15",
  "toyota-land-cruiser-prado-2012-15",
  "toyota-land-cruiser-prado-2016-20",
  "toyota-x-noah-2012-14",
  "toyota-x-noah-2015-18",
] as const;

export type Cutout = { side: string; front: string };

/** Name fallbacks for rows whose image files carry no model name. */
const NAME_BASES: Array<[RegExp, (typeof CUTOUT_BASES)[number]]> = [
  [/corolla\s*cross/i, "toyota-corolla-cross"],
];

// Fallback only: see lib/vehicles/photos.ts. Used while a vehicle still has
// the original studio uploads in admin.
const toCutout = (base: string): Cutout => ({ side: `/images/vehicles/photos/${base}-side.webp`, front: `/images/vehicles/photos/${base}-front.webp` });

export function cutoutFor(urls: Array<string | null | undefined>, name?: string): Cutout | null {
  for (const url of urls) {
    if (!url) continue;
    const file = url.split("/").pop()?.toLowerCase() ?? "";
    const base = CUTOUT_BASES.find((b) => file.startsWith(`${b}-`));
    if (base) return toCutout(base);
  }
  if (name) {
    const hit = NAME_BASES.find(([re]) => re.test(name));
    if (hit) return toCutout(hit[1]);
  }
  return null;
}

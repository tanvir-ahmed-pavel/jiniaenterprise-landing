import { getCanonicalUrl } from "@/lib/seo/canonical";

/**
 * English page → Bangla version. Deliberately only four pages: the Bangla
 * versions are an experiment, compared against similar English-only pages in
 * Search Console before more are added.
 */
export const BANGLA_PAGES: Record<string, string> = {
  "/car-rental-dhaka": "/bn/car-rental-dhaka",
  "/car-rental-with-driver": "/bn/car-rental-with-driver",
  "/services/airport-transfer": "/bn/services/airport-transfer",
  "/routes/dhaka-to-coxs-bazar": "/bn/routes/dhaka-to-coxs-bazar",
};

const ENGLISH_PAGES: Record<string, string> = Object.fromEntries(
  Object.entries(BANGLA_PAGES).map(([en, bn]) => [bn, en]),
);

/** Where a Bangla reader lands from an English page that has no translation. */
export const BANGLA_HOME = "/bn/car-rental-dhaka";

export type Locale = "en" | "bn";

export function getLocaleForPath(pathname: string): Locale {
  return pathname === "/bn" || pathname.startsWith("/bn/") ? "bn" : "en";
}

/** hreflang set for a page, or undefined when the page has only one language. */
export function getLanguageAlternates(path: string): Record<string, string> | undefined {
  const en = ENGLISH_PAGES[path] ?? (BANGLA_PAGES[path] ? path : undefined);
  if (!en) return undefined;
  const bn = BANGLA_PAGES[en];
  return {
    "en-BD": getCanonicalUrl(en),
    "bn-BD": getCanonicalUrl(bn),
    "x-default": getCanonicalUrl(en),
  };
}

/** The matching page in the other language, for the header switch. */
export function getCounterpartPath(pathname: string): { en: string; bn: string } {
  const clean = pathname.replace(/\/$/, "") || "/";
  if (ENGLISH_PAGES[clean]) return { en: ENGLISH_PAGES[clean], bn: clean };
  if (BANGLA_PAGES[clean]) return { en: clean, bn: BANGLA_PAGES[clean] };
  return getLocaleForPath(clean) === "bn"
    ? { en: "/", bn: clean }
    : { en: clean, bn: BANGLA_HOME };
}

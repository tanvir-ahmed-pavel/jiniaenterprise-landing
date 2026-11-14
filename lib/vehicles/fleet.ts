import { vehicleClasses } from "@/lib/trip/data";

/** Pure helpers shared by server pages and the client fleet components. */
export const cleanName = (n: string) => n.replace(/\s+$/, "");

export const classOfName = (name: string) => vehicleClasses.find((c) => c.match.test(name));

/** "Daily · Monthly" — the rental terms a visitor actually chooses between. */
export function hireTerms(rentalTypes: string[]) {
  const t = rentalTypes.filter((r) => /daily|monthly|weekly/i.test(r));
  return t.length ? t.slice(0, 2).join(" · ") : "Daily";
}

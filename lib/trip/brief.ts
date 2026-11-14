import { article, fmtClock, outstationById, placeById, tripTypes, vehicleClasses, type ClassId, type TripTypeId } from "./data";

export type BriefInput = { type: TripTypeId; from: string; to: string; cls: ClassId; modelName?: string | null; hour: number; date: string; count: number; name?: string; pax?: number; note?: string };

export const placeName = (id: string) => placeById(id)?.label ?? outstationById(id)?.label ?? id;
export const placeShort = (id: string) => placeById(id)?.short ?? outstationById(id)?.label ?? id;

export function fmtDate(iso: string) {
  if (!iso) return "date to confirm";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

/** One-line summary used by the request bar. */
export function summary(r: BriefInput) {
  const t = tripTypes.find((x) => x.id === r.type)!;
  const car = r.modelName ?? vehicleClasses.find((c) => c.id === r.cls)!.label;
  const unit = t.count ? ` · ${r.count} ${r.count === 1 ? t.count.unit[0] : t.count.unit[1]}` : "";
  return `${t.short} · ${placeShort(r.from)} → ${placeShort(r.to)} · ${car}${unit}`;
}

/** The WhatsApp brief: what the desk needs to quote, in their order. */
export function brief(r: BriefInput) {
  const t = tripTypes.find((x) => x.id === r.type)!;
  const cls = vehicleClasses.find((c) => c.id === r.cls)!;
  const car = r.modelName ? `${r.modelName} (${cls.label})` : `${article(cls.label)} ${cls.label}`;
  const lines = [
    "Hello Jinia, please quote this trip:",
    "",
    `Trip: ${t.label}`,
    `From: ${placeName(r.from)}`,
    `To: ${placeName(r.to)}`,
    `Vehicle: ${car}${r.type === "delegation" ? ` × ${r.count}` : ""}`,
    t.count && r.type !== "delegation" ? `Duration: ${r.count} ${r.count === 1 ? t.count.unit[0] : t.count.unit[1]}` : "",
    `Date: ${fmtDate(r.date)}, leaving around ${fmtClock(r.hour * 60)}`,
    r.pax ? `Passengers: ${r.pax}` : "",
    r.note?.trim() ? `Note: ${r.note.trim()}` : "",
    r.name?.trim() ? `\nName: ${r.name.trim()}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

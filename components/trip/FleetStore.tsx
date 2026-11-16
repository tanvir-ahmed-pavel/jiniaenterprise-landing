"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Snowflake, Users, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { vehicleClasses } from "@/lib/trip/data";
import { useRequest } from "./RequestProvider";
import { classOfName, cleanName, hireTerms } from "@/lib/vehicles/fleet";

/** Vehicle facts the drawer shows. Filled in by the admin panel. */
export type VehicleDetails = {
  description: string;
  engine_cc: number | null;
  price_label: string;
  model_year: number | null;
  transmission: string | null;
  fuel_type: string | null;
  colour: string | null;
  luggage_bags: number | null;
  insurance: string | null;
};

export type StoreVehicle = {
  id: string;
  name: string;
  slug: string;
  seats: number;
  starting_price: number | null;
  features: string[];
  rental_types: string[];
  cutout: { side: string; front: string } | null;
  fallback: string | null;
  featured?: boolean;
  details: VehicleDetails;
};

/** The spec list in the drawer: only the facts that are filled in. */
function specRows(d: VehicleDetails): Array<[string, string]> {
  const rows: Array<[string, string | number | null]> = [
    ["Model year", d.model_year],
    ["Engine", d.engine_cc ? `${d.engine_cc.toLocaleString("en-US")} cc` : null],
    ["Transmission", d.transmission],
    ["Fuel", d.fuel_type],
    ["Colour", d.colour],
    ["Luggage", d.luggage_bags ? `${d.luggage_bags} ${d.luggage_bags === 1 ? "bag" : "bags"}` : null],
    ["Billed", d.price_label],
  ];
  return rows.filter((r): r is [string, string] => r[1] !== null && r[1] !== "");
}

/** Plain text from the admin description (it may hold a little HTML). */
const plainText = (s: string) => s.replace(/<[^>]*>/g, "").trim();

export type Angle = "side" | "front";
export const clean = cleanName;
export const classOf = (v: Pick<StoreVehicle, "name">) => classOfName(v.name);

export function VehicleImage({ v, angle, sizes, priority }: { v: StoreVehicle; angle: Angle; sizes: string; priority?: boolean }) {
  if (v.cutout) {
    return (
      <>
        <Image src={v.cutout.side} alt={`${clean(v.name)}, side view`} fill sizes={sizes} priority={priority} className={`object-contain p-[3%] transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.45,0,0.2,1)] ${angle === "side" ? "scale-100 opacity-100" : "scale-[0.985] opacity-0"}`} />
        <Image src={v.cutout.front} alt={`${clean(v.name)}, front view`} fill sizes={sizes} className={`object-contain p-[3%] transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.45,0,0.2,1)] ${angle === "front" ? "scale-100 opacity-100" : "scale-[0.985] opacity-0"}`} />
      </>
    );
  }
  return v.fallback ? <Image src={v.fallback} alt={clean(v.name)} fill sizes={sizes} className="object-contain p-[3%]" /> : null;
}

export const terms = (v: Pick<StoreVehicle, "rental_types">) => hireTerms(v.rental_types);

function Card({ v, onView }: { v: StoreVehicle; onView: () => void }) {
  const [front, setFront] = useState(false);
  const { req, chooseModel } = useRequest();
  const c = classOf(v);
  const ac = v.features.some((f) => /air/i.test(f));
  const chosen = req.model?.id === v.id;

  return (
    <article className="group/card flex flex-col" onMouseEnter={() => v.cutout && v.cutout.front !== v.cutout.side && setFront(true)} onMouseLeave={() => setFront(false)}>
      <button type="button" data-cursor="Details" onClick={onView} aria-label={`${clean(v.name)} details`} style={{ backgroundColor: c?.tint ?? "var(--color-paper-deep)" }} className={`relative block aspect-[4/3] w-full overflow-hidden rounded-[1.8rem] text-left transition-shadow duration-300 ${chosen ? "ring-2 ring-ink" : "hover:shadow-[0_22px_44px_-30px_rgba(8,30,20,.45)]"}`}>
        <VehicleImage v={v} angle={front ? "front" : "side"} sizes="(max-width: 768px) 94vw, (max-width: 1280px) 48vw, 32vw" />
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-ink">{c?.label ?? "Special"}</span>
        <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-paper">With driver</span>
      </button>

      <div className="mt-4 flex flex-1 flex-col px-1">
        <h3 className="line-clamp-2 font-heading text-xl font-semibold leading-snug tracking-[-0.025em]">{clean(v.name)}</h3>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/55">
          <li className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{v.seats} seats</li>
          {ac && <li className="flex items-center gap-1"><Snowflake className="h-3.5 w-3.5" />AC</li>}
          <li className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{terms(v)}</li>
        </ul>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <p className="leading-tight">
            {v.starting_price ? (
              <>
                <span className="block text-[0.7rem] text-ink/50">Day rate from</span>
                <span className="text-xl font-semibold tabular-nums">৳{v.starting_price.toLocaleString("en-US")}</span>
              </>
            ) : (
              <span className="text-sm text-ink/55">Rate on request</span>
            )}
          </p>
          <button
            type="button"
            onClick={() => chooseModel(chosen ? null : { id: v.id, slug: v.slug, name: clean(v.name), image: v.cutout?.side ?? v.fallback ?? undefined, classId: c?.id })}
            aria-pressed={chosen}
            className={`inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full px-5 text-sm font-semibold transition-colors ${chosen ? "bg-gold text-ink" : "bg-ink text-paper hover:bg-forest-soft"}`}
          >
            {chosen ? <><Check className="h-3.5 w-3.5" /> Chosen</> : "Choose"}
          </button>
        </div>
      </div>
    </article>
  );
}

function QuickView({ v, onClose }: { v: StoreVehicle | null; onClose: () => void }) {
  const [angle, setAngle] = useState<Angle>("side");
  const { req, chooseModel } = useRequest();
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!v) return;
    window.dispatchEvent(new CustomEvent("jinia:overlay", { detail: 1 }));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", k);
      window.dispatchEvent(new CustomEvent("jinia:overlay", { detail: -1 }));
    };
  }, [v, onClose]);
  const c = v ? classOf(v) : undefined;
  // Portal to <body>: inside the page sections the drawer sits in their
  // stacking context, so the fixed header (z-50) painted over it on phones.
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  if (!mounted) return null;

  return createPortal(
    <>
      <div aria-hidden onClick={onClose} className={`fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500 ${v ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <div role="dialog" aria-modal="true" aria-label={v ? clean(v.name) : "Vehicle"} inert={!v} className={`fixed inset-y-0 right-0 z-[61] flex w-full max-w-xl flex-col overflow-x-hidden overflow-y-auto bg-paper transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${v ? "translate-x-0 visible" : "invisible translate-x-full"}`}>
        {v && (
          <>
            <div className="relative aspect-[4/3] shrink-0" style={{ backgroundColor: c?.tint ?? "var(--color-paper-deep)" }}>
              <VehicleImage v={v} angle={angle} sizes="576px" />
              <button ref={close} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper-deep text-ink"><X className="h-4 w-4" /></button>
              {v.cutout && v.cutout.front !== v.cutout.side && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-paper-deep p-1">
                  {(["side", "front"] as Angle[]).map((a) => (
                    <button key={a} type="button" onClick={() => setAngle(a)} aria-pressed={angle === a} className={`h-8 rounded-full px-4 text-xs font-semibold capitalize transition-colors ${angle === a ? "bg-ink text-paper" : "text-ink/60"}`}>{a}</button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">{c?.label ?? "Special"} · {v.seats} seats</p>
              <h3 className="type-display mt-2 font-heading text-[2.4rem]">{clean(v.name)}</h3>
              <p className="mt-2 text-lg">{v.starting_price ? <>Day rate from <span className="font-semibold">৳{v.starting_price.toLocaleString("en-US")}</span> <span className="text-ink/55">with driver</span></> : "Rate on request"}</p>
              {v.features.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {v.features.map((f) => <li key={f} className="rounded-full bg-paper-deep px-3 py-1.5 text-xs font-medium">{f}</li>)}
                </ul>
              )}
              <dl className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-paper-deep p-4 text-sm">
                <div><dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">Driver</dt><dd className="mt-1 font-semibold">Included</dd></div>
                <div><dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">Seats</dt><dd className="mt-1 font-semibold">{v.seats}</dd></div>
                <div><dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">Hire</dt><dd className="mt-1 font-semibold">{terms(v)}</dd></div>
              </dl>
              {plainText(v.details.description) && (
                <p className="mt-6 whitespace-pre-line text-[0.95rem] leading-relaxed text-ink/70">{plainText(v.details.description)}</p>
              )}
              {specRows(v.details).length > 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/10 pt-6 text-sm">
                  {specRows(v.details).map(([k, val]) => (
                    <div key={k}><dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">{k}</dt><dd className="mt-1 font-semibold">{val}</dd></div>
                  ))}
                </dl>
              )}
              {v.details.insurance && (
                <p className="mt-6 rounded-2xl bg-paper-deep p-4 text-sm leading-relaxed"><span className="font-semibold">Insurance: </span>{v.details.insurance}</p>
              )}
              <div className="mt-auto grid gap-3 pt-8 sm:grid-cols-2">
                <button type="button" onClick={() => { chooseModel({ id: v.id, slug: v.slug, name: clean(v.name), image: v.cutout?.side ?? v.fallback ?? undefined, classId: c?.id }); onClose(); window.setTimeout(() => window.dispatchEvent(new CustomEvent("jinia:open-wizard", { detail: { step: req.date ? 3 : 1 } })), 350); }} className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
                  {req.model?.id === v.id ? <><Check className="h-4 w-4" /> Chosen · back to request</> : "Choose for my request"}
                </button>
                <Link href={`/booking?vehicle=${encodeURIComponent(v.slug)}`} className="inline-flex h-13 items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold ring-1 ring-ink/15 transition-colors hover:ring-ink">
                  Booking form <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>,
    document.body,
  );
}

/** Pointer-following label for the grid (fine pointers only). Moves by
 *  writing straight to the element's style — no React state, so the grid
 *  never re-renders while the mouse moves. */
function useCursorLabel(root: React.RefObject<HTMLElement | null>, bubble: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = root.current;
    const b = bubble.current;
    if (!el || !b || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    let shown = false;
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      const target = e.target as HTMLElement;
      const t = target.closest<HTMLElement>("[data-cursor]");
      const want = !!t && !target.closest("a, button:not([data-cursor])");
      if (want !== shown) {
        shown = want;
        b.dataset.on = want ? "1" : "0";
        if (t) b.textContent = t.dataset.cursor ?? "";
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        b.style.translate = `${px - 40}px ${py - 40}px`;
      });
    };
    const leave = () => {
      shown = false;
      b.dataset.on = "0";
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [root, bubble]);
}

export function FleetStore({ vehicles: all, featuredOnly = false, allHref = "/vehicles" }: { vehicles: StoreVehicle[]; featuredOnly?: boolean; allHref?: string }) {
  // On the home page show the featured cars only (or the first six if too few
  // are marked); the fleet page shows every car with filters.
  const vehicles = useMemo(() => {
    if (!featuredOnly) return all;
    const f = all.filter((v) => v.featured);
    return (f.length >= 3 ? f : all).slice(0, 6);
  }, [all, featuredOnly]);
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<"featured" | "low" | "high" | "seats">("featured");
  const [view, setView] = useState<StoreVehicle | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  useCursorLabel(grid, bubble);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: vehicles.length };
    for (const v of vehicles) {
      const id = classOf(v)?.id ?? "other";
      m[id] = (m[id] ?? 0) + 1;
    }
    return m;
  }, [vehicles]);

  const shown = useMemo(() => {
    const list = filter === "all" ? vehicles : vehicles.filter((v) => (classOf(v)?.id ?? "other") === filter);
    const s = [...list];
    if (sort === "low") s.sort((a, b) => (a.starting_price ?? 1e9) - (b.starting_price ?? 1e9));
    if (sort === "high") s.sort((a, b) => (b.starting_price ?? 0) - (a.starting_price ?? 0));
    if (sort === "seats") s.sort((a, b) => b.seats - a.seats);
    return s;
  }, [vehicles, filter, sort]);

  const chips = [{ id: "all", label: "All" }, ...vehicleClasses.map((c) => ({ id: c.id, label: c.label })), ...(counts.other ? [{ id: "other", label: "Other" }] : [])];

  return (
    <div>
      {!featuredOnly && <div className="flex flex-col gap-4 border-b border-ink/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter by class">
          {chips.map((ch) => (
            <button key={ch.id} role="tab" type="button" aria-selected={filter === ch.id} onClick={() => setFilter(ch.id)} className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${filter === ch.id ? "bg-ink text-paper" : "bg-paper-deep text-ink/70 hover:text-ink"}`}>
              {ch.label} <sup className="ml-0.5 text-[0.65rem] opacity-60">{counts[ch.id] ?? 0}</sup>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-ink/60">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="h-10 rounded-full bg-paper-deep px-4 text-sm font-semibold text-ink outline-none focus:ring-2 focus:ring-gold-deep">
            <option value="featured">Featured</option>
            <option value="low">Price, low to high</option>
            <option value="high">Price, high to low</option>
            <option value="seats">Most seats</option>
          </select>
        </label>
      </div>}

      <div ref={grid} className={`relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-6 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-16 ${featuredOnly ? "" : "mt-8"}`}>
        {shown.map((v) => <Card key={v.id} v={v} onView={() => setView(v)} />)}
      </div>

      {featuredOnly && all.length > vehicles.length && (
        <div className="mt-12 flex justify-center">
          <Link href={allHref} className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-7 pr-2 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
            See all {all.length} cars
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink transition-transform group-hover:translate-x-0.5"><ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      )}

      {/* cursor label */}
      <div ref={bubble} aria-hidden data-on="0" className="jx-cursor pointer-events-none fixed left-0 top-0 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper" />

      <QuickView v={view} onClose={() => setView(null)} />
    </div>
  );
}

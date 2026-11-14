"use client";

import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";
import { useState } from "react";
import { classOf, clean, VehicleImage, type Angle, type StoreVehicle } from "./FleetStore";
import { useRequest } from "./RequestProvider";

/** The car on a white stage with a side / front toggle. */
export function VehicleStage({ v }: { v: StoreVehicle }) {
  const [angle, setAngle] = useState<Angle>("side");
  const c = classOf(v);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] sm:aspect-[16/10]" style={{ backgroundColor: c?.tint ?? "var(--color-paper-deep)" }}>
      <VehicleImage v={v} angle={angle} sizes="(max-width: 1024px) 100vw, 55vw" priority />
      <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold">{c?.label ?? "Special"}</span>
      <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-paper">With driver</span>
      {v.cutout && v.cutout.front !== v.cutout.side && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-white/80 p-1">
          {(["side", "front"] as Angle[]).map((a) => (
            <button key={a} type="button" onClick={() => setAngle(a)} aria-pressed={angle === a} className={`h-9 rounded-full px-5 text-xs font-semibold capitalize transition-colors ${angle === a ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"}`}>
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Put this exact car on the trip request, then open the planner with it. */
export function VehicleActions({ v, whatsapp, phone }: { v: StoreVehicle; whatsapp: string; phone: string }) {
  const { req, chooseModel, focusPlanner } = useRequest();
  const chosen = req.model?.id === v.id;
  const c = classOf(v);
  const plan = () => {
    if (!chosen) chooseModel({ id: v.id, slug: v.slug, name: clean(v.name), image: v.cutout?.side ?? v.fallback ?? undefined, classId: c?.id });
    // Let the provider persist the choice before the planner page loads.
    window.setTimeout(focusPlanner, 60);
  };
  const msg = `Hi Jinia Enterprise, I would like a quote for the ${clean(v.name)} with driver.`;
  return (
    <div className="grid gap-3">
      <button type="button" onClick={plan} className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-7 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft">
        {chosen ? <><Check className="h-4 w-4" /> On your request · plan the trip</> : <>Plan a trip in this car <ArrowRight className="h-4 w-4" /></>}
      </button>
      <div className="grid grid-cols-2 gap-3">
        <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold text-sm font-semibold text-ink transition-colors hover:bg-gold-deep hover:text-paper">
          <WhatsAppIcon className="h-4 w-4" /> {whatsappDisplay}
        </a>
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold ring-1 ring-ink/15 transition-colors hover:ring-ink">
          <Phone className="h-4 w-4" /> Call
        </a>
      </div>
    </div>
  );
}

/** Small cards for other cars in the same class. */
export function SimilarCars({ list }: { list: StoreVehicle[] }) {
  if (!list.length) return null;
  return (
    <div className="scrollbar-none -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
      {list.map((v) => (
        <Link key={v.id} href={`/vehicles/${v.slug}`} className="group w-64 shrink-0 sm:w-auto">
          <span className="relative block aspect-[16/10] overflow-hidden rounded-[1.4rem] transition-shadow group-hover:shadow-[0_18px_40px_-28px_rgba(8,30,20,.35)]" style={{ backgroundColor: classOf(v)?.tint ?? "var(--color-paper-deep)" }}>
            <VehicleImage v={v} angle="side" sizes="(max-width: 640px) 256px, 30vw" />
          </span>
          <span className="mt-3 flex items-baseline justify-between gap-3 px-1">
            <span className="truncate text-sm font-semibold">{clean(v.name)}</span>
            <span className="shrink-0 text-sm tabular-nums text-ink/60">{v.starting_price ? `৳${v.starting_price.toLocaleString("en-US")}` : "On request"}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

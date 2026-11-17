"use client";

import Image from "next/image";
import { useRef } from "react";
import { Pause, Play } from "lucide-react";
import { TRAFFIC, driveMinutes, fmtClock, fmtDuration, trafficLabel, vehicleClasses, type ClassId, type Outstation } from "@/lib/trip/data";
import type { ChosenModel } from "./RequestProvider";

/** One item on the ring: a car from admin, or a vehicle class. */
export type RingItem = { key: string; label: string; image: string };

/**
 * The hero stage. One tinted card holds the chosen car; the other car types
 * wait outside the card on a shallow 3D ring and turn in when chosen (tap a
 * side car, swipe, or use the arrow keys). Below the car, a plain readout of
 * when you'd arrive, with the hour picked on the day's traffic curve.
 */
export function CarStage({
  cls,
  model,
  hour,
  setHour,
  km,
  outstation,
  routeLabel,
  rate,
  items,
  active,
  onPick,
  tabs,
  sentence,
  actions,
  playing = false,
  onTogglePlay,
}: {
  cls: ClassId;
  model: ChosenModel | null;
  hour: number;
  setHour: (h: number) => void;
  km: number;
  outstation?: Outstation;
  routeLabel: string;
  rate: number | null;
  /** The ring items (cars from admin, or the classes) and the one in front. */
  items: RingItem[];
  active: number;
  onPick: (i: number) => void;
  /** Trip-type tabs across the top of the card. */
  tabs?: React.ReactNode;
  /** The trip sentence under the car. */
  sentence?: React.ReactNode;
  /** Primary actions, bottom right of the card. */
  actions?: React.ReactNode;
  /** Ring autoplay state and its toggle (shown beside the dots). */
  playing?: boolean;
  onTogglePlay?: () => void;
}) {
  const n = items.length;
  const C = vehicleClasses.find((c) => c.id === cls) ?? vehicleClasses[0];
  const m = TRAFFIC[hour];
  const [likely, lo, hi] = driveMinutes(km, hour, outstation);
  const name = model?.name ?? `Any ${C.label.toLowerCase()}`;
  const tone = m < 1.3 ? "bg-[oklch(0.9_0.05_150)] text-forest" : m < 1.9 ? "bg-[oklch(0.92_0.07_90)] text-[oklch(0.38_0.07_75)]" : "bg-[oklch(0.88_0.06_40)] text-[oklch(0.4_0.1_35)]";
  const ringEl = useRef<HTMLDivElement>(null);
  const drag = useRef({ id: -1, x0: 0, x: 0, t: 0, vx: 0, live: false });
  // Set when the last gesture was a swipe. Cleared by the next touch, so a
  // real tap right after a swipe still works.
  const swiped = useRef(false);
  const go = (d: number) => n > 0 && onPick((active + d + n) % n);

  // Touch and mouse swipe. The cars follow the finger through one CSS variable
  // (no re-render per move). On release the ring snaps to the nearest car, and
  // a quick flick carries it further. A tap is left to the car's own click.
  const setDrag = (px: number) => ringEl.current?.style.setProperty("--drag", `${px}px`);
  const setTransitions = (on: boolean) =>
    ringEl.current?.querySelectorAll<HTMLElement>("button").forEach((b) => { b.style.transition = on ? "" : "none"; });
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    swiped.current = false;
    drag.current = { id: e.pointerId, x0: e.clientX, x: e.clientX, t: performance.now(), vx: 0, live: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const g = drag.current;
    if (g.id !== e.pointerId) return;
    const dx = e.clientX - g.x0;
    if (!g.live) {
      if (Math.abs(dx) < 8) return; // still a tap
      g.live = true;
      try { ringEl.current?.setPointerCapture(e.pointerId); } catch { /* not supported: keep going */ }
      setTransitions(false);
    }
    const now = performance.now();
    g.vx = (e.clientX - g.x) / Math.max(1, now - g.t); // px per ms, latest sample
    g.x = e.clientX;
    g.t = now;
    setDrag(dx);
  };
  const onUp = (e: React.PointerEvent) => {
    const g = drag.current;
    if (g.id !== e.pointerId) return;
    drag.current = { ...g, id: -1 };
    if (!g.live) return;
    // A touch swipe fires no click, so the flag is cleared shortly after. A mouse
    // swipe's click arrives at once, inside that window.
    swiped.current = true;
    window.setTimeout(() => { swiped.current = false; }, 60);
    const step = (ringEl.current?.offsetWidth ?? 300) * 0.9; // about one car, in px
    const coast = (g.x - g.x0) + g.vx * 160; // where a flick would carry the ring
    const s = -coast / step;
    const steps = Math.abs(s) < 0.3 ? 0 : Math.sign(s) * Math.min(2, Math.max(1, Math.round(Math.abs(s))));
    setTransitions(true);
    setDrag(0);
    if (steps) go(steps);
  };
  const onCancel = () => {
    if (drag.current.id === -1 && !drag.current.live) return;
    drag.current = { id: -1, x0: 0, x: 0, t: 0, vx: 0, live: false };
    setTransitions(true);
    setDrag(0);
  };

  const ring = (
    <div
      ref={ringEl}
      role="radiogroup"
      aria-label="Vehicle class"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onCancel}
      onClickCapture={(e) => {
        // The click that ends a swipe must not select a car.
        if (swiped.current) { e.preventDefault(); e.stopPropagation(); }
      }}
      className="relative z-10 mx-auto -mt-[calc((100vw-3rem)*0.373)] sm:-mt-[calc((100vw-3rem)*0.264)] lg:-mt-[calc(var(--stage)*0.1568)] aspect-[3/2] w-[100%] touch-pan-y select-none outline-none [--spread:58%] lg:[--spread:92%] [perspective:1000px] focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-gold-deep sm:w-[76%] lg:w-[calc(var(--stage)*0.5)]"
    >
      {items.map((c, i) => {
        let d = i - active;
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        const far = Math.abs(d);
        const src = d === 0 && model?.image ? model.image : c.image;
        return (
          <button
            key={c.key}
            type="button"
            role="radio"
            aria-checked={d === 0}
            aria-label={c.label}
            tabIndex={-1}
            onClick={() => d !== 0 && onPick(i)}
            className={`absolute inset-0 origin-bottom transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${far > 1 ? "max-lg:pointer-events-none max-lg:opacity-0" : ""}`}
            style={{
              transform: d === 0 ? "translate3d(var(--drag, 0px), 0, 0) scale(0.91)" : `translate3d(calc(${d * (far === 1 ? 1 : 1.63)} * var(--spread) + var(--drag, 0px)), 0, ${-far * 140}px) rotateY(${-d * 28}deg) scale(${far === 1 ? 0.5 : 0.34})`,
              opacity: d === 0 ? 1 : far === 1 ? 0.55 : far === 2 ? 0.22 : 0,
              zIndex: 10 - far,
              // The front car has transparent edges that would cover the side cars.
              // Taps there must reach the side car, and drags still start on the ring.
              pointerEvents: d === 0 || far > 2 ? "none" : undefined,
            }}
          >
            <Image src={src} alt={d === 0 ? name : ""} fill priority={d === 0} loading={d === 0 ? "eager" : "lazy"} fetchPriority={d === 0 ? "high" : "auto"} sizes="(max-width: 1024px) 78vw, 520px" className="object-contain object-bottom" />
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      className="relative mx-auto w-full max-w-6xl"
      // Desktop stage width also respects the screen height, so the whole
      // planner (headline to note) fits one screen on short laptops.
      style={{ ["--stage" as string]: "min(72rem, 100vw - 5rem, (100svh - 30.5rem) * 2.1)" }}
    >
      {tabs && <div className="mx-auto flex max-w-full justify-center">{tabs}</div>}

      {/* The sentence is wider than the card and rests across its top edge. */}
      {sentence && <div className="relative z-10 mx-auto mt-4 max-w-4xl px-1 sm:mt-6 sm:text-center sm:[@media(max-height:800px)]:mt-3">{sentence}</div>}

      <div
        className="relative mx-auto mt-3 w-full rounded-[1.75rem] pb-[calc((100vw-3rem)*0.22+1rem)] pt-5 sm:pb-[calc((100vw-3rem)*0.147+1rem)] lg:pb-[calc(var(--stage)*0.0881+1rem)] transition-[background-color] duration-700 sm:mt-3 sm:w-[78%] sm:rounded-[2rem] sm:pt-10 lg:w-[64%] lg:pt-8"
        style={{ backgroundColor: C.tint }}
      >
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 sm:gap-y-4 sm:px-8">
          <div className="min-w-0">
            <p className="hidden truncate text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink/50 sm:block">Your car · {routeLabel}</p>
            <p key={name} className="jx-fade truncate font-heading text-lg font-semibold tracking-[-0.03em] sm:mt-1 sm:text-xl">{name}</p>
            <p className="mt-0.5 text-[0.8rem] text-ink/60 sm:text-sm">{C.seats} · {rate ? <>from <span className="font-semibold text-ink tabular-nums">৳{rate.toLocaleString("en-US")}</span>/day</> : "rate on request"} · with driver</p>
          </div>
          {actions && <div className="flex w-full items-center gap-2 sm:w-auto">{actions}</div>}
        </div>

        <div className="relative z-20 mt-4 grid gap-1.5 border-t border-ink/10 px-4 pt-3 sm:mt-5 sm:gap-2 sm:px-8 sm:pt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate whitespace-nowrap text-[0.8rem] tabular-nums text-ink/60 sm:text-sm">
              Leave {fmtClock(hour * 60)} <span className="sm:hidden">→</span><span className="hidden sm:inline">, arrive around</span> <span className="font-heading text-base font-semibold text-ink sm:text-lg">{fmtClock(hour * 60 + likely)}</span>
            </p>
            <span className={`w-[5.75rem] shrink-0 whitespace-nowrap rounded-full py-0.5 text-center text-[0.7rem] font-semibold transition-colors duration-300 ${tone}`} title={`${fmtDuration(lo)} – ${fmtDuration(hi)}`}>{trafficLabel(m)}</span>
          </div>
          <div className="relative h-5 sm:h-6">
            <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-[2px]" aria-hidden>
              {TRAFFIC.map((v, i) => (
                <span key={i} className={`flex-1 rounded-t-sm transition-colors duration-300 ${i === hour ? "bg-ink" : "bg-ink/15"}`} style={{ height: `${(v / 2.6) * 100}%` }} />
              ))}
            </div>
            <input
              type="range"
              min={0}
              max={23}
              step={1}
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              aria-label="Departure hour"
              aria-valuetext={`${fmtClock(hour * 60)}, ${trafficLabel(m)}`}
              className="jx-scrub absolute inset-0 h-full w-full cursor-ew-resize"
            />
          </div>
        </div>
      </div>

      {/* The car rests on the card's bottom edge and hangs into the page. */}
      {ring}

      <div className="mt-1 flex items-center justify-center gap-1">
        {onTogglePlay && (
          <button type="button" data-autoplay-toggle onClick={onTogglePlay} aria-label={playing ? "Pause the car tour" : "Play the car tour"} aria-pressed={playing} className="tap-expand mr-1.5 flex h-7 w-7 items-center justify-center rounded-full text-ink/60 ring-1 ring-ink/15 transition-colors hover:bg-ink hover:text-paper">
            {playing ? <Pause className="h-3 w-3" /> : <Play className="ml-px h-3 w-3" />}
          </button>
        )}
        {items.map((c, i) => (
          <button key={c.key} type="button" onClick={() => onPick(i)} aria-label={`Show ${c.label}`} aria-pressed={i === active} className="tap-expand flex h-6 w-7 items-center justify-center">
            {/* fixed slot; only scale animates, so the row never reflows */}
            <span className={`block h-1.5 w-6 rounded-full transition-[transform,background-color] duration-300 ${i === active ? "scale-x-100 bg-ink" : "scale-x-[0.25] bg-ink/20 hover:bg-ink/40"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

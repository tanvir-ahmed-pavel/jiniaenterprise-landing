"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, X } from "lucide-react";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { article, estimate, outstations, places, tripTypes, vehicleClasses, type ClassId } from "@/lib/trip/data";
import { brief, fmtDate, placeShort } from "@/lib/trip/brief";
import { CarStage } from "./CarStage";
import { AutoPan } from "./AutoPan";
import { classById, useRequest, type ChosenModel } from "./RequestProvider";
import type { RingItem } from "./HeroDisk";

/** A car from admin that is shown on the turntable. */
export type HeroCar = { id: string; slug: string; name: string; image: string; classId: ClassId };

const CODES: Record<string, string> = {
  dac: "DAC", uttara: "UTT", bashundhara: "BSD", baridhara: "BRD", gulshan: "GUL", banani: "BAN",
  mirpur: "MIR", tejgaon: "TEJ", dhanmondi: "DHN", motijheel: "MTJ", "old-dhaka": "ODH",
  chattogram: "CTG", "coxs-bazar": "CXB", sylhet: "SYL", sreemangal: "SRM",
};

/** Inline select that reads as part of the sentence. A real control sits on
 *  top (transparent) so keyboards, screen readers and phones get native UI. */
/** Text whose box glides to its new width when the word changes, so the
 *  sentence reflows smoothly instead of jumping. */
function GlideText({ text }: { text: string }) {
  const sizer = useRef<HTMLSpanElement>(null);
  const [w, setW] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = sizer.current;
    if (!el) return;
    const measure = () => setW(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);
  return (
    <span className="relative inline-block overflow-hidden whitespace-nowrap align-bottom transition-[width] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={w === null ? undefined : { width: w }}>
      <span ref={sizer} aria-hidden className="invisible absolute left-0 top-0 whitespace-nowrap">{text}</span>
      <span key={text} className="jx-fade inline-block">{text}</span>
    </span>
  );
}

function Slot({ label, display, children, glide }: { label: string; display: string; children: React.ReactNode; glide?: boolean }) {
  return (
    <span className="jx-slot group/slot relative inline-flex items-baseline whitespace-nowrap" aria-label={label}>
      <span className="relative inline-flex items-baseline gap-1 pb-0.5 text-ink transition-[transform,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/slot:-translate-y-0.5 group-hover/slot:text-forest-soft group-focus-within/slot:-translate-y-0.5">
        {glide ? <GlideText text={display} /> : <span key={display} className="jx-fade inline-block">{display}</span>}
        <ChevronDown className="h-[0.5em] w-[0.5em] self-center text-gold-deep transition-transform duration-300 group-hover/slot:translate-y-[0.12em] group-hover/slot:rotate-180 group-focus-within/slot:rotate-180" strokeWidth={3} />
        {/* the underline: rests gold, sweeps darker from the left on hover */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-gold" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/slot:scale-x-100 group-focus-within/slot:scale-x-100" />
      </span>
      {children}
    </span>
  );
}
const overlay = "absolute inset-0 cursor-pointer appearance-none opacity-0";

function PlaceSelect({ label, value, onChange, exclude, outstationOnly, allowOutstation }: { label: string; value: string; onChange: (v: string) => void; exclude?: string; outstationOnly?: boolean; allowOutstation?: boolean }) {
  return (
    <Slot label={label} display={placeShort(value)}>
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} className={overlay}>
        {!outstationOnly && (
          <optgroup label="Dhaka">
            {places.filter((p) => p.id !== exclude).map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
          </optgroup>
        )}
        {(outstationOnly || allowOutstation) && (
          <optgroup label="Out of town">
            {outstations.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </optgroup>
        )}
      </select>
    </Slot>
  );
}

function todayISO(offset = 0) {
  const d = new Date(Date.now() + offset * 864e5);
  return d.toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
}

export function HeroTrip({ floors, whatsapp, heroCars = [] }: { floors: Record<ClassId, number | null>; whatsapp: string; heroCars?: HeroCar[] }) {
  const { req, set, setType, chooseModel } = useRequest();
  const [today, setToday] = useState("");
  const t = tripTypes.find((x) => x.id === req.type)!;
  const C = classById(req.cls);
  const est = useMemo(() => estimate(req.from, req.to), [req.from, req.to]);

  // The turntable. With two or more cars flagged in admin, each item is one
  // car; otherwise each item is one car class, as before.
  const carMode = heroCars.length >= 2;
  const items: RingItem[] = useMemo(
    () => (carMode
      ? heroCars.map((c) => ({ key: c.id, label: c.name, image: c.image }))
      : vehicleClasses.map((c) => ({ key: c.id, label: c.label, image: c.image }))),
    [carMode, heroCars],
  );
  const itemClass: ClassId[] = carMode ? heroCars.map((c) => c.classId) : vehicleClasses.map((c) => c.id);
  const itemTint = itemClass.map((id) => vehicleClasses.find((c) => c.id === id)?.tint ?? "var(--color-tile-stone)");

  // The car in front. It follows the request (a picked car or class) and the autoplay.
  const focusOf = (model: ChosenModel | null, cls: ClassId) => {
    if (model) {
      const j = items.findIndex((it) => it.key === model.id);
      if (j >= 0) return j;
    }
    const k = itemClass.indexOf(cls);
    return k >= 0 ? k : 0;
  };
  const [focus, setFocus] = useState(0);
  useEffect(() => {
    setFocus(focusOf(req.model, req.cls));
    // focusOf reads the current list; it only needs to run when the pick changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [req.model?.id, req.cls, carMode]);

  // Picking a car (or class) from the turntable sets the request, not just the view.
  const pick = (i: number) => {
    setAuto(false);
    setFocus(i);
    const car = carMode ? heroCars[i] : undefined;
    if (car) chooseModel({ id: car.id, slug: car.slug, name: car.name, image: car.image, classId: car.classId });
    else chooseModel(null);
    set({ cls: itemClass[i] });
  };

  // Autoplay: the turntable turns by itself until the visitor interacts with the
  // hero, and only while the hero is on screen. In car mode it only turns the
  // view and leaves the request alone; in class mode it also sets the class.
  const hero = useRef<HTMLElement>(null);
  const [auto, setAuto] = useState(true);
  const [side, setSide] = useState<"left" | "right" | null>(null);
  const focusRef = useRef(focus);
  const countRef = useRef(items.length);
  const carModeRef = useRef(carMode);
  const classRef = useRef(itemClass);
  useEffect(() => {
    focusRef.current = focus;
    countRef.current = items.length;
    carModeRef.current = carMode;
    classRef.current = itemClass;
  });
  useEffect(() => {
    const el = hero.current;
    if (!el || !auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.4 });
    io.observe(el);
    const stop = (e: Event) => { if ((e.target as Element | null)?.closest?.("[data-autoplay-toggle]")) return; setAuto(false); };
    el.addEventListener("pointerdown", stop);
    el.addEventListener("keydown", stop);
    el.addEventListener("focusin", stop);
    let turns = 0;
    const id = window.setInterval(() => {
      const total = countRef.current;
      if (!visible || document.hidden || total < 2) return;
      const next = (focusRef.current + 1) % total;
      focusRef.current = next;
      setFocus(next);
      if (!carModeRef.current) set({ cls: classRef.current[next] });
      // One full turn of the ring, then rest so the visitor can take it in.
      if (++turns >= total) setAuto(false);
    }, 4000);
    return () => {
      window.clearInterval(id);
      io.disconnect();
      el.removeEventListener("pointerdown", stop);
      el.removeEventListener("keydown", stop);
      el.removeEventListener("focusin", stop);
    };
  }, [auto, set]);

  // Client-only bits: today's date in Dhaka, current Dhaka hour as default.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setToday(todayISO());
      const h = Number(new Date().toLocaleString("en-GB", { hour: "2-digit", hour12: false, timeZone: "Asia/Dhaka" }));
      if (!Number.isNaN(h)) set({ hour: h >= 21 || h < 5 ? 9 : h + 1 });
    });
    return () => cancelAnimationFrame(id);
  }, [set]);


  const dateLabel = !req.date ? "a date" : req.date === today ? "today" : req.date === todayISO(1) ? "tomorrow" : fmtDate(req.date);
  const carWord = req.model ? req.model.name : C.label;
  const countSlot = t.count ? (
    <Slot label={t.count.label} display={`${req.count} ${req.count === 1 ? t.count.unit[0] : t.count.unit[1]}`}>
      <select aria-label={t.count.label} value={req.count} onChange={(e) => set({ count: Number(e.target.value) })} className={overlay}>
        {Array.from({ length: t.count.max - t.count.min + 1 }, (_, i) => t.count!.min + i).map((n) => (
          <option key={n} value={n}>{n} {n === 1 ? t.count!.unit[0] : t.count!.unit[1]}</option>
        ))}
      </select>
    </Slot>
  ) : null;
  const classSlot = (
    <Slot label="Vehicle" display={carWord} glide>
      <select aria-label="Vehicle class" value={req.cls} onChange={(e) => { chooseModel(null); set({ cls: e.target.value as ClassId }); }} className={overlay}>
        {vehicleClasses.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
      </select>
    </Slot>
  );
  const from = <PlaceSelect label="From" value={req.from} exclude={req.to} onChange={(v) => set({ from: v })} />;
  const to = req.type === "outstation"
    ? <PlaceSelect label="To" value={req.to} outstationOnly onChange={(v) => set({ to: v })} />
    : <PlaceSelect label="To" value={req.to} exclude={req.from} onChange={(v) => set({ to: v })} />;
  const dateSlot = (
    <Slot label="Date" display={dateLabel}>
      <input type="date" aria-label="Date" min={today || undefined} value={req.date} onChange={(e) => set({ date: e.target.value })} className={overlay} />
    </Slot>
  );
  const art = req.model ? "the" : article(carWord);

  const sentence = {
    transfer: <>Pick me up at {from} and take me to {to} in <span className="inline-block w-[1.15em] text-center">{art}</span> {classSlot}, on {dateSlot}.</>,
    day: <>{art === "the" ? "The" : art === "an" ? "An" : "A"} {classSlot} with driver for {countSlot}, starting at {from}, to {to}, from {dateSlot}.</>,
    monthly: <>{art === "the" ? "The" : art === "an" ? "An" : "A"} {classSlot} and driver for {countSlot}, for the daily run from {from} to {to}, starting {dateSlot}.</>,
    delegation: <>{countSlot} matched {classSlot} moving together from {from} to {to}, on {dateSlot}.</>,
    outstation: <>Take me from {from} to {to} in {art} {classSlot} for {countSlot}, leaving {dateSlot}.</>,
  }[req.type];

  const waText = brief({ ...req, modelName: req.model?.name });

  return (
    <section
      ref={hero}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        // Wake a side only when the cursor is near that edge.
        const x = (e.clientX - r.left) / r.width;
        // Wake at 15% from an edge, sleep only past 20%: no flutter at the line.
        const next = side === "left" ? (x < 0.2 ? "left" : x > 0.85 ? "right" : null)
          : side === "right" ? (x > 0.8 ? "right" : x < 0.15 ? "left" : null)
          : x < 0.15 ? "left" : x > 0.85 ? "right" : null;
        if (next !== side) setSide(next);
      }}
      onPointerLeave={() => setSide(null)}
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden bg-white pb-6 pt-4 sm:pb-8 sm:pt-6 sm:[@media(max-height:800px)]:pb-3 sm:[@media(max-height:800px)]:pt-3"
    >
      <div className="container">
        <h1 className="type-display text-center font-heading text-[clamp(2.5rem,5.2vw,4.5rem)] text-ink">
          Where to<span className="type-accent text-gold-deep">, today?</span>
        </h1>

        <div className="mt-4 sm:mt-5">
          <CarStage
            cls={req.model ? req.cls : itemClass[focus] ?? req.cls}
            model={req.model}
            hour={req.hour}
            setHour={(h) => set({ hour: h })}
            km={est?.km ?? 8}
            outstation={est?.outstation}
            routeLabel={`${CODES[req.from]} → ${CODES[req.to]}`}
            rate={floors[req.cls]}
            items={items}
            active={focus}
            onPick={pick}
            playing={auto}
            onTogglePlay={() => setAuto((a) => !a)}
            tabs={
              <div role="tablist" aria-label="Kind of trip" className="scrollbar-none -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                {tripTypes.map((x) => (
                  <button key={x.id} type="button" role="tab" aria-selected={req.type === x.id} onClick={() => setType(x.id)} className={`h-11 shrink-0 whitespace-nowrap rounded-full px-3.5 text-[0.8rem] font-semibold transition-colors sm:h-10 sm:px-4 sm:text-sm ${req.type === x.id ? "bg-ink text-paper" : "bg-paper-deep text-ink/65 hover:text-ink"}`}>
                    {x.label}
                  </button>
                ))}
              </div>
            }
            sentence={
              <>
                <AutoPan>
                  <p key={req.type} className="jx-car-in w-max whitespace-nowrap pb-1 font-heading text-[1.35rem] font-medium leading-[1.6] tracking-[-0.03em] text-ink/55 sm:min-h-[3lh] sm:w-auto sm:whitespace-normal sm:pb-0 lg:min-h-[2lh] sm:text-[clamp(1.3rem,2.1vw,1.95rem)] sm:leading-[1.5]">
                    {sentence}
                  </p>
                </AutoPan>
                {req.model && (
                  <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full bg-paper-deep py-1 pl-3.5 pr-1 text-sm">
                    <span className="min-w-0 truncate"><span className="text-ink/55">Specific car: </span><span className="font-semibold">{req.model.name}</span></span>
                    <button type="button" onClick={() => chooseModel(null)} aria-label="Any car in this class instead" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full hover:bg-ink/10"><X className="h-3.5 w-3.5" /></button>
                  </div>
                )}
              </>
            }
            actions={
              <>
                <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`} className="group flex h-12 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold text-[#128C4B] ring-1 ring-ink/15 transition-colors hover:bg-[#25D366]/10 hover:ring-[#128C4B]">
                  <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
                  <span className="hidden tabular-nums text-ink sm:inline">{whatsappDisplay}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("jinia:open-wizard", { detail: { step: req.date ? 3 : 1 } }))} className="group flex h-12 flex-1 items-center justify-between gap-3 rounded-full bg-ink pl-5 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft lg:flex-none">
                  Request a quote
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5"><ArrowRight className="h-4 w-4" /></span>
                </button>
              </>
            }
          />
        </div>

        {/* Edge turns: a bare chevron at each side. Moving the mouse into
            that half of the hero wakes it: a soft glow rises from the edge in
            the next car's tint, the chevron sharpens, and a preview appears. */}
        {(["prev", "next"] as const).map((dir) => {
          const total = items.length;
          if (total < 2) return null;
          const j = (focus + (dir === "next" ? 1 : -1) + total) % total;
          const target = items[j];
          const tint = itemTint[j];
          const isNext = dir === "next";
          const on = side === (isNext ? "right" : "left");
          return (
            <div key={dir} className={`pointer-events-none absolute inset-y-0 hidden w-[26vw] max-w-[22rem] sm:block ${isNext ? "right-0" : "left-0"}`}>
              {/* glow from the edge */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  opacity: on ? 1 : 0,
                  background: `radial-gradient(70% 50% at ${isNext ? "100%" : "0%"} 55%, color-mix(in oklch, ${tint} 55%, transparent) 0%, color-mix(in oklch, ${tint} 25%, transparent) 40%, transparent 75%)`,
                }}
              />
              <button
                type="button"
                onClick={() => pick(j)}
                aria-label={`${isNext ? "Next" : "Previous"} car type: ${target.label}`}
                className={`pointer-events-auto absolute top-1/2 z-30 flex -translate-y-1/2 items-center gap-3 py-8 outline-none ${isNext ? "right-0 flex-row-reverse pl-4 pr-3 lg:pr-6" : "left-0 pl-3 pr-4 lg:pl-6"}`}
              >
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                  <span aria-hidden className={`absolute inset-0 rounded-full bg-white/70 ring-1 ring-ink/10 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
                  <ChevronLeft
                    strokeWidth={1.1}
                    className={`relative h-10 w-10 transition-colors duration-500 ${isNext ? "rotate-180" : ""} ${on ? "text-ink" : "text-ink/25"}`}
                  />
                </span>
                <span
                  className={`flex items-center gap-2 transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isNext ? "flex-row-reverse text-right" : "text-left"} ${on ? "opacity-100" : "opacity-0"}`}
                  style={{ clipPath: on ? "inset(0 0 0 0)" : isNext ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
                >
                  <span className="relative block h-16 w-24 shrink-0">
                    <Image src={target.image} alt="" fill sizes="96px" className="object-contain" />
                  </span>
                  <span className="w-24 whitespace-nowrap leading-tight">
                    <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink/45">{isNext ? "Next" : "Previous"}</span>
                    <span className="block font-heading text-lg font-semibold tracking-[-0.02em] text-ink">{target.label}</span>
                  </span>
                </span>
              </button>
            </div>
          );
        })}

        <p className="mx-auto mt-4 max-w-md text-center text-xs text-ink/45 sm:[@media(max-height:800px)]:hidden">A person replies with one fixed price, usually inside the hour. No deposit to ask.</p>
      </div>
    </section>
  );
}

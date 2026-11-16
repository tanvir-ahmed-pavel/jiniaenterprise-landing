"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, CarFront, Check, Minus, Phone, Plus, X } from "lucide-react";
import { WhatsAppIcon, whatsappDisplay } from "@/components/brand/WhatsApp";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { fmtClock, outstations, places, tripTypes, vehicleClasses, type ClassId, type TripTypeId } from "@/lib/trip/data";
import { brief, fmtDate, placeName, placeShort as placeShortName, summary } from "@/lib/trip/brief";
import { pushEvent } from "@/lib/analytics/datalayer";
import { vehiclePhotos } from "@/lib/vehicles/photos";
import { classOfName } from "@/lib/vehicles/fleet";
import posthog from "posthog-js";
import { useGlassRefraction } from "@/hooks/useGlassRefraction";

const STORE_KEY = "jinia:request";

type FleetCar = { id: string; slug: string; name: string; seats: number; price: number | null; classId?: ClassId; image: string | null };
const OUT = outstations.map((o) => o.id);

const BLURB: Record<TripTypeId, string> = {
  transfer: "Airport pickup or drop, or one ride across town",
  day: "Car and driver for the working day, 10–12 hours",
  monthly: "A dedicated car and driver, billed monthly",
  delegation: "Matched vehicles moving together on protocol",
  outstation: "Chattogram, Sylhet, Cox’s Bazar and beyond",
};

type State = {
  type: TripTypeId;
  from: string;
  to: string;
  cls: ClassId;
  model: { id?: string; slug?: string; name: string; image?: string; classId?: ClassId } | null;
  hour: number;
  date: string;
  count: number;
  pax: number;
  name: string;
  phone: string;
  email: string;
  note: string;
};

const START: State = { type: "transfer", from: "dac", to: "gulshan", cls: "sedan", model: null, hour: 9, date: "", count: 1, pax: 1, name: "", phone: "", email: "", note: "" };
const STEPS = ["What do you need?", "Where and when?", "Which car?", "Your details"];

function todayDhaka() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });
}

const shortStep = ["Trip", "Where & when", "Car", "Details"];

/** The planner's trip types mapped onto the bookings table's rental_type. */
const RENTAL: Record<TripTypeId, string> = { transfer: "airport", day: "daily", monthly: "monthly", delegation: "corporate", outstation: "daily" };

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function returnDate(type: TripTypeId, date: string, count: number) {
  if (!date) return null;
  if (type === "monthly") {
    const d = new Date(`${date}T00:00:00`);
    d.setMonth(d.getMonth() + count);
    return d.toISOString().slice(0, 10);
  }
  if ((type === "day" || type === "outstation") && count > 1) return addDays(date, count - 1);
  return null;
}

/**
 * The request dock: one floating element for the whole site. Closed, it is a
 * slim bar with the current request and a quote button. Edit it and the same
 * bar grows upward into four short steps, keeping its bottom row as the
 * footer (live summary, back, next or send). Close it and it folds back down.
 * It shares the trip request with the home planner and the fleet pages.
 */
export function RequestWizard({ whatsapp, phone }: { whatsapp: string; phone: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>(START);
  const [touched, setTouched] = useState(false);
  const [min, setMin] = useState("");
  const [show, setShow] = useState(false);
  const [overlays, setOverlays] = useState(0);
  const [fleet, setFleet] = useState<FleetCar[] | null>(null);
  const loadingFleet = useRef(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const dragY = useRef<number | null>(null);
  const openRef = useRef(false);
  useEffect(() => { openRef.current = open; }, [open]);

  const set = useCallback((patch: Partial<State>) => setS((r) => ({ ...r, ...patch })), []);

  // Restore the saved request once, then follow the page's planner while folded.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = sessionStorage.getItem(STORE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved && typeof saved === "object" && saved.type) { setS((r) => ({ ...r, ...saved })); setTouched(true); }
        }
      } catch {}
    });
    const sync = (e: Event) => {
      if (openRef.current) return;
      const d = (e as CustomEvent<Partial<State>>).detail;
      if (d && typeof d === "object") { setS((r) => ({ ...r, ...d })); setTouched(true); }
    };
    window.addEventListener("jinia:request-sync", sync);
    return () => { cancelAnimationFrame(id); window.removeEventListener("jinia:request-sync", sync); };
  }, []);

  // While open, every change is shared with the page's trip request.
  const sharedKey = JSON.stringify({ type: s.type, from: s.from, to: s.to, cls: s.cls, hour: s.hour, date: s.date, count: s.count, model: s.model });
  useEffect(() => {
    if (!open) return;
    const shared = JSON.parse(sharedKey);
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ ...(raw ? JSON.parse(raw) : {}), ...shared }));
    } catch {}
    window.dispatchEvent(new CustomEvent("jinia:request", { detail: shared }));
  }, [open, sharedKey]);

  // The real fleet, loaded once the first time the form opens.
  const loadFleet = useCallback(async () => {
    if (loadingFleet.current) return;
    loadingFleet.current = true;
    try {
      // Plain REST read (public, RLS allows active vehicles) — avoids shipping
      // the whole Supabase client to every page just for this list.
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/vehicles?select=id,slug,name,seats,starting_price,image_url,images,sort_order&is_active=eq.true&order=sort_order.asc`;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
      const res = await fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
      const data = res.ok ? await res.json() : [];
      const rows = (data ?? []) as Array<{ id: string; slug: string; name: string; seats: number; starting_price: number | null; image_url: string | null; images: string[] | null }>;
      setFleet(rows.map((r) => {
        const { photos, fallback } = vehiclePhotos(r.images, r.image_url, r.name);
        return {
          id: r.id,
          slug: r.slug,
          name: r.name.trim(),
          seats: r.seats,
          price: r.starting_price,
          classId: classOfName(r.name)?.id,
          image: photos?.side ?? fallback,
        };
      }));
    } catch {
      loadingFleet.current = false;
      setFleet([]);
    }
  }, []);

  const openWizard = useCallback((start = 0) => {
    void loadFleet();
    opener.current = document.activeElement as HTMLElement | null;
    setMin(todayDhaka());
    setStep(start);
    setSent(false);
    setErr("");
    setTouched(true);
    setOpen(true);
    pushEvent("wizard_open", { page_path: window.location.pathname });
  }, [loadFleet]);

  // Step aside while another panel (car details, mobile menu) is open.
  useEffect(() => {
    const on = (e: Event) => setOverlays((n) => Math.max(0, n + Number((e as CustomEvent<number>).detail || 0)));
    window.addEventListener("jinia:overlay", on);
    return () => window.removeEventListener("jinia:overlay", on);
  }, []);

  useEffect(() => {
    const on = (e: Event) => openWizard(Number((e as CustomEvent<{ step?: number }>).detail?.step ?? 0));
    window.addEventListener("jinia:open-wizard", on);
    return () => window.removeEventListener("jinia:open-wizard", on);
  }, [openWizard]);

  // When the dock shows: on pages with the planner, once the planner and the
  // closing section are both out of view; elsewhere, after the header.
  useEffect(() => {
    const plan = document.getElementById("plan");
    const end = document.getElementById("closing");
    let planIn = !!plan;
    let endIn = false;
    let scrolled = false;
    let nearEnd = false;
    const update = () => setShow(plan ? !planIn && !endIn : scrolled && !nearEnd);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === plan) planIn = e.isIntersecting;
        if (e.target === end) endIn = e.isIntersecting;
      }
      update();
    }, { threshold: 0.05 });
    if (plan) io.observe(plan);
    if (end) io.observe(end);
    const onScroll = () => {
      scrolled = window.scrollY > 480;
      nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 520;
      if (!plan) update();
    };
    const id = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); cancelAnimationFrame(id); window.removeEventListener("scroll", onScroll); };
  }, [path]);

  // On phones, keep the field being typed in visible above the keyboard.
  useEffect(() => {
    const el = panel.current;
    if (!el || !open) return;
    const onFocus = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || !t.matches("input, select, textarea")) return;
      if (!window.matchMedia("(pointer: coarse)").matches) return;
      window.setTimeout(() => t.scrollIntoView({ block: "center", behavior: "smooth" }), 280);
    };
    el.addEventListener("focusin", onFocus);
    return () => el.removeEventListener("focusin", onFocus);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", k);
    };
  }, [open]);

  const shut = () => {
    setOpen(false);
    opener.current?.focus?.();
  };

  const t = tripTypes.find((x) => x.id === s.type)!;
  const cls = vehicleClasses.find((c) => c.id === s.cls)!;
  const destinations = s.type === "outstation" ? outstations.map((o) => ({ id: o.id, label: o.label })) : places.map((p) => ({ id: p.id, label: p.label }));

  const chooseType = (type: TripTypeId) => {
    const tt = tripTypes.find((x) => x.id === type)!;
    const next: Partial<State> = { type, count: tt.count?.default ?? 1 };
    if (type === "outstation" && !OUT.includes(s.to)) next.to = "coxs-bazar";
    if (type !== "outstation" && OUT.includes(s.to)) next.to = "gulshan";
    if (type === "delegation" && s.cls === "sedan") next.cls = "suv";
    set(next);
    setStep(1);
  };

  const input = { ...s, modelName: s.model?.name };
  useEffect(() => {
    if (open) pushEvent("wizard_step", { step: step + 1, step_name: STEPS[step] });
  }, [open, step]);

  const waClick = () => pushEvent("whatsapp_click", { method: "dock", trip_type: s.type });

  const detailsOk = s.name.trim().length >= 2 && s.phone.replace(/\D/g, "").length >= 10 && /^\S+@\S+\.\S+$/.test(s.email.trim());
  const canNext = step !== 1 || (!!s.date && !!s.from.trim() && !!s.to.trim());

  const submit = async () => {
    if (!detailsOk || sending) return;
    setSending(true);
    setErr("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: s.name.trim(),
          phone: s.phone.trim(),
          email: s.email.trim(),
          vehicle_id: s.model?.id ?? null,
          vehicle_name: s.model?.name ?? cls.label,
          rental_type: RENTAL[s.type],
          pickup_date: s.date,
          return_date: returnDate(s.type, s.date, s.count),
          pickup_location: placeName(s.from),
          destination: placeName(s.to),
          source: "hero_widget",
          message: brief(input),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      posthog.capture("booking_wizard_request_submitted", {
        trip_type: s.type,
        vehicle_class: s.cls,
        passenger_count: s.pax,
        trip_count: s.count,
        has_selected_vehicle: Boolean(s.model?.id),
      });
      setSent(true);
      pushEvent("generate_lead", { method: "booking_wizard", trip_type: s.type, vehicle_class: s.cls, from: s.from, to: s.to, passengers: s.pax });
    } catch {
      setErr("That did not go through. Please try again, send it on WhatsApp, or call the desk.");
    } finally {
      setSending(false);
    }
  };

  const waHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(brief(input))}`;
  const visible = open || (show && overlays === 0);
  const image = s.model?.image ?? cls.image;

  // Edge refraction on Chromium: the backdrop bends along the rim of the glass.
  // The options stay the same when the panel opens or folds, so the filter is
  // not torn down during the move.
  useGlassRefraction(panel, { bevel: 30, maxShift: 80 });

  return (
    <>
      <div aria-hidden onClick={shut} className={`jx-scrim fixed inset-0 z-[56] transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />

      <div
        ref={panel}
        role={open ? "dialog" : "region"}
        aria-modal={open || undefined}
        aria-label="Request a car"
        aria-hidden={!visible}
        inert={!visible}
        className={`fixed z-[57] mx-auto overflow-hidden transition-[max-width,background-color,color,transform,opacity,box-shadow,border-radius,--tile,--glass-rim,--glass-hi,--glass-lo] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "inset-x-0 bottom-0 max-w-[30rem] rounded-t-[1.75rem] jx-glass jx-glass-sheet text-ink sm:inset-x-3 sm:bottom-5 sm:rounded-[2rem]" : "jx-glass jx-glass-dock inset-x-3 bottom-3 max-w-2xl rounded-[2rem] text-ink sm:bottom-5"} ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0"}`}
      >
        {/* Steps: grow out of the bar */}
        <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="min-h-0 overflow-hidden">
            <div className="flex max-h-[calc(92dvh-5rem)] flex-col sm:max-h-[calc(88dvh-5rem)]">
              {/* Header: the car you're asking for, on its tint, with the trip so far. */}
              <div className="relative shrink-0 overflow-hidden transition-[background-color] duration-700" style={{ backgroundImage: `linear-gradient(180deg, color-mix(in oklch, ${cls.tint} 66%, transparent), color-mix(in oklch, ${cls.tint} 34%, transparent) 62%, transparent)` }}
                onPointerDown={(e) => { dragY.current = e.clientY; }}
                onPointerUp={(e) => { if (dragY.current !== null && e.clientY - dragY.current > 70) shut(); dragY.current = null; }}
              >
                <span aria-hidden className="mx-auto mt-2 block h-1 w-10 rounded-full bg-ink/20 sm:hidden" />
                <div className="flex items-center justify-between gap-3 px-5 pt-4 sm:px-6">
                  <div className="flex gap-1.5" aria-hidden>
                    {STEPS.map((_, i) => <span key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-ink" : i < step ? "w-4 bg-ink" : "w-4 bg-ink/15"}`} />)}
                  </div>
                  <button data-autofocus type="button" onClick={shut} aria-label="Close" className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white"><X className="h-4 w-4" /></button>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_44%] items-end gap-2 px-5 pb-3 sm:px-6">
                  <div className="min-w-0 pb-2">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink/50">{sent ? "Sent to the desk" : `Step ${step + 1} of 4`}</p>
                    <h2 className="type-display mt-1 font-heading text-[1.7rem] leading-[1.05]">{sent ? "All set." : STEPS[step]}</h2>
                    <p className="mt-2 truncate text-xs font-semibold text-ink/70">{s.model?.name ?? `Any ${cls.label.toLowerCase()}`} · {cls.seats}</p>
                    <p className="truncate text-xs text-ink/55">{placeShortName(s.from)} → {placeShortName(s.to)}{s.date ? ` · ${fmtDate(s.date)}` : ""}</p>
                  </div>
                  <span className="relative -mr-3 block aspect-[3/2]">
                    <Image key={image} src={image} alt="" fill sizes="220px" className="jx-car-in object-contain object-bottom" />
                  </span>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-4 sm:px-6">
                {step === 0 && (
                  <ul className="grid gap-2">
                    {tripTypes.map((tt) => (
                      <li key={tt.id}>
                        <button type="button" onClick={() => chooseType(tt.id)} className={`group flex w-full items-center gap-3 rounded-2xl p-4 text-left transition-colors ${s.type === tt.id ? "bg-ink text-paper" : "bg-white ring-1 ring-ink/10 hover:ring-ink/30"}`}>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold">{tt.label}</span>
                            <span className={`mt-0.5 block text-sm ${s.type === tt.id ? "text-paper/65" : "text-ink/55"}`}>{BLURB[tt.id]}</span>
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {step === 1 && (
                  <div className="grid gap-4">
                    <PlaceField label="Pick-up" value={s.from} options={places.map((p) => ({ id: p.id, label: p.label }))} onChange={(from) => set({ from })} placeholder="Hotel, house and road, or a landmark" />
                    <PlaceField label={s.type === "outstation" ? "Destination" : s.type === "day" || s.type === "monthly" ? "Mostly around" : "Drop-off"} value={s.to} options={destinations} onChange={(to) => set({ to })} placeholder={s.type === "outstation" ? "Town or resort" : "Area, address or landmark"} />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Date">
                        <input type="date" min={min || undefined} value={s.date} onChange={(e) => set({ date: e.target.value })} className="wz-input" />
                      </Field>
                      <Field label="Leave around">
                        <select value={s.hour} onChange={(e) => set({ hour: Number(e.target.value) })} className="wz-input">
                          {Array.from({ length: 24 }, (_, h) => <option key={h} value={h}>{fmtClock(h * 60)}</option>)}
                        </select>
                      </Field>
                    </div>
                    {t.count && <Stepper label={t.count.label} value={s.count} min={t.count.min} max={t.count.max} onChange={(count) => set({ count })} />}
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="mb-2 text-xs font-semibold text-ink/60">Type</p>
                    <div role="radiogroup" aria-label="Vehicle class" className="scrollbar-none -mx-5 flex gap-1.5 overflow-x-auto px-5 sm:-mx-6 sm:px-6">
                      {vehicleClasses.map((c) => {
                        const on = c.id === s.cls;
                        return (
                          <button key={c.id} type="button" role="radio" aria-checked={on} onClick={() => set({ cls: c.id, model: s.model && c.id === s.cls ? s.model : null })} className={`h-10 shrink-0 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors ${on ? "bg-ink text-paper" : "bg-paper-deep text-ink/65 hover:text-ink"}`}>
                            {c.label} <span className={`font-normal ${on ? "text-paper/60" : "text-ink/40"}`}>· {c.seats.replace("up to ", "≤")}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* The actual cars in that type, or leave it open. */}
                    <p className="mb-1 mt-5 flex items-baseline justify-between text-xs font-semibold text-ink/60">
                      <span>Car</span>
                      {fleet === null && <span className="font-normal text-ink/40">Loading the fleet…</span>}
                    </p>
                    <ul role="radiogroup" aria-label={`${cls.label} cars`} className="divide-y divide-ink/10">
                      <li>
                        <button type="button" role="radio" aria-checked={!s.model} onClick={() => set({ model: null })} className="flex w-full items-center gap-3 py-2.5 text-left">
                          <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-paper-deep text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-ink/50">Any</span>
                          <span className="min-w-0 flex-1">
                            <span className={`block text-sm ${!s.model ? "font-semibold" : ""}`}>Any {cls.label.toLowerCase()}</span>
                            <span className="block text-xs text-ink/50">The desk picks the best available</span>
                          </span>
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ${!s.model ? "bg-ink text-paper ring-ink" : "ring-ink/25"}`}>{!s.model && <Check className="h-3 w-3" />}</span>
                        </button>
                      </li>
                      {(fleet ?? []).filter((v) => v.classId === s.cls).map((v) => {
                        const on = s.model?.id === v.id;
                        return (
                          <li key={v.id}>
                            <button type="button" role="radio" aria-checked={on} onClick={() => set({ model: { id: v.id, slug: v.slug, name: v.name, image: v.image ?? undefined, classId: v.classId } })} className="flex w-full items-center gap-3 py-2.5 text-left">
                              <span className="relative block h-10 w-14 shrink-0">{v.image && <Image src={v.image} alt="" fill sizes="56px" className="object-contain" />}</span>
                              <span className="min-w-0 flex-1">
                                <span className={`block truncate text-sm ${on ? "font-semibold" : ""}`}>{v.name}</span>
                                <span className="block text-xs text-ink/50">{v.seats} seats{v.price ? ` · from ৳${v.price.toLocaleString("en-US")}/day` : ""}</span>
                              </span>
                              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ${on ? "bg-ink text-paper ring-ink" : "ring-ink/25"}`}>{on && <Check className="h-3 w-3" />}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-5">
                      <Stepper label="Passengers" value={s.pax} min={1} max={60} onChange={(pax) => set({ pax })} />
                    </div>
                  </div>
                )}

                {step === 3 && !sent && (
                  <div className="grid gap-4">
                    <Field label="Your name">
                      <input value={s.name} onChange={(e) => set({ name: e.target.value })} autoComplete="name" required className="wz-input" />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Phone or WhatsApp">
                        <input type="tel" value={s.phone} onChange={(e) => set({ phone: e.target.value })} autoComplete="tel" inputMode="tel" placeholder="+880…" required className="wz-input" />
                      </Field>
                      <Field label="Email">
                        <input type="email" value={s.email} onChange={(e) => set({ email: e.target.value })} autoComplete="email" required className="wz-input" />
                      </Field>
                    </div>
                    <Field label="Anything else (optional)">
                      <textarea value={s.note} onChange={(e) => set({ note: e.target.value })} rows={2} placeholder="Flight number, stops, luggage, child seat…" className="wz-input resize-none py-3" />
                    </Field>
                    <div className="rounded-2xl p-4" style={{ backgroundColor: `color-mix(in oklch, ${cls.tint} 58%, transparent)` }}>
                      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                        <dt className="text-ink/55">Trip</dt><dd className="font-semibold">{t.label}{t.count ? ` · ${s.count} ${s.count === 1 ? t.count.unit[0] : t.count.unit[1]}` : ""}</dd>
                        <dt className="text-ink/55">Route</dt><dd className="font-semibold">{placeName(s.from)} → {placeName(s.to)}</dd>
                        <dt className="text-ink/55">When</dt><dd className="font-semibold">{fmtDate(s.date)}, {fmtClock(s.hour * 60)}</dd>
                        <dt className="text-ink/55">Car</dt><dd className="font-semibold">{s.model?.name ?? cls.label} · {s.pax} {s.pax === 1 ? "passenger" : "passengers"}</dd>
                      </dl>
                    </div>
                    {err ? <p role="alert" className="text-sm font-medium text-[oklch(0.5_0.15_30)]">{err}</p> : <p className="text-xs text-ink/50">Nothing is charged. The desk replies with one fixed price, usually inside the hour.</p>}
                  </div>
                )}

                {sent && (
                  <div className="py-2 text-center" role="status">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.9_0.05_150)] text-forest"><Check className="h-6 w-6" /></span>
                    <p className="type-display mt-4 font-heading text-[1.8rem]">Request sent.</p>
                    <p className="mx-auto mt-2 max-w-xs text-sm text-ink/60">Thanks{s.name ? `, ${s.name.split(" ")[0]}` : ""}. The desk will reply with a fixed quote, usually inside the hour{s.email ? `, and a copy is on its way to ${s.email}` : ""}.</p>
                    <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={waClick} className="mt-5 inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-ink/15 hover:ring-ink">
                      <WhatsAppIcon className="h-4 w-4 text-[#128C4B]" /> Also WhatsApp {whatsappDisplay} <ArrowUpRight className="h-3.5 w-3.5 text-ink/40" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* The bar: folded it is the whole dock; open it is the footer. */}
        <div className={`flex items-center gap-2 p-2 transition-colors duration-500 ${open ? "border-t border-white/40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-2 sm:pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pt-2" : "pl-2"}`}>
          {open ? (
            step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} aria-label="Back" className="flex h-12 w-12 shrink-0 sm:h-11 sm:w-11 items-center justify-center rounded-full ring-1 ring-ink/15 hover:ring-ink"><ArrowLeft className="h-4 w-4" /></button>
            ) : (
              <a href={`tel:${phone.replace(/\s/g, "")}`} aria-label="Call the desk instead" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-ink/15 hover:ring-ink"><Phone className="h-4 w-4" /></a>
            )
          ) : (
            <span className="relative hidden h-10 w-14 shrink-0 overflow-hidden rounded-full bg-white sm:block">
              <Image src={image} alt="" fill sizes="56px" className="object-contain p-1" />
            </span>
          )}

          <button type="button" onClick={open ? undefined : () => openWizard(touched ? 1 : 0)} disabled={open} className={`min-w-0 flex-1 px-2 text-left disabled:cursor-default ${open ? "max-sm:hidden" : ""}`}>
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
              {open ? (sent ? "Sent to the desk" : `Step ${step + 1} of 4 · ${shortStep[step]}`) : touched ? "Your request" : "Need a car?"}
            </span>
            <span className="block truncate text-sm font-semibold">{touched || open ? summary(input) : "Plan the trip in four taps"}</span>
          </button>

          {open ? (
            sent ? (
              <button type="button" onClick={shut} className="ml-auto flex h-12 flex-1 items-center justify-center gap-2 rounded-full jx-btn-forest px-5 text-sm font-semibold text-paper sm:h-11 sm:flex-none">Done</button>
            ) : step === 0 ? null : step < 3 ? (
              <button type="button" onClick={() => canNext && setStep(step + 1)} disabled={!canNext} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full jx-btn-forest px-5 sm:h-11 sm:flex-none text-sm font-semibold text-paper disabled:opacity-40" title={canNext ? undefined : "Pick a date first"}>
                {canNext ? "Next" : !s.date ? "Pick a date" : "Add the place"} <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <>
                <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={waClick} aria-label={`Send on WhatsApp instead, ${whatsappDisplay}`} title="Send on WhatsApp instead" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#128C4B] ring-1 ring-ink/15 hover:ring-[#128C4B]"><WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" /></a>
                <button type="button" onClick={submit} disabled={!detailsOk || sending} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full jx-btn-gold px-5 sm:h-11 sm:flex-none text-sm font-semibold text-ink disabled:opacity-40">
                  {sending ? "Sending…" : "Send request"} {!sending && <ArrowRight className="h-4 w-4" />}
                </button>
              </>
            )
          ) : (
            <>
              <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={waClick} aria-label={`WhatsApp ${whatsappDisplay} (opens WhatsApp)`} title={`WhatsApp ${whatsappDisplay}`} className="flex h-11 shrink-0 items-center gap-2 rounded-full px-3 text-[#25D366] jx-btn-frost">
                <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" /><span className="hidden text-sm font-semibold tabular-nums text-ink lg:inline">{whatsappDisplay}</span>
              </a>
              <button type="button" onClick={() => openWizard(touched ? 1 : 0)} className="flex h-11 shrink-0 items-center gap-2 rounded-full jx-btn-gold jx-glow px-4 text-sm font-semibold text-ink sm:px-5">
                <CarFront className="h-4 w-4" /><span className="hidden sm:inline">Request a quote</span><span className="sm:hidden">Request</span>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

/**
 * A known area from the list, or "Somewhere else…" with free text. Free text
 * is stored as-is, so it flows into the summary, the brief and the booking.
 */
function PlaceField({ label, value, options, onChange, placeholder }: { label: string; value: string; options: Array<{ id: string; label: string }>; onChange: (v: string) => void; placeholder: string }) {
  const known = options.some((o) => o.id === value);
  const [custom, setCustom] = useState(!known);
  const other = custom || !known;
  return (
    <Field label={label}>
      <select
        value={other ? "__other" : value}
        onChange={(e) => {
          if (e.target.value === "__other") { setCustom(true); onChange(""); }
          else { setCustom(false); onChange(e.target.value); }
        }}
        className="wz-input"
      >
        {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        <option value="__other">Somewhere else…</option>
      </select>
      {other && (
        <input
          value={known ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="street-address"
          className="wz-input mt-2"
          autoFocus
        />
      )}
    </Field>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold text-ink/60">{label}</span>
      {children}
    </label>
  );
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-2 pl-4 ring-1 ring-ink/10">
      <span className="text-sm font-semibold">{label}</span>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-deep disabled:opacity-40"><Minus className="h-4 w-4" /></button>
        <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`} className="flex h-10 w-10 items-center justify-center rounded-full bg-paper-deep disabled:opacity-40"><Plus className="h-4 w-4" /></button>
      </div>
    </div>
  );
}


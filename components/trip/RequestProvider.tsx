"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { tripTypes, vehicleClasses, type ClassId, type TripTypeId } from "@/lib/trip/data";

/**
 * One trip request — the brief the concierge will quote on. Not a basket:
 * choosing a car replaces the current choice, choosing a service changes the
 * kind of trip. Everything on the page edits this single request.
 */
export type ChosenModel = { id: string; slug: string; name: string; image?: string; classId?: ClassId };

export type Request = {
  type: TripTypeId;
  from: string;
  to: string;
  cls: ClassId;
  model: ChosenModel | null;
  hour: number;
  date: string; // yyyy-mm-dd or ""
  count: number;
};

type Ctx = {
  req: Request;
  set: (patch: Partial<Request>) => void;
  setType: (t: TripTypeId) => void;
  chooseModel: (m: ChosenModel | null) => void;
  /** Scrolls back to the planner (optionally flashing it). */
  focusPlanner: () => void;
  flash: number;
};

const C = createContext<Ctx | null>(null);
const STORE_KEY = "jinia:request";

export function RequestProvider({ children }: { children: React.ReactNode }) {
  const [req, setReq] = useState<Request>({ type: "transfer", from: "dac", to: "gulshan", cls: "suv", model: null, hour: 9, date: "", count: 1 });
  const [flash, setFlash] = useState(0);

  // The request survives a trip to /vehicles and back: restore once on mount,
  // then mirror every change. Storage can be blocked, so both sides are guarded.
  const restored = useRef(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = sessionStorage.getItem(STORE_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as Partial<Request>;
          if (saved && typeof saved === "object" && saved.type) setReq((r) => ({ ...r, ...saved }));
        }
      } catch {}
      restored.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, []);
  // The site-wide wizard edits the same request; take its changes live.
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<Partial<Request>>).detail;
      if (d && typeof d === "object") setReq((r) => ({ ...r, ...d }));
    };
    window.addEventListener("jinia:request", on);
    return () => window.removeEventListener("jinia:request", on);
  }, []);
  // Let the site-wide dock show the page's request while it is folded.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("jinia:request-sync", { detail: req }));
  }, [req]);
  useEffect(() => {
    if (!restored.current) return;
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(req)); } catch {}
  }, [req]);

  const reqRef = useRef(req);
  useEffect(() => { reqRef.current = req; }, [req]);

  const set = useCallback((patch: Partial<Request>) => setReq((r) => ({ ...r, ...patch })), []);

  const setType = useCallback((t: TripTypeId) => {
    setReq((r) => {
      const tt = tripTypes.find((x) => x.id === t)!;
      const next: Request = { ...r, type: t, count: tt.count?.default ?? 1 };
      if (t === "outstation" && !["chattogram", "coxs-bazar", "sylhet", "sreemangal"].includes(r.to)) next.to = "coxs-bazar";
      if (t !== "outstation" && ["chattogram", "coxs-bazar", "sylhet", "sreemangal"].includes(r.to)) next.to = "gulshan";
      if (t === "delegation" && r.cls === "sedan") next.cls = "suv";
      return next;
    });
  }, []);

  const chooseModel = useCallback((m: ChosenModel | null) => {
    setReq((r) => ({ ...r, model: m, cls: m?.classId ?? r.cls }));
    setFlash((f) => f + 1);
  }, []);

  const focusPlanner = useCallback(() => {
    const plan = document.getElementById("plan");
    if (!plan) {
      // Off the home page: the planner lives at /#plan, and the saved request goes with us.
      try { sessionStorage.setItem(STORE_KEY, JSON.stringify(reqRef.current)); } catch {}
      window.location.assign("/#plan");
      return;
    }
    plan.scrollIntoView({ behavior: "smooth", block: "start" });
    setFlash((f) => f + 1);
  }, []);

  const value = useMemo(() => ({ req, set, setType, chooseModel, focusPlanner, flash }), [req, set, setType, chooseModel, focusPlanner, flash]);
  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useRequest() {
  const ctx = useContext(C);
  if (!ctx) throw new Error("useRequest must be used inside <RequestProvider>");
  return ctx;
}

export const classById = (id: ClassId) => vehicleClasses.find((c) => c.id === id)!;

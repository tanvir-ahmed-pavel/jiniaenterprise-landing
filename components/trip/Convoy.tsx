"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { vehicleClasses, type ClassId } from "@/lib/trip/data";
import { useRequest } from "./RequestProvider";

/**
 * The garage row in the closing section. The fleet rolls in nose to tail
 * when it scrolls into view; hover a car to lift it and see what it is, tap
 * it to put that type on your request and open the request flow.
 */
export function Convoy({ floors }: { floors: Record<ClassId, number | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hot, setHot] = useState<ClassId | null>(null);
  const { req, set, chooseModel } = useRequest();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const order: ClassId[] = ["coach", "microbus", "suv", "mpv", "sedan"];
  const cars = order.map((id) => vehicleClasses.find((c) => c.id === id)!);
  const width: Record<ClassId, string> = { coach: "w-[52%] sm:w-[25%]", microbus: "w-[42%] sm:w-[20%]", suv: "w-[40%] sm:w-[19%]", mpv: "w-[40%] sm:w-[19%]", sedan: "w-[38%] sm:w-[17%]" };

  const pick = (id: ClassId) => {
    chooseModel(null);
    set({ cls: id });
    window.dispatchEvent(new CustomEvent("jinia:open-wizard", { detail: { step: 1 } }));
  };

  return (
    <div ref={ref} className="relative mt-14" onMouseLeave={() => setHot(null)}>
      <div className="scrollbar-none -mx-4 flex items-end gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:gap-2 sm:overflow-visible sm:px-0">
        {cars.map((c, i) => {
          const on = hot === c.id;
          const dim = hot !== null && !on;
          const chosen = req.cls === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onMouseEnter={() => setHot(c.id)}
              onFocus={() => setHot(c.id)}
              onBlur={() => setHot(null)}
              onClick={() => pick(c.id)}
              aria-label={`Request ${c.label.toLowerCase()}, ${c.seats}${floors[c.id] ? `, from ${floors[c.id]} taka a day` : ""}`}
              className={`group relative shrink-0 text-left transition-[transform,opacity] duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${width[c.id]}`}
              style={{ transform: inView ? "translateX(0)" : "translateX(-120vw)", opacity: inView ? (dim ? 0.45 : 1) : 0, transitionDelay: inView && hot === null ? `${(cars.length - i) * 110}ms` : "0ms" }}
            >
              {/* label floats up on hover */}
              <span className={`pointer-events-none absolute inset-x-0 -top-2 z-10 flex justify-center transition-[opacity,transform] duration-300 ${on ? "-translate-y-full opacity-100" : "translate-y-0 opacity-0"}`}>
                <span className="whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper">
                  {c.label} · {c.seats}{floors[c.id] ? ` · from ৳${floors[c.id]!.toLocaleString("en-US")}` : ""}
                </span>
              </span>
              <span className={`relative block aspect-[3/2] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "-translate-y-3 scale-[1.06]" : ""}`}>
                <Image src={c.image} alt="" fill sizes="(max-width: 640px) 50vw, 25vw" className="object-contain object-bottom" />
              </span>
              <span className={`mt-1 block text-center text-xs font-semibold transition-colors sm:text-sm ${chosen ? "text-ink" : "text-ink/45"}`}>
                {c.label}{chosen ? " · on your request" : ""}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-2 h-px bg-ink/15" />
    </div>
  );
}

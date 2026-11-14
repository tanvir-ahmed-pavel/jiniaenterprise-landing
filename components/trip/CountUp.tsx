"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a stat up when it scrolls into view: "2,500+" runs from 0, a year
 * like "2014" from a decade or two earlier, "24/7" animates the 24. The final
 * value is server-rendered, so search engines and no-JS readers see it.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const isYear = target >= 1900 && target <= 2100 && !match?.[2].includes(",");
  const from = isYear ? target - 24 : 0;
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start0 = requestAnimationFrame(() => setShown(from));
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(2, -10 * p);
        setShown(Math.round(from + (target - from) * (p === 1 ? 1 : eased)));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); cancelAnimationFrame(start0); };
  }, [target, from, duration]);

  if (!match || shown === null) return <span ref={ref}>{value}</span>;
  const num = isYear ? String(shown) : shown.toLocaleString("en-US");
  return (
    <span ref={ref} className="tabular-nums" aria-label={value}>
      {match[1]}{num}{match[3]}
    </span>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Giant ticker whose speed follows the reader's scroll: idle drift, a push
 *  in the scroll direction while the page is moving. */
export function VelocityMarquee({ words, className = "" }: { words: string[]; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const unit = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  // Enough copies that one copy plus the viewport is always covered: no gaps
  // on wide screens, and the loop point is never visible.
  useEffect(() => {
    const fit = () => {
      const w = unit.current?.offsetWidth ?? 0;
      if (w) setCopies(Math.max(2, Math.ceil(window.innerWidth / w) + 1));
    };
    const id = requestAnimationFrame(fit);
    window.addEventListener("resize", fit);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", fit); };
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el || reduced()) return;
    let x = 0;
    let lastY = window.scrollY;
    let dir = -1; // -1: right to left (scrolling down), 1: left to right (scrolling up)
    let boost = 0;
    let raf = 0;
    let w = unit.current?.offsetWidth ?? 1;
    const tick = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy > 0.5) dir = -1;
      else if (dy < -0.5) dir = 1;
      boost += (Math.min(40, Math.abs(dy)) * 0.6 - boost) * 0.1;
      x += dir * (0.6 + boost);
      if (x <= -w) x += w;
      if (x > 0) x -= w;
      el.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    // Only animate while the ticker is on screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) {
        w = unit.current?.offsetWidth ?? 1;
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [copies]);

  const row = words.flatMap((w, i) => [
    <span key={`w${i}`}>{w}</span>,
    <span key={`s${i}`} aria-hidden className="mx-[0.4em] inline-block text-[0.42em] text-gold-deep">✦</span>,
  ]);
  return (
    <div className={`overflow-hidden ${className}`} aria-label={words.join(", ")} role="img">
      <div ref={track} className="flex w-max whitespace-nowrap will-change-transform" aria-hidden>
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} ref={i === 0 ? unit : undefined} className="flex shrink-0 items-center">{row}</div>
        ))}
      </div>
    </div>
  );
}

/** Horizontal rail pinned while the page scrolls past it (desktop). On
 *  touch / narrow screens it is a plain swipeable snap row. */
export function PinnedRail({ children, intro }: { children: React.ReactNode; intro: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = outer.current;
    const r = rail.current;
    if (!o || !r) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const still = reduced();
    let raf = 0;
    let running = false;
    // Spring state. Desktop: the rail chases the scroll position. Phones: the
    // native swipe drives it and we only read its velocity.
    let x = 0;
    let v = 0;
    let lastLeft = r.scrollLeft;
    let swipeV = 0;

    const size = () => {
      if (!mq.matches || still) {
        o.style.height = "";
        r.style.transform = "";
        return;
      }
      const dist = r.scrollWidth - window.innerWidth;
      o.style.height = `${window.innerHeight + Math.max(0, dist)}px`;
    };

    const cards = () => Array.from(r.children) as HTMLElement[];

    // Cards lean into the motion and trail each other slightly, then settle.
    const paint = (vel: number) => {
      const list = cards();
      const n = list.length || 1;
      const lean = Math.max(-9, Math.min(9, vel * 0.22));
      list.forEach((el, i) => {
        const lag = vel * 0.9 * (i / n);
        const lift = Math.min(10, Math.abs(vel) * 0.25);
        el.style.transform = Math.abs(vel) < 0.05 ? "" : `translate3d(${lag.toFixed(1)}px, ${(-lift).toFixed(1)}px, 0) skewX(${(-lean).toFixed(2)}deg) rotate(${(lean * 0.12).toFixed(2)}deg)`;
        const img = el.querySelector<HTMLElement>("img");
        if (img) img.style.transform = Math.abs(vel) < 0.05 ? "" : `translate3d(${(vel * 1.6).toFixed(1)}px,0,0)`;
      });
    };

    const tick = () => {
      if (mq.matches && !still) {
        const dist = r.scrollWidth - window.innerWidth;
        const top = o.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, -top / Math.max(1, dist)));
        const target = -p * dist;
        v += (target - x) * 0.07;
        v *= 0.74;
        x += v;
        r.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
        paint(-v);
      } else if (!still) {
        const left = r.scrollLeft;
        swipeV += ((left - lastLeft) - swipeV) * 0.35;
        lastLeft = left;
        swipeV *= 0.9;
        paint(-swipeV * 0.6);
      }
      raf = requestAnimationFrame(tick);
    };

    // Small screens: drag with a mouse too (touch already swipes natively).
    let dragX = 0;
    let dragLeft = 0;
    let dragging = false;
    const down = (e: PointerEvent) => {
      if (mq.matches || e.pointerType !== "mouse") return;
      dragging = true; dragX = e.clientX; dragLeft = r.scrollLeft;
      r.style.scrollSnapType = "none";
      r.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => { if (dragging) r.scrollLeft = dragLeft - (e.clientX - dragX); };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      r.style.cursor = "";
      r.style.scrollSnapType = "";
    };
    r.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    const start = () => { if (!running && !still) { running = true; raf = requestAnimationFrame(tick); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); paint(0); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(o);

    size();
    const ro = new ResizeObserver(size);
    ro.observe(r);
    window.addEventListener("resize", size);
    mq.addEventListener("change", size);
    return () => {
      stop();
      r.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", size);
      mq.removeEventListener("change", size);
    };
  }, []);
  return (
    <div ref={outer} className="relative">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        {intro}
        <div ref={rail} className="scrollbar-none mt-10 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 pt-3 will-change-transform lg:cursor-auto md:px-6 lg:mt-12 lg:w-max lg:snap-none lg:overflow-visible lg:px-10">
          {children}
        </div>
        <div className="container mt-6 hidden lg:block">
          <div className="h-px bg-ink/10"><div ref={bar} className="h-px origin-left scale-x-0 bg-ink" /></div>
        </div>
      </div>
    </div>
  );
}

/** Pulls toward the pointer a little, springs back on leave. */
export function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !window.matchMedia("(hover: hover)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const leave = () => { el.style.transform = ""; };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return <div ref={ref} className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">{children}</div>;
}

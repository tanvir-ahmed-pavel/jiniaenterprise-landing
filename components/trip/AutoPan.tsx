"use client";

import { useEffect, useRef } from "react";

/**
 * On phones, keeps a long line on one row and pans it slowly back and forth.
 * Any touch, scroll or focus inside hands control to the reader and the pan
 * resumes a few seconds later. On wider screens the content wraps normally.
 */
export function AutoPan({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const mq = window.matchMedia("(max-width: 639px)");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let dir = 1;
    let pos = 0;
    let holdUntil = performance.now() + 1500;
    let last = performance.now();
    let ours = false;
    let dragging = false;
    const hold = () => { holdUntil = performance.now() + 3500; pos = el.scrollLeft; };
    // A scroll we did not cause means the reader is dragging: follow them.
    const onScroll = () => { if (ours) { ours = false; return; } hold(); };
    // Mouse drag (touch and trackpads already scroll natively).
    let startX = 0;
    let startLeft = 0;
    const down = (e: PointerEvent) => {
      hold();
      if (e.pointerType !== "mouse") return;
      dragging = true; startX = e.clientX; startLeft = el.scrollLeft;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
      hold();
    };
    const up = () => { dragging = false; };
    const tick = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      const max = el.scrollWidth - el.clientWidth;
      if (mq.matches && max > 4 && t > holdUntil) {
        pos += dir * dt * 0.035;
        if (pos >= max) { pos = max; dir = -1; holdUntil = t + 1400; }
        if (pos <= 0) { pos = 0; dir = 1; holdUntil = t + 1400; }
        ours = true;
        el.scrollLeft = pos;
      }
      if (running) raf = requestAnimationFrame(tick);
    };
    // Only run the loop on phones and while the line is on screen.
    let running = false;
    const startLoop = () => { if (!running && mq.matches) { running = true; last = performance.now(); raf = requestAnimationFrame(tick); } };
    const stopLoop = () => { running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? startLoop() : stopLoop()));
    io.observe(el);
    const onMq = () => (mq.matches ? startLoop() : stopLoop());
    mq.addEventListener("change", onMq);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("wheel", hold, { passive: true });
    el.addEventListener("focusin", hold);
    return () => {
      stopLoop();
      io.disconnect();
      mq.removeEventListener("change", onMq);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("wheel", hold);
      el.removeEventListener("focusin", hold);
    };
  }, []);

  return (
    <div ref={box} className={`scrollbar-none -mx-4 cursor-grab overflow-x-auto px-4 active:cursor-grabbing sm:cursor-auto [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] sm:mx-0 sm:overflow-visible sm:px-0 sm:[mask-image:none] ${className}`}>
      {children}
    </div>
  );
}

"use client";

import { useLayoutEffect, useRef, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function restScrollTop(track: HTMLElement, index: number, count: number) {
  const span = track.offsetHeight - window.innerHeight;
  if (span <= 1 || count <= 1) {
    return window.scrollY + track.getBoundingClientRect().top;
  }
  const top = window.scrollY + track.getBoundingClientRect().top;
  return top + (index / (count - 1)) * span;
}

/**
 * Sticky-pin track → discrete card index.
 * Scroll only chooses a slot; on scroll-end the page snaps to that slot
 * so you never rest between cards.
 */
export function useScrollPinProgress(count: number) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const snapping = useRef(false);

  useLayoutEffect(() => {
    let raf = 0;

    const readIndex = () => {
      const track = trackRef.current;
      if (!track || count <= 1) return 0;
      const rect = track.getBoundingClientRect();
      const span = track.offsetHeight - window.innerHeight;
      if (span <= 1) return 0;
      const progress = clamp(-rect.top, 0, span) / span;
      return clamp(Math.round(progress * (count - 1)), 0, count - 1);
    };

    let idle = 0;

    const commit = () => {
      const idx = readIndex();
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActiveIndex(idx);
      }
      return idx;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        commit();
      });
      window.clearTimeout(idle);
      idle = window.setTimeout(snapToRest, 80);
    };

    const snapToRest = () => {
      if (snapping.current) return;
      const track = trackRef.current;
      if (!track || count <= 1) return;
      const rect = track.getBoundingClientRect();
      const span = track.offsetHeight - window.innerHeight;
      if (span <= 1) return;
      // Only snap while this section owns the viewport.
      if (rect.top > 80 || rect.bottom < window.innerHeight - 80) return;

      const idx = commit();
      const target = restScrollTop(track, idx, count);
      if (Math.abs(window.scrollY - target) < 8) return;

      snapping.current = true;
      window.scrollTo({ top: target, behavior: "smooth" });
      window.setTimeout(() => {
        snapping.current = false;
      }, 420);
    };

    commit();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("scrollend", snapToRest);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", snapToRest);
      if (raf) window.cancelAnimationFrame(raf);
      window.clearTimeout(idle);
    };
  }, [count]);

  return { trackRef, activeIndex };
}

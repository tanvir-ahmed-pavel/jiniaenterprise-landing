"use client";

import { useEffect } from "react";

/**
 * Scroll parallax without `animation-timeline: view()`.
 *
 * View-timeline animations are Chromium-only — Safari and Firefox do not
 * implement them, and wrapped in `@supports` they degrade to nothing at all
 * rather than to something reduced. Driving the same transform from a scroll
 * listener costs one rAF-throttled pass over a handful of elements and behaves
 * identically in every browser.
 *
 * Mark an element with `data-parallax="<pixels>"` to travel vertically, or
 * `data-parallax-x="<pixels>"` to travel horizontally as the section passes
 * through the viewport. Both are driven by the same scroll progress.
 */
export function ScrollParallax() {
  /**
   * Entrance reveals, driven by the same scroll pass as the parallax rather
   * than by IntersectionObserver — the observer proved unreliable here, and a
   * section stuck at zero opacity is a far worse failure than no animation.
   *
   * Content is only hidden once this effect has armed it, so if the script
   * never runs the cards are simply visible.
   */
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    for (const el of targets) el.classList.add("is-armed");

    let frame = 0;
    let pending = targets.slice();

    const check = () => {
      const trigger = window.innerHeight * 0.88;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top > trigger) return true;
        el.classList.add("is-revealed");
        return false;
      });
      if (pending.length === 0) window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax], [data-parallax-x]"));
    if (nodes.length === 0) return;

    const items = nodes.map((el) => ({
      el,
      y: Number(el.dataset.parallax) || 0,
      x: Number(el.dataset.parallaxX) || 0,
    }));
    let frame = 0;

    const apply = () => {
      const viewport = window.innerHeight;
      for (const { el, x, y } of items) {
        const box = el.getBoundingClientRect();
        if (box.bottom < -viewport || box.top > viewport * 2) continue;
        // 0 as the element enters from the bottom, 1 as it leaves at the top,
        // then eased so the travel starts and finishes gently instead of
        // sliding at a constant rate the whole way through.
        const progress = Math.max(0, Math.min(1, (viewport - box.top) / (viewport + box.height)));
        const smooth = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const eased = smooth - 0.5;
        const dx = (eased * x * -2).toFixed(2);
        const dy = (eased * y * -2).toFixed(2);
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      for (const { el } of items) el.style.transform = "";
    };
  }, []);

  return null;
}

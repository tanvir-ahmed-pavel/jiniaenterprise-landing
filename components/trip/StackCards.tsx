"use client";

import { Children, useEffect, useRef } from "react";

/**
 * Sticky card stack. Every card pins a little lower than the one before; as
 * the next card slides over it, the covered card shrinks and dims, so the
 * deck reads as a real pile. Cards share one height so no edge peeks out.
 */
export function StackCards({ children, top = 6, step = 1.25 }: { children: React.ReactNode; top?: number; step?: number }) {
  const list = useRef<HTMLOListElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(ol.querySelectorAll<HTMLElement>("[data-stack-card]"));
    let raf = 0;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const update = () => {
      raf = 0;
      const rects = cards.map((c) => c.parentElement!.getBoundingClientRect());
      cards.forEach((card, i) => {
        let depth = 0;
        for (let j = i + 1; j < cards.length; j++) {
          const pin = (top + j * step) * rem;
          const h = rects[i].height || 1;
          depth += Math.min(1, Math.max(0, 1 - (rects[j].top - pin) / h));
        }
        const scale = 1 - depth * 0.05;
        card.style.transform = depth > 0.001 ? `scale(${scale.toFixed(4)})` : "";
        card.style.filter = depth > 0.001 ? `brightness(${(1 - depth * 0.06).toFixed(3)})` : "";
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [top, step]);

  return (
    <ol ref={list} className="relative">
      {items.map((child, i) => (
        <li key={i} className="sticky mb-6 last:mb-0" style={{ top: `${top + i * step}rem`, zIndex: i + 1 }}>
          <div data-stack-card className="origin-top will-change-transform">{child}</div>
        </li>
      ))}
    </ol>
  );
}

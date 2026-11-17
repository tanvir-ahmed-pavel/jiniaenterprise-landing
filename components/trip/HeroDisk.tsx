"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";

/** One car (or class) on the turntable. */
export type RingItem = { key: string; label: string; image: string };

/** How far the turntable is tipped toward the viewer, in degrees. */
const TILT = 28;
/** Car width and box height, as a share of the turntable's width. */
const W = 44;
const H = 26;

/**
 * A tilted turntable. The cars stand on its rim and turn around it: the car
 * at the front is the one picked, and the rest pass behind the trip card,
 * which sits above the whole disk. Each car faces the viewer, so the side
 * photos stay readable as they travel. Only the transforms change per frame,
 * written straight to the DOM, and the loop stops once the disk settles.
 */
export function HeroDisk({ items, active, onPick, tint }: { items: RingItem[]; active: number; onPick: (i: number) => void; tint: string }) {
  const n = items.length;
  // Rim radius in cqw (percent of the container width). Grows with the car count
  // so the cars do not pile on top of each other.
  // Capped so the outer cars stay inside the screen width on phones.
  const R = Math.min(26, Math.max(20, (n * W * 0.6) / (2 * Math.PI)));
  const base = (i: number) => (i / Math.max(1, n)) * Math.PI * 2;

  const spin = useRef(-base(active));
  const target = useRef(-base(active));
  const frame = useRef(0);
  const cars = useRef<Array<HTMLButtonElement | null>>([]);

  const place = () => {
    for (let i = 0; i < n; i++) {
      const el = cars.current[i];
      if (!el) continue;
      const a = base(i) + spin.current;
      const x = R * Math.sin(a);
      const z = R * Math.cos(a);
      const front = (Math.cos(a) + 1) / 2; // 1 = nearest the viewer
      el.style.transform = `translate3d(${x.toFixed(2)}cqw,0,${z.toFixed(2)}cqw) rotateX(${-TILT}deg)`;
      el.style.opacity = String(0.3 + 0.7 * front);
    }
  };

  const step = () => {
    let d = target.current - spin.current;
    d = Math.atan2(Math.sin(d), Math.cos(d)); // the short way round
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || Math.abs(d) < 0.0008) {
      spin.current = target.current;
      place();
      frame.current = 0;
      return;
    }
    spin.current += d * 0.11;
    place();
    frame.current = requestAnimationFrame(step);
  };

  // First paint: place the cars before the browser draws, so there is no jump.
  useLayoutEffect(() => {
    spin.current = target.current;
    place();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, R]);

  // Turn to the picked car whenever the pick changes.
  useEffect(() => {
    target.current = -base(active);
    if (!frame.current) frame.current = requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, n]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // The first render's transforms are fixed here, so React never overwrites the
  // per-frame values written above.
  const startT = useRef<string[] | null>(null);
  if (startT.current === null) {
    startT.current = items.map((_, i) => {
      const a = base(i) - base(active);
      return `translate3d(${(R * Math.sin(a)).toFixed(2)}cqw,0,${(R * Math.cos(a)).toFixed(2)}cqw) rotateX(${-TILT}deg)`;
    });
  }

  return (
    <div className="absolute inset-0" style={{ perspective: "1200px", containerType: "inline-size" }}>
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: `rotateX(${TILT}deg)` }}>
        {/* The disk itself, lying flat in the turntable plane. */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: `${2 * R}cqw`,
            height: `${2 * R}cqw`,
            marginLeft: `${-R}cqw`,
            marginTop: `${-R}cqw`,
            transform: "rotateX(90deg)",
            background: `radial-gradient(closest-side, color-mix(in oklch, ${tint} 70%, white) 62%, color-mix(in oklch, ${tint} 35%, transparent) 88%, transparent 100%)`,
          }}
        />
        {items.map((it, i) => (
          <button
            key={it.key}
            ref={(el) => { cars.current[i] = el; }}
            type="button"
            role="radio"
            aria-checked={i === active}
            aria-label={it.label}
            tabIndex={-1}
            onClick={() => i !== active && onPick(i)}
            className="absolute cursor-pointer outline-none"
            style={{
              left: "50%",
              top: "50%",
              width: `${W}cqw`,
              height: `${H}cqw`,
              marginLeft: `${-W / 2}cqw`,
              marginTop: `${-H}cqw`,
              transformOrigin: "50% 100%",
              transform: startT.current![i],
              willChange: "transform",
            }}
          >
            <Image src={it.image} alt="" fill sizes="(max-width: 1024px) 70vw, 420px" className="object-contain object-bottom" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
}

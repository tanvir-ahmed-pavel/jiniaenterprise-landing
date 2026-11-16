"use client";

import { useEffect, useId, type RefObject } from "react";

type Options = {
  /** Width in px of the band, just inside the edge, where the backdrop bends. */
  bevel: number;
  /** Largest sideways shift in px, reached at the very edge. */
  maxShift: number;
  /** Blur in px applied to the backdrop (the frost in the middle). */
  blur: number;
  saturate?: number;
};

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Backdrop refraction only works with an SVG filter inside `backdrop-filter`,
 * which Chromium supports and Safari and Firefox do not. iOS Chrome is WebKit,
 * so it is excluded too (its user agent says CriOS, not Chrome).
 */
function supportsRefraction(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Chrome\//.test(ua) && !/Firefox|OPR\/|CriOS/.test(ua);
}

/**
 * Builds a displacement map for a rounded rectangle. Red and green encode how
 * far, and which way, to sample the backdrop from. Flat grey (128) means no
 * shift, so the middle is untouched. Inside the bevel band the shift points
 * inward and grows towards the edge, which stretches the backdrop along the
 * rim the way thick glass does.
 */
function buildDisplacementMap(w: number, h: number, radius: number, bevel: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const image = ctx.createImageData(w, h);
  const data = image.data;
  const halfW = w / 2;
  const halfH = h / 2;
  const r = Math.min(radius, halfW, halfH);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - halfW;
      const py = y + 0.5 - halfH;
      const qx = Math.abs(px) - (halfW - r);
      const qy = Math.abs(py) - (halfH - r);
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const outside = Math.hypot(ox, oy);
      // Signed distance to the edge: positive inside the shape.
      const inside = -(outside + Math.min(Math.max(qx, qy), 0) - r);

      // Outward normal of the rounded rectangle at this pixel.
      let nx = 0;
      let ny = 0;
      if (outside > 0) {
        nx = (ox / outside) * Math.sign(px);
        ny = (oy / outside) * Math.sign(py);
      } else if (qx > qy) {
        nx = Math.sign(px);
      } else {
        ny = Math.sign(py);
      }

      const t = inside >= bevel ? 0 : Math.max(0, 1 - Math.max(inside, 0) / bevel);
      const strength = t * t * (3 - 2 * t); // smoothstep: no visible seam where the band ends
      const i = (y * w + x) * 4;
      data[i] = 128 + 127 * -nx * strength;
      data[i + 1] = 128 + 127 * -ny * strength;
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL("image/png");
}

/**
 * Gives a `.jx-glass` element real edge refraction on Chromium. It sets the
 * `data-refract` attribute (React rewrites `className`, so a class would be
 * lost) and a `--jx-bf` custom property that the stylesheet uses
 * as the backdrop filter. Other browsers keep the plain frosted look.
 */
export function useGlassRefraction(ref: RefObject<HTMLElement | null>, options: Options) {
  const rawId = useId();
  const { bevel, maxShift, blur, saturate = 1.8 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || !supportsRefraction()) return;
    if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches) return;

    const baseId = `jx-refract-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.setAttribute("aria-hidden", "true");
    svg.style.position = "absolute";
    document.body.appendChild(svg);

    // Chromium does not re-read a filter after its attributes change, so every
    // rebuild adds a new filter under a new id and drops the older ones.
    let version = 0;
    let timer = 0;
    let builtW = 0;
    let builtH = 0;
    const rebuild = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      if (w < 8 || h < 8) return;
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 24;
      const href = buildDisplacementMap(w, h, radius, bevel);
      if (!href) return;
      builtW = w;
      builtH = h;

      const id = `${baseId}-${++version}`;
      const holder = document.createElementNS(SVG_NS, "svg");
      // A full-strength pixel shifts by scale / 2, so double the target shift.
      holder.innerHTML =
        `<filter id="${id}" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}">` +
        `<feImage href="${href}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="map"/>` +
        `<feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G" scale="${maxShift * 2}"/>` +
        `</filter>`;
      svg.appendChild(holder.firstElementChild!);

      el.style.setProperty("--jx-bf", `url(#${id}) blur(${blur}px) saturate(${saturate})`);
      el.setAttribute("data-refract", "");

      // Keep the current and previous filter; remove anything older.
      while (svg.children.length > 2) svg.removeChild(svg.firstElementChild!);
    };
    // While the panel is changing size (the open and close animations), the
    // map built for the old size would bend the wrong edges. So refraction is
    // switched off for the move and built again once the size has settled. The
    // blur stays on throughout, so the glass never drops out.
    const schedule = () => {
      if (Math.round(el.offsetWidth) === builtW && Math.round(el.offsetHeight) === builtH) return;
      el.removeAttribute("data-refract");
      window.clearTimeout(timer);
      timer = window.setTimeout(rebuild, 120);
    };

    rebuild();
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      el.removeAttribute("data-refract");
      el.style.removeProperty("--jx-bf");
      svg.remove();
    };
  }, [ref, rawId, bevel, maxShift, blur, saturate]);
}

"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ClientTestimonial } from "@/lib/config";

const TINTS = ["var(--color-tile-sand)", "var(--color-tile-sage)", "var(--color-tile-mist)", "var(--color-tile-stone)"];

const KIND: Record<string, string> = {
  Embassy: "Embassy",
  "International Organization": "International organisation",
  Government: "Government",
  Corporate: "Company",
};

type Client = { name: string; type: string };

/**
 * One client at a time on a soft tint, the full list beside it. With real,
 * approved quotes it shows the quote; until then it shows the client's name
 * set large — never an invented quote next to a real organisation.
 */
export function ClientVoices({ items: quotes = [], clients = [], sample = false }: { items?: ClientTestimonial[]; clients?: Client[]; sample?: boolean }) {
  const named = quotes.length === 0;
  const items: Array<{ head: string; sub: string; label: string; embassy?: boolean }> = named
    ? clients.map((c) => ({ head: c.name, sub: KIND[c.type] ?? "Company", label: c.name, embassy: c.type === "Embassy" }))
    : quotes.map((q) => ({ head: q.quote, sub: `${q.author} · ${q.role}`, label: q.role }));
  const list = useRef<HTMLOListElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  // Autoplay only while the section is on screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (paused || !seen || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % items.length), named ? 2200 : 2800);
    return () => window.clearInterval(id);
  }, [paused, seen, items.length, i, named]);
  useEffect(() => {
    const ol = list.current;
    const on = ol?.querySelector<HTMLElement>('[aria-current="true"]');
    if (ol && on) ol.scrollTo({ top: on.offsetTop - ol.clientHeight / 2 + on.clientHeight / 2, behavior: "smooth" });
  }, [i]);
  const t = items[i];
  if (!t) return null;
  const pauseBriefly = () => { setPaused(true); window.setTimeout(() => setPaused(false), 6000); };
  const go = (d: number) => { setI((n) => (n + d + items.length) % items.length); pauseBriefly(); };

  return (
    <div
      ref={box}
      className="relative overflow-hidden rounded-[2rem] p-6 text-ink transition-[background-color] duration-700 sm:p-10 lg:p-14"
      style={{ backgroundColor: TINTS[i % TINTS.length] }}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <figure key={i} className="jx-roll flex min-w-0 flex-col justify-center lg:col-span-8">
          {named ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">{t.sub}</p>
              <p className={`mt-4 font-heading text-[clamp(2.2rem,5.4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.045em] ${t.embassy ? "type-accent font-normal" : ""}`}>{t.head}</p>
              <figcaption className="mt-6 text-sm text-ink/55">Moving with Jinia Enterprise in Dhaka.</figcaption>
            </>
          ) : (
            <>
              <span aria-hidden className="type-accent block h-14 text-[7rem] leading-none text-gold-deep/70">“</span>
              <blockquote className="type-display font-heading text-[clamp(2rem,4.6vw,3.8rem)] leading-[1.08]">{t.head}</blockquote>
              <figcaption className="mt-8 flex items-center gap-3 text-sm">
                <span aria-hidden className="h-px w-10 bg-gold-deep" />
                <span className="text-ink/75">{t.sub}</span>
                {sample && <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink/60">Sample</span>}
              </figcaption>
            </>
          )}
        </figure>

        <div className="flex min-w-0 flex-col justify-between gap-8 lg:col-span-4">
          <ol ref={list} className="scrollbar-none grid max-h-[17rem] gap-1 overflow-y-auto">
            {items.map((x, n) => (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => { setI(n); pauseBriefly(); }}
                  aria-current={n === i}
                  className={`w-full truncate rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${n === i ? "bg-white font-semibold text-ink" : "text-ink/55 hover:text-ink"}`}
                >
                  {x.label}
                </button>
              </li>
            ))}
          </ol>
          <div className="h-[3px] overflow-hidden rounded-full bg-ink/10" aria-hidden>
            <span key={`${i}-${paused}-${seen}`} className={`block h-full origin-left bg-gold-deep ${!paused && seen ? (named ? "jx-timer-fast" : "jx-timer") : "scale-x-0"}`} />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 transition-colors hover:bg-white"><ArrowLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next" className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper transition-colors hover:bg-forest-soft"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { TripTypeId } from "@/lib/trip/data";
import { useRequest } from "./RequestProvider";

export type Service = { id: string; trip: TripTypeId; no: string; title: string; accent: string; body: string; points: string[]; image: string; href: string; bg: string; dark?: boolean };

export function ServiceCard({ s }: { s: Service }) {
  const { setType, focusPlanner } = useRequest();
  return (
    <article className={`group relative flex w-[86vw] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] p-7 sm:w-[30rem] sm:p-9 lg:h-[min(36rem,70vh)] lg:w-[34rem] ${s.dark ? "text-paper" : "text-ink"}`} style={{ background: s.bg }}>
      <div className="flex items-start justify-between">
        <span className={`font-heading text-sm font-semibold tabular-nums ${s.dark ? "text-gold" : "text-gold-deep"}`}>{s.no}</span>
        <Link href={s.href} aria-label={`More about ${s.title}`} className={`flex h-11 w-11 items-center justify-center rounded-full ring-1 transition-colors ${s.dark ? "ring-paper/25 hover:bg-paper hover:text-ink" : "ring-ink/15 hover:bg-ink hover:text-paper"}`}>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <h3 className="type-display mt-6 font-heading text-[2.6rem] sm:text-[3.2rem]">
        {s.title} <span className={`type-accent ${s.dark ? "text-gold" : "text-gold-deep"}`}>{s.accent}</span>
      </h3>
      <p className={`mt-4 max-w-sm text-[0.95rem] leading-relaxed ${s.dark ? "text-paper/70" : "text-ink/65"}`}>{s.body}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {s.points.map((p) => <li key={p} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${s.dark ? "bg-paper/10" : "bg-paper/70"}`}>{p}</li>)}
      </ul>
      <div className="relative mt-6 min-h-40 flex-1">
        <Image src={s.image} alt="" fill sizes="(max-width: 640px) 86vw, 34rem" className={`object-contain object-bottom transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.03]`} />
      </div>
      <button
        type="button"
        onClick={() => { setType(s.trip); focusPlanner(); }}
        className={`group/btn mt-5 inline-flex h-12 items-center justify-center gap-2 self-start rounded-full px-5 text-sm font-semibold transition-colors ${s.dark ? "bg-gold text-ink hover:bg-paper" : "bg-ink text-paper hover:bg-forest-soft"}`}
      >
        Plan this trip <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
      </button>
    </article>
  );
}

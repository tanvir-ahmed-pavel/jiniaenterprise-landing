"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Scene = {
  id: string;
  caption: string;
  note: string;
  image: string;
  alt: string;
  /** Per-photo nudge so every subject lands on the same optical baseline. */
  fit: string;
};

/**
 * Transparent cutouts, not framed photographs: the vehicle is an object on the
 * page, so the headline can pass behind it and the whole scene can move in
 * depth. Any replacement must keep a real alpha channel — a white-plate JPEG
 * re-introduces the box this layout exists to remove.
 */
const scenes: Scene[] = [
  {
    id: "alphard",
    caption: "Toyota Alphard",
    note: "Executive MPV",
    image: "/images/vehicles/front/toyota-alphard-cream-grounded-v4.png",
    alt: "Cream-white Toyota Alphard in a soft front three-quarter view",
    fit: "w-[112%] sm:w-[106%] lg:w-[98%] translate-y-[2%]",
  },
  {
    id: "prado",
    caption: "Toyota Land Cruiser Prado",
    note: "Flagship SUV",
    image: "/images/vehicles/front/toyota-land-cruiser-prado-grounded-v4.png",
    alt: "Matte graphite Toyota Land Cruiser Prado in a soft front three-quarter view",
    fit: "w-[112%] sm:w-[106%] lg:w-[98%] translate-y-[2%]",
  },
  {
    id: "h1",
    caption: "Hyundai H-1 2020",
    note: "Executive people carrier",
    image: "/images/vehicles/front/hyundai-h1-2020-grounded-v4.png",
    alt: "Creamy champagne Hyundai H-1 2020 in a soft front three-quarter view",
    fit: "w-[112%] sm:w-[106%] lg:w-[98%] translate-y-[2%]",
  },
  {
    id: "mercedes-s-class",
    caption: "Mercedes S-Class",
    note: "Executive sedan",
    image: "/images/vehicles/front/mercedes-s-class-grounded-v4.png",
    alt: "Matte charcoal Mercedes S-Class in a soft front three-quarter view",
    fit: "w-[112%] sm:w-[106%] lg:w-[98%] translate-y-[2%]",
  },
];

const AUTOPLAY_MS = 6500;
/** Pointer easing per frame. Lower is heavier; this settles in ~0.6s. */
const EASE = 0.045;

/** Two fixed lines, so the break never moves with the viewport. Both the
 *  solid copy and the outline copy render from this, or they would drift
 *  apart the moment the wording changed. */
const HEADLINE_LINES = ["A better way", "to get there."];

/** Both copies of the headline render from here, so the solid text and its
 *  outline twin can never disagree about size, break or wording. */
function HeadlineLines() {
  return (
    <>
      <span className="block">{HEADLINE_LINES[0]}</span>
      <span className="mt-1 block text-[0.62em] tracking-[-0.03em] opacity-70">{HEADLINE_LINES[1]}</span>
    </>
  );
}
const SIDE_LEFT = { label: "Since 2014", body: "Chauffeur-driven across Bangladesh, at the hour you asked for." };
const SIDE_RIGHT = { label: "What we run", body: "Airport, corporate, monthly and delegation movement." };

export function HeroCarousel({ whatsapp }: { whatsapp: string }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const scene = scenes[active];

  const go = useCallback((step: number) => {
    setActive((current) => (current + step + scenes.length) % scenes.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, go, isPaused]);

  /**
   * Pointer and scroll drive two normalised values that every layer reads,
   * each multiplying them by its own depth. The pointer value is eased toward
   * its target in a frame loop rather than written straight through — tracking
   * the cursor exactly feels twitchy, and the weight is what reads as mass.
   */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const state = { tx: 0, ty: 0, x: 0, y: 0 };
    let running = false;

    const tick = () => {
      const dx = state.tx - state.x;
      const dy = state.ty - state.y;
      state.x += dx * EASE;
      state.y += dy * EASE;
      stage.style.setProperty("--px", state.x.toFixed(4));
      stage.style.setProperty("--py", state.y.toFixed(4));
      if (Math.abs(dx) < 0.0004 && Math.abs(dy) < 0.0004) {
        running = false;
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame.current = requestAnimationFrame(tick);
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = stage.getBoundingClientRect();
      state.tx = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width - 0.5) * 2));
      state.ty = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height - 0.5) * 2));
      start();
    };

    const onLeave = () => {
      state.tx = 0;
      state.ty = 0;
      start();
    };

    // Scroll drift stays direct: it should track the page exactly, or the
    // section appears to lag behind the user's own scrolling.
    let scrollFrame = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const box = stage.getBoundingClientRect();
        stage.style.setProperty("--sy", (-box.top / Math.max(box.height, 1)).toFixed(4));
      });
    };

    stage.addEventListener("pointermove", onPointer);
    stage.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(frame.current);
      cancelAnimationFrame(scrollFrame);
      stage.removeEventListener("pointermove", onPointer);
      stage.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className="jinia-depth-stage relative isolate -mt-16 flex min-h-svh flex-col overflow-hidden bg-[radial-gradient(120%_75%_at_50%_-5%,rgba(198,157,75,.09),transparent_58%),linear-gradient(180deg,#e6efe8_0%,#f7fbf8_38%,#eaf2ec_100%)] pt-24 text-emerald-950 sm:pt-26 lg:pt-28"
      aria-roledescription="carousel"
      aria-label="Jinia service stories"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Depth 1 — atmosphere, furthest back and slowest. */}
      <div aria-hidden className="jinia-depth jinia-depth--far pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[38%] h-[46vw] w-[46vw] max-h-[620px] max-w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,157,75,.13),transparent_62%)]" />
        <div className="absolute left-1/2 top-[46%] h-[34vw] w-[34vw] max-h-[460px] max-w-[460px] -translate-x-1/2 rounded-full border border-amber-400/20" />
      </div>

      {/* Depth 2 — the type. It sits behind the vehicle on purpose. */}
      <div className="jinia-depth jinia-depth--mid container relative z-0 shrink-0 text-center">
        <p className="jinia-hero-eyebrow flex items-center justify-center gap-3 type-label text-emerald-700">
          <span aria-hidden className="h-px w-6 bg-amber-400" />
          Jinia Enterprise, Bangladesh
        </p>

        <h1 className="jinia-hero-title type-display mx-auto mt-6 font-heading text-[3.15rem] sm:text-[4.75rem] lg:text-[6.5rem]">
          <HeadlineLines />
        </h1>
      </div>

      {/* Depth 2b — supporting lines set either side of the vehicle, so the type
          wraps around the subject instead of only stacking above it. In flow
          under the headline rather than absolutely placed, so a bigger
          headline can never land on top of them. */}
      <div className="jinia-depth jinia-depth--mid pointer-events-none relative z-0 mt-7 hidden shrink-0 lg:block">
        <div className="container flex items-start justify-between gap-8">
          <div className="max-w-[13ch]">
            <p className="type-label text-emerald-700">{SIDE_LEFT.label}</p>
            <p className="type-body mt-2 text-sm text-emerald-950/50">{SIDE_LEFT.body}</p>
          </div>
          <div className="max-w-[13ch] text-right">
            <p className="type-label text-emerald-700">{SIDE_RIGHT.label}</p>
            <p className="type-body mt-2 text-sm text-emerald-950/50">{SIDE_RIGHT.body}</p>
          </div>
        </div>
      </div>

      {/* Depth 3 — the subject. Largest travel, and the only layer above the
          headline, so it genuinely occludes the words as it moves. */}
      <div className="pointer-events-none relative z-10 -mt-[5vw] flex min-h-0 flex-1 justify-center sm:-mt-[6vw] lg:-mt-[7.5vw]">
        <div className="relative flex w-full max-w-[1000px] items-end justify-center">
          {scenes.map((item, index) => {
            const isActive = index === active;
            const total = scenes.length;
            const raw = (((index - active) % total) + total) % total;
            const seat = raw > total / 2 ? raw - total : raw;
            return (
              <div
                key={item.id}
                aria-hidden={!isActive}
                className="jinia-depth jinia-depth--near absolute inset-0 flex items-end justify-center"
              >
                {/* The slide lives on its own wrapper: the layer above owns the
                    parallax transform and the one below owns the per-photo fit,
                    and a third transform on either would overwrite it. */}
                <div
                  className="jinia-hero-slide flex h-full w-full items-end justify-center"
                  style={{ "--seat": seat, opacity: Math.abs(seat) > 1 ? 0 : 1 } as React.CSSProperties}
                >
                  <div className={`relative flex h-full items-end justify-center ${item.fit}`}>
                    <Image
                      src={item.image}
                      alt={isActive ? item.alt : ""}
                      aria-hidden={!isActive}
                      width={1400}
                      height={640}
                      priority={index === 0}
                      sizes="(max-width: 1024px) 112vw, 1000px"
                      className={`relative h-auto max-h-full w-full object-contain transition-opacity duration-[700ms] ${isActive ? "opacity-100" : "opacity-0"
                        }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Depth 3b — outline copies of the type, painted ABOVE the vehicle.
          The solid text stays behind, so wherever the car covers a word the
          stroke still traces it and the line stays readable. The layout is
          mirrored exactly — same padding, same container, same classes — so the
          two copies register on top of each other. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 flex flex-col pt-24 sm:pt-26 lg:pt-28"
      >
        <div className="jinia-depth jinia-depth--mid container shrink-0 text-center">
          <p className="jinia-hero-eyebrow invisible flex items-center justify-center gap-3 type-label">
            <span className="h-px w-6" />
            Jinia Enterprise, Bangladesh
          </p>
          <h1 className="jinia-hero-title jinia-outline-strong type-display mx-auto mt-6 font-heading text-[3.15rem] sm:text-[4.75rem] lg:text-[6.5rem]">
            <HeadlineLines />
          </h1>
        </div>

        <div className="jinia-depth jinia-depth--mid relative mt-7 hidden shrink-0 lg:block">
          <div className="container flex items-start justify-between gap-8">
            <div className="max-w-[13ch]">
              <p className="jinia-outline-soft type-label">{SIDE_LEFT.label}</p>
              <p className="jinia-outline-soft type-body mt-2 text-sm">{SIDE_LEFT.body}</p>
            </div>
            <div className="max-w-[13ch] text-right">
              <p className="jinia-outline-soft type-label">{SIDE_RIGHT.label}</p>
              <p className="jinia-outline-soft type-body mt-2 text-sm">{SIDE_RIGHT.body}</p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none relative -mt-[5vw] min-h-0 flex-1 sm:-mt-[6vw] lg:-mt-[7.5vw]" />

        <div className="jinia-depth jinia-depth--front container relative flex shrink-0 flex-col items-center gap-4 pb-10 pt-4 text-center sm:pb-12">
          <span className="jinia-outline-pill inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-7 text-sm font-medium">
            <span className="jinia-outline-soft">Start booking</span>
            <ArrowRight className="jinia-outline-icon h-4 w-4" />
          </span>
          <p className="jinia-outline-soft type-body text-sm">No deposit — message the concierge.</p>
          <div className="mt-1 flex items-center gap-4 invisible">
            <p className="text-right">
              <span className="type-heading block font-heading text-sm">{scene.caption}</span>
              <span className="type-label mt-0.5 block">{scene.note}</span>
            </p>
            <div className="flex items-center gap-2">
              {scenes.map((item) => (
                <span key={item.id} className="h-1 w-1.5 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Big, reachable scene controls sitting outside the vehicle on both
          sides — the arrows are the primary way through the carousel, the dots
          only a position readout. */}
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous vehicle"
        className="group absolute left-3 top-1/2 z-40 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/12 bg-white/70 text-emerald-950 backdrop-blur-sm transition-[background-color,border-color,transform] duration-300 hover:-translate-x-0.5 hover:border-amber-400 hover:bg-white sm:left-6 sm:h-16 sm:w-16"
      >
        <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next vehicle"
        className="group absolute right-3 top-1/2 z-40 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/12 bg-white/70 text-emerald-950 backdrop-blur-sm transition-[background-color,border-color,transform] duration-300 hover:translate-x-0.5 hover:border-amber-400 hover:bg-white sm:right-6 sm:h-16 sm:w-16"
      >
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>

      {/* Depth 4 — the ask, centred under the vehicle to match the headline. */}
      <div className="jinia-depth jinia-depth--front container relative z-0 flex shrink-0 flex-col items-center gap-4 pb-10 pt-4 text-center sm:pb-12">
        <Link
          href="/booking"
          className="jinia-hero-actions inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-emerald-950 px-7 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-800"
        >
          Start booking <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="type-body text-sm text-emerald-950/55">
          No deposit —{" "}
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-800 underline underline-offset-4 transition-colors hover:text-emerald-950"
          >
            message the concierge
          </a>
          .
        </p>

        <div className="mt-1 flex items-center gap-4">
          <p key={scene.id} className="jinia-hero-meta text-right">
            <span className="type-heading block font-heading text-sm text-emerald-950">{scene.caption}</span>
            <span className="type-label mt-0.5 block text-emerald-950/45">{scene.note}</span>
          </p>
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose a vehicle">
            {scenes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={item.caption}
                onClick={() => {
                  setActive(index);
                }}
                className={`h-1 rounded-full transition-all duration-500 ${index === active ? "w-7 bg-amber-400" : "w-1.5 bg-emerald-950/20 hover:bg-emerald-950/45"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

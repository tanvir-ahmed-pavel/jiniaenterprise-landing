"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type ClientEntry = { name: string; type: string; logo?: string | null };
export type Testimonial = { quote: string; author: string; role: string };

/** What Jinia actually does for each kind of client, stated once. */
const NOTE_BY_TYPE: Record<string, string> = {
  Embassy: "Diplomatic movement, kept to protocol time.",
  "International Organization": "Field teams and delegations, coordinated.",
  Government: "Official movement with a single point of contact.",
  Corporate: "Executive and staff transport, on the day's schedule.",
};

/**
 * The camera sits on the cylinder's axis and looks outward at its inner wall,
 * so tiles wrap around the viewer rather than curving away from them. That is
 * the whole difference between this and a flat carousel: a tile at 0° is deep
 * ahead, a tile at 70° is beside you and nearly edge-on.
 */
const RADIUS = 760;
/** A full turn: the wall keeps coming round rather than stopping at an end. */
const ARC = 360;
/** Four evenly-spaced bands. The copy sits above the wall as its own readable
 *  plane, so the lattice can remain continuous through the cylinder centre. */
const RINGS = 4;
const RING_Y = [-285, -95, 95, 285];
/** Columns around the full turn. The wall is a lattice — every column carries
 *  one tile per band at the same bearing, so the grid reads as rows and
 *  columns curving around the viewer rather than as scattered points. Twelve
 *  puts them 30 degrees apart: dense enough to fill the sight line, wide
 *  enough that a 216px tile never touches its neighbour. */
const COLUMNS = 12;
/** A testimonial every third column, on the bottom band only. Four quotes,
 *  ninety degrees apart — one always in view, never two at once. */
const QUOTE_EVERY = 3;
const EASE = 0.075;
const FRICTION = 0.93;
const DRAG_PER_PX = 0.16;
/** Degrees per frame while idle — about one slow revolution a minute. */
const AUTO_SPIN = 0.028;
/** Beyond this the tile is past the viewer's shoulder and is faded out. */
const VISIBLE_COS = 0.16;

function noteFor(type: string) {
  return NOTE_BY_TYPE[type] ?? NOTE_BY_TYPE.Corporate;
}

/** Initials as a stand-in mark. Every client gets something to look at, and a
 *  real logo simply replaces it when one is supplied — no fabricated brand
 *  marks in the meantime. */
function monogramFor(name: string) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 0) return "—";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function ClientConstellation({
  clients,
  testimonials = [],
}: {
  clients: ClientEntry[];
  testimonials?: Testimonial[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const rigRef = useRef<HTMLUListElement>(null);
  const tileRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  /** Read inside the frame loop, which must not be torn down on every hover. */
  const engaged = useRef(false);

  /** Lay the wall out as a grid and fill it, rather than building a list and
   *  scattering it. Every one of COLUMNS x RINGS slots is filled, every tile
   *  sits at an exact bearing and an exact band, and every tile sits on the
   *  same cylinder surface — that last part is what makes it read as one
   *  curved wall instead of a cloud of cards at random depths. */
  const tiles = useMemo(() => {
    if (clients.length === 0) return [];

    // Step through the client list rather than reading it in order: a stride
    // coprime with the list length puts a repeat half the wall away from its
    // twin instead of a few seats along. Once the real list outgrows the wall
    // it never repeats at all.
    const stride = clients.length % 7 === 0 ? 5 : 7;
    const step = ARC / COLUMNS;
    const built = [];
    let clientCursor = 0;
    let quoteCursor = 0;

    for (let column = 0; column < COLUMNS; column += 1) {
      for (let ring = 0; ring < RINGS; ring += 1) {
        const position = {
          angle: Number((column * step).toFixed(3)),
          y: RING_Y[ring],
          depth: RADIUS,
        };

        const isQuoteSlot =
          testimonials.length > 0 && ring === RINGS - 1 && column % QUOTE_EVERY === 0;

        if (isQuoteSlot) {
          built.push({
            kind: "quote" as const,
            ...testimonials[quoteCursor % testimonials.length],
            ...position,
          });
          quoteCursor += 1;
          continue;
        }

        const client = clients[(clientCursor * stride) % clients.length];
        clientCursor += 1;
        built.push(
          client.logo
            ? { kind: "logo" as const, name: client.name, type: client.type, logo: client.logo, ...position }
            : { kind: "name" as const, name: client.name, type: client.type, ...position },
        );
      }
    }

    return built;
  }, [clients, testimonials]);

  useEffect(() => {
    const section = sectionRef.current;
    const rig = rigRef.current;
    if (!section || !rig) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spin = { target: 0, current: 0, velocity: 0 };
    const tilt = { tx: 0, ty: 0, x: 0, y: 0 };
    const drag = { active: false, lastX: 0, moved: false };
    let frame = 0;
    let running = false;

    const paint = () => {
      const lookY = spin.current + tilt.x * -7;
      const lookX = tilt.y * 5;
      rig.style.transform = `rotateX(${lookX.toFixed(3)}deg) rotateY(${lookY.toFixed(3)}deg)`;
      section.style.setProperty("--rx", tilt.x.toFixed(4));
      section.style.setProperty("--ry", tilt.y.toFixed(4));

      // A tile is only reachable while it is actually in front of the camera.
      tileRefs.current.forEach((el, index) => {
        if (!el) return;
        const facing = Math.cos((((tiles[index].angle + lookY) % 360) * Math.PI) / 180);
        const visible = Math.max(0, Math.min(1, (facing - VISIBLE_COS) / 0.3));
        el.style.opacity = visible.toFixed(3);
        el.style.pointerEvents = visible > 0.6 ? "auto" : "none";
      });
    };

    const tick = () => {
      if (!drag.active) {
        spin.target += spin.velocity;
        spin.velocity *= FRICTION;
        // Idle drift, so the wall shows itself off before anyone touches it.
        // Any engagement — hover or drag — hands control back to the visitor.
        if (!engaged.current && !reduced) spin.target += AUTO_SPIN;
      }
      const ds = spin.target - spin.current;
      const dx = tilt.tx - tilt.x;
      const dy = tilt.ty - tilt.y;
      spin.current += ds * EASE;
      tilt.x += dx * 0.045;
      tilt.y += dy * 0.045;
      paint();

      const settled =
        Math.abs(ds) < 0.002 &&
        Math.abs(spin.velocity) < 0.002 &&
        Math.abs(dx) < 0.0004 &&
        Math.abs(dy) < 0.0004 &&
        (engaged.current || reduced);
      if (settled && !drag.active) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (drag.active) {
        const delta = event.clientX - drag.lastX;
        drag.lastX = event.clientX;
        if (Math.abs(delta) > 1) drag.moved = true;
        spin.target -= delta * DRAG_PER_PX;
        spin.velocity = -delta * DRAG_PER_PX;
      }
      if (event.pointerType !== "mouse" || reduced) {
        if (drag.active) start();
        return;
      }
      const box = section.getBoundingClientRect();
      tilt.tx = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width - 0.5) * 2));
      tilt.ty = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height - 0.5) * 2));
      start();
    };

    const onPointerDown = (event: PointerEvent) => {
      drag.active = true;
      drag.moved = false;
      drag.lastX = event.clientX;
      spin.velocity = 0;
      setIsDragging(true);
      section.setPointerCapture(event.pointerId);
      start();
    };

    const endDrag = (event: PointerEvent) => {
      if (!drag.active) return;
      drag.active = false;
      setIsDragging(false);
      if (section.hasPointerCapture(event.pointerId)) section.releasePointerCapture(event.pointerId);
      start();
    };

    const onPointerLeave = () => {
      tilt.tx = 0;
      tilt.ty = 0;
      engaged.current = false;
      start();
    };

    const onPointerEnter = () => {
      engaged.current = true;
      start();
    };

    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerdown", onPointerDown);
    section.addEventListener("pointerup", endDrag);
    section.addEventListener("pointercancel", endDrag);
    section.addEventListener("pointerleave", onPointerLeave);
    section.addEventListener("pointerenter", onPointerEnter);
    start();

    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerdown", onPointerDown);
      section.removeEventListener("pointerup", endDrag);
      section.removeEventListener("pointercancel", endDrag);
      section.removeEventListener("pointerleave", onPointerLeave);
      section.removeEventListener("pointerenter", onPointerEnter);
    };
  }, [tiles]);

  const active = hovered === null ? null : tiles[hovered];

  return (
    <section
      ref={sectionRef}
      className={`jinia-wall relative isolate grid min-h-[42rem] cursor-grab place-items-center overflow-hidden bg-[#f1f3f0] py-20 text-emerald-950 select-none active:cursor-grabbing sm:py-24 lg:min-h-[46rem] ${
        isDragging ? "is-dragging cursor-grabbing" : ""
      }`}
      aria-labelledby="clients-heading"
    >
      {/* Header above the wall and centred, with the counter under it. The wall
          keeps to its own band below — names drifting behind the copy made the
          section harder to read, not richer. */}
      <div className="jinia-wall-copy pointer-events-none relative z-10 col-start-1 row-start-1 w-full">
        {/* A clearing behind the copy: the wall keeps turning through this
            space, so the words need their own ground to stand on. Kept outside
            the leaning plane — inside a preserve-3d container it sorted above
            the text it was meant to sit behind. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[24rem] w-[48rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,#f1f3f0_48%,rgba(241,243,240,.74)_74%,transparent)]"
        />
        <div className="container jinia-wall-lean text-center">
        <p className="flex items-center justify-center gap-3 type-label text-emerald-700">
          <span aria-hidden className="h-px w-6 shrink-0 bg-amber-400" />
          Trusted across Bangladesh
        </p>
        <h2 id="clients-heading" className="type-display mx-auto mt-5 max-w-[15ch] font-heading text-[2.25rem] sm:text-[3.25rem]">
          Built for people who cannot be late.
        </h2>
        <p className="type-body mx-auto mt-6 max-w-[42ch] text-sm text-emerald-950/55">
          <span className="font-medium text-emerald-950">2,500+ journeys</span> delivered for embassies,
          corporates and institutions since 2014.
        </p>
        </div>
      </div>

      <div className="jinia-wall-stage col-start-1 row-start-1 hidden h-full w-full self-stretch md:block">
        <div className="jinia-wall-viewport pointer-events-none absolute inset-0">
          <ul ref={rigRef} className="jinia-wall-rig">
            {tiles.map((tile, index) => {
              // Match the first animation-frame visibility in server-rendered
              // markup. Without this, every tile paints at opacity 1 until
              // hydration, briefly revealing the complete off-canvas wall.
              const initialFacing = Math.cos((tile.angle * Math.PI) / 180);
              const initialOpacity = Math.max(0, Math.min(1, (initialFacing - VISIBLE_COS) / 0.3));

              return (
              <li
                key={index}
                ref={(el) => {
                  tileRefs.current[index] = el;
                }}
                className="jinia-wall-tile"
                style={{
                  "--angle": `${tile.angle}deg`,
                  "--y": `${tile.y}px`,
                  "--depth": `${tile.depth}px`,
                  opacity: initialOpacity,
                  pointerEvents: initialOpacity > 0.6 ? "auto" : "none",
                } as React.CSSProperties}
                onPointerEnter={() => setHovered(index)}
                onPointerLeave={() => setHovered((current) => (current === index ? null : current))}
              >
                <button
                  type="button"
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered((current) => (current === index ? null : current))}
                  aria-label={
                    tile.kind === "quote"
                      ? `${tile.quote} — ${tile.author}, ${tile.role}`
                      : `${tile.name}. ${noteFor(tile.type)}`
                  }
                  className={`jinia-node jinia-node--${tile.kind} ${hovered === index ? "is-active" : ""}`}
                >
                  {tile.kind === "quote" ? (
                    <>
                      {/* A testimonial has to be unmistakably a testimonial at a
                          glance: quote mark, italic setting, rule, and an
                          attribution that is always visible. */}
                      <span aria-hidden className="jinia-node-mark">&ldquo;</span>
                      <span className="jinia-node-quote">{tile.quote}</span>
                      <span className="jinia-node-attrib type-label">
                        {tile.author}
                        <span className="jinia-node-role">{tile.role}</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden className="jinia-node-badge">
                        {tile.kind === "logo" ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={tile.logo} alt="" className="jinia-node-logo" />
                        ) : (
                          monogramFor(tile.name)
                        )}
                      </span>
                      <span className="jinia-node-name font-heading">{tile.name}</span>
                      <span className="jinia-node-type type-label">{tile.type}</span>
                    </>
                  )}
                </button>
              </li>
              );
            })}
          </ul>

          <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#f1f3f0] to-transparent" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#f1f3f0] to-transparent" />
          <div aria-hidden className="absolute inset-y-0 left-0 w-28 bg-linear-to-r from-[#f1f3f0] to-transparent" />
          <div aria-hidden className="absolute inset-y-0 right-0 w-28 bg-linear-to-l from-[#f1f3f0] to-transparent" />
        </div>
      </div>

      {/* Fixed-height readout pinned to the foot of the section. Reserving the
          space rather than letting the line appear is what keeps hovering from
          nudging anything. */}
      <p
        aria-hidden
        className={`container pointer-events-none absolute inset-x-0 bottom-16 z-10 hidden h-12 text-center text-sm leading-relaxed transition-opacity duration-300 md:block ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {active ? (
          active.kind === "quote" ? (
            <>
              <span className="font-medium text-emerald-950">{active.author}</span>
              <span className="mt-1 block text-emerald-950/55">{active.role}</span>
            </>
          ) : (
            <>
              <span className="font-medium text-emerald-950">{active.name}</span>
              <span className="mt-1 block text-emerald-950/55">{noteFor(active.type)}</span>
            </>
          )
        ) : (
          <span className="block">&nbsp;</span>
        )}
      </p>

      <p className="type-label pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden text-center text-emerald-950/30 md:block">Drag to look around</p>

      {/* Small screens get the same list without the rig: a cylinder you stand
          inside needs a pointer to be worth its cost. */}
      <ul className="container col-start-1 row-start-1 mt-10 grid grid-cols-2 gap-x-6 gap-y-4 md:hidden">
        {clients.map((client) => (
          <li key={client.name}>
            <span className="type-label block text-amber-600">{client.type}</span>
            <span className="mt-1 block text-sm text-emerald-950/70">{client.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

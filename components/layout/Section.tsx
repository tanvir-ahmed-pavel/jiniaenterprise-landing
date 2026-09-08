import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The home page's section vocabulary, extracted so every other page is built
 * from the same parts rather than re-inventing a card system per route.
 *
 * The rules it encodes: gold hairline eyebrow, light display type, hairline
 * rules instead of borders-around-everything, and nothing heavier than 500.
 */

/** One eyebrow treatment site-wide: gold hairline, then the label. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 type-label text-emerald-700">
      <span aria-hidden className="h-px w-6 shrink-0 bg-amber-400" />
      {children}
    </p>
  );
}

/** Eyebrow + display heading + optional lede, at the home page's exact scale. */
export function SectionIntro({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <div className={centered ? "flex justify-center" : undefined}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="type-display mt-5 max-w-[18ch] font-heading text-[2.25rem] text-emerald-950 sm:text-[3.25rem]"
          style={centered ? { marginInline: "auto" } : undefined}>
        {title}
      </h2>
      {lede && (
        <p className={`mt-6 text-base leading-relaxed text-emerald-950/60 sm:text-lg ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}>
          {lede}
        </p>
      )}
    </div>
  );
}

/** The site's two button shapes. Pills, height 12, weight 400. */
export function PrimaryAction({ href, children, external = false, tone = "light" }: { href: string; children: React.ReactNode; external?: boolean; tone?: "light" | "dark" }) {
  const cls =
    "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-sm font-medium transition-colors duration-200 " +
    (tone === "dark"
      ? "bg-white text-emerald-950 hover:bg-amber-300"
      : "bg-emerald-950 text-white hover:bg-emerald-800");
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children} <ArrowRight className="h-4 w-4" />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function GhostAction({ href, children, external = false, tone = "light" }: { href: string; children: React.ReactNode; external?: boolean; tone?: "light" | "dark" }) {
  const cls =
    "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-7 text-sm font-medium transition-colors " +
    (tone === "dark"
      ? "border-white/20 text-white hover:border-amber-300"
      : "border-emerald-950/15 text-emerald-950 hover:border-amber-400");
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

/** The hairline stat strip the home page opens with. */
export function StatStrip({ items }: { items: Array<{ value: string; label: string }> }) {
  return (
    <div className="container grid grid-cols-2 border-y border-emerald-950/10 py-7 sm:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`px-4 py-3 ${index % 2 === 1 ? "border-l border-emerald-950/10" : ""} ${index > 1 ? "border-t border-emerald-950/10 sm:border-t-0" : ""} ${index > 0 ? "sm:border-l sm:border-emerald-950/10" : ""}`}
        >
          <p className="type-display font-heading text-[2rem] text-emerald-950 sm:text-[2.5rem]">{item.value}</p>
          <p className="type-label mt-2 text-emerald-950/50">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

/** The dark studio ground the home CTA uses, reusable as a closing panel. */
export function DarkPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`jinia-on-dark relative isolate overflow-hidden bg-[#0d1310] bg-[radial-gradient(95%_85%_at_50%_15%,#26332c_0%,#161f1a_50%,#0d1310_85%)] py-24 text-white sm:py-28 ${className}`}
    >
      <div className="container relative z-10">{children}</div>
    </section>
  );
}

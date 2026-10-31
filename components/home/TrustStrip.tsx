import { businessIdentity } from "@/lib/business/identity";

/**
 * Facts only. TODO(owner): confirm "2,500+" against real trip records.
 * TODO(owner): once the Google Business Profile has reviews, add the real
 * rating and count here (and only then, with AggregateRating markup that
 * matches what is shown).
 */
const ITEMS = [
  { value: `Since ${businessIdentity.foundingYear}`, label: "Chauffeur-driven in Dhaka" },
  { value: "2,500+", label: "Trips completed" },
  { value: "Verified", label: "Licensed, experienced drivers" },
  { value: "24/7", label: "Phone & WhatsApp line" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why people book Jinia" className="border-y border-[var(--jinia-line)] bg-[var(--jinia-paper)]">
      <dl className="container grid grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, index) => (
          <div
            key={item.label}
            className={`flex flex-col-reverse gap-1 px-4 py-7 sm:px-6 ${index % 2 === 1 ? "border-l border-[var(--jinia-line)]" : ""} ${index > 1 ? "border-t border-[var(--jinia-line)] lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="text-sm text-[var(--jinia-ink-muted)]">{item.label}</dt>
            <dd className="whitespace-nowrap font-board text-[1.15rem] font-medium tabular-nums text-[var(--jinia-ink)] sm:text-[1.85rem]">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

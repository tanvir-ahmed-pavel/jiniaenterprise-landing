/**
 * Boarding-pass summary of the trip being built. The barcode is generated
 * from the route itself, so every trip prints a different one.
 */
function bars(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  const out: number[] = [];
  for (let i = 0; i < 46; i++) {
    h = Math.imul(h ^ (h >>> 13), 0x5bd1e995);
    out.push(((h >>> 0) % 3) + 1);
  }
  return out;
}

export type TicketProps = {
  kind: string;
  fromCode: string;
  fromLabel: string;
  toCode: string;
  toLabel: string;
  fields: { label: string; value: string }[];
  rate?: number | null;
  rateNote?: string;
};

/** The request slip: what will be sent to the desk, laid out like a pass. */
export function Ticket({ kind, fromCode, fromLabel, toCode, toLabel, fields, rate, rateNote }: TicketProps) {
  const seed = `${fromCode}${toCode}${fields.map((f) => f.value).join("")}`;
  const widths = bars(seed);
  const xs = widths.reduce<number[]>((acc, w, i) => [...acc, i === 0 ? 0 : acc[i - 1] + widths[i - 1] + 1.2], []);
  const total = xs[xs.length - 1] + widths[widths.length - 1];
  return (
    <div className="jx-ticket relative flex overflow-hidden rounded-[1.25rem] bg-paper text-ink shadow-[0_30px_60px_-30px_rgba(8,30,20,.35)] ring-1 ring-ink/10">
      <div className="min-w-0 flex-1 p-4 sm:p-6">
        <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/45">
          <span>Jinia · Trip request</span>
          <span className="hidden text-gold-deep sm:inline">{kind}</span>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <div className="min-w-0">
            <p className="font-heading text-[2.1rem] font-semibold leading-none tracking-[-0.04em] sm:text-[3.2rem]">{fromCode}</p>
            <p className="mt-1 truncate text-xs text-ink/55">{fromLabel}</p>
          </div>
          <div className="mb-6 flex items-center gap-1 text-gold-deep" aria-hidden>
            <span className="h-px w-3 bg-current sm:w-10" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H8v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6zm2.2-1h9.6l-1-3H8.2l-1 3zM7.5 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>
            <span className="h-px w-3 bg-current sm:w-10" />
          </div>
          <div className="min-w-0 text-right">
            <p className="font-heading text-[2.1rem] font-semibold leading-none tracking-[-0.04em] sm:text-[3.2rem]">{toCode}</p>
            <p className="mt-1 truncate text-xs text-ink/55">{toLabel}</p>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-dashed border-ink/20 pt-4 text-sm sm:grid-cols-4">
          {fields.map((f) => (
            <div key={f.label} className="min-w-0"><dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">{f.label}</dt><dd className="mt-1 truncate font-semibold tabular-nums">{f.value}</dd></div>
          ))}
        </dl>
      </div>
      {/* Stub */}
      <div className="relative flex w-24 shrink-0 flex-col justify-between border-l-2 border-dashed border-ink/15 bg-paper-deep p-3 sm:w-36 sm:p-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/45">Day rate</p>
          <p className="mt-1 font-heading text-lg font-semibold leading-tight tabular-nums sm:text-2xl">{rate ? <>৳{rate.toLocaleString("en-US")}</> : "On request"}</p>
          {rate ? <p className="text-[0.7rem] text-ink/50">{rateNote ?? "from, driver incl."}</p> : null}
        </div>
        <svg viewBox={`0 0 ${total} 40`} className="mt-3 h-9 w-full text-ink" aria-hidden preserveAspectRatio="none">
          {widths.map((w, i) => (
            <rect key={i} x={xs[i]} y="0" width={w} height="40" fill="currentColor" opacity={i % 5 === 0 ? 0.55 : 1} />
          ))}
        </svg>
      </div>
    </div>
  );
}

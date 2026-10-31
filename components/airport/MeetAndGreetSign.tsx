const DEFAULT_STEPS = [
  "Clear immigration and baggage, then exit the arrivals hall.",
  "Look for your driver holding a sign with your name.",
  "Walk with the driver to the car.",
  "Drive straight to your address or hotel.",
];

/**
 * The arrivals-hall moment at DAC, drawn as the name sign itself plus the
 * four steps after landing. Plain HTML: the steps are a real ordered list.
 * The name on the sign is an illustration, not a customer.
 */
export function MeetAndGreetSign({
  steps = DEFAULT_STEPS,
  lang = "en",
}: {
  steps?: string[];
  lang?: "en" | "bn";
}) {
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
      <figure className="mx-auto w-full max-w-sm">
        <div className="relative rotate-[-1.5deg] rounded-[6px] border border-emerald-950/15 bg-white px-6 pb-7 pt-5 shadow-[0_24px_50px_-30px_rgba(6,52,38,.45)]">
          <div className="flex items-center justify-between font-board text-[11px] tracking-[0.14em] text-emerald-950/55">
            <span>ARRIVALS · DAC</span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ON TIME
            </span>
          </div>
          <p className="mt-6 text-center font-board text-[1.65rem] font-bold leading-none tracking-[0.04em] text-emerald-950 sm:text-[1.9rem]">
            MR. RAHMAN
          </p>
          <p className="mt-3 text-center font-board text-sm tracking-[0.3em] text-amber-600">· JINIA ·</p>
          <span aria-hidden className="absolute -bottom-px left-6 right-6 h-[3px] rounded-full bg-amber-400" />
        </div>
        <figcaption className="mt-5 text-center text-xs text-emerald-950/55">
          {lang === "bn" ? "উদাহরণ: আপনার নাম লেখা সাইনবোর্ড" : "Illustration: the sign carries your name"}
        </figcaption>
      </figure>

      <ol className="space-y-0 border-l border-emerald-950/15">
        {steps.map((step, index) => (
          <li key={step} className="relative pb-6 pl-7 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[13px] top-0 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-emerald-950/15 bg-white font-board text-[11px] tabular-nums text-emerald-800"
            >
              {index + 1}
            </span>
            <p className="pt-0.5 text-base leading-relaxed text-emerald-950/80">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

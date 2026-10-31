import Link from "next/link";
import { boardRows } from "@/content/home-board";
import { formatBdt } from "@/content/fleet-prices";

/**
 * One flap per cell (not per character): two dozen animated elements instead
 * of three hundred keeps the board off the main thread's style budget.
 */
function Flaps({ text, row, col }: { text: string; row: number; col: number }) {
  const value = text.startsWith("৳") ? (
    <>
      {/* JetBrains Mono has no taka sign; the sans face draws it at full size. */}
      <span className="font-sans">৳</span>
      {text.slice(1)}
    </>
  ) : (
    text
  );
  return (
    <span aria-hidden className="jinia-flap" style={{ "--flap-delay": `${row * 260 + col * 90}ms` } as React.CSSProperties}>
      {value}
    </span>
  );
}

/**
 * The departures board: a real <table>, so crawlers and screen readers read
 * every offer as text. The flap animation is CSS only, runs once per row on
 * load and then on a slow loop, and is switched off for reduced motion.
 */
export function DeparturesBoard() {
  return (
    <div className="jinia-board relative overflow-hidden rounded-[10px] p-4 sm:p-5">
      <div className="flex items-center justify-between font-board text-[10px] tracking-[0.18em] text-[var(--jinia-board-dim)] sm:text-[11px]">
        <span>DEPARTURES · DHAKA</span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--jinia-signal)]" />
          24/7 LINE
        </span>
      </div>

      <table className="mt-3 w-full border-separate border-spacing-y-1.5 font-board text-[11px] tabular-nums sm:text-[12.5px]">
        <caption className="sr-only">Jinia Enterprise starting prices with driver, in Bangladeshi taka</caption>
        <thead>
          <tr className="text-left text-[9.5px] tracking-[0.16em] text-[var(--jinia-board-dim)] sm:text-[10px]">
            <th scope="col" className="pb-1 font-normal">ROUTE</th>
            <th scope="col" className="pb-1 font-normal">VEHICLE</th>
            <th scope="col" className="pb-1 text-right font-normal">FROM</th>
            <th scope="col" className="hidden pb-1 pl-3 font-normal sm:table-cell">NOTE</th>
          </tr>
        </thead>
        <tbody>
          {boardRows.map((row, index) => {
            const price = row.from ? `৳${row.from.toLocaleString("en-US")}` : "ON REQUEST";
            return (
              <tr key={`${row.route}-${row.vehicle}`} className="jinia-board-row">
                <th scope="row" className="py-1.5 pl-2 pr-2 text-left font-medium text-[var(--jinia-board-ink)]">
                  <Link href={row.href} className="block focus-visible:outline-offset-2">
                    <span className="sr-only">{row.routeLabel}</span>
                    <Flaps text={row.route} row={index} col={0} />
                  </Link>
                </th>
                <td className="py-1.5 pr-2 text-[var(--jinia-board-ink)]">
                  <span className="sr-only">{row.vehicle.toLowerCase()}</span>
                  <Flaps text={row.vehicle} row={index} col={1} />
                </td>
                <td className={`py-1.5 pr-2 text-right ${row.from ? "text-[var(--jinia-gold)]" : "text-[var(--jinia-board-dim)]"}`}>
                  <span className="sr-only">{row.from ? `from ${formatBdt(row.from)} per day` : "price on request"}</span>
                  <Flaps text={price} row={index} col={2} />
                </td>
                <td className="hidden py-1.5 pl-3 pr-2 text-[var(--jinia-board-dim)] sm:table-cell">{row.remark}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="mt-3 border-t border-white/10 pt-3 font-board text-[10px] leading-relaxed tracking-[0.06em] text-[var(--jinia-board-dim)] sm:text-[11px]">
        Day rates with driver, 10–12 hours inside Dhaka. Fuel, tolls &amp; parking as quoted.
      </p>
    </div>
  );
}

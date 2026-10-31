const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-12" → "12 Nov 2026". Day first, month in words: no dd/mm vs mm/dd ambiguity. */
export function formatDisplayDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, y, m, d] = match;
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

/** Today in Dhaka as yyyy-mm-dd, for the min attribute. */
export function todayInDhaka(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dhaka" }).format(new Date());
}

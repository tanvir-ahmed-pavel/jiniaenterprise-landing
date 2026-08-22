import { cn } from "@/lib/utils";

type LastUpdatedProps = {
  date: string | Date;
  className?: string;
};

function formatDate(date: string | Date): string {
  const value = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(value.getTime())) {
    return typeof date === "string" ? date : "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(value);
}

export function LastUpdated({ date, className }: LastUpdatedProps) {
  const label = formatDate(date);
  if (!label) return null;

  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800/60",
        className,
      )}
    >
      Updated {label}
    </p>
  );
}

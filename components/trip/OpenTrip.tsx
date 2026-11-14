"use client";

import { ArrowRight } from "lucide-react";

/** Closing call to action: opens the request flow with the trip so far. */
export function OpenTrip() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("jinia:open-wizard", { detail: { step: 1 } }))}
      className="group inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-soft"
    >
      Request a quote
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:translate-x-0.5"><ArrowRight className="h-4 w-4" /></span>
    </button>
  );
}

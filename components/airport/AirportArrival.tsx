import Link from "next/link";
import { Plane } from "lucide-react";
import { MeetAndGreetSign } from "@/components/airport/MeetAndGreetSign";

/** Shared by /airport-car-rental and /services/airport-transfer. */
export function AirportArrival() {
  return (
    <section className="space-y-6" aria-labelledby="airport-arrival-title">
      <h2 id="airport-arrival-title" className="type-heading font-heading text-[1.65rem] text-emerald-950 md:text-[2rem]">
        After you land at DAC
      </h2>
      <MeetAndGreetSign />
      <Link
        href="/booking?type=airport"
        className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-950 px-6 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
      >
        <Plane aria-hidden className="h-4 w-4" /> Book with your flight number
      </Link>
      <p className="text-sm text-emerald-950/60">Share the flight number and we track your flight, so a delay doesn&apos;t mean a missed pickup.</p>
    </section>
  );
}

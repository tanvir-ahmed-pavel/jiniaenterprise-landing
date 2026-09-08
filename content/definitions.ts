export type DefinitionPage = {
  slug: string;
  term: string;
  title: string;
  description: string;
  shortDefinition: string;
  details: string[];
  relatedSlugs: string[];
};

/**
 * Plain-language rental definitions for SEO / FAQ consistency.
 */
export const definitions: DefinitionPage[] = [
  {
    slug: "with-driver",
    term: "With driver / chauffeur-driven",
    title: "What Does Car Rental with Driver Mean?",
    description:
      "Definition of chauffeur-driven car rental as offered by Jinia Enterprise in Dhaka—vehicle plus professional driver.",
    shortDefinition:
      "A with-driver (chauffeur-driven) rental means Jinia Enterprise supplies both the vehicle and a professional driver for the agreed duty period. You do not drive the hired car yourself under the standard package.",
    details: [
      "This is the primary model for city, airport, corporate, and outstation bookings.",
      "Driver-only hire for your own car may be discussed separately as a distinct service.",
      "Duty hours, overtime, and routing still need to be agreed even when a driver is included.",
    ],
    relatedSlugs: ["full-day", "monthly-rental", "waiting-time"],
  },
  {
    slug: "full-day",
    term: "Full-day rental",
    title: "What Is a Full-Day Car Rental?",
    description:
      "Full-day chauffeur hire in Dhaka typically covers about 10–12 hours—confirm the exact window on your quote.",
    shortDefinition:
      "A full-day rental typically means about 10–12 hours of chauffeur service within the agreed operating pattern (often in-city). Exact start/end times and overtime rules are confirmed at booking.",
    details: [
      "Full-day is different from an unlimited 24-hour clock unless your quote says so.",
      "Outstation days may be defined differently because of highway driving and overnight rest.",
      "Ask when overtime begins so evening meetings do not create invoice surprises.",
    ],
    relatedSlugs: ["half-day", "overtime", "with-driver"],
  },
  {
    slug: "half-day",
    term: "Half-day rental",
    title: "What Is a Half-Day Car Rental?",
    description:
      "Half-day chauffeur hire covers a shorter agreed window than a full day—useful for limited meeting blocks in Dhaka.",
    shortDefinition:
      "A half-day rental is a shorter chauffeur package than a full day, with a defined hour window agreed on the quote. It suits limited meeting blocks rather than all-day multi-stop itineraries.",
    details: [
      "Hour counts vary by booking—always read the quote rather than assuming a universal half-day length.",
      "Crossing into extra hours usually moves you into overtime or a full-day reprice.",
      "Airport transfers are often quoted as transfers, not as half-day city packages.",
    ],
    relatedSlugs: ["full-day", "overtime", "airport-transfer"],
  },
  {
    slug: "airport-transfer",
    term: "Airport transfer",
    title: "What Is an Airport Transfer?",
    description:
      "Airport transfer means a chauffeur pickup or drop timed to Hazrat Shahjalal International Airport (DAC) flights.",
    shortDefinition:
      "An airport transfer is a point-to-point chauffeur trip between DAC (Hazrat Shahjalal International Airport) and your Dhaka address or hotel, timed around your flight, often with meet & greet when arranged.",
    details: [
      "Flight numbers help the desk plan for typical arrival patterns.",
      "Waiting rules after landing should be confirmed—especially for international baggage claim.",
      "Transfers are not automatically the same commercially as a full-day city hire.",
    ],
    relatedSlugs: ["waiting-time", "one-way", "with-driver"],
  },
  {
    slug: "outstation",
    term: "Outstation",
    title: "What Does Outstation Car Rental Mean?",
    description:
      "Outstation means chauffeur trips beyond the usual Dhaka city pattern—e.g. Cox’s Bazar, Sylhet, Chattogram, Sreemangal.",
    shortDefinition:
      "Outstation rental refers to chauffeur-driven trips that leave the normal Dhaka city operating pattern for highway destinations, with distance, fuel, and often overnight terms quoted specifically for that itinerary.",
    details: [
      "Popular examples include Dhaka–Cox’s Bazar, Dhaka–Sylhet, Dhaka–Chattogram, and Dhaka–Sreemangal.",
      "Factory visits just outside Dhaka may also be treated differently—ask if unsure.",
      "Driver rest and overnight expectations are part of safe outstation planning.",
    ],
    relatedSlugs: ["one-way", "round-trip", "overtime"],
  },
  {
    slug: "one-way",
    term: "One-way",
    title: "What Is a One-Way Car Hire?",
    description:
      "One-way means the chauffeur trip ends at the destination without a bundled return on the same booking.",
    shortDefinition:
      "A one-way booking takes you from origin to destination (for example Dhaka to Sylhet, or DAC to a hotel) without including a return leg in the same package. Empty-return or repositioning assumptions are handled in the quote.",
    details: [
      "One-way airport drops and one-way outstation drops are both common.",
      "Do not assume city day rates apply to one-way highway jobs.",
      "If you later need a return, it may be a separate booking.",
    ],
    relatedSlugs: ["round-trip", "outstation", "airport-transfer"],
  },
  {
    slug: "round-trip",
    term: "Round-trip",
    title: "What Is a Round-Trip Car Rental?",
    description:
      "Round-trip chauffeur hire includes return travel on agreed timing—or a multi-day plan with the vehicle.",
    shortDefinition:
      "A round-trip booking includes travel to the destination and back on agreed timing, or a multi-day plan where the vehicle remains part of your itinerary until the return to Dhaka (or another agreed end point).",
    details: [
      "Return timing must be clear so driver duty days and overnight rules stay accurate.",
      "Waiting at the destination between outbound and return may be charged—confirm.",
      "Same-day round trips on very long corridors may be discouraged for safety and fatigue reasons.",
    ],
    relatedSlugs: ["one-way", "outstation", "waiting-time"],
  },
  {
    slug: "waiting-time",
    term: "Waiting time",
    title: "What Is Waiting Time in Car Rental?",
    description:
      "Waiting time is the period a chauffeur and vehicle remain on duty while you are not moving—meetings, flights, or events.",
    shortDefinition:
      "Waiting time is on-duty time when the car and driver are held for you between legs—during meetings, ceremonies, or after a flight lands—rather than actively driving between pins.",
    details: [
      "Airport arrival buffers and venue ceremonies often create waiting time.",
      "Quotes may include a waiting allowance; beyond that, overtime or waiting charges can apply.",
      "Tell the desk when a transfer will actually include hours of meetings.",
    ],
    relatedSlugs: ["overtime", "airport-transfer", "full-day"],
  },
  {
    slug: "overtime",
    term: "Overtime",
    title: "What Is Overtime on a Chauffeur Rental?",
    description:
      "Overtime means duty beyond the hours agreed on your half-day, full-day, or transfer quote.",
    shortDefinition:
      "Overtime is chauffeur duty that continues past the agreed package window—for example after a full-day hour limit—usually billed according to the rate or rule on your quote.",
    details: [
      "Corporate accounts should name who can approve overtime.",
      "Evening traffic does not pause the clock; plan buffers inside the package when possible.",
      "Outstation overtime interacts with overnight rest—safety limits matter.",
    ],
    relatedSlugs: ["full-day", "half-day", "waiting-time"],
  },
  {
    slug: "monthly-rental",
    term: "Monthly rental",
    title: "What Is Monthly Car Rental with Driver?",
    description:
      "Monthly rental is a longer chauffeur package for recurring Dhaka commute or office use, quoted separately from daily hire.",
    shortDefinition:
      "Monthly rental means a chauffeur-driven vehicle arranged for an ongoing month-long (or similar) pattern—often home-to-office or dedicated corporate use—rather than booking isolated daily trips.",
    details: [
      "Hours per day, weekly off patterns, and fuel terms are defined in the monthly quote.",
      "Multiplying an indicative website day rate is not a substitute for a monthly quote.",
      "Backup vehicle support may be discussed for corporate monthly programs when arranged.",
    ],
    relatedSlugs: ["with-driver", "full-day", "overtime"],
  },
];

export function getDefinitionBySlug(slug: string): DefinitionPage | undefined {
  return definitions.find((definition) => definition.slug === slug);
}

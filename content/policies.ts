import type { FaqItem } from "@/lib/seo/types";

export type PolicyPage = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  sections: Array<{ heading: string; body: string }>;
  faqs?: FaqItem[];
};

/**
 * Operational policies framed as typical practice — confirm details at booking.
 * No invented legal claims or fabricated guarantees.
 */
export const policies: PolicyPage[] = [
  {
    slug: "rental-terms",
    title: "Car Rental Terms — Jinia Enterprise",
    description:
      "How chauffeur-driven rentals typically work with Jinia Enterprise: booking confirmation, vehicle class, driver assignment, and what to confirm before travel.",
    answer:
      "A booking is confirmed when the desk agrees the vehicle class, dates, pickup point, and quote with you. Exact inclusions (fuel, overtime, waiting) are those written on your quote—not generic website copy.",
    sections: [
      {
        heading: "What a booking covers",
        body: "Unless stated otherwise, rentals are chauffeur-driven. You receive a vehicle class suited to passenger count (subject to availability) and a professional driver for the agreed window.",
      },
      {
        heading: "Changes before pickup",
        body: "Route, time, or vehicle changes should be shared as early as possible on phone or WhatsApp so the desk can reconfirm availability and any price impact.",
      },
      {
        heading: "Customer responsibilities",
        body: "Provide accurate passenger count, luggage needs, and contact numbers. Be ready at the agreed pickup point. Follow local traffic and safety guidance from the driver.",
      },
    ],
  },
  {
    slug: "cancellation-policy",
    title: "Cancellation Policy — Car Rental Dhaka",
    description:
      "How cancellations and changes are typically handled for Jinia Enterprise chauffeur bookings in Dhaka and outstation trips.",
    answer:
      "Tell the desk as soon as plans change. Cancellation or reschedule terms depend on timing, vehicle type, and whether the trip is city or outstation—confirm the rule on your quote before you pay any deposit.",
    sections: [
      {
        heading: "Same-day city changes",
        body: "Many city bookings can be adjusted if the desk still has capacity. Last-minute cancellations after a driver is already dispatched may incur a call-out charge—ask when you book.",
      },
      {
        heading: "Airport & outstation",
        body: "Airport transfers and long-distance trips often need earlier notice because drivers and vehicles are committed in advance. Write the cancellation window into your confirmation message.",
      },
      {
        heading: "No-shows",
        body: "If the passenger cannot be reached at the agreed point and time, the desk may treat the booking as unused after a reasonable wait. Waiting rules should be stated on the quote.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy — How We Handle Your Details",
    description:
      "How Jinia Enterprise uses booking contact details, trip information, and messages shared for car rental quotes and service.",
    answer:
      "We use the phone, email, and trip details you share to quote, assign drivers, and support your booking. We do not sell your contact list. Operational messages may be retained as needed to serve the trip.",
    sections: [
      {
        heading: "What we collect",
        body: "Name, phone, WhatsApp, email, pickup/drop points, dates, passenger count, and optional flight numbers—plus whatever you type into inquiry or booking forms.",
      },
      {
        heading: "How we use it",
        body: "To respond to quotes, dispatch drivers, send vehicle details, invoice corporate clients, and improve service. Analytics tools on the website may record anonymous usage patterns.",
      },
      {
        heading: "Your choices",
        body: "Ask the desk to update or remove marketing contact preferences. Booking records needed for accounting or dispute resolution may be kept as required for business operations.",
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refunds & Deposits",
    description:
      "When refunds or deposit returns typically apply for Jinia Enterprise car rental bookings.",
    answer:
      "Refunds follow the cancellation terms on your quote and any deposit already paid. Unused prepaid amounts are reviewed case by case—contact the desk with your booking reference.",
    sections: [
      {
        heading: "Deposits",
        body: "Some bookings, especially outstation or peak dates, may require an advance. The receipt should state whether it is refundable and under what conditions.",
      },
      {
        heading: "Partial use",
        body: "If a multi-day hire ends early, charges usually reflect the agreed package rather than an automatic pro-rata website formula—confirm with the desk.",
      },
    ],
  },
  {
    slug: "overtime-and-fuel",
    title: "Overtime, Fuel & Waiting Time",
    description:
      "How overtime, fuel, tolls, and waiting time are typically handled on chauffeur-driven rentals in Dhaka.",
    answer:
      "Full-day city hire often covers about 10–12 hours; overtime, fuel, tolls, and long waits are either included or billed as stated on your quote. Always confirm before the trip starts.",
    sections: [
      {
        heading: "Overtime",
        body: "Hours beyond the booked window are usually charged at an agreed overtime rate. Night hours may differ—ask when you book evening or early-morning pickups.",
      },
      {
        heading: "Fuel",
        body: "City packages sometimes include fuel within a usage pattern; outstation trips often price fuel separately or on a shared basis. The quote should say which model applies.",
      },
      {
        heading: "Tolls, parking, ferries",
        body: "Road tolls, parking fees, and similar third-party costs are typically paid as incurred unless the quote says otherwise.",
      },
    ],
  },
  {
    slug: "outstation-and-night",
    title: "Outstation & Night Travel",
    description:
      "How overnight stays, night driving, and long-distance chauffeur trips are typically arranged with Jinia Enterprise.",
    answer:
      "Outstation trips need clear departure times, overnight plans for the driver when required, and agreement on one-way vs round-trip. Night travel is available when scheduled—share preferences early.",
    sections: [
      {
        heading: "Driver rest & lodging",
        body: "Multi-day routes may require driver rest and lodging arrangements. Who pays for lodging should be written into the booking confirmation.",
      },
      {
        heading: "Night airport runs",
        body: "DAC pickups after midnight are commonly arranged when booked ahead. Flight numbers help the desk track delays.",
      },
    ],
  },
];

export function getPolicyBySlug(slug: string): PolicyPage | undefined {
  return policies.find((p) => p.slug === slug);
}

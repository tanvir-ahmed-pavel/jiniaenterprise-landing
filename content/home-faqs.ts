import type { FaqItem } from "@/lib/seo/types";
import { CITY_DAY_HOURS, formatBdt, getLowestDayRate } from "@/content/fleet-prices";
import { RESPONSE_PROMISE, businessIdentity } from "@/lib/business/identity";
import { routeFacts } from "@/content/home-board";

const from = (filter: Parameters<typeof getLowestDayRate>[0]) => formatBdt(getLowestDayRate(filter)?.dayRate ?? 0);

/** Home FAQ: every answer carries a number or a policy, sourced from the site's own data. */
export const homeFaqs: FaqItem[] = [
  {
    question: "How much does a car with driver cost in Dhaka?",
    answer: `A full day (about ${CITY_DAY_HOURS}) inside Dhaka city starts from ${from((r) => r.kind === "Sedan")} for a sedan, ${from((r) => r.model === "Toyota Noah")} for a 7-seat Toyota Noah, ${from((r) => r.model === "Toyota Hiace")} for a 12-seat Toyota Hiace and ${from((r) => r.model === "Toyota Alphard")} for a Toyota Alphard. Fuel, overtime, tolls and parking are included or billed as written on your quote.`,
  },
  {
    question: "What does one day of hire include?",
    answer: `The car, the driver and about ${CITY_DAY_HOURS} of duty inside Dhaka. Hours beyond that are charged at the overtime rate agreed on your quote, and night hours may differ.`,
  },
  {
    question: "Do you pick up from Dhaka airport (DAC)?",
    answer: "Yes. Share your flight number and the driver times the pickup to your arrival, waiting with a name sign when you ask for one. Gulshan to Hazrat Shahjalal airport usually takes 20–40 minutes in light traffic and can take over an hour at peak times. Pickups after midnight are arranged when booked ahead.",
  },
  {
    question: "How long are trips outside Dhaka?",
    answer: `Approximate road times including rest stops: ${routeFacts.map((r) => `${r.city} ${r.driveTime.replace(" hrs", " hours")}`).join(", ")}. Outstation trips are quoted per trip, not at city day rates.`,
  },
  {
    question: "Do you rent cars monthly?",
    answer: "Yes, with a dedicated driver. Monthly packages are priced on your daily hours and routes rather than a day rate multiplied by 30, so send your typical schedule for a quote.",
  },
  {
    question: "How do I book?",
    answer: `WhatsApp or call ${businessIdentity.phone} with your date, pickup point, passenger count and vehicle preference. ${RESPONSE_PROMISE.sentence} Asking for a quote costs nothing.`,
  },
];

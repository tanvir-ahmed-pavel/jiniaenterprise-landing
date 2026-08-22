/**
 * Pricing methodology content.
 * Indicative "from" figures ONLY where present on sampleVehicles in lib/config.ts.
 * Never present these as guaranteed final prices.
 */

import type { FaqItem } from "@/lib/seo/types";

export type IndicativeVehiclePrice = {
  name: string;
  slug: string;
  startingPriceBdt: number;
  priceLabel: string;
};

export type PricingPageContent = {
  title: string;
  description: string;
  answer: string;
  methodology: string[];
  indicativeFromPrices: IndicativeVehiclePrice[];
  priceDisclaimer: string;
  factorsAffectingPrice: string[];
  howToGetAQuote: string[];
  whatWeDoNotPublish: string[];
};

/** Only vehicles that already declare starting_price in lib/config.ts sampleVehicles */
export const indicativeFromPrices: IndicativeVehiclePrice[] = [
  {
    name: "Hyundai H1",
    slug: "hyundai-h1",
    startingPriceBdt: 4500,
    priceLabel: "per day",
  },
  {
    name: "Hyundai H1 (New)",
    slug: "hyundai-h1-new",
    startingPriceBdt: 6000,
    priceLabel: "per day",
  },
  {
    name: "Toyota Alphard",
    slug: "toyota-alphard",
    startingPriceBdt: 12000,
    priceLabel: "per day",
  },
  {
    name: "Toyota Allion",
    slug: "toyota-allion",
    startingPriceBdt: 3500,
    priceLabel: "per day",
  },
];

export const pricingPage: PricingPageContent = {
  title: "Car Rental Pricing in Dhaka — How Quotes Work",
  description:
    "Understand Jinia Enterprise rental pricing: indicative starting points for select vehicles, factors that change the quote, and how to request today’s rate.",
  answer:
    "Jinia Enterprise quotes chauffeur-driven rentals based on vehicle class, duty hours, city vs outstation use, and inclusions such as fuel. A few fleet units list indicative “from” day rates on this site; your final quote may differ once itinerary details are confirmed.",
  methodology: [
    "Start from the vehicle class and whether the trip is in-city, airport transfer, or outstation.",
    "Apply the duty pattern: half-day, full-day (often about 10–12 hours), multi-day, or monthly.",
    "Clarify what is included: driver, fuel, overtime, night work, parking, and waiting.",
    "Adjust for peak dates, multi-vehicle events, and special access or decoration requests.",
    "Send a written quote for confirmation before the travel day whenever possible.",
  ],
  indicativeFromPrices,
  priceDisclaimer:
    "The BDT figures below are indicative starting points taken from our published fleet samples (Hyundai H1 from ৳4,500/day, H1 New from ৳6,000/day, Toyota Alphard from ৳12,000/day, Toyota Allion from ৳3,500/day). They are not guaranteed final prices. Fuel, overtime, outstation distance, night duty, waiting, and date-specific availability can change the total. Always request a quote for your dates.",
  factorsAffectingPrice: [
    "Vehicle class and specific unit availability on your date",
    "Trip type: airport transfer, in-city day hire, or outstation highway journey",
    "Duration: hours per day, number of days, or monthly pattern",
    "Fuel inclusion vs customer-paid fuel, and estimated distance",
    "Overtime beyond the agreed duty window",
    "Night driving or late-airport arrivals/departures",
    "Waiting time between legs on multi-stop days",
    "Driver overnight arrangements on multi-day outstation trips",
    "Group vehicles (microbus/coach) vs sedan/MPV",
    "Peak wedding or event dates when demand is high",
    "Parking, tolls, or access fees where they apply and are not absorbed in the package",
  ],
  howToGetAQuote: [
    "Call or WhatsApp +88 01716 633445, or email jiniaenterprise.com@gmail.com.",
    "Use the website booking form with pickup area, dates, and passenger count.",
    "Mention vehicle preference if you have one (e.g. Allion, H1, Alphard).",
    "State whether fuel should be included and if the trip leaves Dhaka.",
    "Confirm the written quote before travel so both sides share the same assumptions.",
  ],
  whatWeDoNotPublish: [
    "A single fixed price that covers every Dhaka route and hour combination",
    "Fabricated “average customer savings” or discount badges without a real offer",
    "Guaranteed lowest-price claims against unnamed competitors",
    "Outstation package totals without knowing days, vehicle, and overnight needs",
  ],
};

export const pricingFaqs: FaqItem[] = [
  {
    question: "Why don’t all cars show a price on the website?",
    answer:
      "Only some sample vehicles list indicative starting day rates. Other units are quoted on request because availability and trip type vary. Ask the desk for today’s options.",
  },
  {
    question: "Are the “from” prices inclusive of fuel?",
    answer:
      "Not necessarily. Fuel inclusion depends on the package. The indicative figures are starting points—confirm fuel, overtime, and night terms on your quote.",
  },
  {
    question: "Do monthly rentals use the same day rate?",
    answer:
      "Monthly and corporate packages are scoped differently from a one-day city hire. Request a monthly quote with typical hours and routes rather than multiplying a day rate.",
  },
];

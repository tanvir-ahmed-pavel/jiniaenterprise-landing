import type { FaqItem } from "@/lib/seo/types";
import { locations } from "@/content/locations";
import { routes } from "@/content/routes";
import { serviceDetails } from "@/content/service-details";
import { pricingFaqs } from "@/content/pricing";
import { comparisons } from "@/content/comparisons";
import { policies } from "@/content/policies";

/**
 * Expanded first-party FAQs — factual, conversational, no fabricated reviews/prices.
 * Import `allFaqs` for a de-duplicated site-wide list, or use topic helpers below.
 */

/** Core site FAQs (also re-exported from lib/seo/content). */
export const siteFaqs: FaqItem[] = [
  {
    question: "Does Jinia Enterprise provide car rental with a driver?",
    answer:
      "Yes. Jinia Enterprise primarily offers chauffeur-driven car and bus rental in Dhaka and across Bangladesh. Professional licensed drivers are assigned for daily, monthly, corporate, and airport transfer bookings.",
  },
  {
    question: "What does a full-day car rental mean?",
    answer:
      "A full-day rental typically covers about 10–12 hours of chauffeur service within Dhaka or nearby factory and office routes. Exact hours, overtime, and outstation terms are confirmed when you request a quote.",
  },
  {
    question: "Do you offer airport pickup at Hazrat Shahjalal International Airport (DAC)?",
    answer:
      "Yes. Airport pickup and drop service is available for DAC. Drivers can track flight status and meet passengers with a name signboard when arranged in advance.",
  },
  {
    question: "Is fuel included in the rental price?",
    answer:
      "Fuel inclusion depends on the rental package and trip type (city vs outstation). Confirm fuel, overtime, and night charges when you request today’s rate so the quote matches your itinerary.",
  },
  {
    question: "Can I book a car for monthly or long-term corporate use?",
    answer:
      "Yes. Monthly and corporate fleet rentals are available with dedicated drivers, backup vehicle support where arranged, and billing suited to companies, NGOs, and embassies.",
  },
  {
    question: "Which areas of Dhaka do you serve?",
    answer:
      "Service covers major Dhaka areas including Gulshan, Banani, Uttara, Dhanmondi, Mirpur, Mohammadpur, Baridhara, Bashundhara, and Hazrat Shahjalal International Airport, plus outstation routes across Bangladesh.",
  },
  {
    question: "How do I request a quote or book a vehicle?",
    answer:
      "Call or WhatsApp +88 01716 633445, email jiniaenterprise.com@gmail.com, or use the booking form on this website. Share pickup location, dates, passenger count, and vehicle preference for a faster quote.",
  },
  {
    question: "What types of vehicles are available?",
    answer:
      "The fleet includes sedans, SUVs, luxury MPVs, microbuses, and AC coaches for group transport. Vehicle availability depends on date and booking type—check the fleet page or ask the desk for current options.",
  },
];

export const conversationalFaqs: FaqItem[] = [
  {
    question: "Can I just WhatsApp you to book a car in Dhaka?",
    answer:
      "Yes. WhatsApp +88 01716 633445 (or call the same number) with your pickup area, date, passenger count, and trip type. You can also use the website booking form or email jiniaenterprise.com@gmail.com.",
  },
  {
    question: "Do I drive the car myself or do you send a driver?",
    answer:
      "Jinia Enterprise primarily offers chauffeur-driven rental—the driver comes with the car. If you need a driver for your own vehicle, ask about driver-only service as a separate request.",
  },
  {
    question: "How many hours is a normal full day?",
    answer:
      "Full-day city hire is typically discussed as about 10–12 hours. Exact start/end times and overtime rules are confirmed on your quote.",
  },
  {
    question: "Can you pick us up at Shahjalal Airport with a name board?",
    answer:
      "Yes. DAC airport pickup with meet & greet and a name signboard can be arranged when you book in advance and share flight details.",
  },
  {
    question: "Is petrol included or do I pay fuel separately?",
    answer:
      "It depends on the package. Some quotes include fuel; others do not. Say whether you want fuel included when you request today’s rate so the quote matches your expectation.",
  },
  {
    question: "We’re a family of six with suitcases—what should we book?",
    answer:
      "A sedan will likely be tight. Ask for a Noah, Hyundai H1, or similar MPV/van class depending on luggage. Share headcount and suitcase count for a sensible recommendation.",
  },
  {
    question: "Do you go to Cox’s Bazar or only inside Dhaka?",
    answer:
      "Both. We handle Dhaka city hire and outstation routes such as Cox’s Bazar, Sylhet, Chattogram, and Sreemangal when scheduled in advance.",
  },
  {
    question: "Can our company keep a car and driver every month?",
    answer:
      "Yes. Monthly and corporate chauffeur packages are available. Share typical routes, hours, and billing needs for a monthly quote—do not simply multiply a day rate.",
  },
  {
    question: "Where is your office if I want to visit?",
    answer:
      "Head office: 40/2, Unicorn Plaza (Level-2), Shop-9,10, Gulshan, Dhaka 1212. Calling ahead is helpful so someone can assist you.",
  },
  {
    question: "What if my flight lands late at night?",
    answer:
      "Night airport transfers can be arranged around your flight time when booked ahead. Confirm the pickup window and waiting terms on the transfer quote.",
  },
  {
    question: "Do you only have luxury cars?",
    answer:
      "No. The fleet spans economy sedans, MPVs, luxury options, microbuses, and larger AC coaches. Availability depends on the date—check the fleet page or ask the desk.",
  },
  {
    question: "How far ahead should I book for a wedding?",
    answer:
      "As early as you can, especially in peak wedding season or when you need multiple vehicles. Share venues and timeline so cars and guest shuttles can be held.",
  },
  {
    question: "Are the prices on the website final?",
    answer:
      "Indicative “from” day rates shown for select vehicles (such as Allion, H1, H1 New, and Alphard) are starting points only. Final quotes vary with hours, fuel, outstation distance, and date.",
  },
  {
    question: "Can you invoice our NGO or embassy?",
    answer:
      "Corporate and institutional billing is commonly arranged. Share invoice requirements when you open the booking so paperwork matches your finance process.",
  },
  {
    question: "What areas of Dhaka do you cover for pickup?",
    answer:
      "Major served areas include Gulshan, Banani, Uttara, Dhanmondi, Mirpur, Mohammadpur, Baridhara, Bashundhara, and Hazrat Shahjalal International Airport, plus outstation routes across Bangladesh when arranged.",
  },
];

export const operationsFaqs: FaqItem[] = [
  {
    question: "What payment methods do you accept?",
    answer:
      "Payment options are confirmed at booking and may vary for corporate accounts versus private hires. Ask the desk which methods apply to your trip before paying any advance.",
  },
  {
    question: "What happens if the car has a problem on the road?",
    answer:
      "Contact the operations desk immediately. Roadside coordination and vehicle replacement are handled as quickly as availability allows—especially important to agree for corporate programs that need backup support.",
  },
  {
    question: "Can I request the same driver again?",
    answer:
      "Preferences can be noted and honored when scheduling allows. They are not guaranteed on every date because of roster and duty-hour limits.",
  },
  {
    question: "Do your drivers speak English?",
    answer:
      "Many chauffeurs can handle common English instructions for addresses and timing; fluency varies. For complex multilingual needs, tell the desk when booking so expectations are clear.",
  },
  {
    question: "Can I eat or drink in the car?",
    answer:
      "Reasonable water and light snacks are usually fine; avoid messy foods and follow the driver’s guidance. Leave the cabin as you found it.",
  },
  {
    question: "Are child seats available?",
    answer:
      "Child-seat availability is not assumed on every vehicle. Request one when you book and confirm before travel.",
  },
];

function uniqueByQuestion(items: FaqItem[]): FaqItem[] {
  const seen = new Set<string>();
  const output: FaqItem[] = [];
  for (const item of items) {
    const key = item.question.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(item);
  }
  return output;
}

const locationFaqs = locations.flatMap((location) => location.faqs);
const routeFaqs = routes.flatMap((route) => route.faqs);
const serviceFaqs = serviceDetails.flatMap((service) => service.faqs);
const comparisonFaqs = comparisons.flatMap((comparison) => comparison.faqs);
const policyFaqs = policies.flatMap((policy) => policy.faqs ?? []);

/** De-duplicated comprehensive FAQ list for FAQ pages and schema. */
export const allFaqs: FaqItem[] = uniqueByQuestion([
  ...siteFaqs,
  ...conversationalFaqs,
  ...operationsFaqs,
  ...pricingFaqs,
  ...locationFaqs,
  ...routeFaqs,
  ...serviceFaqs,
  ...comparisonFaqs,
  ...policyFaqs,
]);

export const faqsByTopic = {
  core: siteFaqs,
  conversational: conversationalFaqs,
  operations: operationsFaqs,
  pricing: pricingFaqs,
  all: allFaqs,
} as const;

export function findFaqsByQuestionIncludes(
  fragments: string[],
  source: FaqItem[] = allFaqs,
): FaqItem[] {
  const lowered = fragments.map((fragment) => fragment.toLowerCase());
  return source.filter((faq) =>
    lowered.some((fragment) => faq.question.toLowerCase().includes(fragment)),
  );
}

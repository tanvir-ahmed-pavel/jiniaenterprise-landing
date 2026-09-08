import type { FaqItem } from "@/lib/seo/types";

export type ComparisonPage = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  left: { name: string; points: string[] };
  right: { name: string; points: string[] };
  sharedConsiderations: string[];
  chooseLeftWhen: string[];
  chooseRightWhen: string[];
  faqs: FaqItem[];
  relatedPaths: string[];
};

/**
 * Factual capacity / use-case comparisons — no unsupported “best” claims.
 */
export const comparisons: ComparisonPage[] = [
  {
    slug: "noah-vs-hiace",
    title: "Toyota Noah vs Toyota Hiace — Which to Hire?",
    description:
      "Compare Noah and Hiace for chauffeur-driven hire in Dhaka: seating style, group size, and luggage—without hype. Fleet options from Jinia Enterprise.",
    answer:
      "Noah and Hiace both serve group travel with a driver, but they fit different headcounts and luggage patterns. Noah is a passenger MPV aimed at families and small groups; Hiace is a larger van/microbus class used when you need more seats for staff or tour parties.",
    left: {
      name: "Toyota Noah (MPV)",
      points: [
        "Typically configured around 7 seats in passenger-MPV layouts (confirm the assigned unit)",
        "Sliding doors and a car-like cabin that many families find easy to use",
        "Suits mixed city days with moderate luggage",
        "Often preferred when comfort per passenger matters more than maximum headcount",
      ],
    },
    right: {
      name: "Toyota Hiace (van / microbus)",
      points: [
        "Higher seated capacity in common rental configurations (often into the mid-teens—confirm unit)",
        "Better when one vehicle must move a full small team together",
        "More cargo volume for bags, kits, or event materials",
        "Common for staff shuttles, campus moves, and group tourist transfers",
      ],
    },
    sharedConsiderations: [
      "Both are chauffeur-driven in our standard offering",
      "Exact seat maps and AC layouts vary by unit—ask what is available on your date",
      "Narrow residential lanes may favor waiting on a main road for the larger Hiace",
      "Price differs by vehicle class and trip type; request a quote rather than assuming parity",
    ],
    chooseLeftWhen: [
      "You have roughly a family-sized party and want MPV comfort",
      "You are doing mixed Gulshan/Banani city meetings with light-to-moderate bags",
      "Sliding-door convenience matters for children or elders",
    ],
    chooseRightWhen: [
      "You need notably more seats than a 7-seater MPV provides",
      "You are running guest shuttles or staff groups",
      "Luggage or equipment volume is high",
    ],
    faqs: [
      {
        question: "Is the Hiace always larger than the Noah?",
        answer:
          "In typical rental use, Hiace-class vehicles carry more passengers than Noah-class MPVs. Confirm the exact seated capacity of the unit assigned to your booking.",
      },
      {
        question: "Can I switch after seeing the vehicle?",
        answer:
          "Switches depend on same-day availability and any price difference. It is better to match headcount and luggage at quote time.",
      },
    ],
    relatedPaths: ["/vehicles", "/car-rental-with-driver", "/booking"],
  },
  {
    slug: "sedan-vs-suv",
    title: "Sedan vs SUV Rental with Driver in Dhaka",
    description:
      "Sedan versus SUV chauffeur hire: capacity, luggage, and trip types. Factual comparison for Dhaka city and outstation use.",
    answer:
      "Sedans (such as Allion, Premio, Axio, or Corolla class units when available) suit most city meetings and light luggage. SUVs (such as Prado, Harrier, X-Trail, or Pajero class when available) trade higher posture and often more cabin/boot flexibility for different pricing and availability.",
    left: {
      name: "Sedan",
      points: [
        "Typically 5 seats including driver—plan 3–4 passengers comfortably with bags",
        "Easier in tight Dhaka parking and congested lanes",
        "Common choice for executive city days and airport runs with light luggage",
        "Indicative starting day rate published for Toyota Allion among sample fleet units",
      ],
    },
    right: {
      name: "SUV",
      points: [
        "5–7 seats depending on model (confirm unit)",
        "Higher seating position and often more flexible luggage arrangements",
        "Frequently requested for VIP visitors and longer highway legs",
        "Availability and quote vary more by specific model and date",
      ],
    },
    sharedConsiderations: [
      "Chauffeur-driven service is the default for both",
      "Neither category is universally “better”—match trip length, passengers, and roads",
      "Outstation comfort preferences differ by traveler; tell us priorities when quoting",
      "Luxury MPVs (e.g. Alphard) are a third path when cabin privacy matters more than SUV stance",
    ],
    chooseLeftWhen: [
      "1–3 passengers with standard suitcases",
      "Dense city schedules with frequent short stops",
      "You want a straightforward executive sedan day",
    ],
    chooseRightWhen: [
      "You prefer higher seating and extra luggage flexibility",
      "Senior visitors requested an SUV specifically",
      "Mixed city + highway days where an SUV class unit is available and quoted",
    ],
    faqs: [
      {
        question: "Does an SUV always cost more than a sedan?",
        answer:
          "SUV-class units are often quoted higher than economy sedans, but the only reliable figure is your date-specific quote. Some sedans also sit in different tiers.",
      },
      {
        question: "What if I need 6–7 passengers?",
        answer:
          "Look at 7-seat SUVs or MPVs (Noah, certain SUV layouts) or step up to H1/Hiace. Confirm seat count on the assigned vehicle.",
      },
    ],
    relatedPaths: ["/vehicles", "/airport-car-rental", "/pricing"],
  },
  {
    slug: "daily-vs-monthly",
    title: "Daily vs Monthly Car Rental with Driver",
    description:
      "Compare daily chauffeur hire with monthly car rental in Dhaka—when each pattern fits, without invented savings claims.",
    answer:
      "Daily hire fits one-off meetings, airport days, and short visits. Monthly chauffeur packages fit recurring commute or office use when you want the same working pattern without re-booking every morning. Neither is automatically cheaper without looking at your actual hours and routes.",
    left: {
      name: "Daily (or short-term) hire",
      points: [
        "Booked per day or per defined trip (airport, full-day city, outstation)",
        "Flexible when travel is irregular",
        "You can change vehicle class trip by trip subject to availability",
        "Good for visitors, events, and ad-hoc executive needs",
      ],
    },
    right: {
      name: "Monthly rental with driver",
      points: [
        "Scoped around recurring hours and routes (e.g. home ↔ office)",
        "Fewer repeated booking conversations once the pattern is set",
        "Billing and overtime approval can follow corporate account rules",
        "Backup vehicle discussions are more relevant on longer programs when arranged",
      ],
    },
    sharedConsiderations: [
      "Both are chauffeur-driven in the standard Jinia Enterprise model",
      "Fuel, overtime, and night terms still need clarity on either pattern",
      "Multiplying a published indicative day rate is not the same as a monthly quote",
      "Outstation spikes during a monthly contract should be priced as they occur unless included",
    ],
    chooseLeftWhen: [
      "Travel days are occasional or unpredictable",
      "You need a one-time airport transfer or wedding/event day",
      "Visitors are in Dhaka for only a few days",
    ],
    chooseRightWhen: [
      "You need a car and driver on most working days",
      "HR or admin wants simpler monthly coordination",
      "The route pattern is stable enough to describe in a package",
    ],
    faqs: [
      {
        question: "Can I convert a daily booking into a monthly package?",
        answer:
          "If you find yourself booking many days in a row, ask the desk for a monthly quote. It is a new commercial scope, not an automatic discount button.",
      },
      {
        question: "Is monthly always less expensive per day?",
        answer:
          "Not necessarily—it depends on included hours, fuel, and duty pattern. Compare a real monthly quote to your expected daily usage instead of assuming a rule.",
      },
    ],
    relatedPaths: [
      "/monthly-car-rental",
      "/car-rental-with-driver",
      "/corporate-car-rental",
      "/booking",
    ],
  },
];

export function getComparisonBySlug(slug: string): ComparisonPage | undefined {
  return comparisons.find((comparison) => comparison.slug === slug);
}

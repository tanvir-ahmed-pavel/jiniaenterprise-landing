export type { FaqItem } from "@/lib/seo/types";

/** Core FAQs live in content/faqs — re-exported for existing @/lib/seo/content imports. */
export { siteFaqs } from "@/content/faqs";

export const pillarPages = [
  {
    slug: "car-rental-dhaka",
    title: "Car Rental in Dhaka with Driver",
    path: "/car-rental-dhaka",
    description:
      "Chauffeur-driven car rental across Dhaka for daily commute, corporate travel, and outstation trips. Request a quote from Jinia Enterprise.",
  },
  {
    slug: "car-rental-bangladesh",
    title: "Car Rental in Bangladesh with Driver",
    path: "/car-rental-bangladesh",
    description:
      "Chauffeur-driven car and bus rental across Bangladesh from a Dhaka base—city hire, airport transfers, and outstation routes. Request a quote from Jinia Enterprise.",
  },
  {
    slug: "car-rental-with-driver",
    title: "Car Rental with Driver in Dhaka",
    path: "/car-rental-with-driver",
    description:
      "Hire a car with a professional driver in Dhaka. Daily, weekly, and monthly chauffeur packages for city and outstation travel.",
  },
  {
    slug: "self-drive-car-rental",
    title: "Self-Drive vs With Driver in Dhaka",
    path: "/self-drive-car-rental",
    description:
      "Jinia Enterprise primarily offers chauffeur-driven rentals. Learn how with-driver hire works if you searched for self-drive.",
  },
  {
    slug: "airport-car-rental",
    title: "Dhaka Airport Car Rental & Transfer",
    path: "/airport-car-rental",
    description:
      "Airport transfer and car rental for Hazrat Shahjalal International Airport (DAC). Meet & greet, flight tracking, and reliable pickup.",
  },
  {
    slug: "corporate-car-rental",
    title: "Corporate Car Rental in Dhaka",
    path: "/corporate-car-rental",
    description:
      "Corporate and embassy car rental in Dhaka with professional chauffeurs, monthly fleet options, and dependable scheduling.",
  },
  {
    slug: "monthly-car-rental",
    title: "Monthly Car Rental in Dhaka",
    path: "/monthly-car-rental",
    description:
      "Monthly car rental with driver in Dhaka for office commute and long-term use. Transparent packages with backup support when arranged.",
  },
  {
    slug: "long-term-car-rental",
    title: "Long-Term Car Rental in Dhaka",
    path: "/long-term-car-rental",
    description:
      "Long-term and multi-month chauffeur-driven car rental in Dhaka for corporate commute and extended stays. Scoped packages with terms confirmed at booking.",
  },
] as const;

/** Re-export content modules for convenient SEO imports. */
export { locations, getLocationBySlug } from "@/content/locations";
export type { LocationPage } from "@/content/locations";

export { routes, getRouteBySlug } from "@/content/routes";
export type { RoutePage } from "@/content/routes";

export {
  serviceDetails,
  getServiceDetailBySlug,
} from "@/content/service-details";
export type { ServiceDetailPage } from "@/content/service-details";

export {
  pricingPage,
  indicativeFromPrices,
  pricingFaqs,
} from "@/content/pricing";
export type {
  PricingPageContent,
  IndicativeVehiclePrice,
} from "@/content/pricing";

export { policies, getPolicyBySlug } from "@/content/policies";
export type { PolicyPage } from "@/content/policies";

export { comparisons, getComparisonBySlug } from "@/content/comparisons";
export type { ComparisonPage } from "@/content/comparisons";

export { definitions, getDefinitionBySlug } from "@/content/definitions";
export type { DefinitionPage } from "@/content/definitions";

export {
  allFaqs,
  conversationalFaqs,
  operationsFaqs,
  faqsByTopic,
  findFaqsByQuestionIncludes,
} from "@/content/faqs";

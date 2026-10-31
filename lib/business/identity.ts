/**
 * The one public origin for the site. Every canonical, og:url, JSON-LD id,
 * sitemap entry and robots line is built from this, so they can never point
 * at a host that redirects. www is primary because that is the host Vercel
 * serves; the bare domain 308-redirects to it.
 */
export const SITE_URL = "https://www.jiniaenterprise.com";

/**
 * Canonical business identity — single source of truth for NAP,
 * schema.org, and on-page contact consistency.
 */

export type BusinessIdentity = {
  legalName: string;
  brandName: string;
  url: string;
  phone: string;
  phoneSecondary?: string;
  phoneLandline?: string;
  whatsapp: string;
  email: string;
  address: {
    street: string;
    locality: string;
    city: string;
    region: string;
    postalCode?: string;
    country: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  priceRange?: string;
  openingHours?: string[];
  sameAs: string[];
  /** Official profiles not live yet; listed so the gaps stay visible. */
  pendingProfiles: Array<{ name: string; note: string }>;
  founder: { name: string; jobTitle: string };
  /** Outstation cities the site has route pages for. */
  routeCities: string[];
  serviceAreas: string[];
  description: string;
  foundingYear: number;
  logoPath: string;
};

export const businessIdentity: BusinessIdentity = {
  legalName: "Jinia Enterprise",
  brandName: "Jinia Enterprise",
  url: SITE_URL,
  phone: "+88 01716 633445",
  phoneSecondary: "+88 01976 633445",
  phoneLandline: "+88 02 989 9500",
  whatsapp: "8801716633445",
  email: "jiniaenterprise.com@gmail.com",
  address: {
    street: "40/2, Unicorn Plaza (Level-2), Shop-9,10",
    locality: "Gulshan",
    city: "Dhaka",
    region: "Dhaka Division",
    postalCode: "1212",
    country: "BD",
  },
  geo: {
    latitude: 23.7937,
    longitude: 90.4049,
  },
  // Lowest to highest published day rate (content/fleet-prices.ts).
  priceRange: "৳3,000–৳15,000 per day",
  openingHours: [
    "Mo-Th 09:00-20:00",
    "Sa-Su 09:00-20:00",
    "Fr 10:00-18:00",
  ],
  sameAs: [
    "https://www.facebook.com/jiniaenterprise",
    "https://www.linkedin.com/company/jiniaenterprise",
  ],
  // TODO(owner): add each URL to sameAs above once it exists and is verified.
  pendingProfiles: [
    { name: "Google Business Profile", note: "TODO(owner): the maps.app.goo.gl or g.page link once verified" },
    { name: "Bikroy shop", note: "TODO(owner): bikroy.com shop URL" },
    { name: "Facebook / LinkedIn", note: "TODO(owner): confirm both URLs above are the official pages" },
  ],
  // Named on the About page as founder and Managing Director.
  founder: { name: "MD. Shahab Uddin", jobTitle: "Managing Director" },
  routeCities: ["Cox's Bazar", "Sylhet", "Chattogram", "Sreemangal"],
  serviceAreas: [
    "Dhaka",
    "Gulshan",
    "Banani",
    "Uttara",
    "Dhanmondi",
    "Mirpur",
    "Mohammadpur",
    "Baridhara",
    "Bashundhara",
    "Hazrat Shahjalal International Airport",
    "Bangladesh",
  ],
  description:
    "Car and bus rental service in Dhaka offering chauffeur-driven daily, monthly, corporate, and airport transfer transport for businesses, embassies, and individuals.",
  foundingYear: 2014,
  logoPath: "/images/logo.png",
};

/**
 * The one response-time promise, used everywhere the site makes one.
 * TODO(owner): confirm this is true at night and on Fridays. If it is not,
 * change it here (e.g. "Reply within 2 hours, 8am–10pm") and every page follows.
 */
export const RESPONSE_PROMISE = {
  short: "Reply inside the hour",
  sentence: "A real person replies inside the hour.",
  bn: "এক ঘণ্টার মধ্যে উত্তর",
  bnSentence: "একজন মানুষ এক ঘণ্টার মধ্যে উত্তর দেবেন।",
} as const;

export function getBusinessIdentity(): BusinessIdentity {
  return businessIdentity;
}

export function getFormattedAddress(): string {
  const { address } = businessIdentity;
  return `${address.street}, ${address.locality}, ${address.city} ${address.postalCode ?? ""}, Bangladesh`.replace(
    /\s+/g,
    " ",
  ).trim();
}

/** Google Maps link for the office, used by the footer and contact page. */
export function getMapHref(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getFormattedAddress())}`;
}

export function getTelHref(phone = businessIdentity.phone): string {
  return `tel:${phone.replace(/[\s-]/g, "")}`;
}

export function getWhatsAppHref(message?: string): string {
  const base = `https://wa.me/${businessIdentity.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

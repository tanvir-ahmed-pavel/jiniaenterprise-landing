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
  serviceAreas: string[];
  description: string;
  foundingYear: number;
  logoPath: string;
};

export const businessIdentity: BusinessIdentity = {
  legalName: "Jinia Enterprise",
  brandName: "Jinia Enterprise",
  url: "https://jiniaenterprise.com",
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
  priceRange: "$$",
  openingHours: [
    "Mo-Th 09:00-20:00",
    "Sa-Su 09:00-20:00",
    "Fr 10:00-18:00",
  ],
  sameAs: [
    "https://facebook.com/jiniaenterprise",
    "https://linkedin.com/company/jiniaenterprise",
  ],
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

export function getTelHref(phone = businessIdentity.phone): string {
  return `tel:${phone.replace(/[\s-]/g, "")}`;
}

export function getWhatsAppHref(message?: string): string {
  const base = `https://wa.me/${businessIdentity.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

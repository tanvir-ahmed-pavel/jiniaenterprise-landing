import {
  businessIdentity,
  getFormattedAddress,
} from "@/lib/business/identity";
import { getCanonicalUrl, SITE_URL } from "@/lib/seo/canonical";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function getLocalBusinessSchema() {
  const { address, geo } = businessIdentity;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoRental"],
    "@id": `${SITE_URL}/#business`,
    name: businessIdentity.brandName,
    legalName: businessIdentity.legalName,
    description: businessIdentity.description,
    url: SITE_URL,
    telephone: businessIdentity.phone,
    email: businessIdentity.email,
    image: `${SITE_URL}${businessIdentity.logoPath}`,
    logo: `${SITE_URL}${businessIdentity.logoPath}`,
    priceRange: businessIdentity.priceRange,
    currenciesAccepted: "BDT",
    foundingDate: String(businessIdentity.foundingYear),
    founder: {
      "@type": "Person",
      name: businessIdentity.founder.name,
      jobTitle: businessIdentity.founder.jobTitle,
    },
    // The full street line, including the neighbourhood, exactly as printed
    // in the footer and on the contact page.
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.locality}`,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: geo
      ? {
          "@type": "GeoCoordinates",
          latitude: geo.latitude,
          longitude: geo.longitude,
        }
      : undefined,
    hasMap: geo
      ? `https://www.google.com/maps/search/?api=1&query=${geo.latitude},${geo.longitude}`
      : undefined,
    areaServed: [
      { "@type": "City", name: "Dhaka" },
      ...businessIdentity.routeCities.map((name) => ({ "@type": "City", name })),
      { "@type": "Airport", name: "Hazrat Shahjalal International Airport", iataCode: "DAC" },
      { "@type": "Country", name: "Bangladesh" },
    ],
    sameAs: businessIdentity.sameAs,
    // Office hours. The phone and WhatsApp line is 24/7 (contactPoint below).
    // TODO(owner): if the office itself is 24/7, replace with a single
    // Monday–Sunday 00:00–23:59 entry.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: businessIdentity.phone,
        contactType: "reservations",
        areaServed: "BD",
        availableLanguage: ["en", "bn"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
  };
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}

export function getServiceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType ?? name,
    url: getCanonicalUrl(path),
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: businessIdentity.brandName,
      telephone: businessIdentity.phone,
      address: getFormattedAddress(),
    },
    areaServed: {
      "@type": "City",
      name: "Dhaka",
    },
  };
}

export function getVehicleSchema({
  name,
  description,
  path,
  image,
  seats,
  category,
  dayRate,
}: {
  name: string;
  description: string;
  path: string;
  image?: string | null;
  seats?: number;
  category?: string;
  /** BDT per day; must equal the price shown on the page. Omitted = no Offer. */
  dayRate?: number | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${name} rental`,
    description,
    url: getCanonicalUrl(path),
    image: image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image}`
      : undefined,
    brand: {
      "@type": "Brand",
      name: name.split(" ")[0],
    },
    category: category,
    additionalProperty: seats
      ? [
          {
            "@type": "PropertyValue",
            name: "seats",
            value: seats,
          },
        ]
      : undefined,
    // An Offer without a price is an error in Google's Product report, so
    // the Offer only exists when the page shows a price.
    offers: dayRate
      ? {
          "@type": "Offer",
          price: dayRate,
          priceCurrency: "BDT",
          availability: "https://schema.org/InStock",
          url: getCanonicalUrl(path),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: dayRate,
            priceCurrency: "BDT",
            unitText: "DAY",
            unitCode: "DAY",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "DAY",
            },
          },
          seller: {
            "@type": "LocalBusiness",
            "@id": `${SITE_URL}/#business`,
            name: businessIdentity.brandName,
          },
        }
      : undefined,
  };
}

export function getArticleSchema({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: getCanonicalUrl(path),
    image: image
      ? image.startsWith("http")
        ? image
        : `${SITE_URL}${image}`
      : undefined,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: author ?? businessIdentity.brandName,
    },
    publisher: {
      "@type": "Organization",
      name: businessIdentity.brandName,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${businessIdentity.logoPath}`,
      },
    },
  };
}

export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: businessIdentity.brandName,
    description: businessIdentity.description,
    publisher: {
      "@id": `${SITE_URL}/#business`,
    },
    inLanguage: "en-BD",
  };
}

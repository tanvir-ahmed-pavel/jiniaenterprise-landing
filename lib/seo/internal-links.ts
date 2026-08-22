export type InternalLink = {
  href: string;
  label: string;
};

const HUB_LINKS: InternalLink[] = [
  { href: "/car-rental-dhaka", label: "Car rental Dhaka" },
  { href: "/car-rental-with-driver", label: "With driver" },
  { href: "/airport-car-rental", label: "Airport transfer" },
  { href: "/corporate-car-rental", label: "Corporate rental" },
  { href: "/monthly-car-rental", label: "Monthly rental" },
  { href: "/locations", label: "Locations" },
  { href: "/routes", label: "Routes" },
  { href: "/pricing", label: "Pricing" },
  { href: "/vehicles", label: "Fleet" },
  { href: "/booking", label: "Book now" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const PREFIX_LINKS: Array<{ prefix: string; links: InternalLink[] }> = [
  {
    prefix: "/airport",
    links: [
      { href: "/car-rental-dhaka", label: "Car rental Dhaka" },
      { href: "/car-rental-with-driver", label: "With driver" },
      { href: "/vehicles", label: "Fleet" },
      { href: "/booking", label: "Book airport transfer" },
    ],
  },
  {
    prefix: "/corporate",
    links: [
      { href: "/monthly-car-rental", label: "Monthly rental" },
      { href: "/car-rental-with-driver", label: "With driver" },
      { href: "/vehicles", label: "Fleet" },
      { href: "/contact", label: "Corporate desk" },
    ],
  },
  {
    prefix: "/monthly",
    links: [
      { href: "/corporate-car-rental", label: "Corporate rental" },
      { href: "/car-rental-with-driver", label: "With driver" },
      { href: "/vehicles", label: "Fleet" },
      { href: "/booking", label: "Request quote" },
    ],
  },
  {
    prefix: "/vehicles",
    links: [
      { href: "/car-rental-dhaka", label: "Car rental Dhaka" },
      { href: "/airport-car-rental", label: "Airport transfer" },
      { href: "/corporate-car-rental", label: "Corporate rental" },
      { href: "/booking", label: "Book a vehicle" },
    ],
  },
  {
    prefix: "/blog",
    links: [
      { href: "/car-rental-dhaka", label: "Car rental Dhaka" },
      { href: "/faq", label: "FAQ" },
      { href: "/services", label: "Services" },
      { href: "/booking", label: "Book now" },
    ],
  },
  {
    prefix: "/faq",
    links: [
      { href: "/car-rental-dhaka", label: "Car rental Dhaka" },
      { href: "/airport-car-rental", label: "Airport transfer" },
      { href: "/booking", label: "Book now" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    prefix: "/locations",
    links: [
      { href: "/car-rental-dhaka", label: "Car rental Dhaka" },
      { href: "/airport-car-rental", label: "Airport transfer" },
      { href: "/routes", label: "Routes" },
      { href: "/booking", label: "Book now" },
    ],
  },
  {
    prefix: "/routes",
    links: [
      { href: "/car-rental-bangladesh", label: "Bangladesh rental" },
      { href: "/car-rental-with-driver", label: "With driver" },
      { href: "/vehicles", label: "Fleet" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    prefix: "/pricing",
    links: [
      { href: "/vehicles", label: "Fleet" },
      { href: "/monthly-car-rental", label: "Monthly" },
      { href: "/policies", label: "Policies" },
      { href: "/booking", label: "Get a quote" },
    ],
  },
  {
    prefix: "/policies",
    links: [
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
      { href: "/glossary", label: "Glossary" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

/**
 * Return related hub links for internal linking, keyed by path prefix.
 * Excludes the current path from results.
 */
export function getRelatedLinks(path: string): InternalLink[] {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withoutTrailing =
    normalized.length > 1 ? normalized.replace(/\/$/, "") : normalized;

  const matched = PREFIX_LINKS.find(({ prefix }) =>
    withoutTrailing === prefix || withoutTrailing.startsWith(`${prefix}/`),
  );

  const candidates = matched?.links ?? HUB_LINKS;

  return candidates.filter((link) => link.href !== withoutTrailing).slice(0, 6);
}

import { businessIdentity as b } from "@/lib/business/identity";
import { SITE_URL } from "@/lib/seo/canonical";

export const dynamic = "force-static";

/**
 * llms.txt: a short, plain-language map of the site for AI assistants and
 * answer engines (https://llmstxt.org). Facts come from the business identity,
 * so they stay in step with the schema markup and the contact details.
 */
export function GET() {
  const address = `${b.address.street}, ${b.address.locality}, ${b.address.city}, ${b.address.region}, Bangladesh`;
  const hours = (b.openingHours ?? []).map((h) => `- ${h}`).join("\n");

  const body = `# ${b.brandName}

> ${b.description} Founded in ${b.foundingYear}. The desk answers on WhatsApp, phone and email, and every quote is a fixed price for the exact trip.

## Business facts

- Legal name: ${b.legalName}
- Website: ${SITE_URL}
- Phone: ${b.phone}${b.phoneSecondary ? ` or ${b.phoneSecondary}` : ""}
- WhatsApp: https://wa.me/${b.whatsapp}
- Email: ${b.email}
- Address: ${address}
- Office hours (Dhaka time):
${hours}
- Service areas: ${b.serviceAreas.join(", ")}
- Price range: ${b.priceRange ?? "not stated"}

## Services

- [Car rental in Dhaka with driver](${SITE_URL}/car-rental-dhaka): daily chauffeur-driven hire in Dhaka
- [Airport car rental](${SITE_URL}/airport-car-rental): pickups and drop-offs at Hazrat Shahjalal International Airport, with flight tracking
- [Corporate car rental](${SITE_URL}/corporate-car-rental): staff and executive transport, with one coordinator
- [Monthly car rental](${SITE_URL}/monthly-car-rental): a dedicated car and driver, billed monthly
- [Long-term car rental](${SITE_URL}/long-term-car-rental): contracts for longer periods
- [Car rental across Bangladesh](${SITE_URL}/car-rental-bangladesh): intercity and out-of-town trips
- [Services overview](${SITE_URL}/services)

## Fleet, prices and routes

- [Fleet](${SITE_URL}/vehicles): cars, SUVs, MPVs and microbuses, with seats and features
- [Pricing](${SITE_URL}/pricing): day and month rates
- [Routes](${SITE_URL}/routes): popular trips, including Dhaka to Cox's Bazar, Sylhet, Chattogram and Sreemangal
- [Locations](${SITE_URL}/locations): pickup areas in Dhaka
- [Policies](${SITE_URL}/policies): rental terms, cancellation and privacy

## Help and booking

- [Frequently asked questions](${SITE_URL}/faq)
- [Booking form](${SITE_URL}/booking): request a quote for a trip
- [Contact](${SITE_URL}/contact)
- [Reviews](${SITE_URL}/reviews)

## Journal

- [Guides and travel notes](${SITE_URL}/blog): how to get around Dhaka and Bangladesh by car

## For developers and agents

- [Agent discovery index](${SITE_URL}/.well-known/api-catalog): machine-readable API catalog (RFC 9727)
- [Blog publishing API](${SITE_URL}/openapi/blog-api.json): OpenAPI 3.1 description. Requires an API key.
- [Blog API guide](${SITE_URL}/docs/blog-api.md)
- [Access for agents](${SITE_URL}/auth.md): how access is provisioned
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

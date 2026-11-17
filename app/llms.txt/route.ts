import { businessIdentity as b } from "@/lib/business/identity";
import { SITE_URL } from "@/lib/seo/canonical";
import { createStaticClient } from "@/lib/supabase/static";

// Rebuild the car list hourly, so new and changed cars reach agents without a deploy.
export const revalidate = 3600;

/**
 * llms.txt: a short, plain-language map of the site for AI assistants and
 * answer engines (https://llmstxt.org). Facts come from the business identity,
 * so they stay in step with the schema markup and the contact details.
 */
export async function GET() {
  const address = `${b.address.street}, ${b.address.locality}, ${b.address.city}, ${b.address.region}, Bangladesh`;
  const hours = (b.openingHours ?? []).map((h) => `- ${h}`).join("\n");

  // Every active car, with its own page. A car without a published rate says so.
  type CarRow = { name: string; slug: string; seats: number; starting_price: number | null };
  let cars: CarRow[] = [];
  const supabase = createStaticClient();
  if (supabase) {
    const { data } = await supabase
      .from("vehicles")
      .select("name,slug,seats,starting_price")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    cars = (data as unknown as CarRow[]) ?? [];
  }
  const carLines = cars
    .map(
      (c) =>
        `- [${c.name} with driver](${SITE_URL}/vehicles/${c.slug}): ${c.seats} seats, ${
          c.starting_price ? `day rate from BDT ${c.starting_price}` : "rate on request"
        }`,
    )
    .join("\n");

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
- Payment methods: ${b.paymentMethods.join(", ")} (BDT)

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
${carLines || "- Cars are listed on the fleet page."}

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

- [Fleet data (JSON)](${SITE_URL}/api/vehicles): every active car with its rate, specs and page. Filters: min_seats, rental_type, max_day_rate_bdt. One car: /api/vehicles/{slug}
- [OpenAPI description](${SITE_URL}/openapi/public-api.json): the public fleet and booking request endpoints
- [MCP server card](${SITE_URL}/.well-known/mcp/server-card.json)
- [Booking and fleet tools (MCP)](${SITE_URL}/api/mcp): Model Context Protocol endpoint (Streamable HTTP, JSON-RPC over POST). Tools: search_vehicles, get_vehicle, create_booking_request
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

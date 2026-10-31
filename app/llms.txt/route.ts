import { businessIdentity, getFormattedAddress, RESPONSE_PROMISE, SITE_URL } from "@/lib/business/identity";
import { CITY_DAY_HOURS, PRICE_EXTRAS, fleetPrices, formatBdt, getFleetLabel } from "@/content/fleet-prices";

export const dynamic = "force-static";

/** /llms.txt: a plain summary for AI assistants, built from the site's own data. */
export function GET() {
  const priced = fleetPrices
    .filter((row) => row.dayRate !== null)
    .sort((a, b) => (a.dayRate ?? 0) - (b.dayRate ?? 0));

  const pages: Array<[string, string]> = [
    ["/car-rental-dhaka", "Car rental in Dhaka with driver"],
    ["/car-rental-with-driver", "How chauffeur-driven rental works"],
    ["/pricing", "Day rates for every vehicle and what changes a quote"],
    ["/vehicles", "The fleet: sedans, MPVs, SUVs, microbuses and a 29-seat bus"],
    ["/services/airport-transfer", "Dhaka airport (DAC) pickup and drop"],
    ["/monthly-car-rental", "Monthly car rental with driver"],
    ["/corporate-car-rental", "Corporate and embassy transport"],
    ["/routes/dhaka-to-coxs-bazar", "Dhaka to Cox's Bazar by car"],
    ["/policies/overtime-and-fuel", "Overtime, fuel, tolls and waiting"],
    ["/faq", "Frequently asked questions"],
    ["/contact", "Address, phone and WhatsApp"],
    ["/bn/car-rental-dhaka", "বাংলা: ঢাকায় ড্রাইভারসহ গাড়ি ভাড়া"],
  ];

  const body = `# ${businessIdentity.brandName}

> Chauffeur-driven car, microbus and bus rental in Dhaka, Bangladesh, since ${businessIdentity.foundingYear}. Every rental comes with a driver. Daily city hire, airport (DAC) transfers, monthly and corporate packages, weddings, and outstation trips across Bangladesh.

## Contact
- Phone and WhatsApp: ${businessIdentity.phone} (https://wa.me/${businessIdentity.whatsapp})
- Email: ${businessIdentity.email}
- Office: ${getFormattedAddress()}
- ${RESPONSE_PROMISE.sentence}
- Languages: English, Bangla

## Prices (from, per day, with driver, about ${CITY_DAY_HOURS} inside Dhaka city)
${priced.map((row) => `- ${getFleetLabel(row)}, ${row.seats} seats: from ${formatBdt(row.dayRate as number)}`).join("\n")}

${PRICE_EXTRAS} Monthly rates are quoted for the customer's hours and routes.

## Key pages
${pages.map(([path, label]) => `- [${label}](${SITE_URL}${path})`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

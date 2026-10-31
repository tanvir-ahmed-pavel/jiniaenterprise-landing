/**
 * Journal posts kept in code (the rest live in Supabase). They answer the
 * questions people actually ask, with figures pulled from the shared price
 * table and the route and airport pages, so they update when those do.
 */
import { CITY_DAY_HOURS, fleetPrices, formatBdt, getFleetLabel, getLowestDayRate } from "@/content/fleet-prices";
import { routeFacts } from "@/content/home-board";
import { RESPONSE_PROMISE, businessIdentity } from "@/lib/business/identity";

export type JournalPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

const from = (filter: Parameters<typeof getLowestDayRate>[0]) => formatBdt(getLowestDayRate(filter)?.dayRate ?? 0);
const priceLines = fleetPrices
  .filter((row) => row.dayRate !== null)
  .sort((a, b) => (a.dayRate ?? 0) - (b.dayRate ?? 0))
  .map((row) => `- **${getFleetLabel(row)}**, ${row.seats} seats: from ${formatBdt(row.dayRate as number)} per day`)
  .join("\n");
const cxb = routeFacts.find((r) => r.slug === "dhaka-to-coxs-bazar");

export const journalPosts: JournalPost[] = [
  {
    id: "journal-cost-2026",
    slug: "car-rental-with-driver-dhaka-cost-2026",
    title: "How much does it cost to rent a car with driver in Dhaka in 2026?",
    excerpt: `A full day with driver inside Dhaka starts from ${from((r) => r.kind === "Sedan")} for a sedan and ${from((r) => r.model === "Toyota Noah")} for a 7-seat Noah. Here is every published rate, and what changes the final price.`,
    author: businessIdentity.brandName,
    cover_image: null,
    is_published: true,
    created_at: "2026-10-31T09:00:00+06:00",
    updated_at: "2026-10-31T09:00:00+06:00",
    content: `The short answer: a full day with driver inside Dhaka city starts from **${from((r) => r.kind === "Sedan")}** for a sedan, **${from((r) => r.model === "Toyota Noah")}** for a 7-seat Toyota Noah and **${from((r) => r.model === "Toyota Hiace")}** for a 12-seat Toyota Hiace microbus. A "day" means about ${CITY_DAY_HOURS} of duty within the city.

## Every published day rate

${priceLines}

These are starting rates with driver, inside Dhaka city, for about ${CITY_DAY_HOURS}.

## What changes the final price

- **Hours.** Time beyond the duty window is billed at the overtime rate on your quote. Night hours may be priced differently.
- **Fuel.** Some city packages include fuel within a usage pattern; others bill it separately. Your written quote says which.
- **Tolls and parking.** Paid as incurred unless the quote says they are included.
- **Leaving Dhaka.** Outstation trips are quoted per trip. City day rates do not apply, because distance, fuel and the driver's nights away all change.
- **Dates.** Wedding season and multi-vehicle events book up early.

## Monthly rental

Monthly packages with a dedicated driver are priced on your daily hours and routes, not a day rate multiplied by 30. Send your typical schedule (for example, 9am to 7pm, Gulshan to Motijheel, six days a week) for a quote.

## Airport pickups

Airport transfers to and from Hazrat Shahjalal International Airport (DAC) are quoted per transfer. Share the flight number and the drop-off area.

## How to get today's price

1. WhatsApp or call ${businessIdentity.phone}.
2. Send the date, pickup point, number of passengers and the car you want.
3. ${RESPONSE_PROMISE.sentence}
4. Confirm the written quote before the day, so both sides share the same assumptions.`,
  },
  {
    id: "journal-coxs-bazar",
    slug: "dhaka-to-coxs-bazar-by-car",
    title: "Dhaka to Cox's Bazar by car: time, route, cost",
    excerpt: `By road, Dhaka to Cox's Bazar usually takes ${cxb?.driveTime.replace(" hrs", " hours") ?? "8–12 hours"} including rest stops. Which car to take, how one-way and round trips work, and what goes into the price.`,
    author: businessIdentity.brandName,
    cover_image: null,
    is_published: true,
    created_at: "2026-10-31T09:30:00+06:00",
    updated_at: "2026-10-31T09:30:00+06:00",
    content: `Dhaka to Cox's Bazar by car usually takes **${cxb?.driveTime.replace(" hrs", " hours") ?? "8–12 hours"}**, including sensible rest stops. Traffic leaving Dhaka, weather and highway works can stretch the day, so treat it as approximate.

## The route

Most trips run south-east from Dhaka on the Dhaka–Chattogram highway, past Cumilla and Feni, through Chattogram, and on down to Cox's Bazar. Leaving Dhaka early, before the city traffic builds, makes the biggest difference to the day.

## Which car

- **2–3 people, light bags:** a sedan such as the Toyota Allion or Premio.
- **A family:** a 7-seat Toyota Noah, for cabin space and luggage.
- **A bigger group or lots of luggage:** a 12-seat Toyota Hiace or Hyundai H1.
- **Comfort on the long legs:** a Land Cruiser Prado, when available.

Beach trips carry more luggage than people expect. Tell the desk how many suitcases you have and whether you carry camera or sports gear.

## One way or round trip

Both are common. One-way is a drop at your hotel. A round trip keeps the car and driver with you in Cox's Bazar and brings you back on an agreed date. For round trips, agree which days the car runs and where the driver stays overnight before you travel.

## What it costs

There is no fixed Cox's Bazar package price, because the vehicle, the number of days and the driver's nights away all change it. City day rates do not apply outside Dhaka. Send your dates, passenger count and vehicle preference on WhatsApp (${businessIdentity.phone}) and you get one written quote covering vehicle, driver, fuel assumptions and overnight terms.

## Before you go

1. Confirm departure time and any stops you want on the way.
2. Say if you prefer not to drive at night.
3. Keep a WhatsApp number that works on the road, so the driver can reach you.`,
  },
  {
    id: "journal-dac-meet-greet",
    slug: "dhaka-airport-pickup-meet-and-greet",
    title: "Airport pickup at Hazrat Shahjalal (DAC): how meet & greet works",
    excerpt: "What happens after you land at Dhaka airport with a pre-booked driver: the name sign, flight tracking, late-night arrivals and how long the drive into Gulshan takes.",
    author: businessIdentity.brandName,
    cover_image: null,
    is_published: true,
    created_at: "2026-10-31T10:00:00+06:00",
    updated_at: "2026-10-31T10:00:00+06:00",
    content: `A pre-booked pickup at Hazrat Shahjalal International Airport (DAC) means nobody has to arrange transport after a long flight. Here is exactly what happens.

## Before you fly

- Send your **flight number**, arrival time, number of passengers and bags, and your drop-off address in Dhaka.
- Ask for a **name sign** if you want one.
- Share a phone number that works on WhatsApp after landing.

With the flight number, the pickup is timed to your actual arrival, so a delay does not mean a missed pickup.

## After you land

1. Clear immigration and collect your baggage. Allow time for both on international arrivals.
2. Exit the arrivals hall.
3. Look for your driver holding a sign with your name. The exact meeting point follows airport access rules and is confirmed before your flight.
4. Walk with the driver to the car.
5. Drive straight to your address or hotel.

## How long the drive takes

Gulshan to the airport usually takes **20–40 minutes** in light traffic and can take **over an hour** at peak times. Uttara is closer; Dhanmondi and Mohammadpur are further. For departures, leave enough buffer for check-in.

## Late-night and early-morning flights

Pickups after midnight are arranged when booked ahead. For dawn or late-night flights, confirm the booking the day before.

## Which car

A sedan suits one to three people with light luggage. Families or several suitcases fit better in a Toyota Noah, Hyundai H1 or Toyota Hiace. A Toyota Alphard can be requested for VIP arrivals when available.

## Booking

WhatsApp or call ${businessIdentity.phone}, or use the booking form and choose "Airport transfer" to add your flight number. ${RESPONSE_PROMISE.sentence}`,
  },
];

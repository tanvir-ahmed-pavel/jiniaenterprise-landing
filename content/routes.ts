import type { FaqItem } from "@/lib/seo/types";

export type RoutePage = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  typicalDuration: string;
  vehicleSuggestions: string[];
  luggageNotes: string;
  oneWayVsRoundTrip: string;
  overnightPolicy: string;
  stopsConsiderations: string;
  bookingSteps: string[];
  faqs: FaqItem[];
};

/**
 * Outstation route pages — approximate durations only; no fabricated prices.
 */
export const routes: RoutePage[] = [
  {
    slug: "dhaka-to-coxs-bazar",
    title: "Dhaka to Cox’s Bazar Car Rental with Driver",
    description:
      "Chauffeur-driven car hire from Dhaka to Cox’s Bazar for families, groups, and corporate travel. Approximate journey times, vehicle suggestions, and booking steps from Jinia Enterprise.",
    answer:
      "Jinia Enterprise arranges chauffeur-driven outstation cars from Dhaka to Cox’s Bazar for leisure and work trips. Share passenger count, luggage, preferred departure time, and whether you need a one-way drop or multi-day stay with the vehicle.",
    typicalDuration:
      "Road time is often roughly 8–12 hours depending on route conditions, rest stops, and traffic leaving Dhaka—treat this as approximate, not a guarantee. Weather and highway works can extend the day.",
    vehicleSuggestions: [
      "Sedan (e.g. Allion / Premio class) for 2–3 passengers with light luggage",
      "Noah or similar MPV for families needing extra cabin space",
      "Hyundai H1 for larger groups or more luggage",
      "SUV (e.g. Prado / Pajero class when available) for comfort on longer legs",
      "Hiace for bigger groups traveling together",
    ],
    luggageNotes:
      "Cox’s Bazar trips often include beach bags and larger suitcases. Tell us suitcase count and whether you carry sports or camera gear so we suggest a vehicle with adequate boot or van space. Roof loading is not assumed unless discussed at booking.",
    oneWayVsRoundTrip:
      "One-way drop-off and round-trip (vehicle waits or returns on an agreed date) are both common. Round-trips need clear free-day / waiting and overnight expectations. One-way pricing and empty-return assumptions are confirmed in the quote—do not assume city day rates apply.",
    overnightPolicy:
      "For multi-day stays, driver overnight arrangements (rest, lodging expectations, and next-day duty hours) are agreed before travel. Typical practice is to confirm whether the vehicle remains with you daily or returns to Dhaka. Nothing is automatic—spell it out when you book.",
    stopsConsiderations:
      "Meal and rest stops are normal on this corridor. Optional sightseeing detours (e.g. toward coastal approach points) should be listed in advance; unplanned long detours may affect overtime and fuel terms. Night driving preferences should be stated up front.",
    bookingSteps: [
      "Share travel date, pickup area in Dhaka, passenger count, and luggage.",
      "Choose one-way vs round-trip / multi-day and preferred vehicle class.",
      "Confirm approximate departure window and any required stops.",
      "Receive a written quote covering vehicle, driver, fuel assumptions, overnight, and overtime rules.",
      "Confirm booking via call, WhatsApp, or the website form and keep the desk updated if plans change.",
    ],
    faqs: [
      {
        question: "How long does Dhaka to Cox’s Bazar take by car?",
        answer:
          "Many trips fall roughly in an 8–12 hour window including sensible rests, but conditions vary. Ask for a departure plan that fits daylight preferences; durations are approximate.",
      },
      {
        question: "Can the same car stay with us in Cox’s Bazar?",
        answer:
          "Yes, when arranged as a multi-day outstation hire. Confirm daily duty hours, overnight expectations for the driver, and whether local moves around Cox’s Bazar are included.",
      },
      {
        question: "Do you publish a fixed Cox’s Bazar package price?",
        answer:
          "Rates depend on vehicle, dates, one-way vs round-trip, fuel, and overnight terms. Request today’s quote with your itinerary rather than relying on a single public figure.",
      },
    ],
  },
  {
    slug: "dhaka-to-sylhet",
    title: "Dhaka to Sylhet Car Rental with Driver",
    description:
      "Hire a car with driver from Dhaka to Sylhet for family visits, tea-country trips, and corporate travel. Approximate timing and vehicle guidance from Jinia Enterprise.",
    answer:
      "Chauffeur-driven Dhaka–Sylhet outstation hire is available for airport-linked starts in Dhaka or hotel/residence pickups. Tell us if you continue toward Sreemangal or need the vehicle for local Sylhet moves after arrival.",
    typicalDuration:
      "Road journeys often take roughly 6–9 hours depending on highway conditions, weather in the northeast, and stops—approximate only. Landslides or heavy rain in season can slow mountain-adjacent stretches.",
    vehicleSuggestions: [
      "Comfortable sedan for couples or small business parties",
      "Noah / H1 for families with luggage",
      "SUV options when available for added comfort on longer highway legs",
      "Hiace for team or group travel",
    ],
    luggageNotes:
      "Sylhet trips frequently combine checked-size suitcases with shopping bags on the return. If you expect a heavy return load, choose an MPV or van class at booking rather than upgrading mid-trip.",
    oneWayVsRoundTrip:
      "One-way drops to Sylhet and round-trips with a fixed return date are both supported when scheduled. If you fly one way and drive the other, say so early so the quote matches the empty-leg reality.",
    overnightPolicy:
      "Overnight stays require agreement on driver rest and next-day start time. For wedding or multi-day family programs, share the event schedule so duty hours stay realistic and safe.",
    stopsConsiderations:
      "Common patterns include rest stops on the highway and optional tea-estate or shrine visits if pre-listed. Unscheduled long detours should be cleared with the desk because they affect hours and fuel assumptions.",
    bookingSteps: [
      "Provide pickup point in Dhaka, date, and preferred arrival window in Sylhet.",
      "State passenger/luggage count and vehicle preference.",
      "Clarify one-way, round-trip, or multi-day local use in Sylhet.",
      "Confirm fuel, overtime, and overnight terms on the quote.",
      "Book via phone, WhatsApp (+88 01716 633445), or the online form.",
    ],
    faqs: [
      {
        question: "Can we combine Sylhet with Sreemangal on one hire?",
        answer:
          "Yes, when planned as a multi-stop outstation itinerary. List the order of cities and nights so driving hours and overnight rules stay clear.",
      },
      {
        question: "Is night departure from Dhaka possible?",
        answer:
          "Night starts can be discussed, but safety and driver rest matter. Many travelers prefer early morning departures—confirm options with the operations desk.",
      },
      {
        question: "What should I share for a faster Sylhet quote?",
        answer:
          "Date, pickup area, passenger count, luggage, one-way vs return, and whether you need the car for local Sylhet days.",
      },
    ],
  },
  {
    slug: "dhaka-to-chattogram",
    title: "Dhaka to Chattogram (Chittagong) Car Rental with Driver",
    description:
      "Dhaka to Chattogram chauffeur-driven car rental for business, port-city visits, and family travel. Approximate journey guidance from Jinia Enterprise.",
    answer:
      "Jinia Enterprise provides chauffeur-driven cars for Dhaka–Chattogram highway trips used by corporate travelers, project teams, and families. Share whether you need a same-day return, overnight stay, or onward move toward Cox’s Bazar.",
    typicalDuration:
      "Many Dhaka–Chattogram road trips take roughly 6–9 hours depending on traffic exiting Dhaka, highway flow, and stops—approximate only. Peak departure windows from the capital can add significant delay.",
    vehicleSuggestions: [
      "Sedan for executive 1–3 passenger trips",
      "Premio / Allion class for routine business travel when available",
      "H1 or Noah for teams with equipment bags",
      "SUV for senior visitor comfort when available",
      "Hiace or coach options for larger delegations",
    ],
    luggageNotes:
      "Business trips may include sample cartons or tool cases. Mention bulky items early; a sedan boot may be insufficient, while an H1 or Hiace handles mixed passenger + cargo needs better.",
    oneWayVsRoundTrip:
      "Corporate users often book one-way with a separate return on another day, or a round-trip with meetings in between. Waiting charges and free hours in Chattogram must be defined on the quote if the vehicle stays with you.",
    overnightPolicy:
      "If the driver stays overnight in Chattogram, lodging/rest expectations and next-day duty start are confirmed before departure. Do not assume unlimited evening availability after a full highway day.",
    stopsConsiderations:
      "Factory or office stops on the way (e.g. along the corridor toward the port city) should be listed. Multiple long meetings on arrival may turn a “transfer” into a full duty day—price and hours should reflect that.",
    bookingSteps: [
      "Send travel date, Dhaka pickup, and Chattogram drop or hotel name.",
      "Note meeting locations if the car will wait or move locally.",
      "Select vehicle class based on headcount and cargo.",
      "Agree fuel, overtime, night, and overnight terms in writing.",
      "Confirm booking and share a reachable mobile for the travel day.",
    ],
    faqs: [
      {
        question: "Can I book Dhaka to Chattogram for same-day return?",
        answer:
          "Same-day returns are tiring and depend on meeting length and highway conditions. Discuss feasibility with the desk; multi-day plans are often more practical.",
      },
      {
        question: "Do you serve port or industrial area drops in Chattogram?",
        answer:
          "Destination pins inside the wider Chattogram area can be arranged when access rules allow. Share the exact gate or office address and any vehicle restrictions.",
      },
      {
        question: "Are rates the same as a Dhaka city day hire?",
        answer:
          "No. Outstation trips use different assumptions for distance, fuel, and driver time. Always request an outstation-specific quote.",
      },
    ],
  },
  {
    slug: "dhaka-to-sreemangal",
    title: "Dhaka to Sreemangal Car Rental with Driver",
    description:
      "Dhaka to Sreemangal car rental with driver for tea-garden visits and weekend trips. Approximate timing, vehicle tips, and booking guidance.",
    answer:
      "Chauffeur-driven hire from Dhaka to Sreemangal suits couples, families, and small groups visiting tea estates and nearby countryside stays. Tell us your resort or homestay pin and whether you want the car for local moves after arrival.",
    typicalDuration:
      "Road time is often roughly 4–7 hours depending on route, traffic leaving Dhaka, and rest stops—approximate only. Weekend peaks and weather can change the day length.",
    vehicleSuggestions: [
      "Sedan for 2–3 travelers with light bags",
      "Noah for families wanting cabin space and easier boarding",
      "Hyundai H1 for friends traveling together with luggage",
      "SUV when available for comfort on mixed road conditions",
    ],
    luggageNotes:
      "Weekend bags plus tea purchases on the return are common. If you plan market shopping, leave spare capacity in an MPV rather than filling a sedan on the outbound leg.",
    oneWayVsRoundTrip:
      "Popular patterns include Friday outbound / Sunday return with the same vehicle, or one-way drop if you continue to Sylhet by other means. Spell out return timing so driver duty days stay clear.",
    overnightPolicy:
      "For resort stays, confirm whether the driver and vehicle remain on call for local sightseeing or are released until the return date. Overnight rest for the driver is part of a safe multi-day plan and should be agreed explicitly.",
    stopsConsiderations:
      "Tea-estate visits, Lawachara-area approaches (where accessible), and café stops are best pre-listed. Narrow estate roads may limit larger buses—microbus vs sedan choice matters for last-mile access.",
    bookingSteps: [
      "Share dates, Dhaka pickup area, and Sreemangal stay location.",
      "Confirm passenger count and whether local day trips are needed.",
      "Choose vehicle class with luggage in mind.",
      "Review quote terms for fuel, waiting, and overnight.",
      "Book through call, WhatsApp, or the website and reconfirm the day before.",
    ],
    faqs: [
      {
        question: "Is Sreemangal suitable as a same-day round trip from Dhaka?",
        answer:
          "A same-day round trip is possible for some travelers but makes for a long day. Many guests prefer at least one night on site—ask the desk based on your must-see list.",
      },
      {
        question: "Can we add Sylhet after Sreemangal?",
        answer:
          "Yes, as a combined itinerary when driving hours and overnights are planned. Provide the night-by-night outline for an accurate quote.",
      },
      {
        question: "Do you guarantee a specific scenic route?",
        answer:
          "Drivers follow safe, practical routing for conditions that day. Scenic preferences can be noted, but road works or weather may require changes.",
      },
    ],
  },
];

export function getRouteBySlug(slug: string): RoutePage | undefined {
  return routes.find((route) => route.slug === slug);
}

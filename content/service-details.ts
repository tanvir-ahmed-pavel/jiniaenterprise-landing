import type { FaqItem } from "@/lib/seo/types";

export type ServiceDetailPage = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  whoFor: string;
  whatsIncluded: string[];
  howItWorks: string[];
  vehicleNotes: string;
  planningTips: string[];
  faqs: FaqItem[];
  relatedPaths: string[];
};

export const serviceDetails: ServiceDetailPage[] = [
  {
    slug: "airport-transfer",
    title: "Dhaka Airport Transfer (DAC) with Driver",
    description:
      "Hazrat Shahjalal International Airport (DAC) pickup and drop with chauffeur, flight-aware timing, and name signboard when arranged. Book with Jinia Enterprise.",
    answer:
      "Jinia Enterprise provides chauffeur-driven airport transfers to and from Hazrat Shahjalal International Airport. Share your flight number, passenger count, and drop-off area in Dhaka so the driver can plan meet & greet and a realistic route.",
    whoFor:
      "Arriving or departing passengers who want a pre-booked car instead of arranging transport after a long flight—families, corporate visitors, embassy guests, and residents heading to Gulshan, Banani, Uttara, Dhanmondi, and other served areas.",
    whatsIncluded: [
      "Chauffeur-driven vehicle suited to your headcount (subject to availability)",
      "Flight-aware scheduling when you share the flight number in advance",
      "Name signboard meet & greet when requested for arrivals",
      "Drop to your stated Dhaka address or hotel",
      "Coordination by phone / WhatsApp on the travel day",
    ],
    howItWorks: [
      "Send flight details, arrival/departure time, and destination or pickup address.",
      "Confirm vehicle class and luggage needs; receive a quote for that transfer.",
      "Driver tracks timing where flight info is provided and positions accordingly.",
      "On arrival, meet at the agreed point with name board when arranged.",
      "Proceed to your drop-off; keep the desk informed of major delays.",
    ],
    vehicleNotes:
      "Sedans suit light luggage for 1–3 passengers; Noah, H1, or Hiace options help when several suitcases or a family travel together. Luxury MPVs such as Alphard may be requested for VIP arrivals when available.",
    planningTips: [
      "Build buffer for immigration and baggage claim on international arrivals.",
      "Share a local contact number that works on WhatsApp after landing.",
      "List child seats or accessibility needs early—do not assume they are stocked on every car.",
      "For dawn or late-night flights, confirm the booking the day before.",
    ],
    faqs: [
      {
        question: "Do you track flights for DAC pickup?",
        answer:
          "When you provide the flight number in advance, scheduling accounts for typical arrival patterns. Always keep a reachable phone in case of diversion or long delay.",
      },
      {
        question: "Where does the driver meet arriving passengers?",
        answer:
          "Meet points follow airport access rules and your booking notes—commonly arrivals hall meet & greet with a name signboard when arranged. Exact instructions are confirmed before the flight.",
      },
      {
        question: "Can I book an airport transfer from Gulshan or Uttara?",
        answer:
          "Yes. Departures and arrivals are routinely arranged for Gulshan, Banani, Uttara, Baridhara, Bashundhara, Dhanmondi, and other served Dhaka areas.",
      },
    ],
    relatedPaths: [
      "/airport-car-rental",
      "/car-rental-dhaka",
      "/booking",
      "/vehicles",
    ],
  },
  {
    slug: "wedding-car-rental",
    title: "Wedding Car Rental in Dhaka with Driver",
    description:
      "Chauffeur-driven wedding and reception transport in Dhaka—bride/groom cars, guest microbuses, and timed venue moves. Request availability from Jinia Enterprise.",
    answer:
      "Wedding transport is arranged as chauffeur-driven hire timed to holud, nikah/reception, and guest shuttle legs. Share venue names, dressing-point addresses, headcount, and ceremony timeline so vehicles and drivers can be scheduled without rushing.",
    whoFor:
      "Couples and families who need reliable decorated or plain chauffeur cars for the wedding party, plus microbuses or coaches for guest groups moving between home, venue, and hotel.",
    whatsIncluded: [
      "Chauffeur-driven cars for principal family movements when booked",
      "Group vehicles (e.g. Hiace, larger coaches) for guest transfers subject to availability",
      "Timed pickup windows aligned to your ceremony schedule",
      "Coordination contact for the wedding-day point person",
    ],
    howItWorks: [
      "Send event date(s), venues, approximate guest vehicle needs, and VIP car preferences.",
      "Confirm how many vehicles, duty hours, and decoration expectations (if any).",
      "Receive a quote; decorations and overtime rules must be explicit.",
      "Share a day-of coordinator phone number and final timeline 24–48 hours prior.",
      "Drivers follow the agreed run sheet; major time shifts should be messaged early.",
    ],
    vehicleNotes:
      "Luxury MPVs and SUVs are often requested for the wedding couple when available; sedans and Noah/H1 classes support family movements; Hiace and AC coaches support guest groups. Availability on peak wedding dates books out—enquire early.",
    planningTips: [
      "Peak wedding evenings in Dhaka mean heavy traffic near popular venues—build buffer.",
      "If multiple neighborhoods are involved (e.g. Dhanmondi home, Gulshan venue), list the sequence.",
      "Clarify whether cars wait through the ceremony or return for a later exit.",
      "Guest shuttle loops need a clear loading point and a staff member directing passengers.",
    ],
    faqs: [
      {
        question: "Can cars be decorated for the wedding?",
        answer:
          "Decoration requests can be discussed at booking. Do not assume flowers or ribbons are included unless written into the confirmation.",
      },
      {
        question: "Do you provide multiple vehicles for one wedding?",
        answer:
          "Yes, subject to fleet availability. Many weddings combine one or two principal cars with guest microbuses—share the full list early.",
      },
      {
        question: "What happens if the ceremony runs late?",
        answer:
          "Overtime and extended waiting follow the terms on your quote. Tell the desk as soon as timings slip so drivers and later trips can adjust.",
      },
    ],
    relatedPaths: [
      "/services",
      "/vehicles",
      "/booking",
      "/contact",
    ],
  },
  {
    slug: "corporate-transport",
    title: "Corporate Transport & Staff Car Rental in Dhaka",
    description:
      "Corporate chauffeur services in Dhaka for meetings, visitor hosts, monthly commute cars, and embassy-style schedules. Serving companies since 2014.",
    answer:
      "Jinia Enterprise supports corporate and institutional transport with chauffeur-driven daily hire, visitor airport runs, and monthly vehicles when arranged. Billing and routing are scoped to your sites—Gulshan offices, factories outside the core, or multi-stop executive days.",
    whoFor:
      "Companies, NGOs, embassies, and project teams that need dependable drivers, predictable scheduling, and a single desk to call when itineraries change.",
    whatsIncluded: [
      "Professional chauffeurs for booked duty hours",
      "Vehicle classes from sedans to microbuses and coaches as available",
      "Airport meets for arriving executives when requested",
      "Monthly or long-term patterns with backup discussion where arranged",
      "Phone and WhatsApp coordination during service hours and travel days",
    ],
    howItWorks: [
      "Share company name, booker contact, cost-center needs, and typical routes.",
      "Choose on-demand daily hire vs monthly dedicated vehicle patterns.",
      "Approve quote terms: hours, overtime, fuel, night work, and invoice process.",
      "Send trip requests with passenger names and pickup pins.",
      "Review service after the first weeks and adjust vehicle class if needed.",
    ],
    vehicleNotes:
      "Allion/Premio-class sedans are common for executive city days; H1 and Hiace suit staff groups; Alphard and SUV classes are requested for senior visitors when available. Exact units depend on the calendar.",
    planningTips: [
      "Send weekly rosters for recurring pickups to reduce same-day scramble.",
      "Factory routes outside Dhaka should be flagged as outstation/out-of-zone.",
      "Security gate lists at offices should include vehicle and driver details when required.",
      "Keep a single approving manager for overtime to avoid disputes later.",
    ],
    faqs: [
      {
        question: "Can we get monthly invoices for corporate car rental?",
        answer:
          "Corporate billing arrangements are commonly discussed for ongoing accounts. Share your invoice requirements when opening the account so quotes and paperwork match.",
      },
      {
        question: "Do you serve embassy and NGO schedules?",
        answer:
          "Yes. Mission and NGO transport is a regular use case, including Baridhara and Gulshan pickups. Access rules at compounds must be shared in advance.",
      },
      {
        question: "Is a backup vehicle available if one breaks down?",
        answer:
          "Backup support can be arranged for corporate programs where agreed in advance. It is not automatic on every ad-hoc city booking—confirm when you negotiate the package.",
      },
    ],
    relatedPaths: [
      "/corporate-car-rental",
      "/monthly-car-rental",
      "/clients",
      "/booking",
    ],
  },
  {
    slug: "event-transport",
    title: "Event Transport & Group Shuttle Rental in Dhaka",
    description:
      "Microbus and AC bus rental with drivers for conferences, concerts, campus events, and corporate offsites in Dhaka. Coordinate group moves with Jinia Enterprise.",
    answer:
      "Event transport covers timed shuttles and group moves with chauffeur-driven Hiace microbuses and larger AC coaches when available. Share venue gates, guest headcount, and wave timings so loading stays orderly.",
    whoFor:
      "Event organizers, HR teams, universities, and agencies moving attendees between hotels, venues, and overflow parking without relying on ad-hoc rides.",
    whatsIncluded: [
      "Driver-operated microbuses and coaches subject to availability",
      "Run-of-show aligned pickup waves when you provide a schedule",
      "Agreed loading points and contact persons on site",
      "Coordination for staggered returns after the program ends",
    ],
    howItWorks: [
      "Send event date, venues, estimated headcount per wave, and hotel list if any.",
      "Select vehicle sizes (e.g. 14-seat Hiace vs larger coach) and number of units.",
      "Confirm duty start/end, waiting rules, and overtime in the quote.",
      "Appoint an on-site transport lead to release buses at each wave.",
      "Reconfirm final numbers the day before when possible.",
    ],
    vehicleNotes:
      "Toyota Hiace-class vehicles suit smaller groups; 42-seater AC coaches serve larger movements when booked. Mixing vehicle sizes is common when hotels are spread across Gulshan, Banani, and downtown.",
    planningTips: [
      "Venue security often requires vehicle registration lists—collect them early.",
      "Rain plans matter: covered loading points reduce delay.",
      "Do not overfill vehicles; count instruments, booth kits, or luggage separately.",
      "Post-event exits jam nearby roads—stage buses where marshals can find them.",
    ],
    faqs: [
      {
        question: "Can you run hotel-to-venue loops all day?",
        answer:
          "Shuttle loops can be designed when duty hours and wave counts are clear. Continuous looping without breaks still needs driver rest baked into the plan.",
      },
      {
        question: "How many guests fit in a Hiace?",
        answer:
          "Hiace configurations vary; plan using the seated capacity of the assigned vehicle (commonly up to the mid-teens) and leave margin for luggage. Confirm the exact unit on your booking.",
      },
      {
        question: "Do you provide on-board hosts or only drivers?",
        answer:
          "Standard service is chauffeur/driver operation. Passenger marshaling is usually handled by your event staff unless separately agreed.",
      },
    ],
    relatedPaths: [
      "/services",
      "/vehicles",
      "/corporate-car-rental",
      "/booking",
    ],
  },
  {
    slug: "tourist-transport",
    title: "Tourist Car Rental with Driver in Bangladesh",
    description:
      "Chauffeur-driven tourist transport from Dhaka for city sightseeing days and outstation trips such as Sylhet, Sreemangal, Chattogram, and Cox’s Bazar.",
    answer:
      "Tourist hire is chauffeur-driven: you bring the itinerary, we supply the car and driver. Popular patterns include a Dhaka city day plus outstation legs. We do not invent guided-tour claims—ask if you need transport only or help sequencing realistic driving hours.",
    whoFor:
      "Visitors, diaspora families, and small tour parties who want a private vehicle instead of piecing together multiple rides across Bangladesh’s highways.",
    whatsIncluded: [
      "Private chauffeur-driven vehicle for agreed dates",
      "City and outstation routing based on your stop list",
      "Help checking whether a same-day plan is realistic for driving time",
      "Airport start or end when combined with DAC transfer",
    ],
    howItWorks: [
      "List must-see stops and nights (Dhaka only vs multi-city).",
      "We suggest vehicle size from passenger and luggage count.",
      "Quote covers driving days, fuel assumptions, and overnight rules.",
      "You confirm hotels/pins; driver follows the agreed daily plan.",
      "Adjustments on the road should stay within safe duty hours.",
    ],
    vehicleNotes:
      "Noah and H1 are popular for families; sedans suit couples with light bags; SUVs add comfort on long legs when available; Hiace serves friend groups. Coaches are for larger touring parties booked as group transport.",
    planningTips: [
      "Highway days to Cox’s Bazar or Sylhet need early starts—do not stack too many stops.",
      "Share hotel pins in Google-friendly form to avoid hunting addresses.",
      "Photography stops are fine when brief; long unplanned detours affect overtime.",
      "Carry water and plan meal breaks; drivers appreciate stated rest stops.",
    ],
    faqs: [
      {
        question: "Is this a packaged sightseeing tour with a guide?",
        answer:
          "Our core offering is vehicle and driver. Licensed guiding is separate unless you arrange your own guide to ride along. Ask if you need transport-only confirmation on the quote.",
      },
      {
        question: "Which outstation destinations do you commonly drive?",
        answer:
          "Frequently requested routes include Cox’s Bazar, Sylhet, Chattogram, and Sreemangal, alongside other Bangladesh destinations when scheduled in advance.",
      },
      {
        question: "Can tourists book after landing at DAC?",
        answer:
          "Advance booking is strongly preferred. Same-day requests sometimes work subject to availability—message flight details as early as you can.",
      },
    ],
    relatedPaths: [
      "/car-rental-with-driver",
      "/airport-car-rental",
      "/vehicles",
      "/booking",
    ],
  },
];

export function getServiceDetailBySlug(
  slug: string,
): ServiceDetailPage | undefined {
  return serviceDetails.find((service) => service.slug === slug);
}

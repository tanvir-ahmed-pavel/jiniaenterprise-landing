import type { FaqItem } from "@/lib/seo/types";

export type LocationPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  answer: string;
  coverageNotes: string;
  landmarks: string[];
  pickupTips: string;
  airportNotes: string;
  popularTrips: string[];
  faqs: FaqItem[];
  relatedPaths: string[];
};

/**
 * Dhaka area pages — unique local detail only; no fabricated reviews or prices.
 * Base office: Gulshan Unicorn Plaza (founded 2014). Chauffeur-driven service.
 */
export const locations: LocationPage[] = [
  {
    slug: "gulshan",
    name: "Gulshan",
    title: "Car Rental in Gulshan, Dhaka with Driver",
    description:
      "Chauffeur-driven car rental from Gulshan and nearby diplomatic zones. Pickup near Unicorn Plaza, Gulshan Circle, and embassy roads. Request a quote from Jinia Enterprise.",
    answer:
      "Jinia Enterprise is based at Unicorn Plaza in Gulshan and provides chauffeur-driven car and bus rental across Gulshan-1 and Gulshan-2. Share your hotel, office, or residence address for a timed pickup and a quote matched to your itinerary.",
    coverageNotes:
      "Coverage is strongest around Gulshan Avenue, Gulshan Circle, and the diplomatic pocket toward Baridhara. Same-day city hire and airport transfers are routinely arranged from this area because the head office is on-site.",
    landmarks: [
      "Unicorn Plaza (Gulshan)",
      "Gulshan Circle / Gulshan Avenue",
      "Gulshan Lake Park edge roads",
      "Diplomatic Zone toward Baridhara",
      "Banani Link Road corridor",
    ],
    pickupTips:
      "For apartment or office pickups, share the building name, road number, and a nearby landmark (e.g. Gulshan Circle side). Drivers typically wait at the building gate or lobby drop-off unless security requires a specific bay.",
    airportNotes:
      "Travel time between Gulshan and Hazrat Shahjalal International Airport (DAC) is often about 20–40 minutes in light traffic and can exceed an hour in peak congestion—treat all times as approximate and build buffer for flight check-in.",
    popularTrips: [
      "Gulshan hotel or residence → DAC airport",
      "Full-day embassy / corporate meetings in Gulshan–Banani–Baridhara",
      "Gulshan → Uttara or Bashundhara office runs",
      "Outstation departures after morning pickup in Gulshan",
    ],
    faqs: [
      {
        question: "Where is Jinia Enterprise located in Gulshan?",
        answer:
          "The head office is at 40/2, Unicorn Plaza (Level-2), Shop-9,10, Gulshan, Dhaka 1212. Call +88 01716 633445 or WhatsApp to confirm pickup timing from your Gulshan address.",
      },
      {
        question: "Can I book a car for meetings only within Gulshan and Banani?",
        answer:
          "Yes. Half-day and full-day chauffeur packages are commonly used for clustered meetings along Gulshan Avenue, Banani, and Baridhara. Exact hours and overtime rules are confirmed at booking.",
      },
      {
        question: "How far is Gulshan from the airport for a transfer?",
        answer:
          "DAC is relatively close to Gulshan compared with many Dhaka neighborhoods, but traffic varies. Plan roughly 20–40 minutes in lighter periods and allow more time at rush hour—ask the desk to schedule with your flight in mind.",
      },
    ],
    relatedPaths: [
      "/car-rental-dhaka",
      "/airport-car-rental",
      "/corporate-car-rental",
      "/booking",
    ],
  },
  {
    slug: "banani",
    name: "Banani",
    title: "Car Rental in Banani, Dhaka with Driver",
    description:
      "Hire a car with driver in Banani for offices, hotels, and airport runs. Chauffeur service covering Banani Road 11, Kemal Ataturk Avenue, and nearby Gulshan links.",
    answer:
      "Jinia Enterprise offers chauffeur-driven rentals for Banani residences, co-working spaces, and hotels. Drivers are familiar with Banani’s one-ways and the short hop into Gulshan or toward Airport Road when you need a timed transfer.",
    coverageNotes:
      "Service focuses on Banani’s commercial strips, residential blocks off Road 11, and links via Kemal Ataturk Avenue toward Mohakhali and Gulshan. Useful for guests staying in Banani who need daytime city hire plus evening airport drops.",
    landmarks: [
      "Kemal Ataturk Avenue",
      "Banani Road 11",
      "Banani Graveyard area approaches",
      "Mohakhali–Banani connector roads",
      "Gulshan–Banani Lake crossing routes",
    ],
    pickupTips:
      "Banani buildings often have narrow approach lanes. Share the road number, house/flat number, and whether the car should wait on the main road or enter the compound. Morning office pickups work best with a 10–15 minute buffer for gate queues.",
    airportNotes:
      "Banani to DAC is often roughly 25–45 minutes depending on Airport Road congestion; evening peaks and rain can stretch this further. Approximate only—confirm departure time with the booking desk against your flight.",
    popularTrips: [
      "Banani hotel → DAC meet & greet return",
      "Banani office commute packages (monthly)",
      "Banani → Motijheel or Tejgaon meeting days",
      "Banani pickup for Cox’s Bazar or Sylhet outstation starts",
    ],
    faqs: [
      {
        question: "Do you pick up from Banani hotels and apartments?",
        answer:
          "Yes. Provide the hotel or building name, road number, and preferred waiting point. Chauffeur-driven sedans, SUVs, and MPVs can be assigned based on passenger count and luggage.",
      },
      {
        question: "Is Banani convenient for airport transfers?",
        answer:
          "Banani sits on a practical corridor toward Airport Road. Transfers are routinely arranged; build extra time during weekday peaks and ask for flight-aware scheduling.",
      },
      {
        question: "Can I keep a car for a full day based in Banani?",
        answer:
          "Full-day hire (typically about 10–12 hours) is available for Banani-centered itineraries. Share stops in advance so the quote reflects city vs outstation use.",
      },
    ],
    relatedPaths: [
      "/car-rental-with-driver",
      "/airport-car-rental",
      "/monthly-car-rental",
      "/vehicles",
    ],
  },
  {
    slug: "uttara",
    name: "Uttara",
    title: "Car Rental in Uttara, Dhaka with Driver",
    description:
      "Chauffeur-driven car rental in Uttara for sector pickups, airport transfers, and city trips toward Gulshan or Motijheel. Book with Jinia Enterprise.",
    answer:
      "Uttara guests and residents can book chauffeur-driven cars for sector-to-sector moves, DAC airport transfers, and full-day trips into central Dhaka. Tell us your sector, road, and flight or meeting times for a practical schedule.",
    coverageNotes:
      "Coverage includes Uttara sectors commonly used for residential and commercial stays, plus the airport approach corridors. Uttara is a natural base for early morning DAC departures and late-night arrivals when arranged in advance.",
    landmarks: [
      "Uttara Sector roads (residential & commercial)",
      "House Building / Azampur approaches",
      "Airport Road corridor from Uttara",
      "Diabari / Uttara lakeside approach roads",
      "Rajuk Uttara apartment zones",
    ],
    pickupTips:
      "Uttara addresses are sector-based—always include sector number, road, and plot/flat. For night arrivals, confirm the driver wait point (sector gate vs building lobby) and keep your phone reachable after landing.",
    airportNotes:
      "Uttara is among the closer Dhaka neighborhoods to DAC. Many transfers take roughly 15–30 minutes in lighter traffic, though checkpoints and peak arrivals can add time. Times are approximate; we schedule against your flight when you book ahead.",
    popularTrips: [
      "DAC arrival → Uttara residence or hotel",
      "Uttara → Gulshan / Banani business day",
      "Uttara monthly office commute into central Dhaka",
      "Uttara start for northern outstation routes",
    ],
    faqs: [
      {
        question: "Can you meet me at DAC and drop me in Uttara?",
        answer:
          "Yes. Airport meet & greet with name signboard can be arranged, then drop to your Uttara sector address. Share flight number and passenger count when requesting a quote.",
      },
      {
        question: "Do you cover all Uttara sectors?",
        answer:
          "We serve Uttara residential and commercial pickups across the commonly used sectors. Exact access depends on building security rules—share the full address so the driver can plan the approach.",
      },
      {
        question: "Is fuel included for Uttara–airport runs?",
        answer:
          "Fuel terms depend on the package. Confirm inclusion for short airport transfers vs full-day hire when you request today’s rate.",
      },
    ],
    relatedPaths: [
      "/airport-car-rental",
      "/car-rental-dhaka",
      "/booking",
      "/faq",
    ],
  },
  {
    slug: "dhanmondi",
    name: "Dhanmondi",
    title: "Car Rental in Dhanmondi, Dhaka with Driver",
    description:
      "Car rental with driver in Dhanmondi for lake-area residences, Satmasjid Road offices, and trips across Dhaka. Chauffeur service from Jinia Enterprise.",
    answer:
      "Jinia Enterprise provides chauffeur-driven rentals for Dhanmondi homes, clinics, and offices along Satmasjid Road and the lake perimeter. Useful when you need a driver who can handle school runs, hospital visits, and cross-city meetings in one day.",
    coverageNotes:
      "Service covers Dhanmondi’s residential roads, Satmasjid Road commercial stretch, and links toward Mohammadpur, Farmgate, and Gulshan. Afternoon traffic around the lake and road junctions is a common planning factor for timed appointments.",
    landmarks: [
      "Dhanmondi Lake",
      "Satmasjid Road",
      "Road 27 / popular residential blocks",
      "Rabindra Sarobar area approaches",
      "Science Lab / Elephant Road connectors",
    ],
    pickupTips:
      "Many Dhanmondi roads are one-way or congested near the lake. Share road number and a clear landmark. For morning pickups, allow extra time if you must cross toward Mohakhali or Gulshan before 10:00.",
    airportNotes:
      "Dhanmondi to DAC often takes roughly 45–75 minutes depending on route and traffic; peak hours and rain can be longer. Approximate only—depart earlier for international check-in and confirm the path with the desk.",
    popularTrips: [
      "Dhanmondi residence → DAC airport",
      "Full-day medical / clinic circuits in Dhanmondi–Mohammadpur",
      "Dhanmondi → Gulshan meeting days",
      "Family day hire with lake-area start and city shopping stops",
    ],
    faqs: [
      {
        question: "Can I book a sedan for daily use from Dhanmondi?",
        answer:
          "Daily and monthly chauffeur packages are available for Dhanmondi-based itineraries. Vehicle class (e.g. sedan vs MPV) depends on passengers and luggage—see the fleet page or ask the desk.",
      },
      {
        question: "How should I time an airport departure from Dhanmondi?",
        answer:
          "Because Dhanmondi sits farther from DAC than Gulshan or Uttara, build a generous buffer. Share your flight time and we will suggest a pickup window; treat travel durations as approximate.",
      },
      {
        question: "Do you handle multi-stop days starting in Dhanmondi?",
        answer:
          "Yes. Full-day city hire works well for multi-stop plans. List major stops when requesting a quote so overtime and route assumptions are clear.",
      },
    ],
    relatedPaths: [
      "/car-rental-with-driver",
      "/monthly-car-rental",
      "/vehicles",
      "/contact",
    ],
  },
  {
    slug: "mirpur",
    name: "Mirpur",
    title: "Car Rental in Mirpur, Dhaka with Driver",
    description:
      "Chauffeur-driven car hire in Mirpur for residential pickups, stadium-area trips, and transfers toward Airport Road or central Dhaka.",
    answer:
      "Residents and visitors in Mirpur can book chauffeur-driven cars for commute packages, group microbus needs, and airport transfers via the northern corridors. Share section/block details so the driver can navigate Mirpur’s dense residential grid.",
    coverageNotes:
      "Coverage includes Mirpur residential sections, commercial hubs near major markets, and routes linking toward Pallabi, Cantonment approaches, and Airport Road. Larger vehicles (Noah, H1, Hiace) are often requested for family or staff groups from Mirpur.",
    landmarks: [
      "Mirpur residential sections / blocks",
      "Sher-e-Bangla National Cricket Stadium approaches",
      "Mirpur 10 / commercial junctions",
      "Pallabi connector roads",
      "Routes toward Cantonment and Airport Road",
    ],
    pickupTips:
      "Mirpur addresses often use section and road numbers—include both, plus a market or mosque landmark if the plot is hard to find. For stadium event days, expect road restrictions and book earlier with a flexible wait point.",
    airportNotes:
      "Mirpur to DAC commonly runs about 30–55 minutes via northern links when traffic cooperates; match days and evening peaks vary widely. Approximate guidance only—ask for a flight-aware pickup time.",
    popularTrips: [
      "Mirpur home → DAC departure",
      "Staff shuttle-style group moves (microbus)",
      "Mirpur → Gulshan / Motijheel workdays",
      "Family outstation start from Mirpur",
    ],
    faqs: [
      {
        question: "Which vehicles work well for Mirpur family trips?",
        answer:
          "Sedans suit small parties; Noah, Hyundai H1, or Hiace options suit larger groups when available. Confirm seat count and luggage when you request a quote.",
      },
      {
        question: "Can I get a monthly driver package from Mirpur?",
        answer:
          "Monthly chauffeur-driven rental is available for commute patterns from Mirpur into other Dhaka zones. Share typical hours and destinations for a tailored quote.",
      },
      {
        question: "Do event days near the stadium affect pickup?",
        answer:
          "Yes. Match and rally days can close or slow nearby roads. Tell us if your trip coincides with a stadium event so we can plan an alternate approach.",
      },
    ],
    relatedPaths: [
      "/car-rental-dhaka",
      "/corporate-car-rental",
      "/vehicles",
      "/booking",
    ],
  },
  {
    slug: "mohammadpur",
    name: "Mohammadpur",
    title: "Car Rental in Mohammadpur, Dhaka with Driver",
    description:
      "Car rental with driver in Mohammadpur for townhall-area residences, Asad Gate links, and citywide chauffeur hire. Quote from Jinia Enterprise.",
    answer:
      "Jinia Enterprise serves Mohammadpur pickups for daily chauffeur hire, school and office runs, and transfers toward Dhanmondi, Farmgate, or the airport. Local road knowledge helps when navigating the dense residential lanes around Town Hall and Asad Gate approaches.",
    coverageNotes:
      "Coverage centers on Mohammadpur’s residential blocks, Town Hall commercial area, and connectors toward Dhanmondi and Shyamoli. Practical for families who want a driver for mixed city errands without self-driving in congestion.",
    landmarks: [
      "Mohammadpur Town Hall area",
      "Asad Gate approaches",
      "Japan Garden City / residential complexes",
      "Bosila / Beribadh edge corridors",
      "Shyamoli–Mohammadpur connectors",
    ],
    pickupTips:
      "Share building name or road plus a known junction (e.g. toward Asad Gate). Some compounds have limited turning space for larger vans—mention if you need an H1 or Hiace so the driver can plan the entry.",
    airportNotes:
      "Mohammadpur to DAC often takes roughly 50–80 minutes depending on route (via Farmgate/Mohakhali or other corridors) and traffic. Approximate only; international flights need an early buffer—confirm with the desk.",
    popularTrips: [
      "Mohammadpur residence → DAC",
      "School / clinic circuits with Dhanmondi stops",
      "Mohammadpur → Gulshan business meetings",
      "Weekend family day hire across west Dhaka",
    ],
    faqs: [
      {
        question: "Do you offer half-day hire from Mohammadpur?",
        answer:
          "Half-day and full-day chauffeur packages can be arranged. Exact hour definitions and overtime are confirmed when you book so expectations match the quote.",
      },
      {
        question: "Can a larger van pick up inside Mohammadpur lanes?",
        answer:
          "Often yes, but some lanes are tight. Tell us the vehicle preference and building access rules; we may suggest a nearby main-road wait point for microbuses.",
      },
      {
        question: "How do I get a quote for Mohammadpur service?",
        answer:
          "Call or WhatsApp +88 01716 633445, or use the booking form. Include pickup address, date, duration, and passenger count.",
      },
    ],
    relatedPaths: [
      "/car-rental-with-driver",
      "/airport-car-rental",
      "/faq",
      "/contact",
    ],
  },
  {
    slug: "baridhara",
    name: "Baridhara",
    title: "Car Rental in Baridhara, Dhaka with Driver",
    description:
      "Chauffeur and diplomatic-area car rental in Baridhara DOHS and diplomatic zone. Discreet, timed pickups for residences, missions, and airport transfers.",
    answer:
      "Baridhara and the adjacent diplomatic zone are a core service pocket for Jinia Enterprise, alongside nearby Gulshan. Chauffeur-driven sedans, luxury MPVs, and SUVs are commonly requested for residence-to-meeting moves and DAC transfers with advance notice.",
    coverageNotes:
      "Coverage includes Baridhara diplomatic roads, DOHS residential sectors, and short links into Gulshan and Banani. Security gate procedures are common—having passenger names and vehicle details ready speeds entry when hosts arrange clearance.",
    landmarks: [
      "Baridhara Diplomatic Zone",
      "Baridhara DOHS sectors",
      "Park Road / lake-edge approaches",
      "Links into Gulshan-2",
      "UN / mission office corridors (where publicly accessible)",
    ],
    pickupTips:
      "Many Baridhara addresses sit behind checkpoints. Share the exact plot/house number, host contact, and whether the car is cleared to enter. For VIP or embassy-related moves, book earlier and confirm vehicle type in writing.",
    airportNotes:
      "Baridhara to DAC is often roughly 25–45 minutes in moderate traffic via Airport Road corridors; peaks vary. Approximate guidance—coordinate pickup with flight time and any gate delays at the residence.",
    popularTrips: [
      "Baridhara residence → DAC meet & greet",
      "Diplomatic / NGO meeting circuits in Baridhara–Gulshan",
      "Airport arrival → Baridhara DOHS drop",
      "Executive day hire with Alphard or similar when available",
    ],
    faqs: [
      {
        question: "Do you serve embassy and NGO transport in Baridhara?",
        answer:
          "Yes. Corporate and mission-style chauffeur bookings are a regular use case. Share schedule, passenger count, and any compound access rules when requesting a quote.",
      },
      {
        question: "Which vehicles are typical for Baridhara VIP moves?",
        answer:
          "Sedans and premium MPVs/SUVs (such as Alphard or Prado when available) are often preferred. Availability depends on date—ask the desk for current options rather than assuming a specific unit.",
      },
      {
        question: "Can drivers wait inside diplomatic compounds?",
        answer:
          "Waiting rules depend on each compound’s security policy. We follow the host’s instructions—sometimes that means waiting at the gate rather than inside.",
      },
    ],
    relatedPaths: [
      "/corporate-car-rental",
      "/airport-car-rental",
      "/vehicles",
      "/booking",
    ],
  },
  {
    slug: "bashundhara",
    name: "Bashundhara",
    title: "Car Rental in Bashundhara, Dhaka with Driver",
    description:
      "Car rental with driver in Bashundhara Residential Area and nearby commercial blocks. Chauffeur hire for apartments, offices, and airport transfers.",
    answer:
      "Jinia Enterprise provides chauffeur-driven rentals for Bashundhara Residential Area (BRA) blocks, nearby offices, and trips toward Kuril, Airport Road, or Gulshan. Block and road numbers help drivers navigate the large planned grid efficiently.",
    coverageNotes:
      "Coverage spans Bashundhara residential blocks and adjacent commercial developments commonly used for apartments and offices. The area’s position toward the northeast makes it practical for combining home pickup with DAC transfers or northern outstation starts.",
    landmarks: [
      "Bashundhara Residential Area blocks",
      "Kuril Flyover / Airport Road approaches",
      "Jamuna Future Park approach roads",
      "300-ft / major arterial connectors",
      "Links toward Notun Bazar / Vatara corridors",
    ],
    pickupTips:
      "Always include block, road, and house/flat numbers—Bashundhara is large and similar-looking. For tower communities, note the gate name and whether visitors’ cars need prior entry permission.",
    airportNotes:
      "Bashundhara to DAC is often about 20–40 minutes via Kuril / Airport Road when traffic is moderate; flyover congestion and rain can extend this. Approximate only—share flight details for a safer pickup window.",
    popularTrips: [
      "Bashundhara apartment → DAC",
      "BRA → Gulshan / Banani office days",
      "Shopping or family day hire with Jamuna Future Park area stops",
      "Monthly commute packages from Bashundhara",
    ],
    faqs: [
      {
        question: "Can you pick up from Bashundhara apartment towers?",
        answer:
          "Yes. Provide block/road/flat details and gate instructions. Drivers will follow community security rules for waiting and entry.",
      },
      {
        question: "Is Bashundhara convenient for airport transfers?",
        answer:
          "Its northeast location is generally practical for DAC via Airport Road corridors. Still plan buffers for peak congestion and confirm timing with the booking desk.",
      },
      {
        question: "Do you offer monthly cars for Bashundhara residents?",
        answer:
          "Monthly chauffeur-driven packages can be arranged for commute and household use. Share typical routes and hours for an indicative quote.",
      },
    ],
    relatedPaths: [
      "/monthly-car-rental",
      "/airport-car-rental",
      "/car-rental-dhaka",
      "/vehicles",
    ],
  },
  {
    slug: "motijheel",
    name: "Motijheel",
    title: "Car Rental in Motijheel, Dhaka with Driver",
    description:
      "Chauffeur-driven car rental from Motijheel, Dhaka's main financial and government district. Pickups near Dilkusha and Bangladesh Bank, with quotes for meetings and airport transfers.",
    answer:
      "Motijheel is the commercial heart of Dhaka, home to banks, offices, and government buildings. Jinia Enterprise arranges timed pickups here for meetings, airport runs, and full-day hire. Share the office address and the time you need the car.",
    coverageNotes:
      "Coverage is strong for office pickups around Dilkusha, the Motijheel commercial area, and the roads toward Gulistan. Traffic is heavy at peak hours, so schedule meetings with a buffer.",
    landmarks: [
      "Dilkusha commercial area",
      "Bangladesh Bank head office area",
      "Dhaka Stock Exchange area",
      "Gulistan and the Motijheel roundabouts",
      "Shapla Chattar",
    ],
    pickupTips:
      "Give the office or building name, the road number, and the nearest junction. Drivers often wait at the building gate, and some offices need a set pickup point for security.",
    airportNotes:
      "Travel time from Motijheel to Hazrat Shahjalal International Airport (DAC) is often about 45 to 75 minutes, longer at peak hours. Plan a generous buffer for flight check-in.",
    popularTrips: [
      "Office to DAC airport transfer",
      "Half-day meetings across Motijheel and Gulshan",
      "Motijheel to Old Dhaka or Narayanganj day runs",
      "Outstation departures from a Motijheel office",
    ],
    faqs: [
      {
        question: "Can you pick up from a bank or office in Motijheel?",
        answer:
          "Yes. Share the building name, floor if known, and a landmark. We confirm the pickup point with you when the quote is made.",
      },
      {
        question: "How long from Motijheel to the airport?",
        answer:
          "Often 45 to 75 minutes, depending on traffic. Ask the desk to schedule the pickup with your flight time in mind.",
      },
      {
        question: "Do you offer half-day hire around Motijheel?",
        answer:
          "Yes, for meetings and errands. Half-day and full-day packages show the hours and overtime rules in the quote.",
      },
    ],
    relatedPaths: ["/car-rental-dhaka", "/airport-car-rental", "/corporate-car-rental", "/booking"],
  },
  {
    slug: "old-dhaka",
    name: "Old Dhaka",
    title: "Car Rental in Old Dhaka with Driver",
    description:
      "Chauffeur-driven car rental for Old Dhaka, including Sadarghat, Lalbagh Fort, and Ahsan Manzil. Pickup points on main roads, with notes on the narrow lanes.",
    answer:
      "Old Dhaka has narrow lanes and dense traffic, so most pickups happen on a main road rather than inside the old streets. Jinia Enterprise plans the route around the area and agrees the pickup point when you book.",
    coverageNotes:
      "Coverage is practical on the main roads serving Sadarghat, Lalbagh, and the approach to Narayanganj. Cars do not enter the narrowest lanes, so ask for the nearest main-road pickup.",
    landmarks: [
      "Sadarghat launch terminal",
      "Lalbagh Fort",
      "Ahsan Manzil",
      "Star Mosque (Tara Masjid)",
      "Chawk Bazar and the main shopping streets",
    ],
    pickupTips:
      "Choose a main-road pickup point, such as a named junction or a well-known landmark. Tell us if you carry heavy bags, because the last stretch may be on foot.",
    airportNotes:
      "Travel time from Old Dhaka to DAC is often 60 to 90 minutes or more, because the trip crosses much of the city. Start early for flights.",
    popularTrips: [
      "Heritage day tour: Lalbagh, Ahsan Manzil, and Sadarghat",
      "Sadarghat to a riverside launch or a Narayanganj run",
      "Old Dhaka to Gulshan or Banani business meetings",
      "Early airport transfer from a family home in Old Dhaka",
    ],
    faqs: [
      {
        question: "Can the car go inside the narrow lanes of Old Dhaka?",
        answer:
          "Usually not. Most visitors are picked up on a main road close to the area and walk the final stretch. We agree the point when booking.",
      },
      {
        question: "Is a heritage day tour possible with a driver?",
        answer:
          "Yes. Share the sites you want to see, and we plan the route and stops so the driver can wait where it is safe to park.",
      },
      {
        question: "How long does it take to reach the airport from Old Dhaka?",
        answer:
          "Often more than an hour in normal traffic. Plan an early start for flights.",
      },
    ],
    relatedPaths: ["/car-rental-dhaka", "/airport-car-rental", "/booking", "/vehicles"],
  },
  {
    slug: "tejgaon",
    name: "Tejgaon",
    title: "Car Rental in Tejgaon, Dhaka with Driver",
    description:
      "Chauffeur-driven car rental from Tejgaon, a business and industrial area close to the airport road. Pickups for offices, factories, and airport transfers.",
    answer:
      "Tejgaon is a busy business area on the way to the airport, with offices, factories, and media houses. Jinia Enterprise arranges timed pickups here for staff, visitors, and airport runs.",
    coverageNotes:
      "Coverage is strong around the Tejgaon industrial area, the Tejgaon link roads, and the Kawran Bazar side toward Farmgate. Staff transport and visitor runs are common here.",
    landmarks: [
      "Tejgaon industrial area",
      "Tejgaon link road",
      "Farmgate interchange",
      "Kawran Bazar",
      "The road toward the airport",
    ],
    pickupTips:
      "Share the office or factory gate, the building name, and the nearest junction. For factory pickups, tell us the shift times and the entry point so the driver can plan.",
    airportNotes:
      "From Tejgaon, the airport is often about 30 to 50 minutes in light traffic and longer at peak hours. Tejgaon is one of the closer business areas to DAC, but plan a buffer for the road.",
    popularTrips: [
      "Staff runs to and from a factory or office",
      "Visitor pickups from Tejgaon hotels and offices to DAC",
      "Half-day client visits across Tejgaon, Gulshan, and Banani",
      "Corporate transport on a monthly arrangement",
    ],
    faqs: [
      {
        question: "Do you handle staff transport from factories in Tejgaon?",
        answer:
          "Yes, on a monthly or fixed-route arrangement. Give us the shift times and entry points, and we quote the routes together.",
      },
      {
        question: "How close is Tejgaon to the airport?",
        answer:
          "Closer than many parts of Dhaka. Traffic still varies, so allow 30 to 50 minutes in normal conditions and more at peak times.",
      },
      {
        question: "Can a visitor be collected from a hotel near Tejgaon?",
        answer:
          "Yes. Share the hotel name, the room number if needed, and the flight time, and we arrange the pickup.",
      },
    ],
    relatedPaths: ["/corporate-car-rental", "/monthly-car-rental", "/airport-car-rental", "/booking"],
  },
  {
    slug: "mohakhali",
    name: "Mohakhali",
    title: "Car Rental in Mohakhali, Dhaka with Driver",
    description:
      "Chauffeur-driven car rental from Mohakhali, close to the bus terminal, Gulshan, and Banani. Pickups for airport runs, intercity departures, and office visits.",
    answer:
      "Mohakhali sits between Gulshan, Banani, and the main bus terminal. It is a practical pickup for airport runs and for travelers heading out of town. Share your address and the time for a timed quote.",
    coverageNotes:
      "Coverage is strong around the Mohakhali bus terminal, the flyover, and the roads to Banani and Gulshan. Intercity departures from here are common.",
    landmarks: [
      "Mohakhali bus terminal",
      "Mohakhali flyover",
      "Banani Road junction",
      "Gulshan side roads",
      "DOHS Mohakhali",
    ],
    pickupTips:
      "Mohakhali has heavy traffic around the flyover and the bus station. Tell us the nearest junction and any boarding point at the bus terminal, so the car meets you on the right side.",
    airportNotes:
      "Mohakhali to DAC is often about 35 to 55 minutes in light traffic, and longer at peak hours. It is a useful midpoint for early airport runs.",
    popularTrips: [
      "Mohakhali to DAC airport transfers",
      "Outstation departures for travelers arriving at the bus terminal",
      "Banani and Gulshan business meetings",
      "Full-day family hire across Dhaka",
    ],
    faqs: [
      {
        question: "Can you meet me at the Mohakhali bus terminal?",
        answer:
          "Yes. Tell us the gate or area you use, and we arrange the meeting point. Allow extra time for the crowds at the bus station.",
      },
      {
        question: "How long from Mohakhali to the airport?",
        answer:
          "Often 35 to 55 minutes in light traffic, and more at peak hours. Book with your flight time in mind.",
      },
      {
        question: "Is Mohakhali good for an intercity start?",
        answer:
          "It works well for a morning departure. Share your intended departure time, and we plan the route out of the city.",
      },
    ],
    relatedPaths: ["/airport-car-rental", "/routes", "/car-rental-dhaka", "/booking"],
  },
  {
    slug: "shahbagh",
    name: "Shahbagh",
    title: "Car Rental in Shahbagh, Dhaka with Driver",
    description:
      "Chauffeur-driven car rental from Shahbagh, near Dhaka University and the National Museum. Pickups for campus visits, research trips, and city day hire.",
    answer:
      "Shahbagh is the center of university and museum life in Dhaka. Jinia Enterprise arranges pickups for campus visits, research trips, and day hire. Share the campus gate or building and the time you need.",
    coverageNotes:
      "Coverage is strong around the Shahbagh intersection, the Dhaka University campus roads, and the links to Paltan and Motijheel. Expect traffic and crowding on weekdays.",
    landmarks: [
      "Shahbagh intersection",
      "Dhaka University campus gates",
      "National Museum",
      "Ramna area",
      "Links to Paltan and Motijheel",
    ],
    pickupTips:
      "Campus gates can be crowded and have restricted vehicle access. Tell us the gate or building name, and we confirm a safe pickup point with the driver.",
    airportNotes:
      "Shahbagh to DAC is often 60 to 80 minutes or more, depending on traffic. Start early for morning flights.",
    popularTrips: [
      "Campus visits and student or faculty transport",
      "Museum and heritage day trips across central Dhaka",
      "Research visits between Shahbagh and Motijheel",
      "Airport transfers with an early start",
    ],
    faqs: [
      {
        question: "Can you pick up students or faculty at a campus gate?",
        answer:
          "Yes, at a set point the driver can reach safely. Share the gate name and the time, and we confirm the point.",
      },
      {
        question: "Is Shahbagh busy at certain times?",
        answer:
          "Yes, especially on weekdays and during protests or events. Allow extra time, and ask the desk to plan the day with you.",
      },
      {
        question: "Can we visit the National Museum and other sites in one day?",
        answer:
          "Yes. List the places you want to see, and the driver plans the route and stops.",
      },
    ],
    relatedPaths: ["/car-rental-dhaka", "/airport-car-rental", "/booking", "/services"],
  },
  {
    slug: "farmgate",
    name: "Farmgate",
    title: "Car Rental in Farmgate, Dhaka with Driver",
    description:
      "Chauffeur-driven car rental from Farmgate, a central Dhaka junction between Tejgaon, Kawran Bazar, and Mohakhali. Pickups for offices, hotels, and airport runs.",
    answer:
      "Farmgate is a busy central junction, close to Tejgaon, Kawran Bazar, and the roads to Mohakhali and Gulshan. It is a practical pickup for hotel guests, office visitors, and airport trips.",
    coverageNotes:
      "Coverage is strong on the Farmgate interchange, the Kawran Bazar side roads, and the Tejgaon link. Traffic is heavy at the interchange, so pickups are usually set a short walk away.",
    landmarks: [
      "Farmgate interchange",
      "Kawran Bazar",
      "Tejgaon link road",
      "Hotels along the Farmgate road",
      "Mohakhali side roads",
    ],
    pickupTips:
      "Farmgate traffic can be heavy. Tell us the hotel or building name and the nearest side street, and the driver waits at the easiest safe point.",
    airportNotes:
      "Farmgate to DAC is often about 40 to 60 minutes in light traffic, and longer at peak hours. Build in a buffer for the interchange.",
    popularTrips: [
      "Hotel guests from Farmgate to DAC",
      "Office visits across Tejgaon and Kawran Bazar",
      "Half-day city hire from a central base",
      "Outstation departures with a morning pickup",
    ],
    faqs: [
      {
        question: "Is it easy to get picked up at Farmgate?",
        answer:
          "Yes, with a clear pickup point. The interchange is crowded, so we usually meet on a nearby side street. Give us the building name and we confirm.",
      },
      {
        question: "How long from Farmgate to the airport?",
        answer:
          "Often 40 to 60 minutes in light traffic. Plan more time at peak hours.",
      },
      {
        question: "Can we hire a car for a day from a Farmgate hotel?",
        answer:
          "Yes. Share the hotel and the day's plan, and we quote a day package with the hours and overtime rules.",
      },
    ],
    relatedPaths: ["/airport-car-rental", "/car-rental-dhaka", "/booking", "/corporate-car-rental"],
  },
  {
    slug: "badda",
    name: "Badda",
    title: "Car Rental in Badda, Dhaka with Driver",
    description:
      "Chauffeur-driven car rental from Badda and Merul Badda, east of Gulshan and close to the Dhaka-Chattogram highway. Pickups for homes, offices, and airport transfers.",
    answer:
      "Badda sits east of Gulshan, with residential and office areas along the roads toward Merul Badda and the highway. Jinia Enterprise arranges timed pickups, airport transfers, and outstation departures from here.",
    coverageNotes:
      "Coverage is practical across Badda, Merul Badda, and the roads toward Gulshan and Rampura. Outstation departures on the Chattogram highway are common from this side of the city.",
    landmarks: [
      "Merul Badda",
      "Badda main road",
      "Gulshan link roads",
      "Rampura side roads",
      "Access to the Dhaka-Chattogram highway",
    ],
    pickupTips:
      "Share the house or building name, the road number, and a landmark. Narrow residential roads may need a pickup at the main road, and we agree that when booking.",
    airportNotes:
      "Badda to DAC is often about 45 to 70 minutes in light traffic, and longer at peak hours. Early departures avoid the worst of the traffic.",
    popularTrips: [
      "Home to DAC airport transfers",
      "Badda to Gulshan or Banani office runs",
      "Outstation departures toward Chattogram, Sylhet, or Cox's Bazar",
      "Full-day family hire across Dhaka",
    ],
    faqs: [
      {
        question: "Can you pick up from a residential road in Badda?",
        answer:
          "Usually yes, but narrow roads sometimes need a pickup at the main road. Tell us the house and road number, and we agree the point.",
      },
      {
        question: "How long from Badda to the airport?",
        answer:
          "Often 45 to 70 minutes in light traffic. Book the pickup with your flight in mind.",
      },
      {
        question: "Is Badda a good start for outstation trips?",
        answer:
          "It is convenient for trips toward Chattogram and the east. Share your departure time so the route and quote are planned.",
      },
    ],
    relatedPaths: ["/airport-car-rental", "/routes", "/car-rental-dhaka", "/booking"],
  },
];

export function getLocationBySlug(slug: string): LocationPage | undefined {
  return locations.find((location) => location.slug === slug);
}

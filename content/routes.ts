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
  {
    slug: "dhaka-to-mymensingh",
    title: "Dhaka to Mymensingh Car Rental with Driver",
    description:
      "Chauffeur-driven car hire from Dhaka to Mymensingh for family visits, campus trips, and day or overnight stays. Approximate journey times, vehicle suggestions, and booking steps.",
    answer:
      "Mymensingh is one of the closest outstation trips from Dhaka, so it works as a day trip or a single overnight stay. Share your pickup area, passenger count, and whether you need the car back the same day.",
    typicalDuration:
      "Road time is often roughly 3 to 5 hours each way, depending on traffic leaving Dhaka and the bridge crossing. Treat this as approximate, not a guarantee.",
    vehicleSuggestions: [
      "Sedan for 1 to 3 passengers on a short day trip",
      "Noah or similar MPV for families",
      "SUV for comfort on mixed road surfaces",
      "Hyundai H1 for groups of up to 11",
    ],
    luggageNotes:
      "Most Mymensingh trips carry a few bags and gifts. Tell us the count so the boot or van space matches the group.",
    oneWayVsRoundTrip:
      "Round trips are the common pattern, either the same day or with one night in town. One-way drops are possible; the quote confirms how the return is priced.",
    overnightPolicy:
      "If the car stays overnight in Mymensingh, agree in advance whether the driver rests locally or returns to Dhaka, and whether the vehicle stays on call the next day.",
    stopsConsiderations:
      "Tea and meal stops are normal. Ask for any visits to campuses, markets, or family homes to be listed before departure so the day's hours are clear.",
    bookingSteps: [
      "Share travel date, pickup area in Dhaka, and passenger count.",
      "Choose a day trip or an overnight stay.",
      "Pick a vehicle class that fits the group and luggage.",
      "Receive a written quote covering hours, fuel, and overtime.",
      "Confirm by call, WhatsApp, or the website form.",
    ],
    faqs: [
      {
        question: "How long does a day trip from Dhaka to Mymensingh take?",
        answer:
          "Many guests complete the round trip in one long day, but the total depends on time spent in town and traffic. Share your timings so the desk can plan a realistic schedule.",
      },
      {
        question: "Can we visit more than one place in Mymensingh?",
        answer:
          "Yes. List the places in advance so the driver can plan the route and hours. Extra stops are covered in the quote.",
      },
      {
        question: "Is Mymensingh a same-day trip for a family?",
        answer:
          "It can be, with an early start. For a relaxed visit with several stops, an overnight stay usually suits better.",
      },
    ],
  },
  {
    slug: "dhaka-to-rajshahi",
    title: "Dhaka to Rajshahi Car Rental with Driver",
    description:
      "Chauffeur-driven car hire from Dhaka to Rajshahi for business trips, family visits, and university travel. Approximate journey times, vehicle suggestions, and booking steps.",
    answer:
      "Rajshahi is a long outstation trip, usually booked as a round trip with an overnight stay or as a one-way drop. Share your dates, passenger count, and whether the car should wait in town.",
    typicalDuration:
      "Road time is often roughly 6 to 8 hours each way, with the Padma Bridge route common from Dhaka. Traffic, crossings, and rest stops change the total. Treat this as approximate.",
    vehicleSuggestions: [
      "Sedan for business travel with light luggage",
      "SUV for comfort on the longer legs",
      "Noah or Alphard-class MPV for families",
      "Hyundai H1 for groups with more luggage",
    ],
    luggageNotes:
      "Long trips need room for overnight bags and any gifts. Tell us the suitcase count so the vehicle has enough boot or van space.",
    oneWayVsRoundTrip:
      "Most Rajshahi trips are round trips with one or more nights. One-way drops are possible, but the driver's return is priced in the quote.",
    overnightPolicy:
      "Agree in advance whether the driver rests in Rajshahi and whether the vehicle is on call during your stay. Multi-day trips need clear duty hours for the driver.",
    stopsConsiderations:
      "Plan meal and rest stops on the road. If you want to stop at the Padma Bridge or along the river, list it when booking so the timing stays realistic.",
    bookingSteps: [
      "Share dates, Dhaka pickup area, and passenger count.",
      "Confirm the Rajshahi plan: day trip, overnight, or one-way.",
      "Choose a vehicle that suits the group and luggage.",
      "Review the written quote for fuel, waiting, and overnight terms.",
      "Confirm by call, WhatsApp, or the website form.",
    ],
    faqs: [
      {
        question: "How long does Dhaka to Rajshahi take by car?",
        answer:
          "Often around 6 to 8 hours each way, but it varies with traffic, crossings, and rest stops. Ask for a departure time that suits your plans.",
      },
      {
        question: "Can the car stay with us in Rajshahi?",
        answer:
          "Yes, for a stay of one or more days. Confirm the daily hours and overnight arrangements when booking.",
      },
      {
        question: "Is a same-day return to Dhaka realistic?",
        answer:
          "It is a very long day. Most guests prefer at least one night in Rajshahi, so ask the desk to plan the schedule with you.",
      },
    ],
  },
  {
    slug: "dhaka-to-khulna",
    title: "Dhaka to Khulna Car Rental with Driver",
    description:
      "Chauffeur-driven car hire from Dhaka to Khulna for business, family travel, and trips toward the Sundarbans. Approximate journey times, vehicle choice, and booking steps.",
    answer:
      "Khulna is a long outstation trip, often booked as a round trip with at least one overnight stay. Many guests continue toward Mongla for the Sundarbans, which we can plan with you.",
    typicalDuration:
      "Road time is often roughly 7 to 9 hours each way via the Padma Bridge, depending on traffic and stops. Trips onward to Mongla add time. Treat these figures as approximate.",
    vehicleSuggestions: [
      "SUV for comfort and luggage on a long route",
      "Noah or Alphard-class MPV for families",
      "Sedan for light business travel",
      "Hyundai H1 for group travel",
    ],
    luggageNotes:
      "Trips toward the Sundarbans often carry extra bags and supplies. Tell us the count, and whether you carry any equipment, so we suggest enough space.",
    oneWayVsRoundTrip:
      "Round trips with at least one overnight are the usual pattern. One-way drops and onward runs to Mongla are quoted separately, because the driver and vehicle must return.",
    overnightPolicy:
      "Confirm in advance where the driver rests, whether the car stays with you in Khulna, and how the return is handled. Long trips need clear duty hours.",
    stopsConsiderations:
      "Plan rest and meal stops along the route. For Mongla or Sundarbans visits, share the boat and launch timings in advance so the driver can plan the wait.",
    bookingSteps: [
      "Share dates, Dhaka pickup area, and passenger count.",
      "Confirm the destination: Khulna only, or onward to Mongla.",
      "Choose a vehicle that suits the group and luggage.",
      "Review the written quote for fuel, waiting, and overnight terms.",
      "Confirm by call, WhatsApp, or the website form.",
    ],
    faqs: [
      {
        question: "How long does Dhaka to Khulna take by car?",
        answer:
          "Often around 7 to 9 hours each way, depending on traffic, bridge crossings, and stops. Treat this as an estimate and plan a full day.",
      },
      {
        question: "Can you take us onward to Mongla for the Sundarbans?",
        answer:
          "We can plan that as part of the itinerary. The quote shows the extra distance, the overnight, and the driver's return.",
      },
      {
        question: "Is a same-day trip possible?",
        answer:
          "A same-day round trip is very long. Most guests stay at least one night, which keeps the driver's hours safe and the day relaxed.",
      },
    ],
  },
  {
    slug: "dhaka-to-barishal",
    title: "Dhaka to Barishal Car Rental with Driver",
    description:
      "Chauffeur-driven car hire from Dhaka to Barishal for family visits, business trips, and onward travel to the south. Journey notes, vehicle suggestions, and booking steps.",
    answer:
      "Barishal is a long outstation trip that many guests book as a round trip with one or two nights. Share your dates and passenger count, and tell us about any stops on the way.",
    typicalDuration:
      "Road time is often roughly 6 to 8 hours each way via the Padma Bridge route. River crossings and traffic can add waiting time. Treat these figures as approximate.",
    vehicleSuggestions: [
      "Sedan for 1 to 3 passengers with light luggage",
      "SUV for comfort on the longer stretches",
      "Noah or Alphard-class MPV for families",
      "Hyundai H1 for larger groups",
    ],
    luggageNotes:
      "Family trips often carry gifts and extra bags. Give us the count so the vehicle fits the luggage without a last-minute change.",
    oneWayVsRoundTrip:
      "Round trips with one or two nights are common. One-way drops are possible, and the driver's return is part of the quote.",
    overnightPolicy:
      "Confirm where the driver rests in Barishal and whether the car is on call during the stay. Agree the next-day duty hours before you travel.",
    stopsConsiderations:
      "Plan meal stops and any crossing waits on the road. Detours toward the coast should be listed in advance, since they change the hours and fuel.",
    bookingSteps: [
      "Share dates, Dhaka pickup area, and passenger count.",
      "Choose a day trip, an overnight stay, or a one-way drop.",
      "Pick a vehicle class that fits the group and luggage.",
      "Review the written quote for fuel, waiting, and overnight terms.",
      "Confirm by call, WhatsApp, or the website form.",
    ],
    faqs: [
      {
        question: "How long does Dhaka to Barishal take by car?",
        answer:
          "Commonly around 6 to 8 hours each way. Crossings and traffic can add time, so ask for a departure window that leaves room.",
      },
      {
        question: "Can the car stay with us in Barishal for several days?",
        answer:
          "Yes. Agree the daily hours and overnight arrangements in the quote, and confirm the return date.",
      },
      {
        question: "Do you arrange trips from Barishal toward Patuakhali or Kuakata?",
        answer:
          "Yes, as a separate itinerary. Give us the places and nights so the driving plan and fuel can be quoted.",
      },
    ],
  },
  {
    slug: "dhaka-to-bogura",
    title: "Dhaka to Bogura Car Rental with Driver",
    description:
      "Chauffeur-driven car hire from Dhaka to Bogura, a gateway to Mahasthangarh and northern Bangladesh. Approximate journey times, vehicle suggestions, and booking steps.",
    answer:
      "Bogura is a common stop on the way north and a base for Mahasthangarh. Most guests book a round trip with an overnight stay, or a one-way drop for onward travel.",
    typicalDuration:
      "Road time is often roughly 5 to 7 hours each way via the Bangabandhu (Jamuna) Bridge, depending on traffic and stops. Treat these times as approximate.",
    vehicleSuggestions: [
      "Sedan for business travel",
      "SUV for comfort on the longer legs",
      "Noah or Alphard-class MPV for families",
      "Hyundai H1 for groups",
    ],
    luggageNotes:
      "Family trips north often carry more bags than a city hire. Tell us the suitcase count so the vehicle has enough boot or van space.",
    oneWayVsRoundTrip:
      "Round trips with one night are the usual pattern. One-way drops are also possible, and the quote covers how the return is handled.",
    overnightPolicy:
      "Confirm the driver's rest arrangements and whether the vehicle stays on call in Bogura. Multi-day visits need clear hours.",
    stopsConsiderations:
      "Meal and rest stops are normal on this route. Visits to Mahasthangarh or other sites should be listed in advance so the day plan works.",
    bookingSteps: [
      "Share dates, Dhaka pickup area, and passenger count.",
      "Confirm the Bogura plan: day trip, overnight, or one-way.",
      "Choose a vehicle that suits the group and luggage.",
      "Review the written quote for fuel, waiting, and overnight terms.",
      "Confirm by call, WhatsApp, or the website form.",
    ],
    faqs: [
      {
        question: "How long does Dhaka to Bogura take by car?",
        answer:
          "Often around 5 to 7 hours each way. The bridge crossing and traffic change the time, so leave a margin.",
      },
      {
        question: "Can you take us to Mahasthangarh?",
        answer:
          "Yes, as part of the itinerary. Mention it when booking so the day and the return time are planned together.",
      },
      {
        question: "Is it a long day trip from Dhaka?",
        answer:
          "A same-day round trip is very long. An overnight in Bogura is more comfortable for most guests.",
      },
    ],
  },
  {
    slug: "dhaka-to-rangamati",
    title: "Dhaka to Rangamati Car Rental with Driver",
    description:
      "Chauffeur-driven car hire from Dhaka to Rangamati and the Kaptai lake area in the Chattogram Hill Tracts. Road notes, journey times, and booking steps from Jinia Enterprise.",
    answer:
      "Rangamati is a long hill-country trip, usually booked as a round trip with two or more nights. Hill roads are slower and more tiring than the plains, so plan a generous schedule.",
    typicalDuration:
      "Road time is often roughly 9 to 12 hours each way via Chattogram and the hill roads, depending on traffic, road works, and rest stops. Treat this as approximate and build in a buffer.",
    vehicleSuggestions: [
      "SUV for hill roads and luggage",
      "Noah or Alphard-class MPV for families",
      "Hyundai H1 for groups",
      "Sedans are possible, but SUVs are more comfortable on steep stretches",
    ],
    luggageNotes:
      "Hill trips carry hiking gear, cameras, and rain protection. Tell us about any equipment so we choose a vehicle with enough space.",
    oneWayVsRoundTrip:
      "Multi-day round trips are the usual pattern. One-way drops are possible, but the driver's return is priced separately.",
    overnightPolicy:
      "Hill-area nights need clear rules: where the driver rests, whether the car stays with you, and how daily duty hours stay within safe limits.",
    stopsConsiderations:
      "List scenic stops along the lake and hill roads in advance. Avoid planning the drive after dark, and tell us early if you need a night drive.",
    bookingSteps: [
      "Share dates, Dhaka pickup area, and passenger count.",
      "Confirm the route: Rangamati only, or combined with other hill districts.",
      "Choose a vehicle that handles hill roads and luggage.",
      "Review the written quote for fuel, waiting, and overnight terms.",
      "Confirm by call, WhatsApp, or the website form, and ask about current road conditions.",
    ],
    faqs: [
      {
        question: "Is Rangamati a day trip from Dhaka?",
        answer:
          "Not realistically. The road is long and winding, so an overnight or longer stay is the usual plan.",
      },
      {
        question: "Are the hill roads suitable for a chauffeur-driven car?",
        answer:
          "Drivers take hill roads at a safe pace and follow conditions on the day. Road works and weather can change the route, so ask the desk about current conditions before you travel.",
      },
      {
        question: "Can we include Bandarban in the same trip?",
        answer:
          "Yes, as a combined itinerary. Give us the nights per place so the driving hours and the quote are accurate.",
      },
    ],
  },
  {
    slug: "dhaka-to-bandarban",
    title: "Dhaka to Bandarban Car Rental with Driver",
    description:
      "Chauffeur-driven car hire from Dhaka to Bandarban in the Chattogram Hill Tracts. Approximate journey times, vehicles for hill roads, and booking steps.",
    answer:
      "Bandarban is a hill-country destination reached through Chattogram. Most guests book a round trip with overnight stays. Hill roads are slower, so share your dates early.",
    typicalDuration:
      "Road time is often roughly 8 to 11 hours each way through Chattogram, depending on traffic and hill-road conditions. Treat these figures as approximate.",
    vehicleSuggestions: [
      "SUV for hill-road comfort and luggage",
      "Noah or Alphard-class MPV for families",
      "Hyundai H1 for groups",
      "Sedans are possible on the main roads",
    ],
    luggageNotes:
      "Trekking and camping gear needs space. Tell us the count, and any bulky equipment, when booking.",
    oneWayVsRoundTrip:
      "Round trips with overnights are the usual pattern. One-way drops are priced in the quote, including the driver's return.",
    overnightPolicy:
      "Confirm where the driver stays and whether the vehicle is on call during your stay. Hill-area duty hours should be agreed before you travel.",
    stopsConsiderations:
      "Plan rest and viewpoint stops in advance. Some areas require registration at checkpoints, so ask the desk about current rules before booking.",
    bookingSteps: [
      "Share dates, Dhaka pickup area, and passenger count.",
      "Choose the nights you need in Bandarban and any onward places.",
      "Pick a vehicle that suits hill roads and luggage.",
      "Review the written quote for fuel, waiting, and overnight terms.",
      "Confirm by call, WhatsApp, or the website form.",
    ],
    faqs: [
      {
        question: "How long is the trip from Dhaka to Bandarban?",
        answer:
          "Often around 8 to 11 hours each way. Plan a full day each way and avoid night driving on the hill roads.",
      },
      {
        question: "Do hill roads have restrictions I should know about?",
        answer:
          "Some areas require registration at checkpoints. The desk can advise on current requirements before you travel.",
      },
      {
        question: "Can we go from Bandarban to Rangamati?",
        answer:
          "Yes, as a combined hill-country itinerary. Share the nights in each place so the driving hours and the quote are right.",
      },
    ],
  },
  {
    slug: "dhaka-to-kuakata",
    title: "Dhaka to Kuakata Car Rental with Driver",
    description:
      "Chauffeur-driven car hire from Dhaka to Kuakata on the southern coast. Long-route notes, approximate journey times, and booking steps.",
    answer:
      "Kuakata is a long southern coastal trip, normally booked as a round trip with one or two nights. Share dates and the places you want to see along the coast.",
    typicalDuration:
      "Road time is often roughly 9 to 12 hours each way, with river crossings and the route through Barishal or Patuakhali. Treat this as approximate and plan an early start.",
    vehicleSuggestions: [
      "SUV for comfort on the longest legs",
      "Noah or Alphard-class MPV for families",
      "Hyundai H1 for groups",
      "Sedans for light travel only",
    ],
    luggageNotes:
      "Beach trips carry bags, cooler boxes, and gifts. Tell us the count, and any bulky items, so the vehicle has the space.",
    oneWayVsRoundTrip:
      "Round trips with overnights are the usual pattern. One-way drops are possible, and the driver's return is priced in the quote.",
    overnightPolicy:
      "Long coastal trips need clear overnight rules. Confirm where the driver rests and the duty hours for the return day.",
    stopsConsiderations:
      "Ferry or river crossings can add waiting time. List the crossings and any stops in advance so the schedule is realistic.",
    bookingSteps: [
      "Share dates, Dhaka pickup area, and passenger count.",
      "Choose a round trip with overnights, or a one-way drop.",
      "Pick a vehicle class that fits the group and luggage.",
      "Review the written quote for fuel, crossings, and overnight terms.",
      "Confirm by call, WhatsApp, or the website form.",
    ],
    faqs: [
      {
        question: "How long does Dhaka to Kuakata take by car?",
        answer:
          "Often 9 to 12 hours each way, depending on crossings, traffic, and stops. Most guests plan an overnight on the way.",
      },
      {
        question: "Is Kuakata possible as a same-day trip?",
        answer:
          "No, not comfortably. A long day each way leaves little time on the coast, so plan at least one night.",
      },
      {
        question: "Can the car stay with us for the whole stay?",
        answer:
          "Yes. Agree the daily hours, the overnight rest, and the return date in the quote.",
      },
    ],
  },
];

export function getRouteBySlug(slug: string): RoutePage | undefined {
  return routes.find((route) => route.slug === slug);
}

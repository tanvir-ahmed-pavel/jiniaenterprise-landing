import { createMetadata } from "@/lib/seo/metadata";
import { SeoPillarPage } from "@/components/seo/SeoPillarPage";
import { siteFaqs } from "@/lib/seo/content";

export const metadata = createMetadata({
  title: "Dhaka Airport Car Rental & Airport Transfer",
  description:
    "Airport transfer and car rental for Hazrat Shahjalal International Airport (DAC). Meet & greet, flight tracking, and reliable pickup.",
  path: "/airport-car-rental",
  keywords: [
    "Dhaka airport transfer",
    "DAC car rental",
    "airport pickup Dhaka",
    "Hazrat Shahjalal airport taxi",
  ],
});

const faqs = siteFaqs.filter((f) =>
  [
    "Do you offer airport pickup at Hazrat Shahjalal International Airport (DAC)?",
    "How do I request a quote or book a vehicle?",
  ].includes(f.question),
);

export default function AirportCarRentalPage() {
  return (
    <SeoPillarPage
      title="Airport car rental."
      subtitle="DAC meet & greet"
      description="Pickup and drop for Hazrat Shahjalal International Airport with chauffeur and flight-aware coordination."
      path="/airport-car-rental"
      breadcrumbLabel="Airport Transfer"
      serviceName="Dhaka Airport Transfer"
      answer="Jinia Enterprise offers airport pickup and drop at Hazrat Shahjalal International Airport (DAC). Pre-book with your flight number so the driver can track delays and meet you with a name signboard when arranged."
      sections={[
        {
          heading: "How airport pickup works",
          body: "Share your flight details, passenger count, and destination in Dhaka. A driver is assigned and waits according to the agreed meet point. Flight delays are coordinated when flight information is provided in advance.",
        },
        {
          heading: "Vehicle options for airport runs",
          body: "Sedans for small groups, SUVs and luxury MPVs for executives, and microbuses for families or teams with luggage. Choose based on passengers and bags—not only on price.",
        },
        {
          heading: "Arrival and departure tips",
          body: "Book before you land when possible. Keep WhatsApp available for the driver’s message. For departures, allow buffer time for Dhaka traffic—especially during peak hours and rain.",
        },
      ]}
      faqs={faqs}
      related={[
        { href: "/car-rental-dhaka", label: "Car rental Dhaka" },
        { href: "/vehicles", label: "Fleet" },
        { href: "/booking", label: "Book transfer" },
        { href: "/contact", label: "Contact" },
      ]}
    />
  );
}

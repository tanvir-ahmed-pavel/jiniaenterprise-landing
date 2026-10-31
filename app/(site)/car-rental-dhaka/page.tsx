import { createMetadata } from "@/lib/seo/metadata";
import { SeoPillarPage } from "@/components/seo/SeoPillarPage";
import { siteFaqs } from "@/lib/seo/content";
import { CITY_DAY_HOURS, PRICE_EXTRAS, formatBdt, getLowestDayRate } from "@/content/fleet-prices";

const sedan = getLowestDayRate((r) => r.kind === "Sedan")?.dayRate ?? 0;
const mpv = getLowestDayRate((r) => r.model === "Toyota Noah")?.dayRate ?? 0;
const microbus = getLowestDayRate((r) => r.model === "Toyota Hiace")?.dayRate ?? 0;

export const metadata = createMetadata({
  title: "Car Rental in Dhaka with Driver",
  description:
    "Chauffeur-driven car rental across Dhaka for daily commute, corporate travel, and outstation trips. Request a quote from Jinia Enterprise.",
  path: "/car-rental-dhaka",
  keywords: [
    "car rental Dhaka",
    "rent a car Dhaka",
    "car hire Dhaka",
    "chauffeur Dhaka",
  ],
});

const faqs = siteFaqs.filter((f) =>
  [
    "Does Jinia Enterprise provide car rental with a driver?",
    "Which areas of Dhaka do you serve?",
    "How do I request a quote or book a vehicle?",
  ].includes(f.question),
);

export default function CarRentalDhakaPage() {
  return (
    <SeoPillarPage
      title="Car rental in Dhaka."
      subtitle="Chauffeur-driven mobility"
      description="Reliable car and bus rental with professional drivers for city, corporate, and outstation travel."
      path="/car-rental-dhaka"
      breadcrumbLabel="Car Rental Dhaka"
      serviceName="Car Rental in Dhaka"
      answer={`Jinia Enterprise provides chauffeur-driven car rental in Dhaka for daily, monthly, corporate, and airport needs, from ${formatBdt(sedan)} per day for a sedan with driver. Share your pickup point, dates, and passenger count to receive a quote matched to your itinerary.`}
      sections={[
        {
          heading: "Who this service is for",
          body: "Business travelers, embassy and NGO teams, visiting guests, and families who need a dependable driver and maintained vehicle in Dhaka traffic—without owning or managing a car themselves.",
        },
        {
          heading: "What you can book",
          body: "Sedans, SUVs, luxury MPVs, microbuses, and AC coaches depending on availability. Rentals are typically with driver. Airport transfers, full-day city hire, and monthly corporate packages are common booking types.",
        },
        {
          heading: "Service areas",
          body: "Coverage includes Gulshan, Banani, Uttara, Dhanmondi, Mirpur, Mohammadpur, Baridhara, Bashundhara, Hazrat Shahjalal International Airport, and outstation routes across Bangladesh when arranged in advance.",
        },
        {
          heading: "How much it costs",
          body: `A full day (about ${CITY_DAY_HOURS}) inside Dhaka city with driver starts from ${formatBdt(sedan)} for a sedan, ${formatBdt(mpv)} for a 7-seat Toyota Noah and ${formatBdt(microbus)} for a 12-seat Toyota Hiace. ${PRICE_EXTRAS} See the pricing page for every vehicle.`,
        },
      ]}
      faqs={faqs}
      related={[
        { href: "/car-rental-with-driver", label: "With driver" },
        { href: "/airport-car-rental", label: "Airport transfer" },
        { href: "/corporate-car-rental", label: "Corporate rental" },
        { href: "/vehicles", label: "View fleet" },
        { href: "/faq", label: "FAQ" },
      ]}
    />
  );
}

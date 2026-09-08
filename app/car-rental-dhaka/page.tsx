import { createMetadata } from "@/lib/seo/metadata";
import { SeoPillarPage } from "@/components/seo/SeoPillarPage";
import { siteFaqs } from "@/lib/seo/content";

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
      answer="Jinia Enterprise provides chauffeur-driven car rental in Dhaka for daily, monthly, corporate, and airport needs. Share your pickup point, dates, and passenger count to receive a quote matched to your itinerary."
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
          heading: "How pricing works",
          body: "Rates depend on vehicle class, duration, city vs outstation use, overtime, and fuel terms. We do not publish a single fixed price for every trip—request today’s rate with your route details for an accurate quote.",
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

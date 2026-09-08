import { createMetadata } from "@/lib/seo/metadata";
import { SeoPillarPage } from "@/components/seo/SeoPillarPage";
import { siteFaqs } from "@/lib/seo/content";

export const metadata = createMetadata({
  title: "Car Rental in Bangladesh with Driver",
  description:
    "Chauffeur-driven car and bus rental across Bangladesh from a Dhaka base—city hire, airport transfers, and outstation routes with Jinia Enterprise.",
  path: "/car-rental-bangladesh",
});

const faqs = siteFaqs.filter((f) =>
  [
    "Which areas of Dhaka do you serve?",
    "Does Jinia Enterprise provide car rental with a driver?",
    "How do I request a quote or book a vehicle?",
  ].includes(f.question),
);

export default function CarRentalBangladeshPage() {
  return (
    <SeoPillarPage
      title="Car rental across Bangladesh."
      subtitle="Dhaka-based · nationwide routes"
      description="Chauffeur service from Dhaka to major cities and tourist corridors when arranged in advance."
      path="/car-rental-bangladesh"
      breadcrumbLabel="Bangladesh"
      serviceName="Car Rental in Bangladesh"
      answer="Jinia Enterprise operates chauffeur-driven rentals from Dhaka and arranges outstation travel across Bangladesh—including popular leisure and business corridors—when vehicle and driver capacity allow. Share origin, destination, and dates for a route-specific quote."
      sections={[
        {
          heading: "Dhaka as the hub",
          body: "Most bookings start in Dhaka (Gulshan office area) with coverage across the city and DAC airport. Outstation departures are planned from your Dhaka pickup unless another start point is agreed.",
        },
        {
          heading: "Routes we commonly discuss",
          body: "Cox’s Bazar, Sylhet, Chattogram, and Sreemangal are frequent requests. See the routes section for journey notes. Other destinations can be scoped if drivers and rest plans are workable.",
        },
        {
          heading: "What to send for a Bangladesh trip quote",
          body: "Passenger count, luggage, preferred vehicle class, one-way vs multi-day, overnight needs for the driver, and any hard arrival times.",
        },
      ]}
      faqs={faqs}
      related={[
        { href: "/car-rental-dhaka", label: "Car rental Dhaka" },
        { href: "/routes", label: "Outstation routes" },
        { href: "/car-rental-with-driver", label: "With driver" },
        { href: "/booking", label: "Book now" },
      ]}
    />
  );
}

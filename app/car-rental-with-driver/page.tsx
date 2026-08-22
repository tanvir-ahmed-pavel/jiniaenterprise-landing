import { createMetadata } from "@/lib/seo/metadata";
import { SeoPillarPage } from "@/components/seo/SeoPillarPage";
import { siteFaqs } from "@/lib/seo/content";

export const metadata = createMetadata({
  title: "Car Rental with Driver in Dhaka",
  description:
    "Hire a car with a professional driver in Dhaka. Daily, weekly, and monthly chauffeur packages for city and outstation travel.",
  path: "/car-rental-with-driver",
  keywords: [
    "car rental with driver Dhaka",
    "chauffeur service Dhaka",
    "hire driver Dhaka",
  ],
});

const faqs = siteFaqs.filter((f) =>
  [
    "Does Jinia Enterprise provide car rental with a driver?",
    "What does a full-day car rental mean?",
    "Is fuel included in the rental price?",
  ].includes(f.question),
);

export default function CarRentalWithDriverPage() {
  return (
    <SeoPillarPage
      title="Car rental with driver."
      subtitle="Chauffeur included"
      description="Professional licensed drivers for city commute, meetings, and outstation journeys."
      path="/car-rental-with-driver"
      breadcrumbLabel="With Driver"
      serviceName="Car Rental with Driver"
      answer="“With driver” means a licensed chauffeur is assigned with the vehicle. You get door-to-door mobility in Dhaka without navigating traffic, parking, or route planning yourself. Hours and overtime are confirmed at booking."
      sections={[
        {
          heading: "What “with driver” includes",
          body: "A professional driver, the booked vehicle class, and coordination for pickup and drop points. Fuel, overtime, waiting time, and night charges depend on the package and should be confirmed in your quote.",
        },
        {
          heading: "Full-day vs shorter hire",
          body: "A full-day rental commonly covers about 10–12 hours inside Dhaka or nearby factory visits. Shorter airport transfers and point-to-point trips are also available when scheduled in advance.",
        },
        {
          heading: "Driver-only option",
          body: "If you already own a car, a driver-only service can be arranged for office commute or outstation trips. Ask the desk about availability for your dates.",
        },
      ]}
      faqs={faqs}
      related={[
        { href: "/car-rental-dhaka", label: "Car rental Dhaka" },
        { href: "/monthly-car-rental", label: "Monthly rental" },
        { href: "/booking", label: "Book now" },
        { href: "/faq", label: "FAQ" },
      ]}
    />
  );
}

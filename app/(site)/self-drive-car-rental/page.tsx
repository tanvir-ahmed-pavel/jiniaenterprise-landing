import { createMetadata } from "@/lib/seo/metadata";
import { SeoPillarPage } from "@/components/seo/SeoPillarPage";

export const metadata = createMetadata({
  title: "Self-Drive Car Rental in Dhaka — What We Offer",
  description:
    "Jinia Enterprise primarily provides chauffeur-driven rentals in Dhaka. Learn how with-driver hire works if you were searching for self-drive options.",
  path: "/self-drive-car-rental",
});

export default function SelfDrivePage() {
  return (
    <SeoPillarPage
      title="Self-drive vs with driver."
      subtitle="Honest product note"
      description="We focus on chauffeur-driven service—not a self-drive fleet marketplace."
      path="/self-drive-car-rental"
      breadcrumbLabel="Self-drive"
      serviceName="Chauffeur-Driven Car Rental"
      answer="If you searched for self-drive car rental in Dhaka: Jinia Enterprise’s core offering is cars and buses with professional drivers. That model fits airport transfers, corporate days, and outstation trips where local navigation and parking matter. We do not market a self-drive checkout as our primary product."
      sections={[
        {
          heading: "Why most clients book with a driver",
          body: "Dhaka traffic, parking, and intercity highways are easier when a licensed chauffeur handles the wheel—especially for visitors and executive schedules.",
        },
        {
          heading: "Driver-only for your own car",
          body: "If you already own a vehicle, ask about driver-only hire for commute or outstation days. Availability depends on scheduling.",
        },
        {
          heading: "Next step",
          body: "Browse with-driver packages, airport transfers, or monthly hire—or WhatsApp the desk with your dates and passenger count.",
        },
      ]}
      related={[
        { href: "/car-rental-with-driver", label: "With driver" },
        { href: "/car-rental-dhaka", label: "Car rental Dhaka" },
        { href: "/airport-car-rental", label: "Airport transfer" },
        { href: "/booking", label: "Book with driver" },
      ]}
    />
  );
}

import { createMetadata } from "@/lib/seo/metadata";
import { SeoPillarPage } from "@/components/seo/SeoPillarPage";
import { siteFaqs } from "@/lib/seo/content";

export const metadata = createMetadata({
  title: "Corporate Car Rental in Dhaka",
  description:
    "Corporate and embassy car rental in Dhaka with professional chauffeurs, monthly fleet options, and dependable scheduling.",
  path: "/corporate-car-rental",
  keywords: [
    "corporate car rental Dhaka",
    "embassy car rental Bangladesh",
    "company fleet rental Dhaka",
  ],
});

const faqs = siteFaqs.filter((f) =>
  [
    "Can I book a car for monthly or long-term corporate use?",
    "How do I request a quote or book a vehicle?",
  ].includes(f.question),
);

export default function CorporateCarRentalPage() {
  return (
    <SeoPillarPage
      title="Corporate car rental."
      subtitle="Business & embassy transport"
      description="Scheduled chauffeur service for companies, NGOs, and diplomatic missions in Dhaka."
      path="/corporate-car-rental"
      breadcrumbLabel="Corporate"
      serviceName="Corporate Car Rental"
      answer="Jinia Enterprise supports corporate and embassy transport in Dhaka with professional drivers, maintained vehicles, and monthly or project-based packages. Clients have included embassies, international organizations, and private companies."
      sections={[
        {
          heading: "What corporate clients typically need",
          body: "Staff commute, visitor airport transfers, meeting logistics, and backup vehicle coordination. Billing and reporting can be structured for accounts payable when agreed in advance.",
        },
        {
          heading: "Fleet for business use",
          body: "Economy and executive sedans for daily office use, SUVs and luxury MPVs for VIP guests, plus microbuses and coaches for group movements. Availability is confirmed per booking window.",
        },
        {
          heading: "How to start",
          body: "Share your route pattern, days per week, preferred vehicle class, and invoice requirements. The desk will propose a package—daily, monthly, or long-term—without locking you into opaque terms.",
        },
      ]}
      faqs={faqs}
      related={[
        { href: "/monthly-car-rental", label: "Monthly rental" },
        { href: "/clients", label: "Clients" },
        { href: "/vehicles", label: "Fleet" },
        { href: "/contact", label: "Talk to sales" },
      ]}
    />
  );
}

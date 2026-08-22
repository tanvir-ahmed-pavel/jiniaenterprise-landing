import { createMetadata } from "@/lib/seo/metadata";
import { SeoPillarPage } from "@/components/seo/SeoPillarPage";
import { siteFaqs } from "@/lib/seo/content";

export const metadata = createMetadata({
  title: "Long-Term Car Rental in Dhaka",
  description:
    "Long-term and multi-month chauffeur-driven car rental in Dhaka for projects, embassies, and extended stays. Request a scoped package from Jinia Enterprise.",
  path: "/long-term-car-rental",
});

const faqs = siteFaqs.filter((f) =>
  [
    "Can I book a car for monthly or long-term corporate use?",
    "Is fuel included in the rental price?",
  ].includes(f.question),
);

export default function LongTermCarRentalPage() {
  return (
    <SeoPillarPage
      title="Long-term car rental."
      subtitle="Beyond a single month"
      description="Project and residency packages with a dedicated chauffeur rhythm."
      path="/long-term-car-rental"
      breadcrumbLabel="Long-term"
      serviceName="Long-Term Car Rental"
      answer="When you need a car and driver for several months—not just a few days—we scope hours, rest days, vehicle class, and backup cover in writing. Long-term hire builds on monthly packages with clearer operating rules."
      sections={[
        {
          heading: "Who uses long-term hire",
          body: "Construction and consulting project teams, embassy staff on assignment, and households that want commute reliability without buying a vehicle.",
        },
        {
          heading: "What to lock in the agreement",
          body: "Daily hour window, weekly off days, overtime, fuel responsibility, outstation rules, replacement vehicle expectations, and invoice format.",
        },
        {
          heading: "Related options",
          body: "If you only need weekday office commute for one month, start with monthly rental. If you need multi-vehicle coverage, ask for a corporate fleet conversation.",
        },
      ]}
      faqs={faqs}
      related={[
        { href: "/monthly-car-rental", label: "Monthly rental" },
        { href: "/corporate-car-rental", label: "Corporate" },
        { href: "/pricing", label: "Pricing method" },
        { href: "/contact", label: "Talk to desk" },
      ]}
    />
  );
}

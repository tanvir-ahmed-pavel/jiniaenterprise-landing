import { createMetadata } from "@/lib/seo/metadata";
import { SeoPillarPage } from "@/components/seo/SeoPillarPage";
import { siteFaqs } from "@/lib/seo/content";

export const metadata = createMetadata({
  title: "Monthly Car Rental in Dhaka",
  description:
    "Monthly car rental with driver in Dhaka for office commute and long-term use. Transparent packages with backup support when arranged.",
  path: "/monthly-car-rental",
  keywords: [
    "monthly car rental Dhaka",
    "long term car rental Dhaka",
    "monthly chauffeur Dhaka",
  ],
});

const faqs = siteFaqs.filter((f) =>
  [
    "Can I book a car for monthly or long-term corporate use?",
    "Is fuel included in the rental price?",
    "What does a full-day car rental mean?",
  ].includes(f.question),
);

export default function MonthlyCarRentalPage() {
  return (
    <SeoPillarPage
      title="Monthly car rental."
      subtitle="Long-term chauffeur hire"
      description="Cost-effective monthly packages with a dedicated driver for commute or personal use in Dhaka."
      path="/monthly-car-rental"
      breadcrumbLabel="Monthly Rental"
      serviceName="Monthly Car Rental"
      answer="Monthly car rental with driver is available for office commute and longer stays in Dhaka. Packages reduce the hassle of day-by-day booking and can include backup vehicle support when arranged in the agreement."
      sections={[
        {
          heading: "When monthly rental makes sense",
          body: "Expat assignments, project teams, embassy staff, and households that need regular transport without buying a vehicle. Monthly hire is usually clearer on cost than stacking many daily bookings.",
        },
        {
          heading: "What to confirm in your package",
          body: "Working hours, rest days, overtime, fuel responsibility, outstation rules, and replacement vehicle terms. Ask for these in writing so expectations match the invoice.",
        },
        {
          heading: "Vehicle classes",
          body: "Sedans for daily commute, larger MPVs for families, and SUVs when road conditions or luggage require them. Check the fleet page, then confirm availability for your start date.",
        },
      ]}
      faqs={faqs}
      related={[
        { href: "/corporate-car-rental", label: "Corporate rental" },
        { href: "/car-rental-with-driver", label: "With driver" },
        { href: "/booking", label: "Request monthly quote" },
        { href: "/faq", label: "FAQ" },
      ]}
    />
  );
}

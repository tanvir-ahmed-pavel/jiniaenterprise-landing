import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");

type CheckItem = {
  label: string;
  relativePath: string;
};

const CHECKS: CheckItem[] = [
  { label: "Home page", relativePath: "app/page.tsx" },
  { label: "Vehicles hub", relativePath: "app/vehicles/page.tsx" },
  { label: "Vehicle detail", relativePath: "app/vehicles/[slug]/page.tsx" },
  { label: "Blog hub", relativePath: "app/blog/page.tsx" },
  { label: "Blog post", relativePath: "app/blog/[slug]/page.tsx" },
  { label: "Booking", relativePath: "app/booking/page.tsx" },
  { label: "Contact", relativePath: "app/contact/page.tsx" },
  { label: "FAQ", relativePath: "app/faq/page.tsx" },
  { label: "Car rental Dhaka", relativePath: "app/car-rental-dhaka/page.tsx" },
  { label: "Airport rental", relativePath: "app/airport-car-rental/page.tsx" },
  { label: "Corporate rental", relativePath: "app/corporate-car-rental/page.tsx" },
  { label: "Monthly rental", relativePath: "app/monthly-car-rental/page.tsx" },
  { label: "With driver", relativePath: "app/car-rental-with-driver/page.tsx" },
  { label: "Bangladesh pillar", relativePath: "app/car-rental-bangladesh/page.tsx" },
  { label: "Long-term pillar", relativePath: "app/long-term-car-rental/page.tsx" },
  { label: "Locations hub", relativePath: "app/locations/page.tsx" },
  { label: "Location detail", relativePath: "app/locations/[slug]/page.tsx" },
  { label: "Routes hub", relativePath: "app/routes/page.tsx" },
  { label: "Route detail", relativePath: "app/routes/[slug]/page.tsx" },
  { label: "Pricing", relativePath: "app/pricing/page.tsx" },
  { label: "Reviews", relativePath: "app/reviews/page.tsx" },
  { label: "Policies hub", relativePath: "app/policies/page.tsx" },
  { label: "Compare hub", relativePath: "app/compare/page.tsx" },
  { label: "Glossary", relativePath: "app/glossary/page.tsx" },
  { label: "Service detail", relativePath: "app/services/[slug]/page.tsx" },
  { label: "Sitemap", relativePath: "app/sitemap.ts" },
  { label: "Robots", relativePath: "app/robots.ts" },
  { label: "Manifest", relativePath: "app/manifest.ts" },
  { label: "Business identity", relativePath: "lib/business/identity.ts" },
  { label: "SEO schema", relativePath: "lib/seo/schema.ts" },
  { label: "SEO metadata", relativePath: "lib/seo/metadata.ts" },
  { label: "SEO canonical", relativePath: "lib/seo/canonical.ts" },
  { label: "SEO IndexNow", relativePath: "lib/seo/indexnow.ts" },
  { label: "SEO internal links", relativePath: "lib/seo/internal-links.ts" },
  { label: "SEO validation", relativePath: "lib/seo/validation.ts" },
  { label: "JsonLd component", relativePath: "components/seo/JsonLd.tsx" },
  { label: "Breadcrumbs", relativePath: "components/seo/Breadcrumbs.tsx" },
  { label: "RelatedLinks", relativePath: "components/seo/RelatedLinks.tsx" },
  { label: "LastUpdated", relativePath: "components/seo/LastUpdated.tsx" },
  { label: "BusinessContact", relativePath: "components/business/BusinessContact.tsx" },
  { label: "TrackEvents", relativePath: "components/analytics/TrackEvents.tsx" },
  { label: "Analytics event API", relativePath: "app/api/analytics/event/route.ts" },
  { label: "IndexNow API", relativePath: "app/api/indexnow/route.ts" },
  { label: "Analytics events", relativePath: "lib/analytics/events.ts" },
  { label: "AI referrer helper", relativePath: "lib/analytics/ai-referrer.ts" },
];

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function main() {
  console.log("Jinia Enterprise SEO audit checklist\n");

  let passed = 0;
  let failed = 0;

  for (const check of CHECKS) {
    const ok = exists(check.relativePath);
    const mark = ok ? "PASS" : "MISS";
    if (ok) passed += 1;
    else failed += 1;
    console.log(`[${mark}] ${check.label.padEnd(24)} ${check.relativePath}`);
  }

  console.log(`\n${passed} passed · ${failed} missing · ${CHECKS.length} total`);
  if (failed > 0) process.exitCode = 1;
}

main();

import { getLocalBusinessSchema } from "../lib/seo/schema";

const REQUIRED_KEYS = [
  "@context",
  "@type",
  "@id",
  "name",
  "url",
  "telephone",
  "email",
  "address",
  "description",
] as const;

function main() {
  const schema = getLocalBusinessSchema() as Record<string, unknown>;
  const missing = REQUIRED_KEYS.filter((key) => {
    const value = schema[key];
    return value === undefined || value === null || value === "";
  });

  if (missing.length) {
    console.error("LocalBusiness schema missing required keys:", missing.join(", "));
    process.exitCode = 1;
    return;
  }

  const address = schema.address as Record<string, unknown> | undefined;
  const addressKeys = ["streetAddress", "addressLocality", "addressCountry"];
  const missingAddress = addressKeys.filter(
    (key) => !address || address[key] === undefined || address[key] === "",
  );

  if (missingAddress.length) {
    console.error(
      "LocalBusiness address missing keys:",
      missingAddress.join(", "),
    );
    process.exitCode = 1;
    return;
  }

  console.log("LocalBusiness schema OK");
  console.log(`- name: ${String(schema.name)}`);
  console.log(`- url: ${String(schema.url)}`);
  console.log(`- telephone: ${String(schema.telephone)}`);
}

main();

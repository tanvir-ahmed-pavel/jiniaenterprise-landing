import { SITE_URL } from "@/lib/seo/canonical";

export const dynamic = "force-static";

const isProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

// Content-Signal states what the site allows AI systems to do with its content
// (see https://contentsignals.org/). ai-train=no: do not train on it.
// search=yes: search indexing is fine. ai-input=no: do not use it as live input.
const CONTENT_SIGNAL = "Content-Signal: ai-train=no, search=yes, ai-input=no";

const AGENTS = [
  "*",
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
];

function buildRobots(): string {
  if (!isProduction) {
    return "User-agent: *\nDisallow: /\n";
  }

  const groups = AGENTS.map((agent) =>
    [
      `User-agent: ${agent}`,
      "Allow: /",
      "Disallow: /admin/",
      "Disallow: /api/",
      CONTENT_SIGNAL,
    ].join("\n"),
  );

  return [
    ...groups,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Host: ${SITE_URL}`,
    "",
  ].join("\n\n");
}

export function GET() {
  return new Response(buildRobots(), {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

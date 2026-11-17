import { SITE_URL } from "@/lib/seo/canonical";

export const dynamic = "force-static";

/**
 * RFC 9727 API catalog. Each linkset entry is one API, identified by its
 * anchor, with links to its machine-readable description and human docs.
 */
export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: `${SITE_URL}/api/blog/posts`,
        "service-desc": [
          {
            href: `${SITE_URL}/openapi/blog-api.json`,
            type: "application/vnd.oai.openapi+json",
          },
        ],
        "service-doc": [
          {
            href: `${SITE_URL}/docs/blog-api.md`,
            type: "text/markdown",
          },
        ],
      },
      {
        anchor: `${SITE_URL}/api/vehicles`,
        "service-desc": [
          {
            href: `${SITE_URL}/openapi/public-api.json`,
            type: "application/vnd.oai.openapi+json",
          },
        ],
        "service-doc": [
          {
            href: `${SITE_URL}/llms.txt`,
            type: "text/plain",
          },
        ],
      },
      {
        anchor: `${SITE_URL}/api/mcp`,
        "service-desc": [
          {
            href: `${SITE_URL}/.well-known/mcp/server-card.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${SITE_URL}/llms.txt`,
            type: "text/plain",
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/linkset+json" },
  });
}

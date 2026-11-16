import { SITE_URL } from "@/lib/seo/canonical";

export const dynamic = "force-static";

// This site has no OAuth authorization server and no agent registration
// endpoint. Its only programmatic access is the blog API, which uses a static
// key that the site owner provisions on the server. So this document is the
// self-contained form: it says what exists and nothing more.
const body = `# auth.md

Agent access to ${SITE_URL} (Jinia Enterprise, car rental with driver in Dhaka).

## Audience

Automated agents that the site owner has authorized to publish blog posts.
This is not an account system for customers. Customers book through the website.

## Registration and provisioning

There is no self-service registration and no \`POST /agent/auth\` endpoint.
The site owner provisions access by setting the \`BLOG_API_KEY\` server secret.
To request access, use the contact page: ${SITE_URL}/contact

## Supported method

One method: a static API key, sent in one of two headers.

- \`Authorization: Bearer <key>\`
- \`X-API-Key: <key>\`

No OAuth, OpenID Connect, identity assertions, verified-email, or anonymous flows are offered.

## Endpoints that require the key

- \`GET ${SITE_URL}/api/blog/posts\` lists posts
- \`POST ${SITE_URL}/api/blog/posts\` creates a post
- \`GET ${SITE_URL}/api/blog/posts/{slug}\` returns one post

Without a valid key these return \`401\`. If the server has no key configured they return \`503\`.

## Credential use

- Send the key only from server-side code or a trusted agent runtime. Never put it in a URL, a browser page, or a public repository.
- The rate limit is 10 authenticated requests per minute per running instance. Back off on \`429\`.
- To rotate, the site owner changes \`BLOG_API_KEY\` and redeploys. The old key stops working at once.

## Discovery

- API catalog: ${SITE_URL}/.well-known/api-catalog
- OpenAPI description: ${SITE_URL}/openapi/blog-api.json
- Human guide: ${SITE_URL}/docs/blog-api.md
`;

export function GET() {
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

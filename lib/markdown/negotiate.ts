import { NodeHtmlMarkdown } from "node-html-markdown";
import type { NextRequest } from "next/server";
import { SITE_URL } from "@/lib/seo/canonical";

/** Header set on the internal fetch, so the proxy does not negotiate with itself. */
const SOURCE_HEADER = "x-markdown-source";

/** Paths that are never converted: APIs, admin, Next internals and machine files. */
const SKIP_PREFIXES = [
  "/api/",
  "/admin",
  "/_next/",
  "/.well-known/",
  "/openapi/",
  "/docs/",
];
const SKIP_EXACT = new Set(["/robots.txt", "/sitemap.xml", "/manifest.webmanifest", "/auth.md"]);

/** Q-value of a media range in an Accept header, or 0 when absent. */
function qualityFor(accept: string, mediaType: string): number {
  for (const part of accept.split(",")) {
    const [type, ...params] = part.trim().split(";");
    if (type.trim().toLowerCase() !== mediaType) continue;
    const q = params.find((p) => p.trim().startsWith("q="));
    const value = q ? Number(q.trim().slice(2)) : 1;
    return Number.isNaN(value) ? 0 : value;
  }
  return 0;
}

/**
 * True when the client wants markdown, and wants it at least as much as HTML.
 * Browsers send text/html, so they keep getting the normal page.
 */
export function wantsMarkdown(request: NextRequest): boolean {
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  if (request.headers.get(SOURCE_HEADER)) return false;

  const { pathname } = request.nextUrl;
  if (SKIP_EXACT.has(pathname)) return false;
  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return false;
  // Files such as /images/logo.png or /sitemap.xml are not pages.
  if (/\.[a-z0-9]+$/i.test(pathname)) return false;

  const accept = request.headers.get("accept") ?? "";
  const markdownQ = qualityFor(accept, "text/markdown");
  if (markdownQ <= 0) return false;
  return markdownQ >= qualityFor(accept, "text/html");
}

function extractMainHtml(html: string): string {
  const main = html.match(/<main[\s\S]*?<\/main>/i);
  if (main) return main[0];
  const body = html.match(/<body[\s\S]*?<\/body>/i);
  return body ? body[0] : html;
}

const STRIP_BLOCKS = /<(script|style|noscript|svg|template|iframe|nav|header|footer|form|button)\b[\s\S]*?<\/\1>/gi;

/**
 * Fetches the HTML page from this same deployment and converts its main content
 * to markdown. Returns null when the page is not HTML (or is a redirect or an
 * error), so the caller can fall back to the normal response.
 */
export async function htmlToMarkdownResponse(request: NextRequest): Promise<Response | null> {
  const { pathname, search } = request.nextUrl;
  const upstream = await fetch(new URL(`${pathname}${search}`, request.nextUrl.origin), {
    headers: { accept: "text/html", [SOURCE_HEADER]: "1" },
    redirect: "manual",
  });
  if (!upstream.ok) return null;
  if (!(upstream.headers.get("content-type") ?? "").includes("text/html")) return null;

  const html = await upstream.text();
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
  const content = extractMainHtml(html).replace(STRIP_BLOCKS, "");
  const markdown = NodeHtmlMarkdown.translate(content).trim();

  const lines = [
    title ? `# ${title}` : null,
    `Source: ${SITE_URL}${pathname}`,
    "",
    markdown,
    "",
  ].filter((line): line is string => line !== null);

  return new Response(request.method === "HEAD" ? null : lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

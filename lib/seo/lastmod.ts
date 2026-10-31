/**
 * Real last-change dates for the sitemap, by hand.
 *
 * Bump a date when that page's visible content or structured data changes,
 * not on every deploy: a <lastmod> that moves on every build teaches search
 * engines to ignore it. The IndexNow script submits pages whose date is recent.
 *
 * 2026-10-31: canonical host moved to www, single H1, hreflang, schema and
 * price changes touched every template, so every page carries that date.
 */
export const SITE_WIDE_LAST_CHANGE = "2026-10-31";

const PAGE_LAST_CHANGE: Record<string, string> = {
  // Add per-page overrides here, e.g. "/pricing": "2026-11-15",
};

export function getLastModified(path: string, fromDatabase?: string | null): Date {
  const fixed = new Date(PAGE_LAST_CHANGE[path] ?? SITE_WIDE_LAST_CHANGE);
  if (!fromDatabase) return fixed;
  const db = new Date(fromDatabase);
  // A row edited in the admin after the template changed is newer content.
  return Number.isNaN(db.getTime()) || db < fixed ? fixed : db;
}

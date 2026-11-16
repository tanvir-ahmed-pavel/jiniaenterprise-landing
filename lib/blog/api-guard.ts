import { createHash, timingSafeEqual } from "node:crypto";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 10;

// Fixed-window counter. It lives in server memory, so each running instance
// keeps its own count. See docs/blog-api.md.
let windowStartedAt = 0;
let windowCount = 0;

/**
 * True only when the request carries the configured BLOG_API_KEY, sent as
 * `Authorization: Bearer <key>` or `X-API-Key: <key>`. Both sides are hashed
 * to a fixed length before a constant-time comparison.
 */
export function isAuthorizedBlogRequest(request: Request): boolean {
  const expected = process.env.BLOG_API_KEY;
  if (!expected) return false;

  const authorization = request.headers.get("authorization") ?? "";
  const provided = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : (request.headers.get("x-api-key") ?? "").trim();
  if (!provided) return false;

  const providedDigest = createHash("sha256").update(provided).digest();
  const expectedDigest = createHash("sha256").update(expected).digest();
  return timingSafeEqual(providedDigest, expectedDigest);
}

function takeRateLimitSlot(): boolean {
  const now = Date.now();
  if (now - windowStartedAt >= RATE_WINDOW_MS) {
    windowStartedAt = now;
    windowCount = 0;
  }
  if (windowCount >= RATE_MAX_REQUESTS) return false;
  windowCount += 1;
  return true;
}

/** Logs one request line. Never logs the key or the request body. */
export function logBlogApiRequest(
  method: string,
  path: string,
  status: number,
  note?: string,
): void {
  console.info(
    JSON.stringify({
      at: new Date().toISOString(),
      api: "blog",
      method,
      path,
      status,
      ...(note ? { note } : {}),
    }),
  );
}

/**
 * Runs the checks every blog API route needs: the API is configured, the key
 * is valid, and the rate limit has room. Returns a Response to send back when
 * the request must stop, or null when it may continue.
 */
export function checkBlogApiAccess(
  request: Request,
  method: string,
  path: string,
): Response | null {
  if (!process.env.BLOG_API_KEY) {
    logBlogApiRequest(method, path, 503, "BLOG_API_KEY not set");
    return Response.json({ error: "Blog API is not configured" }, { status: 503 });
  }

  if (!isAuthorizedBlogRequest(request)) {
    logBlogApiRequest(method, path, 401);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!takeRateLimitSlot()) {
    logBlogApiRequest(method, path, 429);
    return Response.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  return null;
}

import {
  checkBlogApiAccess,
  logBlogApiRequest,
} from "@/lib/blog/api-guard";
import {
  findBlogPostBySlug,
  toApiPostDetail,
} from "@/lib/blog/posts-service";

type RouteContext = { params: Promise<{ slug: string }> };

/**
 * GET /api/blog/posts/:slug
 * Returns one post, including published or draft status, so the caller can
 * verify a post after creating it.
 */
export async function GET(request: Request, { params }: RouteContext) {
  const { slug } = await params;

  const denied = checkBlogApiAccess(request, "GET", "/api/blog/posts/[slug]");
  if (denied) return denied;

  try {
    const row = await findBlogPostBySlug(slug);
    if (!row) {
      logBlogApiRequest("GET", "/api/blog/posts/[slug]", 404);
      return Response.json({ error: "Post not found" }, { status: 404 });
    }
    logBlogApiRequest("GET", "/api/blog/posts/[slug]", 200);
    return Response.json(toApiPostDetail(row));
  } catch (error) {
    logBlogApiRequest(
      "GET",
      "/api/blog/posts/[slug]",
      500,
      error instanceof Error ? error.message : "fetch failed",
    );
    return Response.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

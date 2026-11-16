import {
  checkBlogApiAccess,
  logBlogApiRequest,
} from "@/lib/blog/api-guard";
import {
  createBlogPost,
  listBlogPosts,
  toApiPost,
} from "@/lib/blog/posts-service";
import { parseCreateBlogPostBody } from "@/lib/blog/validation";

const PATH = "/api/blog/posts";

/**
 * GET /api/blog/posts
 * Lists posts (title, slug, status, date) so the caller can check for duplicates.
 */
export async function GET(request: Request) {
  const denied = checkBlogApiAccess(request, "GET", PATH);
  if (denied) return denied;

  try {
    const rows = await listBlogPosts();
    logBlogApiRequest("GET", PATH, 200);
    const posts = rows.map(toApiPost);
    return Response.json({ count: posts.length, posts });
  } catch (error) {
    logBlogApiRequest("GET", PATH, 500, error instanceof Error ? error.message : "list failed");
    return Response.json({ error: "Failed to list posts" }, { status: 500 });
  }
}

/**
 * POST /api/blog/posts
 * Creates a post. Returns 201 on success, 409 with the existing post URL if
 * the slug is taken, and 400 for an invalid body.
 */
export async function POST(request: Request) {
  const denied = checkBlogApiAccess(request, "POST", PATH);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    logBlogApiRequest("POST", PATH, 400, "invalid json");
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseCreateBlogPostBody(body);
  if (!parsed.ok) {
    logBlogApiRequest("POST", PATH, 400, "validation");
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const result = await createBlogPost(parsed.value);

    if (result.kind === "conflict") {
      logBlogApiRequest("POST", PATH, 409, "slug exists");
      return Response.json(
        {
          error: "A post with this slug already exists",
          slug: result.post.slug,
          url: toApiPost(result.post).url,
        },
        { status: 409 },
      );
    }

    const { post } = result;
    logBlogApiRequest("POST", PATH, 201, post.slug);
    return Response.json(
      {
        id: post.id,
        slug: post.slug,
        title: post.title,
        status: post.is_published ? "published" : "draft",
        publishedAt: post.created_at,
        url: toApiPost(post).url,
      },
      { status: 201 },
    );
  } catch (error) {
    logBlogApiRequest("POST", PATH, 500, error instanceof Error ? error.message : "create failed");
    return Response.json({ error: "Failed to create post" }, { status: 500 });
  }
}

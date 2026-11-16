import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import type { Database } from "@/lib/supabase/types";
import { SITE_URL } from "@/lib/seo/canonical";
import type { CreateBlogPostInput } from "./validation";

type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];

export type BlogApiPost = {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  date: string;
  url: string;
};

export type BlogApiPostDetail = BlogApiPost & {
  excerpt: string;
  content: string;
  author: string;
  coverImageUrl: string | null;
  updatedAt: string;
};

export type CreateResult =
  | { kind: "created"; post: BlogPostRow }
  | { kind: "conflict"; post: BlogPostRow };

export function blogPostUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

export function toApiPost(row: BlogPostRow): BlogApiPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.is_published ? "published" : "draft",
    date: row.created_at,
    url: blogPostUrl(row.slug),
  };
}

export function toApiPostDetail(row: BlogPostRow): BlogApiPostDetail {
  return {
    ...toApiPost(row),
    excerpt: row.excerpt,
    content: row.content,
    author: row.author ?? "Jinia Enterprise",
    coverImageUrl: row.cover_image,
    updatedAt: row.updated_at,
  };
}

/**
 * Service-role client. It bypasses row-level security, so it must only be used
 * by the blog API routes after checkBlogApiAccess has passed. Never import this
 * into a client component.
 */
function getServiceClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Blog API is missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function listBlogPosts(): Promise<BlogPostRow[]> {
  const { data, error } = await getServiceClient()
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function findBlogPostBySlug(slug: string): Promise<BlogPostRow | null> {
  const { data, error } = await getServiceClient()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

/**
 * Creates a post. A slug that already exists returns "conflict" with the
 * existing post, so a retried request never creates a second copy. The unique
 * constraint on slug is the final guard against two requests racing.
 */
export async function createBlogPost(input: CreateBlogPostInput): Promise<CreateResult> {
  const existing = await findBlogPostBySlug(input.slug);
  if (existing) return { kind: "conflict", post: existing };

  // `as never` matches the existing admin-service.ts inserts: the hand-written
  // Database type does not line up with supabase-js generics for inserts.
  const { data, error } = await getServiceClient()
    .from("blog_posts")
    .insert({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content: input.content,
      author: input.author,
      cover_image: input.coverImageUrl,
      is_published: input.published,
    } as never)
    .select("*")
    .single();

  if (error) {
    // 23505 = unique_violation: another request inserted the same slug first.
    if (error.code === "23505") {
      const winner = await findBlogPostBySlug(input.slug);
      if (winner) return { kind: "conflict", post: winner };
    }
    throw error;
  }

  // Refresh the pages the admin flow would refresh, so the post shows up now.
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${input.slug}`);
  revalidatePath("/sitemap.xml");

  return { kind: "created", post: data };
}

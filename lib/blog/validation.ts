import { generateBlogSlug } from "./slug";

export const DEFAULT_BLOG_AUTHOR = "Jinia Enterprise";

const TITLE_MAX = 255; // blog_posts.title is VARCHAR(255)
const EXCERPT_MAX = 300;
const CONTENT_MAX = 100_000;
const AUTHOR_MAX = 100; // blog_posts.author is VARCHAR(100)
const COVER_URL_MAX = 500; // blog_posts.cover_image is VARCHAR(500)
const SLUG_MAX = 255;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type CreateBlogPostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImageUrl: string | null;
  published: boolean;
};

export type ParseResult =
  | { ok: true; value: CreateBlogPostInput }
  | { ok: false; error: string };

function readString(
  body: Record<string, unknown>,
  field: string,
  options: { required: boolean; max: number },
): { ok: true; value: string } | { ok: false; error: string } {
  const raw = body[field];
  if (raw === undefined || raw === null) {
    return options.required
      ? { ok: false, error: `${field} is required` }
      : { ok: true, value: "" };
  }
  if (typeof raw !== "string") {
    return { ok: false, error: `${field} must be a string` };
  }
  const value = raw.trim();
  if (options.required && value.length === 0) {
    return { ok: false, error: `${field} is required` };
  }
  if (value.length > options.max) {
    return { ok: false, error: `${field} must be ${options.max} characters or fewer` };
  }
  return { ok: true, value };
}

/** Validates a create-post request body. Pure: no I/O. */
export function parseCreateBlogPostBody(body: unknown): ParseResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, error: "Body must be a JSON object" };
  }
  const data = body as Record<string, unknown>;

  const title = readString(data, "title", { required: true, max: TITLE_MAX });
  if (!title.ok) return { ok: false, error: title.error };

  const excerpt = readString(data, "excerpt", { required: true, max: EXCERPT_MAX });
  if (!excerpt.ok) return { ok: false, error: excerpt.error };

  const content = readString(data, "content", { required: true, max: CONTENT_MAX });
  if (!content.ok) return { ok: false, error: content.error };

  const author = readString(data, "author", { required: false, max: AUTHOR_MAX });
  if (!author.ok) return { ok: false, error: author.error };

  const cover = readString(data, "coverImageUrl", { required: false, max: COVER_URL_MAX });
  if (!cover.ok) return { ok: false, error: cover.error };
  if (cover.value) {
    try {
      const url = new URL(cover.value);
      if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();
    } catch {
      return { ok: false, error: "coverImageUrl must be an http or https URL" };
    }
  }

  let published = true;
  if (data.published !== undefined) {
    if (typeof data.published !== "boolean") {
      return { ok: false, error: "published must be true or false" };
    }
    published = data.published;
  }

  // Slug: use the supplied value if given, otherwise derive it from the title
  // with the same function the admin form uses.
  const suppliedSlug = readString(data, "slug", { required: false, max: SLUG_MAX });
  if (!suppliedSlug.ok) return { ok: false, error: suppliedSlug.error };

  const slugError = {
    ok: false as const,
    error: "slug may only contain lowercase letters, numbers and single hyphens",
  };
  let slug: string;
  if (suppliedSlug.value) {
    if (!SLUG_PATTERN.test(suppliedSlug.value)) return slugError;
    slug = suppliedSlug.value;
  } else {
    // Same generator as the admin form, with stray leading/trailing hyphens
    // removed (a non-Latin title or a cut at 50 characters can leave them).
    slug = generateBlogSlug(title.value).replace(/^-+|-+$/g, "");
    if (!slug) {
      return {
        ok: false,
        error: "Could not create a slug from the title. Provide a slug in Latin letters.",
      };
    }
    if (!SLUG_PATTERN.test(slug)) return slugError;
  }

  return {
    ok: true,
    value: {
      title: title.value,
      slug,
      excerpt: excerpt.value,
      content: content.value,
      author: author.value || DEFAULT_BLOG_AUTHOR,
      coverImageUrl: cover.value || null,
      published,
    },
  };
}

/**
 * Slug generation for blog posts. Used by the admin create form and by the
 * blog publishing API so both produce identical slugs for the same title.
 */
export function generateBlogSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .substring(0, 50);
}

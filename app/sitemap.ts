import type { MetadataRoute } from "next";
import { createStaticClient } from "@/lib/supabase/static";
import { pillarPages } from "@/lib/seo/content";
import { sampleVehicles, sampleBlogPosts } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/canonical";
import { getVehiclePath } from "@/lib/vehicles/slugs";
import { getLastModified } from "@/lib/seo/lastmod";
import { journalPosts } from "@/content/journal";
import { BANGLA_PAGES, getLanguageAlternates } from "@/lib/i18n/alternates";
import { locations } from "@/content/locations";
import { routes } from "@/content/routes";
import { serviceDetails } from "@/content/service-details";
import { policies } from "@/content/policies";
import { comparisons } from "@/content/comparisons";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/vehicles", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services", priority: 0.85, changeFrequency: "monthly" },
    { path: "/booking", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/clients", priority: 0.6, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.75, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.85, changeFrequency: "monthly" },
    { path: "/locations", priority: 0.85, changeFrequency: "monthly" },
    { path: "/routes", priority: 0.85, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.6, changeFrequency: "monthly" },
    { path: "/policies", priority: 0.65, changeFrequency: "monthly" },
    { path: "/compare", priority: 0.7, changeFrequency: "monthly" },
    { path: "/glossary", priority: 0.55, changeFrequency: "monthly" },
    ...pillarPages.map((p) => ({
      path: p.path,
      priority: 0.9,
      changeFrequency: "monthly" as const,
    })),
    ...locations.map((l) => ({
      path: `/locations/${l.slug}`,
      priority: 0.75,
      changeFrequency: "monthly" as const,
    })),
    ...routes.map((r) => ({
      path: `/routes/${r.slug}`,
      priority: 0.75,
      changeFrequency: "monthly" as const,
    })),
    ...serviceDetails.map((s) => ({
      path: `/services/${s.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...policies.map((p) => ({
      path: `/policies/${p.slug}`,
      priority: 0.55,
      changeFrequency: "yearly" as const,
    })),
    ...comparisons.map((c) => ({
      path: `/compare/${c.slug}`,
      priority: 0.65,
      changeFrequency: "monthly" as const,
    })),
    ...Object.values(BANGLA_PAGES).map((path) => ({
      path,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => {
    const languages = getLanguageAlternates(route.path);
    return {
      url: `${SITE_URL}${route.path}`,
      lastModified: getLastModified(route.path || "/"),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(languages ? { alternates: { languages } } : {}),
    };
  });

  let vehiclePages: MetadataRoute.Sitemap = [];
  let blogPages: MetadataRoute.Sitemap = [];

  const supabase = createStaticClient();

  if (supabase) {
    const [{ data: vehicles }, { data: posts }] = await Promise.all([
      supabase.from("vehicles").select("slug, updated_at").eq("is_active", true),
      supabase
        .from("blog_posts")
        .select("slug, updated_at, created_at")
        .eq("is_published", true),
    ]);

    const vehicleRows = (vehicles ?? []) as Array<{
      slug: string;
      updated_at?: string | null;
    }>;
    const postRows = (posts ?? []) as Array<{
      slug: string;
      updated_at?: string | null;
      created_at?: string | null;
    }>;

    if (vehicleRows.length) {
      vehiclePages = vehicleRows.map((v) => ({
        url: `${SITE_URL}${getVehiclePath(v.slug)}`,
        lastModified: getLastModified(getVehiclePath(v.slug), v.updated_at),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }

    if (postRows.length) {
      blogPages = postRows.map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: getLastModified(`/blog/${p.slug}`, p.updated_at ?? p.created_at),
        changeFrequency: "monthly",
        priority: 0.55,
      }));
    }
  }

  if (!vehiclePages.length) {
    vehiclePages = sampleVehicles
      .filter((v) => v.is_active !== false && v.slug)
      .map((v) => ({
        url: `${SITE_URL}${getVehiclePath(v.slug)}`,
        lastModified: getLastModified(getVehiclePath(v.slug)),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  }

  if (!blogPages.length) {
    blogPages = sampleBlogPosts
      .filter((p) => p.is_published)
      .map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: getLastModified(`/blog/${p.slug}`, p.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.55,
      }));
  }

  const listed = new Set(blogPages.map((page) => page.url));
  const journalPages: MetadataRoute.Sitemap = journalPosts
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: getLastModified(`/blog/${p.slug}`, p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
    .filter((page) => !listed.has(page.url));

  return [...staticPages, ...vehiclePages, ...blogPages, ...journalPages];
}

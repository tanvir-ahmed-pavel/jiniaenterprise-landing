import type { MetadataRoute } from "next";
import { createStaticClient } from "@/lib/supabase/static";
import { pillarPages } from "@/lib/seo/content";
import { sampleVehicles, sampleBlogPosts } from "@/lib/config";
import { SITE_URL } from "@/lib/seo/canonical";
import { locations } from "@/content/locations";
import { routes } from "@/content/routes";
import { serviceDetails } from "@/content/service-details";
import { policies } from "@/content/policies";
import { comparisons } from "@/content/comparisons";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

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
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

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
        url: `${SITE_URL}/vehicles/${v.slug}`,
        lastModified: v.updated_at ? new Date(v.updated_at) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }

    if (postRows.length) {
      blogPages = postRows.map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: p.updated_at
          ? new Date(p.updated_at)
          : p.created_at
            ? new Date(p.created_at)
            : now,
        changeFrequency: "monthly",
        priority: 0.55,
      }));
    }
  }

  if (!vehiclePages.length) {
    vehiclePages = sampleVehicles
      .filter((v) => v.is_active !== false && v.slug)
      .map((v) => ({
        url: `${SITE_URL}/vehicles/${v.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  }

  if (!blogPages.length) {
    blogPages = sampleBlogPosts
      .filter((p) => p.is_published)
      .map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: "monthly" as const,
        priority: 0.55,
      }));
  }

  return [...staticPages, ...vehiclePages, ...blogPages];
}

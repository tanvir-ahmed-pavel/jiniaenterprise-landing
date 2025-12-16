import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jiniaenterprise.com";

  const routes = [
    "",
    "/vehicles",
    "/services",
    "/about",
    "/contact",
    "/clients",
  ];

  // Static pages
  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Vehicle pages would be added dynamically from Supabase
  // For now, using sample data
  const vehicleSlugs = [
    "toyota-corolla",
    "toyota-noah",
    "hyundai-h1",
    "toyota-prado",
    "toyota-alphard",
    "mercedes-e-class",
    "hino-bus-29",
    "hino-bus-45",
  ];

  const vehiclePages = vehicleSlugs.map((slug) => ({
    url: `${baseUrl}/vehicles/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...vehiclePages];
}

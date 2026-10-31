import { SITE_URL } from "@/lib/business/identity";

export { SITE_URL };

export function getCanonicalUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized.replace(/\/$/, "")}`;
}

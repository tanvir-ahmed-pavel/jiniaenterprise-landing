import { businessIdentity } from "@/lib/business/identity";

export const SITE_URL = businessIdentity.url;

export function getCanonicalUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized.replace(/\/$/, "")}`;
}

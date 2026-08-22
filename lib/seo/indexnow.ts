import { SITE_URL } from "@/lib/seo/canonical";

/**
 * IndexNow helper for Bing and participating engines.
 * Set INDEXNOW_KEY in the environment and host the key file at /{key}.txt
 * before calling submitIndexNow in publish/update workflows.
 */
export async function submitIndexNow(urls: string | string[]): Promise<boolean> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.warn("INDEXNOW_KEY is not set; skipping IndexNow submission.");
    return false;
  }

  const host = new URL(SITE_URL).host;
  const urlList = (Array.isArray(urls) ? urls : [urls]).map((url) =>
    url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`,
  );

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList,
    }),
  });

  return response.ok || response.status === 202;
}

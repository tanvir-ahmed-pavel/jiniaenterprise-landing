import { SITE_URL } from "@/lib/seo/canonical";

/**
 * IndexNow helper for Bing (and through it Copilot and ChatGPT search) and the
 * other participating engines. The key is public by design: it is served at
 * /{key}.txt (public/23ef0eb9538231463a02ae89db78b5ce.txt) to prove ownership.
 * INDEXNOW_KEY overrides it if the key is ever rotated.
 */
export const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "23ef0eb9538231463a02ae89db78b5ce";

export async function submitIndexNow(urls: string | string[]): Promise<boolean> {
  const key = INDEXNOW_KEY;

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

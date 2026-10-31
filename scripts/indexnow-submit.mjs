#!/usr/bin/env node
/**
 * Tell IndexNow (Bing, Yandex, Seznam, Naver; Bing feeds Copilot and ChatGPT
 * search) which pages changed. Reads the live sitemap and submits every URL
 * whose <lastmod> falls within the last N days (default 3).
 *
 *   node scripts/indexnow-submit.mjs            # changed in the last 3 days
 *   node scripts/indexnow-submit.mjs --days 30
 *   node scripts/indexnow-submit.mjs --all
 *
 * Runs automatically after each production deploy (.github/workflows/indexnow.yml).
 */
const SITE = process.env.SITE_URL || "https://www.jiniaenterprise.com";
const KEY = process.env.INDEXNOW_KEY || "23ef0eb9538231463a02ae89db78b5ce";

const args = process.argv.slice(2);
const all = args.includes("--all");
const daysArg = args.indexOf("--days");
const days = daysArg >= 0 ? Number(args[daysArg + 1]) : 3;

const res = await fetch(`${SITE}/sitemap.xml`);
if (!res.ok) throw new Error(`sitemap ${res.status}`);
const xml = await res.text();

const since = Date.now() - days * 86_400_000;
const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map(([, block]) => ({
    loc: block.match(/<loc>(.*?)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  }))
  .filter((u) => u.loc && (all || (u.lastmod && Date.parse(u.lastmod) >= since)))
  .map((u) => u.loc);

if (urls.length === 0) {
  console.log(`No URLs changed in the last ${days} days.`);
  process.exit(0);
}

const submit = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls.slice(0, 10_000),
  }),
});

console.log(`IndexNow: ${submit.status} for ${urls.length} URL(s)`);
if (![200, 202].includes(submit.status)) {
  console.error(await submit.text());
  process.exit(1);
}

# Blog Publishing API

Lets an automated agent create blog posts without logging in to `/admin`.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/blog/posts` | List posts (title, slug, status, date, url) |
| `POST` | `/api/blog/posts` | Create a post. Returns `201`, or `409` if the slug exists |
| `GET` | `/api/blog/posts/:slug` | Fetch one post, including draft posts |

There is no PATCH or DELETE endpoint.

Send the key as `Authorization: Bearer <key>` or `X-API-Key: <key>`.

## Environment variables (server only)

| Variable | Purpose |
|---|---|
| `BLOG_API_KEY` | The API key. Generate one with `openssl rand -hex 32`. |
| `SUPABASE_SERVICE_ROLE_KEY` | Lets the server insert posts. It bypasses row-level security. **Never prefix it with `NEXT_PUBLIC_`**, and never expose it to the browser. |

`NEXT_PUBLIC_SUPABASE_URL` must already be set. Add the two variables in the hosting dashboard, then redeploy. Rotate the key by changing `BLOG_API_KEY` and redeploying.

## Request body (POST)

```json
{
  "title": "Hiring a Car with Driver in Dhaka During Monsoon",
  "excerpt": "One or two sentences, about 150-160 characters.",
  "content": "Markdown body, no leading # title.",
  "slug": "optional-custom-slug",
  "author": "Jinia Enterprise",
  "coverImageUrl": "https://example.com/cover.jpg",
  "published": true
}
```

- `title`, `excerpt` and `content` are required. `title` is up to 255 characters, `excerpt` up to 300, `content` up to 100,000.
- `slug` is optional. If omitted, it is generated from the title with the same function the admin form uses (leading and trailing hyphens removed). If supplied, it must be lowercase letters, numbers and single hyphens.
- `published` defaults to `true`.
- `author` defaults to `Jinia Enterprise`.

## Behaviour

- **Duplicates:** if the slug exists, `POST` returns `409` with the existing post's `url` and does not create a second copy. A retry of the same request therefore cannot publish twice.
- **Caching:** after a create, the home page, `/blog`, the new post and `/sitemap.xml` are revalidated.
- **Rate limit:** 10 authenticated requests per minute. The counter is held in memory, so each running instance has its own count. Unauthenticated requests do not use it.
- **Logging:** one line per request (method, path, status). The key and the request body are never logged.

## Not yet implemented

- **`Idempotency-Key` header:** not stored separately. Retries are safe because the slug check returns `409` with the existing post. A retry with a different title would create a second post.
- **Publish date:** the table has no `published_at` column. The post's `created_at` is set by the database to the server time and is returned as `publishedAt`.
- **Scheduling from the laptop:** a cloud-hosted scheduled run can call this API. The browser fallback in the spec still needs the laptop.

## Quick check

```bash
curl -sS -H "Authorization: Bearer $BLOG_API_KEY" https://www.jiniaenterprise.com/api/blog/posts
```

# CHANGES — fix and redesign brief (31 Oct 2026)

Work is on the `dev` branch in three commits, so each can ship as its own deploy:

| Commit | Scope |
| --- | --- |
| `695a032` | **P0**: canonical domain, single H1, clean vehicle URLs, visible-by-default content. Ship this first, alone. |
| `3d5f032` | **P1**: Bangla pages, one price table, vehicle titles, forms, structured data, sitemap, IndexNow, llms.txt, mobile action bar |
| `059f9ac` | **Design + P2**: new home page, estimator, car picker, route map, airport meet & greet, journal posts, About facts, accessibility, performance |

To deploy P0 on its own: merge `695a032` into `main` first (for example `git merge 695a032`), wait for Search Console to settle, then merge the rest of `dev`.

---

## P0 — Critical

### P0-1 One canonical address
- `SITE_URL = "https://www.jiniaenterprise.com"` in `lib/business/identity.ts` is the one origin. It drives `metadataBase`, every canonical, `og:url`, every JSON-LD `url`/`@id`/`logo`/`image`/breadcrumb `item`, the sitemap, the robots `Sitemap:` line, the blog share URL and the email signature.
- `robots.txt`: removed the non-standard `Host:` line. All crawler allow rules are unchanged.
- `next.config.ts`: a 308 from `jiniaenterprise.com/*` to `https://www.jiniaenterprise.com/*` as a backstop, in case the bare domain ever reaches the app.
- Every sitemap URL is `https://www.`, returns 200 and is self-canonical (75 of 75 checked locally).

### P0-2 Home page heading
- Exactly one `<h1>` per page (all 75 sitemap pages checked).
- Home H1: **"Car rental with driver in Dhaka"**. "A better way to get there." is now a `<p>` tagline, with a real space between its lines.

### P0-3 Clean vehicle URLs
- `lib/vehicles/slugs.ts` maps each old slug to its clean URL. Lookups accept either the old or the new database slug, so renaming the rows is optional and safe at any time (`supabase/migrations/20261031120000_clean_vehicle_slugs.sql`).
- All internal links, `generateStaticParams` and the sitemap use the clean slug. A crawl of every page found no link to an old URL.

### P0-4 Visible without scrolling or JavaScript
- The scroll "reveal" no longer starts at `opacity: 0`. It only nudges position, and only under `prefers-reduced-motion: no-preference`.
- Fleet card images no longer start transparent until `onLoad`. Empty galleries fall back to `image_url`. Alt text is descriptive ("Toyota Noah 7-seater mpv for rent with driver in Dhaka").
- Vehicle and blog pages read public data without cookies, with a 5-minute revalidate. Before this, any slug not prebuilt at deploy time returned a 500.
- Removed the **placeholder testimonials** ("Placeholder name") that were rendering on the live home page as if they were real quotes.

## P1 — High impact

### P1-1 Bangla pages
- New pages: `/bn/car-rental-dhaka`, `/bn/car-rental-with-driver`, `/bn/services/airport-transfer`, `/bn/routes/dhaka-to-coxs-bazar`. Content is in `content/bn/pages.ts`; every price and time comes from the English pages or the price table.
- `<html lang="bn-BD">` on Bangla pages. This works through two root layouts: existing pages moved into an `app/(site)` route group, with no URL changes, and `app/global-not-found.tsx` serves 404s for both.
- hreflang `en-BD` / `bn-BD` / `x-default` (English) on both sides, and in the sitemap.
- EN | বাংলা switch in the header at every width.
- Hind Siliguri loads on `/bn` pages only, with a fallback stack of Noto Sans Bengali, Nirmala UI, Vrinda and Bangla Sangam MN.

### P1-2 Clear, consistent pricing
- **`content/fleet-prices.ts` is the single price table** used by the pricing page, vehicle pages, fleet cards, quick view, estimator, departures board, car picker, FAQ, journal posts and llms.txt.
- Every price shows one unit: "From ৳3,500 / day, 10–12 hours, Dhaka city". Monthly shows "Quoted for your hours".
- Each vehicle page has one quotable sentence, e.g. "Toyota X-Noah (2012–14) (7 seats) with driver in Dhaka: from ৳3,500 per day for about 10–12 hours within the city. Fuel, overtime, tolls and parking are included or billed as written on your quote; outstation trips are quoted separately."
- Product JSON-LD has an `Offer` with `price`, `priceCurrency: "BDT"` and a `UnitPriceSpecification` with `unitText: "DAY"`, matching the visible price (checked on all 15 vehicle pages). Vehicles with no published price get no Offer.
- The extras sentence follows `/policies/overtime-and-fuel`. I did not use the brief's example ("fuel, tolls and parking are extra; outstation adds a driver allowance"), because the site's policy says fuel is sometimes included.

### P1-3 Vehicle titles and H1s
- Title: "Toyota Noah 2012–14 Rental with Driver in Dhaka | 7 Seats | Jinia Enterprise". Model years are added only where two units share a model (Noah, Prado, H1), so no two pages share a title.
- H1: "Toyota Noah (2012–14) rental with driver".

### P1-4 One promise
- `RESPONSE_PROMISE` in `lib/business/identity.ts` ("Reply inside the hour") replaces three different promises: "inside the hour", "within 24 hours" (vehicle form) and "within two hours" (booking confirmation).

### P1-5 Forms for Bangladesh
- Dates display as "12 Nov 2026" (`components/forms/DateField.tsx`, a native picker with an ISO value).
- Phone accepts `01XXXXXXXXX`, `+8801XXXXXXXXX` and `8801…`, with spaces or dashes; foreign `+country` numbers are accepted too. Numbers are stored as `+8801…`.
- After submitting, and on error, every form offers **"Send this request on WhatsApp"**, with the details pre-filled (`https://wa.me/8801716633445?text=…`).
- The booking form has a flight-number field for airport bookings ("We track your flight"). `/booking` now honours `?vehicle=` (the fleet cards already sent it, but it was ignored) and `?type=airport`.

### P1-6 Entity and trust signals
- LocalBusiness: full street address including Gulshan; `founder` (MD. Shahab Uddin, Managing Director, as on the About page); `areaServed` covering Dhaka, Cox's Bazar, Sylhet, Chattogram, Sreemangal, DAC airport and Bangladesh; `hasMap`; `priceRange` taken from the table; a 24/7 reservations `contactPoint`.
- The same formatted address is now printed in the footer, booking page, About page and contact page. The footer used to omit "Gulshan".
- No `aggregateRating` or `review` markup, because the site shows no real reviews.

### P1-7 Sitemap and discovery
- `<lastmod>` uses dates kept by hand in `lib/seo/lastmod.ts`, not the build time (which told crawlers every page changed on every deploy). Database rows use their own `updated_at` when newer.
- IndexNow: key file at `/23ef0eb9538231463a02ae89db78b5ce.txt`, `scripts/indexnow-submit.mjs` (`npm run indexnow`), and `.github/workflows/indexnow.yml`, which submits recently changed URLs after each successful **Production** deployment.
- `/llms.txt` is generated from the same data.

## P2

- **About**: a "Business details" block with registered name, years in operation, Managing Director, phone, email, office address and a Google Maps link.
- **Journal**: three posts in `content/journal.ts`, merged with the Supabase posts in the list, post pages and sitemap:
  - `/blog/car-rental-with-driver-dhaka-cost-2026`
  - `/blog/dhaka-to-coxs-bazar-by-car`
  - `/blog/dhaka-airport-pickup-meet-and-greet`
- **Performance**: AVIF/WebP output; the hero image is `priority` + `fetchPriority="high"`; the board font isn't preloaded; the Bangla font is never loaded on English pages.
- **Location pages**: not changed. They already carry area-specific landmarks, airport times and typical trips. Reducing their similarity further needs genuinely local detail from the owner.

## Design: "Dhaka departures board"

- Tokens on `:root` in `app/globals.css`: green `#0b3d2e`, gold `#d9a400`, paper `#f7f8f5`, ink `#1c2620`, and the signal green. Dark equivalents apply under `[data-theme="dark"]` only, not automatically, because the rest of the site has no dark theme yet.
- JetBrains Mono for codes and prices; tabular figures for prices, times and seats.
- New home order: hero, instant estimator, "Which car fits?", route map, trust strip, fleet, the existing "important day" services, how it works, booking form, FAQ, clients, closing call to action.
  - **Hero**: H1, tagline, WhatsApp (primary) and Call, and the promise line. All of this sits above the fold at 390px.
  - **Departures board**: a real `<table>` with a per-cell CSS flap, off for reduced motion. It shows only published prices and says "ON REQUEST" otherwise. The car photo sits under the board.
  - **Estimator**: multiplies published day rates for city days. Airport, outstation and monthly say "quoted" instead of guessing. "Send this to WhatsApp" opens a pre-filled message.
  - **Car picker**: passengers and luggage map to the brief's vehicle groups, from the table, and link to each vehicle page.
  - **Route map**: Bangladesh outline from Natural Earth (public domain). Routes from Dhaka to CXB, CGP, ZYL and Sreemangal, with hover/tap cards showing drive times from the route pages. The same facts appear as a text list. Sreemangal has no IATA code, so none is invented.
  - **How it works**: step 1 opens WhatsApp.
  - **FAQ**: native `<details>` with FAQPage markup; every answer has a number or a policy.
- **Mobile**: a sticky WhatsApp | Call | Get quote bar with safe-area padding on every page. The Nodi chat bubble is lifted above it. Bar targets are 56px; new controls are at least 44px.
- **Airport pages**: a meet & greet sign ("MR. RAHMAN · JINIA", labelled as an illustration) with the four steps after landing at DAC, and a "Book with your flight number" link.
- **Accessibility**: no more `<button>` nested inside `<a>`; contrast fixes; footer headings are `h2`; keyboard focus styles kept.

## Redirects added (all 308 permanent)

| From | To |
| --- | --- |
| `https://jiniaenterprise.com/*` | `https://www.jiniaenterprise.com/*` (backstop in `next.config.ts`) |
| `/vehicles/toyota-land-cruiser-prado-2012-15-copy-8zlbl` | `/vehicles/toyota-land-cruiser-prado-2016-20` |
| `/vehicles/toyota-prado` | `/vehicles/toyota-land-cruiser-prado-2012-15` |
| `/vehicles/toyota-x-noah-2015-18-ny98u` | `/vehicles/toyota-noah-2015-18` |
| `/vehicles/toyota-noah` | `/vehicles/toyota-noah-2012-14` |
| `/vehicles/toyota-corolla-cross-jsbl1` | `/vehicles/toyota-corolla-cross` |
| `/vehicles/hyundai-h1-new` | `/vehicles/hyundai-h1-2017-18` |
| `/vehicles/hyundai-h1` | `/vehicles/hyundai-h1-2019-20` |

## TODO(owner)

Facts the site needs before it can show them. Until then, each one is hidden or says "on request".

1. **Bangla wording**: review all four `/bn` pages before they go live (`content/bn/pages.ts`).
2. **Day rates**: confirm every rate in `content/fleet-prices.ts`. The old `/pricing` table said Hyundai H1 ৳4,500 and H1 (New) ৳6,000, but the live vehicle pages say ৳8,000 and ৳7,000. The table uses the vehicle-page figures. Also confirm the 10–12 hour duty window.
3. **Monthly rates**: none are published (`monthlyFrom` is null everywhere).
4. **Airport transfer price**, **Cox's Bazar trip price** and other route prices, for the board and the route map (`content/home-board.ts`).
5. **Route distances in km** (`content/home-board.ts`); they're not shown until provided.
6. **Response promise**: is "Reply inside the hour" true at night and on Fridays? (`RESPONSE_PROMISE`)
7. **"2,500+ trips completed"**: confirm against records (`components/home/TrustStrip.tsx`).
8. **Opening hours**: the schema lists the office as Sat–Thu 9:00–20:00 and Fri 10:00–18:00, and the phone line as 24/7. If the office itself is 24/7, change `lib/seo/schema.ts`.
9. **Official profiles for `sameAs`**: the Google Business Profile link, the Bikroy shop URL, and confirmation that `facebook.com/jiniaenterprise` and `linkedin.com/company/jiniaenterprise` are the real pages (`lib/business/identity.ts`).
10. **Trade licence number** and issuing authority for the About page.
11. **Google rating**: add it to the trust strip, with matching AggregateRating markup, only once the Business Profile has real reviews.
12. **Client names and logos**: the client wall lists embassies and companies (Thai Embassy, Samsung and others). Confirm you have permission to show each one.
13. **Photo shoot**: real photos of your own cars in Dhaka (airport, Hatirjheel, Gulshan) to replace the studio cut-outs.
14. **Optional**: run the slug migration in Supabase (`supabase/migrations/20261031120000_clean_vehicle_slugs.sql`).

## Owner-only settings (outside the code)

- **Vercel → Settings → Domains**: make `www.jiniaenterprise.com` primary and redirect `jiniaenterprise.com` to it with **308 Permanent**. Today it's a 307.
- **DNS**: `http://jiniaenterprise.com` did not resolve during the audit. Set the apex A/ALIAS record and the `www` CNAME as Vercel instructs.
- Then: Search Console (verify www, submit the sitemap, request indexing), Bing Webmaster Tools, Google Business Profile, directory listings, and asking customers how they found you. All of this is as written in the brief.

## Verification (local production build, 31 Oct 2026)

These checks ran on a local production build with placeholder database keys, so vehicles came from the fallback data in `lib/config.ts`.

- [x] Sitemap: 75 URLs, all `https://www.`, all with `lastmod`, `/bn` pages included with hreflang alternates.
- [x] All 75 pages return 200, are self-canonical, have exactly one H1, and have a title and meta description.
- [x] The 7 old vehicle URLs return 308 to their new URLs; no internal link points at an old URL.
- [x] hreflang pairs are correct on all 4 Bangla pages and their English twins; `<html lang="bn-BD">` on `/bn`.
- [x] All JSON-LD parses (LocalBusiness, WebSite, Service, Product, Article, FAQPage, BreadcrumbList); vehicle Offer prices equal the visible prices.
- [x] With JavaScript disabled: no section or image starts transparent; prices are present in the HTML.
- [x] `/llms.txt` returns 200; the IndexNow key file returns 200; `robots.txt` lists the www sitemap with no Host line.
- [ ] **Google Rich Results Test / schema.org validator**: not run, because they need the deployed URL. Run them on the Vercel preview for home, `/services/airport-transfer`, a vehicle page, `/faq` and a blog post.
- [ ] **curl against the live domains** (`curl -sI https://jiniaenterprise.com/car-rental-dhaka` should return a single 308 to www): needs the Vercel domain change and a deploy.
- [ ] **Lighthouse mobile targets**: partly met. Local results, which are noisy:

  | Page | Performance | Accessibility | Best Practices | SEO |
  | --- | --- | --- | --- | --- |
  | Home | 83 | 97 | 96 | 100 |
  | Vehicle page | 77 | 95 | 96 | 100 |
  | `/bn/car-rental-dhaka` | 88 | 100 | 96 | 100 |
  | `/services/airport-transfer` | 97 | 96 | 96 | 100 |

  SEO 100 is met everywhere. The accessibility numbers predate the final contrast fixes. Performance 85+ is not yet met on home and vehicle pages. The biggest remaining costs are the third-party chat widget (about 67 KB of script), a 247 KB team photo that the home page requests although no home-page code references it (probably the chat widget), and the large studio PNGs. Re-measure on the deployed site.

# Technical SEO Audit — quilliamsmowing.co.uk

**Date:** 2026-05-26
**Auditor:** Technical SEO agent (automated header/HTML inspection)
**Stack confirmed:** Next.js 16 (App Router) on Vercel, fronted by Cloudflare
**Edge signals:** `x-vercel-cache: HIT/PRERENDER`, `cf-ray` present, `server: cloudflare`

---

## Technical SEO Score: **92 / 100**

Strong overall. Foundations (canonicals, hreflang locale, HTTPS, HSTS preload, CSP, sitemap, redirects, prerendering, structured data) are essentially textbook. The 8-point deduction is driven by one Medium issue (duplicated brand suffix in the offer page title) and a handful of Low-severity polish items (sitemap missing `<lastmod>`, no `Server-Timing` hints for CWV diagnostics, canonical for homepage missing trailing slash consistency, etc.).

---

## Summary table

| Category | Status | Notes |
|---|---|---|
| Crawlability (robots.txt) | PASS | Sitemap referenced, AI crawler policy explicit, `/keystatic` + `/ph/` correctly disallowed |
| Indexability | PASS | All audited indexable URLs return 200, no rogue `noindex`. `/offers/*` correctly `noindex,nofollow` |
| Canonicals | PASS | Self-referential, absolute, HTTPS, apex host on all 5 audited indexable URLs |
| hreflang | PASS (acceptable for single-locale) | `<html lang="en-GB">` + `og:locale=en_GB`; no `<link rel="alternate" hreflang>` (acceptable, single-locale site) |
| Security headers | PASS | HSTS preload, strict CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, NEL/Report-To configured |
| HTTPS / redirects | PASS | `http->https` 308, `www->apex` 307, `trailing-slash -> no-slash` 308 — all single-hop |
| URL structure | PASS | Lowercase, hyphenated, hierarchical, no query strings, case-sensitive 404 on `/Services` (correct) |
| Mobile viewport | PASS | `width=device-width, initial-scale=1` present on every audited page |
| `<html lang>` | PASS | `en-GB` everywhere |
| Sitemap | PASS w/ minor gap | 33 URLs, all canonical, no orphans detected; missing `<lastmod>` / `<changefreq>` / `<priority>` |
| Core Web Vitals signals (source) | PASS w/ caveats | Heavy `rel=preload` of fonts + hero images + logo; speculation-rules enabled; no `Server-Timing` exposed |
| Structured data | PASS | LocalBusiness, Service, Organization, FAQPage, BreadcrumbList, BlogPosting, AggregateRating, Review all detected |
| JS rendering (CSR vs SSR) | PASS | `x-nextjs-prerender: 1` on all routes; meaningful HTML in source (no client-only render) |
| IndexNow | PASS | Key file `/6aa67e76d1540f4f36f507f3702f677c.txt` returns 200 with correct content |

---

## Findings (by severity)

### Critical
_None._

### High
_None._

### Medium

#### M1 — Duplicated brand suffix in `/offers/gravel-gardens` `<title>`
- **URL:** `https://quilliamsmowing.co.uk/offers/gravel-gardens`
- **Observed:** `<title>Free Gravel Garden Design Consultation | Quilliams Gardening & Landscaping | Quilliams Gardening & Landscaping</title>`
- **Why it matters:** The brand name is concatenated twice. Even though the page is `noindex,nofollow` (intentional, per the offers policy), it is still served, shared on paid/social, and appears in browser tabs / link previews. It also suggests a duplicated `title.template` + `title.default` pattern in Next.js metadata that may bleed into indexable pages if the template is reused.
- **Likely root cause:** A `metadata.title` string that already includes the brand suffix is being passed through a parent `metadata.title.template` like `%s | Quilliams Gardening & Landscaping`. Inspect `app/(landing)/offers/gravel-gardens/page.tsx` (currently modified per git status) and the nearest parent `layout.tsx`.
- **Fix:** Either (a) set `metadata.title` as a plain string for this page (no template), or (b) provide `title.absolute` to bypass the parent template. Then sweep other routes to confirm no other page double-stamps the brand.
- **Severity:** Medium (cosmetic + brand polish; not an indexation problem because the page is `noindex`).

### Low

#### L1 — Homepage canonical lacks trailing slash; conflicts with edge redirect direction
- **URL:** `https://quilliamsmowing.co.uk/`
- **Observed:** `<link rel="canonical" href="https://quilliamsmowing.co.uk"/>` (no trailing slash). Meanwhile `https://quilliamsmowing.co.uk/services/` 308s to `/services` (no trailing slash) — so the site policy is "no trailing slash". For the homepage though, the canonical points to bare-host (no path), while users land on `/`.
- **Why it matters:** Minor. Google normalises this, but a self-referential canonical that exactly matches the served URL is best practice. It also keeps Bing/Yandex/IndexNow consistent.
- **Fix:** Change the homepage canonical to `https://quilliamsmowing.co.uk/` (with trailing slash) to match the actual served URL. In Next.js App Router this is usually `metadata.alternates.canonical: "/"` resolving against `metadataBase`.
- **Severity:** Low.

#### L2 — Sitemap missing `<lastmod>`, `<changefreq>`, `<priority>`
- **URL:** `https://quilliamsmowing.co.uk/sitemap.xml`
- **Observed:** 33 `<url>` entries, each containing only `<loc>`.
- **Why it matters:** Google ignores `<changefreq>`/`<priority>`, but **does** use `<lastmod>` as a freshness signal and to prioritise recrawl. Without it, blog posts / updated area pages may take longer to re-crawl. Also blocks IndexNow change-detection optimisations.
- **Fix:** Emit `<lastmod>` (ISO 8601) per URL in `app/sitemap.ts` using the post/page `updatedAt` from your Keystatic content frontmatter (or file mtime fallback). Example output:
  ```xml
  <url>
    <loc>https://quilliamsmowing.co.uk/blog/best-gardeners-newquay</loc>
    <lastmod>2026-05-12</lastmod>
  </url>
  ```
- **Severity:** Low.

#### L3 — No `Server-Timing` header exposed → harder to diagnose LCP/TTFB regressions
- **Observed:** Responses include `x-vercel-cache`, `x-vercel-id`, `cf-cache-status`, but no `Server-Timing`. Vercel can surface edge/origin/cache timings via Server-Timing when enabled.
- **Why it matters:** Doesn't affect ranking directly, but slows down CWV debugging. Lighthouse / WebPageTest / RUM tools pick up `Server-Timing` automatically.
- **Fix:** In `next.config.ts`, enable Vercel Speed Insights timing headers, or set `headers()` to emit a `Server-Timing` with `cdn-cache;desc="HIT"` etc. Low priority.
- **Severity:** Low.

#### L4 — Aggressive `rel=preload` count may compete for early bandwidth on slow mobile
- **Observed:** Homepage source preloads 2 fonts + ~13 logo srcset variants + hero image variants. Logo preload uses `imageSizes="176px"` but ships a srcset up to `1920w`.
- **Why it matters:** Over-preloading is a known LCP foot-gun on 3G/slow-4G — every preloaded resource competes with the actual LCP element. The logo at 176px should never need a 1920w candidate preloaded.
- **Fix:** Cap the logo's preload candidates. If using `next/image` with `priority`, set explicit `sizes="176px"` and consider `loading="eager"` without `priority` for non-LCP logos; reserve `priority` exclusively for the LCP hero. Test with Lighthouse mobile and the CrUX dashboard after change.
- **Severity:** Low.

#### L5 — `cache-control: public, max-age=0, must-revalidate` on HTML
- **Observed:** All HTML responses use `max-age=0, must-revalidate`. Vercel's edge cache still serves them (PRERENDER/HIT), but browsers will revalidate on every navigation.
- **Why it matters:** Fine for content-driven pages where you want freshness. However, for stable pages (privacy, terms, about) a short `s-maxage` with `stale-while-revalidate` would reduce TTFB and improve perceived LCP for return visits.
- **Fix:** Optional. Consider per-route revalidation strategy or `Cache-Control: public, max-age=0, s-maxage=3600, stale-while-revalidate=86400` for stable pages.
- **Severity:** Low.

#### L6 — `vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch` may fragment CDN cache
- **Observed:** Four `Vary` tokens on HTML responses (Next.js App Router default).
- **Why it matters:** Standard Next.js behaviour, but worth confirming Cloudflare's cache key normalises on these so bots and humans share a cache entry. Currently `cf-cache-status: DYNAMIC` on every audited URL, which suggests Cloudflare is not caching HTML at all — Vercel's edge does the caching.
- **Fix:** No action required unless you want Cloudflare-tier HTML caching. If yes, configure a Cache Rule that strips/normalises the RSC `Vary` headers for bot UAs.
- **Severity:** Low / informational.

#### L7 — No `<link rel="alternate" hreflang>` declared (single-locale site)
- **Observed:** `<html lang="en-GB">` + `og:locale=en_GB` only.
- **Why it matters:** For a single-locale UK business this is acceptable — Google infers locale from `lang`, ccTLD (`.co.uk`), and content. However, adding `<link rel="alternate" hreflang="en-GB" href="<self>"/>` and `hreflang="x-default"` makes the locale signal explicit and is harmless.
- **Fix:** Optional. If/when you ever add other locales, emit via `metadata.alternates.languages` in the root layout. For now, defer.
- **Severity:** Low (defer until multi-locale, per the `seo-hreflang` skill guidance).

---

## Detailed evidence

### Canonicals (all self-referential, absolute, HTTPS, apex)
| URL | Canonical | Match |
|---|---|---|
| `/` | `https://quilliamsmowing.co.uk` | OK (see L1 re trailing slash) |
| `/services` | `https://quilliamsmowing.co.uk/services` | OK |
| `/services/lawn-care` | `https://quilliamsmowing.co.uk/services/lawn-care` | OK |
| `/areas/truro` | `https://quilliamsmowing.co.uk/areas/truro` | OK |
| `/blog/best-gardeners-newquay` | `https://quilliamsmowing.co.uk/blog/best-gardeners-newquay` | OK |
| `/offers/gravel-gardens` | (none — page is `noindex,nofollow`) | OK (intentional) |

### Robots / indexability
- No `<meta name="robots">` on `/`, `/services`, `/services/lawn-care`, `/areas/truro`, `/blog/best-gardeners-newquay` → defaults to `index,follow`. Correct.
- `/offers/gravel-gardens` → `<meta name="robots" content="noindex, nofollow"/>`. Correct.
- No `X-Robots-Tag` HTTP header on any audited URL (no override fighting the meta tag). Correct.

### Redirects (all single-hop)
| From | To | Status |
|---|---|---|
| `http://quilliamsmowing.co.uk/` | `https://quilliamsmowing.co.uk/` | 308 |
| `https://www.quilliamsmowing.co.uk/` | `https://quilliamsmowing.co.uk/` | 307 |
| `https://quilliamsmowing.co.uk/services/` | `/services` | 308 |
| `https://quilliamsmowing.co.uk/Services` | 404 (case-sensitive, correct) | 404 |
| `https://quilliamsmowing.co.uk/nonexistent-page-xyz` | 404 | 404 |

Note: the `www -> apex` is 307 (temporary). 308 would be marginally better (permanent redirect, preserves method) but 307 is fine for SEO purposes — Google treats both as redirects and follows the canonical. No action.

### Sitemap (33 URLs)
All sitemap entries are canonical and appear to match the auditable surface (`/`, `/services`, `/projects`, `/pricing`, `/contact`, `/quote`, `/about`, `/areas`, `/blog`, blog posts, `/site-map`, `/refer`, `/privacy`, `/terms`, 6× `/services/*`, 4× `/projects/*`, 9× `/areas/*`). `/offers/*` correctly excluded.

### IndexNow
- `https://quilliamsmowing.co.uk/6aa67e76d1540f4f36f507f3702f677c.txt` → `200`, body `6aa67e76d1540f4f36f507f3702f677c` (exact filename match — valid).
- robots.txt references the key file as a comment. Bing, Yandex, Naver can verify.
- **Recommendation:** Confirm you have a webhook or sitemap-diff job actually *submitting* changed URLs to `https://api.indexnow.org/indexnow` on publish — owning the key file alone doesn't push updates.

### Structured data (detected JSON-LD types per page)
- **Homepage:** WebSite, WebPage, LocalBusiness (Organization), Service, Person, PostalAddress, GeoCoordinates, OpeningHoursSpecification, AggregateRating, Review, Rating, FAQPage, Question, Answer, ImageObject, PropertyValue, City.
- **`/areas/truro`:** WebSite, BreadcrumbList, ListItem, Person, PostalAddress, GeoCoordinates, OpeningHoursSpecification, City, PropertyValue.
- **`/blog/best-gardeners-newquay`:** WebSite, BlogPosting, BreadcrumbList, ListItem, FAQPage, Question, Answer, Person, PostalAddress, GeoCoordinates, OpeningHoursSpecification, City, PropertyValue.

All key types present. Recommend validating with `https://validator.schema.org/` and Google Rich Results Test against the live URLs after the M1 title fix.

### JavaScript rendering
- Every audited route returns `x-nextjs-prerender: 1` and `x-vercel-cache: PRERENDER` or `HIT`.
- HTML source contains the actual content, meta tags, JSON-LD, and structured headings (verified via grep on saved bodies). No client-side-render gating. Crawlers without JS execution will see the same content as users — fully SSR/SSG.

### Security headers (all present on every URL)
- `strict-transport-security: max-age=31536000; includeSubDomains; preload` (HSTS preload-ready)
- `content-security-policy:` strict, scoped to `'self'` + explicit third parties (PostHog, Cloudflare Turnstile, OSM tiles, Carto basemaps). `frame-ancestors 'self'`, `base-uri 'self'`, `form-action 'self'` — excellent.
- `x-frame-options: SAMEORIGIN`
- `x-content-type-options: nosniff`
- `referrer-policy: strict-origin-when-cross-origin`
- `permissions-policy: camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()` (FLoC/Topics opt-out)
- `cross-origin-opener-policy: same-origin`
- NEL + Report-To configured (Cloudflare reporting endpoint)

---

## Prioritised action list

1. **(Medium)** Fix duplicated brand suffix in `/offers/gravel-gardens` `<title>`. Audit Next.js `metadata.title.template` usage across `app/(landing)/offers/*` and root `layout.tsx`. File: `app/(landing)/offers/gravel-gardens/page.tsx`.
2. **(Low)** Add `<lastmod>` to every sitemap entry from content frontmatter. File: `app/sitemap.ts` (or wherever `sitemap.xml` is generated).
3. **(Low)** Normalise homepage canonical to include trailing slash to match served URL (`https://quilliamsmowing.co.uk/`).
4. **(Low)** Trim `rel=preload` srcset breadth for the 176px logo to avoid wasting bandwidth on `1920w` variants pre-LCP.
5. **(Low)** Optionally enable `Server-Timing` for CWV/TTFB diagnostics.
6. **(Low / defer)** Add explicit `<link rel="alternate" hreflang="en-GB">` and `x-default` only when adding additional locales — see `seo-hreflang` sub-skill if/when that happens.
7. **(Verify)** Confirm an automated IndexNow submission pipeline exists on publish — the key file alone is necessary but not sufficient.

---

## Core Web Vitals — source-level flags (no field data inspected)

Source inspection cannot measure runtime LCP/INP/CLS, but flagged risks worth a real Lighthouse + CrUX check:

- **LCP risk:** Multiple competing `rel=preload` images. Likely fine on desktop, watch on mobile 4G. Target <2.5s.
- **INP risk:** Heavy hydration of the App Router page on `/services` (~106 KB HTML, many async chunks). Audit whether any client components attach blocking handlers. Target <200ms.
- **CLS risk:** Hero images preloaded with srcset suggest dimensions are set — low risk if `next/image` is used everywhere with explicit width/height. Confirm no late-injected banner/cookie bar shifts layout. Target <0.1.

Recommend running PageSpeed Insights against the homepage, `/services/lawn-care`, and `/areas/truro` to capture live CrUX data and INP percentiles before/after the L4 preload tweak.

# Technical SEO Re-Audit — quilliamsmowing.co.uk

- Audit date: 2026-05-26 20:25 UTC
- Scope: Verification pass after the 19:25 remediation and Cloudflare proxy switch-off (DNS-only, Vercel direct)
- Stack: Next.js 16 (App Router) on Vercel — no front proxy
- Sitemap size: 39 URLs (all 200)
- Sample analysed: 16 URLs across `/`, `/services/*`, `/areas/*`, `/projects/*`, `/blog/*`, `/quote`, `/pricing`, `/site-map`, `/contact`, plus `/offers/gravel-gardens` (noindex) and `/this-does-not-exist-xyz` (404)

## Score: 96 / 100 (delta +4 vs morning 92/100)

Deductions:
- minus 2 — Homepage canonical and sitemap root `<loc>` still omit trailing slash (LOW-B, was LOW-1)
- minus 2 — CSP still ships `'unsafe-inline'` and `'unsafe-eval'` on `script-src` (LOW-C, was LOW-2)

Resolved since morning:
- TECH-A MEDIUM (www->apex 307) — **FIXED**, now 308
- TECH-D LOW (`/services/` 308 to `/services`) — verified still 308 but no internal links produce it (grep clean), so it is purely a defensive redirect
- TECH-E LOW (JSON-LD inconsistency) — **FIXED**, both home and sub-pages now emit exactly one `<script type="application/ld+json">` block
- Cloudflare cutover — clean, no regressions detected (see section 9)

No Critical or High issues. Site is in excellent technical health.

---

## 1. Crawlability — PASS

| Check | Result |
|---|---|
| `robots.txt` 200, served from Vercel edge (`x-vercel-cache: HIT`, age 89s) | Pass |
| `Sitemap:` directive present, points to `https://quilliamsmowing.co.uk/sitemap.xml` | Pass |
| `/keystatic` and `/ph/` disallowed | Pass |
| AI crawler list current (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Applebot-Extended allowed; CCBot, Bytespider, meta-externalagent blocked) | Pass |
| Sitemap XML well-formed, 39 `<loc>` entries, all https + apex | Pass |
| Sitemap served `x-vercel-cache: HIT`, age 169s | Pass |

No findings.

## 2. Indexability — PASS (1 Low)

All 39 sitemap URLs were probed end-to-end. Every one returned `200` with `0` redirects:

```
/                                                /services
/services/garden-maintenance                     /services/hedge-trimming
/services/landscaping                            /services/lawn-care
/services/mulching                               /services/seasonal-cleanup
/projects                                        /projects/gravel-garden-with-patio
/projects/leylandii-hedge-trim-4m-tall           /projects/ongoing-garden-maintenance
/projects/overgrown-mess-to-clean-gravel-garden  /areas
/areas/truro     /areas/st-austell  /areas/bodmin     /areas/padstow
/areas/perranporth /areas/st-ives   /areas/newquay    /areas/wadebridge
/areas/st-agnes                                  /blog
/blog/best-gardeners-newquay                     /blog/best-plants-coastal-cornwall-gardens
/blog/gardener-cost-cornwall-2026                /blog/hedge-trimming-cornwall-cost-timing
/blog/low-maintenance-garden-ideas-cornwall      /blog/remove-established-pampas-grass
/blog/scarify-aerate-feed-lawn-cornwall          /pricing
/contact         /quote        /about    /refer  /privacy  /terms  /site-map
```

Canonicals (spot-check 7):

| Page | Canonical |
|---|---|
| `/` | `https://quilliamsmowing.co.uk` (no slash — see LOW-B) |
| `/services/lawn-care` | self |
| `/areas/truro` | self |
| `/blog/gardener-cost-cornwall-2026` | self |
| `/projects/gravel-garden-with-patio` | self |
| `/pricing` | self |
| `/quote` | self |
| `/offers/gravel-gardens` | n/a, `<meta name="robots" content="noindex, nofollow"/>` — correct |

### LOW-B — Homepage canonical and sitemap root `<loc>` still omit trailing slash
- Carried over from morning's LOW-1 (no fix shipped in this remediation pass).
- Where: `/` emits `<link rel="canonical" href="https://quilliamsmowing.co.uk"/>`; `sitemap.xml` emits `<loc>https://quilliamsmowing.co.uk</loc>`.
- Why it matters: Sub-pages all canonicalise to `https://quilliamsmowing.co.uk/path`. The root signal disagrees by omitting the slash. Google normalises and this is cosmetic, but Bingbot/Yandexbot are more literal.
- Fix: Emit `https://quilliamsmowing.co.uk/` in both the homepage `<link rel="canonical">` and `sitemap.xml`'s root `<loc>`. Easiest place is the `metadataBase`/sitemap factory.

### Hreflang
Single locale (`en-GB`), `<html lang="en-GB">` everywhere, no alternates needed. Pass.

## 3. Security Headers — PASS (1 Low)

Homepage response (apex, post-CF-bypass):

| Header | Value | Status |
|---|---|---|
| `strict-transport-security` | `max-age=31536000; includeSubDomains; preload` | Pass |
| `x-content-type-options` | `nosniff` | Pass |
| `x-frame-options` | `SAMEORIGIN` | Pass |
| `referrer-policy` | `strict-origin-when-cross-origin` | Pass |
| `permissions-policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()` | Pass |
| `cross-origin-opener-policy` | `same-origin` | Pass |
| `content-security-policy` | Present, allowlists PostHog + Cloudflare Turnstile + map tiles + Unsplash/Picsum | Pass (see LOW-C) |
| `x-dns-prefetch-control` | `on` | Pass |
| `content-encoding` | Brotli served on HTML | Pass |
| `server` | `Vercel` (no Cloudflare front any more) | Confirmed bypass |

The `www->apex` redirect inherits `strict-transport-security: max-age=63072000` from Vercel's default redirect handler — fine.

### LOW-C — CSP still uses `'unsafe-inline'` and `'unsafe-eval'` on `script-src`
- Same finding as morning's LOW-2 — Next.js default. Not a ranking issue, defence-in-depth only.
- Fix: Long-term, move to nonce-based CSP via `middleware.ts`.

## 4. URL / Redirect Hygiene — PASS

### REGRESSION CHECK — www->apex 307 (MEDIUM-1 from morning)
**FIXED.** `https://www.quilliamsmowing.co.uk/` now returns:

```
HTTP/2 308
location: https://quilliamsmowing.co.uk/
strict-transport-security: max-age=63072000
server: Vercel
```

Both http and https variants emit 308. Vercel is now serving the www subdomain directly (fresh SSL cert evident in TLS handshake, x-vercel-id present on the redirect itself). No 307s anywhere in the redirect surface.

### Other redirect probes

| Probe | Result | Status |
|---|---|---|
| `http://quilliamsmowing.co.uk/` -> `https://quilliamsmowing.co.uk/` | 308 | Pass |
| `http://www.quilliamsmowing.co.uk/` -> `https://www.quilliamsmowing.co.uk/` | 308 | Pass |
| `https://www.quilliamsmowing.co.uk/` -> `https://quilliamsmowing.co.uk/` | 308 | Pass (was 307) |
| `https://quilliamsmowing.co.uk/services/` -> `/services` | 308 | Pass (defensive only — no internal links trigger it, see below) |
| `https://quilliamsmowing.co.uk/this-does-not-exist-xyz` | 404 (hard) | Pass |
| Sample 16 in-sitemap URLs | 200, 0 redirects | Pass |

### Internal trailing-slash audit
`grep -RIn 'href="/[^"]*/"' app components` returned zero matches. No internal link will ever produce the `/services/` -> `/services` hop. TECH-D considered resolved in practice; the redirect remains as a backstop for external/manual entry, which is correct.

## 5. Status Codes — PASS

100% sitemap coverage (39/39) returns `200`. Sampled response times from London (lhr1) are 0.44s - 1.57s with `x-vercel-cache: HIT` consistently. No 4xx/5xx in sitemap, no redirect chains on sitemap URLs.

## 6. Mobile / Viewport — PASS

- `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present on all sampled pages.
- `<html lang="en-GB">` set everywhere.
- No `maximum-scale` / `user-scalable=no` (accessibility-safe).

No findings.

## 7. Render-Blocking / JS Rendering — PASS

- `x-nextjs-prerender: 1` on every page sampled — HTML server-prerendered, crawlers do not need JS execution.
- `x-nextjs-stale-time: 300` — 5-minute ISR window.
- All `<script>` tags `async`. CSS bundled in `<head>`.
- Hero LCP image: `fetchPriority="high"` + `<link rel="preload" as="image" imageSrcSet=...>` in `<head>`.
- Fonts preloaded as `woff2` with `crossorigin`. Below-fold images `loading="lazy"`.
- Homepage HTML weight: 197,261 bytes uncompressed (~32 KB Brotli) — comparable to morning, unchanged.

### JSON-LD consistency — RESOLVED
TECH-E was about home using a single combined block while sub-pages used multiple. Today's HTML now shows:

- `/` — **1** `<script type="application/ld+json">` tag containing an `@graph` with 6 nodes (LocalBusiness, WebSite, WebPage, ImageObject, Person, AggregateRating/Reviews)
- `/services/lawn-care` — **1** `<script type="application/ld+json">` tag
- `/areas/truro` — **1** `<script type="application/ld+json">` tag

Both home and sub-pages now use the single-graph pattern. Inconsistency resolved.

Types observed on `/`: AdministrativeArea, AggregateRating, Answer, City, FAQPage, GeoCircle, GeoCoordinates, ImageObject, OpeningHoursSpecification, Person, Place, PostalAddress, PropertyValue, Question, Rating, Review, WebPage, WebSite. Rich and clean.

### Core Web Vitals (source-only inspection)

| Metric | Risk | Notes |
|---|---|---|
| LCP | LOW | Hero preloaded with `fetchPriority="high"`, fonts preloaded. Now served direct from Vercel edge (lhr1) with no extra CF hop, so TTFB should drop ~30-80ms vs morning. Expect comfortably <2.5s on 4G. |
| INP | LOW | All scripts async, no large blocking inline scripts beyond the PostHog snippet. Turnstile gated to form pages. Expect <200ms. |
| CLS | LOW | Hero `<img>` uses `data-nimg="fill"` inside sized container. No new map-widget shift risk introduced. |

INP is the sole interactivity metric (FID removed from all Chrome tooling September 2024).

## 8. IndexNow — PASS

- Key file: `https://quilliamsmowing.co.uk/6aa67e76d1540f4f36f507f3702f677c.txt`
- HTTP 200, `content-type: text/plain; charset=utf-8`, `x-vercel-cache: HIT`
- Body: `6aa67e76d1540f4f36f507f3702f677c` (32 bytes, matches filename)
- Still referenced in `robots.txt` comment
- Action item unchanged: confirm POSTs to `https://api.indexnow.org/IndexNow` fire on publish/update (out of scope for URL audit).

## 9. Cloudflare Cutover Regression Check — CLEAN

Comparison morning -> now:

| Signal | Morning (CF-proxied) | Now (Vercel-direct) | Verdict |
|---|---|---|---|
| `server` header | (Cloudflare upstream) | `Vercel` | Expected |
| `cf-ray` | present | absent | Expected |
| `cf-cache-status` | `DYNAMIC` | absent | Expected (no more CF cache layer) |
| `/cdn-cgi/scripts/.../email-decode.min.js` auto-injection | present | **absent** (grep -c returns 0) | Improvement — one fewer third-party script |
| `x-vercel-cache` | HIT | HIT | No regression |
| `x-nextjs-prerender` | 1 | 1 | No regression |
| `content-encoding` | br | br | No regression |
| `strict-transport-security` | preload | preload | No regression |
| All security headers | present | present | No regression |
| Sitemap reachable, well-formed | yes | yes | No regression |
| TTFB (London) | ~0.5-1.5s | ~0.44-1.57s | Comparable |

Notable wins from the cutover:
- One less hop in the request path
- No more Cloudflare email-decode script injected into HTML (removes a tiny render-blocking JS download and a minor CSP relaxation pressure)
- Headers are now solely controlled by Next.js/Vercel config — no risk of CF page-rules silently overriding Vercel responses

Notable losses from the cutover (none material):
- Lost CF's static-asset edge cache, but Vercel's own edge already serves `x-vercel-cache: HIT` on robots/sitemap/static text. Acceptable.
- Lost CF's bot management and WAF — only relevant if you were relying on it; for a 40-URL marketing site it's not a concern.

No new regressions detected. The cutover is clean.

---

## Prioritised Fix List

| Severity | ID | Finding | One-line fix |
|---|---|---|---|
| Low | LOW-B | Homepage canonical and sitemap root `<loc>` omit trailing slash | Emit `https://quilliamsmowing.co.uk/` in both places |
| Low | LOW-C | CSP allows `'unsafe-inline'` / `'unsafe-eval'` on `script-src` | Long-term move to nonce-based CSP via `middleware.ts` |

No Critical, High, or Medium issues remain.

## Delta vs Morning Audit (92/100 -> 96/100)

| ID | Morning severity | Status now |
|---|---|---|
| TECH-A (www->apex 307) | Medium | FIXED — 308 with Location header set |
| TECH-B (home canonical trailing slash) | Low | OPEN — carried as LOW-B |
| TECH-C (CSP unsafe-inline/eval) | Low | OPEN — carried as LOW-C |
| TECH-D (`/services/` 308 redirect) | Low | RESOLVED IN PRACTICE — no internal links trigger it, redirect retained as defensive backstop |
| TECH-E (JSON-LD aggregation inconsistency) | Low | FIXED — both home and sub-pages now emit single `<script type="application/ld+json">` blocks |

Net: 3 items closed (1 Medium + 2 Low), 2 items still open (both Low, both intentional/long-term). Score +4.

# Technical SEO Audit — quilliamsmowing.co.uk

- Audit date: 2026-05-26 19:25 UTC
- Scope: Technical SEO follow-up after earlier 2026-05-26 remediation
- Stack: Next.js 16 (App Router) on Vercel, fronted by Cloudflare
- Sitemap size: 39 URLs
- Sample analysed: 15 URLs across `/`, `/services/*`, `/areas/*`, `/projects/*`, `/blog/*`, `/quote`, `/pricing`, `/site-map`

## Score: 92 / 100

Deductions:
- minus 3 — www subdomain redirects with 307 instead of 308 (link equity / canonical signal)
- minus 2 — Sitemap homepage `<loc>` is `https://quilliamsmowing.co.uk` (no trailing slash) while Next.js convention typically emits `/`. Cosmetic but inconsistent with how most crawlers normalise.
- minus 1 — Trailing slash on sub-paths 308-redirects (e.g. `/services/` -> `/services`); ideal is for no internal link to ever produce the redirect at all, verify there are none.
- minus 1 — Sitemap/HTML pages served with `cache-control: public, max-age=0, must-revalidate` (no browser/Cloudflare TTL); ETag/revalidate path is fine but you are missing edge cache hits on robots/sitemap.
- minus 1 — CSP allows `'unsafe-inline'` and `'unsafe-eval'` on `script-src` (Next.js limitation, not strictly an SEO issue, but flagged for completeness).

Everything else passes cleanly. No Critical or High issues found.

---

## 1. Crawlability — PASS

| Check | Result |
|---|---|
| `robots.txt` reachable, 200 | Pass |
| `Sitemap:` directive present | Pass — `https://quilliamsmowing.co.uk/sitemap.xml` |
| `/keystatic` and `/ph/` correctly disallowed | Pass (`/keystatic` returns 404 to anon users anyway) |
| AI crawler allow/deny list current (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Applebot-Extended allowed; CCBot, Bytespider, meta-externalagent blocked) | Pass |
| Sitemap XML well-formed, 39 `<loc>` entries | Pass |
| All sitemap URLs use canonical https + apex | Pass |
| Internal link graph (`/site-map` page enumerates routes) | Pass (20+ links from homepage `<a>` tags) |

No findings.

## 2. Indexability — PASS (1 Low)

| Page | Canonical | Robots meta |
|---|---|---|
| `/` | `https://quilliamsmowing.co.uk` | none (indexable) |
| `/services/lawn-care` | self | none |
| `/areas/truro` | self | none |
| `/blog/gardener-cost-cornwall-2026` | self | none |
| `/projects/gravel-garden-with-patio` | self | none |
| `/quote` | self | none |
| `/areas` | self | none |
| `/offers/gravel-gardens` (live but not in sitemap) | n/a | `noindex, nofollow` — correct |

### LOW-1 — Homepage canonical omits trailing slash, conflicts with common Vercel/Google normalisation
- Where: `/` returns `<link rel="canonical" href="https://quilliamsmowing.co.uk"/>` and sitemap entry is `<loc>https://quilliamsmowing.co.uk</loc>` (no `/`)
- Why it matters: Most CMS and crawlers treat root URL as `https://quilliamsmowing.co.uk/`. Mismatch is harmless in practice (Google normalises) but inconsistent with the sub-page canonicals that follow `https://quilliamsmowing.co.uk/path` form.
- Fix: Emit `https://quilliamsmowing.co.uk/` for both the homepage canonical and the sitemap root `<loc>` so all signals match.

### Hreflang
- Single locale (`en-GB`). No alternate links, none needed. `<html lang="en-GB">` present on all sampled pages. PASS.

## 3. Security Headers — PASS

Homepage response headers (apex):

| Header | Status |
|---|---|
| `strict-transport-security` | `max-age=31536000; includeSubDomains; preload` — Pass |
| `x-content-type-options` | `nosniff` — Pass |
| `x-frame-options` | `SAMEORIGIN` — Pass |
| `referrer-policy` | `strict-origin-when-cross-origin` — Pass |
| `permissions-policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()` — Pass |
| `content-security-policy` | Present, allowlists PostHog + Cloudflare Turnstile + map tiles + Unsplash/Picsum. Pass |
| `cross-origin-opener-policy` | `same-origin` — Pass |
| `content-encoding` (br) | Pass — Brotli served |

### LOW-2 — CSP uses `'unsafe-inline'` and `'unsafe-eval'` on `script-src`
- Where: All HTML responses
- Why it matters: Not a ranking factor but reduces XSS hardening. Standard Next.js limitation.
- Fix: Long-term, move to nonce-based CSP via `middleware.ts` (Next.js documents this). Not urgent.

## 4. URL / Redirect Hygiene — 1 Medium, 1 Low

### MEDIUM-1 — `www.` subdomain returns 307 (temporary) instead of 308 (permanent)
- Where: `https://www.quilliamsmowing.co.uk/` -> `https://quilliamsmowing.co.uk/` via `307 Temporary Redirect`
- Why it matters: 307 tells crawlers "this could change"; 308 consolidates link equity to apex. Bingbot in particular treats 307 weakly.
- Note: `http://www.quilliamsmowing.co.uk/` correctly emits `308`. Only the `https://www.` hop is wrong.
- Fix: In `next.config.ts` (or Vercel redirects), add a `permanent: true` redirect for `host: www.quilliamsmowing.co.uk` so Vercel emits 308 on the https variant too.

### LOW-3 — Trailing slash on sub-paths 308-redirects to no-slash
- Where: e.g. `https://quilliamsmowing.co.uk/services/` -> `/services` (308). All sampled clean URLs are non-slash, which matches sitemap. Pass on consistency, but verify no internal `<a>` or `<Link>` accidentally appends `/`.
- Fix: `grep -RIn 'href="/[^"]*/"' app components` to confirm zero internal trailing-slash links.

### URL/redirect green-checks
- `http://` -> `https://` 308 (apex): Pass
- `https://www.` -> `https://` apex: see MEDIUM-1
- All 15 sampled URLs: 200 OK, 0 redirects
- Unknown URL `/this-does-not-exist-xyz`: 404 (correct hard 404, not soft)

## 5. Status Codes — PASS

Sampled 15/39 sitemap URLs, all returned `200` with `0` redirects:

```
/                                              200
/services                                      200
/services/lawn-care                            200
/services/hedge-trimming                       200
/services/landscaping                          200
/areas/truro                                   200
/areas/newquay                                 200
/areas/st-ives                                 200
/projects/gravel-garden-with-patio             200
/projects/leylandii-hedge-trim-4m-tall         200
/blog/gardener-cost-cornwall-2026              200
/blog/scarify-aerate-feed-lawn-cornwall        200
/quote                                         200
/pricing                                       200
/site-map                                      200
```

`x-vercel-cache: HIT` and `x-nextjs-prerender: 1` confirm SSG/ISR is serving these from Vercel's edge cache. No broken URLs detected in sample.

## 6. Mobile / Viewport — PASS

- `<meta name="viewport" content="width=device-width, initial-scale=1"/>` present on all sampled pages.
- `<html lang="en-GB">` set everywhere — assists locale-aware mobile UAs.
- No `maximum-scale` or `user-scalable=no` (accessibility-safe).

No findings.

## 7. Render-Blocking / JS Rendering — PASS (1 Low)

- `x-nextjs-prerender: 1` confirms HTML is server-prerendered. Title, meta, canonical, OG, JSON-LD all in source — crawlers do not need JS execution. Pass.
- `x-nextjs-stale-time: 300` indicates ISR with 5-min revalidation — sane.
- 2 CSS files in `<head>` (Tailwind split), all `<script>` tags `async`. Pass.
- Hero LCP image uses `fetchPriority="high"` plus `<link rel="preload" as="image" imageSrcSet=...>` in `<head>` — excellent LCP hygiene.
- Fonts preloaded as `woff2` with `crossorigin` — good.
- Below-fold images use `loading="lazy"` — good.
- Homepage HTML weight: 196 KB uncompressed (~32 KB after Brotli) — acceptable for the amount of JSON-LD embedded.

### LOW-4 — JSON-LD aggregated into a single `application/ld+json` block on `/`
- Where: `/` (homepage) embeds 6 JSON-LD blocks; sub-pages emit them as separate `<script>` tags. Single graph (one `<script>` with `@graph`) is valid and preferred for the homepage, just noting the inconsistency vs sub-pages which use multiple scripts.
- Fix: Optional — either approach is fine; choose one for consistency.

### Core Web Vitals (source-only inspection — real CrUX data not measured here)

| Metric | Risk | Notes |
|---|---|---|
| LCP | LOW | Hero image preloaded + `fetchPriority="high"`. Fonts preloaded. Expect <2.5s on 4G. |
| INP | LOW | All scripts `async`, no large blocking inline scripts beyond PostHog snippet. Forms gated by Turnstile (small bundle). Expect <200ms. |
| CLS | LOW | Hero `<img>` uses `data-nimg="fill"` with `position:absolute` inside sized container — no layout shift. Verify embedded map widget reserves height. |

## 8. IndexNow — PASS

- Key file: `https://quilliamsmowing.co.uk/6aa67e76d1540f4f36f507f3702f677c.txt`
- HTTP 200, `content-type: text/plain`, body matches filename (`6aa67e76d1540f4f36f507f3702f677c`). Pass.
- Referenced in `robots.txt` comment. Pass.
- Action item: confirm POSTs to `https://api.indexnow.org/IndexNow` are wired on publish/update (out of scope for this URL audit — verify in `app/api/` or build script).

## 9. Regressions vs Clean Next.js+Vercel Deploy — None significant

Comparing against a vanilla Next.js 16 Vercel deploy:

- `x-vercel-cache: HIT` and `x-nextjs-prerender: 1` confirm prerendering pipeline healthy.
- `cache-control: public, max-age=0, must-revalidate` is the Next.js default for ISR pages — fine but a more permissive Cache-Control on static assets like `/sitemap.xml` (e.g. `s-maxage=3600`) would let Cloudflare cache it. Current `age: 120` shows Vercel cache is serving it, but Cloudflare is bypassing (`cf-cache-status: DYNAMIC`).
- Cloudflare email-decode script (`/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js`) auto-injected — harmless, common.
- `vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch` — correct for App Router prefetch handling.

No new regressions detected since the earlier 2026-05-26 remediation pass.

---

## Prioritised Fix List

| Severity | ID | Finding | One-line fix |
|---|---|---|---|
| Medium | MEDIUM-1 | `https://www.` -> apex is 307 not 308 | Add `permanent: true` Vercel/Next redirect rule for the `www.` host |
| Low | LOW-1 | Homepage canonical/sitemap root lacks trailing slash | Emit `https://quilliamsmowing.co.uk/` in both the `<link rel="canonical">` for `/` and `sitemap.xml` `<loc>` |
| Low | LOW-2 | CSP uses `'unsafe-inline'`/`'unsafe-eval'` | Move to nonce-based CSP via middleware (long-term hardening) |
| Low | LOW-3 | Trailing-slash sub-paths 308 to non-slash | Audit codebase for any `<Link href="/foo/">` that would trigger the redirect |
| Low | LOW-4 | JSON-LD aggregation inconsistency between `/` and sub-pages | Pick single approach (graph or multiple scripts) for consistency |

No Critical or High issues. Site is in very good technical health following today's earlier remediation.

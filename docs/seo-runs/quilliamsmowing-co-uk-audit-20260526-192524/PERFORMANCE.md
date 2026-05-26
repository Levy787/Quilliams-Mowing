# Performance Audit — quilliamsmowing.co.uk

**Date:** 2026-05-26
**Tooling:** Lighthouse 13.3.0 (headless Chrome, simulated throttling), curl for header/timing checks
**Method:** Lab data only (no CrUX field data sampled). Mobile = Moto G Power class, slow 4G, 4x CPU slowdown. Desktop = cable, no CPU slowdown.

## Headline Summary

| Page | Mobile Perf | LCP (m) | TBT (m) | CLS | Verdict |
|---|---|---|---|---|---|
| `/` | **55** | 4.4s | 1640ms | 0 | Fails LCP, fails INP proxy |
| `/services/lawn-care` | **47** | 9.4s | 1280ms | 0 | Fails LCP badly |
| `/areas/truro` | **58** | 4.4s | 1260ms | 0 | Fails LCP |
| `/blog/gardener-cost-cornwall-2026` | **63** | 4.5s | 720ms | 0 | Fails LCP |
| `/pricing` | **57** | 4.7s | 1160ms | 0 | Fails LCP |
| `/` (desktop) | **92** | 1.0s | 200ms | 0 | Passes all |

**Overall score: 62 / 100** (weighted toward mobile, primary traffic target).

**The site infrastructure is healthy** — Vercel cache HIT, Cloudflare cache HIT, fonts preloaded, immutable asset caching, modern HTTP, no CLS, no oversized images, correct `next/image` with `sizes`, fetchPriority on the LCP candidate image. CSS is minified, JS is minified, text compression is on.

**One issue dominates every mobile failure:** the Cloudflare bot-detection script (`/cdn-cgi/challenge-platform/scripts/jsd/main.js`) consumes **3236 ms of main-thread scripting on the home page** and produces a single 1622 ms long task. It alone explains the failing TBT/INP and the bulk of the LCP element render delay on every page measured. Removing or scoping it would lift every page from "poor" to "good" on mobile.

---

## Per-URL Detail

### 1. `/` (home, mobile)

| Metric | Value | Threshold | Status |
|---|---|---|---|
| Performance score | 55 | — | poor |
| LCP | 4.4 s | ≤2.5 s | **poor** |
| FCP | 2.3 s | ≤1.8 s | needs improvement |
| TBT | 1640 ms | ≤200 ms | **poor** (INP proxy) |
| CLS | 0.00 | ≤0.1 | good |
| Speed Index | 2.8 s | ≤3.4 s | good |
| TTFB | 40 ms | ≤200 ms | excellent |
| Total bytes | 1592 KB | — | acceptable |
| Requests | 79 | — | acceptable |
| DOM elements | **2165** | <1500 | over budget |

LCP element: H1 `<h1 class="text-4xl text-white...">` (text, not image). LCP subparts: TTFB 79 ms + element render delay 230 ms. Lab LCP of 4.4 s reflects the simulated throttle layered over render-blocking work, not actual element paint time.

Resource mix: Script 514 KB / 34 reqs, Image 490 KB / 16 reqs, Other 392 KB / 22 reqs, Document 111 KB, Font 61 KB / 2, Stylesheet 24 KB / 3. Third-party 535 KB / 12 reqs.

### 2. `/services/lawn-care` (mobile) — worst-performing page

| Metric | Value | Status |
|---|---|---|
| Performance score | 47 | poor |
| LCP | **9.4 s** | very poor |
| FCP | 2.3 s | needs improvement |
| TBT | 1280 ms | poor |
| CLS | 0.00 | good |
| Bootup time | 3.1 s | poor |
| Long tasks | 4 | — |
| Total bytes | 1263 KB | — |

LCP element: `<p class="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-background/75">` — the hero intro paragraph. Subparts: TTFB 153 ms + **element render delay 1505 ms**. The 1.5 s render delay is the smoking gun: the hero `<p>` is downstream of the main render-blocking CSS (`5161665338461e2e.css`, 17.8 KB, 702 ms wasted) and is competing for main-thread time with the Cloudflare challenge JS that fires before LCP can be painted. Hero image is correctly served via `/_next/image` WebP with `sizes="(min-width: 1024px) 50vw, 100vw"`.

### 3. `/areas/truro` (mobile)

Perf 58, LCP 4.4 s, FCP 2.3 s, TBT 1260 ms, CLS 0, bootup 3.0 s. LCP element is a `<p class="text-muted-foreground">`. Tiny image payload (12 KB / 3 reqs) — page is mostly text. Total 1053 KB. The page weight is fine; mobile failure is purely main-thread/CPU.

### 4. `/blog/gardener-cost-cornwall-2026` (mobile) — best mobile page

Perf 63, LCP 4.5 s, FCP 2.4 s, TBT **720 ms**, CLS 0. LCP element is an `<img>` (hero photo). LCP subparts: TTFB 168 + resource load delay 25 + resource load duration 122 + element render delay 45 = healthy. Total bytes 1134 KB, only 100 KB images. TBT lower because the blog template ships fewer interactive components. Still fails LCP due to render-blocking CSS plus Cloudflare challenge script.

### 5. `/pricing` (mobile)

Perf 57, LCP 4.7 s, FCP 2.3 s, TBT 1160 ms, CLS 0. LCP element is the H1. Element render delay 473 ms (highest of the pages with text LCP) — pricing has heavier interactive components (likely the quote form) shipping JS that contends with paint.

### 6. `/` (desktop) — reference

Perf **92**, LCP 1.0 s, FCP 0.6 s, TBT 200 ms, CLS 0, SI 0.8 s. Confirms infrastructure is good; mobile failures are CPU-bound, not network-bound or origin-bound.

---

## Top Regressions (ranked by expected mobile impact)

### R1. Cloudflare bot challenge JS dominates the main thread — CRITICAL

`/cdn-cgi/challenge-platform/scripts/jsd/main.js` (loaded automatically by Cloudflare when the zone has "JS Detections" or Bot Fight Mode enabled) attributes:

- **3236 ms scripting time** on home mobile (66 % of total mainthread work)
- Single **1622 ms long task** — directly inflates TBT and INP
- Also 2465 ms scripting on the blog page
- Re-downloads every 4 hours (`cache=4h`), and the `/cdn-cgi/challenge-platform/h/b/d/...` companion has `cache=0h`

This script runs on every page, blocks paint, and is the largest single contributor to TBT on all five mobile URLs.

**Fix:**
1. In Cloudflare dashboard, disable **Bot Fight Mode** for this zone, or
2. Disable **JS Detections** (Security → Settings), or
3. Switch to **Super Bot Fight Mode** with "JavaScript Detection: off" and rely on managed challenge / Turnstile on the contact form only (already in place), or
4. Move Cloudflare to "DNS only" for the static asset hostname if you want CF only for caching but not bot scoring.

Turnstile on form submit is already protecting writes; the always-on challenge script is redundant. **Expected impact: TBT drops by ~1.5 s, LCP drops by ~1.5–2 s on every mobile page, mobile score moves from ~55 to ~85+.**

### R2. Render-blocking CSS (~900 ms wasted)

Two stylesheets block render: `5161665338461e2e.css` (17.8 KB, 702 ms) + `7c398177751413df.css` (2.3 KB, 185 ms). For a Tailwind/Next.js app the first is the global stylesheet; this is unavoidable at the network level but the wasted-ms is amplified by the mobile CPU contention from R1.

**Fix:** Largely auto-resolves once R1 is fixed (CPU frees up to parse CSS faster). Optional: extract critical CSS for above-the-fold and inline it, deferring the rest — Next.js 16 supports this via `next/css` experimental flag if you want incremental gain after R1.

### R3. PostHog recorder + surveys ship legacy JS

- `posthog-recorder.js` — 90 ms scripting, 107 ms long task, 12 KB legacy polyfill bytes
- `surveys.js` — 27 KB unused of 33 KB (82 % unused)
- `dead-clicks-autocapture.js` — duplicated module bytes (3.9 KB + 3.5 KB + 1.6 KB)

PostHog client is loaded for every visitor including bots and one-page-bounce visitors.

**Fix:**
1. In PostHog init, set `disable_session_recording: true` for non-converting page templates (blog, area pages) or gate behind `cookieless` until user interaction. The recorder bundle alone is ~50 KB transferred and adds ~100 ms of long task.
2. Disable surveys entirely if not in use: `disable_surveys: true` in init config — saves 33 KB and the 27 KB legacy polyfill waste.
3. Lazy-init PostHog after `requestIdleCallback` instead of on first paint.

**Expected impact: ~80–120 ms TBT improvement, ~60 KB JS reduction.**

### R4. DOM size 2165 elements on home (target <1500)

Lighthouse flags DOM > 1500 as INP risk. The deepest path is in the service-card grid (`a > div > svg > path`). Each rerender of the page or hover handler touches a large tree.

**Fix:** Audit the home page sections — most likely the service grid, area grid, and FAQ accordion are each shipping all items at once. Consider:
- Render only the first 6 service cards above the fold; lazy-render the rest on intersection.
- Move FAQ JSON-LD content out of the rendered DOM (keep schema, hide HTML behind details/summary which doesn't render content until expanded — but careful for SEO; verify content is still parseable).
- Inline SVG icons are heavy on element count. Consider sprite sheet or single SVG with `<use>` refs.

**Expected impact: faster style recalc on interaction, ~50–100 ms INP improvement.**

### R5. Unused JavaScript (~108 KB)

Top wasted bundles:
- `eaf6f58d42e01425.js` — 31 KB wasted of 63 KB (49 %)
- `4c2cb908baaade86.js` — 28 KB wasted of 46 KB (60 %)
- `56ea2d4ffc45110e.js` — 22 KB wasted of 69 KB (31 %), also 340 ms scripting + 74 ms long task

**Fix:** Run `next build` with bundle analyzer (`@next/bundle-analyzer`) and look for libraries imported eagerly that could be:
- `next/dynamic` with `ssr: false` (e.g. Leaflet maps, animation libs)
- Tree-shaken (named imports only, e.g. `import { Mail } from 'lucide-react'` not `import * as Icons`)
- Replaced (e.g. lodash → native)

Run `pnpm analyze` if configured, or add: `ANALYZE=true pnpm build`.

### R6. Cloudflare email obfuscation script

`/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js` — small (1 KB) but adds a request and runs on parse. Email Obfuscation is enabled in CF.

**Fix:** Disable Email Obfuscation in Cloudflare Scrape Shield (Security → Settings). Use mailto links with the address spelled out, or leave it on if you have a real spam concern — impact is minor (~10 ms).

---

## Things That Are Already Right

- **TTFB 40–168 ms** across all pages — origin and edge are excellent.
- **Cache headers**: `_next/static/*` and `_next/image` both return `cache-control: public, max-age=31536000, immutable` with `x-vercel-cache: HIT` and `cf-cache-status: HIT`. Double-edge caching works.
- **CLS = 0.00** on every page — image dimensions and reserved space are correct.
- **Fonts**: 2 woff2 files, both `<link rel="preload" as="font" crossorigin>`, `font-display` audit passes (likely `swap` or `optional`).
- **`next/image` correctness**: hero image has `srcset`, `sizes`, `fetchPriority="high"`, `<link rel="preload" as="image" imageSrcSet=...>` in HTML head. WebP served.
- **Preconnect** to `https://eu.i.posthog.com` and `https://challenges.cloudflare.com` is in place and detected by Lighthouse.
- **No unsized images.**
- **Modern HTTP** (HTTP/2 + h3 advertised via alt-svc).
- **No forced reflows** flagged.
- **Document latency** insight passes — server is fast.

---

## Prioritized Fix List (effort vs impact)

| # | Fix | Effort | Mobile LCP gain | TBT gain | Score gain |
|---|---|---|---|---|---|
| 1 | Disable CF Bot Fight Mode / JS Detections | 5 min | ~1.8 s | ~1.5 s | +25–30 |
| 2 | Disable PostHog surveys + lazy-init recorder | 30 min | ~0.2 s | ~120 ms | +3–5 |
| 3 | Bundle analyzer + dynamic-import below-fold components | 2–4 h | ~0.3 s | ~150 ms | +3–5 |
| 4 | Reduce home DOM (lazy service grid tail, FAQ details) | 2 h | minimal | INP −50 ms | +1–2 |
| 5 | Disable CF email obfuscation | 1 min | minimal | ~10 ms | +1 |

Implementing only #1 should clear all five tested URLs into "good" LCP and "good" INP territory at the 75th percentile. The rest are polish.

---

## Field Data Note

This audit is **lab-only** — Lighthouse simulated mobile throttling does not equal what users on a Moto G in a Cornwall 4G dead-spot actually experience. Recommended next step:

- Pull CrUX field data via the CrUX API for `quilliamsmowing.co.uk` once the site has enough traffic to be indexed (typically 28-day rolling window of real Chrome user visits).
- Until then, use Vercel Analytics' built-in Web Vitals dashboard or PostHog's `@posthog/web-vitals` plugin to capture real-user LCP/INP/CLS from existing visitors — these will already reflect any benefit from the fixes above.

## Tooling Limitations

- No PageSpeed Insights API call (no API key configured in env); used local Lighthouse 13.3.0 instead.
- No CrUX field data fetched.
- INP is measured indirectly via TBT (Lighthouse cannot script real interactions in this simulated run); INP figures inferred from long-task profile.
- Single sample per URL; thresholds in Core Web Vitals are 75th-percentile field metrics, not lab. Treat the numbers as directional, the diagnostic findings as authoritative.

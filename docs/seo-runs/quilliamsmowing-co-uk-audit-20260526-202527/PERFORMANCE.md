# Performance Audit — quilliamsmowing.co.uk (re-measure)

**Date:** 2026-05-26 (evening, post Cloudflare-proxy removal)
**Tooling:** Lighthouse 13.3.0 mobile (Moto G Power class, slow 4G, 4x CPU slowdown), curl for header checks
**Prior run:** `docs/seo-runs/quilliamsmowing-co-uk-audit-20260526-192524/PERFORMANCE.md` (overall 62/100)

---

## Headline Summary

| Page | Score | Δ vs AM | LCP | TBT | CLS | FCP | SI | Verdict |
|---|---|---|---|---|---|---|---|---|
| `/` | **57** | +2 | 3.8 s | 2240 ms | 0.000 | 2.3 s | 3.3 s | Fails LCP, fails INP |
| `/services/lawn-care` | **83** | **+36** | 4.2 s | **20 ms** | 0.000 | 2.3 s | 2.3 s | Fails LCP only |
| `/areas/truro` | **62** | +4 | 3.4 s | 2000 ms | 0.000 | 2.1 s | 2.1 s | Fails LCP, fails INP |
| `/blog/gardener-cost-cornwall-2026` | **39** | **−24** | 7.1 s | 8270 ms | 0.018 | 2.5 s | 5.1 s | Critical regression |
| `/pricing` | **50** | −7 | 4.7 s | 1580 ms | 0.019 | 2.7 s | 4.6 s | Fails LCP, fails INP |

**Overall mobile-weighted score: 58 / 100** (Δ −4 vs morning 62/100)

> Headline is mixed. The catastrophic Cloudflare Bot Fight Mode script is gone (confirmed below). `/services/lawn-care` is now a clean pass on TBT and jumped 36 points. **But three pages got worse and the blog post collapsed from 63 → 39.** A new dominant offender has emerged: PostHog Session Replay (`posthog-recorder.js` plus recorder code shipped inside the main bundle `eaf6f58d42e01425.js`) is now eating 1.7 s – 9.0 s of main-thread scripting per page.

---

## Confirmed: Cloudflare Bot Fight Mode JS is gone

`curl -I https://quilliamsmowing.co.uk/` shows `server: Vercel`, no `cf-ray`, no `cf-cache-status`. Proxy is off.

Searched HTML of `/` and `/services/lawn-care` for `cdn-cgi`: **0 matches** in both.

Lighthouse still records 5–6 requests to `challenges.cloudflare.com/cdn-cgi/...` per page, but these are the **Turnstile widget** loaded by the contact form (allow-listed in CSP `script-src ... https://challenges.cloudflare.com`). They are intentional, third-party-iframed, and not on the critical path. The 3236 ms scripting / 1622 ms long task from `/cdn-cgi/challenge-platform/scripts/jsd/main.js` — **gone, confirmed.**

PERF-A is resolved.

---

## New dominant bottleneck: PostHog Session Replay

| Page | Long task (posthog-recorder.js) | Main-bundle scripting (eaf6f58d42e01425.js) |
|---|---|---|
| `/blog/gardener-cost-cornwall-2026` | **8999 ms** | 8935 ms |
| `/` | 4352 ms | 4331 ms |
| `/areas/truro` | 2507 ms | 2484 ms |
| `/pricing` | 1712 ms | 1690 ms |
| `/services/lawn-care` | (no long task) | (low) |

The recorder lazy-loads after first paint, but once it runs it monopolises the main thread for several seconds. On the blog post (long DOM, more text mutations to observe) it produces a single 9-second long task — that is what crashed the score.

**`/services/lawn-care` is the natural experiment**: same bundles, same PostHog config, but the page is far shorter and the recorder finishes in <50 ms. TBT collapsed from 1280 ms to 20 ms purely from the Cloudflare-script removal **plus** a quiet recorder. This proves the rest of the stack is healthy; PostHog Session Replay is the single largest remaining lever.

---

## Per-URL detail

### 1. `/` — 57 (was 55)

| Metric | Value | Threshold | Status |
|---|---|---|---|
| LCP | 3.8 s (TTFB 194 ms + element render delay 544 ms; the gap is main-thread blockage) | ≤2.5 s | **poor** |
| TBT | 2240 ms | ≤200 ms | **poor** |
| CLS | 0.000 | ≤0.1 | good |
| FCP | 2.3 s | ≤1.8 s | needs improvement |
| SI | 3.3 s | ≤3.4 s | good |
| TTFB | 60 ms (Vercel HIT) | ≤200 ms | excellent |
| DOM elements | **2323** (was 2165) | ≤1500 | **fails budget, slightly worsened** |
| Longest long task | 4352 ms (posthog-recorder) | — | poor |

Top unused JS: home chunk `eaf6f58d42e01425.js` 31 KB (50%), home chunk `4c2cb908baaade86.js` 28 KB (61%), `surveys.js` 27 KB (81%), home chunk `56ea2d4ffc45110e.js` 21 KB (31%).

### 2. `/services/lawn-care` — 83 (was 47, **+36**)

| Metric | Value | Status |
|---|---|---|
| LCP | 4.2 s (TTFB 258 ms + element render delay 837 ms) | **poor** |
| TBT | **20 ms** | excellent |
| CLS | 0.000 | good |
| FCP | 2.3 s | needs improvement |
| SI | 2.3 s | good |
| DOM elements | 564 | good |

LCP element is the hero `<p>` after the H1 — text, not image. Render delay is now driven by **CSS parse + initial bundle execution**, not scripting blockage. The fix here is a critical-CSS inline / hero text early in body. PostHog recorder ran but did not produce a long task on this page (short DOM, fewer mutations).

This is the proof case for the Cloudflare-removal benefit: this page would have scored 90+ if its LCP element was an image with `fetchpriority="high"` or rendered before bundle parse.

### 3. `/areas/truro` — 62 (was 58)

| Metric | Value | Status |
|---|---|---|
| LCP | 3.4 s (TTFB 151 ms + render delay 459 ms) | needs improvement |
| TBT | 2000 ms | **poor** |
| CLS | 0.000 | good |
| FCP | 2.1 s | needs improvement |
| DOM elements | 290 | excellent |
| Longest long task | 2507 ms (posthog-recorder) | poor |

Small page, fast TTFB, tiny DOM — score is held back almost entirely by the PostHog recorder long task.

### 4. `/blog/gardener-cost-cornwall-2026` — 39 (was 63, **−24** — critical regression)

| Metric | Value | Status |
|---|---|---|
| LCP | **7.1 s** | **poor** |
| TBT | **8270 ms** | **catastrophic** |
| CLS | 0.018 | good |
| FCP | 2.5 s | needs improvement |
| SI | 5.1 s | needs improvement |
| DOM elements | 367 | excellent |
| Longest long task | **8999 ms (posthog-recorder)** | catastrophic |

LCP element: the hero image `<img alt="Freshly maintained Cornwall garden...">` (380×520 fill-mode `next/image`).

**LCP discovery insight flagged a fix (score 0):** the LCP image preload is missing `fetchpriority="high"`. The image is discoverable in initial HTML and not lazy-loaded, but lacks the priority hint. Adding `priority` to the `<Image>` component should drop LCP by ~1–2 s on this page even before PostHog mitigation.

This page regressed because the long form post gives the session recorder more DOM to observe → 9 s long task vs 4 s on home and <50 ms on lawn-care. PostHog Session Replay cost scales with DOM mutation volume.

### 5. `/pricing` — 50 (was 57, −7)

| Metric | Value | Status |
|---|---|---|
| LCP | 4.7 s (TTFB 292 ms + render delay 1525 ms) | **poor** |
| TBT | 1580 ms | **poor** |
| CLS | 0.019 | good |
| FCP | 2.7 s | needs improvement |
| SI | 4.6 s | needs improvement |
| DOM elements | 519 | good |
| Longest long task | 1712 ms (posthog-recorder) | poor |

Element render delay of 1525 ms on a 519-element page is entirely main-thread starvation from PostHog. 7 long tasks total.

---

## Bottleneck summary across all pages

| ID | Issue | Pages affected | Estimated savings if fixed |
|---|---|---|---|
| **PERF-A (NEW)** | PostHog Session Replay (`posthog-recorder.js` + recorder code in `eaf6f58d42e01425.js`) — 1.7 s–9 s long tasks | home, truro, blog, pricing | TBT down 1500–8000 ms; would raise blog 39 → ~75, home 57 → ~85 |
| PERF-B | PostHog `surveys.js` 27 KB, 81% unused | all pages | ~25 KB transfer, ~80 ms script eval |
| PERF-C | Homepage DOM **2323** (worse than morning's 2165) | `/` only | DOM-walk speedups, smaller recorder cost |
| PERF-D (NEW) | Blog hero `<Image>` missing `priority` / `fetchpriority="high"` | `/blog/gardener-cost-cornwall-2026` | LCP −1 to −2 s |
| PERF-E | Main shared chunk `eaf6f58d42e01425.js` 63 KB transfer with 50% unused (likely PostHog SDK glue) | all pages | ~30 KB transfer, faster parse |
| PERF-F | Lawn-care LCP element is text but renders late due to bundle parse before paint | `/services/lawn-care` | LCP −1 s with critical CSS or above-the-fold inlining |

---

## Prioritised recommendations

### 1 — Disable or gate PostHog Session Replay (biggest single win)
Session Replay is the dominant cost on 4 of 5 pages. Options ranked best to worst:

- **Disable entirely** in `posthog.init({ disable_session_recording: true })` — saves 1.5–8 s TBT site-wide. Recommended unless replay is actively used.
- **Sample at e.g. 5%** via `session_recording: { sample_rate: 0.05 }` — keeps the data, removes most of the cost from the 75th-percentile user.
- **Defer to user interaction**: only start recording after first click / scroll-stop. Eliminates the recorder's main-thread cost from initial load (TBT/INP go to zero, LCP stops being blocked).
- **Disable `recordCrossOriginIframes` and lower mutation buffer** — partial mitigation.

Expected impact: blog 39 → 70+, home 57 → 80+, truro 62 → 85+, pricing 50 → 75+.

### 2 — Add `priority` to the blog hero image
In the blog post template, the LCP `<Image>` is `fill`, eager-loaded, in the initial HTML, but missing `fetchpriority="high"`. Add `priority` (Next.js sets fetchpriority=high and rel=preload). Expected LCP saving 1–2 s on blog and any other post using the same template.

### 3 — Remove or lazy-load PostHog `surveys.js`
27 KB / 81% unused on every page. If surveys aren't in active use, disable via `posthog.init({ disable_surveys: true })`. Saves ~25 KB.

### 4 — Investigate the homepage DOM growth (2165 → 2323)
DOM grew this morning. Worth checking what shipped between runs. Lower DOM = cheaper PostHog recorder = additional TBT win.

### 5 — Critical-CSS inline for `/services/lawn-care`
This page now passes everything except LCP (text element, 4.2 s). With critical CSS inlined for the hero text the page should reach 95+. Pattern can extend to other service pages.

---

## What did and didn't improve since the morning run

**Improved:**
- Cloudflare Bot Fight Mode JS: gone, confirmed.
- `/services/lawn-care`: TBT 1280 ms → 20 ms, score 47 → 83.
- TTFB across the board still excellent (50–70 ms Vercel cache HITs).
- CLS continues to be 0.000–0.02 across the board.

**Regressed:**
- `/blog/gardener-cost-cornwall-2026`: 63 → 39, LCP 4.5 s → 7.1 s, TBT 720 ms → 8270 ms. PostHog recorder ate the page.
- `/pricing`: 57 → 50.
- Homepage DOM grew from 2165 to 2323.

**Unchanged:**
- PostHog surveys.js still 81% unused (PERF-B not addressed).
- Main-bundle unused JS still ~30 KB (PERF-D not addressed).

The blog regression is significant because blog posts are the long-tail SEO surface — they are exactly where Core Web Vitals affect rankings most.

---

## Lab vs field caveat

These are lab numbers (simulated 4x CPU, slow 4G). Field CrUX p75 is what Google ranks on. Pull `https://chromeuxreport.googleapis.com` data after the PostHog change to confirm field impact; lab is a proxy.

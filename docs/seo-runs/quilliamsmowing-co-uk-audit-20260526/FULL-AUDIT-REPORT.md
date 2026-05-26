# Full SEO Audit — quilliamsmowing.co.uk

**Date:** 2026-05-26
**Business type:** Hybrid local-service business (Service Area Business + light brick-and-mortar) — gardening, lawn care, landscaping in Cornwall, UK
**Owner / founder:** Levi Quilliam
**Audited via:** 7 specialist subagents (technical, content, schema, sitemap, local, GEO, on-page/images/performance)
**Pages sampled:** ~10 representative URLs across services, areas, projects, blog, pricing, about, contact
**Prior baseline:** 64/100 (audit 2026-03-29), then 78/100 (post-deploy 2026-05-04)

---

## Executive Summary

### Overall SEO Health Score: **84 / 100** (↑20 from March baseline)

Weighted using the standard skill rubric:

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 92 | 20.24 |
| Content Quality | 23% | 82 | 18.86 |
| On-Page SEO | 20% | 84 | 16.80 |
| Schema / Structured Data | 10% | 87 | 8.70 |
| Performance (CWV) | 10% | 74 | 7.40 |
| AI Search Readiness | 10% | 74 | 7.40 |
| Images | 5% | 86 | 4.30 |
| **Total** | **100%** | | **83.70** |

Auxiliary scores not in the weighted total but tracked:
- Local SEO: **84/100** (was 59 in March)
- Sitemap: **78/100**

### Verdict

The remediation work from the March + May rounds clearly stuck. Technical foundation is genuinely excellent (CSP, HSTS preload, prerendered SSR, IndexNow, clean canonicals, AI-crawler allow-list). Content has cleared all the thinness flags. Local pages are genuinely unique per-town. Schema graph is consistent with proper `@id` cross-referencing.

The remaining drag on the score is concentrated in five places: homepage em-dash violation of the user's house style (26 instances), `/pricing` is thin and AI-uncitable, `app/sitemap.ts` still emits no `<lastmod>`, JSON-LD schema is missing from the cornerstone Newquay blog post, and off-site authority signals (YouTube, Reddit, tier-1 UK citations) are absent.

### Top 5 Critical & High-Impact Issues

| # | Issue | Severity | Source |
|---|---|---|---|
| 1 | 26 em-dashes in homepage body content — violates Levi's documented house style | High | Content |
| 2 | Sitemap missing `<lastmod>` on all 33 URLs — blinds crawlers + AI to recency | High | Sitemap / GEO / Technical |
| 3 | Cornerstone `/blog/best-gardeners-newquay` lacks Article + ItemList + FAQPage JSON-LD | High | Schema / GEO |
| 4 | `/pricing` is ~330 body words; hedged language suppresses AI citation for "lawn mowing cost Cornwall" queries | High | Content / GEO |
| 5 | Review velocity gap: no review schema dated after 2025-12-12 (5 months) — risks freshness penalty | High | Local |

### Top 5 Quick Wins (<30 min each)

| # | Win | Estimated impact |
|---|---|---|
| 1 | Strip em-dashes from homepage (26 instances) | Fixes house-style + readability |
| 2 | Fix `/offers/gravel-gardens` duplicated brand suffix in title tag | Cosmetic; ensures pattern doesn't recur on indexable pages |
| 3 | Add brand suffix to `/services/lawn-care` `<title>` | Title consistency, +CTR |
| 4 | Replace short meta descriptions on `/pricing` (109ch) and `/contact` (104ch) | CTR uplift |
| 5 | Normalise `tel:+447593 121 621` → `tel:+447593121621` on `/contact` | Click-to-call reliability |

---

## Technical SEO — 92/100

**Strengths**
- Strict, locked-down CSP; HSTS preload-ready; X-Frame-Options SAMEORIGIN; Permissions-Policy locks camera/mic/geo
- Every audited route is server-prerendered (`x-nextjs-prerender: 1`); Vercel cache HIT through Cloudflare
- Canonicals self-referential and absolute; redirects single-hop; trailing-slash fix confirmed
- IndexNow key file resolves; AI crawler allow-list correctly configured in robots.txt
- `/offers/*` correctly `noindex,nofollow` and excluded from sitemap

**Issues**
- **M1** `/offers/gravel-gardens` `<title>` duplicates brand suffix — likely a `metadata.title` string already containing the brand being passed through a parent `title.template`. Fix with `title.absolute` or sweep all routes to ensure no indexable page has the latent bug.
- **L1** Homepage canonical missing trailing slash.
- **L2** `app/sitemap.ts` emits no `<lastmod>`.
- **L4** Logo `rel=preload` srcset goes up to 1920w but `imageSizes="176px"` — wasted early-bandwidth.

**Verify outside audit:** IndexNow key file is served, but confirm an actual submission job posts changed URLs to `https://api.indexnow.org/indexnow` on publish.

---

## Content Quality — 82/100

**Strengths**
- All 6 service pages clear the 800-word threshold
- Area pages have genuinely unique local content (Truro clay soil, St Austell china clay heritage, St Agnes mining spoil, Padstow estuary winds)
- Founder bio reads as a real story
- 16 reviews on homepage schema

**Issues (High severity)**
- **C1** Homepage contains **26 em-dashes** in body content (hero, service cards, project cards, About-Us block). Violates Levi's documented no-em-dash style.
- **C2** `/pricing` body is ~330 words against an 800-word minimum for service-equivalent pages; calculator UI dominates with almost no informational prose.
- **C3** Blog has only 1 post; need a 5-post cluster to build topical authority.

**Issues (Medium)**
- Homepage "About Us" block uses "we" while every other page uses "I" (Levi's voice). Inconsistent.
- Homepage "Quality / Satisfaction / Sustainability" cards read as generic agency boilerplate — rewrite in Levi's voice.
- `/services/landscaping` is right on 800 words; push to 1,000+.
- Service and area pages lack author bylines (only blog has one).

**E-E-A-T sub-scores**
- Experience: 88
- Expertise: 82
- Authoritativeness: 70 (weakest — no press, no GBP outbound link in body, no licence number displayed)
- Trustworthiness: 87

**Recommended next 5 blog posts**
1. Best plants for coastal Cornwall gardens (salt/wind tolerant) — informational
2. How much does a gardener cost in Cornwall in 2026? — commercial-investigative
3. When to scarify, aerate, and feed your lawn in Cornwall — month-by-month — informational
4. How to remove an established pampas grass — informational, high-intent
5. Hedge trimming in Cornwall — when, how often, cost — commercial-informational

---

## On-Page SEO — 84/100

**Strengths**
- 7 of 8 sampled pages have brand suffix in `<title>`
- Internal linking is varied; anchor diversity is good
- OG tags + Twitter cards present site-wide
- URL slugs are clean and keyword-aligned

**Issues**
- **O1** `/contact` has H1 → H3 skip (no H2s). Structural bug.
- **O2** Three weak H1s: `/services/lawn-care` says just "Lawn Care"; `/pricing` says "A rough price guide — fast confirmation."; `/contact` says "Contact Us". None contain primary keyword + location.
- **O3** `/services/lawn-care` `<title>` missing "| Quilliams" brand suffix.
- **O4** `/pricing` meta description 109ch and `/contact` 104ch (target 140-160, keyword-light).
- **O5** Homepage H1 doesn't reinforce the Newquay/Cornwall geo signal sent in the title.

---

## Schema & Structured Data — 87/100

**Strengths**
- All 8 sampled pages emit valid JSON-LD that parses cleanly
- `@id` graph (`#business`, `#website`) is consistent and cross-referenced
- NAP identical across all schema blocks
- 16 Review nodes + AggregateRating on homepage
- BreadcrumbList on all 7 sub-pages
- `identifier` includes Companies House (16405915) and waste-carrier CBDL582202 — strong trust signals
- `sameAs` covers 9 profiles
- BlogPosting + Service nodes present on the right pages

**Gaps**
- **S1** AggregateRating only on homepage — every sub-page references `#business` but inline node has no rating. Move AggregateRating to `#business` graph node so it propagates.
- **S2** No Article schema on `/projects/gravel-garden-with-patio` (or any case study)
- **S3** No ItemList on `/services` or `/projects` index pages
- **S4** Service block on `/services/lawn-care` missing `@id`; uses relative image URL
- **S5** Person node for Levi inlined 4 times with only `name` — needs standalone `@id: #levi` with bio, image, sameAs
- **S6** No `GeoCircle` or per-area Service node on `/areas/*`
- **S7** Missing `foundingDate`, `paymentAccepted`, `currenciesAccepted` on `#business`

(Existing FAQPage on homepage + blog is fine to keep for AI citation but no longer earns Google rich results since Aug 2023 — don't expand it chasing Google FAQ rich results.)

---

## Performance — 74/100

**Strengths**
- Vercel + Cloudflare edge cache (HIT confirmed)
- Immutable cache on images, AVIF/WebP negotiated via `vary: Accept`
- LCP image preloaded with `fetchPriority="high"`
- No GA / GTM / FB pixel detected
- HSTS, locked CSP

**Issues**
- **P1** Homepage HTML is 812 KB uncompressed with 131 inline scripts and 36 images. RSC payload bloat from testimonials/FAQ/recent-works/areas grid.
- **P2** No `preconnect` hints for `eu.i.posthog.com` or `challenges.cloudflare.com` despite both in CSP.
- **P3** Sitemap `lastmod` missing (also a freshness issue).
- **P4** (Carried from TODO.md) framer-motion still in bundle, Leaflet map needs loading placeholder, scroll handler not throttled.

---

## AI Search Readiness (GEO) — 74/100

**Strengths (Technical accessibility 95/100)**
- robots.txt allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Applebot-Extended
- Blocks training-only CCBot, Bytespider, meta-externalagent
- `/llms.txt` exists and is well-structured (services, areas, pricing, hours, contact, identifiers)

**Gaps**
- Citability density: Homepage H1 is pure marketing; `/pricing` is deliberately hedged ("Rough guide only") which actively suppresses AI citation
- No `Last-Updated:` header in llms.txt; no `## Key Pages` section listing canonical URLs
- Off-site brand signals weak: no YouTube channel (highest single AI-citation correlator at ~0.737); no Reddit organic presence; Wikipedia not applicable
- Entity-resolution ambiguity: "Quilliams Mowing Ltd" (legal) vs "Quilliams Gardening & Landscaping" (trading) — llms.txt mitigates by declaring both

**Platform sub-scores:** Google AI Overviews 72 · ChatGPT 78 · Perplexity 76 · Bing Copilot 70 · Claude 78

**Test query verdicts**
- "best gardener in Truro" — moderate citation likelihood; needs Quick Answer block + ItemList
- "how much does lawn mowing cost in Cornwall" — low citation likelihood; pricing too hedged
- "best gardener in Newquay" — high citation likelihood; strongest GEO asset on site

---

## Images — 86/100

**Strengths**
- 100% alt coverage with quality descriptions
- next/image used everywhere with full srcSet
- AVIF/WebP negotiated; immutable cache
- LCP preloaded with `fetchPriority="high"`

**Issues**
- Logo srcset goes to 1920w but rendered at 176px
- 36 images on homepage contribute to RSC payload bloat
- Area pages have no photos (also a content/local issue)

---

## Local SEO — 84/100

**Strengths**
- NAP perfectly consistent across pages + schema
- 9 area pages, each with genuinely unique Cornwall-specific content
- Companies House + waste-carrier registry in schema (excellent trust signals)
- Hours Mon-Sun 9-5 everywhere; click-to-call works
- GBP URL active and referenced; `sameAs` covers Yell, Checkatrade, Bark, TikTok

**Issues**
- **L1** No reviews dated after 2025-12-12 (5+ months). Risk of Sterling Sky 18-day-rule penalty. Pull any newer reviews from GBP into schema.
- **L2** `areaServed` JSON-LD lists only 4 cities; site has 9 area pages.
- **L3** Tier-1 UK citations missing: Trustpilot, FreeIndex, Houzz UK, MyBuilder.
- **L4** 6 of 9 area pages have no named testimonial despite 16 reviews on home.
- **L5** No area page has a local photo.
- **L6** `/areas/st-ives` doesn't address holiday-let market despite St Ives being Cornwall's most short-let-saturated town.
- **L7** `/contact` has `tel:+447593 121 621` with spaces — should be `+447593121621`.
- **L8** Geo coordinates only 3-4 decimals (Google recommends 5).

**GBP URL note:** site uses `Ca1e8ukWV-qsEBM`; user reference was `Ca1e8ukWV-qsEAE`. Both redirect to the same place_id `0xacea5716e9f25ead`. Either works; standardise to whichever matches your GBP owner dashboard URL.

---

## Sitemap — 78/100

- XML valid, served as `application/xml`, referenced from robots.txt
- All 33 URLs return 200; full coverage; no missing or extra
- `/offers/gravel-gardens` correctly excluded (noindex)
- **Only issue:** `lastmod` missing on all 33 URLs. Single biggest deduction. Ship PERF-07 and score jumps to ~98.

---

## Specialist Reports

Each specialist's full findings (with file paths, line-level fixes, and ready-to-paste JSON-LD snippets) are in this run directory:

- `technical.md` — Technical SEO (92)
- `content.md` — Content quality + E-E-A-T (82) + 5 blog briefs
- `onpage-images-perf.md` — On-page (84), Images (86), Performance (74)
- `schema.md` — Schema (87) with paste-ready JSON-LD
- `geo.md` — AI search readiness (74)
- `local.md` — Local SEO (84) + per-area-page table
- `sitemap.md` — Sitemap (78)

See `ACTION-PLAN.md` for the prioritised remediation list.

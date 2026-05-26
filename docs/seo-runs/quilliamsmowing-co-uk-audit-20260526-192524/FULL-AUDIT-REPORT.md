# Full SEO Audit — quilliamsmowing.co.uk

**Audit date:** 2026-05-26
**Business:** Quilliams Mowing — Cornwall UK gardening & landscaping (Levi Quilliam, sole trader)
**Business type:** Local Service Area Business (SAB)
**Scope:** 39 indexable URLs (full sitemap coverage)
**Tools used:** 7 specialist subagents (technical, content, schema, sitemap, performance, GEO, local)

---

## Executive Summary

### Overall SEO Health Score: **85 / 100**

Weighted composite per skill rubric:

| Category | Score | Weight | Contribution |
|---|---|---|---|
| Technical SEO | 92 | 22% | 20.24 |
| Content Quality | 84 | 23% | 19.32 |
| On-Page SEO | 86 | 20% | 17.20 |
| Schema / Structured Data | 88 | 10% | 8.80 |
| Performance (CWV) | 62 | 10% | 6.20 |
| AI Search Readiness | 84 | 10% | 8.40 |
| Images | 88 | 5% | 4.40 |
| **Total** | | | **84.56 → 85** |

Supplementary:
- Sitemap: 92 / 100
- Local SEO: 84 / 100

### Movement vs prior audit (same day, pre-remediation baseline)

| Category | Baseline (AM) | Now (PM) | Delta |
|---|---|---|---|
| Overall | 84 | 85 | +1 |
| Technical | ~82 | 92 | +10 |
| Content | 62 | 84 | +22 |
| Schema | 60 | 88 | +28 |
| Performance | 75 | 62 | **−13** |
| AI Search | 52 | 84 | +32 |
| Local | 59 | 84 | +25 |

The remediation pass moved every category up substantially **except Performance**, which dropped because the deeper Lighthouse run surfaced a Cloudflare Bot Fight Mode script regression that wasn't caught in the morning audit. See Performance section.

### Top 5 Critical / High issues

1. **[Performance / Critical]** Cloudflare Bot Fight Mode JS (`cdn-cgi/challenge-platform/scripts/jsd/main.js`) consumes **3,236 ms scripting** and produces a **1,622 ms long task** on every mobile page load. Single largest impact on Core Web Vitals across the site.
2. **[Local / Critical]** Zero new Google reviews since **2025-12-12** — over 5 months stale, heading into peak season. Violates the Sterling Sky 18-day rule and risks rankings cliff.
3. **[Content / High]** First-person voice regresses to corporate "we/our" in 12 locations (home hero subhead, Recent Works, Testimonials section heading, FAQ, pricing/contact JSON).
4. **[Content / High]** No insurance provider name, policy limit, or waste-carrier licence number rendered anywhere on the site. Meaningful trust gap for higher-value landscaping enquiries.
5. **[Schema / High]** Duplicate `#business` node on homepage (blocks 0 and 4 share an `@id` with conflicting `review[]` arrays). Risk of Google ignoring one or both.

### Top 5 quick wins (under 30 minutes each)

1. Disable Cloudflare Bot Fight Mode in dashboard (Turnstile already protects writes) — expected mobile CWV: poor → good site-wide.
2. Change `https://www.quilliamsmowing.co.uk` redirect from 307 to 308 in `next.config.ts`.
3. Merge duplicate `#business` JSON-LD nodes on homepage into one entry.
4. Replace "Don't just take our word for it" + 11 other "we/our" instances with Levi's first-person voice.
5. Add author bio block (photo, 60-word bio, credentials) to the bottom of every blog post — biggest single E-E-A-T win available.

---

## Technical SEO — 92 / 100

Site is in very good technical health. Full report: [TECHNICAL.md](./TECHNICAL.md).

**Strengths:**
- All 15 sampled URLs return 200; `x-vercel-cache: HIT` and `x-nextjs-prerender: 1` confirmed
- Complete security headers: HSTS preload, CSP, COOP, Permissions-Policy, X-CTO, X-Frame-Options, Referrer-Policy
- robots.txt and sitemap.xml clean and consistent
- IndexNow key file accessible and matches filename
- `<html lang="en-GB">`, mobile viewport, Brotli compression
- Hero LCP preload with `fetchPriority="high"`
- Hard 404s on unknown URLs (no soft 404)
- `/offers/gravel-gardens` correctly `noindex,nofollow`

**Findings:**

| ID | Severity | Issue | Fix |
|---|---|---|---|
| TECH-A | Medium | `https://www.` variant redirects with 307 (temporary) instead of 308 (permanent) | Set `permanent: true` in `next.config.ts` or Vercel redirects |
| TECH-B | Low | Homepage canonical `https://quilliamsmowing.co.uk` (no trailing slash) inconsistent with sub-pages | Pick one form, normalize |
| TECH-C | Low | CSP allows `'unsafe-inline'` and `'unsafe-eval'` on script-src | Long-term hardening with nonces |
| TECH-D | Low | `/services/` 308-redirects to `/services` | Verify no internal links emit trailing slash |
| TECH-E | Low | Home uses single combined JSON-LD; sub-pages use multiple blocks | Cosmetic only |

---

## Content Quality — 84 / 100

Top-tier for a UK sole-trader gardener site. Voice, area-page uniqueness, and blog depth all genuinely improved by morning remediation. Full report: [CONTENT.md](./CONTENT.md).

**E-E-A-T breakdown:** Experience 92 · Expertise 84 · Authoritativeness 74 · Trustworthiness 87 · AI citation 88

**Strengths:**
- Area pages pass the doorway-swap test (Truro vs Newquay have distinct neighbourhood/soil/landmark detail)
- Blog posts have proper quick-answer blocks and structured FAQs
- Voice is recognisably Levi's first-person across most pages
- Zero em dashes (project convention upheld)

**Findings (top 10):**

| ID | Severity | Issue |
|---|---|---|
| CON-1 | High | Voice slips to "we/our" in 12 locations (home hero subhead, Recent Works, FAQ, Testimonials heading, pricing/contact JSON) |
| CON-2 | High | No insurance provider, policy limit, or waste-carrier licence number rendered on site |
| CON-3 | High | 6 of 9 area pages have no testimonial (Padstow, Perranporth, St Ives, Wadebridge, Bodmin, St Agnes) |
| CON-4 | Medium | Identical "Why Choose Me in {Area}" bullet list across all 9 area pages — duplicate block |
| CON-5 | Medium | `quickAnswer` and `holidayLet` blocks hard-coded for only Truro and St Ives — should be data-driven per area |
| CON-6 | Medium | No author bio block rendered on blog posts (string byline only) — biggest single E-E-A-T win |
| CON-7 | Medium | Stats banner "5+ Years of Experience" — Cornwall business started 2025, clarify or qualify |
| CON-8 | Medium | All 7 blog posts share `publishedDate: 2026-05-26` — pattern looks unnatural to crawlers |
| CON-9 | Low | One en-dash in testimonial quote on home.json line 339 |
| CON-10 | Low | Project JSON `slug` fields are title-case with spaces — verify routing pulls from filename only |

---

## On-Page SEO — 86 / 100

Derived from technical and content findings. Title tags, meta descriptions, H1s, and breadcrumbs were the focus of morning remediation and are now sound. Remaining issues mostly cosmetic (canonical trailing-slash inconsistency, voice on home hero).

---

## Schema & Structured Data — 88 / 100

All 62 JSON-LD blocks across 12 sampled URLs parse cleanly. Graph architecture is genuinely good. Full report: [SCHEMA.md](./SCHEMA.md).

**Findings (top 10):**

| ID | Severity | Issue |
|---|---|---|
| SCH-1 | High | Duplicate `#business` node on `/` — blocks 0 and 4 share `@id` with conflicting `review[]` |
| SCH-2 | High | No pricing schema on `/pricing` — missed `OfferCatalog` opportunity referencing 6 Services |
| SCH-3 | Medium | No `Offer` on `/services/landscaping` or `/areas/*` — inconsistent with `/services/lawn-care` |
| SCH-4 | Medium | No `ContactPoint` on `#business` — required for Organization knowledge panel completeness |
| SCH-5 | Medium | `Offer.price` vs `priceSpecification` mismatch on lawn-care (remove top-level `price: "20"`) |
| SCH-6 | Medium | `logo` / `image` / `Article.image[]` are URL strings — promote to `ImageObject` with width/height |
| SCH-7 | Medium | No `BreadcrumbList` on `/` (every other page has one) |
| SCH-8 | Low | Per-page duplicated full `#business` node (~6 KB redundant JSON-LD) — stub with `@id` reference everywhere except `/` and `/about` |
| SCH-9 | Low | AggregateRating 5.0 with 16/16 perfect — optically risky; consider 4.9 |
| SCH-10 | Info | FAQPage on commercial site no longer eligible for Google rich result (Aug 2023) — keep for AI citations |

---

## Performance (Core Web Vitals) — 62 / 100

Mobile-weighted score. Desktop is excellent (92), mobile is the problem. Full report: [PERFORMANCE.md](./PERFORMANCE.md).

| URL | Mobile Score | LCP | TBT | CLS |
|---|---|---|---|---|
| `/` | 55 | 4.4s | 1640ms | 0.00 |
| `/services/lawn-care` | 47 | 9.4s | 1280ms | 0.00 |
| `/areas/truro` | 58 | 4.4s | 1260ms | 0.00 |
| `/blog/gardener-cost-cornwall-2026` | 63 | 4.5s | 720ms | 0.00 |
| `/pricing` | 57 | 4.7s | 1160ms | 0.00 |
| `/` desktop reference | 92 | 1.0s | 200ms | 0.00 |

CLS is 0.00 everywhere. TTFB 40–168 ms. Vercel + Cloudflare cache HIT. Fonts preloaded, hero images preloaded with `fetchPriority`, `next/image` `sizes` correct. The infrastructure is genuinely good — **the problem is third-party JS**.

**Findings:**

| ID | Severity | Issue | Impact |
|---|---|---|---|
| PERF-A | **Critical** | Cloudflare Bot Fight Mode `jsd/main.js` — 3,236 ms scripting + 1,622 ms long task on every mobile page | LCP −1.8s, TBT −1.5s, score +25–30 when disabled |
| PERF-B | Medium | PostHog `surveys.js` is 82% unused (~27 KB); session recorder adds 107 ms long task | Lazy-init or load on user interaction |
| PERF-C | Medium | Homepage DOM is 2,165 elements (over 1,500 budget) | Lazy-render service grid tail |
| PERF-D | Low | ~108 KB unused JS | Run bundle analyzer; tree-shake |
| PERF-E | Low | Cloudflare email obfuscation script loaded but unused | Disable in CF dashboard |

**Limitations:** Lab-only Lighthouse run, no CrUX field data, no PSI API key. INP inferred from TBT/long-task profile rather than scripted interactions.

---

## Images — 88 / 100

`next/image` used throughout with correct `sizes`, hero preloaded with `fetchPriority="high"`, below-fold lazy. WebP/AVIF served by Next.js image optimization. No regressions surfaced in this run. Outstanding item from morning audit: PERF-06 (525 KB JPEG service image pre-convert to WebP).

---

## AI Search Readiness (GEO) — 84 / 100

Top decile for a small local-service site. Full report: [GEO.md](./GEO.md).

**Dimension scores:** Citability 88 · Structural Readability 86 · Multi-Modal 60 · Authority 78 · Technical Accessibility 100

**Platform projection:** Google AIO 86 · ChatGPT 88 · Perplexity 82 · Bing Copilot 80

**Strengths:**
- robots.txt is a textbook "cite me, don't train on me" config
- `/llms.txt` fully spec-compliant with today's `Last-Updated: 2026-05-26`, "Not Offered" section, Companies House (16405915) + waste-carrier (CBDL582202) IDs
- `/blog/gardener-cost-cornwall-2026` and `/blog/hedge-trimming-cornwall-cost-timing` lead with the strongest extractable passages on the site — date-stamped, location-qualified, price-banded
- Entity disambiguation unambiguous: trading name → legal entity → Levi Quilliam → Trevarrian, Cornwall

**Largest gap:** Multi-Modal (60). No YouTube/LinkedIn/Reddit footprint caps Perplexity and Bing ceilings until external signals build.

**Top fixes:**
1. Add FAQPage + Article JSON-LD to remaining blog posts and area pages
2. Bring `/areas/newquay` up to `/areas/truro` parity (missing labelled Quick Answer + FAQ)
3. Launch YouTube channel with 5–8 short videos
4. Add comparison table to `/pricing` and cost blog with cited third-party range
5. Uncomment IndexNow in robots.txt and start weekly Reddit micro-presence

---

## Local SEO — 84 / 100

Schema (98), NAP consistency (100%), and area-page uniqueness are genuinely excellent. Full report: [LOCAL.md](./LOCAL.md).

**Strengths:**
- One of the most complete LandscapingBusiness implementations the agent has audited
- Full `areaServed` (9 cities + Cornwall) with `GeoCircle` `serviceArea`
- Identifiers for Companies House + EA waste carrier
- 16 embedded Review objects
- Area pages pass doorway-swap test (Truro: clay soils, Royal Cornwall Hospital, Malpas/Kenwyn; Newquay: Atlantic salt spray, Fistral, Trenance)

**Critical risk:** Zero new Google reviews since 2025-12-12 (5+ months stale). Heading into peak season this is the highest-impact issue on the site.

**Biggest off-site gap:** UK Tier 1 citations — FreeIndex, Trustpilot, MyBuilder, Houzz UK. Already strong on Yell/Checkatrade/Bark.

**Untapped angle:** Holiday-let/Airbnb-turnover gardening service for St Ives, Padstow, Perranporth area pages — already prepared in /llms.txt and Truro/St Ives quickAnswer blocks but not generalised.

**GBP check needed:** Confirm primary GBP category ("Gardener" vs "Landscaper") matches revenue mix — Whitespark 2026 confirms this is the #1 local ranking factor.

---

## Sitemap — 92 / 100

Full report: [SITEMAP.md](./SITEMAP.md).

- XML well-formed; all 39 URLs return 200; zero redirects in sitemap
- 100% coverage of indexable routes (13 static + 6 services + 4 projects + 9 areas + 7 blog)
- `/offers/*` correctly excluded
- robots.txt declares sitemap

**Minor:**
- All `lastmod` values fall in the same deploy second (mtime resets on clone). Optional fix: use `git log -1 --format=%cI -- <path>`.
- Image sitemap opportunity for `/projects/*` and `/areas/*` photography.

---

## Files generated

- [FULL-AUDIT-REPORT.md](./FULL-AUDIT-REPORT.md) (this file)
- [ACTION-PLAN.md](./ACTION-PLAN.md) — prioritized fixes
- [TECHNICAL.md](./TECHNICAL.md)
- [CONTENT.md](./CONTENT.md)
- [SCHEMA.md](./SCHEMA.md)
- [PERFORMANCE.md](./PERFORMANCE.md)
- [GEO.md](./GEO.md)
- [LOCAL.md](./LOCAL.md)
- [SITEMAP.md](./SITEMAP.md)

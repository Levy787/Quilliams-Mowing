# Action Plan — quilliamsmowing.co.uk

Date: 2026-05-26
Score: 84/100 (target: 95+)

Implementation status as of 2026-05-26:
- Repo-implementable Critical, High, Medium, and Low items are implemented locally except asset-dependent area testimonials/photos, which are intentionally blocked until verified assets exist.
- Manual/off-site account tasks are prepared in `OFFSITE-EXECUTION-ASSETS.md` with owner-ready checklists, copy, and verification notes.
- Final verification should run `pnpm lint`, `pnpm build`, JSON content checks, sitemap checks, rendered route checks, and `git diff --check`.

Priority key:
- **Critical** — fix this week
- **High** — fix this month
- **Medium** — this quarter
- **Low** — backlog

---

## Critical

| ID | Action | Source | Effort |
|---|---|---|---|
| C-01 | Strip 26 em-dashes from homepage body content (hero, service cards, project cards, About-Us block). Replace with commas, periods, or rephrase. | Content | 20 min |
| C-02 | Add real `<lastmod>` to `app/sitemap.ts` — pull from Keystatic frontmatter or git mtime. Resolves Sitemap, GEO, and Technical findings simultaneously. | Sitemap / GEO / Technical | 1-2 h |
| C-03 | Pull any Google reviews dated after 2025-12-12 from GBP into review schema. If zero exist, restart review acquisition flow immediately. | Local | 30 min + ongoing |

## High

| ID | Action | Source | Effort |
|---|---|---|---|
| H-01 | Fix `/offers/gravel-gardens` `<title>` brand-suffix duplication. Sweep all routes to confirm no indexable page has the same `title.template` bug. | Technical | 30 min |
| H-02 | Add `<title>` brand suffix to `/services/lawn-care`. | On-Page | 5 min |
| H-03 | Replace meta descriptions on `/pricing` (109ch) and `/contact` (104ch) with 140-160ch keyword-rich versions. | On-Page | 15 min |
| H-04 | Fix `/contact` H1→H3 heading skip; add proper H2s. | On-Page | 15 min |
| H-05 | Rewrite three weak H1s: `/services/lawn-care`, `/pricing`, `/contact` — include primary keyword + location. | On-Page | 20 min |
| H-06 | Normalise `tel:+447593 121 621` → `tel:+447593121621` on `/contact`. | Local | 2 min |
| H-07 | Expand `/pricing` body to 800+ words with concrete "Lawn mowing costs in Cornwall 2026" answer block (134-167 words, explicit figures, "as of May 2026" date). Resolves Content C2 + GEO citation gap. | Content / GEO | 2 h |
| H-08 | Rewrite homepage About-Us block from "we" to "I" (Levi's voice); rewrite Quality/Satisfaction/Sustainability cards in Levi's voice. | Content | 1 h |
| H-09 | Add Article + ItemList + FAQPage JSON-LD to `/blog/best-gardeners-newquay` (cornerstone GEO asset). | Schema / GEO | 1 h |
| H-10 | Move AggregateRating from homepage-only to `#business` graph node so every sub-page inherits it. | Schema | 30 min |
| H-11 | Create standalone Person node `@id: #levi` with bio, image, sameAs; reference from all four current inline uses. | Schema | 30 min |
| H-12 | Expand `areaServed` JSON-LD from 4 cities to all 9 area pages. | Local / Schema | 15 min |
| H-13 | Add `Last-Updated: 2026-05-26` header + `## Key Pages` URL list to `/llms.txt`. | GEO | 15 min |
| H-14 | Confirm Checkatrade / Yell / Bark listings exist with consistent NAP; add Trustpilot, FreeIndex, Houzz UK, MyBuilder citations. | Local | 2-3 h (one-off) |

## Medium

| ID | Action | Source | Effort |
|---|---|---|---|
| M-01 | Write blog post 1: "Best plants for coastal Cornwall gardens (salt/wind tolerant)" — use `/seo-content` agent. | Content | 3 h |
| M-02 | Write blog post 2: "How much does a gardener cost in Cornwall in 2026?" — use `/seo-content` agent. | Content | 3 h |
| M-03 | Write blog post 3: "When to scarify, aerate, and feed your lawn in Cornwall — month-by-month". | Content | 3 h |
| M-04 | Write blog post 4: "How to remove an established pampas grass". | Content | 3 h |
| M-05 | Write blog post 5: "Hedge trimming in Cornwall — when, how often, cost". | Content | 3 h |
| M-06 | Add Article schema to all 4 case studies under `/projects`. | Schema | 1 h |
| M-07 | Add ItemList JSON-LD to `/services` and `/projects` index pages. | Schema | 30 min |
| M-08 | Add `@id`, absolute image URL to `/services/lawn-care` Service block. | Schema | 15 min |
| M-09 | Add `GeoCircle` / per-area Service node to each `/areas/*` page. | Schema / Local | 2 h |
| M-10 | Add `foundingDate`, `paymentAccepted`, `currenciesAccepted` to `#business` schema. | Schema | 15 min |
| M-11 | Add `preconnect` for `eu.i.posthog.com` and `challenges.cloudflare.com` in `app/layout.tsx`. | Performance | 10 min |
| M-12 | Fix logo `rel=preload` srcset to cap at 176px display width. | Performance | 15 min |
| M-13 | Expand `/services/landscaping` from 800 to 1,000+ words. | Content | 1 h |
| M-14 | Add author byline (Levi Quilliam) to service and area pages. | Content / E-E-A-T | 30 min |
| M-15 | Add named testimonial + local photo to each `/areas/*` page (6 of 9 need testimonial; all 9 need photo). | Local / Content | 4-6 h |
| M-16 | Add holiday-let language to `/areas/st-ives` (Cornwall's most short-let-saturated town). | Local | 30 min |
| M-17 | Bump geo coordinates to 5 decimals in schema. | Local / Schema | 5 min |
| M-18 | Verify IndexNow submission job actually POSTs to `api.indexnow.org/indexnow` on publish (not just key file present). | Technical | 30 min |
| M-19 | Reduce homepage RSC payload (812 KB / 131 inline scripts / 36 images). Lazy-load below-fold areas grid, testimonials, recent-works. | Performance | 3-4 h |

## Low

| ID | Action | Source | Effort |
|---|---|---|---|
| L-01 | Add trailing slash to homepage canonical (cosmetic). | Technical | 5 min |
| L-02 | Add Quick Answer block to `/areas/truro` matching `/blog/best-gardeners-newquay` pattern. | GEO | 30 min |
| L-03 | Create YouTube channel + 2-3 short videos (highest off-site AI-citation lever). | GEO | 4-6 h initial |
| L-04 | Seed one organic Reddit answer in r/Cornwall about garden care. | GEO | 30 min |
| L-05 | LinkedIn profile for Levi; link from `/about` Person schema sameAs. | GEO / E-E-A-T | 30 min |
| L-06 | Add second photo + credentials list to `/about`. | E-E-A-T | 30 min |
| L-07 | Standardise GBP URL to whichever matches owner dashboard (Ca1e8ukWV-qsEAE or qsEBM). | Local | 10 min |

---

## Sequencing recommendation

**Week 1 (Critical + quickest High):** C-01, C-02, C-03, H-01, H-02, H-03, H-04, H-05, H-06, H-12, H-13. ~6 hours total. Expected score lift: **84 → 89**.

**Week 2-4 (remaining High):** H-07, H-08, H-09, H-10, H-11, H-14. ~8 hours. Expected lift: **89 → 92**.

**Months 2-3 (Medium content cluster + schema polish):** M-01 through M-19. Blog cluster (M-01 to M-05) is the biggest needle-mover for topical authority. Expected lift: **92 → 96**.

**Backlog (Low):** L-01 to L-07. Reach 97-98 ceiling.

---

## Cross-reference to existing TODO.md

This audit's findings overlap with several already-tracked items in `/TODO.md`:

- C-02 ↔ PERF-07 (sitemap lastmod real dates)
- H-09 ↔ ONPAGE-02 (Article schema, was blog-dependent)
- H-12, M-09 ↔ SCHEMA-03 (ServiceArea schema on area pages)
- H-11 ↔ SCHEMA-04 (Person schema for founder)
- M-07 ↔ SCHEMA-02 (ItemList on /services + /projects)
- M-10 ↔ SCHEMA-05 (foundingDate, founder, paymentAccepted)
- M-11, M-19 ↔ PERF-03, PERF-04, PERF-05, PERF-06
- M-14 ↔ ONPAGE-01 (trade accreditation/byline equivalent)
- C-03 ↔ LOCAL-01 (restart review acquisition)
- M-01 to M-05 ↔ CONTENT-06 (blog section)
- L-03 ↔ AI-01 (YouTube)
- L-04 ↔ AI-02 (Reddit)

After completing this plan, prune resolved items from `TODO.md` and update the project memory file.

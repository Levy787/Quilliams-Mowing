# Sitemap Audit — quilliamsmowing.co.uk

- **URL:** https://quilliamsmowing.co.uk/sitemap.xml
- **Fetched:** 2026-05-26
- **HTTP:** 200 (application/xml, x-vercel-cache: HIT)
- **Format:** Single `<urlset>` (no index file)
- **Encoding:** UTF-8 (declared)
- **Total URLs:** 33
- **XML validity:** Valid (xmllint pass)
- **Sitemap Score:** 78 / 100

---

## 1. Validity & Encoding

| Check | Result |
|---|---|
| XML well-formed (`xmllint --noout`) | PASS |
| Declared encoding | UTF-8 |
| Namespace `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` | PASS |
| Content-Type `application/xml` | PASS |
| HTTP 200 | PASS |
| Under 50,000 URLs | PASS (33) |
| Under 50 MB uncompressed | PASS (~3 KB) |
| Referenced from robots.txt | PASS (`Sitemap: https://quilliamsmowing.co.uk/sitemap.xml`) |

No structural issues.

---

## 2. URL Coverage — Cross-Check vs Expected Inventory

All 33 URLs returned **HTTP 200** (no redirects, no 404s, no soft-404s detected on status check).

### Present (matches expected)

Core (6): `/`, `/services`, `/projects`, `/areas`, `/blog`, `/pricing`, `/contact`, `/quote`, `/about`, `/site-map`, `/refer`, `/privacy`, `/terms` — all present.

Services (6/6): `garden-maintenance`, `hedge-trimming`, `landscaping`, `lawn-care`, `mulching`, `seasonal-cleanup` — complete.

Projects (4/4): `gravel-garden-with-patio`, `leylandii-hedge-trim-4m-tall`, `ongoing-garden-maintenance`, `overgrown-mess-to-clean-gravel-garden` — complete.

Areas (9/9): `truro`, `st-austell`, `bodmin`, `padstow`, `perranporth`, `st-ives`, `newquay`, `wadebridge`, `st-agnes` — complete.

Blog (1/1): `best-gardeners-newquay` — present.

### Missing — none

Every URL in the expected inventory is present in the sitemap.

### Extra / Suspect — none

No `/offers/*`, `/keystatic`, `/ph/`, `/api/*`, or query-string variants leaked into the sitemap. Confirmed `/offers/gravel-gardens` returns `<meta name="robots" content="noindex, nofollow">` and is correctly **excluded** from the sitemap. Good.

---

## 3. lastmod

| Check | Result |
|---|---|
| `<lastmod>` present on any URL | **FAIL — zero of 33 URLs have lastmod** |

This matches **PERF-07** in the project TODO. Severity: **Medium**.

Google uses `lastmod` as a hint for recrawl prioritisation when the value is consistent with actual page changes (Gary Illyes, 2023: "we trust lastmod when it's accurate"). With zero lastmod values:
- Googlebot falls back to its own change-detection heuristics
- Updated content (e.g. the recently switched email provider on `/contact`, refreshed `/areas` map, new project) takes longer to recrawl
- IndexNow integration (already referenced as commented-out in robots.txt) is less effective without timestamps

**Recommendation:** Emit real `lastmod` (ISO 8601 `YYYY-MM-DD` or full W3C datetime) sourced from:
- For MDX/Keystatic content: file mtime or front-matter `updated` field
- For static route pages: build timestamp, capped at the last meaningful edit
- Avoid setting all URLs to the same build date — Google detects and ignores that pattern.

---

## 4. priority / changefreq

| Check | Result |
|---|---|
| `<priority>` used | None (0 of 33) |
| `<changefreq>` used | None (0 of 33) |

**Status: Correct.** Google has confirmed both fields are ignored. Their absence is the modern best practice — no action needed.

---

## 5. Noindex / Excluded URL Leakage

| URL pattern | In sitemap? | Indexable? | Verdict |
|---|---|---|---|
| `/offers/gravel-gardens` | No | `noindex, nofollow` | PASS — correctly excluded |
| `/keystatic` | No | Disallowed in robots.txt | PASS |
| `/ph/*` | No | Disallowed in robots.txt | PASS |
| `/api/*` | No | n/a | PASS |

No leakage of noindex or blocked URLs. Good hygiene.

---

## 6. High-Value Pages Missing

None identified. Coverage of money pages (services, areas, projects, pricing, quote, contact) is complete. If/when these are added, include them:

- Additional blog posts (currently only 1 — `best-gardeners-newquay`)
- Additional area pages beyond the existing 9
- A reviews/testimonials page if/when created
- Case study pages distinct from projects

---

## 7. Sitemap Index Necessity

**Not required.** A sitemap index is mandated only above 50,000 URLs or 50 MB. At 33 URLs (~3 KB) the site is two orders of magnitude below that threshold. A flat `urlset` is the right choice and should remain so until the site grows past several thousand URLs.

If/when the blog or areas grow substantially (e.g. >500 URLs), consider splitting by section (`sitemap-blog.xml`, `sitemap-areas.xml`, `sitemap-services.xml`) under an index — but only for editorial clarity, not technical necessity.

---

## 8. Image Sitemap / News Sitemap

### Image sitemap — **Recommended (Low priority)**

Image sitemaps (`<image:image>` extension) help Google Images discover and contextualise visual content. For a local-service site with strong before/after project photography, this offers modest upside:

- Project pages have 4+ high-value before/after photos each
- Service pages and `/areas/*` pages use original photography
- Google Images traffic for queries like "gravel garden Cornwall" can drive discovery

However, the impact is modest and on-page `<img>` tags with descriptive `alt` and surrounding text already provide most of the discoverability benefit. **Defer until other higher-impact SEO items in TODO are cleared.**

### News sitemap — **Not applicable**

Google News sitemaps are reserved for sites accepted into Google News (publishers with structured editorial processes). A local gardening business does not qualify and should not implement one.

---

## 9. Findings Summary

| # | Finding | Severity | Action |
|---|---|---|---|
| 1 | XML valid, UTF-8, namespaced correctly | Info | None |
| 2 | All 33 URLs return 200 | Info | None |
| 3 | Full inventory coverage (services, projects, areas, blog, legal) | Info | None |
| 4 | `/offers/*` correctly excluded (noindex) | Info | None |
| 5 | No `<lastmod>` on any URL (PERF-07) | **Medium** | Emit real `lastmod` from content source mtimes |
| 6 | No `priority` / `changefreq` (correct — Google ignores both) | Info | None |
| 7 | No sitemap index needed at this scale | Info | None |
| 8 | Image sitemap not present | Low | Optional future enhancement once core SEO complete |
| 9 | News sitemap | n/a | Not applicable |
| 10 | Referenced from robots.txt | Info | None |

---

## 10. Sitemap Score: 78 / 100

| Component | Weight | Score | Weighted |
|---|---|---|---|
| Validity (XML, encoding, namespace, size) | 20 | 100 | 20 |
| Coverage (all high-value URLs present, no missing) | 25 | 100 | 25 |
| Hygiene (no noindex/redirect/404 leakage) | 20 | 100 | 20 |
| `lastmod` accuracy | 20 | 0 | 0 |
| Deprecated tags removed (`priority`/`changefreq`) | 5 | 100 | 5 |
| robots.txt reference + discoverability | 5 | 100 | 5 |
| Image sitemap (bonus) | 5 | 60 | 3 |
| **Total** | **100** | | **78** |

**Path to 95+:** Ship PERF-07 (real `lastmod` values) — that alone lifts the score to ~98. Image sitemap is the only remaining (optional) gap.

---

## 11. Recommended Next Action

1. Implement `lastmod` in `app/sitemap.ts` (or equivalent route handler), sourcing dates from:
   - Keystatic / MDX front-matter `updated` field for content collections (blog, projects, areas)
   - For static routes (`/contact`, `/quote`, `/pricing`, `/about`, etc.) source from the file mtime of the page component or a manual override map
2. Verify in Google Search Console > Sitemaps that the updated sitemap is read without errors and lastmod values are picked up.
3. Re-submit via IndexNow once lastmod is in place to accelerate recrawl of recently changed pages (e.g. `/contact` after Resend switch, `/areas` after map update).

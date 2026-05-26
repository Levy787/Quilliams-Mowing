# Sitemap Audit — quilliamsmowing.co.uk

- **Sitemap URL:** https://quilliamsmowing.co.uk/sitemap.xml
- **Source file:** `app/sitemap.ts`
- **Audit date:** 2026-05-26
- **URL count:** 39 (well under 50k limit)
- **Score:** **92 / 100**

## Summary

The sitemap is in excellent shape for a small local business. XML is valid, all 39 URLs return HTTP 200 with zero redirects, no noindexed pages are leaked, and the noindex `/offers/*` paid landing pages are correctly excluded via group separation in `app/(landing)/` and `app/(offers)/`. Coverage of indexable marketing routes is 100%. The only meaningful nit is that `lastmod` values are timestamps from the build moment (file mtime fallback chain), so they cluster within a single second — technically real, but not informative for selective recrawl signals. Minor opportunity: add an image sitemap to surface project galleries and area hero photos.

## Validation Report

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | XML well-formed | PASS | `xmllint --noout` clean |
| 2 | Schema namespace | PASS | `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` |
| 3 | URL count <= 50,000 | PASS | 39 URLs |
| 4 | All URLs HTTP 200 | PASS | 39 / 39 returned 200, 0 redirects |
| 5 | No noindex URLs in sitemap | PASS | Spot-checked home, areas, blog, refer, quote, privacy, terms, site-map — none carry `<meta name="robots" content="noindex">` |
| 6 | No 301/302 in sitemap | PASS | `num_redirects=0` for every URL |
| 7 | `/offers/*` excluded | PASS | `app/sitemap.ts` only enumerates marketing + refer routes; offers live in `app/(offers)/` and `app/(landing)/offers/` with `robots: { index: false, follow: false }` set in their respective `layout.tsx` files |
| 8 | Deprecated `priority`/`changefreq` absent | PASS | Not emitted — clean modern format |
| 9 | `lastmod` present on every URL | PASS | 39 / 39 |
| 10 | `lastmod` not all identical | SOFT PASS | 4 unique values, all within the same build second (2026-05-26T18:15:40.252–.368Z). Real (file mtime based) but not differentiated |
| 11 | Canonical host consistency | PASS | All URLs use `https://quilliamsmowing.co.uk` (no www, no trailing slash drift) |
| 12 | Listed in `robots.txt` | PASS | `Sitemap: https://quilliamsmowing.co.uk/sitemap.xml` present |
| 13 | Sitemap index needed | N/A | 39 URLs — single file is correct |

## Coverage vs Route Map

All routes under `app/(marketing)/` map 1:1 to sitemap entries.

| Route | In sitemap | Note |
|-------|------------|------|
| `/` (home) | YES | |
| `/about` | YES | |
| `/areas` | YES | hub |
| `/areas/[slug]` x9 | YES | truro, st-austell, bodmin, padstow, perranporth, st-ives, newquay, wadebridge, st-agnes |
| `/blog` | YES | hub |
| `/blog/[slug]` x7 | YES | all 7 JSON blog files represented |
| `/contact` | YES | |
| `/pricing` | YES | |
| `/privacy` | YES | |
| `/projects` | YES | hub |
| `/projects/[slug]` x4 | YES | all 4 JSON project files represented |
| `/quote` | YES | |
| `/services` | YES | hub |
| `/services/[slug]` x6 | YES | garden-maintenance, hedge-trimming, landscaping, lawn-care, mulching, seasonal-cleanup |
| `/site-map` | YES | |
| `/terms` | YES | |
| `/refer` | YES | from `app/refer/` |
| `/offers/gravel-gardens` | NO (correct) | noindex paid landing |
| `/keystatic/*` | NO (correct) | CMS, blocked in robots.txt |
| `/api/*` | NO (correct) | server routes |

Total expected indexable: 39. Total in sitemap: 39. Coverage: 100%.

## Issues & Recommendations

### Soft: lastmod granularity (–4 pts)
All 39 entries carry timestamps within the same second of the last deploy (`2026-05-26T18:15:40.xxx`). Because `getLastModified` falls back to `FALLBACK_LAST_MODIFIED = new Date("2026-05-26")` per page when individual file mtimes match the deploy moment, Google receives no signal about which pages actually changed since the last crawl. For a 39-URL site this has negligible crawl-budget impact, but two cheap improvements:

1. Prefer git commit time for the listed files over filesystem mtime (mtime resets on every `git clone` / deploy). Use `git log -1 --format=%cI -- <path>` at build time.
2. Or, accept the current behaviour — for a site this small, Google will crawl everything regardless.

### Opportunity: image sitemap (–2 pts)
The `/projects/*` pages and `/areas/*` hero photos are strong visual content. Adding `<image:image>` entries via the `images` field on each sitemap entry (Next.js `MetadataRoute.Sitemap` supports this natively) would help Google Images surface project before/after shots — a real differentiator vs. competitors using stock photography. Example extension to the projects mapper:

```ts
const projectPages = await Promise.all(projectSlugs.map(async (slug) => {
  const project = await readProject(slug);
  return {
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: await getLastModified([...]),
    images: project.gallery?.map((img) => `${BASE_URL}${img.src}`) ?? [],
  };
}));
```

### Not needed
- **Video sitemap** — no significant video content on site.
- **Sitemap index** — only required above 50k URLs or 50 MB; current file is ~5 KB.
- **News sitemap** — not a news publisher.

## Quality Gates

| Gate | Threshold | Status |
|------|-----------|--------|
| Location page warning | 30+ pages | OK — 9 area pages, well under |
| Location page hard stop | 50+ pages | OK |
| Doorway page risk | uniqueness >= 60% | Not assessed here; 9 area pages with named testimonials in `lib/areas/data.ts` suggest non-trivial uniqueness |

## Score Breakdown

| Category | Weight | Score |
|----------|--------|-------|
| Validity (XML + schema) | 20 | 20 |
| URL health (200, no redirects, no noindex) | 30 | 30 |
| Coverage (all indexable routes present) | 20 | 20 |
| Exclusions (offers / cms / api correctly out) | 15 | 15 |
| lastmod usefulness | 10 | 6 |
| Enhancements (image/video sitemap) | 5 | 1 |
| **Total** | **100** | **92** |

## Files Referenced

- `/Users/levi/repos/personal/Quilliams-Mowing/app/sitemap.ts`
- `/Users/levi/repos/personal/Quilliams-Mowing/app/(marketing)/` (all routes)
- `/Users/levi/repos/personal/Quilliams-Mowing/app/(offers)/layout.tsx` (noindex)
- `/Users/levi/repos/personal/Quilliams-Mowing/app/(landing)/layout.tsx` (noindex)
- `/Users/levi/repos/personal/Quilliams-Mowing/content/{services,projects,blog}/*.json`
- `/Users/levi/repos/personal/Quilliams-Mowing/lib/areas/data.ts`

# Sitemap Re-Validation — quilliamsmowing.co.uk

**Date:** 2026-05-26 20:25:27
**URL:** https://quilliamsmowing.co.uk/sitemap.xml
**Source:** `app/sitemap.ts`
**Prior score (morning):** 92/100
**Current score:** 92/100 — no regression

## Inline summary

Sitemap is healthy and unchanged from this morning. 39 URLs, all HTTP 200, well-formed XML, `/offers/*` correctly excluded, no deprecated tags. `lastmod` is still mtime-based and clusters within a ~40ms window (4 unique timestamps across 39 URLs), which is the previously documented non-regression. No action required.

## Validation results

| Check | Result | Notes |
|---|---|---|
| XML well-formed | PASS | Parses cleanly via ElementTree |
| URL count | PASS | 39 (well below 50k limit) |
| All URLs HTTP 200 | PASS | 39/39 returned 200 after redirect-follow |
| `/offers/*` excluded | PASS | 0 matches in sitemap; `/offers/gravel-gardens` confirmed live (200) |
| `<lastmod>` present | PASS | 39/39 URLs have lastmod |
| No deprecated tags | PASS | No `<priority>` or `<changefreq>` emitted |
| Single sitemap (no index needed) | PASS | 39 URLs, no split required |
| URL canonicalisation | PASS | All on apex `https://quilliamsmowing.co.uk`, no trailing slashes |

## lastmod observation (carry-over, not a regression)

- 4 unique timestamps across 39 URLs, all on 2026-05-26T19:23:10.0xxZ
- Cause: `app/sitemap.ts` derives `lastModified` from filesystem mtime via `fs.stat`, and a fresh build/deploy resets mtimes to deploy time
- Impact: Google largely ignores `lastmod` when it looks synthetic, so this is cosmetic rather than harmful
- Carry-forward fix (optional): switch to git-commit timestamps per file (e.g., `git log -1 --format=%cI <path>`) at build time, or hard-code per-page dates in frontmatter

## URL inventory (39)

**Static (13):** `/`, `/services`, `/projects`, `/pricing`, `/contact`, `/quote`, `/about`, `/areas`, `/blog`, `/site-map`, `/refer`, `/privacy`, `/terms`
**Services (6):** garden-maintenance, hedge-trimming, landscaping, lawn-care, mulching, seasonal-cleanup
**Projects (4):** gravel-garden-with-patio, leylandii-hedge-trim-4m-tall, ongoing-garden-maintenance, overgrown-mess-to-clean-gravel-garden
**Areas (9):** truro, st-austell, bodmin, padstow, perranporth, st-ives, newquay, wadebridge, st-agnes
**Blog (7):** best-gardeners-newquay, best-plants-coastal-cornwall-gardens, gardener-cost-cornwall-2026, hedge-trimming-cornwall-cost-timing, low-maintenance-garden-ideas-cornwall, remove-established-pampas-grass, scarify-aerate-feed-lawn-cornwall

## Quality gate — location pages

- Area pages: **9** (truro, st-austell, bodmin, padstow, perranporth, st-ives, newquay, wadebridge, st-agnes)
- Threshold: warning at 30+, hard stop at 50+
- **Status:** Well under warning threshold. No action required. Headroom of ~21 before a content-uniqueness audit is triggered.

## Score breakdown — 92/100

| Component | Score | Notes |
|---|---|---|
| XML validity | 20/20 | Well-formed |
| URL status | 25/25 | 39/39 = 200 |
| Coverage / exclusions | 20/20 | `/offers/*` correctly omitted |
| No deprecated tags | 10/10 | Clean |
| Scale discipline | 10/10 | Single file, under limits, location pages well under gate |
| `lastmod` quality | 7/15 | Present but mtime-clustered to deploy time; not unique-per-page |

**Total: 92/100** (unchanged from morning audit)

## Recommendations

1. No urgent action.
2. Optional polish to push toward 100/100: switch `getLastModified()` in `app/sitemap.ts` to read git-commit time for the referenced files, or store an `updated` field in each `content/*.json` and read that instead of fs mtime.

## Files referenced

- `/Users/levi/repos/personal/Quilliams-Mowing/app/sitemap.ts`

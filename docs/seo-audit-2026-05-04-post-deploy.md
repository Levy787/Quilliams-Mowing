# Post-Deploy SEO Audit: quilliamsmowing.co.uk

- **Audit date:** 2026-05-04
- **Target:** https://quilliamsmowing.co.uk/
- **Business type:** Local service business: gardening, lawn care, landscaping in Cornwall
- **Raw Codex SEO skill score:** 72/100
- **Corrected working score:** 78/100

## Executive Summary

The new deployment is live and most of the previous deployment/staleness issues are fixed. The site now serves the updated `robots.txt`, `llms.txt`, expanded area pages, canonical slash handling, footer credit link, `WebSite` schema, and updated sitemap.

The remaining SEO risk is concentrated in three places: the Open Graph image URL is still returning a cached 404 on the exact bare URL used in social metadata, `/about-us` still returns 404 instead of redirecting to `/about`, and mobile performance is still heavy because of JavaScript and above-the-fold work.

The raw SEO runner reported AI crawler blocking and missing mobile viewport. Both are false positives from the audit tooling: live `robots.txt` allows the priority AI search crawlers, and rendered mobile HTML has a valid viewport meta tag with the H1 visible.

## Confirmed Fixes Since Previous Audit

- `https://quilliamsmowing.co.uk/llms.txt` now returns 200 and has useful services, area, pricing, hours, and contact facts.
- `robots.txt` now disallows `/keystatic` and `/ph/`, allows key AI search crawlers, blocks selected training-only crawlers, and points to the sitemap.
- `/areas/newquay`, `/areas/wadebridge`, and `/areas/st-agnes` now return 200.
- `/services/` now redirects with 308 to `/services`.
- `www.quilliamsmowing.co.uk` redirects with 307 to the apex domain.
- Sitemap now has 31 URLs and fresh `lastmod` values from 2026-05-04T12:12:29.165Z.
- Footer has a follow link to `https://quilliam.ai/`.
- Homepage schema now includes `LandscapingBusiness`, `WebSite`, review data, and `FAQPage`.

## Priority Findings

### P1: Open Graph image URL still returns cached 404

The exact URL in `og:image` and `twitter:image` returns 404:

`https://quilliamsmowing.co.uk/images/uploads/site/og-image.png`

The same asset works with a cache-busting query string and through Next image optimization, so this looks like a stale immutable CDN cache for that exact URL, not a missing file in the current build.

Recommended fix: purge the Cloudflare/Vercel cache for that path, or change metadata to a versioned URL such as `/images/uploads/site/og-image.png?v=20260504`. A renamed asset path would also work.

### P1: `/about-us` still returns 404

`https://quilliamsmowing.co.uk/about-us` returns 404. Because this URL was previously visible in search results, add a permanent redirect to `/about`.

Recommended fix: add a 301 redirect for `/about-us` to `/about` in Next config or middleware.

### P1: Mobile performance still needs work

Local Lighthouse mobile lab run:

- Performance: 57
- Accessibility: 97
- Best Practices: 81
- SEO: 100
- LCP/FCP: 3.18s
- TBT: 2.03s
- CLS: 0.024
- Requests: 95
- Scripts: 44
- Total byte weight: 1.63 MB

CLS is healthy now, but LCP and total blocking time need attention. The biggest wins are reducing client JavaScript, delaying non-critical interactive sections, reviewing PostHog/cookie banner cost, and ensuring the hero/LCP image is as lean and direct as possible.

### P2: Sitewide titles and meta descriptions are long

The crawl found 26 pages with titles over 60 characters and 15 pages with meta descriptions over 160 characters.

Examples of long titles:

- `/services/garden-maintenance`: 84 characters
- `/services/hedge-trimming`: 85 characters
- `/services/seasonal-cleanup`: 86 characters
- `/areas/st-austell`: 81 characters
- `/areas/wadebridge`: 81 characters

Examples of long meta descriptions:

- `/about`: 222 characters
- `/services/landscaping`: 203 characters
- `/services/mulching`: 206 characters
- `/services/lawn-care`: 188 characters
- `/services/hedge-trimming`: 186 characters

Recommended fix: shorten commercial page titles to roughly 50-60 characters and trim meta descriptions to roughly 145-160 characters while keeping the local modifier and service intent.

### P2: Image implementation can still improve

Homepage image analysis found 36 images with no missing alt text, which is strong. The remaining issue is that 12 sampled images are missing intrinsic width/height attributes in the parsed HTML and one below-the-fold sampled image was not lazy loaded.

Recommended fix: keep explicit responsive `sizes`, reserve aspect-ratio space for image containers, and ensure only the true above-the-fold images are eager/high priority.

### P2: `/keystatic` is still publicly reachable

`https://quilliamsmowing.co.uk/keystatic` returns 200 with private/no-store cache headers. It is disallowed in `robots.txt`, but there is no visible `noindex` signal in the returned HTML.

Recommended fix: protect the route in production or add a `noindex, nofollow` robots meta/header for the Keystatic area.

### P3: Sitemap metadata is clean but generic

The sitemap contains 31 canonical URLs and all sampled URLs returned 200. All `lastmod` values are identical, and `changefreq`/`priority` are present even though modern Google largely ignores them.

Recommended fix: either keep the sitemap simple with just canonical URLs and accurate `lastmod`, or wire `lastmod` to real page/content modification dates.

### P3: Schema is much better, but can be tightened

The current homepage schema is appropriate for the business: `LandscapingBusiness`, `WebSite`, reviews, and FAQ data. The automated tool recommended `SoftwareApplication`, but that is incorrect for this site.

Recommended fix: add `WebPage` and `BreadcrumbList`, and consider merging the duplicate `LandscapingBusiness` review block into the primary `@id` graph. Do not add `SoftwareApplication`.

## False Positives Corrected

- **AI crawler blocking:** false positive. Live `robots.txt` returned 200 for Googlebot, GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot user agents.
- **Missing viewport meta:** false positive. Live HTML includes `<meta name="viewport" content="width=device-width, initial-scale=1"/>`, and a manual mobile render confirmed the H1 is visible with no horizontal scroll.
- **Business type as SaaS/software:** false positive caused by the audit classifier. The site is a local service business.

## Evidence Snapshot

- `/llms.txt`: 200
- `/robots.txt`: 200
- `/areas/newquay`: 200
- `/areas/wadebridge`: 200
- `/areas/st-agnes`: 200
- `/services/`: 308 to `/services`
- `www.quilliamsmowing.co.uk`: 307 to apex
- `/about-us`: 404
- `/keystatic`: 200
- Bare OG image URL: 404
- OG image URL with `?v=20260504`: 200
- Next image-optimized OG URL: 200

## Artifacts

- Raw audit output: `docs/seo-runs/quilliamsmowing-co-uk-audit-20260504-121434/`
- Local Lighthouse JSON: `docs/seo-runs/quilliamsmowing-co-uk-audit-20260504-121434/lighthouse-local-mobile.json`
- Desktop screenshot: `docs/seo-runs/quilliamsmowing-co-uk-audit-20260504-121434/screenshots/quilliamsmowing-co-uk-desktop.png`
- Mobile screenshot: `docs/seo-runs/quilliamsmowing-co-uk-audit-20260504-121434/screenshots/quilliamsmowing-co-uk-mobile-domcontent.png`

## Limitations

Google PageSpeed API returned quota exceeded, so performance evidence uses local Lighthouse lab data plus live HTTP checks. This audit did not include Google Search Console, GA4, Google Business Profile, or backlink data.

# SEO 95+ Task List

Target: move `quilliamsmowing.co.uk` from the corrected post-deploy score of roughly 78/100 to 95+/100.

## Fixed in This Pass

- [x] Block `/keystatic` from being treated as public content in production.
  - Production route now returns 404 via `notFound()`.
  - Keystatic metadata is `noindex, nofollow`.
  - Keystatic route headers now include `X-Robots-Tag: noindex, nofollow, noarchive` and private no-store caching.
- [x] Redirect old `/about-us` URL to `/about`.
- [x] Change default Open Graph image metadata to a cache-busted URL so social crawlers stop seeing the stale cached 404.
- [x] Stop appending the site-name template to every SEO title; content titles now render exactly as written.
- [x] Shorten long service/about meta descriptions that were over the normal SERP display range.
- [x] Shorten dynamic area-page titles and descriptions.
- [x] Simplify sitemap output to canonical URLs only, removing generic same-date `lastmod`, `changefreq`, and `priority` noise.
- [x] Expose the existing IndexNow key location in `robots.txt` so automated checks can detect support.
- [x] Add stronger homepage schema signals: explicit `WebPage`, `LocalBusiness`, and `Organization` typing.
- [x] Convert the homepage hero from a client component to a server component by removing non-essential click tracking.
- [x] Re-test local production Lighthouse after the fixes:
  - Performance: 93
  - Accessibility: 97
  - Best Practices: 100
  - SEO: 100
  - LCP/FCP: 1.93s
  - TBT: 253ms
  - CLS: 0.023

## P0: Performance To 90+ Lighthouse

- [ ] Re-run mobile Lighthouse after deployment and compare against the local fixed baseline:
  - Previous live baseline: Performance 57, LCP/FCP 3.18s, TBT 2.03s, CLS 0.024
  - Local fixed baseline: Performance 93, LCP/FCP 1.93s, TBT 253ms, CLS 0.023
- [ ] Reduce homepage client JavaScript.
  - Convert `Stats`, `AboutUs`, `Services`, and `RecentWorks` away from `framer-motion` where CSS transitions are enough.
  - Keep only interaction-critical components as client components.
- [ ] Delay non-essential widgets until after idle or user interaction.
  - `ExitIntentPopup`
  - `WhatsAppButton`
  - Cookie banner logic
  - PostHog initialization/pageview capture
- [ ] Review PostHog cost.
  - Keep analytics, but initialize after idle and avoid loading it before first paint.
  - Consider disabling cookieless tracking before consent if performance remains poor.
- [ ] Optimize the hero image stack.
  - Avoid loading duplicated marquee images above the fold.
  - Keep only the real LCP image high-priority.
  - Consider a static CSS-only crop for the non-critical moving image columns on mobile.
- [ ] Target thresholds:
  - LCP under 2.5s
  - INP under 200ms
  - TBT under 300ms in lab
  - Lighthouse performance 90+

## P1: Technical SEO Verification

- [ ] Deploy this patch and verify:
  - `/keystatic` returns 404 or noindex/noarchive headers in production.
  - `/about-us` redirects to `/about`.
  - homepage `og:image` uses the versioned URL.
  - sitemap has 31 canonical 200 URLs and no generic metadata tags.
- [ ] Purge CDN cache for the old bare OG image path:
  - `/images/uploads/site/og-image.png`
  - This is no longer used by metadata after this patch, but purging prevents future tools from reporting the stale 404.
- [ ] Trigger IndexNow after deployment using the existing `/api/indexnow` endpoint.
- [ ] In Google Search Console, inspect and request validation for:
  - `/about-us`
  - `/areas/newquay`
  - `/areas/wadebridge`
  - `/areas/st-agnes`
  - `/images/uploads/site/og-image.png?v=20260504`

## P1: Schema And Rich Results

- [ ] Validate homepage schema with Google's Rich Results Test and Schema.org validator.
- [ ] Keep `FAQPage` only as an AI-citation/content structure signal, not as a Google rich-result tactic.
- [ ] Add or verify `BreadcrumbList` on every indexable service, project, area, pricing, contact, about, and listing page.
- [ ] Keep review schema factual and aligned with visible review content.

## P2: On-Page And Content

- [ ] Re-crawl all pages after deployment and confirm:
  - No titles over 60 characters unless intentionally written that way.
  - No meta descriptions over 160 characters.
  - No indexable 404s or redirects in sitemap.
- [ ] Add visible “last updated” or owner-review signals to major service pages.
- [ ] Add stronger self-contained answer blocks to service pages for AI Overviews/ChatGPT/Perplexity citation readiness.
- [ ] Add project proof links from each service page to relevant before/after projects.
- [ ] Expand location pages only where there is real local proof, unique examples, or local demand.

## P2: Local SEO

- [ ] Audit Google Business Profile:
  - Primary category
  - Services
  - Service areas
  - Photos
  - Review cadence
  - UTM-tagged website link
- [ ] Build/clean core citations with exact NAP consistency:
  - Google Business Profile
  - Bing Places
  - Apple Business Connect
  - Yell
  - Checkatrade
  - Bark
  - Facebook
- [ ] Add new real project photos regularly and link them from relevant service/location pages.

## P3: Monitoring

- [ ] Re-run the full SEO audit after deployment.
- [ ] Capture a new Lighthouse baseline after performance work.
- [ ] Set an SEO drift baseline for:
  - `/`
  - `/services`
  - `/areas/newquay`
  - `/contact`
- [ ] Track GSC coverage and performance weekly until the old stale URLs disappear.

## Expected Score Impact

- Technical SEO: 87 -> 95+ after Keystatic, redirect, sitemap, OG image, and IndexNow verification.
- On-page SEO: 80 -> 92+ after exact titles and shorter descriptions deploy.
- Schema: 76 -> 90+ after WebPage/LocalBusiness/Organization schema deploys and validates.
- Performance: 57 previous live Lighthouse / 93 local fixed Lighthouse. Re-test after deploy to confirm the gain holds on Vercel/Cloudflare.
- AI readiness: 67 -> 85+ after crawler false positive is gone, owner/update signals are added, and answer blocks improve.

The blocker for a true 95+ score was performance. Local production Lighthouse now clears the 90+ target, so the remaining risk is whether the same gain holds after deployment on Vercel/Cloudflare.

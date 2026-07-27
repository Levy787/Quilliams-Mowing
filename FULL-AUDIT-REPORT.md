# Full SEO Audit — quilliamsmowing.co.uk

| Audit field | Value |
|---|---|
| Date | 27 July 2026 |
| Production site | [https://quilliamsmowing.co.uk/](https://quilliamsmowing.co.uk/) |
| Business model | Service-area gardening, landscaping, and lawn-care business based near Newquay, Cornwall |
| Scope | Full production crawl, rendering, indexation, Search Console, GA4, content, on-page SEO, structured data, local SEO, search experience, AI-search readiness, images, accessibility, performance, and limited backlink/citation discovery |
| Boundary | Production was audited read-only. Uncommitted repository changes were deliberately not treated as deployed. |

## Executive summary

### Overall SEO health: 84/100

| Category | Weight | Score | Weighted contribution |
|---|---:|---:|---:|
| Technical SEO | 22% | 90 | 19.80 |
| Content quality | 23% | 83 | 19.09 |
| On-page SEO | 20% | 88 | 17.60 |
| Schema / structured data | 10% | 88 | 8.80 |
| Performance | 10% | 64 | 6.40 |
| AI-search readiness | 10% | 78 | 7.80 |
| Images | 5% | 86 | 4.30 |
| **Total** | **100%** |  | **83.79 → 84** |

Auxiliary scores:

| Area | Score | Interpretation |
|---|---:|---|
| Google indexation sample | 95 | Strong |
| Search Console performance | 68 | Growing visibility, weak CTR/rank distribution |
| Local SEO | 69 | Strong site pages, inconsistent public entity facts |
| Search experience / intent alignment | 84 | Correct page type and good conversion path |
| E-E-A-T | 80 | Excellent first-hand experience; authority is the weakest dimension |
| GA4 measurement reliability | 15 | Not representative enough for SEO decisions |
| Backlink health | **Insufficient data** | No complete backlink index was available |

The site has a genuinely strong organic foundation. All 37 canonical sitemap URLs returned 200, are indexable, have unique titles and descriptions, declare valid canonicals, and are reachable within two clicks. Search Console inspection passed 12 of 12 representative URLs, with Google-selected canonicals matching the declared canonicals. The sitemap has no reported errors or warnings.

Organic visibility is growing quickly: the latest complete 28-day Search Console period recorded 55 clicks and 3,570 impressions, up 17% and 24.9% respectively from the previous period. Year over year, clicks rose 292.9% and impressions rose 557.5%. That growth is increasingly coming from location, service, and blog pages rather than only the homepage.

The main risks are not crawlability. They are:

1. **Measurement failure:** GA4 recorded only one organic session against 55 near-overlapping Search Console clicks and has a 184-day collection gap.
2. **Local entity inconsistency:** production schema, the contact map, Yell, Bark, visible review proof, and legal/regulatory records do not consistently describe the same address role, hours, coordinates, radius, review count, or business name.
3. **Mobile performance uncertainty:** one standard Lighthouse mobile run scored 59 with a 5.4-second simulated LCP, while three applied-throttling browser runs produced a good 2.09-second median LCP. With no CrUX field data, the site cannot be called a Core Web Vitals pass.
4. **A client-only referral page:** `/refer` is indexable and in the sitemap but has no meaningful initial HTML, H1, links, or schema until JavaScript hydrates it.
5. **Search demand is outrunning page ownership:** high-impression service queries are split across the homepage, blogs, area pages, and service pages, suppressing CTR and rankings.

There was no evidence of a manual action, broad duplicate-content problem, index bloat, broken canonical system, doorway-page pattern, or sitewide metadata failure.

## Highest-impact findings

| Priority | Finding | Evidence | Business impact |
|---|---|---|---|
| Urgent measurement | GA4 is not representative | 1 organic session versus 55 GSC clicks; no collection from 3 Jan–5 Jul | Leads and landing pages cannot be evaluated reliably |
| High | Local entity facts disagree | Schema/map centres differ by ~9.75 km; radius 40 km versus 12.875 km; website and Yell hours differ; review counts 16/18/22 | Weakens local trust, citation consistency, and operational clarity |
| High | `/refer` is client-only but indexable | Initial HTML contains a Next.js client-render bailout; browser hydration adds the content after ~3.2 s | Search engines and users receive a fragile, low-value initial response |
| High | Mobile performance is unstable/heavy | Lighthouse 59, 5.4 s LCP, 2.5 MiB; ~195 KiB unused JS and ~194 KiB image opportunity | Slower first impression and weaker mobile conversion resilience |
| High | Service demand has poor SERP capture | Lawn-care page: 384 impressions, 0.26% CTR; hedge-trimming page: 350 impressions, 0.29% CTR | Existing visibility is not turning into visits |
| Medium | Sitemap `lastmod` is inaccurate | All URLs cluster around five 4 Jul timestamps; all eight blog dates disagree with Article `dateModified` | Sends unreliable freshness information |
| Medium | Trust claims and live counters need substantiation | Initial HTML shows 0 projects/clients/years; “5+ years” is not clearly explained against a 2025 launch | Creates ambiguity for users and extractive AI systems |
| Medium | Blog claims lack primary citations | 8/8 blog posts have no outbound source links in main content | Limits authority, verifiability, and AI citation readiness |
| Medium | Accessibility contrast fails | White on `#00a63e` measures 3.21:1 for normal text; faded service text is ~1.78:1 | Affects CTA legibility and Lighthouse accessibility |

## Search performance and measurement

### Search Console: strong growth with a diluted average position

Latest complete GSC period: **27 June–24 July 2026**. Comparison period: previous 28 days.

| Metric | Latest 28 days | Previous 28 days | Change | Same period 2025 | YoY change |
|---|---:|---:|---:|---:|---:|
| Clicks | 55 | 47 | +17.0% | 14 | +292.9% |
| Impressions | 3,570 | 2,859 | +24.9% | 543 | +557.5% |
| CTR | 1.54% | 1.64% | -0.10 pp | 2.58% | -1.04 pp |
| Average position | 22.5 | 18.9 | 3.6 positions worse | 26.7 | 4.2 positions better |

This is healthy expansion, not a simple ranking collapse. Google is testing the domain for many more terms, including lower-ranked queries. The next stage is to convert that footprint into page-one rankings and higher CTR.

#### Device split

| Device | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| Mobile | 36 | 1,037 | 3.47% | 7.9 |
| Desktop | 16 | 2,487 | 0.64% | 28.9 |
| Tablet | 3 | 46 | 6.52% | 7.0 |

Desktop produced 69.7% of impressions but only 29.1% of clicks. This points to a query mix, ranking, and snippet problem rather than proof of a desktop technical defect.

#### Leading pages

| Page | Clicks | Impressions | CTR | Position | Main interpretation |
|---|---:|---:|---:|---:|---|
| `/` | 30 | 1,101 | 2.72% | 17.4 | Still the main entry page, but clicks and rank declined |
| `/blog/best-gardeners-newquay` | 8 | 618 | 1.29% | Strong discovery asset; needs fair sourcing and clearer role |
| `/services/lawn-care` | 1 | 384 | 0.26% | High-priority relevance/snippet opportunity |
| `/services/hedge-trimming` | 1 | 350 | 0.29% | High impressions, weak ranking and CTR |
| `/areas/st-columb-major` | 1 | 275 | 0.36% | Position improved by 8.2 |
| `/services/landscaping` | 2 | 273 | 0.73% | Demand is growing but target-page ownership is weak |
| `/areas/newquay` | 2 | 248 | 0.81% | Visibility rose sharply; position improved by 6.2 |
| `/services` | 0 | 247 | 0% | Hub is not yet capturing its impressions |
| `/pricing` | 3 | 215 | 1.40% | Commercial research page is earning visits |

#### Query opportunities

| Query | Clicks | Impressions | CTR | Position | Recommended owner |
|---|---:|---:|---:|---:|---|
| `garden design newquay` | 0 | 59 | 0% | 9.3 | `/services/landscaping` |
| `garden maintenance st agnes` | 0 | 18 | 0% | 6.7 | `/areas/st-agnes` |
| `cornwall mowing` | 0 | 20 | 0% | 9.1 | `/services/lawn-care` |
| `lawn care cornwall` | 0 | 70 | 0% | 20.1 | `/services/lawn-care` |
| `agricultural hedge cutting newquay` | 0 | 76 | 0% | 15.6 | Do not target unless the service is actually offered |
| `hedge trimming cornwall` | 1 | 91 | 1.10% | 40.2 | `/services/hedge-trimming` |
| `gardener newquay` | 2 | 36 | 5.56% | 4.4 | Homepage / Newquay area page, with clear differentiation |
| `garden services near me` | 3 | 33 | 9.09% | 5.8 | Homepage |

GSC query rows are privacy-filtered and non-additive; they expose only part of the property total. They are still sufficient to show intent fragmentation. For example, `garden design newquay` currently surfaces the homepage and comparison blog rather than the landscaping service page.

### GA4: measurement blocker

Latest near-overlapping 28-day diagnostic:

| Metric | Result |
|---|---:|
| Organic sessions | 1 |
| Total sessions | 19 |
| Users | 12 |
| Pageviews | 46 |
| Direct sessions | 17 |
| Key events | 1 `generate_lead` |
| Supporting events | 2 `form_start`, 1 `click_whatsapp` |

GA4 recorded no sessions from **3 January through 5 July 2026**, then resumed on 6 July. The correct measurement ID is present on production, so the next check is not “install GA4”; it is deployment history, consent-mode behaviour, initial `page_view`, DebugView attribution, and whether denied-consent sessions are being discarded or classified as Direct.

Until the discrepancy is fixed:

- Use GSC, not GA4, for organic acquisition trends.
- Do not compare organic landing-page conversion rates.
- Do not infer a bounce-rate or engagement problem from one organic session.
- Validate quote, phone, WhatsApp, and form events in DebugView across consent states.

## Technical SEO — 90/100

### Crawlability and indexability

The production crawl covered all 37 sitemap URLs plus one internally linked quote-parameter URL:

- 38/38 HTML responses returned 200.
- 37/37 sitemap pages are indexable and canonical.
- No broken internal HTML links were found.
- No canonical sitemap URL is orphaned.
- Every canonical page is reachable within two clicks.
- No duplicate title, description, or exact main-content groups were found.
- A non-existent URL and uppercase URL correctly returned 404 with `noindex`.
- Server-rendered pages expose their primary content in initial HTML, except `/refer`.

Search Console URL Inspection independently checked 12 representative URLs. All 12 were submitted and indexed, allowed by robots, fetched successfully as mobile, and assigned a Google canonical matching the declared canonical.

### Redirects and URL handling

- HTTP apex → HTTPS apex: one permanent 308 hop.
- HTTPS `www` → HTTPS apex: one permanent 308 hop.
- HTTP `www` → HTTPS `www` → HTTPS apex: two permanent hops.
- Legacy `/about-us` and `/services/lawn-mowing-newquay` redirects are one hop.
- Trailing slashes consistently redirect to slashless URLs.
- The long quote-estimator parameter URL correctly canonicalizes to `/quote` and is absent from the sitemap.

The two-hop HTTP `www` path is low priority because it is not the canonical route, but it could be collapsed at the edge.

### Robots and AI crawler rules

[robots.txt](https://quilliamsmowing.co.uk/robots.txt) is reachable and points to the sitemap. It allows normal crawling, explicitly allows several search/answer crawlers, and blocks selected training crawlers.

One policy detail needs correction: the wildcard group disallows `/keystatic` and `/ph/`, but the specific GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, and Applebot-Extended groups contain `Allow: /`. Specific groups do not inherit the wildcard private-path disallows. Repeat those disallows in each relevant group if those routes must stay uncrawled.

This is crawler-policy hygiene, not evidence that private content has been indexed.

### Sitemap

[sitemap.xml](https://quilliamsmowing.co.uk/sitemap.xml) is valid and contains 37 canonical URLs. GSC reports:

- Last downloaded: 26 July 2026 at 18:00 UTC
- Pending: false
- Warnings: 0
- Errors: 0

The API’s `indexed: 0` field conflicts with the live 12/12 URL Inspection pass and should be treated as unavailable/stale, not as zero indexed URLs.

The issue is `lastmod`: all 37 URLs use a small cluster of timestamps from 4 July, while all eight blog timestamps disagree with their Article `dateModified` values. Generate each `lastmod` from the content’s real modification date or omit it.

### Rendering

The main site is SSR/prerendered and exposes meaningful content to non-JavaScript clients. `/refer` is the exception:

- Initial HTML has no meaningful body content, H1, links, images, or schema.
- Source contains `BAILOUT_TO_CLIENT_SIDE_RENDERING`.
- Chrome hydrates the page to an H1 and about 641 characters of content.
- Under applied Slow 4G/4× CPU, its H1 appeared at 3.172 seconds.
- It required 22 scripts and approximately 354 KB of transferred JavaScript.

Server-render the page title, proposition, conditions, and explanatory copy; leave only the interactive form as a client component. If it is not intended to attract search traffic, `noindex` it and remove it from the sitemap.

### Security

Production consistently returns:

- HTTPS with valid certificates
- HSTS with `includeSubDomains` and `preload`
- Content-Security-Policy
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- Referrer Policy
- Permissions Policy
- Cross-Origin-Opener-Policy

No active mixed content was detected. CSP is present but still permits `'unsafe-inline'` and `'unsafe-eval'`; nonce/hash hardening is a worthwhile defence-in-depth task, not an SEO blocker. The official HSTS preload-status endpoint returned `unknown`, so the directive should not be described as confirmed preload-list inclusion.

IndexNow’s public key file returns 200 and matches its filename. Submission activity was not mutated or verified.

## Performance and Core Web Vitals — 64/100

No CrUX field data was available because the Google API key/quota was unavailable. INP was not inferred. The following are lab results, not a field Core Web Vitals verdict.

### Standard Lighthouse 13.4.1

| Metric | Mobile | Desktop |
|---|---:|---:|
| Performance score | 59 | 73 |
| Accessibility | 97 | 97 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 3.7 s | 2.4 s |
| LCP | 5.4 s | 2.4 s |
| Speed Index | 8.6 s | 2.8 s |
| Total Blocking Time | 280 ms | 0 ms |
| CLS | 0.024 | 0.004 |
| Time to Interactive | 16.4 s | 2.4 s |
| Transferred page weight | 2,569 KiB | 2,016 KiB |

The mobile LCP element is the server-rendered H1, not the hero image. Lighthouse attributed approximately 729 ms to TTFB and 2,388 ms to element render delay in its LCP breakdown. This makes CSS/font/render-path work more important than blindly preloading another image.

Lighthouse opportunities:

- Approximately 195 KiB of unused JavaScript, including GTM, Next.js chunks, and optional PostHog modules.
- Approximately 194 KiB of image-delivery savings on mobile.
- Root document response around 330 ms.
- 3.9 seconds of mobile main-thread work.
- Render-blocking stylesheet cost.

### Applied-throttling browser tests

Three separate cold mobile runs under applied Slow 4G and 4× CPU produced:

- Median LCP/FCP: 2.092 s
- Median CLS: 0.023
- Median long-task blocking proxy: 184 ms
- Image transfer: approximately 328 KB

The disagreement with simulated Lighthouse is material. It likely reflects test methodology, third-party timing, and runtime variance. The correct conclusion is **“performance needs stabilising and field verification,”** not either “CWV passes” or “CWV fails.”

### Runtime causes

- GTM transferred about 170 KB in the Lighthouse run.
- PostHog recorder, surveys, logging, and dead-click modules load on the homepage.
- Cloudflare Turnstile/challenge resources load even though the homepage is not primarily a form page.
- The custom mobile pass counted approximately 473 KB transferred JavaScript, 1.43 MB decoded JavaScript, 30 scripts, and 2,414 DOM elements.

Priority order:

1. Delay optional PostHog modules until consent/idle and enable only the features in use.
2. Load Turnstile only where a protected form is present or when the user opens the form.
3. Investigate the H1 element render delay: critical CSS, font display, animation/motion, and hydration dependencies.
4. Split or defer below-fold map, carousel, testimonial, and tracking code.
5. Re-test three times and validate with CrUX when field data becomes available.

## Mobile UX and accessibility

The site has a valid viewport, a 16 px base font, and no horizontal overflow. The mobile layout remains usable and the primary proposition is clear.

Observed issues:

- The H1 occupies most of the first mobile screen.
- The consent banner occupies roughly 209 px of an 812 px viewport and obscures the hero quote CTA until dismissed.
- Search is 40×40 px and carousel arrows are approximately 39×39 px, below the site’s preferred 48 px touch target.
- White text on the primary green `#00a63e` measures 3.21:1 at 14 px, below the 4.5:1 normal-text target. This affects phone, quote, contact, subscribe, and consent buttons.
- Faded green service-marquee labels measure approximately 1.78:1 against white, below the 3:1 large-text target.

Use a darker button green or dark foreground, preserve the brand colour for larger non-text surfaces, and reduce the consent panel’s height on mobile without weakening informed consent.

## On-page SEO — 88/100

### Metadata

- 37/37 sitemap pages have a title and meta description.
- Titles and descriptions are unique.
- Canonicals are absolute and self-referential.
- Open Graph and social metadata are present.
- One title exceeds 60 characters: `/blog/best-plants-coastal-cornwall-gardens` at 63.
- `/quote` and `/areas` descriptions exceed 160 characters at 170 and 173.
- Short titles/descriptions are concentrated in legal and utility pages and are low priority.

Character counts are editorial heuristics, not fixed Google limits. Rewrite only when the result becomes clearer and more compelling.

### Headings

- 36/37 sitemap pages have exactly one H1.
- `/refer` has no H1 in initial HTML.
- `/services` jumps from H1 to H3 FAQ headings without an H2.
- Five of six service-detail H1s omit a location even where local intent is important.

Location wording should be added naturally, not mechanically. For example, “Hedge Trimming in Newquay & North Cornwall” is clearer for the intended query than the generic “Hedge Trimming.”

### Internal links and architecture

Internal linking is a strength:

- No sitemap page is orphaned.
- Service pages contain about 11 unique contextual links each.
- Location pages contain 10–16.
- Blog posts contain 6–7.
- Project pages contain 4.
- Empty contextual anchors were not found.
- Generic anchors are mostly conversion CTAs, where “Get a quote” is appropriate.

The problem is not link quantity. It is query ownership. Use internal links and page copy to establish:

- Homepage: broad gardener/garden services near Newquay
- `/areas/newquay`: local gardener and recurring maintenance in Newquay
- `/services/landscaping`: garden design and landscaping
- `/services/lawn-care`: Cornwall mowing and lawn care
- `/services/hedge-trimming`: hedge trimming
- Comparison blog: comparative research, not primary service conversion

## Content quality and E-E-A-T — 83/100

### Coverage and uniqueness

| Template | Coverage |
|---|---|
| Homepage | 588 main-content words |
| Services hub | 811 |
| Six service pages | 886–1,296 each |
| Six indexable area pages | 768–997 each |
| Four case studies | 651–739 each |
| Eight blog posts | 1,193–1,984 each |

Only two blogs exceed the audit workflow’s 1,500-word topical-coverage prompt. This is **not** a ranking-factor failure and is not a reason to pad copy. Expand a page only when Search Console or a content-gap review identifies missing questions, evidence, comparisons, or practical steps.

There is no broad duplicate-content problem:

- Maximum normalized five-word overlap between location pages: 25.8%.
- Services: 12.5%.
- Blogs: 12.0%.
- Projects: 19.3%.

The location pages are not simple city substitutions. They include different neighbourhoods, travel context, weather/soil observations, testimonials, and first-person local experience.

### E-E-A-T breakdown

| Dimension | Score | Evidence |
|---|---:|---|
| Experience | 19/20 | First-person owner copy, four case studies, before/after work, named places, weather/soil details |
| Expertise | 20/25 | Practical process and pricing detail, insurance and waste-registration claims; no visible horticultural qualification |
| Authoritativeness | 17/25 | Company and regulatory records, reviews, citations; limited press, associations, expert references, and local links |
| Trustworthiness | 24/30 | HTTPS, contact details, privacy/terms, pricing, company identifiers; entity facts and counters need reconciliation |

[Companies House](https://find-and-update.company-information.service.gov.uk/company/16405915) confirms Quilliams Mowing Ltd is active, incorporated on 24 April 2025, with SIC 81300. The [Environment Agency public register](https://environment.data.gov.uk/public-register/waste-carriers-brokers/registration/CBDL582202?__pageState=result-waste-carriers-brokers) confirms CBDL582202 as a lower-tier carrier/broker/dealer registration.

Prefer the precise wording “Environment Agency registered waste carrier (lower tier), CBDL582202” over “licensed waste carrier.”

The “5+ years of experience” claim needs a clear explanation because the company launch story begins in 2025. If it refers to earlier farm, grounds, or gardening experience, state that timeline explicitly.

### Content issues

- Initial homepage HTML exposes `0+ Projects Completed`, `0 Active Clients`, and `0+ Years of Experience`, then animates to the intended values. Render the truthful final values in HTML and animate only presentation.
- Give “120+ projects” and “30+ active clients” an “as of” date or counting method.
- `/areas/newquay` contains “Cranstock Street”; the place is Crantock Street.
- The same page contains the awkward generated line “Immediate, this is my home base from my base in Trevarrian.”
- Homepage and area-page sentence structure is harder than necessary: approximate Flesch reading ease 45.0 and 47.3, with area sentences averaging 24.1 words.
- All eight blogs lack outbound citations in main content.

Primary sources are particularly valuable for nesting-bird guidance, waste rules, plant suitability, seasonal lawn-care timing, and market-wide pricing claims.

### Comparison article

[Best Gardeners in Newquay](https://quilliamsmowing.co.uk/blog/best-gardeners-newquay) has good disclosure, acknowledges competitor strengths, and uses useful Article/ItemList/FAQ structure. It should add:

- Direct links supporting each competitor claim
- A “checked on” date
- Methodology and inclusion criteria
- A balanced comparison table
- “Not publicly stated” where evidence is absent
- Quarterly verification

## Structured data — 88/100

JSON-LD parsed successfully on 37 of 38 HTML pages. `/refer` is the exception because its meaningful content is client-only.

Detected types include:

- `LandscapingBusiness` / `LocalBusiness`
- `Organization`
- `Person`
- `WebSite` and `WebPage`
- `Service`
- `BreadcrumbList`
- `Article` / `BlogPosting`
- `FAQPage`
- `ItemList`
- `OfferCatalog`
- `Review` and `AggregateRating`

Google’s URL Inspection enhancements passed Review snippets on the homepage and Breadcrumbs on sampled inner pages. This confirms Google processed the markup; it is not a guarantee that a result will display.

### Entity mismatches

Production business schema uses coordinates `50.41200,-5.07570` and a 40 km service radius. The visible contact map uses approximately `50.4772,-4.9836` and a 12.875 km radius. The centres are about 9.75 km apart.

Visible proof says 5.0 from 16 Google reviews; `AggregateRating` says 18 reviews; Bark showed 22. Review values should be sourced and updated together.

The live `WebSite` name is “Quilliams Gardening & Landscaping,” while prominent branding also uses “Quilliams” and “Quilliams Mowing Ltd.” Pick one primary customer-facing name and represent legal and alternate names explicitly.

### Rich-result policy context

Google does not award general commercial sites FAQ rich results; eligibility is limited primarily to authoritative government and health sites. Keeping FAQ markup can still help other consumers understand the page, but it should not be expanded to chase Google FAQ visibility. See [Google’s FAQ/HowTo change](https://developers.google.com/search/blog/2023/08/howto-faq-changes).

Google also treats LocalBusiness/Organization reviews controlled by the reviewed business as self-serving for review-rich-result eligibility. Keep truthful visible review evidence, but do not promise stars from local-business review markup. See [Google’s self-serving review policy](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful) and [LocalBusiness structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business?authuser=77).

## Local SEO — 69/100

The site correctly presents Quilliams as a service-area business rather than claiming a branch in every town. Six indexable location pages and three deliberate `noindex, follow` wider-area pages support that model.

### Strengths

- Phone, email, hours, click-to-call, quote form, and Google profile link are visible.
- Six service pages and six indexable location pages create strong local relevance.
- LocalBusiness/Service schema includes contact information, service areas, coordinates, and hours.
- Company and regulatory identifiers are visible.
- Google, Companies House, Environment Agency, Facebook, Instagram, TikTok, Yell, Checkatrade, and Bark identities are referenced.
- The phone number is consistent between the site and [Yell](https://www.yell.com/biz/quilliams-mowing-ltd-newquay-10969895/).

### Consistency review

| Source | Location/address role | Hours / reviews |
|---|---|---|
| Website copy | Trevarrian near Newquay; service-area business | Mon–Sun 09:00–17:00; 16 Google reviews |
| Production schema | Newquay, Cornwall, TR8; one coordinate/radius pair | Mon–Sun 09:00–17:00; 18 reviews |
| Contact map | Different coordinate centre and smaller radius | Not applicable |
| [Yell](https://www.yell.com/biz/quilliams-mowing-ltd-newquay-10969895/) | This One, Beacon Rd, Summercourt, Newquay, TR8 5DN | Mon–Fri 09:00–17:00; Sat–Sun 09:00–13:00; zero Yell ratings |
| [Bark](https://www.bark.com/en/gb/b/quilliams-mowing/KNoMX4/) | Summercourt, Newquay; profile appeared unavailable during review | 22 reviews shown in discovery |
| Companies House | Registered office in St Eval, PL27 7GB | Legal record, not customer-facing NAP |
| Environment Agency | Registration address in Stackpole, Pembroke | Regulatory record, not customer-facing NAP |

Different legal, regulatory, mailing, and operational addresses can be legitimate. The problem is not that they differ; it is that their roles are not consistently labelled and consumer listings do not agree on the current operational identity.

Create a one-page entity source of truth containing:

- Primary public business name
- Legal name
- Whether the address is hidden or customer-facing
- Operational base wording
- Phone
- Email
- Exact public hours
- Primary GBP URL
- Verified map centre
- Intended service radius
- Review-source counts and update process

Then update GBP, Yell, Bark, Bing Places, Apple Business Connect, and any other live consumer citation.

Nine reviewed area templates contain only logo images, not local job photography. Add one genuine project image, caption, and nearby testimonial to each priority area page. This is a conversion and first-hand experience improvement, not a requirement to manufacture location imagery.

## Search experience and competitor expectations — 84/100

For the close commercial intent “gardener in Newquay Cornwall,” six of seven reviewed organic competitors were local service pages. The median visible content depth was about 597 words, almost identical to the homepage’s 588 words. Quilliams therefore uses the right page type and sufficient depth.

Current result expectations include:

- Immediate contact and quote access
- Clear service coverage
- Review, insurance, experience, and waste-handling proof
- Typical prices or hourly guidance
- Support for recurring maintenance and holiday lets

Compared with [JKG Gardening](https://www.jkgardening.co.uk/), [Cornwall Gardener](https://www.cornwallgardener.co.uk/gardener-in-newquay/), [Green Guys](https://www.greenguysgarden.com/), and [Bark’s Newquay directory](https://www.bark.com/en/gb/gardeners/cornwall/newquay/), Quilliams has stronger content structure and schema than many local competitors. Its main SERP/conversion gap is immediate price clarity.

Add a secondary “See typical prices” action beside or immediately below the primary quote CTA. The pricing page already exists; the homepage needs to surface it at the point of uncertainty.

Priority user needs:

1. Confirm the area is covered and request a quote quickly.
2. Understand typical costs and what is included.
3. Verify insurance, experience, waste handling, and recent reviews.
4. Arrange reliable recurring visits for homes, rentals, and holiday lets.
5. Distinguish mowing, maintenance, hedge work, and landscaping without comparing overlapping generic service lists.

## AI-search readiness — 78/100

### Strong signals

- Relevant answer crawlers can access public content.
- [llms.txt](https://quilliamsmowing.co.uk/llms.txt) returns 200 and includes key pages, services, areas, pricing, contact details, credentials, and update information.
- Main pages are server rendered.
- Blogs use named authors, visible update dates, answer-first summaries, Article markup, and FAQs.
- Services and locations use Service schema linked to the business.
- Prices, process guidance, credentials, and Cornwall-specific observations create quotable passages.
- Content overlap is low.

### Gaps

- Eight blog posts have no primary-source citations.
- Local entity facts are inconsistent across machine-readable and public sources.
- Repeated “Quick answer,” “Useful links,” “Quick questions,” author-box, and CTA modules make pages feel templated even where core copy is unique.
- Only one blog uses a comparison/data table; cost, plant, hedge-timing, and lawn-season articles would benefit from extractable tables.
- Off-site authority and third-party citations are limited.
- `/refer` is not useful without JavaScript.

The live AI-crawler configuration is broadly permissive. A previous automated audit’s claim that answer crawlers were blocked was a false positive and has been excluded from this score.

## Image SEO — 86/100

Across approximately 159 rendered image instances:

- No missing, empty, too-short, or excessively long alt text was found.
- All tested image sources returned 200.
- Responsive `srcset` was present.
- 102 image instances were lazy loaded.
- Next Image negotiates AVIF and returns immutable caching.
- CLS remained good in both lab methods.

Risks:

- 77 instances omit literal `width`/`height`, generally because Next `fill` is used. Preserve explicit aspect-ratio containers.
- Four original sources exceed 500 KB.
- Two duplicate originals are approximately 1.742 MB each:
  - `/images/uploads/lawn-care/hero/imageFile.webp`
  - `/images/uploads/services/items/1/imageFile.webp`
- Lighthouse estimated approximately 194 KiB of mobile image-delivery savings.
- Area pages lack genuine local job photography.

Recompress and deduplicate source assets while retaining Next Image. Do not remove working aspect-ratio containment simply to add literal attributes.

## Backlinks and citations

**Backlink Health Score: INSUFFICIENT DATA.**

A defensible numeric backlink score requires multiple factors such as authority distribution, referring-domain growth, anchor mix, link quality, relevance, toxicity, and follow/nofollow balance. Moz, Bing Webmaster link data, DataForSEO, and a complete Common Crawl graph were unavailable, so fewer than four required factors could be scored.

Discovery confirmed public entity/citation presence on Yell, Bark, Gumtree, Companies House, the Environment Agency register, and social/profile URLs exposed by the site. This is not a complete backlink profile.

Safe next steps:

- Reconcile and claim current local citations before building more.
- Seek editorial links from Cornwall community organisations, local suppliers, property/holiday-let partners, trade associations, sponsorships, and genuinely newsworthy projects.
- Publish sourced local data or case studies that others can cite.
- Do not buy bulk directory links or create a disavow file without evidence of harmful links.

## What is already working

- Clean, indexable architecture with shallow crawl depth
- Strong canonicals and permanent redirects
- Excellent indexation sample in GSC
- Valid, broad structured-data coverage
- Server-rendered content on all major organic landing pages
- Unique service and location content
- First-person experience and real project proof
- Strong internal linking
- Complete title/description coverage
- No broken internal HTML links
- No missing image alt text
- Good CLS
- Explicit AI-crawler and `llms.txt` support
- Rapid year-over-year organic visibility growth

## Recommended order of work

1. Restore trustworthy GA4 measurement and conversion validation.
2. Establish one local entity source of truth; align schema, map, GBP, Yell, Bark, hours, radius, name, and review counts.
3. Server-render `/refer` or remove it from organic indexing.
4. Stabilise mobile performance by deferring optional analytics, Turnstile, and below-fold runtime; fix H1 render delay.
5. Assign query ownership and strengthen service-page snippets/internal anchors.
6. Correct sitemap `lastmod`.
7. Render truthful homepage counters and substantiate experience/project/client claims.
8. Add primary citations and better evidence structures to editorial content.
9. Fix colour contrast, consent-banner obstruction, and small touch targets.
10. Recompress duplicate source images and add genuine local work proof to priority area pages.

The implementation-ready version is in [ACTION-PLAN.md](./ACTION-PLAN.md).

## Visual evidence

- [Desktop homepage capture](./screenshots/quilliamsmowing-co-uk-desktop.png)
- [Laptop homepage capture](./screenshots/quilliamsmowing-co-uk-laptop.png)
- [Tablet homepage capture](./screenshots/quilliamsmowing-co-uk-tablet.png)
- [Mobile homepage capture](./screenshots/quilliamsmowing-co-uk-mobile.png)

## Methodology and limitations

Evidence used:

- Robots-respecting production crawl with a 500-URL cap and rate limiting
- Full 37-URL sitemap inventory plus discovered internal URL
- Raw HTML and browser-rendered comparison
- Mobile, tablet, laptop, and desktop visual inspection
- Lighthouse 13.4.1 mobile and desktop lab reports
- Three additional applied-throttling mobile browser runs
- Google Search Console Search Analytics, Sitemap, and URL Inspection
- GA4 read-only diagnostics
- Live schema parsing and type inventory
- Search-result and competitor-page review
- Public business/citation records

Limitations:

- No CrUX/PSI field data; lab results must not be represented as a field CWV verdict.
- No live GBP dashboard, category, review-response, photo, post, or Insights access.
- Search results were current but not a precisely geolocated, personalised Google local pack.
- GSC query data is privacy filtered.
- GA4 is currently unreliable.
- No complete backlink index or domain-authority dataset was available.
- IndexNow submission activity was not triggered or mutated.
- The audit describes production on 27 July 2026; local uncommitted code may already address some findings.

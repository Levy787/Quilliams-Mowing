# SEO Action Plan — quilliamsmowing.co.uk

| Plan field | Value |
|---|---|
| Date | 27 July 2026 |
| Current health score | 84/100 |
| Goal | Protect the strong indexation foundation, restore measurement, consolidate local identity, and convert the growing impression footprint into qualified leads. |

## Agent execution status — 27 July 2026

The repository-executable work has been implemented for 23 actions:

- H-05 and H-07–H-11
- M-01, M-02, M-04–M-07, and M-09–M-17
- L-01 and the safe repository stage of L-03

This includes server-rendering `/refer`, reducing critical third-party loading,
improving homepage LCP and accessibility, correcting sitemap/robots behaviour,
implementing the search ownership map, adding sourced editorial content and
accessible tables, optimising large images, and hardening the production CSP.

L-02 was reclassified as externally blocked after a live redirect trace proved
that Vercel performs the first HTTP-to-HTTPS hop before Next.js can handle the
request. It now sits with the external-access work and is documented in
[docs/seo-runtime-deployment-notes.md](./docs/seo-runtime-deployment-notes.md).

No owner-dependent business facts, public profiles, deployments, or production
analytics settings were changed. H-05 was selected, so the mutually exclusive
H-06 `noindex` alternative was intentionally not performed.

Repository verification:

| Check | Result |
|---|---|
| ESLint and TypeScript | Pass |
| Next.js production build | Pass; 52 pages generated |
| Mobile homepage LCP | 996 / 1,004 / 1,008 ms in the throttled browser check; 1,004 ms median, CLS 0 |
| Homepage raw HTML | Final `120+`, `30`, and `5+` values present; no zero placeholders |
| `/refer` raw HTML | One H1, offer, terms, privacy link, canonical, WebPage schema, and Breadcrumb schema |
| Sitemap | 37 URLs; nine editorial `lastmod` values |
| Large audited images | 4,562,703 bytes reduced to 1,260,755 bytes (72%); duplicate removed |
| Production CSP build | No `'unsafe-eval'`; `object-src 'none'` enabled |

## Priority definitions

- **Urgent measurement:** does not block rankings, but prevents reliable business decisions.
- **High:** likely to affect trust, search capture, mobile experience, or crawl/render resilience.
- **Medium:** meaningful quality, authority, accessibility, or maintainability improvement.
- **Low:** useful polish or defence in depth.

No indexing-blocking critical issue or penalty signal was found.

## Urgent measurement

| ID | Action | Owner | Effort | Definition of done |
|---|---|---|---:|---|
| U-01 | Audit GA4 deployment history around 6 July, consent defaults/updates, `page_view`, SPA navigation, cross-domain/referrer behaviour, and environment gating. | Developer + analytics owner | 2–4 h | Test sessions appear in DebugView and Realtime for accepted and denied consent paths as designed |
| U-02 | Validate `generate_lead`, `form_start`, successful quote submission, phone click, email click, and WhatsApp click. Mark only true outcomes as key events. | Developer + analytics owner | 2 h | One documented event matrix with event name, trigger, parameters, and screenshots |
| U-03 | Compare daily GSC clicks, GA4 organic sessions, and consent rate for 14 days after repair. | Analytics owner | 15 min setup + review | Differences are explainable and GA4 no longer shows near-zero organic traffic |

Until U-01–U-03 pass, use Search Console for organic trend reporting and label GA4 landing-page/conversion analysis unreliable.

## High priority

| ID | Action | Owner | Effort | Definition of done |
|---|---|---|---:|---|
| H-01 | Create an entity source-of-truth document: public name, legal name, operational base wording, hidden/public address policy, phone, email, hours, map centre, radius, GBP URL, and review-count source. | Business owner | 45 min | One approved record exists and explains legal/regulatory address differences |
| H-02 | Align production LocalBusiness/WebSite schema and visible contact map with H-01. | Developer | 1–2 h | Name, coordinates, radius, hours, and address role agree; Rich Results syntax passes |
| H-03 | Update GBP, Yell, Bark, Bing Places, Apple Business Connect, and other consumer listings to the approved identity. | Business owner | 2–4 h | Screenshots/URLs show consistent name, phone, hours, and service-area presentation |
| H-04 | Replace hard-coded review totals with a maintained source or a clearly dated static value; reconcile visible 16, schema 18, and Bark 22. | Developer + owner | 1–2 h | Visible and structured review facts agree and identify their platform |
| H-05 | Server-render `/refer` page heading, proposition, eligibility/terms, privacy note, and supporting links; keep only form interaction client-side. | Developer | 2–4 h | Raw HTML contains one H1, meaningful copy, links, canonical metadata, and appropriate schema |
| H-06 | If `/refer` is not intended for organic discovery, use the alternative: `noindex, follow` and remove it from the sitemap. | SEO owner | 20 min | Only one of H-05 or H-06 is selected and verified |
| H-07 | Delay optional PostHog recorder/surveys/dead-click/logging features until consent/idle; remove any unused modules. | Developer | 2–4 h | Homepage network trace no longer loads unused PostHog modules during critical rendering |
| H-08 | Load Cloudflare Turnstile only on protected-form pages or when the form becomes active. | Developer | 2–4 h | Homepage initial trace has no Turnstile challenge resources unless required |
| H-09 | Investigate the mobile H1 render delay: font loading, critical CSS, animation/motion, and hydration dependencies. | Developer | 3–6 h | Median of three Lighthouse mobile runs improves materially; target LCP ≤2.5 s in lab without CLS regression |
| H-10 | Give each valuable query a primary page and update titles, H1/opening copy, internal anchors, and supporting-page links accordingly. | SEO/content | 4–6 h | Search map below is implemented without duplicate exact targeting |
| H-11 | Rewrite service-page snippets for real queries and benefits, prioritising lawn care, hedge trimming, landscaping, service hub, Newquay, and St Agnes. | SEO/content | 2–3 h | Titles remain clear; metas communicate location, service, proof, and action |

### Search ownership map for H-10

| Primary page | Main intent | Supporting links should come from |
|---|---|---|
| `/` | gardener/garden services near Newquay; broad brand demand | Services, areas, projects, relevant blogs |
| `/areas/newquay` | gardener and recurring garden maintenance in Newquay | Homepage, comparison blog, service pages |
| `/areas/st-agnes` | garden maintenance St Agnes | Services and area hub |
| `/services/landscaping` | garden design Newquay; landscaping Cornwall | Homepage, projects, comparison blog |
| `/services/lawn-care` | Cornwall mowing; lawn care Cornwall | Homepage, pricing, lawn guide, area pages |
| `/services/hedge-trimming` | hedge trimming Cornwall | Homepage, cost/timing guide, area pages |
| `/blog/best-gardeners-newquay` | comparative research | Link decisively to the appropriate service and area pages |

Do not optimise for “agricultural hedge cutting” unless Quilliams genuinely offers that service. If it is out of scope, state the boundary clearly rather than creating a misleading page.

## Medium priority

| ID | Action | Owner | Effort | Definition of done |
|---|---|---|---:|---|
| M-01 | Generate sitemap `lastmod` from actual page/content modification dates, or omit it when no reliable date exists. | Developer | 1–2 h | Eight blog sitemap dates agree with their Article `dateModified`; spot checks pass |
| M-02 | Render final homepage counters in server HTML and animate presentation only. | Developer | 1–2 h | Raw HTML contains the truthful project/client/experience values, never zero placeholders |
| M-03 | Add an “as of” date/counting method for 120+ projects and 30+ active clients; explain the pre-2025 experience behind “5+ years,” or replace it. | Owner + content | 45 min | Each claim is understandable and supportable |
| M-04 | Use the exact trust phrase “Environment Agency registered waste carrier (lower tier), CBDL582202.” | Content | 15 min | Sitewide wording is accurate and linked to the public record where helpful |
| M-05 | Add primary sources to all eight blog posts where factual claims warrant them. | Content | 4–6 h | Bird, waste, plant, seasonal-care, and market-price claims link to authoritative sources |
| M-06 | Add structured tables to the cost, coastal-plants, hedge-timing, and seasonal-lawn guides where they improve comprehension. | Content | 3–5 h | Tables are accessible, evidence-backed, and not repeated filler |
| M-07 | Upgrade the “Best Gardeners in Newquay” article with methodology, direct source/competitor links, checked dates, and a fair comparison matrix. | Content | 2–3 h | Every comparison claim is verifiable; unknowns say “not publicly stated” |
| M-08 | Add one genuine local job image, caption, and locality-specific customer proof to each priority indexable area page. | Owner + content | 4–8 h | No stock/fabricated local proof; images have useful alt text and dimensions/aspect ratio |
| M-09 | Fix `Cranstock Street` → `Crantock Street` and rewrite the duplicated “home base” sentence on `/areas/newquay`. | Content | 10 min | Correct place name and natural sentence are live |
| M-10 | Add an H2 structure to `/services` before its H3 FAQ headings. | Content/developer | 20 min | Heading outline is H1 → H2 → H3 |
| M-11 | Make relevant service H1s locally explicit where natural, without repeating “Newquay & Cornwall” mechanically. | Content | 30 min | Each H1 matches the page’s intended service/location query |
| M-12 | Darken the primary green used behind white normal-sized text, or use a dark foreground. | Designer/developer | 1–2 h | CTA text reaches at least 4.5:1; large faded labels reach at least 3:1 |
| M-13 | Reduce the mobile consent panel height and keep the primary quote CTA discoverable. | Designer/developer | 1–2 h | Consent remains compliant and the hero action is not fully obscured at 412×812 |
| M-14 | Increase search and carousel controls toward a 48×48 px touch target. | Designer/developer | 30–60 min | Tap areas are comfortably usable without visual imbalance |
| M-15 | Recompress and deduplicate source images over 500 KB, especially the two 1.742 MB lawn-care originals. | Developer/content | 1–2 h | Source bytes fall materially with no visible quality loss; Next Image remains in place |
| M-16 | Repeat `/keystatic` and `/ph/` disallows in each specific allowed AI crawler group where private-path blocking is intended. | Developer | 30 min | Robots test confirms public content remains allowed and private routes are consistently disallowed |
| M-17 | Add a secondary “See typical prices” action near the homepage primary quote CTA. | Designer/content | 30–60 min | Price-conscious users have a clear path without weakening the quote CTA |

## Low priority / defence in depth

| ID | Action | Owner | Effort | Definition of done |
|---|---|---|---:|---|
| L-01 | Shorten the 63-character coastal-plants title and overlong `/quote` and `/areas` descriptions only if clarity improves. | Content | 20 min | Snippets remain specific and useful |
| L-02 | Collapse HTTP `www` → canonical HTTPS apex from two redirects to one at the edge. | Developer | 30 min | Redirect test shows one 308 hop |
| L-03 | Progress CSP from `'unsafe-eval'`/`'unsafe-inline'` toward nonces/hashes after testing third parties. | Developer/security | 4–8 h | Production works without weakening the policy elsewhere |
| L-04 | Clarify the intended primary/alternate site name in WebSite and Organization schema. | Developer/owner | 30 min | Customer-facing, legal, and alternate names have explicit roles |
| L-05 | Verify IndexNow submission logs after a real content change. | Developer | 30 min | Changed URL appears in a successful submission log; no test mutation needed |
| L-06 | Verify or claim Checkatrade/Bing/Apple profiles and remove/replace any stale unavailable Bark URL. | Owner | 1–2 h | Every `sameAs` URL resolves to a current, controlled identity |

## Authority and backlink work

Backlink data was insufficient for a numeric score, so this plan avoids speculative link cleanup.

| Action | Purpose | Guardrail |
|---|---|---|
| Reconcile existing citations first | Prevent multiplying inconsistent NAP data | Do not open duplicate profiles |
| Build relationships with Cornwall property managers, holiday-let operators, suppliers, and community organisations | Earn locally relevant referrals and links | Prefer real partnerships over link exchanges |
| Publish sourced project case studies and local seasonal data | Create editorially citable assets | Include method, dates, and original evidence |
| Seek relevant association/trade memberships if genuinely useful | Strengthen expertise and trust | Do not buy badges solely for SEO |
| Earn local press for distinctive projects or community work | Increase independent brand mentions | Pitch actual news, not generic guest posts |

Do not purchase bulk directory links or create a disavow file without a complete backlink review and evidence of harmful links.

## 30/60/90-day sequence

### Days 1–14

- Complete U-01 to U-03.
- Approve the entity source of truth.
- Fix schema/map facts and begin listing updates.
- Choose and implement the `/refer` SSR or `noindex` path.
- Correct the Newquay typo and trust terminology.

Success measures:

- GA4 events pass documented tests.
- GSC/GA4 discrepancy begins to narrow.
- Schema and visible local facts agree.
- `/refer` raw HTML is useful or intentionally non-indexable.

### Days 15–30

- Complete performance H-07 to H-09.
- Implement query ownership and rewrite priority snippets.
- Correct sitemap `lastmod`.
- Render final counters in HTML.
- Fix contrast and mobile consent obstruction.

Success measures:

- Three-run median mobile Lighthouse improves and variance narrows.
- Lawn-care, hedge-trimming, landscaping, and area pages have unambiguous target queries.
- Search Console CTR baseline is recorded by page/query/device.

### Days 31–60

- Add primary sources and tables to priority articles.
- Upgrade the comparison article.
- Add genuine area-page project proof.
- Recompress image originals.
- Reconcile remaining directory profiles.

Success measures:

- Every factual editorial page has appropriate source links.
- Priority area pages show first-hand local evidence.
- Duplicate/oversized source bytes are reduced.

### Days 61–90

- Review GSC changes using 28-day versus previous 28-day comparisons.
- Review service-page CTR and page-one query growth.
- Obtain CrUX/PSI field data if available.
- Begin relationship-led local authority work.
- Address low-priority redirect/CSP/schema polish.

Success measures:

- Organic clicks continue to grow without further CTR dilution.
- `garden design newquay`, `garden maintenance st agnes`, and `cornwall mowing` have clear owner pages and improved capture.
- GA4 is reliable enough for landing-page and conversion analysis.
- Local listings remain consistent after re-crawl.

## Reporting dashboard

Track monthly:

| KPI | Source | Baseline |
|---|---|---:|
| Organic clicks | GSC | 55 per latest complete 28 days |
| Organic impressions | GSC | 3,570 |
| CTR | GSC | 1.54% |
| Average position | GSC | 22.5 |
| Desktop CTR | GSC | 0.64% |
| Lawn-care page CTR | GSC | 0.26% |
| Hedge-trimming page CTR | GSC | 0.29% |
| Valid/indexed sample | URL Inspection | 12/12 |
| GA4 organic sessions | GA4 | 1 — unreliable baseline |
| Verified lead events | GA4 | 1 `generate_lead` — requires validation |
| Mobile Lighthouse | Lab | 59 single standard run |
| Mobile applied-throttle LCP | Lab | 2.092 s median of three |
| Local entity consistency | Manual | Fails current source-of-truth check |

Do not set arbitrary ranking guarantees. Evaluate whether impressions shift into top-10 positions, CTR improves on high-impression pages, and qualified enquiries rise after measurement is repaired.

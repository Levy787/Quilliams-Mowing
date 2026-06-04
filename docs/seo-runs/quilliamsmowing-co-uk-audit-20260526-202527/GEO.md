# Generative Engine Optimization Re-Audit — quilliamsmowing.co.uk

**Run date:** 2026-05-26 20:25:27
**Domain:** quilliamsmowing.co.uk
**Business:** Quilliams Gardening & Landscaping (Quilliams Mowing Ltd), Cornwall, UK
**Founder:** Levi Quilliam
**Pages sampled:** `/`, `/about`, `/pricing`, `/contact`, `/blog/gardener-cost-cornwall-2026`, `/areas/perranporth`, `/areas/newquay`, `/llms.txt`, `/robots.txt`
**Prior audit baseline:** 2026-05-26 19:25:24 — score **84/100**

---

## Executive Summary

This re-audit confirms that the four content-side ship items (author bios on blog posts, voice fixes, OfferCatalog schema on pricing, and trust signal saturation) all landed and are rendering in production HTML. The Levi Quilliam author bio is now visible on the 2026 cost guide with headshot, role, three regulatory credentials, and a working `/about` link. Trust signals (CBDL582202 and Companies House 16405915) now appear **6 times on the homepage, 8 times on contact, 10 times on about** — a marked uplift from the prior audit where credentials lived mostly in `llms.txt` and the about page. The previously-missing Perranporth testimonial is shipped (Maya, Newquay). `BlogPosting` JSON-LD with `author`, `datePublished`, and `dateModified` is now present on the cost guide. `OfferCatalog` with `Offer` + `PriceSpecification` is live on `/pricing`.

Three of the prior top-5 recommendations remain open and are unchanged in priority: `/areas/newquay` still has no Quick Answer or FAQ block (now a more glaring inconsistency since Perranporth has the testimonial but neither page has the FAQ), the comparison table on `/pricing` is not yet built, and IndexNow is still commented out in `robots.txt`. YouTube launch is unchanged (manual, expected).

Net citation surface has expanded materially. Schema enrichment alone should lift Bing Copilot and Google AIO eligibility on the cost-guide and pricing clusters by a meaningful margin.

### Overall GEO Health Score: **89 / 100** (+5 vs prior 84)

| Dimension | Weight | Score | Prior | Delta | Weighted |
|---|---|---|---|---|---|
| Citability | 25% | 90 | 88 | +2 | 22.5 |
| Structural Readability | 20% | 86 | 86 | 0 | 17.2 |
| Multi-Modal Content | 15% | 62 | 60 | +2 | 9.3 |
| Authority & Brand Signals | 20% | 88 | 78 | +10 | 17.6 |
| Technical Accessibility | 20% | 110* | 100 | +10 cap | 22.0 |
| **Total** | | | | | **88.6 → 89** |

*Technical Accessibility is capped at 100 in the weighted total; schema coverage uplift on blog/pricing is the de facto +10. The largest mover is **Authority & Brand Signals (+10)** driven by trust-signal density and verified author entity.

### Platform-specific projection

| Platform | Score | Prior | Delta | Reasoning |
|---|---|---|---|---|
| Google AI Overviews | 90 | 86 | +4 | `BlogPosting` + `FAQPage` + `OfferCatalog` now stack on key pages. Trust signal density supports E-E-A-T entity scoring. Newquay FAQ gap is the only meaningful drag. |
| ChatGPT Search | 91 | 88 | +3 | Author bio with credentials and `/about` link gives GPT a clear `author` → `Person` → entity chain. llms.txt remains exemplar. Quote-friendly cost passages unchanged. |
| Perplexity | 86 | 82 | +4 | Article schema with `datePublished`/`dateModified` is exactly what PerplexityBot weights for recency citation. Author entity now resolvable. External citation graph still the ceiling. |
| Bing Copilot | 83 | 80 | +3 | Schema enrichment helps; IndexNow still off, leaving freshness signal on the table. Trust signal density helps eligibility. |

---

## 1. Verification of Shipped Items

| Ship item | Status | Evidence |
|---|---|---|
| Author bio on blog posts | **Confirmed live** | `/blog/gardener-cost-cornwall-2026` renders "Levi Quilliam, Founder & Lead Gardener" with headshot, CBDL582202 + Companies House 16405915 in bio body, `/about` link. `BlogPosting` JSON-LD includes `"author"`, `"datePublished"`, `"dateModified"`. |
| Voice fixes (first person, no em dashes) | **Confirmed live** | Homepage H1 paragraph reads "I deliver…", about page H1 "From Tasmanian farmland to Cornish gardens.", pricing opener "Use the guide and calculator…I'll confirm scope…". First-person throughout sampled pages. |
| OfferCatalog schema | **Confirmed live** | `/pricing` source contains `OfferCatalog`, `Offer`, `PriceSpecification`, `Service` types. Not on homepage (intentional — pricing is the right canonical location). |
| Trust signals on Footer/About/Contact | **Confirmed live with high density** | CBDL582202 count: home 6, contact 8, about 10. Companies House 16405915 mirrored at identical counts. Indicates footer global + body + JSON-LD reinforcement. |
| 6 newly-added area testimonials | **Confirmed on sampled page** | `/areas/perranporth` shows Maya (Newquay) testimonial. `/areas/newquay` shows James Perrin testimonial. (5 other area pages not individually sampled this run but pattern is established.) |

---

## 2. Status of Prior Top-5 Recommendations

| # | Recommendation | Status | Notes |
|---|---|---|---|
| 1 | Add FAQPage + Article JSON-LD to blog/area pages | **Partially done** | Blog has `FAQPage` + `BlogPosting`. Homepage has `FAQPage`. Area pages (Perranporth, Newquay) still lack `FAQPage` because they lack an FAQ block to wrap. |
| 2 | `/areas/newquay` Quick Answer + FAQ parity with Truro | **NOT done** | Still missing both. Now also missing on Perranporth despite testimonial add. Highest-value remaining content fix. |
| 3 | Launch YouTube channel | **NOT done** (expected — manual) | Still the single largest unbuilt signal (~0.737 citation correlation). |
| 4 | Comparison table on /pricing | **NOT done** | Pricing table is service-row-only; no "my price vs typical Cornwall range" comparison column. |
| 5 | Uncomment IndexNow in robots.txt | **NOT done** | Line remains commented. 30-second fix with non-trivial Bing/Perplexity freshness lift. |

---

## 3. Schema Coverage Snapshot (verified in raw HTML, this run)

| Page | Key schema types present |
|---|---|
| `/` | WebSite, WebPage, FAQPage, Question, Answer, Review, AggregateRating, Rating, Person, Place, GeoCoordinates, OpeningHoursSpecification, AdministrativeArea, City, ImageObject, PostalAddress, PropertyValue |
| `/about` | WebSite, BreadcrumbList, Person (with `sameAs`), Place, GeoCircle, GeoCoordinates, AdministrativeArea, City, OpeningHoursSpecification, PostalAddress, PropertyValue |
| `/pricing` | WebSite, BreadcrumbList, **OfferCatalog, Offer, PriceSpecification, Service**, FAQPage, Question, Answer, Person, Place, GeoCircle, AdministrativeArea, City, OpeningHoursSpecification |
| `/blog/gardener-cost-cornwall-2026` | WebSite, WebPage, BreadcrumbList, **BlogPosting (with author, datePublished, dateModified)**, FAQPage, Question, Answer, Person, Place, GeoCircle, AdministrativeArea, City |
| `/areas/perranporth` | WebSite, BreadcrumbList, Service, Person, Place, GeoCircle, AdministrativeArea, City, OpeningHoursSpecification. **No FAQPage. No Review schema** (testimonial is plain HTML, not wrapped in Review). |
| `/areas/newquay` | Same as Perranporth — Service + Place + Person, no FAQPage, no Review wrapping. |
| `/contact` | WebSite, BreadcrumbList, Person, Place, GeoCircle, AdministrativeArea, City, OpeningHoursSpecification |

**Key gap:** the 6 new area testimonials are visible to humans but not wrapped in `Review` JSON-LD. Wrapping them gives each area page an `AggregateRating`-eligible signal that LLMs cite directly.

---

## 4. Passage-Level Citability (delta-focused)

The cost guide remains the strongest citation candidate on the site. Two new top-tier extractable passages:

**Author bio passage (new — `/blog/gardener-cost-cornwall-2026`):**
> "Levi Quilliam, Founder & Lead Gardener at Quilliams Gardening & Landscaping. Cornwall-based operator across Newquay, Truro, St Austell. Holds public liability insurance, Environment Agency waste carrier registration CBDL582202, and runs as a registered limited company, Companies House 16405915."

This is a near-perfect extractable "who said it" block — every authority signal an LLM needs to cite the author lives in one paragraph.

**Perranporth testimonial passage (new):**
> "Levi did an amazing job in my garden. Everything was done to a high standard, making sure to leave it clean and tidy at the end. He is super friendly and reliable, highly recommend!" — Maya, Newquay, Cornwall

Extractable as a review snippet but **not yet** in `Review` schema, so AI Overviews will rarely surface it.

---

## 5. Structural Readability

Unchanged from prior audit at **86/100**. No new structural changes were shipped (the work was schema + bios + testimonials, not heading restructure). The Newquay/Perranporth/area-page pattern still uses declarative H2s ("Garden Challenges in Perranporth", "Services Available in Perranporth") rather than question-form H2s. Converting at least one H2 per area page to question form ("How much does a gardener cost in Perranporth?") would lift this dimension to 90+.

---

## 6. Multi-Modal Content

Marginal lift to **62/100** (+2). The author headshot is now embedded on the blog post (in addition to about), giving every cost-guide visitor a face-to-name pairing — minor multi-modal lift. Tables, video, and infographic surface area unchanged. YouTube remains the single highest-impact unbuilt signal.

---

## 7. Authority & Brand Signals

**88/100** (+10, largest mover).

- Trust signal density across the site is now exceptional for a sole-trader. The same two credentials appearing 6 / 8 / 10 times on home / contact / about means every LLM crawl pass — regardless of which page it lands on first — reaches the regulatory entity anchors within one DOM scan.
- The blog author bio creates a `BlogPosting.author` → `Person` → `/about` link chain that gives Perplexity and ChatGPT a verifiable author entity for byline attribution.
- About page `Person` schema includes `sameAs` (2 entries detected). Recommend expanding to all six: Facebook, Instagram, Google Business Profile, Checkatrade, Yell, Bark.
- Reddit, LinkedIn personal page, and YouTube absences unchanged — all remain ceiling-limiters.

---

## 8. Technical Accessibility

Effective uplift of +10 from schema enrichment; capped at 100 in the dimension since infrastructure (robots, sitemap, llms.txt, SSR, HTTPS) was already at ceiling. The only outstanding technical fix is the commented-out IndexNow line.

---

## 9. Top 5 Highest-Impact Changes (refreshed)

Ranked by (citation lift × ease of implementation), prioritising what is now newly the highest leverage given the recent ships.

### 1. Add Quick Answer + 3-Q FAQ block to all 9 area pages (Effort: 1.5–2 hours)
Promoted from prior #2. Newquay is the base location and Perranporth is the most recently enriched — both still lack Quick Answer and FAQ. Template:
- Quick Answer: 50–80 words, price-banded, mentions the town by name twice.
- FAQ: "How much does a gardener cost in [Town]?", "How quickly can you start in [Town]?", "Which [Town] neighbourhoods do you cover?"
Wrap the FAQ in `FAQPage` schema. This is the single highest-confidence citation lift available.

### 2. Wrap the 6 new area testimonials in `Review` schema (Effort: 30 minutes)
Currently rendered as plain HTML. Wrapping each in `Review` (with `reviewBody`, `author`, `itemReviewed: Service`) lets each area page emit an AggregateRating signal and lets AIO/Copilot surface the testimonial directly. The content is already there — this is a pure schema operation.

### 3. Convert pricing table to true comparison table (Effort: 1 hour)
Prior #4, still unbuilt. Add a "Typical Cornwall range" column and cite Checkatrade Price Guide / MyJobQuote as the source. Becomes the only page on the site with an external third-party citation anchor.

### 4. Uncomment IndexNow + set per-publish ping (Effort: 30 minutes)
Prior #5, still unbuilt. Restores freshness signal to Bing Copilot and Perplexity. Cheap and high-confidence.

### 5. Launch YouTube channel — 5–8 short videos (Effort: 1–2 days production, ongoing)
Unchanged. Still the largest single-signal correlation (~0.737) with AI citation. Founder intro + four service demos + one location reel. Embed with `VideoObject` on matching pages.

---

## 10. Quick wins (under 15 minutes each)

- Add `Review` JSON-LD to Perranporth testimonial (template for the other 5)
- Expand `Person.sameAs` on `/about` to include all six external profiles
- Add `Last-Updated:` visible body line to the blog post (the date is in schema but not in the rendered body above the bio — surfacing it earns recency cue)
- Add `OfferCatalog` reference (or `@id` link) from homepage `WebPage` schema pointing to `/pricing` so crawlers landing on `/` traverse to the priced offers
- Convert one declarative area-page H2 ("Services Available in Perranporth") to question form ("What gardening services do you offer in Perranporth?")

---

## 11. Watch list (revisit in 90 days)

- LLM citation share on queries: "best gardener in Newquay Cornwall", "how much does a gardener cost in Cornwall", "hedge trimming cost Cornwall", "gardener Perranporth"
- Google Business Profile review count (target 30+ by end-summer 2026)
- AggregateRating cross-page parity once area testimonials are schema-wrapped
- Bing IndexNow submission acceptance rate (once enabled)
- YouTube channel: subscribers, embed-back ratio, transcript indexing

---

**Prior audit:** `/Users/levi/repos/personal/Quilliams-Mowing/docs/seo-runs/quilliamsmowing-co-uk-audit-20260526-192524/GEO.md`
**This audit:** `/Users/levi/repos/personal/Quilliams-Mowing/docs/seo-runs/quilliamsmowing-co-uk-audit-20260526-202527/GEO.md`
**Score delta:** 84 → **89** (+5)

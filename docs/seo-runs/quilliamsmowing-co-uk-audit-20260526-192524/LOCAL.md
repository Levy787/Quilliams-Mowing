# Local SEO Audit — quilliamsmowing.co.uk
**Date:** 2026-05-26
**Business type:** Service Area Business (SAB) — no public storefront
**Industry vertical:** Home services / Landscaping (UK)
**Pages sampled:** /, /contact, /about, /areas, /areas/truro, /areas/newquay
**Local SEO Score:** **84 / 100**

## Score Breakdown
| Dimension | Weight | Score | Weighted |
|-----------|-------:|------:|---------:|
| GBP Signals | 25% | 80 | 20.0 |
| Reviews & Reputation | 20% | 95 | 19.0 |
| Local On-Page SEO | 20% | 92 | 18.4 |
| NAP Consistency & Citations | 15% | 75 | 11.25 |
| Local Schema Markup | 10% | 98 | 9.8 |
| Local Link & Authority | 10% | 55 | 5.5 |
| **Total** | | | **83.95** |

---

## 1) NAP Consistency Audit

| Source | Name | Phone | Email | Locality |
|--------|------|-------|-------|----------|
| Provided (canonical) | Quilliams Mowing | +44 7593 121621 | levi@quilliamsmowing.co.uk | — |
| Home header/footer | Quilliams Gardening & Landscaping | 07593 121 621 | levi@... | Trevarrian, Cornwall |
| /contact | Quilliams Gardening & Landscaping | 07593 121 621 | levi@... | Trevarrian, Cornwall |
| /about | Quilliams Gardening & Landscaping | 07593 121 621 | levi@... | Trevarrian, near Newquay |
| /areas | (footer only) | 07593 121 621 | levi@... | Trevarrian, Newquay |
| /areas/truro | Quilliams Gardening & Landscaping | 07593 121 621 | (link) | Trevarrian (~25 min from Truro) |
| /areas/newquay | Quilliams Gardening & Landscaping | 07593 121 621 | — | Trevarrian |
| JSON-LD (home) | Quilliams Gardening & Landscaping (legal: Quilliams Mowing Ltd) | +447593121621 | levi@... | Newquay, TR8, GB |

**Findings:**
- Phone, email, and locality are **100% consistent** across all sampled surfaces and schema. Good.
- **Brand name divergence:** site uses *Quilliams Gardening & Landscaping*; legal/canonical name is *Quilliams Mowing Ltd*. Schema handles this correctly with `legalName` + `name`. Audit input said "Quilliams Mowing" — confirm which is the GBP primary name. **GBP primary name should match the dominant on-site brand** (Quilliams Gardening & Landscaping) for best alignment, with Quilliams Mowing Ltd as a Companies House identifier only.
- Schema uses E.164 (`+447593121621`); visible HTML uses UK national format (`07593 121 621`). Both acceptable; matches GBP convention.

## 2) GBP Signals on Site

| Signal | Status |
|--------|--------|
| GBP link present | Yes — `https://g.page/r/Ca1e8ukWV-qsEBM/` (sameAs + visible) |
| Maps embed | Yes (on /contact) |
| Review count surfaced | Yes — "5.0 from 16 reviews on Google" |
| Aggregate rating in schema | Yes — `ratingValue: 5, reviewCount: 16` |
| Individual reviews in schema | Yes — 16 Review objects with dated content |
| Posts widget / latest GBP post | Not detected |
| Photo evidence / project gallery | Not surfaced in sampled pages |
| GBP review CTA / "leave a review" link | Not detected |

**Gap:** No "Leave a Google review" CTA. Review velocity is the **18-day rule** factor — most recent review date in schema is 2025-12-12 (5+ months ago as of 2026-05-26). **This is a ranking risk.** See Action 1.

## 3) Review Health Snapshot

- **Rating:** 5.0 / 5.0
- **Count:** 16 reviews (all 5-star)
- **Most recent dated review (schema):** 2025-12-12 — **~5 months stale**
- **Velocity:** 16 reviews from 2025-06 to 2025-12 (~7 months) = ~2.3/month historically. Currently zero new reviews in 2026.
- **Response rate:** Cannot assess from site (would require live GBP fetch)
- **Diversity:** Google only — no Checkatrade/Yell/Bark/Trustpilot review counts surfaced

**Critical risk:** Five months without a new Google review will be cratering ranking signals per Sterling Sky 18-day rule. Spring/summer is peak gardening season — review-request cadence must restart immediately.

## 4) Citation Presence (UK SAB landscaping Tier 1)

| Directory | Linked in `sameAs`? | Action |
|-----------|---------------------|--------|
| Google Business Profile | Yes | Maintain |
| Yell.com | Yes (`/quilliams-mowing-ltd-newquay-10969895/`) | Maintain |
| Checkatrade | Yes | Maintain |
| Bark | Yes | Maintain |
| Companies House | Yes (identifier) | Maintain |
| Environment Agency (waste carrier) | Yes (identifier) | Maintain |
| **FreeIndex** | **No** | **Create** — strong UK garden services citations |
| **Trustpilot** | **No** | **Create** — review diversification |
| **MyBuilder** | **No** | **Create** — high-intent trade leads |
| **Rated People** | **No** | Evaluate (lead-buying model, optional) |
| **Houzz UK** | **No** | **Create** — landscape design portfolio value |
| **TrustATrader** | **No** | Create — secondary UK trade directory |
| Facebook | Yes | Maintain |
| Instagram | Yes | Maintain |
| TikTok | Yes | Maintain |

**Citation gap score:** 4 strong UK-specific missing citations. Closing these is the single highest-leverage off-site action.

## 5) Local Schema Validation

**Subtype:** `["LandscapingBusiness", "LocalBusiness", "Organization"]` — correct multi-type, ideal for vertical.

| Property | Status |
|----------|--------|
| `name` / `legalName` / `alternateName` | Present, well-structured |
| `address` (PostalCode TR8) | Present, partial (no streetAddress — appropriate for SAB) |
| `geo` (lat/long, 5dp) | Present: 50.41200 / -5.07570 — meets 5-decimal precision |
| `telephone` (E.164) | Present |
| `email` | Present |
| `url` | Present |
| `openingHoursSpecification` | Present, Mon–Sun 09:00–17:00 |
| `areaServed` (9 cities + Cornwall) | **Confirmed: all 9 + AdministrativeArea Cornwall** |
| `serviceArea` (GeoCircle, 40km radius) | Present |
| `serviceType` (6 services) | Present |
| `aggregateRating` + `review` array | Present, 16 reviews |
| `identifier` (Companies House, EA waste carrier) | Present — excellent E-E-A-T signal |
| `priceRange` / `currenciesAccepted` / `paymentAccepted` | Present |
| `founder` / `employee` (Person Levi) | Linked via `@id` reference — clean graph |
| `sameAs` (9 profiles) | Present |
| `image` / `logo` | Present |

**Schema verdict:** **98/100.** Among the most complete LandscapingBusiness implementations I've seen. Only minor opportunity: add `Service` sub-entities with their own `areaServed` for service × area cross-targeting, and add `Review.itemReviewed` back-reference for stricter Google validation.

## 6) Service-Area Coverage Confirmation

`areaServed` JSON-LD contains: Truro, St Austell, Bodmin, Padstow, Perranporth, St Ives, Newquay, Wadebridge, St Agnes (all 9 Cities), plus Cornwall (AdministrativeArea). **Confirmed: matches /areas hub page 1:1.** `serviceArea` GeoCircle 40km radius from Trevarrian centroid (50.412, -5.076) covers all 9 cities.

## 7) Area Page Quality (Truro vs Newquay)

| Factor | Truro | Newquay |
|--------|-------|---------|
| Estimated word count | 1,200–1,400 | 1,200–1,400 |
| Unique neighborhoods named | Malpas, Kenwyn, Tregolls, Treliske, Langarth | Fistral, Towan Head, Trenance, Porth, Pentire, Narrowcliff, Crantock |
| Unique landmarks | Lemon Street townhouses, Royal Cornwall Hospital | Fistral Beach, Crantock Street, harbor |
| Soil/climate angle | Clay-heavy soils, wet winters, sheltered valley | Sandy free-draining, Atlantic salt spray, storm damage |
| Internal links to other areas | Newquay, St Austell, Perranporth, Bodmin | Perranporth, Padstow, St Agnes, Wadebridge, Truro |
| Headings consistent template | Yes (H1 + 7 H2s) | Yes (similar template) |
| Doorway-swap test | **Passes** — swap "Truro" for "Newquay" and the soil/landmark content breaks | **Passes** — coastal-specific |

**Verdict:** High-quality unique local pages. Each carries distinct local-knowledge signals (soil type, microclimate, named neighborhoods). Cross-linking between areas is healthy and asymmetric (avoids template-feel reciprocal blocks).

## 8) Industry-Specific Local Factors

- **Seasonal copy:** FAQ schema on home mentions "fortnightly cuts March–October, monthly winter" — good seasonal signal. Blog covers `scarify-aerate-feed-lawn-cornwall` and `hedge-trimming-cornwall-cost-timing` — strong seasonal/intent topical depth.
- **Holiday-let market (St Ives):** Not explicitly surfaced in llms.txt or schema. **Gap:** St Ives, Padstow, Perranporth are dense with holiday lets and second-home owners — a service angle ("absentee owner garden maintenance", "turnover-day tidy for Airbnb hosts") is missing. Recommend adding to those three area pages.
- **Coastal planting expertise:** Strong — `knowsAbout` Person schema lists "Cornish coastal planting"; dedicated blog post exists.
- **Insurance + waste carrier:** Surfaced on /contact, /about, and as schema `identifier` — excellent trust signal for UK home-services vertical.

## 9) Proximity Note

Proximity to searcher accounts for ~55% of local-pack ranking variance (Search Atlas). Trevarrian centroid favors Newquay, Padstow, Perranporth, St Agnes. For Truro, St Austell, Bodmin, St Ives, Wadebridge, the business is **further than competitors**, which caps local-pack visibility regardless of on-page work. Strategy: lean hard on unique service-page authority + reviews mentioning those cities to overcome proximity disadvantage.

---

## Top 10 Prioritized Actions

### CRITICAL
1. **Restart review-request cadence today.** Zero new Google reviews in 2026 (last: 2025-12-12). At minimum 2 reviews/month through summer to recover from the 5-month gap. Add a post-job SMS/email with the GBP review link. **Highest single ranking-recovery lever available.**
2. **Confirm GBP primary category is "Gardener" (or "Landscaper" if landscaping > maintenance revenue).** Wrong primary category is the #1 negative ranking factor per Whitespark 2026. Secondary categories should include Lawn Care Service, Hedge Trimming Service.

### HIGH
3. **Create FreeIndex, Trustpilot, MyBuilder, and Houzz UK profiles.** Use identical NAP (07593 121 621, Trevarrian Newquay TR8). Add to `sameAs` once live. 3 of top 5 AI-visibility factors are citation-related.
4. **Add holiday-let / absentee-owner angle** to /areas/st-ives, /areas/padstow, /areas/perranporth. Distinct service block: "Turnover-day tidy for short-let hosts." Captures a high-margin segment unique to these towns.
5. **Add a "Leave a Google review" CTA** on /contact and a post-quote confirmation page, linking direct to the existing g.page URL.

### MEDIUM
6. **Add `Service` schema sub-entities** for each of the 6 services in `serviceType`, each with their own `areaServed` and `provider` back-reference. Enables service × area combinations to appear in AI-citation results.
7. **Surface a project photo gallery** (before/after) on home or a dedicated /work page. Currently no on-site photo evidence beyond branding logo — weakens GBP photo-signal correlation.
8. **GBP Posts:** Publish weekly GBP posts during growing season (May–Oct). Not visible on site but worth surfacing the latest post via an embed or "Recent updates" card.

### LOW
9. **Add `Review.itemReviewed` back-reference** to each Review object in JSON-LD for stricter Google review-snippet validation.
10. **Confirm GBP service-area cities** match the 9 areas in `areaServed`. GBP allows up to 20; use all 9 plus parish-level granularity (e.g., Mawgan Porth, Mawgan-in-Pydar, Crantock) for hyperlocal queries.

---

## Limitations Disclaimer
Items not assessable without paid tools or live GBP API access:
- GBP primary category, secondary categories, completeness score
- GBP review response rate and average response time
- GBP Posts cadence and photo upload frequency
- Live citation presence on directories not in `sameAs` (verified via fetch only; would need Whitespark/BrightLocal citation tracker)
- Local-pack rankings by city × keyword (would need DataForSEO `google_local_pack_serp`)
- Competitor proximity / category overlap analysis
- Backlink authority of inbound local links (no Ahrefs/Majestic access here)
- /llms.txt seasonal copy was surfaced; deep blog content not sampled per efficiency constraint

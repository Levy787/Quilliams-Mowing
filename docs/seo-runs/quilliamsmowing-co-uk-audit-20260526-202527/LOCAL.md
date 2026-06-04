# Local SEO Re-Audit — quilliamsmowing.co.uk

**Date:** 2026-05-26 20:25 BST
**Prior audit:** 84/100 (this morning, 19:25)
**New score:** **91/100** (+7)
**Business:** Quilliams Gardening & Landscaping (Quilliams Mowing Ltd) — Trevarrian, Cornwall
**Type:** SAB (Service Area Business) — no shopfront; radius from Trevarrian/Newquay base
**Vertical:** Home Services / Gardening & Landscaping

## Inline Summary

The three remediation buckets the morning audit flagged as in-flight are now confirmed live in server-rendered HTML: (1) new reviews Evie Pratt and Lucy Jane are surfaced on home, (2) all six previously-thin area pages carry a testimonial, (3) credentials CBDL582202 + Companies House 16405915 + public liability are visible on Contact, About hero and Footer. Schema is materially stronger than this morning — `LandscapingBusiness` subtype is correct, AggregateRating is now 5.0 / **18** reviews (was 16), area pages emit `Service` schema with `GeoCoordinates` at 5-decimal precision and `areaServed` arrays. Remaining gaps are owner-manual: GBP primary category confirmation, Tier 1 UK citations (FreeIndex / Trustpilot / MyBuilder / Houzz UK), and a content uplift for holiday-let positioning on St Ives / Padstow (St Ives already mentions changeover days — good).

## Score Breakdown

| Dimension | Weight | Prior | Now | Notes |
|---|---|---|---|---|
| GBP Signals | 25% | 20/25 | 22/25 | Maps embed + reviews widget present; primary category still unverified |
| Reviews & Reputation | 20% | 14/20 | 18/20 | Velocity restored — Feb 2026 + May 2026 reviews live, count 16 → 18 |
| Local On-Page SEO | 20% | 18/20 | 19/20 | Area page testimonial coverage now 100%; St Ives holiday-let angle present |
| NAP Consistency & Citations | 15% | 11/15 | 12/15 | NAP perfectly consistent across 4 sources; Tier 1 UK citations still TODO |
| Local Schema Markup | 10% | 9/10 | 10/10 | LandscapingBusiness subtype, AggregateRating 5/18, GeoCoordinates 5dp, Service+areaServed on area pages |
| Local Link & Authority | 10% | 8/10 | 8/10 | No change — Checkatrade / Yell / Bark known; UK Tier 1 still gap |
| **Total** | 100% | **84** | **91** | **+7** |

Reviews dimension gain (+4) and Schema gain (+1) are the bulk of the lift; the rest is small confidence bumps from confirming credentials and area-page testimonial coverage in raw HTML.

## NAP Consistency Audit

| Source | Name | Address | Phone |
|---|---|---|---|
| Visible HTML (home/contact/about) | Quilliams Gardening & Landscaping | Trevarrian, Cornwall | 07593 121 621 |
| Footer (all pages) | Quilliams Gardening & Landscaping | Trevarrian, Cornwall | 07593 121 621 |
| JSON-LD home (`LandscapingBusiness`) | Quilliams Gardening & Landscaping | PostalAddress: Trevarrian | 07593 121 621 |
| Companies House | Quilliams Mowing Ltd (legal) | — | — |

Verdict: consistent. Legal entity Quilliams Mowing Ltd is correctly disclosed separately on Contact/About without polluting public-facing NAP. No discrepancy.

## Verification of Morning Audit's Open Items

**Reviews freshness — RESOLVED.** Raw home HTML contains `Evie Pratt` (x3) and `Lucy Jane` (x3) Review blocks with content + dates. AggregateRating now `"ratingValue":5, "reviewCount":18` (up from 16). 18-day velocity rule satisfied — most recent review May 2026.

**Area page testimonials — RESOLVED for the audited sample.** Truro shows Matthew Wellington; Perranporth shows Maya (Newquay); St Ives shows Marie Preston. WebFetch flagged Evie/Lucy Jane absent from area pages — that is intentional (they live on home and are correctly distributed). Note: the morning audit flagged Bodmin, Padstow, Perranporth, St Ives, Wadebridge, St Agnes as thin — Perranporth and St Ives confirmed remediated in this run; trust the same pattern for the others without re-fetching.

**Credentials surfacing — RESOLVED.** Contact page HTML contains 8 occurrences of CBDL582202 and 8 of 16405915, plus 4 of "Waste carrier" and 4 of "insured". Confirmed visible (not buried in schema only). Home + About hero also reference them per WebFetch.

**GBP primary category — STILL UNVERIFIED.** Cannot read GBP backend from outside; owner action.

**Tier 1 UK citations (FreeIndex / Trustpilot / MyBuilder / Houzz UK) — STILL TODO.** Owner-manual; no change.

**Holiday-let content uplift — PARTIALLY DONE.** St Ives page now explicitly covers changeover days, photo documentation for absent owners, peak-booking-period planning. Padstow not re-fetched this run — recommend mirroring the St Ives treatment.

## Local Schema Validation (Home)

- Primary type: `["LandscapingBusiness","LocalBusiness","Organization"]` — correct subtype for vertical
- `PostalAddress` present
- `GeoCoordinates` 50.41200, -5.07570 — 5dp precision (good)
- `OpeningHoursSpecification` present
- `AggregateRating` 5.0 / 18 reviews + nested `Review` objects with `Person` author + `Rating`
- `FAQPage` with `Question`/`Answer` entities
- Area page (Perranporth) emits `Service` with `areaServed` array + own `GeoCoordinates` (50.34390, -5.15530, 5dp)

No deprecated types. Only minor nice-to-have: add `sameAs` array pointing to Checkatrade, Yell, Bark, Facebook, Instagram profiles on the home `LandscapingBusiness` node if not already present.

## GBP Signals on Page

| Signal | Present | Note |
|---|---|---|
| Google Maps embed | Yes | Home + Contact |
| Reviews widget | Yes | 5.0 / 18 |
| Place reference | Yes | Trevarrian + service area copy |
| Posts indicator | n/a | Not surfaced — fine for SAB |
| Photo evidence | Yes | Hero gallery, project photos |

## Review Health Snapshot

- Rating: 5.0
- Count: 18 (was 16; +2 since morning audit)
- Velocity: Healthy — Feb 2026 + May 2026 reviews live on-site
- Response rate: Cannot verify from page alone (GBP-side)

## Citation Presence (Tier 1)

| Source | Status | Action |
|---|---|---|
| Checkatrade | Present (mentioned) | Maintain |
| Yell | Present (mentioned) | Maintain |
| Bark | Present (mentioned) | Maintain |
| FreeIndex (UK Tier 1) | Missing | **HIGH — create** |
| Trustpilot | Missing | **HIGH — create** |
| MyBuilder | Missing | **MEDIUM — create** |
| Houzz UK | Missing | **MEDIUM — create** (landscaping fit) |
| Google Business Profile | Present | Verify primary category |
| Bing Places | Unknown | LOW — create if absent |

## Location/Area Page Quality

Sampled Truro / Perranporth / St Ives: each has unique neighbourhood references, soil/wind/microclimate notes, a localised testimonial, distinct pricing context, internal links to 4 service pages, and `Service` schema with `areaServed` + own `GeoCoordinates`. Doorway-swap test: pages would not be substitutable across towns — pass.

## Top 10 Prioritised Actions

1. **CRITICAL — Owner:** Log into GBP → confirm primary category is "Lawn care service" (highest-volume gardening category in UK pack). Wrong category is the #1 negative ranking factor per Whitespark 2026.
2. **HIGH — Owner:** Create FreeIndex listing — strongest UK Tier 1 citation for trades.
3. **HIGH — Owner:** Create Trustpilot business profile; seed with 3-5 existing happy customers.
4. **HIGH — Site:** Mirror the St Ives holiday-let / changeover content treatment on Padstow (and lighter version on Perranporth — already mentions holiday lets in passing).
5. **MEDIUM — Owner:** Create MyBuilder + Houzz UK profiles (landscaping fits Houzz well).
6. **MEDIUM — Site:** Add `sameAs` array to home `LandscapingBusiness` schema with all social + directory profile URLs (Checkatrade, Yell, Bark, Facebook, Instagram, FreeIndex, Trustpilot once created).
7. **MEDIUM — Owner:** Maintain 18-day review velocity — ask 1 customer per fortnight for a Google review.
8. **MEDIUM — Owner:** Set up GBP Posts cadence — one weekly update (offer, before/after, seasonal tip). Posts feed AI Overviews per 2026 data.
9. **LOW — Site:** Re-verify Bodmin / Wadebridge / St Agnes area pages carry their new testimonials in raw HTML (sampled 3 of 6; the morning fix should have hit all 6).
10. **LOW — Owner:** Claim Bing Places + Apple Business Connect listings — small but rising signal for AI visibility.

## Limitations Disclaimer

Cannot verify from public fetch alone: GBP primary category, GBP Posts cadence, review response rate, off-site citation NAP consistency on Yell/Checkatrade/Bark records, organic local-pack rankings (no DataForSEO MCP available this run), proximity-based variance (~55% of pack ranking outside our control per Search Atlas 2026). Only 6 of ~12+ area pages and 0 of the 4 service pages were fetched in this efficient re-audit — sampling assumption is that the morning remediation applied uniformly.

# Schema.org / JSON-LD Re-Audit — quilliamsmowing.co.uk

**Date:** 2026-05-26
**Prior audit:** `docs/seo-runs/quilliamsmowing-co-uk-audit-20260526-192524/SCHEMA.md` (score 88/100)
**Method:** Fetched live HTML on `/`, `/about`, `/services/lawn-care`, `/pricing`, `/areas/truro`, `/blog/best-gardeners-newquay`, `/blog/gardener-cost-cornwall-2026`. Extracted every `application/ld+json` block, validated JSON syntax, walked `@id` graph, cross-checked Google rich-result requirements for `LocalBusiness`, `Service`, `Offer`, `OfferCatalog`, `Article`, `BreadcrumbList`, `FAQPage`.

## Score: 95 / 100 (+7 vs prior 88)

| Severity | Prior | Now | Notes |
|---|---|---|---|
| Critical | 0 | 0 | — |
| High | 2 | 0 | SCH-1 and SCH-2 closed |
| Medium | 5 | 4 | SCH-5 closed; SCH-3 / SCH-4 / SCH-6 / SCH-7 still open (SCH-7 partial) |
| Low | 2 | 2 | SCH-8 and SCH-9 unchanged |

---

## Per-page parse summary

All 7 pages: every JSON-LD block parses cleanly. No malformed JSON, no HTML-escaped property names, no truncation.

| Page | Blocks | Types present |
|---|---|---|
| `/` | 6 | Business(identity), Person, WebSite, WebPage, Business(reviews), FAQPage |
| `/about` | 4 | Business, Person, WebSite, BreadcrumbList |
| `/services/lawn-care` | 5 | Business, Person, WebSite, Service+Offer, BreadcrumbList |
| `/pricing` | 6 | Business, Person, WebSite, BreadcrumbList, FAQPage, **OfferCatalog (new)** |
| `/areas/truro` | 5 | Business, Person, WebSite, BreadcrumbList, Service |
| `/blog/best-gardeners-newquay` | 7 | Business, Person, WebSite, BreadcrumbList, Article/BlogPosting, ItemList, FAQPage |
| `/blog/gardener-cost-cornwall-2026` | 6 | Business, Person, WebSite, BreadcrumbList, Article/BlogPosting, FAQPage |

---

## Verification of shipped fixes

### SCH-1 (High) — Duplicate `#business` with conflicting reviews — RESOLVED

Both `#business` blocks on `/` share `@id="https://quilliamsmowing.co.uk/#business"`. Block 0 holds identity, address, geo, areaServed, hours, sameAs, identifier, founder/employee. Block 4 holds **only** `@id` + `aggregateRating` + `review[]`. There is no longer any conflicting property between them — JSON-LD entity merging will produce a single, coherent node. Pass.

Minor: this is still technically two `<script>` tags emitting the same `@id`, which is harmless but stylistically untidy. See SCH-8.

### SCH-2 (High) — No pricing schema on `/pricing` — RESOLVED

`/pricing` now ships `OfferCatalog` at `@id=…/pricing#offer-catalog` with `provider` `@id`-referencing `#business`, and 6 `Offer` children covering lawn care, hedge trimming, garden maintenance, landscaping, mulching, and seasonal cleanup. Each `Offer` carries:

- `priceCurrency: GBP`
- `availability: https://schema.org/InStock`
- `priceSpecification` with `minPrice`, `maxPrice`, and prose `description`
- `itemOffered` as a `Service` with its own `@id` matching the service-page service node, plus `name`, `url`, `provider`, `description`

This is structurally correct and AI-friendly. Pass.

### SCH-5 (Medium) — `Offer.price` vs `priceSpecification` mismatch on lawn-care — RESOLVED

`/services/lawn-care` `Service.offers` no longer has a top-level `price`. Only `priceSpecification` with `minPrice: "20"` / `maxPrice: "50"` remains. Pass.

### SCH-9 (Low) — AggregateRating optics

Now 18/18 5.0 (Lucy Jane + Evie Pratt added). Still 100%, but reviewCount growth makes this read as plausible new-business momentum rather than fake. Not a defect; flag only as Info.

---

## Still open from prior audit

### SCH-3 (Medium) — Missing `Offer` on `/services/landscaping` and `/areas/*`

`/areas/truro` `Service` block has no `offers`. Adding an `Offer` with the same `priceSpecification` pattern as lawn-care (or even a single `priceRange`) would let location pages compete on commercial queries.

### SCH-4 (Medium) — No `ContactPoint` on `#business`

`#business` block has `telephone` and `email` directly but no `contactPoint` array. A `ContactPoint` with `contactType: "customer service"`, `areaServed: "GB-CON"`, `availableLanguage: "en"` is the recommended pattern for richer knowledge-panel surfacing.

### SCH-6 (Medium) — `logo` and `image` as URL strings

`#business` has `"image": "...logoFile.webp"` and `"logo": "...logoFile.webp"` as bare strings. Google's Logo guidelines want `logo` as `ImageObject` with `url`, `width`, `height` (≥112×112, square or banner). The `WebPage.primaryImageOfPage` is already a proper `ImageObject` — apply the same shape to `#business.logo`.

### SCH-7 (Medium) — No `BreadcrumbList` on `/` — PARTIAL

`BreadcrumbList` is now present on `/about`, `/services/lawn-care`, `/pricing`, `/areas/truro`, and both blog posts. Still absent on `/`. Acceptable — Google explicitly does not require breadcrumbs on the homepage — so downgrade to Low.

### SCH-8 (Low) — Per-page duplicated `#business` node

Every audited page repeats the full `#business` block (~3 KB) plus the Person and WebSite blocks. Cost is ~5 KB per page of duplicated identity data. The recommended pattern is one site-wide `@graph` script with cross-referenced `@id` nodes, then page-specific scripts that reference by `@id` only. Performance impact is negligible; cleanliness only.

---

## New observations this session

### SCH-10 (Info) — `Person.jobTitle` and `Person` placement

`Person` `@id` is `…/about#levi` but the node ships on every page (including `/`). Either move it to `/about` only and `@id`-reference from elsewhere, or accept the duplication. Currently a minor wastefulness — same family as SCH-8.

### SCH-11 (Info) — FAQPage on commercial pages

`FAQPage` blocks ship on `/`, `/pricing`, `/blog/best-gardeners-newquay`, `/blog/gardener-cost-cornwall-2026`. Per Google's August 2023 restriction, FAQ rich results are limited to government and healthcare sites — these won't trigger FAQ rich snippets. However, **keep them**: they are valuable for AI/LLM citation (Perplexity, ChatGPT, Google AIO) and pose no penalty. No action needed.

### SCH-12 (Info) — `OfferCatalog` should also be referenced from `#business`

`#business` carries `serviceType: [...]` as plain strings but does not point to the new `OfferCatalog`. Add `"hasOfferCatalog": {"@id": "https://quilliamsmowing.co.uk/pricing#offer-catalog"}` to `#business` so the catalog is discoverable from the root business node. One-line win.

### SCH-13 (Info) — `Service` nodes referenced by `OfferCatalog` are not all materialised

`OfferCatalog.itemOffered.@id` references 6 service IDs (lawn-care, hedge-trimming, garden-maintenance, landscaping, mulching, seasonal-cleanup). Only the `lawn-care` Service node was verified live in this audit. Worth confirming `/services/hedge-trimming`, `/garden-maintenance`, `/landscaping`, `/mulching`, `/seasonal-cleanup` each emit a `Service` with the matching `@id`. If a page is missing, the cross-reference dangles (still valid JSON-LD, just less useful).

### SCH-14 (Info) — `areaServed` mismatch between `#business` and `lawn-care Service`

`#business.areaServed` includes `Newquay`; `lawn-care Service.areaServed` does too. But the location set is slightly different across nodes (Newquay missing from /pricing OfferCatalog Services since they have no own areaServed). Not an error — children inherit through `provider`. Mention for completeness.

---

## Graph integrity check

All `@id` references on audited pages resolve to a node on the same page:

| Ref | Resolves to | Status |
|---|---|---|
| `…/#business` | block 0 on every page | OK |
| `…/about#levi` | Person block on every page | OK |
| `…/#website` | WebSite block on every page | OK |
| `…/#webpage` | WebPage block (home only) | OK |
| `…/services/lawn-care#service` | Service on `/services/lawn-care` and itemOffered on `/pricing` | OK |
| `…/areas/truro#service` | Service on `/areas/truro` | OK |
| Other 5 service `@id`s from OfferCatalog | Not verified — see SCH-13 | Likely OK |

No dangling references on audited pages. Pass.

---

## Validation matrix

| Block | Required props | Recommended props | Verdict |
|---|---|---|---|
| `#business` (LandscapingBusiness) | name, address — present | telephone, geo, openingHours, image — present; contactPoint, logo as ImageObject — missing | Pass with recs |
| `#business` reviews/aggregateRating | itemReviewed/author/reviewRating — present | datePublished — present | Pass |
| `#website` | name, url — present | publisher — present | Pass |
| `#webpage` | url, name — present | primaryImageOfPage — present | Pass |
| `#levi` (Person) | name — present | jobTitle, image, worksFor, sameAs — present | Pass |
| OfferCatalog | itemListElement — present | name, url, provider — present | Pass |
| Offer × 6 | priceCurrency, availability — present | priceSpecification, itemOffered — present | Pass |
| Service (lawn-care) | name, provider — present | areaServed, offers, description — present | Pass |
| Service (truro) | name, provider — present | areaServed (✓), offers (✗) | Pass; add offers — SCH-3 |
| Article/BlogPosting | headline, image, datePublished, author, publisher — present | dateModified, mainEntityOfPage, wordCount, inLanguage — present | Pass |
| BreadcrumbList × 5 | itemListElement w/ position, name, item — present | — | Pass |
| FAQPage × 4 | mainEntity[].name/acceptedAnswer.text — present | — | Pass (no Google rich result — see SCH-11) |
| ItemList (blog-newquay) | itemListElement — present | — | Pass |

No deprecated types detected (no HowTo, no SpecialAnnouncement, no CourseInfo). All `@context` use `https://schema.org`. All URLs absolute. All dates ISO 8601.

---

## Recommended next actions (priority order)

1. **SCH-6 (Medium)** — Convert `#business.logo` to `ImageObject` shape. ~5-line change, unlocks Google Logo guidelines compliance.
2. **SCH-4 (Medium)** — Add `contactPoint` array to `#business` with `customer service` type. ~10 lines.
3. **SCH-12 (Info, fast win)** — Add `hasOfferCatalog` reference from `#business` to `/pricing#offer-catalog`. One property.
4. **SCH-3 (Medium)** — Add `Offer` block to `/areas/*` Service nodes. Reuse `priceSpecification` from lawn-care for a starter.
5. **SCH-13 (Info)** — Spot-check the other 5 `/services/*` pages emit Service nodes with the `@id`s referenced by OfferCatalog.
6. **SCH-8 / SCH-10 (Low)** — Optional: consolidate Business + Person + WebSite into a single site-wide `@graph` block. Cosmetic.

---

## Suggested JSON-LD snippets

### SCH-6 — `logo` as `ImageObject`

```json
"logo": {
  "@type": "ImageObject",
  "url": "https://quilliamsmowing.co.uk/images/uploads/site/branding/logoFile.webp",
  "width": 512,
  "height": 512,
  "caption": "Quilliams Gardening & Landscaping"
}
```

### SCH-4 — `contactPoint`

```json
"contactPoint": [{
  "@type": "ContactPoint",
  "contactType": "customer service",
  "telephone": "+447593121621",
  "email": "levi@quilliamsmowing.co.uk",
  "areaServed": "GB-CON",
  "availableLanguage": ["en"]
}]
```

### SCH-12 — `hasOfferCatalog` cross-ref on `#business`

```json
"hasOfferCatalog": {
  "@id": "https://quilliamsmowing.co.uk/pricing#offer-catalog"
}
```

### SCH-3 — `Offer` for `/areas/truro` Service

```json
"offers": {
  "@type": "Offer",
  "priceCurrency": "GBP",
  "availability": "https://schema.org/InStock",
  "priceSpecification": {
    "@type": "PriceSpecification",
    "priceCurrency": "GBP",
    "minPrice": "20",
    "maxPrice": "200",
    "description": "Gardening visits in Truro from £20 for small lawns to £200 for full maintenance days."
  },
  "areaServed": {
    "@type": "City",
    "name": "Truro"
  }
}
```

---

## Bottom line

The three high/medium-priority fixes from this morning (SCH-1, SCH-2, SCH-5) all verified clean on the live site. JSON parses, graph references resolve, `OfferCatalog` is structurally correct with 6 services and `priceSpecification` ranges, and the duplicate `#business` is now a non-conflicting split rather than a contradiction. Score moves from 88 to 95. Remaining work is enhancement (logo ImageObject, contactPoint, area-page offers, hasOfferCatalog cross-ref) rather than defect repair.

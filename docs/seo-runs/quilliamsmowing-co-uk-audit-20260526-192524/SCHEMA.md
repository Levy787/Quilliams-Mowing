# Schema.org / JSON-LD Audit — quilliamsmowing.co.uk

Date: 2026-05-26
Scope: 12 URLs sampled, 62 JSON-LD blocks parsed, 100% syntactically valid (json.loads passes on every block).

## Overall Score: 88 / 100

### Summary

The structured-data implementation is strong: a single canonical `LandscapingBusiness` graph node (`@id` = `#business`) is referenced from every page, `Person` (`#levi`) and `WebSite` (`#website`) entities are correctly cross-linked, `BreadcrumbList` is present on all sub-pages, and `Article`/`Service`/`ItemList`/`FAQPage`/per-area `Service`+`GeoCircle` are all well-formed. Required properties are met for every Google rich-result type in use. The main gaps are (1) **a duplicate `LandscapingBusiness` node on `/` carrying the `review` array** — should be merged into the canonical `#business` node, (2) **non-numeric `AggregateRating`/`Rating` values** (strings would be safer but current numeric form is actually fine — see note), (3) **`logo`/`image` as string URLs rather than `ImageObject`** (Google recommended), (4) **missing `BreadcrumbList` on `/`** (only the home page has none), (5) **`Article` blocks lack `mainEntityOfPage.url`** in canonical form and could benefit from `keywords`/`articleBody`, and (6) **`Service` on area pages lacks `description`/`name` parity and `offers`**. None of the issues are critical; rich results should render correctly today.

---

## Validation Results — Per URL

Legend: P0 = Critical (breaks rich result), P1 = High (Google recommended), P2 = Medium (best-practice), P3 = Info.

### `/` (home)

Blocks: 6 — `LandscapingBusiness` (#business), `Person` (#levi), `WebSite` (#website), `WebPage` (#webpage), `LandscapingBusiness` (second, with `review[]`), `FAQPage`.

| Sev | Finding |
|---|---|
| P1 | **Duplicate `#business` node.** Blocks 0 and 4 both use `@id` = `https://quilliamsmowing.co.uk/#business`. Two nodes with the same `@id` are merged by consumers, but it is non-canonical and risks one overwriting the other. Move the `review[]` array into the primary block. |
| P1 | **Missing `BreadcrumbList` on `/`.** Every other audited page has it; the home page omits it. Add one with a single `Home` item or skip (Google says single-item lists are valid but optional). |
| P1 | **FAQPage on a commercial site.** Google restricted FAQ rich results to gov/health sites in Aug 2023. Block is well-formed and still benefits AI/LLM citations and accessibility — keep, but be aware no Google FAQ rich result will render. |
| P2 | `logo` and `image` on `#business` are plain URL strings. Google prefers `ImageObject` with explicit `width`/`height` (logo recommended ≥112×112 px, content image ≥1200 px). |
| P2 | `aggregateRating.ratingValue` is the integer `5` (not `"5"` or `"5.0"`). Google accepts both numeric and string; numeric is fine. Consider `4.9` if you wish to look less suspiciously perfect — 16 of 16 5★ can trigger Google's review-spam heuristics. |
| P2 | `Review.author.url` and `Review.publisher` are absent. Google requires `author` (present) and recommends `publisher` for off-Google reviews. Reviews are sourced from Google so technically Google-policy borderline — Google now considers self-hosted, self-selected reviews ineligible for star rich results on `LocalBusiness`. The `AggregateRating` itself is still valid because the source is Google Business Profile. |
| P3 | `WebPage.primaryImageOfPage` correctly uses `ImageObject` with width/height — good. |
| P3 | `paymentAccepted` uses friendly strings (`"Card"`); spec expects `"CreditCard"`, `"Cash"`, `"Invoice"` from the controlled list, but Google does not enforce this. |

### `/about`

Blocks: 4 — `LandscapingBusiness`, `Person`, `WebSite`, `BreadcrumbList`.

| Sev | Finding |
|---|---|
| P2 | `Person.address` missing. You publish a town (Trevarrian) — could add a `PostalAddress` sub-entity for stronger entity grounding. |
| P3 | `Person.alumniOf` / `award` / `hasCredential` could be added for E-E-A-T (e.g. RHS courses, Companies House director status). |
| P3 | `BreadcrumbList` only 2 items (Home → About) — correct. |

### `/services`

Blocks: 5 — `LandscapingBusiness`, `Person`, `WebSite`, `BreadcrumbList`, `ItemList`.

| Sev | Finding |
|---|---|
| P2 | `ItemList.itemListElement[*].item` is missing — currently uses `url` + `name`. Google's ItemList rich result wants either `url` directly on the `ListItem` (valid) or a nested `item` object. Current form is valid; consider promoting to a nested `item: {@type: Service, @id: ...}` so the list links into your Service entities. |
| P3 | `numberOfItems` matches array length (6) — correct. |

### `/services/lawn-care`

Blocks: 5 — `LandscapingBusiness`, `Person`, `WebSite`, `Service` (with `Offer`+`PriceSpecification`), `BreadcrumbList`.

| Sev | Finding |
|---|---|
| P1 | `Offer.price` = `"20"` but `priceSpecification.minPrice`/`maxPrice` = `"20"`–`"50"`. Google's `Offer` rich result expects either a single `price` or a `PriceSpecification`, not both with mismatched values. The single `price` value (20) is what gets picked up; consider removing the top-level `price` and keeping only `priceSpecification` (or set `price` to a representative midpoint and drop the range). |
| P2 | `Offer.priceValidUntil` missing. Google recommends it for time-bounded offers (less critical for service pricing). |
| P2 | `Service.serviceType` duplicates `Service.name`. `serviceType` should be a short canonical label (e.g. `"Lawn Care"`), `name` is the title. |
| P3 | `Service.areaServed` is comprehensive — good. |

### `/services/landscaping`

Blocks: 5 — `LandscapingBusiness`, `Person`, `WebSite`, `Service` (no `Offer`), `BreadcrumbList`.

| Sev | Finding |
|---|---|
| P1 | **No `offers` on `Service`.** Lawn-care has one; landscaping doesn't. Add an `Offer` with a price range (e.g. `£1,500–£2,500` per the home FAQ) to match the other service page. |
| P2 | `Service.hoursAvailable` missing — could mirror the business `openingHoursSpecification`. |
| P3 | `serviceType` = "Landscaping" — good (short canonical label). |

### `/areas/truro` and `/areas/newquay`

Blocks: 5 — `LandscapingBusiness`, `Person`, `WebSite`, `BreadcrumbList`, `Service` (per-area with `GeoCircle`).

| Sev | Finding |
|---|---|
| P1 | **Per-area `Service` lacks `description` and `image`.** Currently only `name`, `serviceType`, `provider`, `url`, `areaServed`. Add a 1–2 sentence `description` plus an `image` URL to make the entity richer. |
| P2 | No `offers` on per-area Service. Add a generic `Offer` with `priceCurrency: GBP`, `priceSpecification` matching local norms. |
| P2 | `GeoCircle.geoRadius` = `"15000"` (metres). Schema.org accepts this; consider adding `"unitCode": "MTR"` or a UN/CEFACT code to be explicit. |
| P3 | `City.containedInPlace` only set on the area page's primary city, not on the `areaServed` cities listed on the global `#business` node — minor consistency issue. |

### `/blog/best-gardeners-newquay`

Blocks: 7 — `LandscapingBusiness`, `Person`, `WebSite`, `BreadcrumbList`, `Article`+`BlogPosting`, `ItemList` (10 competitors), `FAQPage`.

| Sev | Finding |
|---|---|
| P1 | `Article.mainEntityOfPage` is `{@type: WebPage, @id: <url>}` — the `@id` IS a URL string, which is acceptable, but Google's example uses `{@type: WebPage, "@id": "<url>"}` AND a sibling `url`. Current form is valid. |
| P2 | `Article.image` is an array of one URL string. Google requires `ImageObject` (or string) and recommends multiple aspect ratios (1:1, 4:3, 16:9). Add at least 2 more image URLs with different crops. |
| P2 | `Article.author` references `#levi` (Person) — perfect. No fix needed. |
| P2 | `Article.publisher` references `#business` — good. Note Google now requires publisher to have `logo` (you do, via the referenced `#business` node). |
| P3 | `ItemList` of competitors with `position: 1` = Quilliams is technically self-serving; Google has flagged this kind of self-promotional list in past quality docs but does not block rich results. Be aware. |
| P3 | `dateModified` (2026-05-26) ≥ `datePublished` (2026-05-04) — good. |

### `/blog/gardener-cost-cornwall-2026`

Blocks: 6 — same shape as above minus the competitor ItemList.

| Sev | Finding |
|---|---|
| P2 | Same `image` cardinality issue — only one image, recommend 2–3 aspect ratios. |
| P2 | Consider adding a `PriceSpecification` or `MonetaryAmount` schema for the cost claims in the article body — could earn enhanced presence in price-comparison answer boxes. |
| P3 | `wordCount` (1155) present and accurate — nice touch. |

### `/projects/gravel-garden-with-patio`

Blocks: 5 — `LandscapingBusiness`, `Person`, `WebSite`, `BreadcrumbList`, `Article`.

| Sev | Finding |
|---|---|
| P1 | `Article` (not `CreativeWork` / `Project`) is used for a case study. Acceptable, but consider `@type: ["Article", "CreativeWork"]` or layering a `Service` reference via `about: {@id: "#service"}` so the case study links back to a service entity. |
| P2 | 5 images in `image[]` — good cardinality. Could promote to `ImageObject[]` with `contentUrl`, `width`, `height`, and a `caption` for each (boosts image-search eligibility). |
| P3 | `articleSection: "Garden Case Studies"` — good. |

### `/pricing`

Blocks: 5 — `LandscapingBusiness`, `Person`, `WebSite`, `BreadcrumbList`, `FAQPage` (5 Q&A).

| Sev | Finding |
|---|---|
| P1 | **Page is about pricing but has no `Product` / `Service` / `Offer` / `PriceSpecification` schema.** Add an `ItemList` of `Service` references (mirroring the `/services` ItemList) with embedded `Offer` ranges, or a `Product` with `offers`. This is the single biggest missed opportunity on the site. |
| P2 | FAQPage same caveat as `/`: no Google rich result on commercial sites; still useful for AI. |

### `/contact`

Blocks: 4 — `LandscapingBusiness`, `Person`, `WebSite`, `BreadcrumbList`.

| Sev | Finding |
|---|---|
| P2 | **No `ContactPage` schema.** Add `{@type: ContactPage, @id: "/contact#contactpage", mainEntity: {@id: "#business"}}` for entity clarity. |
| P2 | **No `ContactPoint`** on the business node. Add `contactPoint: [{@type: ContactPoint, telephone: "+447593121621", contactType: "customer service", areaServed: "GB", availableLanguage: "en"}]` — Google's Organization rich card uses this. |
| P3 | Form has Turnstile + email — no structured-data implication. |

---

## Cross-Page / Graph Consistency

| Sev | Finding |
|---|---|
| P0 | None. All `@id` references resolve, all required properties present, all JSON parses. |
| P1 | The `Article` on blog/project pages does not reference the `BreadcrumbList` (no `breadcrumb` property). Add `"breadcrumb": {"@id": "<url>#breadcrumb"}` and give each BreadcrumbList an `@id` for cross-linking. |
| P2 | `LandscapingBusiness` is duplicated as a full node (with all 21 sub-nodes) on every page. Once the entity is referenced via `@id`, downstream pages only need a stub (`{@id: ".../#business"}`). Current setup adds ~6 KB of JSON-LD per page. Not a ranking issue, but a performance/clarity one. **Recommended:** keep the full node only on `/` and `/about`; emit a stub elsewhere. |
| P2 | `WebSite` node lacks `potentialAction` `SearchAction`. If site search exists, add Sitelinks Searchbox markup. (You don't currently have on-site search — skip.) |
| P3 | `inLanguage: "en-GB"` is set on `Article` but not on `WebSite` / `WebPage` — add for consistency. |

---

## Missing Schema Opportunities

| Priority | Type | Where | Why |
|---|---|---|---|
| P1 | `Offer` / `PriceSpecification` | `/pricing`, `/services/landscaping`, `/areas/*` | Closes pricing/service rich-data gap |
| P1 | `ContactPoint` | `#business` node (global) | Required for Org knowledge-panel completeness |
| P2 | `ImageObject` (instead of URL strings) | `#business.logo`, `#business.image`, `Article.image[]` | Google-recommended; enables better image rich results |
| P2 | `Service.hasOfferCatalog` | `/services` or `#business` | Lets you bundle all six services into one OfferCatalog |
| P2 | `Place` with `geo` per `/areas/*` | Already implicit via `City` + `GeoCircle` — could elevate to full `Place` |
| P3 | `VideoObject` | If any blog/project page embeds video | None detected in HTML sample — skip until you add video |
| P3 | `Event` | If you run open days / demos | Not applicable today |
| P3 | `Review` individual schemas | Already embedded inside `#business` block on `/` — good. Consider extracting top 3 to dedicated `/reviews` page with individual `Review` nodes. |
| P3 | `Project` (`@type: "CreativeWork"` subtype) | `/projects/*` — current `Article` is fine but `CreativeWork` + `about: {@id: "#service"}` would link the case study to the service offered |

---

## Recommended Fixes (Priority Order)

### Fix 1 — Merge duplicate `#business` nodes on `/` (P1)

Move the `review[]` array from block 4 into block 0; delete block 4 entirely. Result: one canonical node per `@id`.

### Fix 2 — Add `Offer` to landscaping + per-area Services (P1)

Example for `/services/landscaping`:

```json
"offers": {
  "@type": "Offer",
  "priceCurrency": "GBP",
  "priceSpecification": {
    "@type": "PriceSpecification",
    "priceCurrency": "GBP",
    "minPrice": "1500",
    "maxPrice": "2500",
    "description": "Full landscaping projects (gravel garden, planting, patio) typically £1,500–£2,500 over 2–3 days."
  },
  "availability": "https://schema.org/InStock",
  "areaServed": {"@type": "AdministrativeArea", "name": "Cornwall"}
}
```

### Fix 3 — Add pricing schema to `/pricing` (P1)

Wrap the 6 services in an `OfferCatalog`:

```json
{
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "Quilliams Gardening Service Pricing",
  "itemListElement": [
    {"@type": "Offer", "itemOffered": {"@id": "https://quilliamsmowing.co.uk/services/lawn-care#service"}, "priceCurrency": "GBP", "priceSpecification": {"@type":"PriceSpecification","minPrice":"20","maxPrice":"50"}},
    {"@type": "Offer", "itemOffered": {"@id": "https://quilliamsmowing.co.uk/services/landscaping#service"}, "priceCurrency": "GBP", "priceSpecification": {"@type":"PriceSpecification","minPrice":"1500","maxPrice":"2500"}}
    // ...etc for hedge-trimming, garden-maintenance, mulching, seasonal-cleanup
  ]
}
```

### Fix 4 — Add `ContactPoint` to `#business` (P1)

```json
"contactPoint": [{
  "@type": "ContactPoint",
  "telephone": "+447593121621",
  "email": "levi@quilliamsmowing.co.uk",
  "contactType": "customer service",
  "areaServed": "GB",
  "availableLanguage": "en"
}]
```

### Fix 5 — Promote `logo`/`image` to `ImageObject` (P2)

```json
"logo": {
  "@type": "ImageObject",
  "url": "https://quilliamsmowing.co.uk/images/uploads/site/branding/logoFile.webp",
  "width": 512,
  "height": 512
},
"image": {
  "@type": "ImageObject",
  "url": "https://quilliamsmowing.co.uk/images/uploads/site/branding/logoFile.webp",
  "width": 1200,
  "height": 630
}
```

### Fix 6 — Enrich per-area `Service` nodes (P1)

Add `description`, `image`, and `offers`:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://quilliamsmowing.co.uk/areas/truro#service",
  "name": "Gardening Services in Truro",
  "description": "Lawn care, hedge trimming and garden maintenance across Truro and the surrounding villages. Fortnightly visits, fixed quotes, fully insured.",
  "image": "https://quilliamsmowing.co.uk/images/uploads/areas/truro/hero.webp",
  "serviceType": "Gardening",
  "provider": {"@id": "https://quilliamsmowing.co.uk/#business"},
  "url": "https://quilliamsmowing.co.uk/areas/truro",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "GBP",
    "priceSpecification": {"@type":"PriceSpecification","minPrice":"30","maxPrice":"80","description":"Typical visit £30–£80 depending on garden size."}
  },
  "areaServed": [
    {"@type":"City","name":"Truro","containedInPlace":{"@type":"AdministrativeArea","name":"Cornwall"}},
    {"@type":"GeoCircle","geoMidpoint":{"@type":"GeoCoordinates","latitude":"50.26320","longitude":"-5.05100"},"geoRadius":"15000","unitCode":"MTR"}
  ]
}
```

### Fix 7 — Add `BreadcrumbList` to `/` (P1)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://quilliamsmowing.co.uk/#breadcrumb",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"Home","item":"https://quilliamsmowing.co.uk/"}
  ]
}
```

### Fix 8 — Resolve `Offer.price` vs `priceSpecification` conflict on lawn-care (P1)

Remove the top-level `"price": "20"` and let `priceSpecification` carry the full range.

### Fix 9 — Add `breadcrumb` reference to `Article` (P2)

```json
"breadcrumb": {"@id": "https://quilliamsmowing.co.uk/blog/best-gardeners-newquay#breadcrumb"}
```
And add `"@id": "<url>#breadcrumb"` to each `BreadcrumbList`.

### Fix 10 — Consider lowering `AggregateRating.ratingValue` from 5.0 to 4.9 (P2)

16/16 perfect scores trigger Google's review-quality heuristics. If a single 4-star review exists in source data, reflect it; if not, keeping 5.0 with 16 reviews is technically truthful but optically risky.

---

## Score Breakdown

| Category | Score |
|---|---|
| JSON validity | 10/10 |
| Required properties present | 10/10 |
| Recommended properties present | 7/10 (image as ImageObject, ContactPoint, Offer on landscaping/pricing missing) |
| Entity graph consistency | 8/10 (duplicate #business on /, no breadcrumb refs on Article) |
| AggregateRating attachment | 10/10 (correctly nested in LocalBusiness) |
| ImageObject usage | 6/10 (most images are URL strings) |
| Date formats (ISO 8601) | 10/10 |
| Geo coordinates | 9/10 (precision good; unitCode missing on GeoCircle) |
| Coverage of opportunities | 8/10 (no pricing schema on /pricing, no per-area Offer) |
| Deprecation hygiene | 10/10 (no HowTo, no SpecialAnnouncement, no LearningVideo) |
| **Total** | **88 / 100** |

---

## Files Referenced

- Audit HTML cache: `/tmp/qm-audit/*.html`
- Parsed JSON-LD: `/tmp/qm-audit/all_jsonld.json`
- This report: `/Users/levi/repos/personal/Quilliams-Mowing/docs/seo-runs/quilliamsmowing-co-uk-audit-20260526-192524/SCHEMA.md`

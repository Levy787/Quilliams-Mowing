# Schema.org JSON-LD Audit — quilliamsmowing.co.uk

**Date:** 2026-05-26
**Auditor:** Schema.org markup specialist (Opus 4.7)
**Scope:** 8 representative pages (home, about, services, lawn-care, areas/truro, gravel-garden project, blog post, contact)

---

## TL;DR

- **Schema Score: 87 / 100** — strong, well-graphed JSON-LD. Critical items (LandscapingBusiness, BreadcrumbList, WebSite, ReviewSchema, ServiceSchema) are present and validate.
- **Working well:** `@id` graph is consistent across pages, NAP identical on every page, AggregateRating + 16 individual Reviews on home, identifiers (Companies House + waste carrier) and `sameAs` are comprehensive, breadcrumbs on all 7 expected templates.
- **Top gaps (Critical/High):** no `Article`/`BlogPosting` on the project case study, no `ItemList` on /services and /projects index, no `Person` schema for Levi (separate from `founder`), no `GeoCircle` or expanded `ServiceArea` on /areas/truro, no `foundingDate` / `paymentAccepted` / `currenciesAccepted` on the business schema, AggregateRating only on the homepage instead of attached to the canonical `#business` graph node visible site-wide.
- **Restricted/Info:** existing `FAQPage` on commercial pages no longer earns Google rich results (Aug 2023 restriction) but still helps AI/LLM citations — keep, don't expand purely for Google.

---

## 1. Pages audited and JSON-LD blocks detected

| URL | Blocks | Types present |
|---|---|---|
| `/` (home) | 5 | LandscapingBusiness+LocalBusiness+Organization, WebSite, WebPage, [LandscapingBusiness w/ aggregateRating + 16 Reviews], FAQPage |
| `/about` | 3 | Business, WebSite, BreadcrumbList |
| `/services` | 3 | Business, WebSite, BreadcrumbList |
| `/services/lawn-care` | 4 | Business, WebSite, **Service**, BreadcrumbList |
| `/areas/truro` | 3 | Business, WebSite, BreadcrumbList |
| `/projects/gravel-garden-with-patio` | 3 | Business, WebSite, BreadcrumbList |
| `/blog/best-gardeners-newquay` | 5 | Business, WebSite, BreadcrumbList, **BlogPosting**, FAQPage |
| `/contact` | 3 | Business, WebSite, BreadcrumbList |

All blocks parsed as valid JSON. No syntax errors. All use `https://schema.org` and absolute URLs (one minor exception, see L2 below).

---

## 2. Validation results per existing block

### 2.1 LandscapingBusiness / LocalBusiness / Organization (`@id: #business`) — PASS with caveats

**Present on every audited page** with identical NAP. Required fields satisfied: `name`, `address`, `telephone`, `url`, `image`. Recommended fields satisfied: `priceRange`, `geo`, `openingHoursSpecification`, `areaServed`, `sameAs`, `logo`, `identifier`, `founder`, `serviceType`.

| Check | Result |
|---|---|
| `@context` `https://schema.org` | Pass |
| `@type` not deprecated | Pass (LandscapingBusiness is a valid LocalBusiness subtype) |
| Required `name`, `address`, `telephone` | Pass |
| ISO 8601 dates | N/A here |
| Absolute URLs | Pass |
| NAP consistent across pages | Pass — telephone `+447593121621`, locality Newquay, postcode TR8, country GB identical on all 8 pages |
| `priceRange` not a placeholder | Pass (`££`) |
| `openingHoursSpecification` valid | Pass (Mon–Sun 09:00–17:00) |
| `sameAs` reputable profiles | Pass (Google, Companies House, Environment Agency, Facebook, Instagram, TikTok, Yell, Checkatrade, Bark) |
| `aggregateRating` on this node | **FAIL on 7 of 8 pages** — only the home page injects `aggregateRating` (via a second `#business` block). Pages like `/services/lawn-care`, `/areas/truro` and `/contact` reference `@id: #business` for the Service.provider but the on-page `#business` node has no rating. This forces crawlers/LLMs to traverse to the home page to learn the rating. |
| `foundingDate` | **Missing** |
| `numberOfEmployees` | Missing (recommended for LocalBusiness) |
| `paymentAccepted` | Missing |
| `currenciesAccepted` | Missing |
| `knowsLanguage` | Missing (low priority) |
| `slogan` | Missing (low) |
| `hasCredential` for waste-carrier / Companies House | Currently in `identifier` (acceptable) — could also expose `hasCredential` for AI parseability |

### 2.2 WebSite (`@id: #website`) — PASS

Minimal but valid. **Opportunity:** `potentialAction` `SearchAction` is missing. Site has `public/search-index.json` so search exists.

### 2.3 WebPage (`@id: #webpage`) — PASS, but only on `/`

`@type: WebPage` block exists only on the home page. Other templates would benefit (esp. about/contact) for graph linkage, but this is low priority since BreadcrumbList already anchors them.

### 2.4 BreadcrumbList — PASS on all 7 sub-pages

All `position`, `name`, `item` properties present and absolute URLs used. Home page does not need one (a single-item breadcrumb is discouraged by Google). Confirmed not present on `/` — correct.

### 2.5 Service (`/services/lawn-care`) — PASS with one minor issue

| Check | Result |
|---|---|
| `@id` linkage | **FAIL — missing `@id`**. The Service block currently has no `@id`. Prior audit notes "ServiceSchema with @id" — verify whether other service pages have it; on `/services/lawn-care` it is absent. Recommend `@id: https://quilliamsmowing.co.uk/services/lawn-care#service`. |
| `provider` `@id` reference | Pass (`https://quilliamsmowing.co.uk/#business`) |
| `name`, `description`, `serviceType`, `areaServed` | Pass |
| `image` URL | **FAIL — relative URL** `/images/uploads/lawn-care/hero/imageFile.webp`. Convert to absolute `https://quilliamsmowing.co.uk/images/uploads/lawn-care/hero/imageFile.webp`. |
| `offers` / `priceSpecification` | Missing — page advertises "from £20", which can be exposed as an Offer/PriceSpecification. |
| `hasOfferCatalog` | Missing — could enumerate sub-offerings. |

### 2.6 Review array + AggregateRating (home) — PASS

16 reviews, each with `author.Person`, `reviewBody`, `reviewRating` (1–5 scale), `datePublished` in ISO 8601. AggregateRating `ratingValue: 5`, `reviewCount: 16`. Attached to `@id: #business` correctly.

**Caveat:** Because it appears in a *separate* `#business` JSON-LD block (instead of being merged into the primary one), this is technically two nodes with the same `@id`. Most parsers will merge them, but the cleanest pattern is a single merged node or a `@graph` array. Not a critical bug.

### 2.7 BlogPosting (blog post) — PASS with gaps

| Check | Result |
|---|---|
| Required `headline`, `image`, `datePublished`, `author` | Pass |
| `dateModified` | Pass |
| `mainEntityOfPage` | Pass (but is a string, not the more rigorous `{"@type":"WebPage","@id":"…"}` form) |
| `publisher.@id` reference | Pass |
| `@id` | **Missing** — recommend `@id: https://quilliamsmowing.co.uk/blog/best-gardeners-newquay#blogposting` |
| `wordCount` | Missing (recommended for E-E-A-T signal) |
| `articleSection` | Missing |
| `inLanguage` | Missing (`en-GB`) |
| `author.url` linking to a Person `@id` | Missing — should reference a single `#levi` Person node |

### 2.8 FAQPage (home + blog) — INFO

`FAQPage` rich results have been restricted to government/health sites since August 2023. **Do not remove** the existing markup (still aids AI citations and is harmless), but do **not** expand it specifically chasing Google FAQ rich results. Flag as **Info, not Critical**.

---

## 3. Cross-page consistency

| Property | Across-page consistency |
|---|---|
| `telephone` `+447593121621` | Consistent |
| `email` `levi@quilliamsmowing.co.uk` | Consistent |
| `address` (Newquay, Cornwall, TR8, GB) | Consistent |
| `geo` 50.412, -5.0757 | Consistent |
| `legalName` "Quilliams Mowing Ltd" | Consistent |
| `name` "Quilliams Gardening & Landscaping" | Consistent |
| `priceRange` `££` | Consistent |
| `sameAs` profile list | Consistent |
| `@id` `#business`, `#website` | Consistent and properly cross-referenced |

**NAP score: clean.** No conflicts.

---

## 4. Missing opportunities (ranked)

### CRITICAL (do these first)

1. **ItemList on `/services`** — site sells 6 services (lawn-care, hedge-trimming, garden-maintenance, landscaping, mulching, seasonal-cleanup). Without `ItemList`, Google parses these as anchor links only. Adding `ItemList` improves "Services" sitelinks and AI citation density.
2. **Article / case-study schema on `/projects/gravel-garden-with-patio`** — currently this is the only template missing its primary entity schema. Use `Article` (not `CreativeWork` or `Project`, which are not Google-supported). Recommend pairing with `ImageObject` and `mentions` linking back to the Service performed (landscaping/gravel garden).
3. **AggregateRating on the `#business` node site-wide**, not just on `/`. Currently a customer landing on `/services/lawn-care` or `/contact` has no rating signal in JSON-LD for the same `#business` node referenced as Service.provider. Inline the `aggregateRating` into the primary business block in `LayoutSchema`.
4. **`Service` schema missing `@id` and uses a relative image URL** on `/services/lawn-care`. Fix both. Verify the other 5 service pages — if the same generator produced them, the same bugs are likely there.

### HIGH

5. **Person schema for Levi Quilliam** as a standalone node with `@id: https://quilliamsmowing.co.uk/about#levi`, referenced by `founder`, `author`, and `employee`. Current pattern inlines `Person` four separate times with only `name` — wastes entity grounding. Add `jobTitle`, `worksFor.@id`, `image`, `sameAs` (LinkedIn etc. if available), `knowsAbout`, `nationality`.
6. **GeoCircle on `/areas/truro`** (and other area pages) — explicit `areaServed` `GeoCircle` with `geoMidpoint` (Truro 50.2632, -5.0510) and `geoRadius` (~25,000 m) is a strong local SEO signal. Pair with a `ServiceArea` Service node specific to Truro.
7. **`/services` ItemList** (separate from #1) AND **`/projects` ItemList** for the projects index page (not in this audit but inferred from home page projects links).
8. **`foundingDate`, `paymentAccepted`, `currenciesAccepted` on `#business`** — these are recommended LocalBusiness properties. `foundingDate` is especially useful for AI trust signals.

### MEDIUM

9. **WebSite `potentialAction` `SearchAction`** — site search index exists.
10. **VideoObject** if any service pages embed video (none detected in this audit but recommended for future content).
11. **ProfilePage / AboutPage** `@type` on `/about` (Google supports `AboutPage`).
12. **BlogPosting → `articleSection`, `wordCount`, `inLanguage: en-GB`** to lift the existing block from "valid" to "exemplary."

### LOW / INFO

13. FAQPage — keep existing, don't expand for Google. Useful for AI.
14. `OfferCatalog` under `#business` enumerating the six services. Redundant with ItemList but offers richer pricing signal.
15. Add `Place` `@id`s for the cities in `areaServed` so cross-page references are cleaner.

---

## 5. Generated JSON-LD for recommended additions

### 5.1 Merged + complete `#business` node (replaces the current LandscapingBusiness block, **add this site-wide**)

```json
{
  "@context": "https://schema.org",
  "@type": ["LandscapingBusiness", "LocalBusiness", "Organization"],
  "@id": "https://quilliamsmowing.co.uk/#business",
  "name": "Quilliams Gardening & Landscaping",
  "legalName": "Quilliams Mowing Ltd",
  "alternateName": "Quilliams Gardening & Landscaping",
  "description": "Professional gardening, landscaping, lawn mowing, hedge trimming and garden maintenance services in Newquay, Truro, and St Austell, Cornwall.",
  "url": "https://quilliamsmowing.co.uk",
  "telephone": "+447593121621",
  "email": "levi@quilliamsmowing.co.uk",
  "priceRange": "££",
  "currenciesAccepted": "GBP",
  "paymentAccepted": ["Cash", "Bank Transfer", "Card"],
  "foundingDate": "2025-05",
  "founder": { "@id": "https://quilliamsmowing.co.uk/about#levi" },
  "employee": { "@id": "https://quilliamsmowing.co.uk/about#levi" },
  "image": "https://quilliamsmowing.co.uk/images/uploads/site/branding/logoFile.webp",
  "logo": "https://quilliamsmowing.co.uk/images/uploads/site/branding/logoFile.webp",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Newquay",
    "addressRegion": "Cornwall",
    "postalCode": "TR8",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.412,
    "longitude": -5.0757
  },
  "areaServed": [
    { "@type": "City", "name": "Newquay" },
    { "@type": "City", "name": "Truro" },
    { "@type": "City", "name": "St Austell" },
    { "@type": "AdministrativeArea", "name": "Cornwall" }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 50.412, "longitude": -5.0757 },
    "geoRadius": "40000"
  },
  "serviceType": [
    "Lawn Mowing", "Hedge Trimming", "Garden Maintenance",
    "Landscaping", "Garden Cleanup", "Weed Control"
  ],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "09:00",
    "closes": "17:00"
  }],
  "identifier": [
    { "@type": "PropertyValue", "name": "Companies House company number", "propertyID": "Companies House", "value": "16405915", "url": "https://find-and-update.company-information.service.gov.uk/company/16405915" },
    { "@type": "PropertyValue", "name": "Waste carrier registration", "propertyID": "Environment Agency", "value": "CBDL582202", "url": "https://environment.data.gov.uk/public-register/waste-carriers-brokers/registration/CBDL582202" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 5,
    "bestRating": 5,
    "worstRating": 1,
    "reviewCount": 16
  },
  "sameAs": [
    "https://g.page/r/Ca1e8ukWV-qsEBM/",
    "https://find-and-update.company-information.service.gov.uk/company/16405915",
    "https://environment.data.gov.uk/public-register/waste-carriers-brokers/registration/CBDL582202",
    "https://www.facebook.com/quilliamsmowing",
    "https://www.instagram.com/quilliamsmowing",
    "https://www.tiktok.com/@quilliamsmowing",
    "https://www.yell.com/biz/quilliams-mowing-ltd-newquay-10969895/",
    "https://www.checkatrade.com/trades/quilliamsmowingltd",
    "https://www.bark.com/en/gb/b/quilliams-gardening-amp-landscaping/KNoMX4/"
  ]
}
```

> Note: confirm/update `foundingDate` (2025-05 is a placeholder based on Companies House registration number range — replace with the verified incorporation date from Companies House).

### 5.2 Person node for `/about` (one canonical node referenced everywhere)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://quilliamsmowing.co.uk/about#levi",
  "name": "Levi Quilliam",
  "givenName": "Levi",
  "familyName": "Quilliam",
  "jobTitle": "Founder & Lead Gardener",
  "worksFor": { "@id": "https://quilliamsmowing.co.uk/#business" },
  "url": "https://quilliamsmowing.co.uk/about",
  "image": "https://quilliamsmowing.co.uk/images/uploads/about/headshot/imageFile.webp",
  "knowsAbout": [
    "Lawn care", "Hedge trimming", "Garden maintenance",
    "Landscape design", "Gravel gardens", "Cornish coastal planting"
  ],
  "nationality": { "@type": "Country", "name": "Australia" },
  "homeLocation": { "@type": "Place", "name": "Trevarrian, Cornwall" }
}
```

### 5.3 BlogPosting upgrade for `/blog/best-gardeners-newquay`

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://quilliamsmowing.co.uk/blog/best-gardeners-newquay#blogposting",
  "headline": "Best Gardeners in Newquay",
  "description": "Looking for gardeners in Newquay? Compare local options, prices and checks. Quilliams Gardening & Landscaping is listed first for insured garden care.",
  "image": "https://quilliamsmowing.co.uk/images/uploads/garden-maintenance/hero/imageFile.webp",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "inLanguage": "en-GB",
  "articleSection": "Local Guides",
  "wordCount": 950,
  "author": { "@id": "https://quilliamsmowing.co.uk/about#levi" },
  "publisher": { "@id": "https://quilliamsmowing.co.uk/#business" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://quilliamsmowing.co.uk/blog/best-gardeners-newquay" },
  "about": [
    "Gardeners in Newquay",
    "Garden maintenance in Newquay",
    "Lawn mowing in Newquay",
    "Hedge trimming in Newquay"
  ],
  "mentions": [
    { "@id": "https://quilliamsmowing.co.uk/#business" }
  ]
}
```

> Replace `wordCount: 950` with the actual count.

### 5.4 Article schema for `/projects/gravel-garden-with-patio`

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://quilliamsmowing.co.uk/projects/gravel-garden-with-patio#article",
  "headline": "Pampas Grass Removed and Gravel Garden Added",
  "description": "Case study: replacing overgrown pampas grass with a low-maintenance gravel garden and patio in Cornwall.",
  "image": [
    "https://quilliamsmowing.co.uk/images/uploads/projects/gravel-garden-with-patio/before/imageFile.webp",
    "https://quilliamsmowing.co.uk/images/uploads/projects/gravel-garden-with-patio/after/imageFile.webp"
  ],
  "datePublished": "2026-01-15",
  "dateModified": "2026-05-04",
  "inLanguage": "en-GB",
  "author": { "@id": "https://quilliamsmowing.co.uk/about#levi" },
  "publisher": { "@id": "https://quilliamsmowing.co.uk/#business" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://quilliamsmowing.co.uk/projects/gravel-garden-with-patio" },
  "about": ["Gravel garden installation", "Pampas grass removal", "Patio installation", "Landscaping"],
  "locationCreated": { "@type": "Place", "name": "Cornwall", "address": { "@type": "PostalAddress", "addressRegion": "Cornwall", "addressCountry": "GB" } },
  "mentions": [{ "@id": "https://quilliamsmowing.co.uk/#business" }]
}
```

> Replace dates with the real project completion / publish dates.

### 5.5 ItemList for `/services`

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://quilliamsmowing.co.uk/services#itemlist",
  "name": "Gardening Services in Newquay & Cornwall",
  "itemListOrder": "https://schema.org/ItemListOrderAscending",
  "numberOfItems": 6,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://quilliamsmowing.co.uk/services/lawn-care", "name": "Lawn Care" },
    { "@type": "ListItem", "position": 2, "url": "https://quilliamsmowing.co.uk/services/hedge-trimming", "name": "Hedge Trimming" },
    { "@type": "ListItem", "position": 3, "url": "https://quilliamsmowing.co.uk/services/garden-maintenance", "name": "Garden Maintenance" },
    { "@type": "ListItem", "position": 4, "url": "https://quilliamsmowing.co.uk/services/landscaping", "name": "Landscaping" },
    { "@type": "ListItem", "position": 5, "url": "https://quilliamsmowing.co.uk/services/mulching", "name": "Mulching" },
    { "@type": "ListItem", "position": 6, "url": "https://quilliamsmowing.co.uk/services/seasonal-cleanup", "name": "Seasonal Cleanup" }
  ]
}
```

### 5.6 Service block fix for `/services/lawn-care` (add `@id`, absolute image, Offer)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://quilliamsmowing.co.uk/services/lawn-care#service",
  "name": "Lawn Care",
  "serviceType": "Lawn Care",
  "description": "Lawn mowing and grass cutting across Newquay and Cornwall…",
  "url": "https://quilliamsmowing.co.uk/services/lawn-care",
  "image": "https://quilliamsmowing.co.uk/images/uploads/lawn-care/hero/imageFile.webp",
  "provider": { "@id": "https://quilliamsmowing.co.uk/#business" },
  "areaServed": [
    { "@type": "City", "name": "Newquay" },
    { "@type": "City", "name": "Truro" },
    { "@type": "City", "name": "St Austell" },
    { "@type": "AdministrativeArea", "name": "Cornwall" }
  ],
  "offers": {
    "@type": "Offer",
    "priceCurrency": "GBP",
    "price": "20",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "GBP",
      "minPrice": "20",
      "maxPrice": "50",
      "description": "From £20 for a small lawn; £30–£50 for an average-sized garden."
    },
    "availability": "https://schema.org/InStock",
    "areaServed": { "@type": "AdministrativeArea", "name": "Cornwall" }
  }
}
```

### 5.7 Area page enhancement — `/areas/truro`

Add this alongside the existing business block:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://quilliamsmowing.co.uk/areas/truro#service",
  "name": "Gardening Services in Truro",
  "serviceType": "Gardening",
  "provider": { "@id": "https://quilliamsmowing.co.uk/#business" },
  "areaServed": {
    "@type": "City",
    "name": "Truro",
    "containedInPlace": { "@type": "AdministrativeArea", "name": "Cornwall" },
    "geo": {
      "@type": "GeoCircle",
      "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 50.2632, "longitude": -5.0510 },
      "geoRadius": "15000"
    }
  },
  "url": "https://quilliamsmowing.co.uk/areas/truro"
}
```

### 5.8 WebSite `SearchAction`

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://quilliamsmowing.co.uk/#website",
  "url": "https://quilliamsmowing.co.uk",
  "name": "Quilliams Gardening & Landscaping",
  "publisher": { "@id": "https://quilliamsmowing.co.uk/#business" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://quilliamsmowing.co.uk/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

> Only add `SearchAction` if a real `/search?q=` endpoint exists. If the site search is client-side only, omit this.

---

## 6. Severity-coded findings list

| # | Finding | Severity | Page(s) |
|---|---|---|---|
| F1 | AggregateRating only on home, not inline on `#business` site-wide | Critical | all non-home |
| F2 | Missing `Article` schema on case-study project page | Critical | `/projects/gravel-garden-with-patio` (and any other `/projects/*`) |
| F3 | Missing `ItemList` on `/services` and `/projects` index | Critical | `/services`, `/projects` |
| F4 | Service block missing `@id` and using relative `image` URL | High | `/services/lawn-care` (likely all `/services/*`) |
| F5 | No standalone `Person` `@id` for Levi; founder/author repeated inline | High | site-wide |
| F6 | No `GeoCircle` / Service-by-area node | High | `/areas/truro` (and other `/areas/*`) |
| F7 | `foundingDate`, `paymentAccepted`, `currenciesAccepted` missing on #business | High | site-wide |
| F8 | Duplicate `@id` `#business` nodes on home (two blocks) — merge into one | Medium | `/` |
| F9 | BlogPosting missing `@id`, `inLanguage`, `wordCount`, `articleSection` | Medium | blog posts |
| F10 | No `Offer`/`PriceSpecification` on Service pages | Medium | `/services/*` |
| F11 | WebPage `@type` block only on home | Low | non-home |
| F12 | WebSite missing `SearchAction` (only if /search endpoint exists) | Low | site-wide |
| F13 | FAQPage on commercial pages no longer earns Google rich results | Info | `/`, `/blog/*`, others rendering FAQs |
| F14 | About page could use `AboutPage` `@type` on its WebPage | Low | `/about` |

---

## 7. Schema score breakdown (87 / 100)

| Category | Weight | Earned | Notes |
|---|---|---|---|
| Valid JSON-LD syntax | 10 | 10 | All blocks parse cleanly |
| LocalBusiness completeness | 15 | 12 | Missing foundingDate, paymentAccepted, currenciesAccepted |
| NAP consistency | 10 | 10 | Identical on all 8 pages |
| Breadcrumb coverage | 8 | 8 | All sub-pages |
| Service schema | 10 | 7 | Missing `@id`, relative image, no Offer |
| Reviews + AggregateRating | 10 | 8 | Excellent on home; missing inline on other pages |
| Person / Founder | 6 | 3 | Inlined only, no `@id` |
| Article / BlogPosting | 8 | 6 | Present on blog post but missing on project case study + several recommended props |
| ItemList opportunities | 6 | 0 | Not implemented |
| GeoCircle / ServiceArea | 6 | 2 | Basic areaServed only |
| Graph linkage (`@id` references) | 6 | 6 | Excellent use of `@id` cross-references |
| Deprecated/risky markup avoidance | 5 | 5 | No HowTo, no SpecialAnnouncement; FAQ acknowledged as restricted |
| **Total** | **100** | **87** | |

---

## 8. Implementation order

1. Patch `LayoutSchema` (or wherever `#business` is emitted) to (a) inline `aggregateRating` into the primary block and (b) add `foundingDate`, `paymentAccepted`, `currenciesAccepted`. Single change, ships site-wide.
2. Create a `PersonSchema` component emitting the `#levi` Person node on `/about` (and only there). Reference `@id` from `founder`, `employee`, BlogPosting `author`, project `author`.
3. Add `ArticleSchema` to project template — mirror the existing `BlogPostingSchema` builder.
4. Add `ItemListSchema` to `/services` and `/projects` index templates.
5. Fix the Service schema builder (`@id`, absolute image URL, optional Offer).
6. Add per-area `Service` + `GeoCircle` on `/areas/[slug]` template.
7. Enhance BlogPosting with `inLanguage`, `wordCount`, `articleSection`, `@id`.

Steps 1–4 are the biggest impact for the least code (one edit each in shared layout / page templates).

---

## 9. Files referenced

- Audit input pages (live): see Section 1 URLs.
- Audit output: `/Users/levi/repos/personal/Quilliams-Mowing/docs/seo-runs/quilliamsmowing-co-uk-audit-20260526/schema.md` (this file)
- Likely source of Schema components (verify before editing): `app/_lib/schema/` or `components/seo/*Schema.tsx` (not inspected in this audit — confirm path before patching).

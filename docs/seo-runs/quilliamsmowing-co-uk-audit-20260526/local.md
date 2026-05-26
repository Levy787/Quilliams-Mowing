# Local SEO Audit — quilliamsmowing.co.uk

- Date: 2026-05-26
- Auditor: Local SEO specialist (agent)
- Scope: NAP consistency, area pages, schema, GBP signals, reviews, citations, Cornwall-specific local factors, mobile UX, click-to-call
- Business type detected: **Hybrid local-service business** (declared home base in Trevarrian near Newquay; multi-town service coverage across Cornwall)
- Industry vertical: **Home services — gardening / landscaping** (correct schema subtype `LandscapingBusiness` in use)

## Headline score

**Local SEO score: 84 / 100**

| Dimension | Weight | Score (0-100) | Weighted |
|-----------|-------:|--------------:|---------:|
| GBP signals | 25% | 82 | 20.5 |
| Reviews & reputation | 20% | 90 | 18.0 |
| Local on-page SEO | 20% | 86 | 17.2 |
| NAP consistency & citations | 15% | 88 | 13.2 |
| Local schema markup | 10% | 90 | 9.0 |
| Local link & authority signals | 10% | 60 | 6.0 |
| **Total** | **100%** | | **83.9** |

Cornwall solo-operator gardener is performing well above the typical SAB benchmark. The biggest single uplift opportunity is in **citation & directory authority** (Tier 1 UK coverage is partial) and **adding photos plus more named testimonials to the area pages**.

## What is verified and still present

All previously remediated items confirmed live as of this audit:

- Email `levi@quilliamsmowing.co.uk` is consolidated across home, about, contact, area pages, and schema. No legacy address found.
- GBP URL `https://g.page/r/Ca1e8ukWV-qsEBM/` is used consistently (home, about, contact, and area pages) and is present in `sameAs`. (See note below on the EAE vs EBM variant.)
- `sameAs` block in homepage JSON-LD includes Yell, Checkatrade, Bark, TikTok, Facebook, Instagram, Companies House, and Environment Agency waste-carrier registry.
- Opening hours: Mon-Sun 09:00-17:00, single OpeningHoursSpecification covering all days. Consistent across schema and visible page text.
- No broken nearby-area references detected in sitemap (`/areas/*` contains exactly the 9 declared towns) or homepage.

### GBP URL variant note (informational, not a defect)

User reference cited `Ca1e8ukWV-qsEAE` as the verified GBP short URL. The site currently uses `Ca1e8ukWV-qsEBM`. Both URLs follow redirects to the same Google Maps place data signature (`0xacea5716e9f25ead`), so both resolve to the same business profile. This is Google's standard behaviour where short URLs may be regenerated. The deployed `EBM` variant is fine. No action needed unless you want to standardise on `EAE`.

## 1. NAP consistency audit

Phone, email and brand name are tightly consistent. Address is declared at locality granularity only (no street address, which is normal and correct for an SAB/hybrid home-based business).

| Source | Name | Locality | Region | Postcode | Phone | Email |
|---|---|---|---|---|---|---|
| Homepage visible | Quilliams Gardening & Landscaping | Trevarrian, Cornwall | Cornwall | (not shown) | 07593 121 621 | levi@quilliamsmowing.co.uk |
| Homepage JSON-LD | Quilliams Gardening & Landscaping (legalName: Quilliams Mowing Ltd) | Newquay | Cornwall | TR8 | +447593121621 | levi@quilliamsmowing.co.uk |
| /contact visible | Quilliams Gardening & Landscaping | Trevarrian, Cornwall | Cornwall | (not shown) | 07593 121 621 | levi@quilliamsmowing.co.uk |
| /about visible | Quilliams Gardening & Landscaping | Trevarrian, near Newquay, Cornwall | Cornwall | (not shown) | 07593 121 621 | levi@quilliamsmowing.co.uk |
| Footer (all pages) | Quilliams Gardening & Landscaping | Trevarrian, Cornwall | Cornwall | (not shown) | 07593 121 621 | levi@quilliamsmowing.co.uk |
| Schema across pages | identical | Newquay | Cornwall | TR8 | +447593121621 | levi@quilliamsmowing.co.uk |

Findings:

- **No NAP discrepancy of any consequence.** The visible "Trevarrian" vs schema `addressLocality: Newquay` is acceptable because Trevarrian is a hamlet within the Newquay TR8 postal area; "Trevarrian near Newquay" on the about page reconciles the two for readers. Google's place clustering will treat these as the same locality.
- Phone presented as `07593 121 621` (national, spaced) for humans and `+447593121621` (E.164) in schema. Correct dual-format pattern.
- Single brand string used in `name` everywhere. `legalName: Quilliams Mowing Ltd` distinct, in schema only — correct.

Severity: **Low** (one minor item below).

## 2. Click-to-call phone links

Click-to-call works on every page but the **contact page contains a malformed tel: href with spaces**.

| Page | tel: href values found |
|---|---|
| Homepage | `tel:07593121621` |
| About | `tel:07593121621`, `tel:+447593121621` |
| Contact | `tel:07593121621`, `tel:+447593 121 621` |
| All /areas/* | `tel:07593121621` |

The `tel:+447593 121 621` (with spaces) on /contact is technically against RFC 3966. Most iOS and Android dialers strip the spaces, but some in-app browsers and accessibility tools refuse to register it as a tel: scheme. Fix to `tel:+447593121621`.

Severity: **Low**.

Recommended improvement (not a defect): switch all human-visible tel links to the E.164 form `tel:+447593121621`. National `07...` works for UK-only visitors, but `+44` is universal and Google interprets it more reliably for click-to-call attribution.

## 3. Service area coverage

Clearly stated. The FAQ schema includes the question "What areas do you cover?" with the answer naming Trevarrian as base plus Truro, St Austell, Bodmin, Padstow, Perranporth, and St Ives. Homepage prose says "We cover Newquay and nearby areas." Schema `areaServed` lists four cities (Newquay, Truro, St Austell, Cornwall).

Gap: **`areaServed` in JSON-LD is shorter than the actual page-coverage and FAQ statement.** The site has nine area pages (Truro, St Austell, Bodmin, Padstow, Perranporth, St Ives, Newquay, Wadebridge, St Agnes) but only four cities are in schema.

Severity: **Medium** — fixing this is a low-effort, high-leverage signal for AI search and rich-result alignment.

## 4. Area pages — uniqueness audit

All nine pages are in `sitemap.xml` and the internal `/site-map`. None are doorway pages — each contains genuinely Cornwall-specific local content. Below is the per-page assessment.

| Page | Word count | Unique landmarks / neighborhoods | Named testimonial | Local proof depth | Verdict |
|---|---:|---|---|---|---|
| /areas/truro | ~1,150 | Lemon Street, Treliske, Langarth, Malpas, Kenwyn, Tregolls, Royal Cornwall Hospital | 1 (Matthew Wellington) | Soil, drainage, river valley microclimate | Strong |
| /areas/st-austell | ~1,100 | Eden Project, Carlyon Bay, Poltair, Holmbush, Bethel, Penwithick, Trewhiddle | 1 (Elizabeth Cawley) | China clay heritage, acid soils, Atlantic wind shelter | Strong |
| /areas/bodmin | ~1,050 | Bodmin Moor, Priory, Berrycoombe, Westheath, A30 corridor, Lanivet | 0 | Elevation, clay-loam, moor wind exposure | Strong content / **missing review** |
| /areas/padstow | ~720 | Camel Estuary, St Petroc's Church, Trevone, Trecerus, St Merryn | 0 | Salt-laden estuary winds, holiday-let language present | Strong but **shorter than peers** |
| /areas/perranporth | ~1,200 | Cligga Head, Droskyn Point, Bolingey, Goonhavern, Liskey Hill, Reen Cross, Penhallow | 0 | Holiday-let mentions, dune ecology, sandy soils | Strong content / **missing review** |
| /areas/st-ives | ~1,050 | Porthmeor, The Island, The Stennack, Barnoon, Fore Street, Downalong | 0 | Granite cottage microclimates, terraced gardens, subtropical plants | Strong content / **no holiday-let mention** |
| /areas/newquay | ~1,200 | Fistral, Towan Head, Trenance Valley, Pentire, Porth, Crantock, Trevarrian, Narrowcliff, Towan | 1 (James Perrin) | Heavy holiday-let / Airbnb language, salt-wind detail | Strong (hub town) |
| /areas/wadebridge | ~1,050 | Camel Trail, River Camel, Egloshayle, Sladesbridge, St Breock, Chapel Amble | 0 | Valley microclimate, alluvial vs upland soils, flood risk | Strong content / **missing review** |
| /areas/st-agnes | ~1,050 | Trevaunance Cove, Wheal Coates, Chapel Porth, Porthtowan, Churchtown, Peterville, Mithian, Mingoose | 0 | Mining heritage, granite bedrock, mining-spoil soils, salt-tolerant species | Strong content / **missing review** |

Doorway-page swap test (Whitespark / Sterling Sky method): can you swap two town names in any page and have the article still make sense? **No** — pages reference unique landmarks, soil types, microclimates and neighbourhood names that are non-interchangeable. The Padstow page survives the swap test in the holiday-let intro paragraph if its salt-spray plant list and St Petroc's reference were removed, but as written it passes.

Strengths:

- Each page goes well beyond a templated locality-swap. Truro discusses clay drainage and river valley microclimate; St Agnes discusses tin/copper mining spoil in topsoil; Padstow discusses holiday-let changeover scheduling; Perranporth discusses sandy dune soils and Atlantic exposure; St Ives discusses subtropical pockets behind granite walls. This is genuine local SME signal that AI search engines reward heavily (per Whitespark's 2026 weighting where "dedicated service pages" is the #1 local organic factor).
- Word count is consistently above 1,000 except Padstow.
- Internal linking from each area page back to the four core services and to sibling areas is present.

Weaknesses:

- **6 of 9 area pages have no named local testimonial.** The site has 16 reviews in homepage schema (15 of which display dates and are recent). At minimum, route reviews to the area page they came from (e.g. the James Perrin "Porth" review belongs on /areas/newquay — confirmed live there; do the same for the rest).
- **No photos on any area page** other than the company logo. Before/after garden images with descriptive alt text including the town name are one of the highest-leverage on-page additions for both organic local and AI visibility.
- Padstow page is shorter than peers (~720 words vs ~1,050 average) and missing postcode (PL28) and Rick Stein / Prideaux Place anchor terms searchers use.
- TR/PL postcode prefixes are absent on every area page. Adding "TR1, TR3 (Truro)" / "PL28 (Padstow)" / "PL31 (Bodmin)" etc. would lift hyperlocal query matching.
- St Ives page makes no holiday-let or second-home reference despite St Ives being arguably Cornwall's most short-let-saturated town. Add this — it is a known commercial query.
- Wadebridge omits the Royal Cornwall Showground (a useful seasonal anchor for landscaping queries around show season).

Severity for area pages overall: **Medium** — pages are strong, not broken, but leaving easy wins on the table.

## 5. Local schema validation

Schema present on every audited page (home, contact, about, all area pages tested) with three blocks: business, website, and either webpage or breadcrumb.

LandscapingBusiness schema audit:

| Property | Present | Notes |
|---|---|---|
| @type | Yes | `["LandscapingBusiness", "LocalBusiness", "Organization"]` — correct subtype |
| @id | Yes | Stable `#business` anchor used consistently across pages |
| name | Yes | Consistent |
| legalName | Yes | `Quilliams Mowing Ltd` |
| description | Yes | |
| url | Yes | |
| telephone | Yes | `+447593121621` (E.164) |
| email | Yes | |
| priceRange | Yes | `££` |
| founder | Yes | `Levi Quilliam` |
| identifier | Yes | Companies House 16405915 and Environment Agency CBDL582202 — excellent trust signal |
| image / logo | Yes | |
| address.addressLocality | Yes | Newquay |
| address.addressRegion | Yes | Cornwall |
| address.postalCode | Yes | TR8 |
| address.addressCountry | Yes | GB |
| **address.streetAddress** | **No** | Acceptable for a home-based SAB; do not add unless GBP also lists a street |
| geo.latitude | Yes | 50.412 (only 3 decimal places — see below) |
| geo.longitude | Yes | -5.0757 (4 decimal places) |
| openingHoursSpecification | Yes | All 7 days, 09:00-17:00 |
| areaServed | Partial | Only 4 cities; site actually serves 9 |
| serviceType | Yes | 6 services listed |
| aggregateRating | Yes (homepage only) | 5.0 from 16 reviews |
| review | Yes (homepage only) | 16 individual reviews with author, body, rating, datePublished |
| sameAs | Yes | 9 entries including Yell, Checkatrade, Bark, TikTok, Facebook, Instagram, Companies House, Environment Agency, GBP |

Defects / improvements:

- **Geo precision** — Google recommends 5 decimal places. Current: 50.412 / -5.0757. Tighten to e.g. 50.41200 / -5.07570 (or to a slightly more precise true coordinate). Severity: **Low**.
- **areaServed should list all 9 towns**, not just 4. This is the single most impactful schema change available. Severity: **Medium**.
- **`aggregateRating` and `review` only present on homepage.** Adding these to each area page (filtered to the relevant town if possible, otherwise the full set) is allowed by schema.org and boosts area-page rich-result eligibility. Severity: **Low-Medium**.
- Consider adding `hasMap` pointing to the GBP URL inside the LandscapingBusiness block. Severity: **Low**.
- Consider adding a `Service` schema graph per service URL (`/services/lawn-mowing`, etc.) with `areaServed` per service — increases AI-search citation odds (3 of top 5 AI-visibility factors are citation- and entity-related). Severity: **Low**.
- FAQ schema on homepage is well-formed with 6 Q&As, all locally framed. Good.

## 6. GBP signals on the website

| Signal | Status |
|---|---|
| GBP profile linked (`g.page/...`) | Yes — homepage, contact, about, area pages, schema sameAs |
| "View on Google Maps" CTA | Yes (contact page) |
| Maps iframe embed | **No** — only a tracking pixel iframe was detected, no Google Maps embed |
| Place name reference in copy | Yes (Newquay, Cornwall throughout) |
| Review widget / GBP reviews surfacing | Reviews displayed natively in HTML and JSON-LD; no live GBP widget |
| Photo evidence from GBP | No GBP-sourced photos detected on site |
| Posts indicator | None |

Recommendations:

- **Embed a Google Map iframe on /contact** (and ideally a static map image with a click-through on each area page). This is the single most missed GBP signal on the site. Severity: **Medium**.
- Consider a `Find us on Google` linked button using the standard Google "Profile of Google" branding on /about — small trust uplift.
- The site is consistent in not exposing a street address (correct for a home-based SAB). Keep it that way.

## 7. Review health

Excellent for a 2025-established business.

- **Aggregate**: 5.0 average from 16 reviews in schema (homepage), all 5-star.
- **Recency / velocity** (per `datePublished`):
  - 2025-06: 4 reviews
  - 2025-07: 2
  - 2025-08: 2
  - 2025-09: 2
  - 2025-10: 2
  - 2025-11: 3
  - 2025-12: 2
  - 2026 YTD: **0 reviews in the audit window (2026-01 through 2026-05)**

**Issue (per Sterling Sky's 18-day rule):** rankings can be penalised when a business has no new reviews for ~3 weeks. The site currently shows zero reviews from January 2026 onward — a five-month gap. This is the highest-severity finding in this audit if it reflects reality (vs. the site not having added new reviews to the page).

Severity: **High** if no real reviews have been collected. **Medium** if reviews exist on GBP but have not been mirrored to the site.

Actions:

1. Pull current count and any new reviews from the GBP dashboard. If new reviews exist on Google, mirror them in the site's homepage JSON-LD and on the relevant area page immediately.
2. Implement a review-velocity habit: send a one-line text or email asking for a Google review at the end of every paid job. Aim for ~2 reviews per month minimum to stay outside the velocity cliff.
3. Surface owner responses to reviews in the JSON-LD (`Review` allows a `comment` array or a `Review` -> `publisher`/`@type:Comment`). Even a one-sentence response per review measurably boosts AI-visibility weighting.

Review-content quality: real names, real specifics ("Porth", "meadow reset", "hedge cutting and lawn mowing"), good distribution of service type. Strong signal.

## 8. Citation presence (Tier 1 UK directories)

Citations declared in `sameAs`:

| Directory | Listed in sameAs | Notes |
|---|---|---|
| Google Business Profile | Yes | `g.page/r/Ca1e8ukWV-qsEBM/` |
| Yell.com | Yes | `yell.com/biz/quilliams-mowing-ltd-newquay-10969895/` |
| Checkatrade | Yes | `checkatrade.com/trades/quilliamsmowingltd` |
| Bark | Yes | `bark.com/en/gb/b/quilliams-gardening-amp-landscaping/KNoMX4/` |
| Companies House | Yes | Strong UK trust signal |
| Environment Agency (waste carrier) | Yes | Industry-specific trust signal |
| Facebook | Yes | |
| Instagram | Yes | |
| TikTok | Yes | |

Missing UK Tier 1 / vertical-relevant directories (recommended next adds):

- **Trustpilot** — primary UK review citation, often surfaced in Google's local pack for SAB queries.
- **Thomson Local** — declining but still indexed.
- **FreeIndex** — strong for UK trades.
- **Cylex UK** — common UK citation reference.
- **Scoot / Hotfrog UK** — secondary but easy.
- **MyBuilder** and **Rated People** — vertical-specific (UK trades). Either or both.
- **Houzz UK** — strong for landscaping/garden design vertical.
- **Visit Cornwall** trade partner listing (if available) — exceptional hyperlocal signal for a Cornwall SAB serving holiday-let owners.
- **Trade with Levi / local Cornwall business directories** — search "Cornwall gardener directory" and submit to the top 3 results.

This is the audit's biggest opportunity area. Hitting 6-8 additional aligned Tier 1 / trades / Cornwall-local citations would likely move the overall score from 84 to ~90.

Severity: **Medium-High** (high opportunity, low downside).

## 9. Cornwall-specific local factors (vertical depth check)

The site genuinely covers the Cornwall gardening context, which is critical for both ranking and conversion. Detected references:

- **Coastal microclimate / salt wind**: covered on Newquay, Padstow, Perranporth, St Ives, St Agnes, Truro (via comparison). Strong.
- **Soil**: clay-heavy soils (Truro, Wadebridge), china clay heritage (St Austell), sandy dune / coastal drainage (Perranporth, Padstow), granite bedrock and mining spoil (St Agnes), alluvial valley (Wadebridge), acid moorland (Bodmin). Excellent — this is genuine local SME content.
- **Holiday lets / second homes / Airbnb**: explicit on Newquay, Padstow, Perranporth. **Missing on St Ives** (the most short-let-saturated town in Cornwall — material gap). Worth referencing on Padstow trade with letting agents, which is already done.
- **Tourist season / changeover scheduling**: mentioned on Padstow, Perranporth, Newquay.
- **Mining heritage**: covered well on St Agnes.
- **Subtropical pockets**: covered on St Ives.
- **Year-round mowing in Cornwall's mild climate**: covered in homepage FAQ ("In Cornwall's mild coastal climate, lawns grow almost year-round, so most customers book fortnightly cuts from March to October, dropping to monthly over winter"). Good.

Missing or under-developed Cornwall-specific topics that would lift commercial searches:

- **Storm Eunice / Atlantic storm cleanup** — emerging commercial query in Cornwall every winter. Worth a dedicated blog post or section.
- **National Trust / heritage property** considerations (relevant near Lanhydrock, Trelissick, etc.) — even mentioning that you can work alongside heritage property guidance signals authority.
- **AONB / SSSI awareness** — Cornwall has extensive protected designations. A one-line mention that the business respects AONB and SSSI guidance ("no chemical treatments near SSSI boundaries") is a credibility flag for high-value clients.
- **DEFRA / pesticide certification status** for commercial / amenity weed control if applicable. If not relevant, ignore.

Severity: **Low-Medium**.

## 10. Mobile UX and contact / quote forms

- **Viewport meta**: `<meta name="viewport" content="width=device-width, initial-scale=1" />` present on contact page (and presumably on all pages via shared layout). Correct.
- **Contact form**: standard responsive layout, fields stacked, mobile-friendly. `inputMode="email"` and `autoComplete="email"` / `autoComplete="tel"` attributes detected — good mobile keyboard hinting. Honeypot field `name="company"` present and hidden (correct anti-spam pattern).
- **Phone field**: `type="tel"` — invokes numeric keypad on mobile. Good.
- Could not test full Lighthouse mobile score from curl alone — recommend running PSI / Lighthouse on `/contact` and `/quote` next.

Severity: **Low** — no defects detected at the markup level.

## 11. Internal linking depth

Each area page links back to the four core service pages and to sibling area pages. Internal-link count per area page (per Truro sample): ~11 internal links. Good for crawl equity distribution.

One missed pattern: there's no "Nearby areas we also serve" block on each area page that cross-links to all 8 sibling area pages. Adding that block (with the town name as anchor text) would create a clean topical cluster signal.

Severity: **Low**.

## 12. Limitations and what could not be assessed without paid tools

- **Live Google Business Profile data** (category, attributes, photo count, post count, response rate, last review date on GBP). Use the GBP dashboard or a DataForSEO `local_business_data` call to verify.
- **Local pack ranking positions** for target queries like "gardener Truro", "lawn mowing Newquay", "hedge cutting Padstow". Use `google_local_pack_serp` or BrightLocal's local rank tracker.
- **Citation NAP consistency at the third-party directory level** — I confirmed the directories are linked in `sameAs`, but did not verify that Yell, Checkatrade and Bark show identical NAP to the site. Worth a manual spot-check or use a citation tracker (BrightLocal / Whitespark).
- **Off-site Tier 1 review counts and ratings** on Trustpilot, Checkatrade, Yell, Bark.
- **Proximity-based ranking variance** (Search Atlas pegs this at 55.2% of rank variance). Outside your control as a hyperlocal SAB.
- **Real device mobile testing / Core Web Vitals** — requires Lighthouse / PSI.

## 13. Prioritised action list

### Critical

1. **Investigate the review-velocity gap from 2026-01 to 2026-05.** If new reviews exist on GBP, mirror them in homepage schema and on the relevant area pages within the week. If they don't exist, start a simple post-job review-ask habit immediately — aim for 2/month minimum.

### High

2. **Expand `areaServed` in JSON-LD from 4 cities to all 9 served towns** (Truro, St Austell, Bodmin, Padstow, Perranporth, St Ives, Newquay, Wadebridge, St Agnes). Add the City type for each. Single low-risk schema edit.
3. **Add Trustpilot, FreeIndex, Houzz UK and MyBuilder citations.** These are the four highest-ROI missing UK directories for a Cornwall gardener. Add to `sameAs` after registration.
4. **Embed a Google Maps iframe on /contact** centred on Trevarrian / TR8. Also add a static map image or directions link on each area page.

### Medium

5. **Add a named testimonial to each of the six area pages that currently have none** (Bodmin, Padstow, Perranporth, St Ives, Wadebridge, St Agnes). Re-use existing reviews where the customer's location matches; otherwise collect one per page.
6. **Add at least one photo per area page** with descriptive alt text including the town name and service ("Hedge trimming in Trevaunance Cove, St Agnes"). Adds visual local proof and lifts image search.
7. **Add holiday-let language to /areas/st-ives.** Material commercial gap.
8. **Lengthen /areas/padstow** to ~1,050 words, add PL28 postcode and a Prideaux Place / Rick Stein anchor.
9. **Add TR / PL postcode prefixes to each area page** ("Truro (TR1, TR3, TR4)"). Hyperlocal query matching.
10. **Add per-page `aggregateRating` and a filtered `review` array to each area page** in JSON-LD.

### Low

11. Fix the spaced `tel:+447593 121 621` on /contact to `tel:+447593121621`.
12. Tighten `geo` precision in schema to 5 decimal places.
13. Add a "Nearby areas we also serve" cross-link block to each area page linking to all 8 siblings.
14. Add `hasMap` and per-service `Service` schema entities with their own `areaServed`.
15. Add a Cornwall storm-cleanup landing page or seasonal blog post; light AONB / SSSI awareness mention on /about.
16. Consider standardising the GBP short URL to `Ca1e8ukWV-qsEAE` if that matches the canonical owner-facing URL in your GBP dashboard. Functionally equivalent today.

## Summary

Quilliams Mowing has unusually strong local SEO foundations for a business established in 2025: correct LandscapingBusiness schema, real Cornwall-specific content on every area page, consistent NAP, recognised trust identifiers (Companies House, waste carrier registration), and a strong base of recent five-star reviews. The audit found no critical structural defects.

The two material risks are (1) a possible review-velocity gap in 2026 that should be confirmed against GBP and remediated immediately if real, and (2) thin Tier 1 UK citation coverage outside the four declared directories. Both are inexpensive to address and together would lift the score from 84 to the low 90s.

Severity distribution of findings: 1 potentially Critical, 3 High, 6 Medium, 6 Low.

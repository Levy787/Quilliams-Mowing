# SEO Action Plan — quilliamsmowing.co.uk

**Generated:** 2026-05-26 from audit at `docs/seo-runs/quilliamsmowing-co-uk-audit-20260526-192524/`
**Overall score:** 85 / 100 → target 95+

---

## Critical (do this week)

### CR-1 — Disable Cloudflare Bot Fight Mode
**Owner:** Levi (CF dashboard)
**Impact:** Performance 62 → 88+ (mobile CWV poor → good site-wide)
**Why:** `cdn-cgi/challenge-platform/scripts/jsd/main.js` consumes 3,236 ms scripting + 1,622 ms long task on every mobile page. Turnstile already protects form submissions, so the always-on JS is redundant.
**Steps:**
1. Cloudflare dashboard → Security → Bots → turn off "Bot Fight Mode"
2. Re-run Lighthouse on `/` and `/services/lawn-care` to verify
3. Optional: also disable "Email Address Obfuscation" (Scrape Shield) — small extra saving

### CR-2 — Restart Google review acquisition
**Owner:** Levi (manual)
**Impact:** Local 84 → 92, prevents rankings cliff heading into peak season
**Why:** Last review 2025-12-12. Sterling Sky 18-day rule violated. Most important single off-site signal.
**Steps:**
1. After every completed job, text or email customer the GBP review link
2. Reuse the templates already saved in `OFFSITE-EXECUTION-ASSETS.md`
3. Target: 2–3 new reviews per month minimum

### CR-3 — Merge duplicate `#business` JSON-LD on homepage
**Owner:** Code
**Impact:** Schema 88 → 92
**Why:** Blocks 0 and 4 share an `@id` with conflicting `review[]` arrays — Google may ignore one or both.
**Steps:**
1. Find the second `#business` node emission on the home page
2. Merge `review[]` into the first node; delete the duplicate

---

## High (do within 2 weeks)

### H-1 — Fix `https://www.` redirect from 307 → 308
**Owner:** Code (`next.config.ts` or Vercel redirects)
**Impact:** Technical 92 → 95
**Steps:** Add `permanent: true` to the www→apex redirect rule.

### H-2 — Add insurance + waste-carrier trust signals to site
**Owner:** Code/content
**Impact:** Content 84 → 88, Trust E-E-A-T component
**Why:** Insurance provider, policy limit, and waste-carrier licence number CBDL582202 appear nowhere on the rendered site (only in `/llms.txt` and schema identifiers).
**Steps:**
1. Add a "Credentials & Insurance" row to the About page (under existing credentials list)
2. Add an insurance line to the footer ("Fully insured · Public Liability £Xm · Waste Carrier CBDL582202")
3. Add to the contact page sidebar

### H-3 — Eliminate "we/our" voice regressions
**Owner:** Code/content (12 locations)
**Impact:** Content 84 → 88
**Locations to grep and rewrite:**
- Home hero subhead
- Home "Recent Works" intro
- Home Testimonials heading ("Don't just take our word for it")
- Home FAQ
- `content/.../pricing.json`
- `content/.../contact.json`
- (Full list in `CONTENT.md`)

### H-4 — Add OfferCatalog schema to `/pricing`
**Owner:** Code (`app/(marketing)/pricing/`)
**Impact:** Schema 88 → 92
**Why:** Pricing page currently has no pricing schema. Biggest missed structured-data opportunity.
**Steps:** Emit an `OfferCatalog` with 6 `Offer` items referencing each `/services/*` by `@id`.

### H-5 — Add author bio block to all blog posts
**Owner:** Code (blog post template)
**Impact:** Content 84 → 88, AI citation, E-E-A-T
**Why:** Single biggest E-E-A-T win available. Currently just a string byline.
**Steps:**
1. Render a 60-word Levi bio block at the bottom of every blog post
2. Include photo, role, credentials line, link to `/about`
3. Reference the existing `#levi` Person node via `@id`

### H-6 — Add testimonials to 6 area pages
**Owner:** Content
**Impact:** Content 84 → 87, Local 84 → 87
**Why:** Padstow, Perranporth, St Ives, Wadebridge, Bodmin, St Agnes have no testimonial. Home page has plenty to redistribute.
**Steps:** Pick one Levi-verified review per area; add to area JSON with location attribution.

### H-7 — Stagger blog `publishedDate` values
**Owner:** Content
**Impact:** Content 84 → 86, AI citation
**Why:** All 7 posts dated 2026-05-26 looks unnatural to crawlers and LLMs.
**Steps:** Spread real publish dates across the last 8 weeks (or use real authored dates if known).

---

## Medium (do within 1 month)

### M-1 — Add `Offer` to `/services/landscaping` and `/areas/*`
Match the `/services/lawn-care` pattern.

### M-2 — Add `ContactPoint` to `#business` node
Required for Organization knowledge panel completeness.

### M-3 — Fix `Offer.price` vs `priceSpecification` mismatch on lawn-care
Remove the top-level `price: "20"` to avoid conflict with the `priceSpecification` range.

### M-4 — Promote `logo`, `image`, and `Article.image[]` to `ImageObject` with width/height
URL strings work but ImageObject is Google's recommended form.

### M-5 — Add `BreadcrumbList` JSON-LD to homepage
Every other page has one.

### M-6 — Generalize `quickAnswer` and `holidayLet` blocks to all area pages
Currently hard-coded for Truro and St Ives only. Make data-driven so every area gets its own answer block.

### M-7 — Drop the duplicate "Why Choose Me in {Area}" bullet list
Or rewrite per area with location-specific phrasing.

### M-8 — Add comparison table to `/pricing` + cost blog
Cited third-party price range (Checkatrade UK average, etc.) — only remaining citation gap.

### M-9 — Lazy-init PostHog session recorder + surveys
27 KB unused JS + 107 ms long task. Init on first interaction.

### M-10 — Lazy-render homepage service grid tail
DOM at 2,165 elements (over 1,500 budget).

### M-11 — Stub per-page `#business` JSON-LD to `@id` reference only
~6 KB redundant JSON-LD on every page except `/` and `/about`.

### M-12 — Consider AggregateRating 4.9 instead of 5.0
16/16 perfect optically risky; one realistic dip improves credibility.

### M-13 — Clarify or qualify "5+ Years of Experience" stat
Cornwall business started 2025. Either total career years (with context) or trim.

### M-14 — Confirm GBP primary category matches revenue mix
"Gardener" vs "Landscaper" — primary category is the #1 GBP ranking factor.

### M-15 — Bring `/areas/newquay` up to `/areas/truro` parity
Missing labelled Quick Answer + FAQ.

### M-16 — Add per-file `git log` mtime to sitemap `lastmod`
Currently all 39 entries land in the same deploy second.

---

## Low (backlog)

- L-1 — Tighten CSP (remove `'unsafe-inline'` / `'unsafe-eval'` with nonces)
- L-2 — Normalize homepage canonical to match sub-page trailing-slash form
- L-3 — Fix en-dash in testimonial quote on home.json line 339
- L-4 — Verify project JSON slug fields don't reach routing (filename should be authoritative)
- L-5 — Image sitemap for `/projects/*` and `/areas/*` photography
- L-6 — Verify no internal links emit `/services/` trailing slash
- L-7 — Cosmetic: unify homepage single-block vs sub-page multi-block JSON-LD pattern
- L-8 — Pre-convert 525 KB JPEG service image to WebP at build time
- L-9 — Add UK Tier 1 citations off-site: FreeIndex, Trustpilot, MyBuilder, Houzz UK
- L-10 — Launch YouTube channel with 5–8 short videos (highest single GEO multi-modal lift)

---

## Score targets after Critical + High completion

| Category | Now | After Crit+High | After All |
|---|---|---|---|
| Technical | 92 | 95 | 97 |
| Content | 84 | 90 | 94 |
| Schema | 88 | 93 | 96 |
| Performance | 62 | 88 | 92 |
| GEO | 84 | 88 | 92 |
| Local | 84 | 92 | 96 |
| **Overall** | **85** | **91** | **94** |

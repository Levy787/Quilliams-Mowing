# SEO Task List — quilliamsmowing.co.uk

**Goal:** 100/100 across all SEO metrics
**Generated:** 29 March 2026
**Baseline Scores:** Overall 64/100 | Local 59/100

---

## Already Completed (This Session)

- [x] Change `lang="en"` to `lang="en-GB"`
- [x] Add canonical tags to 7 missing pages (`/about`, `/services`, `/projects`, `/quote`, `/privacy`, `/terms`, `/refer`)
- [x] Change schema `@type` from `LocalBusiness` to `LandscapingBusiness`
- [x] Fix duplicate LocalBusiness entity — added `@id` reference to ReviewSchema
- [x] Add ISO 8601 date normalizer (`toISODate()`) in ReviewSchema
- [x] Reduce priority images from 7+ to 2 (removed from duplicate hero loops + service carousel)
- [x] Create `WebSiteSchema.tsx` and add to marketing layout
- [x] Change OpenGraph `type` from `"article"` to `"website"` for all non-homepage pages
- [x] Update `robots.txt` — add `Disallow: /keystatic`, `Disallow: /ph/`, explicit AI crawler rules
- [x] Create `public/llms.txt`
- [x] Add `postalCode`, `logo`, phone country code, 5-decimal geo precision to LocalBusinessSchema
- [x] Fix ServiceSchema `provider` to use `@id` reference instead of inline entity
- [x] Disable Cloudflare Managed robots.txt (TECH-03)
- [x] Fix business hours — all sources now Mon-Sun 09:00-17:00 (TECH-01)
- [x] Consolidate email to `levi@quilliamsmowing.co.uk` everywhere (LOCAL-04)
- [x] Create 1200x630 OG image from about section photo (TECH-02)
- [x] Add email with Mail icon to footer
- [x] Add hours to `llms.txt`

---

## Critical (Fix Immediately)

### ~~TECH-01: Fix business hours consistency~~ DONE
All sources updated to Mon-Sun 09:00-17:00.

### ~~TECH-02: Create or link OG image file~~ DONE
Created 1200x630 PNG from about section image.

### ~~TECH-03: Disable Cloudflare AI Scrapers blanket block~~ DONE
Managed robots.txt toggle disabled. Custom robots.txt handles per-bot rules.

---

### ~~CONTENT-01: Write genuine founder bio for About page~~ DONE
Full rewrite with Levi's personal story, Tasmanian farming background, Cornwall climate expertise, credentials, and personality. 400+ words of genuine first-person content. FAQ answers also improved with specific details.

---

### ~~CONTENT-02: Rewrite all FAQ answers with specific, citable data~~ DONE
All 8 files rewritten via SEO content agent. Specific prices, timeframes, Cornwall details. First person voice. Zero em dashes. All answers lead with factual data in first 40 words.

---

### LOCAL-01: Restart review acquisition
**Impact:** Local SEO | **Manual action**

Last review Dec 2025 — 3.5 months ago. Rankings cliff after 18 days.

- [ ] Implement post-service review request (email/SMS follow-up)
- [ ] Target: 2-3 reviews/month minimum

---

## High Priority (Fix Within 1-2 Weeks)

### ~~CONTENT-03: Expand all service pages to 800+ words~~ DONE
All 6 service pages expanded via SEO content agent. ~850-1300 words each. Cornwall-specific details, pricing, plant species, seasonal timing, first-person voice, zero em dashes.

---

### ~~CONTENT-04: Enrich area pages with unique local content~~ DONE
All 6 areas rewritten via SEO agent. 400-540 words unique per area plus garden challenges section. Neighborhoods, landmarks, testimonials (Truro, St Austell), soil types, travel times. Broken nearby refs also fixed.

---

### ~~CONTENT-05: Create Newquay, Wadebridge, and St Agnes area pages~~ DONE
Created 3 new area pages via SEO content agent. Newquay (870 words, testimonial, home base emphasis), Wadebridge (820 words, Camel valley context), St Agnes (920 words, mining heritage, coastal exposure). Footer Newquay link updated to `/areas/newquay`. All nearby arrays cross-linked. llms.txt updated. Total area pages: 9.

---

### ~~SCHEMA-01: Add BreadcrumbSchema to all missing pages~~ DONE
Added to about, services, pricing, projects, contact, areas, areas/[slug].

---

### ~~PERF-01: Optimize pattern-2.svg (166KB to 30KB)~~ DONE
Converted to half-size PNG tile (186x187px). 166KB SVG replaced with 30KB PNG. All 5 files referencing it updated. Old SVG deleted.

---

### ~~LOCAL-02: Register on UK trade directories~~ PARTIALLY DONE
Added Yell, Checkatrade, and Bark URLs to `sameAs` in LocalBusinessSchema. Remaining directories (TrustATrader, FreeIndex, MyBuilder, Rated People) still need manual registration.

---

### ~~LOCAL-03: Add GBP URL to schema sameAs and consolidate share links~~ DONE
Canonical GBP URL added to sameAs. Banner and contact page updated to use same URL. TikTok also added.

---

### TECH-14: Update robots.txt with /keystatic and /ph/ disallows
**Impact:** Technical SEO

- [x] Done — added `Disallow: /keystatic` and `Disallow: /ph/`

---

## Medium Priority (Fix Within 1 Month)

### CONTENT-06: Launch blog/guides section
**Impact:** Content Quality (Expertise + Authority)

Zero educational content. Biggest expertise gap.

- [ ] Create route: `app/(marketing)/blog/` with index + `[slug]`
- [ ] Add blog content schema to Keystatic
- [ ] Write 5 articles (800-1200 words each):
  1. "How Much Does a Gravel Garden Cost in Cornwall? (2026 Guide)"
  2. "When to Trim Leylandii Hedges — Seasonal Timing for Cornwall"
  3. "Low-Maintenance Garden Ideas for Cornwall's Coastal Climate"
  4. "Front Garden Transformation Ideas — Before and After in Newquay"
  5. "How Often Should You Mow Your Lawn? Seasonal Guide for Cornwall"

---

### ~~CONTENT-07: Enrich project case studies with prose~~ DONE
All 4 projects expanded via SEO agent. 5 paragraphs each with budget, duration, techniques, Cornwall context. FAQs rewritten with specific data. All "we" to "I". Template strings also fixed.

---

### CONTENT-08: Add static pricing table
**Impact:** Content Quality + AI Citability

Interactive calculator isn't accessible to AI crawlers.

- [ ] Add visible price range table to pricing page
- [ ] Include 2-3 anonymized "recent quote examples"

---

### SCHEMA-03: Add ServiceArea schema to area pages
**Impact:** Schema + Local SEO

- [ ] Add per-area `Service` schema with `areaServed` using `GeoCircle` or `AdministrativeArea`
- [ ] File: `app/(marketing)/areas/[slug]/page.tsx`

---

### SCHEMA-04: Add Person schema for founder
**Impact:** Schema (E-E-A-T)

- [ ] `@type: "Person"` with name, jobTitle, worksFor (#business), knowsAbout, image
- [ ] File: `app/(marketing)/about/page.tsx`

---

### PERF-02: Add Leaflet map loading placeholder
**Impact:** Performance (CLS)

- [ ] Add `loading: () => <div className="...animate-pulse..." />` to dynamic import
- [ ] File: `components/reusable/leaflet-map/index.tsx`

---

### PERF-03: Replace framer-motion fade-ins with CSS animations
**Impact:** Performance (INP/Bundle) — saves ~30-50KB gzipped

- [ ] `Services.tsx` — CSS `@starting-style` + IntersectionObserver
- [ ] `RecentWorks.tsx`
- [ ] `AboutUs.tsx`
- [ ] `Stats.tsx`

---

### PERF-04: Convert Hero to server component
**Impact:** Performance (LCP)

- [ ] Remove `'use client'` from Hero
- [ ] Extract CTA click tracking into small `HeroCTAs` client component

---

### PERF-07: Fix sitemap lastmod dates
**Impact:** Technical SEO

- [ ] Static pages: hardcode real dates
- [ ] CMS pages: read file mtime or add `lastUpdated` field
- [ ] Remove `changeFrequency` and `priority` (Google ignores)
- [ ] File: `app/sitemap.ts`

---

### VISUAL-01: Increase button touch targets to 48px
**Impact:** Images & Visual

- [ ] Add `min-h-[48px]` to button base or increase `lg` to `h-12`
- [ ] File: `components/ui/button.tsx`

---

### VISUAL-03: Fix safe-area-inset-bottom CSS class
**Impact:** Images & Visual

- [ ] Add `.safe-area-inset-bottom { padding-bottom: env(safe-area-inset-bottom, 0); }` to `globals.css`

---

### VISUAL-07: Reduce hero image grid height on mobile
**Impact:** Images & Visual

- [ ] Change `h-[700px]` to `h-[400px] md:h-[500px] lg:h-[700px]`
- [ ] File: `app/(marketing)/(home)/Hero.tsx` line 105

---

### ~~LOCAL-04: Consolidate email address~~ DONE
All sources updated to `levi@quilliamsmowing.co.uk`.

---

### ~~LOCAL-05: Clean up broken nearby area references~~ DONE
All nearby arrays now only reference valid slugs. Removed newquay, st-agnes, hayle, wadebridge, penzance.

---

### LOCAL-07: Add review count to TrustBar
**Impact:** Local SEO + Content

- [ ] Change "5.0 on Google" to "5.0 from X reviews on Google" with GBP link
- [ ] File: `components/TrustBar.tsx`

---

### AI-01: Create YouTube channel
**Impact:** AI Search Readiness + Authority | **Manual action**

YouTube has 0.737 correlation with AI citation. Zero presence currently.

- [ ] Create channel @quilliamsmowing
- [ ] Record 3-5 project walkthrough videos
- [ ] Add YouTube URL to schema `sameAs`

---

### AI-03: Structure content for optimal AI passage extraction
**Impact:** AI Search Readiness (Citability)

- [ ] Ensure key paragraphs are 134-167 words, self-contained
- [ ] Lead sections with direct factual statements
- [ ] Include specific data points in prose

---

### ~~TECH-04: Resolve trailing slash ambiguity~~ DONE
Set `skipTrailingSlashRedirect: false`. Next.js now normalizes trailing slashes automatically.

---

### ~~TECH-06: Decide offer page indexing strategy~~ DONE
Added `noindex, nofollow` layout to `(offers)` route group. Both `(landing)` and `(offers)` pages are now consistently marked as ad-only, not indexed.

---

### ONPAGE-01: Add trade accreditation badges
**Impact:** On-Page SEO | **Depends on LOCAL-02**

- [ ] Add Checkatrade/trade badges to TrustBar, About, Footer

---

## Low Priority (Backlog)

- [ ] **SCHEMA-02:** Add ItemList schema to `/services` and `/projects` landing pages
- [ ] **SCHEMA-05:** Add `foundingDate`, `founder`, `paymentAccepted`, `currenciesAccepted` to LocalBusiness
- [ ] **PERF-05:** Throttle StickyMobileCTA scroll handler (IntersectionObserver)
- [ ] **PERF-06:** Pre-convert 525KB JPEG service image to WebP
- [ ] **VISUAL-02:** Replace `Grid2X2` with `Menu` icon in navbar hamburger
- [ ] **VISUAL-04:** Make StickyMobileCTA spacer conditional on visibility
- [ ] **VISUAL-05:** Fix Hero CTA to use theme primary instead of hardcoded green
- [ ] **VISUAL-06:** Remove unused `.dark` CSS variables from globals.css
- [ ] **VISUAL-08:** Fix WhatsApp button overlap with sticky CTA on mobile
- [x] **TECH-05:** Implement IndexNow protocol for Bing/Yandex
- [ ] **LOCAL-06:** Add Google Maps embed to contact page
- [ ] **AI-02:** Engage on Reddit gardening communities (r/GardeningUK, r/Cornwall)
- [ ] **ONPAGE-02:** Add Article schema to blog posts (depends on CONTENT-06)

---

## Score Targets

| Category | Current | Target | Key Blockers |
|----------|---------|--------|-------------|
| Technical SEO | 82 | 100 | Hours fix, trailing slash, OG image, IndexNow |
| Content Quality | 62 | 100 | Founder bio, FAQ rewrites, service page depth, blog |
| On-Page SEO | 68 | 100 | Breadcrumbs, keyword optimization, trade badges |
| Schema | 60 | 100 | Breadcrumbs everywhere, ItemList, Person, ServiceArea |
| Performance | 75 | 100 | SVG optimization, Hero refactor, framer-motion removal |
| AI Search | 52 | 100 | Cloudflare unblock, FAQ rewrites, YouTube, Reddit |
| Images & Visual | 65 | 100 | OG image, touch targets, safe-area, hero mobile height |
| **Local SEO** | **59** | **100** | Reviews, directories, Newquay page, hours, email |

# Quilliams Mowing — On-Page SEO, Images & Performance Audit

**Date:** 2026-05-26
**Scope:** 8 sample pages
**Method:** Static HTML fetched via curl, headers inspected, no rendered JS

---

## Scores

| Category | Score |
|---|---|
| On-Page SEO | **84 / 100** |
| Images | **86 / 100** |
| Performance | **74 / 100** |

---

## Page-by-Page On-Page SEO

### 1. Home (`/`)

- **Title (60ch):** `Lawn Mowing & Gardening in Newquay, Cornwall | Quilliams` — good length, primary keyword + location + brand. Keep.
- **Description (151ch):** `Lawn mowing, hedge trimming, landscaping & garden maintenance in Newquay, Truro & Cornwall. 5-star rated, 120+ projects. Get a free quote today.` — strong, ideal length, includes proof + CTA.
- **H1:** `Professional Landscaping, Gardening, and Lawn Care You Can Rely On` (broken into 7 `<span>` fragments). One H1, correct. Issue: H1 doesn't match the title's "Newquay" geo signal. Recommend rephrasing to `Lawn Mowing & Gardening in Newquay, Cornwall You Can Rely On` to align with title and SERP.
- **Hierarchy:** H1 → 7 H2 → 9 H3 → 4 H4 (footer). No skips at body level.
- **Canonical:** `https://quilliamsmowing.co.uk` (no trailing slash) — fine, but inconsistent with other canonicals that include `/path` (no issue, just noting).
- **OG + Twitter:** Present, summary_large_image, locale en_GB, versioned og-image. Good.

### 2. Lawn Care (`/services/lawn-care`)

- **Title (61ch):** `Lawn Mowing & Lawn Care in Cornwall | Weekly Grass Cutting` — good, but missing brand suffix (inconsistent with rest of site). Recommend `Lawn Mowing in Cornwall | Quilliams Gardening` (52ch, brand + primary kw).
- **Description (139ch, just under 140):** `Reliable lawn mowing across Newquay, Truro, St Austell and Cornwall. Weekly or fortnightly visits, clean edges and a striped finish from £20.` — excellent, has price hook + locations.
- **H1:** `Lawn Care` — too short and generic. Should be `Lawn Mowing & Lawn Care in Cornwall` or `Weekly Lawn Mowing in Newquay & Cornwall`. Currently misses the head term in the H1.
- **Hierarchy:** H1 → 3 H2 → 10 H3 → 4 H4 (footer). Many H3s under few H2s suggests flat structure; consider grouping.

### 3. Truro Area (`/areas/truro`)

- **Title (38ch):** `Gardener in Truro, Cornwall | Quilliams` — short, clean. Could expand to `Gardener in Truro, Cornwall | Lawn Care & Hedges` (52ch) to capture more long-tail.
- **Description (140ch):** `Lawn mowing, hedge trimming and garden maintenance in Truro, Cornwall. Reliable, insured local gardener based near Newquay. Free quotes.` — good.
- **H1:** `Gardener in Truro, Cornwall` — perfect for local intent.
- **Hierarchy:** H1 → 6 H2 → 3 H3 → 4 H4 (footer). Slightly H3-thin but acceptable.
- **OG image:** Uses generic site og-image; consider per-area imagery (a Truro-specific photo) for higher social CTR.

### 4. About (`/about`)

- **Title (60ch):** `About Levi Quilliam | Gardener & Landscaper in Cornwall` — excellent E-E-A-T signal (named person).
- **Description (147ch):** `Meet Levi Quilliam, a fully insured gardener and landscaper near Newquay, Cornwall with farming roots, clear pricing and a clean finish.` — good.
- **H1:** `From Tasmanian farmland to Cornish gardens.` — narrative but weak on keywords. Recommend: `About Levi Quilliam — Gardener & Landscaper in Cornwall` as H1 and keep the Tasmanian line as H2/lede.
- **Hierarchy:** Clean (1/4/8/4).

### 5. Pricing (`/pricing`)

- **Title (50ch):** `Gardening Prices in Newquay, Cornwall | Get a Quote` — good.
- **Description (109ch):** `Use the calculator to get a ballpark range. We'll confirm scope and timing quickly once you send your details.` — **too short (109)** and doesn't mention pricing keywords or location. Replace with: `Gardening prices in Newquay & Cornwall from £20. Use the instant calculator for a ballpark, then book a free quote.` (~135ch).
- **H1:** `A rough price guide — fast confirmation.` — also weak on keywords. Recommend: `Gardening Prices in Newquay & Cornwall` as H1.
- **Hierarchy:** Clean.

### 6. Blog: Best Gardeners Newquay (`/blog/best-gardeners-newquay`)

- **Title (50ch):** `Best Gardeners in Newquay | Local Gardener Guide` — good for the head term.
- **Description (155ch):** `Looking for gardeners in Newquay? Compare local options, prices and checks. Quilliams Gardening & Landscaping is listed first for insured garden care.` — borderline self-promotional ("listed first") may reduce trust signal; consider neutralizing: `Looking for a gardener in Newquay? Compare local options on price, insurance and reviews — including Quilliams Gardening & Landscaping.`
- **H1:** `Best gardeners in Newquay` — perfect.
- **Hierarchy:** 1 H1 → 8 H2 → 20 H3 — strong outline depth, ideal for E-E-A-T content.
- **OG image:** Uses garden-maintenance hero (not the blog's actual hero) — minor, fine.

### 7. Project: Gravel Garden (`/projects/gravel-garden-with-patio`)

- **Title (47ch):** `Gravel Garden & Patio Transformation in Newquay` — good.
- **Description (159ch):** `See how I transformed an overgrown garden in Newquay, Cornwall by removing pampas grass and creating a low-maintenance gravel garden with a fresh patio area.` — excellent length, narrative + location.
- **H1:** `Pampas Grass Removed - Gravel Garden Added` — punchy but uses a hyphen instead of en-dash and skips "Newquay". Optional: `Pampas Grass Removed, Gravel Garden Added (Newquay)`.
- **OG/Twitter title differs from page title** (`Before & After: Gravel Garden with Patio (Newquay)`) — totally fine, more shareable.
- **Hero image extension:** `.jpg` source (every other hero uses `.webp`). Already served as WebP by `/_next/image`, so this is cosmetic only.

### 8. Contact (`/contact`)

- **Title (52ch):** `Contact Your Newquay Gardener | Quilliams Gardening` — good.
- **Description (104ch):** `Have a question or want to book a free consultation? Send us a message and we'll reply as soon as possible.` — **too short** and missing keyword/location. Replace with: `Contact Quilliams Gardening in Newquay, Cornwall. Send a message for a free quote, lawn care booking, or quick question.` (~140ch).
- **H1:** `Contact Us` — weak. Recommend: `Contact Quilliams — Newquay Gardener & Landscaper`.
- **Hierarchy bug:** **H1 → H3 with no H2** (0 H2s, 3 H3s). Should be: H2 for "Get in touch", "Business Hours", "Connect", etc.

---

## Cross-Page Findings — On-Page SEO

**Strengths:**
- Every page has unique title, description, canonical, OG, Twitter card (`summary_large_image`).
- `og:locale=en_GB` correct for UK target.
- Rich, layered schema across all pages (LocalBusiness via Person + Service + FAQPage + BreadcrumbList + AggregateRating on home).
- Brand suffix used on 6/8 titles (consistent format `Topic | Brand`).
- Slugs are clean, lowercase, hyphenated (`/services/lawn-care`, `/areas/truro`, `/projects/gravel-garden-with-patio`).

**Issues to fix (priority):**
1. **Contact page heading skip** — add H2s between H1 and the H3s.
2. **Lawn-care H1 is bare ("Lawn Care")** — must contain primary keyword and location.
3. **Pricing & Contact meta descriptions are too short and keyword-light.**
4. **Home H1 doesn't reinforce "Newquay/Cornwall"** signal sent by title.
5. **About H1 is poetic but keyword-weak** — keep the line, just demote to H2.
6. **Lawn-care title missing brand suffix** — inconsistent.

**Internal linking:** Each page has 38–55 internal anchors (excellent for a small site). Nav + footer + breadcrumbs + contextual area cross-links visible. Anchor text is mostly descriptive ("Gardening in Newquay", "Lawn Mowing", "Get a Quote") — good diversity, not over-optimized. Truro page cross-links to /areas/newquay, /st-austell, /perranporth (good local web).

**External links:** 5–14 per page; most are nav/footer social. Blog has 14 (likely citations to sources — good).

---

## Images

**Strengths:**
- **100% alt-text coverage** across all 58 sampled images.
- Alt text is descriptive, not generic ("Freshly mown lawn with trimmed hedges in a private garden", "Brand new gravel garden with new patio", "Overgrown garden before transformation").
- `next/image` used everywhere — generates `srcSet` with 8-12 widths from 16w to 1920w.
- Lazy loading applied to non-LCP images (`loading="lazy"` on 34/36 home images, all other gallery images).
- LCP image correctly tagged `fetchPriority="high"` and **preloaded** as `<link rel="preload" as="image" imageSrcSet=... fetchPriority="high">`.
- Backend serves AVIF when accepted, WebP otherwise (`vary: Accept`, `content-type: image/avif` confirmed on hero at q=60 width=1920).
- Cache headers ideal: `cache-control: public, max-age=31536000, immutable` on `/_next/image` responses.

**Issues:**
1. **Hero LCP at desktop 1920w is 177KB (AVIF) / 285KB (WebP)** — acceptable but at the upper end. Hero quality is set to q=60, which is already aggressive. The actual rendered size is `(max-width: 768px) 45vw, 18vw` — so on a 1440px desktop the displayed width is ~260px. Browser will fetch the 256w/640w variant (not 1920w). Preload is correct. **No action needed**, but verify Lighthouse confirms the right variant is picked.
2. **One service tile uses `.jpeg`** source (`services/items/0/imageFile.jpeg`) while others are `.webp`. Backend converts on the fly; cosmetic only.
3. **`width`/`height` missing on most fill-mode images** (using `data-nimg="fill"` + absolute positioning). This is standard next/image fill behavior, but it means dimensions come from the container, not intrinsic — verify no CLS using PageSpeed Insights. The few non-fill images (logo) correctly include width/height.
4. **No `picture` element with explicit AVIF/WebP fallback markup** — relies on `vary: Accept` negotiation. Works fine, just noting.
5. **Source files are stored as `.webp`** in `/images/uploads/...` already. Good.
6. **No oversized rendered hero**: served-vs-displayed ratio looks OK given responsive `sizes`. Spot-check on Lighthouse to confirm.

---

## Performance (lab signals from HTML/headers)

**Strengths:**
- Next.js 16 static prerender (`x-nextjs-prerender: 1`), `x-vercel-cache: HIT`, served via Cloudflare.
- HTTP/2, Brotli (implied), HSTS preloaded.
- Excellent security headers (CSP locked down, COOP same-origin, frame-options SAMEORIGIN).
- 1 stylesheet per page (likely the bundled Tailwind CSS).
- 2 self-hosted woff2 fonts preloaded with `crossorigin` — no Google Fonts external call.
- Hero image preloaded with `imageSrcSet` + `fetchPriority="high"`.
- All third-party scripts gated through CSP allow-list (PostHog EU + Cloudflare Turnstile). **No Google Analytics, no GTM, no Facebook pixel, no other 3p** detected in static HTML.
- Cloudflare Turnstile preloaded as script (loads on contact/quote forms).
- Long-cache immutable assets for `_next/static` and `/_next/image`.

**Issues / friction:**
1. **No `<link rel="preconnect">` to `https://eu.i.posthog.com` or `https://challenges.cloudflare.com`** — even though scripts hit those origins. Add:
   ```html
   <link rel="preconnect" href="https://eu.i.posthog.com" crossorigin>
   <link rel="preconnect" href="https://challenges.cloudflare.com" crossorigin>
   ```
2. **Home page HTML is 812 KB uncompressed** (831,780 bytes). Most other pages are 70–138 KB. The home is bloated by:
   - 131 inline `<script>` tags (vs. ~36–60 on others) — Next.js RSC payload for all the home sections (testimonials, FAQ, recent works, service cards, areas grid).
   - Inline JSON-LD blocks (10 schema scripts).
   Brotli should bring it to ~120-150 KB over the wire, but parse cost is non-trivial on mid-range mobile. Consider lazy-loading the testimonials/FAQ/recent-works sections (dynamic import + Intersection Observer).
3. **0 `<script defer>` tags** — Next 16 uses `async` for chunk loading (good), but the inline RSC scripts are parsed inline. This is by design with the App Router.
4. **Home has 36 images** in static HTML. Most are lazy-loaded, but they all generate srcSet markup, which inflates HTML size. The hero collage alone is 6 images, all preloaded as fill objects. Consider whether you need 36 distinct images on the homepage; many appear to be testimonial avatars and the hero strip.
5. **`cache-control: public, max-age=0, must-revalidate`** on HTML responses — this is correct (relies on Vercel/Cloudflare edge cache and the `x-vercel-cache: HIT` proves it). No change.
6. **Render-blocking CSS**: 1 stylesheet, no `media` attribute trick. For a small Tailwind bundle this is fine; if the file is large, consider critical CSS inline (Next 16 supports this via `optimizeCss`).
7. **No `<link rel="dns-prefetch">`** for any external host — minor (preconnect would do more).

**Page weight summary (HTML only, uncompressed):**

| Page | Size | Scripts | Imgs |
|---|---:|---:|---:|
| Home | 812 KB | 131 | 36 |
| About | 135 KB | 48 | 3 |
| Blog | 133 KB | 59 | 3 |
| Lawn care | 121 KB | 39 | 3 |
| Pricing | 115 KB | 48 | 2 |
| Gravel project | 102 KB | 38 | 7 |
| Truro area | 73 KB | 36 | 2 |
| Contact | 70 KB | 37 | 2 |

---

## Top 10 Specific Fixes (in priority order)

1. **Contact page:** Replace H3s wrapping "Get in touch / Business Hours / Connect" with H2s. Current jump H1 → H3 is a hierarchy skip.
2. **Lawn-care H1:** Change `Lawn Care` to `Lawn Mowing & Lawn Care in Cornwall` (or include "Newquay").
3. **Pricing meta description:** Replace short copy with: `Gardening prices in Newquay & Cornwall from £20. Use the instant calculator for a ballpark, then book a free quote.`
4. **Contact meta description:** Replace with: `Contact Quilliams Gardening in Newquay, Cornwall. Send a message for a free quote, lawn care booking, or quick question.`
5. **About H1:** Promote the SEO line: `About Levi Quilliam — Gardener & Landscaper in Cornwall`, move `From Tasmanian farmland to Cornish gardens.` to H2/lede.
6. **Pricing H1:** Change `A rough price guide — fast confirmation.` to `Gardening Prices in Newquay & Cornwall`; keep current line as H2.
7. **Lawn-care title:** Add brand suffix for consistency: `Lawn Mowing in Cornwall | Quilliams Gardening`.
8. **Home H1:** Reinforce geo signal: `Professional Lawn Care, Gardening & Landscaping in Newquay, Cornwall` (still under 80ch).
9. **Add `<link rel="preconnect">`** for `eu.i.posthog.com` and `challenges.cloudflare.com` in the root layout `<head>`.
10. **Homepage payload:** Profile whether testimonials/FAQ/recent-works can be dynamic-imported (defer below-the-fold sections) to shave RSC payload from 812 KB toward ~400 KB.

---

## Quick Wins (≤30 min each)

- Two meta description rewrites (pricing, contact).
- Three H1 rewrites (lawn-care, pricing, contact).
- Add 2 preconnect hints.
- Promote H3s to H2s on contact page.

These five changes alone would likely push On-Page SEO from 84 → 92.

---

## Scoring Rationale

**On-Page SEO 84/100** — Strong title/description coverage, excellent schema, clean canonicals, descriptive OG/Twitter, good internal linking. Deductions: 3 weak H1s (lawn-care, pricing, contact), 2 short meta descriptions, 1 heading hierarchy skip, 1 missing brand suffix.

**Images 86/100** — Universal alt text coverage with quality descriptions, full next/image responsive srcSet, AVIF/WebP negotiation, immutable cache, preloaded LCP. Deductions: hero AVIF at 177KB could be smaller, no explicit width/height on fill-mode images (potential CLS risk to verify), source files mixed `.webp`/`.jpg`/`.jpeg` (cosmetic).

**Performance 74/100** — Excellent caching, prerender, security headers, font preload, hero preload, no heavy 3p scripts. Deductions: 812KB home HTML, 131 home scripts, no preconnect for PostHog/Turnstile, 1 render-blocking CSS, no defer attribute on inline scripts (by design but parse cost remains).

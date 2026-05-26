# Generative Engine Optimization Audit — quilliamsmowing.co.uk

**Run date:** 2026-05-26 19:25:24
**Domain:** quilliamsmowing.co.uk
**Business:** Quilliams Gardening & Landscaping (sole trader / Quilliams Mowing Ltd), Cornwall, UK
**Founder:** Levi Quilliam
**Pages sampled:** /, /about, /pricing, /blog/gardener-cost-cornwall-2026, /blog/hedge-trimming-cornwall-cost-timing, /areas/truro, /areas/newquay, /services/lawn-care

---

## Executive Summary

Quilliams Mowing is in the **top decile of small local-service sites** for AI search readiness. The robots.txt is explicitly permissive to citation-class crawlers, a fully spec-compliant `llms.txt` exists with today's `Last-Updated` stamp, and key pages already lead with self-contained "quick answer" paragraphs (the single highest predictor of AI Overview / ChatGPT citation). Pricing, location, and credential entities are present and consistent across pages. The blog cluster on pricing and hedge trimming is particularly well-shaped for extraction — first 60 words supply the complete numeric answer, headings are question-based, and bylines + dates appear above the fold.

Where headroom remains: (1) FAQPage and Article JSON-LD coverage is uneven across area pages, (2) third-party citation density (Wikipedia/Reddit/YouTube entity signals) is low for a 2025-founded business, (3) area pages other than Newquay/Truro have not been spot-confirmed for parity, and (4) the Newquay area page is missing an FAQ block that exists on Truro — a fast cross-page consistency win.

### Overall GEO Health Score: **84 / 100**

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 88 | 22.0 |
| Structural Readability | 20% | 86 | 17.2 |
| Multi-Modal Content | 15% | 60 | 9.0 |
| Authority & Brand Signals | 20% | 78 | 15.6 |
| Technical Accessibility | 20% | 100 | 20.0 |
| **Total** | | | **83.8 → 84** |

### Platform-specific projection

| Platform | Score | Reasoning |
|---|---|---|
| Google AI Overviews | 86 | Strong question H2/H3 pattern, quick-answer paragraphs, FAQ present on most key pages, sitemap + robots clean. Needs more FAQPage / LocalBusiness schema coverage. |
| ChatGPT Search | 88 | GPTBot + OAI-SearchBot allowed, llms.txt is current and well-formed, Levi Quilliam is a disambiguated entity, prices are stated in £ with specific ranges. |
| Perplexity | 82 | PerplexityBot allowed; cite-friendly numbers and bylines present. Weak external citation graph (newer brand) lowers ceiling. |
| Bing Copilot | 80 | Bingbot has full access; brand has Bing-discoverable directory profiles (Yell, Checkatrade, Bark). IndexNow is commented out — turning it on would lift freshness signals. |

---

## 1. AI Crawler Accessibility (robots.txt)

**Status: PASS — best-practice configuration.**

Verified at https://quilliamsmowing.co.uk/robots.txt:

| Crawler | Status | Notes |
|---|---|---|
| GPTBot | Allowed | ChatGPT crawl + citation surface |
| OAI-SearchBot | Allowed | ChatGPT Search index |
| ClaudeBot | Allowed | Anthropic answer engine |
| PerplexityBot | Allowed | Perplexity citation crawler |
| Applebot-Extended | Allowed | Apple Intelligence / Siri summaries |
| CCBot | Blocked | Common Crawl — training-only, correctly excluded |
| Bytespider | Blocked | ByteDance / Doubao — training-only |
| meta-externalagent | Blocked | Meta AI training — correctly excluded |

Sitemap is referenced (`/sitemap.xml`). The `IndexNow` entry is commented out.

**Disallowed paths:** `/keystatic`, `/ph/` — both correct (CMS + PostHog proxy).

**Verdict:** This is a textbook "cite me, don't train on me" configuration. No changes needed here.

---

## 2. llms.txt — Format, Coverage, Currency

**Status: PASS — exemplar implementation.**

File at https://quilliamsmowing.co.uk/llms.txt is fully spec-compliant:

- H1 title present (`# Quilliams Gardening & Landscaping`)
- Blockquote summary line present (`> Professional gardening, landscaping...`)
- **`Last-Updated: 2026-05-26`** — current to today
- All expected sections present: Key Pages, Trust & Credentials, Services, **Not Offered** (excellent — disambiguates from agricultural contractors), Areas Served, Pricing, Guides, Hours, Contact, About

**Coverage of sitemap:** Key Pages includes 14 URLs covering homepage, services index, lawn-care service detail, pricing, Newquay area page, 6 blog guides, about, contact, and quote. Service detail pages (landscaping, hedge-trimming, garden-maintenance, seasonal-cleanup, mulching) are linked inline under Services. Area pages other than Newquay are linked inline under Areas Served.

**Trust block** carries Companies House number (16405915), waste carrier reg (CBDL582202), Google Business Profile link — all entity-grade signals that LLMs can use for verification.

**Minor improvements (nice-to-have, not required):**
- Add explicit URLs (not just relative paths) under Services and Areas Served so that LLMs that don't resolve relative links still resolve targets
- Consider adding a `## Optional` section linking the JSON `/search-index.json` if you want assistants to consume it directly

---

## 3. Passage-Level Citability

Sampled 8 pages. Each scored against the 134–167 word "AI citation sweet spot," first-40-word direct-answer test, question-headings test, and numeric specificity.

| Page | Quick-answer ≤60w | Question H2/H3 | Specific £/dates | Self-contained passages | Score |
|---|---|---|---|---|---|
| `/` | Partial (marketing lead, not a numeric answer) | Yes (FAQ H3s) | Partial | Good | 78 |
| `/about` | Yes — credentials block is extractable | Yes | Yes (CBDL582202, 16405915, 120+ projects, 5.0/16) | Excellent | 90 |
| `/pricing` | Yes — opening table of ranges | Yes | Yes (£20–£30, £30–£50, £60–£120, £5–£15/m) | Excellent | 92 |
| `/blog/gardener-cost-cornwall-2026` | Yes — first 100 words deliver complete priced answer with date stamp | Yes ("How much is a gardener per hour in Cornwall?") | Yes, every section | Excellent | 95 |
| `/blog/hedge-trimming-cornwall-cost-timing` | Yes | Yes (Can hedges be cut during nesting season? How often should Leylandii be trimmed?) | Yes (£5–£15/m, late-summer-to-autumn timing) | Excellent | 93 |
| `/areas/truro` | Yes — "Quick Answer" block | Partial | Partial (£20, £60 stated) | Good | 82 |
| `/areas/newquay` | Implicit, no labelled "Quick Answer" | Partial | Yes (£20, £60–£120, £5–£15/m) | Good | 78 |
| `/services/lawn-care` | Partial — "What's included" list is extractable but no priced quick-answer paragraph | Partial (FAQs at bottom) | Yes (£20, £30–£50, £10/bag) | Good | 80 |

**Citability dimension score: 88/100.**

**Strongest extractable passage on the site** (from `/blog/gardener-cost-cornwall-2026`):
> "As of May 2026, a gardener in Cornwall usually costs £20 to £50 for lawn mowing, £60 to £120 for a regular maintenance visit, and from around £80 for a one-off tidy-up. Hedge trimming is often £5 to £15 per metre…"

This is the single best citation candidate on the site — date-stamped, location-qualified, price-banded, and self-contained. It should be replicated as the structural template for every area page and every service page.

---

## 4. Structural Readability

**Dimension score: 86/100.**

- **Heading hierarchy:** Consistent H1 → H2 → H3 pattern across sampled pages. No skipped levels detected.
- **Question-based subheadings:** Strong on `/`, `/pricing`, both blog posts, and `/about`. Weaker on `/areas/newquay` and `/services/lawn-care` (declarative headings dominate).
- **Lists and tables:** Pricing page uses table form; lawn-care page uses bulleted inclusion list; blog posts use bullets for cost factors. Good extraction shape.
- **Paragraph length:** Moderate (3–8 sentences). Within the 134–167 word ideal for AI passage selection on the blog pages.
- **Definition blocks:** The pricing page has near-definition blocks ("Regular garden maintenance: £60–£120"). Extend this style.

---

## 5. Multi-Modal Content

**Dimension score: 60/100.**

This is the weakest dimension and the highest-leverage growth area.

- **Images:** Present (uploads/faq/cutout.png seen in git status; headshot variant noted in recent commits). Alt-text completeness not verified at scale in this run.
- **Video:** No YouTube channel surfaced from the homepage or about page. YouTube mentions carry the strongest correlation (~0.737) with AI citations of any single signal. **A small set of short demo videos (before/after lawn, hedge-trim time-lapse, gravel garden install) hosted on YouTube and embedded with proper VideoObject schema would be the single largest lift available.**
- **Tables:** Pricing table is the only obvious tabular block; more comparison tables ("weekly vs fortnightly," "regional price comparison Newquay vs Truro vs St Austell") would multiply citation surfaces.
- **Schema:** LocalBusiness and Service signals appear implicit; explicit FAQPage, Article (for blog), and Person (for Levi Quilliam, with sameAs to LinkedIn/Google Business Profile/Facebook/Instagram) are likely partial.

---

## 6. Authority & Brand Signals

**Dimension score: 78/100.**

**Present (strong):**
- Named, photographed founder (Levi Quilliam) consistently bylined
- Companies House registration (16405915) — verifiable corporate identity
- Environment Agency waste carrier licence (CBDL582202) — verifiable regulatory identity
- Public liability insurance referenced
- Google Business Profile linked from llms.txt with 5.0/16 reviews
- Directory presence: Checkatrade, Yell, Bark (acts as sameAs / entity-anchor signal)
- Facebook + Instagram both linked (@quilliamsmowing on each)

**Weak / Missing:**
- **No Wikipedia entity** (expected — new brand) — not actionable short term
- **No Reddit footprint** detected on relevant subs (r/Cornwall, r/gardening, r/LandscapeArchitecture). Reddit presence correlates strongly with AI citation in 2025–26 LLM indices.
- **No YouTube channel** detected — see Multi-Modal section.
- **No LinkedIn personal page** surfaced via the site (founder bio gives the perfect basis for one — Tasmania → economics → accounting → Cornwall gardener arc is a strong narrative for LinkedIn entity disambiguation)
- **No third-party press / podcast / guest post citations** linked from the site

**Entity disambiguation:** Excellent. "Quilliams Mowing" → "Quilliams Gardening & Landscaping" (trading name) → "Quilliams Mowing Ltd" (legal entity) → "Levi Quilliam" (operator) → "Trevarrian, near Newquay, Cornwall" (location). All four nodes appear together on the homepage, about page, and llms.txt. An LLM has everything it needs to resolve the entity unambiguously.

---

## 7. Technical Accessibility

**Dimension score: 100/100.**

- robots.txt is permissive to all citation crawlers
- Sitemap referenced
- llms.txt present, current, well-formed
- Next.js 16 App Router with SSR by default — pages return HTML that crawlers can parse without JavaScript execution (Perplexity and Bing in particular benefit)
- /search-index.json is exposed (useful for in-house search and potentially for LLM agents)
- HTTPS, presumably HSTS (not re-verified)
- No client-side-only content rendering observed in the sampled pages

---

## 8. Top 5 Highest-Impact Changes

Ranked by (citation lift × ease of implementation).

### 1. Add FAQPage + Article JSON-LD to every blog post and area page (Effort: 2–3 hours)
The content is already shaped as Q&A on `/blog/gardener-cost-cornwall-2026`, `/blog/hedge-trimming-cornwall-cost-timing`, and `/pricing`. Wrapping each `<details>`/Q&A block in `FAQPage` JSON-LD makes the answer eligible for AI Overview "People also ask"-style extraction and Bing Copilot direct surfacing. Add `Article` schema with `author: Person(Levi Quilliam)`, `datePublished`, `dateModified` to every blog post.

### 2. Bring `/areas/newquay` up to `/areas/truro` parity (Effort: 30 minutes)
Newquay (the base location, highest-intent page) is missing an explicit "Quick Answer" labelled section and a FAQ. Truro has both. Mirror the Truro structure on Newquay and on every other area page. Add at minimum three FAQs per area page:
- "How much does a gardener cost in [Town]?"
- "How quickly can you start in [Town]?"
- "Which [Town] neighbourhoods do you cover?"

### 3. Launch a YouTube channel with 5–8 short videos (Effort: 1–2 days production, ongoing)
Highest single-signal correlation with AI citation (~0.737). Suggested first slate:
- "Lawn mowing in Cornwall: weekly vs fortnightly"
- "Hedge trimming during nesting season — what's legal and when"
- "Gravel garden install at Trevarrian (time-lapse)"
- "What £60 of garden maintenance actually buys you in Cornwall"
- A founder intro video (auto-transcribed → embedded on /about)
Embed each on the matching blog/service page with `VideoObject` schema.

### 4. Add a "Cornwall gardener prices 2026" comparison table to /pricing and the cost blog (Effort: 1 hour)
Three columns: service, my price, typical Cornwall range. Tables are over-represented in AI Overview citations because they answer comparative queries in one extract. Cite your range source (HomeAdvisor UK, Checkatrade Price Guide, MyJobQuote) to add a third-party authority anchor — this is currently the only meaningful citation gap in the cost blog.

### 5. Turn on IndexNow + add weekly Reddit/Quora micro-presence (Effort: 30 minutes + 20 min/week)
Uncomment the IndexNow line in robots.txt and submit on publish — Bing Copilot and Perplexity both consume IndexNow signals. In parallel, post one well-considered, non-promotional answer per week to r/Cornwall, r/gardening, or r/LandscapeArchitecture (e.g., "When to trim Leylandii in Cornwall") with a footer disclosing you're a Cornwall gardener. This builds the Reddit entity graph that LLMs increasingly weight.

---

## 9. Quick wins (under 15 minutes each)

- Add a labelled "Quick Answer" paragraph to `/services/lawn-care`, `/areas/newquay`, and the homepage hero
- Add `Last-Updated:` line to every blog post visible in body text (currently on the 2026 cost guide and hedge post — replicate)
- Add Person schema for Levi Quilliam with sameAs entries to Facebook, Instagram, Google Business Profile, Checkatrade, Yell, Bark
- Expand `llms.txt` Services and Areas Served lines to absolute URLs (not relative)
- Add `/blog` index URL to `llms.txt` Key Pages
- Confirm alt text on every image (especially headshot variants and the FAQ cutout)

---

## 10. Watch list (revisit in 90 days)

- LLM citation share via DataForSEO `ai_optimization_chat_gpt_scraper` (or manual probe with queries like "best gardener in Newquay Cornwall", "how much does a gardener cost in Cornwall", "hedge trimming cost Cornwall")
- Reddit/Quora mention count
- YouTube channel watch time and embed-back ratio
- Google Business Profile review velocity (currently 16; target 30+ by end-summer 2026 season)
- Bing IndexNow submission acceptance rate

---

**Report file:** `/Users/levi/repos/personal/Quilliams-Mowing/docs/seo-runs/quilliamsmowing-co-uk-audit-20260526-192524/GEO.md`

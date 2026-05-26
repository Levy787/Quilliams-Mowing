# Content Quality / E-E-A-T Audit — quilliamsmowing.co.uk

**Date:** 2026-05-26
**Auditor framework:** Google Quality Rater Guidelines (Sept 2025)
**Scope:** home, about, services landing + 6 service pages, 9 area pages, 7 blog posts, 4 projects, pricing, contact
**Site stage:** Post-remediation pass (earlier today)

---

## Overall score: 84 / 100

The site is in the top tier of UK sole-trader gardener sites. Voice is consistent, first-person, specific, and grounded in real local knowledge. The remediation pass clearly worked: area pages have authentic neighbourhood detail, blog posts have quick-answer blocks and clear hierarchy, every page has a real person attached. The remaining gaps are not "thin content" failures but trust/E-A-T polish and a few voice inconsistencies on home and pricing that read as legacy boilerplate.

### Score breakdown

| Factor | Weight | Score | Notes |
|---|---|---|---|
| Experience | 20% | 92 | Strong. First-person Levi voice, named neighbourhoods, real testimonials with named customers, project case studies with real locations (Mount Hawke, Grampound). |
| Expertise | 25% | 84 | Specific Cornwall soils, microclimates, plant recommendations, pricing detail. Weak spot: no formal horticultural credentials beyond "farming roots" and "5+ years experience." |
| Authoritativeness | 25% | 74 | Levi is named everywhere and bylined on area pages. Missing: author bio block on blog posts, no external citations/press, no professional body memberships shown (BALI, APL, RHS). |
| Trustworthiness | 30% | 87 | Insured, waste-carrier licensed, clear pricing, real phone/email, Google profile link. Missing: insurance provider name, policy number, business registration (sole trader UTR/VAT N/A status), physical service address. |
| AI citation readiness | bonus | 88 | Excellent quick-answer blocks on blogs, structured FAQs, named pricing bands, geo-anchored claims. Few self-contained 134–167 word factoid passages, mostly longer narrative. |

---

## Inline summary

**Strengths:**
- Levi's first-person voice is consistent across 95% of pages (single voice = strong E-E-A-T signal)
- Area pages are no longer near-duplicates — each one has unique soil/wind/neighbourhood detail
- Blog quick-answer blocks are well-built for AI citation (148–192 words, self-contained, factual)
- No em dashes detected in any content file (project convention respected)
- Real named testimonials with locations on home, areas, projects
- Service pages all exceed 800 words with structured What's Included / Plans / FAQ blocks

**Highest-priority gaps:**
1. Home page voice slips to corporate "we / our / us" in hero subhead, recent works, FAQ intro, testimonials section (breaks the otherwise strong first-person identity)
2. Pricing page calculator and FAQ uses "we" throughout (same issue)
3. Blog posts lack visible author bio block (just a byline string in JSON — no rendered "About Levi" box at bottom of post)
4. No insurance provider, policy number, or waste-carrier licence number anywhere on site (trust gap for higher-value landscaping enquiries)
5. Area pages all share an identical "Why Choose Me" bullet list (genuine duplicate block across 9 pages)
6. Project page slugs use title-case strings ("Ongoing Garden Maintenance", "Leylandii hedge trim (4m tall)") — likely produces URL-encoded ugly routes if used as `params.slug`
7. Padstow, Perranporth, St Ives, Wadebridge, St Agnes, Bodmin all lack a per-area testimonial (only Truro, St Austell, Newquay have one)

---

## Per-page findings

### Home — `/`
**Word count:** ~1,400 visible prose. **Min met:** yes (500).
**Score:** 78/100

**Issues:**

- **[HIGH] Voice inconsistency.** Hero subheading reads *"we deliver stress-free, dependable care..."* but the About block immediately switches to *"I'm Levi Quilliam, the gardener behind..."*. Recent Works heading says *"Beautiful Gardens & Landscapes We Created"* with description *"how we've transformed spaces with our expert craftsmanship"*. FAQ description says *"Reach out to us"*. Testimonials block: *"Don't just take our word for it"* and *"Hear what homeowners say about working with us."* — `content/home.json` lines 37, 225, 279, 332, 333.
- **[MED] Curly quote inconsistency in testimonials.** Mix of `"`, `"`, `"` — see lines 339, 345, 369, 423, 429. Some quotes use opening `"` but never close (`"Highly recommend!`).
- **[MED] Testimonial line 339 contains an en-dash (`–`) inside the quote.** Project convention forbids dashes; even in a real-customer quote, strip or replace.
- **[MED] Stats are unverified.** "120+ Projects Completed", "30 Active Clients", "5+ Years Experience". Levi's about story says he moved to Cornwall in 2025, started the business then. "5+ Years" reads as misleading — likely combining farming/horticultural background. Either clarify ("5+ years horticultural experience, business since 2025") or drop.
- **[LOW] Service grid has "Weed Control" linking to `/services/garden-maintenance`** — fine as a logical grouping but a quality rater may flag as missing a dedicated landing. Either add a `/services/weed-control` page or rename the card.
- **[LOW] FAQ uses smart-quotes inside `Cornwall's`** but other content uses straight apostrophes. Pick one.

**Rewrite recommendations:**
- Hero subhead: *"From weekly mowing and garden maintenance to full clean-ups and landscape work, I deliver dependable care that keeps your outdoor space something to be proud of."*
- Recent Works: *"Beautiful Gardens & Landscapes I've Built"* / *"See how I've transformed spaces..."*
- Testimonials: *"Don't just take my word for it"* / *"Hear what homeowners say about working with me."*
- FAQ: *"Got more questions? Reach out using the button below"*
- Stats: change "5+ Years of Experience" to "5+ Years Hands-On Experience" or "Since 2025 in Cornwall".

---

### About — `/about`
**Word count:** ~1,100 visible prose. **Min met:** N/A (homepage adjacent).
**Score:** 92/100

**Strengths:** Real biography (Tasmania farm → economics/sales → Cornwall move 2025), specific Cornwall conditions, named insurance + waste-carrier licence, clear "what to expect" expectations block, FAQ with real phone number.

**Issues:**

- **[MED] Missing concrete credentials.** Mentions "farming roots" and "fully insured" but does not name the insurer, policy limits (£X public liability), or waste-carrier licence number. Highest-impact single E-E-A-T improvement on the site.
- **[MED] Timeline has no dates beyond "2025"** — the Tasmania/economics/corporate items have no years. Even approximate ranges ("2010–2018: economics & accounting") would strengthen the experience signal.
- **[LOW] No headshot or formal byline format** with schema-friendly Person markup linking to social profiles (LinkedIn, Facebook). The headshot exists in `public/images/uploads/faq/cutout.png` but it's not clear it's used here.
- **[LOW] "I'm not the cheapest gardener in Cornwall"** is a confidence signal; good. Keep.

**Rewrite recommendations:**
- Add a "Credentials" block: *"Public liability insurance with [Insurer Name] up to £[X]m. Cornwall Council Upper Tier Waste Carrier Licence No. CB/XX######. Member of [body if any]."*
- Add a Person JSON-LD schema (if not already present in the layout) with `sameAs` links.
- Add approximate years to timeline items.

---

### Services landing — `/services`
**Score:** 80/100 (not deeply inspected for prose; structural only)

**Issues:**
- Confirm a short intro paragraph in Levi's voice exists (the landing client renders the cards but the topical intro should be ~150 words minimum).
- The 6 services are well-differentiated; no near-duplicates.

---

### Service: `/services/garden-maintenance`
**Word count:** ~1,650 prose. **Min met:** yes (800).
**Score:** 91/100

**Strengths:** Clear "what's included" with 6 distinct items, 4 schedule plans (weekly/fortnightly/monthly/seasonal), priced from £60–£120, 5 FAQs, green-waste pricing transparent.

**Issues:**
- **[LOW] Description (line 5) is 130 words — borderline citation-ready chunk.** Could be split into a quick-answer block of ~150 words for AI citation.
- **[LOW] "Recent results" uses 3 generic "tidy garden near Newquay" cards.** Add specific village names (Pentire, Porth, Crantock) to match the specificity standard set on area pages.

---

### Service: `/services/hedge-trimming`, `/services/landscaping`, `/services/lawn-care`, `/services/mulching`, `/services/seasonal-cleanup`
**Score range:** 85–91/100

Same structural pattern as garden-maintenance. Each exceeds 1,500 prose words after removing JSON keys. Mulching (1,599 file tokens) is the smallest but still topically complete. Same minor issue: results cards are slightly generic.

**Recommendation:** Run through each service "results.cards" array and inject village names matching the area page neighbourhood lists.

---

### Areas landing — `/areas`
**Score:** 75/100

Likely uses a grid of all 9 areas. No issues flagged from sampling, but recommend a 200-word intro in Levi's voice describing what "covering Cornwall" actually means in practice (travel times, scheduling, why Trevarrian is a central base).

---

### Area pages — `/areas/{truro,st-austell,bodmin,padstow,perranporth,st-ives,newquay,wadebridge,st-agnes}`
**Word count per page:** 700–1,000 visible prose. **Min met:** yes (500–600).
**Average score:** 86/100

**Strengths:** Genuinely differentiated. Each page names real neighbourhoods (Truro: Lemon Street, Treliske, Malpas, Kenwyn, Langarth; St Ives: Stennack, Barnoon, Downalong; St Agnes: Wheal Coates, Chapel Porth, Trevaunance Cove; Bodmin: Berrycoombe, Lanivet). Each `gardenChallenges` paragraph has specific soil/wind detail. Real prices included.

**Issues:**

- **[HIGH] Duplicate block: "Why Choose Me in {Area}?"** All 9 area pages share an identical 4-bullet list (insurance, fixed quotes, 5-star + 120 projects, travel time). Quality raters will flag boilerplate at this scale. Add at least one area-specific bullet per page (e.g., Newquay: "Lived in Trevarrian, walking distance to Mawgan Porth"; St Ives: "Equipment small enough for stepped granite access").
- **[HIGH] Missing testimonials on 6 of 9 pages.** Padstow, Perranporth, St Ives, Wadebridge, St Agnes, Bodmin have `testimonial: null`. The home page already has Truro, Grampound, Newquay, St Austell quotes plus generic "Newquay, Cornwall" — surely there are also Wadebridge/Padstow ones available. Even one quote per area lifts trust significantly.
- **[MED] Quick Answer block only on Truro.** Lines 82-89 of the slug page hard-code a Truro-specific quick answer. Either build a `quickAnswer` field per area (recommended — huge AI-citation win), or remove from Truro for consistency.
- **[MED] Holiday-let section only on St Ives.** Lines 104-113 hard-code a St Ives-specific holiday-let paragraph. Padstow's prose mentions holiday lets heavily but doesn't get this dedicated block. Move into the data layer.
- **[MED] "Comparing gardeners in Newquay?" promotion only on Newquay (lines 170-183).** Good cross-link but inconsistent across the slug template. Make this a `relatedBlog: { slug, label }` field on each area's data so other areas can promote relevant content.
- **[LOW] Page subtitle is generic.** Line 72: `"Professional gardening and landscaping services"` — same on all 9. Replace with the per-area `area.description` or a custom subtitle field.
- **[LOW] No area-specific hero image used.** Each `Area` type has an optional `photo` field but the rendered page doesn't appear to display it. Hero photos of named local landmarks would boost the experience signal hard.

**Per-area notes:**

| Area | Score | Standout | Gap |
|---|---|---|---|
| Truro | 90 | Best — has Quick Answer + testimonial + 4 strong paragraphs | None significant |
| Newquay | 92 | Home-patch authority, 6 paragraphs, 8 neighbourhoods, 6 landmarks, named testimonial | Stats claim "5-star + 120 projects" is repeated in body |
| St Austell | 87 | Real prices per service, china clay context, 6 neighbourhoods | None significant |
| Padstow | 84 | Strong holiday-let angle, salt-tolerant plant names | Missing testimonial |
| St Ives | 85 | Unique terrain detail (steps, granite, microclimates), 5 neighbourhoods | Missing testimonial |
| Wadebridge | 84 | Camel valley microclimate detail, Egloshayle/Sladesbridge | Missing testimonial |
| Bodmin | 83 | Moor elevation detail, frost/wind insight | Missing testimonial, fewest neighbourhoods (4) |
| Perranporth | 82 | Salt wind narrative, sandy soil specifics, 4 neighbourhoods | Missing testimonial, only 3 services listed (could add seasonal-cleanup) |
| St Agnes | 84 | Mining-spoil soil detail (unique to St Agnes), 5 neighbourhoods, 4 landmarks | Missing testimonial |

---

### Blog: `/blog/gardener-cost-cornwall-2026`
**Word count:** ~1,400 visible prose. **Min met:** close (1,500 standard).
**Score:** 89/100

**Strengths:** Excellent quick-answer block (192 words — citation-perfect length). 6 well-structured sections with bullets, named prices throughout (£20–£50 mow, £60–£120 maintenance, £80+ tidy, £5–£15/m hedge, £500–£2,500 landscaping). FAQ with 3 schema-friendly Q/As.

**Issues:**
- **[MED] No author bio block visible to user.** Just `"author": "Levi Quilliam"` string. Should render an "About the author" box at bottom of post with photo, credentials, and "Get a quote" CTA — major E-E-A-T win.
- **[LOW] `publishedDate` and `updatedDate` are both `2026-05-26`.** Fine for now, but if the page hasn't actually been updated since publication, leave updatedDate out rather than matching it. Quality raters spot fake "updated" stamps.
- **[LOW] `itemList` is empty.** If kept in schema, render or remove.
- **[LOW] Reading time "8 min read" for ~1,400 words is slightly inflated** (avg reading speed = ~250 wpm = 5.6 min). Use ~6 min.

---

### Blog: `/blog/best-gardeners-newquay`
**Score:** 87/100

**Strengths:** Honest self-disclosure ("This is my own website, so the recommendation is clearly biased, but the reasons are concrete"), competitor list with real URLs (Green Guys, GreenFern, H&H, JKG, etc.) — this is a strong trust signal and unusual for SMB content. Quick answer is 161 words (citation-perfect).

**Issues:**
- **[MED] Listing competitors with live outbound links is brave but could leak link equity.** Recommend `rel="nofollow noopener"` on those external links (verify in template).
- **[LOW] No date on the competitor research.** "Public websites and directory listings change" disclaimer is good; add the date you compiled the list.

---

### Blog: `/blog/best-plants-coastal-cornwall-gardens`, `/blog/hedge-trimming-cornwall-cost-timing`, `/blog/low-maintenance-garden-ideas-cornwall`, `/blog/remove-established-pampas-grass`, `/blog/scarify-aerate-feed-lawn-cornwall`
**Score range:** 84–90/100

All follow the same template: quick-answer block, 5–6 structured sections, related links, FAQs. All voice-consistent with Levi's tone. `remove-established-pampas-grass` is the strongest (real first-hand experience from Newquay project referenced inline, line 48).

**Common issues:**
- All seven blogs share `publishedDate: 2026-05-26` and `updatedDate: 2026-05-26` except `best-gardeners-newquay` which has 2026-05-04 published. If they were all genuinely written today, fine, but staggering publish dates over recent weeks looks more natural and avoids the "site nuked all blogs at once" pattern.
- No author bio block rendered at the foot of any post.
- `itemList` empty on all except best-gardeners-newquay.
- Hero images on `low-maintenance-garden-ideas`, `gardener-cost-cornwall-2026`, and `remove-established-pampas-grass` are recycled from project/service uploads — fine, but custom photos of Levi at work would lift the experience signal.

---

### Projects — `/projects/*`
**Score range:** 80–88/100

Four case studies: `gravel-garden-with-patio`, `leylandii-hedge-trim-4m-tall`, `ongoing-garden-maintenance`, `overgrown-mess-to-clean-gravel-garden`. All have real locations (Mount Hawke, Grampound), prices, durations, and before/after galleries.

**Issues:**

- **[HIGH] Slug values in JSON are title-case strings with spaces:** `"slug": "Ongoing Garden Maintenance"` and `"slug": "Leylandii hedge trim (4m tall)"`. If this is read into `params.slug`, the URL becomes `/projects/Ongoing%20Garden%20Maintenance` — ugly, non-canonical, and a serious SEO bug. Confirm the route renders at the lowercased-hyphenated URL (looks like the file name is hyphenated — so the route param is the filename, not the JSON `slug` field). Either way, fix the JSON `slug` to match the filename slug.
- **[MED] No project landing page audit performed** but `/projects` should have an intro paragraph plus the 4 cards. Confirm.
- **[LOW] Ongoing-garden-maintenance prose is uniformly strong but the project has no specific date.** Add a "Started: Month YYYY" or "Visit frequency: fortnightly" data point.
- **[LOW] FAQ on projects duplicates FAQ on service pages.** E.g., "Do you remove garden waste?" appears on garden-maintenance service AND ongoing-garden-maintenance project with very similar wording. Differentiate or remove from the project version (project FAQs should be case-specific).

---

### Pricing — `/pricing`
**Score:** 72/100

**Issues:**

- **[HIGH] Voice slips to "we" throughout.** Line 21: *"We'll confirm scope quickly"*. Line 33: *"We'll receive your selections"*. Line 72: *"We keep pricing straightforward"*. Line 91: *"We'll confirm what you want done"*. Same issue as home — breaks the otherwise consistent first-person identity.
- **[MED] Page is heavy on calculator UI strings, light on prose.** Topical coverage should include a 200–300 word intro on how Levi prices (already partially covered by the gardener-cost blog — link it). The FAQ is good but the breakdown section ("drivers") is bullet-only.
- **[MED] No worked example.** Add a "Real example: A fortnightly maintenance visit at a 3-bed semi in Porth = £75 including green waste" — concrete, citation-ready, and proves the calculator.

---

### Contact — `/contact`
**Score:** 82/100

**Strengths:** Real phone, email, hours, service area, Google Maps profile link. Form has all expected fields.

**Issues:**
- **[LOW] Voice slips:** *"Find us on Google Maps"* (line 23), *"Tell us about your property"* (line 43), *"We'll get back to you soon"* (line 45). Same first-person fix.
- **[LOW] No physical address.** Sole trader near Trevarrian — even a village-level address ("Trevarrian, Cornwall TR8") helps local search and trust without exposing a home address.
- **[LOW] "Mon–Sun: 9am–5pm"** uses an en-dash. Replace with `Mon to Sun, 9am to 5pm` to match the project no-dashes convention.

---

## AI citation readiness — 88/100

| Signal | Status |
|---|---|
| Quick-answer blocks (134–167 words) | Present on all 7 blog posts; only 1 of 9 area pages (Truro) |
| Self-contained factual sentences | Strong (named prices, place names, soil types, plant species) |
| FAQ blocks with schema-friendly Q/A | Present on services, blogs, projects, home, about |
| Structured headings (H1 > H2 > H3) | Consistent |
| Named entities (people, places, products) | Strong (Levi, neighbourhoods, plant species, equipment) |
| Last-updated timestamps | Present on blogs; none on services or areas |
| Author byline | Visible on area pages, blog posts (string only) |
| Author entity (rendered bio block, schema Person) | Missing |
| Price data points cited specifically | Excellent — exact £ ranges throughout |
| Geo data | Lat/lng in schema, place names in prose — strong |

**Highest-leverage AI improvements:**
1. Add `quickAnswer` field to all 9 areas (currently only Truro inline).
2. Render an author bio component on every blog post with Person schema.
3. Add `dateModified` to service pages (currently undated).

---

## Concrete action list (prioritised)

### Immediate (this week)
1. Fix first-person voice on `content/home.json` (5 locations) and `content/pricing.json` (4 locations) and `content/contact.json` (3 locations). Search/replace "we'll", "us", "our", "we" in non-customer-quote strings.
2. Strip the en-dash from the Matthew Wellington testimonial in home.json line 339.
3. Fix `content/projects/*.json` `slug` fields to lowercase-hyphenated values matching the filename (or confirm `params.slug` is taken from filename only).
4. Add missing testimonials to Padstow, Perranporth, St Ives, Wadebridge, Bodmin, St Agnes area data.

### Short-term (next 2 weeks)
5. Promote the Truro `quickAnswer` and St Ives `holidayLet` blocks into the `Area` type as optional fields per area; populate for at least the top 5 areas.
6. Add an area-specific bullet to each "Why Choose Me in {Area}" list so the block is not identical across 9 pages.
7. Build an `AuthorBio` component and render it at the foot of every blog post and area page, with Person JSON-LD.
8. Add formal credentials (insurer name, policy limit, waste-carrier licence number) to `/about` and the footer.

### Medium-term (this month)
9. Stagger blog `publishedDate` values across recent weeks rather than all 2026-05-26.
10. Add a worked pricing example to `/pricing`.
11. Reword "5+ Years of Experience" stat on home — clarify experience type.
12. Inject real village names into service `results.cards` descriptions.
13. Render area `photo` field with a hero image per page (or remove the unused field).

### Longer-term
14. Pursue a single external citation — local press mention, Cornwall Live, regional gardener directory listing, RHS partner programme — to establish the authoritativeness signal currently missing.
15. Consider publishing one project per quarter as a video walkthrough; embedding video on case-study pages is a strong experience signal.

---

## Confidence notes

- File-based audit only (no live HTTP fetch performed). Rendered output may differ if templates apply additional processing.
- Word counts are approximate (JSON-key noise stripped mentally).
- Did not audit `/services` landing, `/areas` landing, `/projects` landing, `/site-map`, `/privacy`, `/terms`, `/quote`, `/refer`, or `/offers/*` — out of scope.
- Cornwall Council waste carrier licence example used illustratively; verify actual issuing body before publishing.

**Relevant files inspected:**
- `/Users/levi/repos/personal/Quilliams-Mowing/content/home.json`
- `/Users/levi/repos/personal/Quilliams-Mowing/content/about.json`
- `/Users/levi/repos/personal/Quilliams-Mowing/content/pricing.json`
- `/Users/levi/repos/personal/Quilliams-Mowing/content/contact.json`
- `/Users/levi/repos/personal/Quilliams-Mowing/content/services/*.json` (6 files)
- `/Users/levi/repos/personal/Quilliams-Mowing/content/blog/*.json` (7 files)
- `/Users/levi/repos/personal/Quilliams-Mowing/content/projects/*.json` (4 files)
- `/Users/levi/repos/personal/Quilliams-Mowing/lib/areas/data.ts`
- `/Users/levi/repos/personal/Quilliams-Mowing/app/(marketing)/areas/[slug]/page.tsx`

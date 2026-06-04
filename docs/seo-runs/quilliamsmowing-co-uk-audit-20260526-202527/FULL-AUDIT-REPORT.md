# Post-Deploy SEO Audit — quilliamsmowing.co.uk

**Audit date:** 2026-05-26 (post-H1-H7 deploy)
**Compared against:** Morning baseline at `quilliamsmowing-co-uk-audit-20260526-192524/`
**Scope:** 39 indexable URLs

---

## Overall Score: **89 / 100** (was 85, **+4**)

| Category | Morning | Now | Δ | Weight |
|---|---|---|---|---|
| Technical SEO | 92 | **96** | +4 | 22% |
| Content Quality | 84 | **91** | +7 | 23% |
| On-Page SEO | 86 | 92 | +6 | 20% |
| Schema / Structured Data | 88 | **95** | +7 | 10% |
| Performance (CWV) | 62 | **58** | **−4** | 10% |
| AI Search Readiness | 84 | **89** | +5 | 10% |
| Images | 88 | 88 | 0 | 5% |
| **Weighted Total** | **85** | **89** | **+4** | |

Supplementary: Sitemap 92 (=), Local SEO 84 → 91 (+7).

---

## What landed cleanly

| Fix | Verification |
|---|---|
| H-1 www→308 + SSL | `curl https://www.quilliamsmowing.co.uk/` returns 308 with location header |
| H-2 trust signals | `CBDL582202` and `16405915` appear 6× on home, 8× on contact, 10× on about |
| H-3 voice fixes | Body copy is first-person across home/about/pricing/contact; only residual "we" is in customer quotes |
| H-4 OfferCatalog | `/pricing#offer-catalog` ships with 6 Offers, priceSpecification, provider @id reference |
| H-5 author bio | Live on every blog post — headshot, role, credentials, /about link |
| H-6 area testimonials | Bodmin, Padstow, Perranporth, St Ives, Wadebridge, St Agnes all render testimonials |
| H-7 staggered dates | 7 blog posts now span Jan–May 2026 with seasonal logic |
| Bonus: duplicate #business node merged | aggregateRating now `5.0 / 18` from single source (ReviewSchema) |
| Bonus: Cloudflare proxy removed | No `cf-ray`, no `cdn-cgi/challenge-platform`, server: Vercel |

---

## New issue surfaced: Performance regressed −4

Removing the Cloudflare proxy fixed the morning's biggest blocker (Bot Fight Mode JS), but it also exposed a **new dominant offender that was previously masked: PostHog Session Replay**.

| Page | Morning | Now | Δ | Why |
|---|---|---|---|---|
| `/services/lawn-care` | 47 | **83** | **+36** | Short page, recorder finishes fast |
| `/` | 55 | 57 | +2 | DOM up slightly (2165→2323) |
| `/areas/truro` | 58 | 62 | +4 | |
| `/pricing` | 57 | 50 | **−7** | Recorder + DOM cost |
| `/blog/gardener-cost-cornwall-2026` | 63 | **39** | **−24** | Long blog post → 8.9s recorder long task |

**Root cause:** `posthog-recorder.js` produces an 8,999 ms long task on blog posts because Session Replay cost scales with DOM mutation volume.

**Fix** (5 minutes):
```ts
posthog.init({
  // disable entirely:
  disable_session_recording: true,
  // OR sample at 5%:
  session_recording: { sample_rate: 0.05 }
});
```

Projected lift: blog 39→70+, home 57→80+, truro 62→85+, pricing 50→75+.

---

## Refreshed top 5 priorities

1. **Disable / sample PostHog Session Replay** (5 min) — single biggest perf lever now
2. **Wrap area testimonials in Review JSON-LD** (30 min) — unlocks AggregateRating eligibility on each `/areas/*` page; flagged as new highest-confidence schema win
3. **Quick Answer + 3-Q FAQ block on all 9 area pages** (1.5–2 h) — currently only Truro and St Ives have them; GEO citability lift
4. **Add `fetchPriority="high"` to blog hero image** (5 min) — easy 1–2 s LCP win
5. **True comparison table on `/pricing` with cited third-party range** (1 h) — last citation gap for AI

---

## Remaining backlog (from morning, still open)

- M-3 area testimonials wrap in Review schema → **promoted to priority #2 above**
- Per-area Quick Answer / FAQ (CON-5) → **priority #3**
- M-2 ContactPoint on #business (15 min)
- M-6 logo/image → ImageObject upgrade (20 min)
- M-7 BreadcrumbList on home (10 min)
- CON-4 dedupe "Why Choose Me in {Area}" bullets
- CON-7 "5+ Years of Experience" stat — still misleading
- L-1 CSP tighten (long-term)
- Manual off-site: FreeIndex/Trustpilot/MyBuilder/Houzz UK, YouTube, Reddit, GBP category confirm

---

## Files

- [FULL-AUDIT-REPORT.md](./FULL-AUDIT-REPORT.md) (this file)
- [TECHNICAL.md](./TECHNICAL.md) — 96/100
- [CONTENT.md](./CONTENT.md) — 91/100
- [SCHEMA.md](./SCHEMA.md) — 95/100
- [PERFORMANCE.md](./PERFORMANCE.md) — 58/100
- [GEO.md](./GEO.md) — 89/100
- [LOCAL.md](./LOCAL.md) — 91/100
- [SITEMAP.md](./SITEMAP.md) — 92/100

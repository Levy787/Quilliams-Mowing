# GEO Audit — quilliamsmowing.co.uk

Date: 2026-05-26
Auditor: seo-geo specialist

## AI Search Readiness Score: 74 / 100

### Dimension Breakdown

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability (passage-level extractability) | 25% | 70 | 17.5 |
| Structural Readability (headings, FAQs, lists) | 20% | 82 | 16.4 |
| Multi-Modal Content (images, alt text, video) | 15% | 55 | 8.25 |
| Authority & Brand Signals (entity, off-site mentions) | 20% | 65 | 13.0 |
| Technical Accessibility (crawlers, SSR, schema) | 20% | 95 | 19.0 |
| **Total** | | | **74.15** |

## Platform Sub-Scores

| Platform | Score | Reasoning |
|---|---|---|
| Google AI Overviews | 72 | Strong technical base, but thin schema and no sitemap lastmod cap performance. |
| ChatGPT (SearchGPT) | 78 | GPTBot allowed, llms.txt present, entity reasonably clear. Off-site mentions limit ceiling. |
| Perplexity | 76 | PerplexityBot allowed; question-format Newquay guide is well-suited. Needs more dense factual passages. |
| Bing Copilot | 70 | Standard Bing crawl works; benefits from Bing Webmaster Tools sign-up if not already done. |
| Claude (via web) | 78 | ClaudeBot allowed; clean SSR HTML; llms.txt provides direct context. Top-scoring platform for this site. |

## Highest-Impact Changes

1. Add JSON-LD: Article + ItemList + FAQPage to `/blog/best-gardeners-newquay`; Article on `/areas/truro`; Service + FAQPage on `/services/lawn-care`.
2. Add `<lastmod>` to `app/sitemap.ts` (real dates from Keystatic frontmatter or git mtime).
3. Add a 134-167 word "Lawn mowing costs in Cornwall" standalone answer block to `/pricing` with concrete figures + "as of May 2026" date.
4. Off-site brand building: YouTube channel + 2-3 short videos, confirm Checkatrade/Yell/Bark NAP, seed organic Reddit answer in r/Cornwall.
5. Add `Last-Updated: 2026-05-26` header to `/llms.txt` + `## Key Pages` section listing canonical URLs.

## Severity Summary

- **Critical (this week):** Sitemap `<lastmod>` missing; JSON-LD schema absent on cornerstone Newquay guide.
- **High (this month):** Lawn-mowing-cost answer block; llms.txt `Last-Updated` header; off-site listing audit.
- **Medium (this quarter):** YouTube channel; LinkedIn for Levi linked from /about via schema.org/Person; second photo + credentials on /about.
- **Low:** Reddit presence; "Quick answer" block on /areas/truro matching Newquay guide pattern.

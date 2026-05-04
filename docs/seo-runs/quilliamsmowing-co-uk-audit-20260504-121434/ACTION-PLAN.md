# Action Plan

## Priority Queue

| Severity | Issue |
|----------|-------|
| Critical | Geo: Some AI search crawlers are blocked: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot. |
| Critical | Performance: CLS is above target at 0.350. |
| Critical | Performance: INP is above target at 500ms. |
| Critical | Performance: LCP is above target at 4.20s. |
| Critical | Performance: Real-user/PageSpeed performance data was unavailable, so the report uses deterministic lab heuristics. |
| Critical | Visual: Page load timed out after 30000ms |
| Critical | Visual: Viewport meta tag is missing in the rendered mobile document. |
| High | Geo: Author/date attribution is weak in the visible content. |
| High | Geo: Server-rendered content confirmation is weak without technical-cache support. |
| High | Images: 12 image(s) are missing width/height attributes. |

## Recommended Actions

- **Technical**: Prioritize the hero/LCP element, reduce render-blocking resources, and compress above-the-fold assets.
- **Technical**: Reduce main-thread JavaScript work and defer non-critical third-party scripts.
- **Technical**: Consider IndexNow if faster Bing/Yandex discovery matters to the publishing workflow.
- **Performance**: Prioritize the hero/LCP element, reduce render-blocking resources, and compress above-the-fold assets.
- **Performance**: Reduce main-thread JavaScript work and defer non-critical third-party scripts.
- **Performance**: Reserve space for images/components and avoid late-injected layout shifts.
- **Performance**: Provide `PAGESPEED_API_KEY` or re-run in an environment with PageSpeed API access for richer CWV evidence.
- **On Page**: Shorten long title tags to 50-60 characters for optimal SERP display.
- **On Page**: Trim meta descriptions to 150-160 characters to avoid truncation.
- **Content**: Shorten dense sentences and tighten paragraph structure for easier reading.
- **Schema**: Add WebPage, Organization, SoftwareApplication markup aligned with the current page intent.
- **Images**: Add intrinsic dimensions or reserve space with CSS aspect-ratio to reduce CLS.

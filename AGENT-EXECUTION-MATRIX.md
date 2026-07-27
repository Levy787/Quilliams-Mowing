# Agent Execution Matrix

This maps every numbered item in [ACTION-PLAN.md](./ACTION-PLAN.md) to the level of owner involvement required.

## Summary

| Execution class | Count | Meaning |
|---|---:|---|
| Completed by agents in the repository | 23 | Code, content, configuration, testing, and documentation have been implemented; deployment remains a separate gate |
| Agent-led after an owner decision or asset | 7 | The agent can draft and implement, but must not invent a business fact, strategic choice, review source, photo, or testimonial |
| Completion needs external access, deployment, or elapsed time | 7 | Final proof or the change itself depends on production analytics, account/domain access, or monitoring |
| **Total** | **37** | All numbered action-plan items |

## Completed by agents in the repository

These 23 items were implemented on 27 July 2026:

| Workstream | Action IDs | Agent deliverable |
|---|---|---|
| Rendering and performance | H-05, H-07, H-08, H-09 | Server-render `/refer`; defer optional PostHog and Turnstile; diagnose and improve mobile LCP |
| Search targeting and snippets | H-10, H-11 | Implement query ownership, titles, H1/opening copy, internal anchors, and meta descriptions |
| Technical SEO | M-01, M-02, M-10, M-15, M-16, L-03 | Accurate sitemap dates, SSR counters, heading structure, image optimisation, robots rules, and CSP hardening |
| Content and trust copy | M-04, M-05, M-06, M-07, M-09, M-11, L-01 | Accurate waste-registration wording, sources, tables, comparison methodology, typo fixes, local H1s, metadata polish |
| UX and accessibility | M-12, M-13, M-14, M-17 | Contrast, consent-panel layout, touch targets, and homepage pricing CTA |

L-02 was reclassified after testing showed that Vercel performs the first
HTTP-to-HTTPS redirect before repository-owned Next.js redirects run. The
verified trace and required domain-level change are documented in
[docs/seo-runtime-deployment-notes.md](./docs/seo-runtime-deployment-notes.md).

These are not all equal-risk. L-03 is security-sensitive and should receive a
production smoke test before deployment.

## Agent-led after one owner decision or asset

| ID | What the agent can do | What the owner must supply or approve |
|---|---|---|
| H-01 | Draft the entity source-of-truth from site, schema, public records, and listings | Confirm the public business name, operational base wording, public hours, map centre, radius, address-visibility policy, and preferred GBP URL |
| H-02 | Align schema and map configuration | Approve H-01 first |
| H-04 | Build a maintained or dated review-count system | Choose the authoritative review platform/count and update policy |
| H-06 | Add `noindex` and remove `/refer` from the sitemap | Decide whether `/refer` should rank; this is an alternative to H-05 |
| M-03 | Publish supported project/client/experience claims | Explain how 120+ projects, 30+ clients, and 5+ years are counted |
| M-08 | Optimise and place area-specific evidence | Provide genuine job photos, locations, captions, and approved customer proof |
| L-04 | Implement primary and alternate names in schema | Approve the customer-facing primary name and role of legal/alternate names |

An agent can prepare a single owner questionnaire that resolves all seven dependencies at once.

## External access, deployment, or monitoring required

| ID | Agent contribution | Completion dependency |
|---|---|---|
| U-01 | Audit and repair GA4/consent code | Deploy and validate against the real production property |
| U-02 | Implement event instrumentation and a test matrix | Production DebugView/Realtime validation across consent states |
| U-03 | Build the comparison report or scheduled check | Fourteen days of post-fix GSC, GA4, and consent data |
| H-03 | Prepare listing changes and consistency checklist | Authenticated access and, where required, postal/phone verification for GBP, Yell, Bark, Bing, and Apple |
| L-02 | Document and verify the redirect chain | Vercel domain-level access is needed to route HTTP `www` directly to the HTTPS apex |
| L-05 | Inspect IndexNow implementation and logs | A real published content change and production submission log |
| L-06 | Audit, correct, or replace profile URLs | Account ownership/claim access for Checkatrade, Bing, Apple, and Bark |

Agents should not send outreach, claim profiles, change public business facts, or deploy without the relevant authority.

## Recommended agent batches

### Batch 1: measurement and technical foundation

U-01, U-02, H-05, H-07, H-08, H-09, M-01, M-02, M-10, M-15, M-16.

### Batch 2: search capture and content

H-10, H-11, M-04, M-05, M-06, M-07, M-09, M-11, M-17, L-01.

### Batch 3: UX and hardening

M-12, M-13, M-14, L-03.

### Batch 4: entity consistency

Run after the owner approves one fact sheet: H-01, H-02, H-04, L-04, followed by external H-03 and L-06.

### Batch 5: post-deploy verification

U-03, L-02, and L-05, plus a fresh crawl, three Lighthouse runs, GSC URL
Inspection sampling, schema validation, and lead-event testing.

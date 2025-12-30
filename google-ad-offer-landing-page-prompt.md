# Google Ad Offer Landing Page Prompt (Theme-Matched)

Create a dedicated landing page for a Google Search Ad offer.

## Target route / file

Create a specific offer URL (pick one):

- `app/(offers)/spring-cleanup/page.tsx`
  - Example URL: `/spring-cleanup`

Use **Option A** unless told otherwise.

## Goals

- Match the styling of the existing marketing pages (home/contact/quote):
  - Spacing: `mx-4 md:mx-8 lg:mx-16` + `container mx-auto px-4 lg:px-12`
  - Tokens only: `bg-background`, `text-foreground`, `text-muted-foreground`,
    `bg-muted`, `border-border`, etc.
  - Radii: `rounded-4xl`, `rounded-3xl`
- Optimize for conversions from Google Ads:
  - The offer is immediately clear above the fold.
  - The primary CTA is a form submission.
  - Also provide a click-to-call secondary CTA.
- Keep it focused: this page is **only** for the ad offer. Do not add extra
  pages, filters, or complex UI.

## Offer content (fill these in)

- Offer headline: `[OFFER_HEADLINE]` (e.g. “Spring Cleanup Special”)
- Offer subheadline: `[OFFER_SUBHEADLINE]`
- Offer terms line: `[OFFER_TERMS]` (e.g. “Limited spots available. New
  customers only.”)
- Service area/location: `[SERVICE_AREA]` (e.g. “Serving Wollongong & nearby
  suburbs”)
- Phone: `[PHONE]`
- Email: `[EMAIL]`

## Page Sections

### 1) Above-the-fold hero (must be tight)

- Dark, rounded hero card consistent with the site (similar to home Hero / CTA
  styling).
- Optional pattern overlay using an existing pattern from `public/patterns/`
  (only if consistent with current design).
- Left side (or centered on mobile):
  - Pill label: `Limited Offer`
  - H1: `[OFFER_HEADLINE]`
  - Short paragraph: `[OFFER_SUBHEADLINE]`
  - Bullets (3 max):
    - “Fast response”
    - “Transparent pricing”
    - “Friendly, reliable crew”
  - CTAs:
    - Primary button: `Claim Offer` (scrolls to form)
    - Secondary link/button: `Call [PHONE]`
- Right side (desktop): simple image placeholder or a muted media panel (no new
  assets required).

### 2) Trust strip

- A compact strip using existing tokens:
  - 3–4 trust items (e.g. “Licensed & insured”, “5-star reviews”, “On-time
    service”, “Clear cleanup”) using lucide icons in `text-primary`.

### 3) Offer details

- A card describing:
  - What’s included (3–6 bullet list)
  - Ideal for (2–3 bullets)
  - Typical timeline
  - `[OFFER_TERMS]` as subtle footnote text

### 4) Simple process (“What happens next”)

- Reuse the style from your quote/contact pages:
  1. Submit the form
  2. We review details/photos
  3. We confirm scope and timing
  4. You get a quote and book

### 5) Lead form (primary conversion)

- Put this in a prominent card.
- Fields (minimal, conversion-friendly):
  - Full name (required)
  - Email (required)
  - Phone (optional)
  - Suburb / address (optional)
  - Short message (required)
  - Optional photos (same approach as the quote page:
    `input type="file" accept="image/*" multiple` with up to 6 images and
    previews)
- Submit behavior (MVP):
  - `preventDefault()`
  - show `toast.success()` (sonner)
  - show inline success confirmation
  - reset form

### 6) FAQ (small)

- 4–6 FAQs using existing accordion component (`components/ui/accordion`).
- Keep answers short.

### 7) Footer note

- A small line about service area: `[SERVICE_AREA]`.

## Tracking hooks (no external scripts)

- Add `id` attributes for analytics wiring later (no JS tracking now):
  - `id="offer-hero"`
  - `id="offer-form"`
  - `id="offer-cta"`

## Output

Provide code for:

- `app/(marketing)/offers/[slug]/page.tsx`

Do not change global navigation or add extra routes beyond the offer landing
page.

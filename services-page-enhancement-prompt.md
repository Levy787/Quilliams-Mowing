# Services Page Enhancement Prompt (Add Sections + Images)

Update the existing Services overview page to feel less “template” and more like
a real marketing page, while staying consistent with the current design system.

Target file:

- `app/(marketing)/services/page.tsx`

## Constraints

- Do not add new pages beyond what already exists.
- Do not add filters, search, tabs, modals, or complex animations.
- Use only existing Tailwind + theme tokens (no hard-coded new colors).
- Keep spacing consistent with the site: `mx-4 md:mx-8 lg:mx-16` and
  `container mx-auto px-4 lg:px-12`.
- Use existing radii like `rounded-4xl` / `rounded-3xl`.

## Objective

- Keep the existing services grid (clickable cards) but add **2–4 supporting
  sections** that make the page feel more complete.
- Add **images** (use `next/image`) to break up text and reduce the “card list”
  feel.
- Content should sound like the rest of the site (professional, friendly,
  practical).

## Required Sections to Add

### 1) Hero with visual (top)

Replace the plain header with a hero section similar in structure to your other
pages:

- Left: pill label `Services`, H1 `Our Services`, short paragraph.
- Right: an image panel (no new assets required; use a placeholder URL like
  `https://picsum.photos/...` or reuse an existing pattern background).
- Use `rounded-4xl` and `overflow-hidden`.

### 2) “How we work” / Process (3–4 steps)

Add a simple process section (no fancy timeline component):

- Use 3–4 cards or a grid.
- Example steps:
  1. Tell us what you need
  2. We assess and recommend
  3. We quote clearly
  4. We schedule and deliver
- Use icons from `lucide-react` in `text-primary`.

### 3) Service highlights (image + text)

Add a section with **2 highlight rows** (alternating image left/right):

- Highlight #1: “Maintenance that stays consistent”
- Highlight #2: “Improvements that add real value”

Each highlight row should include:

- An image (rounded, `object-cover`, `aspect-*`).
- A heading + 2–3 bullet points.
- One CTA link/button:
  - “Get a Quote” → `/quote`

### 4) Mini FAQ (4–6 items)

Add a compact FAQ near the bottom using the existing accordion:

- Use `components/ui/accordion`.
- Questions should be practical, short.
  - “Do you offer ongoing maintenance?”
  - “Can I get a quote from photos?”
  - “Do you remove green waste?”
  - “How soon can you start?”

## Services Grid Improvements (keep it simple)

Keep the current grid but make it feel less generic:

- Add a short intro above the grid like “Pick a service to learn more.”
- Add a small “Popular” / “Most requested” tag to 2–3 services (use a tiny pill
  with `bg-muted` and `text-muted-foreground`).
- Ensure each card has a consistent height and a clear hover/focus state.

## Images Guidance

- Use `next/image` with `fill` in a `relative` wrapper.
- Use only allowed remote domains already configured (e.g. `picsum.photos`,
  `images.unsplash.com`).
- Use `sizes` to reduce layout shift.

## Output

Provide the full updated code for:

- `app/(marketing)/services/page.tsx`

Do not add extra routes or new UI systems.

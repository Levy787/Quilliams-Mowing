# Services Page Prompt (General Overview + Clickable Service Pages)

Create a Services overview page for this Next.js App Router site.

Target file:

- `app/(marketing)/services/page.tsx`

## Goals

- Match the visual style of the home page.
  - Use the same spacing: `mx-4 md:mx-8 lg:mx-16` and
    `container mx-auto px-4 lg:px-12`.
  - Use only existing theme tokens (`bg-background`, `text-foreground`,
    `text-muted-foreground`, `bg-muted`, `border-border`, `bg-card`, etc.).
  - Use existing radii (`rounded-4xl`, `rounded-3xl`).
- Present a clear, general overview of services.
- Each service must be clickable and link to a dedicated route like
  `/services/landscaping`.
- Keep scope minimal: no extra filters, search, or complex UI.

## Page Structure

### 1) Header section

- Pill label: `Services`
- Title: `Our Services`
- Supporting paragraph: 1–2 sentences explaining you offer gardening/landscaping
  and tailored maintenance.

### 2) Services grid

- Render a responsive grid of service cards (1 col mobile, 2 cols tablet, 3 cols
  desktop).
- Each card:
  - Uses `Card` / `CardContent` from `components/ui/card`.
  - Has an icon (lucide-react) in `text-primary`.
  - Has a service title + 1–2 sentence description.
  - Entire card is a clickable `Link` to its route.
  - Has subtle hover state consistent with the site (e.g.
    border/translate/shadow changes using existing tokens; no new colors).

Services to include (minimum set):

- Landscaping → `/services/landscaping`
- Lawn Care → `/services/lawn-care`
- Garden Maintenance → `/services/garden-maintenance`
- Hedge Trimming → `/services/hedge-trimming`
- Mulching → `/services/mulching`
- Seasonal Cleanup → `/services/seasonal-cleanup`
- Irrigation & Drainage → `/services/irrigation-drainage`
- Planting → `/services/planting`

### 3) Simple CTA section

- Add a theme-matched CTA card near the bottom (similar feel to other sections)
  with:
  - Short heading: `Not sure what you need?`
  - Supporting text: encourage contacting for advice.
  - Two buttons:
    - Primary: `Get a Quote` → `/quote`
    - Outline: `Contact Us` → `/contact`
- Do not add extra graphics beyond existing patterns.

## Routing Requirements

- Create placeholder service detail pages using a dynamic route:
  - `app/(marketing)/services/[slug]/page.tsx`
- The detail page should:
  - Read the `slug` param.
  - Render a title based on the slug (basic formatting is fine).
  - Show a short placeholder description.
  - Include a back link to `/services`.
  - Keep styling consistent with the site.

## Accessibility

- Card links must have visible focus states.
- Use semantic headings (`h1` on the page, `h2` for section titles).

## Output

Provide final code changes for:

- `app/(marketing)/services/page.tsx`
- `app/(marketing)/services/[slug]/page.tsx`

Do not add extra pages, filters, tabs, or animations.

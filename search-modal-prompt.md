# Navbar Search Expand + Results Modal Prompt

Update the navbar search icon so it expands into an input, and add a modal that
shows search results on screen. Keep everything consistent with the existing
design system (Tailwind + theme tokens like `bg-background`, `text-foreground`,
`text-muted-foreground`, `border`, `ring`, etc.).

## Scope / Constraints

- Only implement the search UX described here.
- Do not add new pages.
- Do not add extra filters, categories, or advanced search features.
- Respect accessibility: keyboard, focus management, ARIA.

## Desired UX

### 1) Expand-in-place input (navbar)

- Default state: show the search icon button (the existing
  `<button aria-label="Search">`).
- On click:
  - The icon transitions into a compact search input that expands horizontally
    (smooth width transition).
  - The input appears **in the same navbar area** (no layout jump).
  - The input receives focus immediately.
  - Placeholder text: `Search...`
- Collapse behavior:
  - If the input is empty and the user presses `Escape`, collapse back to the
    icon.
  - If the input loses focus and is empty, collapse back to the icon.
  - If the input contains text, keep it open until the user clears or closes.

### 2) Results modal

- When the user focuses the search input or types at least 1 character, open a
  modal overlay.
- The modal should:
  - Dim the background (`bg-black/40` or equivalent) and center a results panel.
  - Display the current query at the top (e.g. “Results for: <query>”).
  - Show a scrollable list of results.
  - Support empty state: “No results found.”
  - Support loading state while searching.
- Close modal on:
  - `Escape`
  - Clicking outside the modal (overlay)
  - A close button in the modal header (icon button)

### 3) Keyboard interactions

- Input is focusable and has visible focus styles.
- When the modal opens, focus should move into the modal (keep it simple: focus
  stays on input if the input is inside the modal header, otherwise focus first
  focusable element).
- Modal must trap focus while open.
- Arrow keys navigate results (optional but preferred). Minimal acceptable:
  - `Tab` navigates through results links.
  - `Enter` activates the highlighted/first result.

### 4) What counts as a “result”

Use a simple in-memory data set first (MVP), then allow easy replacement with
real data later.

- Start with a local array of pages:
  - Home (`/`)
  - About (`/about`)
  - Services (`/services`)
  - Projects (`/projects`)
  - Contact (`/contact`)
  - Quote (`/quote`)
  - Appointment (`/appointment`)
- Matching: case-insensitive substring match on title.

## Implementation Requirements

### Components / Files

- Implement a `NavbarSearch` client component and use it inside
  `components/layout/Navbar.tsx`.
- Keep state localized to the search component.

### Modal implementation

- Prefer using Radix + shadcn patterns:
  - If available, use a shadcn `Dialog` wrapper (Radix Dialog under the hood).
  - If not available, add `@radix-ui/react-dialog` and create
    `components/ui/dialog.tsx` in shadcn style.
- Do not implement a custom focus trap by hand if you use Radix Dialog.

### Styling

- Input:
  - Use `bg-background`, `border-border`, `text-foreground`,
    `placeholder:text-muted-foreground`.
  - Rounded corners consistent with the rest of the site.
  - Animate width (e.g. `transition-[width] duration-200 ease-out`).
- Modal panel:
  - `bg-popover text-popover-foreground`, `border`, `rounded-xl`, subtle
    `shadow`.
  - Max width (e.g. `max-w-lg`) and responsive padding.

### Performance / Behavior

- Debounce searching by ~150–250ms.
- No network calls in MVP.

## Acceptance Criteria

- Clicking the search icon expands into an input and focuses it.
- Typing opens a modal and displays matching results.
- Results are clickable Links that navigate and close the modal.
- `Escape` closes the modal and (if input is empty) collapses back to the icon.
- Works on mobile and desktop.
- Respects `prefers-reduced-motion` (reduced motion should disable the width
  animation and any other transitions).

## Output

Provide the final code changes for:

- `components/layout/Navbar.tsx`
- New component file(s) used for search + modal
- Any new shadcn/Radix UI primitive files added (only if required)

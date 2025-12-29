# Top Banner Prompt

Create a top banner/announcement bar for a gardening/landscaping website with
the following specifications:

## Overall Design

- Full-width banner bar above the main navigation
- Bright green background (approximately #22c55e or #16a34a)
- White text for high contrast
- Compact height (approximately 40-50px)
- Optional: Dismissible with a close button

## Layout

- Two-column layout: left-aligned content and right-aligned content
- Responsive: Stack or hide on mobile devices

## Left Side Content

- Location icon followed by text: "Apple St, New York, NY 10012, USA"
  - Icon should be a simple location pin/marker
  - Icon and text should be vertically aligned
- Separator (vertical line or space)
- Calendar icon followed by text: "Make An Appointment"
  - Icon should be a simple calendar
  - Should be clickable/linked
  - Hover effect (slight brightness change or underline)

## Right Side Content

- Multiple links/buttons arranged horizontally:
  - "Messages"
  - "Favorites"
  - "Sign in or Register"
  - "Get A Quote" button with clock/time icon
    - This should be more prominent (possibly slightly different styling)
    - Icon positioned to the left of text

## Styling Details

- Font size: Small to medium (0.875rem to 0.9375rem)
- Font weight: Medium (500)
- All text in white color
- Icons should be white and approximately 16-18px
- Spacing between items: Consistent (1.5-2rem)
- Links should have hover effects:
  - Slight opacity change or underline
  - Smooth transitions

## Interactive Elements

- All links should be clickable
- "Make An Appointment" should link to booking page
- "Get A Quote" should be more prominent (possibly with subtle background or
  border)
- Hover states for all interactive elements
- Optional: Add a subtle animation on page load

## Responsive Behavior

- Desktop: Show all items in full horizontal layout
- Tablet: Show essential items, hide less critical ones
- Mobile: Show only the most important item (e.g., "Get A Quote") or hide
  entirely

## Technical Requirements

- Built with React/Next.js components
- Use Tailwind CSS for styling
- Implement proper link handling (Next.js Link component)
- Add smooth transitions for hover states
- Ensure proper contrast ratios (white on green should pass WCAG AA)
- Use semantic HTML (header or div with appropriate role)
- Icons from a consistent icon library (Lucide, Heroicons, or similar)

## Optional Features

- Dismiss button (X icon) on the far right
  - Should hide the banner when clicked
  - Store preference in localStorage to keep it hidden
- Marquee/scrolling text for announcements
- Rotating messages (multiple announcements cycling through)

## Accessibility

- Proper ARIA labels for icons
- Keyboard accessible
- Focus indicators for all interactive elements
- High contrast between text and background
- Screen reader friendly

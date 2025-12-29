# Navigation Bar Prompt

Create a navigation bar for a gardening/landscaping website with the following
specifications:

## Overall Layout

- Full-width, sticky navigation bar
- White background
- Horizontal layout with items distributed across the width
- Shadow or subtle border at the bottom for separation
- Should stick to top when scrolling

## Logo Section (Left Side)

- Logo icon: Green leaf/clover symbol in a geometric shape
- Company name: "Lawnella" in bold, dark text
- Tagline: "Corner of Nature" in smaller, lighter text below the name
- Logo and text should be clickable and link to homepage

## Navigation Menu (Center)

- Horizontal menu with the following items:
  - Home (with dropdown indicator)
  - Pages (with dropdown indicator)
  - Services (with dropdown indicator)
  - Projects (with dropdown indicator)
  - Blog (with dropdown indicator)
  - Shop (with dropdown indicator)
  - Contact
- Each item with dropdown should have a small downward arrow/chevron icon
- Dropdown menus should appear on hover/click
- Menu items should have:
  - Medium font weight
  - Dark text color (approximately #1a1a1a)
  - Hover state with green underline or color change
  - Smooth transitions

## Right Side Actions

- Shopping cart icon with notification badge showing "0"
  - Badge should be a small green circle with white number
  - Positioned at top-right of cart icon
- Search icon (magnifying glass)
- Primary CTA button: "Let's Talk" with arrow icon
  - Bright green background (matching brand color #4ade80)
  - White text
  - Rounded corners
  - Hover effects (slightly darker green)
- Grid/menu icon (possibly for mobile menu or additional options)
  - 4 dots in a square pattern

## Responsive Behavior

- On desktop: Show all items in horizontal layout
- On tablet: Collapse menu items into hamburger menu
- On mobile: Show logo, hamburger menu, and essential icons only

## Technical Requirements

- Built with React/Next.js components
- Use Tailwind CSS for styling
- Implement dropdown menus with proper accessibility (keyboard navigation)
- Add smooth transitions for hover states
- Use z-index to ensure dropdowns appear above content
- Make sticky with `position: sticky` or `position: fixed`
- Add backdrop blur effect when dropdowns are open (optional)

## Styling Details

- Height: Approximately 80-90px
- Padding: Generous horizontal padding (3-4rem on desktop)
- Logo height: Approximately 40-50px
- Font family: Modern sans-serif (Inter, Poppins, or similar)
- Spacing between menu items: Consistent, approximately 2rem
- Button padding: Medium padding for comfortable click targets
- Icons should be consistent size (20-24px)

## Accessibility

- Proper ARIA labels for all interactive elements
- Keyboard navigation support
- Focus indicators for keyboard users
- Semantic HTML (nav, ul, li elements)
- Screen reader friendly dropdown menus

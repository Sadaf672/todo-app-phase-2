# Design Guidelines Specification

## Color Palette
- **Primary**: #3B82F6 (Blue-500) - Used for primary buttons, links, and key interactive elements
- **Primary Dark**: #2563EB (Blue-600) - Hover state for primary elements
- **Secondary**: #6B7280 (Gray-500) - Used for secondary buttons and non-critical elements
- **Accent**: #10B981 (Emerald-500) - Used for success states and positive actions
- **Warning**: #F59E0B (Amber-500) - Used for warnings and cautionary elements
- **Danger**: #EF4444 (Red-500) - Used for errors and destructive actions
- **Background**: #F9FAFB (Gray-50) - Main background color
- **Surface**: #FFFFFF - Card and modal backgrounds
- **Text Primary**: #1F2937 (Gray-800) - Main text color
- **Text Secondary**: #6B7280 (Gray-500) - Secondary text and muted information

## Typography
- **Font Family**: Inter (with system font fallbacks)
- **Heading H1**: 2.5rem (40px), font-weight 700 - Page titles
- **Heading H2**: 2rem (32px), font-weight 600 - Section titles
- **Heading H3**: 1.5rem (24px), font-weight 600 - Subsection titles
- **Heading H4**: 1.25rem (20px), font-weight 600 - Component titles
- **Body Large**: 1.125rem (18px), font-weight 400 - Important body text
- **Body Regular**: 1rem (16px), font-weight 400 - Standard body text
- **Body Small**: 0.875rem (14px), font-weight 400 - Secondary information
- **Caption**: 0.75rem (12px), font-weight 400 - Labels and helper text
- **Button Text**: 1rem (16px), font-weight 500 - For primary actions

## Spacing and Layout Scale
- **Base Unit**: 4px (used as multiplier)
- **Spacing Scale**: 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px)
- **Container Max Width**: 1200px for main content areas
- **Grid Gap**: 4 (16px) for main content grids
- **Component Padding**: 4-6 (16-24px) for cards and containers
- **Section Spacing**: 8-12 (32-48px) between major sections

## Component Consistency
- **Buttons**:
  - Primary: Rounded-lg, bg-blue-500, text-white, hover:bg-blue-600
  - Secondary: Rounded-lg, border, border-gray-300, bg-white, text-gray-700
  - Danger: Rounded-lg, bg-red-500, text-white, hover:bg-red-600
  - Size Variants: Small (py-1 px-3 text-sm), Medium (py-2 px-4 text-base), Large (py-3 px-6 text-lg)

- **Cards**:
  - Border: 1px solid #E5E7EB (Gray-200)
  - Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
  - Radius: Rounded-lg
  - Padding: 6 (24px)

- **Forms**:
  - Input fields: Rounded-md, border, border-gray-300, focus:ring-2 focus:ring-blue-500 focus:border-transparent
  - Label: Text-sm font-medium text-gray-700
  - Error state: Border-red-500, text-red-500 for error messages

## Shadows, Borders, and Transitions
- **Shadows**:
  - Default: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
  - Elevated: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
  - Modal: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

- **Borders**:
  - Default: 1px solid #E5E7EB (Gray-200)
  - Focus: 2px solid #3B82F6 (Blue-500)
  - Radius: Rounded-md for most elements, Rounded-lg for cards

- **Transitions**:
  - Default: 150ms ease-in-out
  - Hover states: 150ms ease-in-out
  - Modal open/close: 300ms ease-in-out
  - Loading states: 200ms ease-in-out

## Iconography Recommendations
- **Primary Set**: Heroicons (v1.0.6) - For consistency and quality
- **Alternative**: Phosphor Icons - For more variety if needed
- **Size Variants**: 4 (16px) for small icons, 5 (20px) for medium icons, 6 (24px) for large icons
- **Color**: Use text color classes (text-gray-500, text-blue-500, etc.) for consistency
- **Accessibility**: Always include aria-label or title for meaningful icons

## Micro-interactions and Animations
- **Button Hover**: Slight scale (1.02) and shadow increase
- **Loading States**: Smooth opacity transitions and skeleton animations
- **Form Validation**: Slide-down error messages with fade-in
- **Task Completion**: Strikethrough animation with color change
- **Modal Open/Close**: Fade-in with slight scale (0.95 to 1)
- **List Item Add/Remove**: Slide-in/out animations with height transitions

## Dark Mode/Light Mode Guidelines
- **Light Mode** (Default):
  - Background: #F9FAFB
  - Surface: #FFFFFF
  - Text: #1F2937

- **Dark Mode**:
  - Background: #111827 (Gray-900)
  - Surface: #1F2937 (Gray-800)
  - Text: #F9FAFB (Gray-50)
  - Secondary Text: #D1D5DB (Gray-300)

- **Implementation**: Use Tailwind's dark: prefix for dark mode variants
- **Toggle**: Include a theme switcher in the user profile area
- **Consistency**: Ensure all color variants maintain proper contrast ratios

## Mobile-First Design Rules
- **Touch Targets**: Minimum 44px for interactive elements
- **Navigation**: Bottom navigation on mobile, side navigation on desktop
- **Typography**: Slightly larger text sizes on mobile for readability
- **Spacing**: More generous spacing on mobile to prevent accidental touches
- **Forms**: Optimize for thumb-friendly interactions
- **Progressive Enhancement**: Ensure core functionality works without advanced features
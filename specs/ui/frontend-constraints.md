# Frontend Constraints Specification

## Styling Rules
- Use Tailwind CSS exclusively for styling (no inline CSS or custom CSS files)
- Follow the utility-first approach of Tailwind
- Create reusable component classes using @apply directive where appropriate
- Maintain consistent spacing and sizing using Tailwind's scale (0, 1, 2, 4, 8, 16, etc.)
- Use semantic class names that describe the purpose rather than appearance

## Accessibility Rules (a11y)
- All interactive elements must have proper ARIA labels
- Maintain sufficient color contrast (minimum 4.5:1 for normal text, 3:1 for large text)
- Ensure all functionality is accessible via keyboard navigation
- Use proper heading hierarchy (H1, H2, H3, etc.) for content structure
- Implement focus management for modal dialogs and dynamic content
- Provide alternative text for all meaningful images
- Use semantic HTML elements where appropriate (nav, main, section, etc.)

## Performance Constraints
- Implement code splitting using React.lazy for route-level components
- Use suspense boundaries for loading states during code splitting
- Implement image optimization with Next.js Image component
- Lazy load non-critical components and content
- Optimize bundle size by avoiding unnecessary dependencies
- Implement proper key attributes for lists to prevent unnecessary re-renders
- Use React.memo for components that rarely change but render frequently

## Error Boundary Usage
- Implement error boundaries at the route level to catch component errors
- Create a global error boundary for unhandled errors
- Display user-friendly error messages instead of technical stack traces
- Log errors for debugging purposes while maintaining user privacy
- Provide recovery options when possible (e.g., reload, return to safe state)

## Security Constraints (Tokens Handling)
- Store JWT tokens in httpOnly cookies (not in localStorage/sessionStorage)
- Never log or expose tokens in client-side code
- Implement proper token expiration handling
- Use HTTPS for all API communications
- Sanitize user inputs to prevent XSS attacks
- Implement CSRF protection where applicable

## Responsiveness Mandatory
- Design mobile-first with progressive enhancement
- Ensure all functionality is accessible on mobile devices
- Use appropriate touch target sizes (minimum 44px)
- Implement responsive navigation patterns (hamburger menu on mobile)
- Test layouts across common screen sizes (320px, 768px, 1024px, 1440px)
- Use relative units (%, rem, em) instead of fixed units where appropriate

## Modern Design Patterns Encouraged
- Implement micro-interactions for user feedback
- Use consistent loading states throughout the application
- Follow platform conventions for mobile and desktop experiences
- Implement progressive disclosure for complex interfaces
- Use appropriate animations for state transitions
- Follow established UX patterns for common interactions (form validation, modals, etc.)
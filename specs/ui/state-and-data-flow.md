# State and Data Flow Specification

## Where State Lives

### Server State
- User authentication data (JWT tokens, user profile)
- Todo data (title, description, completion status, timestamps)
- User preferences (theme, language, etc.)

### Client State
- UI state (modal open/close, loading indicators, form inputs)
- Temporary state (optimistic updates, local validation)
- Navigation state (current route, active tabs)
- Caching (recently fetched data to prevent unnecessary API calls)

## API Interaction Boundaries

### Authentication API
- `/api/auth/login` - POST for login
- `/api/auth/register` - POST for registration
- `/api/auth/logout` - POST for logout
- All requests include JWT in Authorization header
- Responses return updated JWT on successful auth operations

### Todo API
- `/api/todos` - GET for all user todos, POST to create
- `/api/todos/{id}` - GET, PUT, DELETE for specific todo
- All requests include JWT in Authorization header
- Responses return full todo objects with updated data

## Optimistic/Pessimistic Updates

### Optimistic Updates
- Used for: Todo completion toggles, title updates
- Implementation: Update UI immediately, revert on API failure
- Reason: Provides instant feedback for common actions
- Error handling: Revert to previous state and show error notification

### Pessimistic Updates
- Used for: Todo creation, deletion, critical operations
- Implementation: Wait for API success before updating UI
- Reason: Ensures data integrity for irreversible actions
- Error handling: Show error notification without reverting UI

## Loading & Error Handling Patterns

### Loading States
- Global: Full-page spinner overlay for initial data load
- Component: Skeleton loaders for specific sections
- Button: Loading spinner with disabled state
- List: Skeleton placeholders while fetching data

### Error Handling
- Network errors: Show user-friendly message with retry option
- Validation errors: Inline field-specific messages
- Server errors: Generic error notification with support contact
- Authentication errors: Redirect to login with error message

## State Separation for UI Smoothness & Performance

### Separation Strategy
- UI State: Managed in React components using useState, useReducer
- Server State: Managed with React Query/SWR for caching and synchronization
- Global State: Minimal use of context for authentication state only

### Performance Considerations
- Debounce search inputs to prevent excessive API calls
- Implement pagination for large todo lists
- Use React.memo for expensive components that rarely change
- Lazy load non-critical components with React.lazy
- Implement suspense boundaries for loading states

### Avoiding UI Jank
- Preload critical resources during initial load
- Use CSS transforms and opacity for animations (avoid layout thrashing)
- Implement proper key attributes for list items to prevent re-renders
- Use virtualization for large lists to maintain performance
- Implement proper error boundaries to prevent app crashes
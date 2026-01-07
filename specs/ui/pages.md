# Pages Specification

## Public Pages

### Login Page (`/login`)
- **Purpose**: Allow existing users to authenticate
- **Layout**: Centered form with email/password fields and login button
- **Mobile Layout**: Single column form with appropriately sized touch targets
- **UX Patterns**: Form validation, loading state for submission, "Forgot password?" link
- **Access Rule**: Available to unauthenticated users only
- **Redirect Behavior**: On successful login, redirect to dashboard (`/dashboard`)

### Register Page (`/register`)
- **Purpose**: Allow new users to create an account
- **Layout**: Centered form with name, email, password fields and register button
- **Mobile Layout**: Single column form with appropriately sized touch targets
- **UX Patterns**: Form validation, password strength indicator, loading state for submission
- **Access Rule**: Available to unauthenticated users only
- **Redirect Behavior**: On successful registration, redirect to dashboard (`/dashboard`)

## Protected Pages

### Dashboard Page (`/dashboard`)
- **Purpose**: Main application interface showing user's todos
- **Layout**: 
  - Desktop: Sidebar navigation on left, main content area on right
  - Mobile: Bottom navigation, main content area
- **UX Patterns**: 
  - Cards for todo items
  - Search/filter functionality
  - Empty state when no todos exist
  - Loading skeletons during data fetch
- **Access Rule**: Available to authenticated users only
- **Redirect Behavior**: If unauthenticated, redirect to login (`/login`)

### Tasks Page (`/tasks`)
- **Purpose**: Detailed view of all user tasks
- **Layout**: 
  - Desktop: Grid or list view of tasks with filtering options
  - Mobile: List view with swipe actions
- **UX Patterns**: 
  - Infinite scroll or pagination
  - Bulk actions (select multiple tasks)
  - Sorting options
- **Access Rule**: Available to authenticated users only
- **Redirect Behavior**: If unauthenticated, redirect to login (`/login`)

## App Router Layout Structure

```
app/
├── layout.tsx (Root layout with metadata)
├── page.tsx (Landing page - redirects to login if unauthenticated)
├── login/
│   └── page.tsx
├── register/
│   └── page.tsx
├── dashboard/
│   ├── layout.tsx (Protected layout with navigation)
│   └── page.tsx
└── tasks/
    ├── layout.tsx (Protected layout with navigation)
    └── page.tsx
```

## Route-Level Access Rules

- Public routes: `/login`, `/register`, `/`
- Protected routes: `/dashboard`, `/tasks`, and any future user-specific routes
- If unauthenticated user accesses protected route, redirect to `/login`
- If authenticated user accesses public auth route (like `/login`), redirect to `/dashboard`

## Redirect Behavior

- Successful login/registration → `/dashboard`
- Unauthenticated access to protected route → `/login`
- Already authenticated user accessing `/login` or `/register` → `/dashboard`
- 404 errors → Custom error page with navigation options
- Server errors → Error boundary with user-friendly message
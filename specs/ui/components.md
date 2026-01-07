# Components Specification

## Navbar Component

- **Purpose**: Navigation between application sections
- **Props** (typed):
  - `user: User | null` - Current user information
  - `onLogout: () => void` - Callback for logout action
- **State responsibility**: None (pure UI component)
- **Server vs Client component**: Client component (handles logout action)
- **Accessibility features**: 
  - ARIA labels for navigation elements
  - Proper focus management
  - Keyboard navigation support
- **Responsive behavior**:
  - Desktop: Horizontal navigation with user profile dropdown
  - Mobile: Hamburger menu that expands to vertical list
- **Suggested Tailwind classes**: `bg-white border-b border-gray-200 shadow-sm`
- **UX micro-interactions**:
  - Hover: Subtle background color change
  - Active: Highlighted current page
  - Dropdown: Smooth open/close animation

## Task List Component

- **Purpose**: Display a list of tasks with filtering and sorting options
- **Props** (typed):
  - `tasks: Task[]` - Array of tasks to display
  - `onTaskUpdate: (task: Task) => void` - Callback when task is updated
  - `onTaskDelete: (taskId: string) => void` - Callback when task is deleted
  - `isLoading: boolean` - Whether data is loading
- **State responsibility**: None (pure display component)
- **Server vs Client component**: Client component (handles UI interactions)
- **Accessibility features**:
  - Proper heading hierarchy
  - ARIA roles for list and list items
  - Keyboard navigation for task actions
- **Responsive behavior**:
  - Desktop: Grid layout with multiple columns
  - Mobile: Single column list with swipe actions
- **Suggested Tailwind classes**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
- **UX micro-interactions**:
  - Hover: Subtle shadow increase
  - Loading: Skeleton placeholders
  - Empty state: Friendly illustration with call-to-action

## Task Item Component

- **Purpose**: Display individual task with title, description, and status
- **Props** (typed):
  - `task: Task` - The task to display
  - `onToggleComplete: (taskId: string) => void` - Toggle completion status
  - `onEdit: (task: Task) => void` - Open edit form
  - `onDelete: (taskId: string) => void` - Delete the task
- **State responsibility**: None (pure display component)
- **Server vs Client component**: Client component (handles UI interactions)
- **Accessibility features**:
  - Proper checkbox labeling for completion
  - ARIA attributes for status changes
  - Focus management for action buttons
- **Responsive behavior**:
  - Desktop: Full information display
  - Mobile: Condensed view with action icons
- **Suggested Tailwind classes**: `bg-white rounded-lg shadow p-4 flex items-start`
- **UX micro-interactions**:
  - Hover: Slight elevation increase
  - Complete: Strikethrough animation
  - Delete: Confirmation modal with animation

## Task Form Component

- **Purpose**: Create or edit a task with title, description, and other properties
- **Props** (typed):
  - `initialData?: Task` - Initial values for editing (optional)
  - `onSubmit: (task: Omit<Task, 'id'> | Partial<Task>) => void` - Submit handler
  - `onCancel: () => void` - Cancel handler
- **State responsibility**: Form state management (title, description, etc.)
- **Server vs Client component**: Client component (handles form state)
- **Accessibility features**:
  - Proper form labeling
  - Error message association
  - Focus management after submission
- **Responsive behavior**:
  - Desktop: Full-width form with multiple fields
  - Mobile: Single-column layout with appropriate spacing
- **Suggested Tailwind classes**: `bg-white rounded-lg shadow p-6`
- **UX micro-interactions**:
  - Input focus: Subtle border color change
  - Validation: Real-time feedback
  - Submit: Loading state with spinner

## Auth Forms Component (Login/Register)

- **Purpose**: Handle user authentication and registration
- **Props** (typed):
  - `type: 'login' | 'register'` - Form type to display
  - `onSubmit: (credentials: {email: string, password: string, name?: string}) => void` - Submit handler
  - `onSwitchMode: () => void` - Switch between login/register
- **State responsibility**: Form inputs (email, password, name)
- **Server vs Client component**: Client component (handles form state)
- **Accessibility features**:
  - Proper form labeling
  - Error message association
  - Focus management after submission
- **Responsive behavior**:
  - Desktop: Centered card with appropriate width
  - Mobile: Full-width card with proper spacing
- **Suggested Tailwind classes**: `bg-white rounded-xl shadow-lg p-8 max-w-md w-full`
- **UX micro-interactions**:
  - Input focus: Subtle border color change
  - Validation: Real-time feedback
  - Submit: Loading state with spinner

## Loading/Errors Component

- **Purpose**: Display loading states and error messages consistently
- **Props** (typed):
  - `isLoading: boolean` - Whether to show loading state
  - `error?: string | null` - Error message to display (optional)
  - `size?: 'sm' | 'md' | 'lg'` - Size variant (optional, default 'md')
- **State responsibility**: None (pure display component)
- **Server vs Client component**: Client component (display-only)
- **Accessibility features**:
  - ARIA live regions for dynamic updates
  - Proper role attributes for loading indicators
- **Responsive behavior**: Consistent across all screen sizes
- **Suggested Tailwind classes**: `flex justify-center items-center`
- **UX micro-interactions**: Smooth transitions between states

## Modals Component

- **Purpose**: Display important information or confirmations in an overlay
- **Props** (typed):
  - `isOpen: boolean` - Whether modal is visible
  - `title: string` - Modal title
  - `children: React.ReactNode` - Modal content
  - `onClose: () => void` - Close handler
  - `actions?: React.ReactNode` - Action buttons (optional)
- **State responsibility**: None (controlled component)
- **Server vs Client component**: Client component (handles UI interactions)
- **Accessibility features**:
  - Proper focus trapping
  - ARIA attributes for modal
  - Escape key to close
- **Responsive behavior**:
  - Desktop: Centered modal with fixed width
  - Mobile: Full-width modal with appropriate padding
- **Suggested Tailwind classes**: `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`
- **UX micro-interactions**:
  - Open/close: Fade and scale animation
  - Background: Dim effect

## Buttons Component

- **Purpose**: Consistent button styling across the application
- **Props** (typed):
  - `variant: 'primary' | 'secondary' | 'danger' | 'ghost'` - Button style
  - `size: 'sm' | 'md' | 'lg'` - Button size
  - `isLoading?: boolean` - Show loading state (optional)
  - `disabled?: boolean` - Disable button (optional)
  - `children: React.ReactNode` - Button content
  - `onClick: () => void` - Click handler
- **State responsibility**: None (pure display component)
- **Server vs Client component**: Client component (handles click)
- **Accessibility features**:
  - Proper button semantics
  - Focus management
  - ARIA attributes for loading state
- **Responsive behavior**: Consistent across all screen sizes
- **Suggested Tailwind classes**: `px-4 py-2 rounded font-medium`
- **UX micro-interactions**:
  - Hover: Subtle color change
  - Active: Slight press effect
  - Loading: Spinner with disabled appearance

## Alerts Component

- **Purpose**: Display important notifications to the user
- **Props** (typed):
  - `type: 'success' | 'error' | 'warning' | 'info'` - Alert type
  - `message: string` - Alert message
  - `isVisible: boolean` - Whether alert is visible
  - `onDismiss?: () => void` - Dismiss handler (optional)
- **State responsibility**: None (controlled component)
- **Server vs Client component**: Client component (handles UI interactions)
- **Accessibility features**:
  - ARIA live regions for dynamic updates
  - Proper role attributes
  - Focus management if dismissible
- **Responsive behavior**: Full-width on mobile, constrained width on desktop
- **Suggested Tailwind classes**: `p-4 rounded-lg flex items-start`
- **UX micro-interactions**:
  - Show/hide: Slide animation
  - Dismiss: Fade out effect
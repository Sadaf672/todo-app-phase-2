# UI Pages

## Overview
This document outlines the pages needed for the Hackathon II Todo App, including their layout and user flow.

## Pages

### Authentication Page (/)
**Purpose**: Landing page for unauthenticated users to sign up or sign in
**Components Used**:
- AuthLayout
- Input (for email and password)
- Button (for signup and signin)
- Alert (for error messages)

**Layout**:
- Centered card with signup/signin forms
- Tabs or separate sections for signup and signin
- Branding at the top
- Link to privacy policy/tos at the bottom

**User Flow**:
1. User visits the site
2. User chooses to sign up or sign in
3. User fills in credentials
4. On successful authentication, user is redirected to dashboard

### Dashboard/Tasks Page (/dashboard or /tasks)
**Purpose**: Main page for authenticated users to manage their tasks
**Components Used**:
- Header
- TaskForm (for creating new tasks)
- TaskList (for displaying tasks)
- Select (for filtering and sorting)
- LoadingSpinner (during API calls)

**Layout**:
- Header with user info and logout button at the top
- Task creation form below the header
- Filter/sort controls below the form
- Task list taking up the main content area
- Responsive grid for task cards

**User Flow**:
1. User navigates to dashboard
2. User sees all their tasks
3. User can filter tasks by status (all, pending, completed)
4. User can sort tasks (by creation date or title)
5. User can create new tasks using the form
6. User can interact with existing tasks (toggle completion, edit, delete)

### Task Edit Page (/tasks/:id/edit or Modal on Dashboard)
**Purpose**: Allow users to edit existing tasks
**Components Used**:
- Header
- TaskForm (pre-filled with task data)
- Button (for cancel/save)

**Layout Options**:
- **Option 1**: Separate page with full-screen form
- **Option 2**: Modal overlay on the dashboard page

**User Flow**:
1. User clicks "Edit" on a task card
2. Edit form appears (either as modal or separate page)
3. User modifies task details
4. User saves changes or cancels
5. Updated task appears in the task list

## Navigation Flow

### Unauthenticated User Flow
1. Visit homepage (/) → See signup/signin options
2. Choose signup or signin → Enter credentials
3. Successful authentication → Redirect to dashboard (/dashboard)

### Authenticated User Flow
1. Visit dashboard (/dashboard) → See all tasks
2. Create new task → Fill form and submit
3. View/filter tasks → Use filter controls
4. Edit task → Click edit button and modify
5. Delete task → Click delete button and confirm
6. Toggle completion → Click completion checkbox
7. Logout → Click logout button in header

## Responsive Design Considerations
- Mobile: Single column layout, touch-friendly buttons
- Tablet: May show 2-column task grid
- Desktop: Multi-column task grid with sidebar options

## Error Handling Pages
- 404 Page: For non-existent routes
- 401/403 Page: For unauthorized access attempts
- 500 Page: For server errors

## Loading States
- Global loading spinner during authentication
- Individual loading states for API operations (creating, updating, deleting tasks)
- Skeleton screens while data is loading
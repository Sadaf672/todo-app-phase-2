# UI Components

## Overview
This document outlines the reusable UI components needed for the Hackathon II Todo App. All components will be built with Tailwind CSS for consistent styling.

## Component List

### Header
**Description**: Navigation header component that appears on most pages
**Props**:
- `user`: Object containing user information (name, email)
- `onLogout`: Function to handle logout
**Features**: Displays user info and logout button

### AuthLayout
**Description**: Wrapper layout for authentication pages (signup/signin)
**Props**:
- `children`: Child components to render inside the layout
**Features**: Centered card layout with branding

### TaskCard
**Description**: Displays a single task with title, description, and completion status
**Props**:
- `task`: Task object with id, title, description, completed status
- `onToggleComplete`: Function to handle completion toggle
- `onEdit`: Function to handle edit action
- `onDelete`: Function to handle delete action
**Features**: Shows task details, completion checkbox, edit/delete buttons

### TaskList
**Description**: Container for displaying multiple TaskCards
**Props**:
- `tasks`: Array of task objects
- `onToggleComplete`: Function to handle completion toggle
- `onEdit`: Function to handle edit action
- `onDelete`: Function to handle delete action
**Features**: Renders multiple TaskCards, handles loading states

### TaskForm
**Description**: Form for creating or editing tasks
**Props**:
- `task`: Optional task object (for editing)
- `onSubmit`: Function to handle form submission
- `onCancel`: Function to handle cancel action
**Features**: Input fields for title and description, validation, submit/cancel buttons

### Button
**Description**: Reusable button component with consistent styling
**Props**:
- `variant`: String for button style ('primary', 'secondary', 'danger')
- `onClick`: Function to handle click
- `disabled`: Boolean to disable the button
- `children`: Content to display inside the button
**Features**: Different styling variants, disabled state

### Input
**Description**: Reusable input component with consistent styling
**Props**:
- `label`: String for input label
- `type`: String for input type ('text', 'email', 'password', etc.)
- `value`: Current input value
- `onChange`: Function to handle value changes
- `error`: Optional error message to display
**Features**: Label, input field, error message display

### Select
**Description**: Reusable select dropdown component
**Props**:
- `label`: String for select label
- `value`: Current selected value
- `onChange`: Function to handle selection changes
- `options`: Array of option objects with value and label
- `error`: Optional error message to display
**Features**: Label, dropdown, error message display

### Modal
**Description**: Reusable modal component for dialogs
**Props**:
- `isOpen`: Boolean to control modal visibility
- `onClose`: Function to handle modal close
- `title`: String for modal title
- `children`: Content to display inside the modal
**Features**: Overlay, centered content, close functionality

### LoadingSpinner
**Description**: Visual indicator for loading states
**Props**: None
**Features**: Animated spinner to indicate loading

### Alert
**Description**: Display messages to the user (success, error, warning)
**Props**:
- `type`: String for alert type ('success', 'error', 'warning', 'info')
- `message`: String for the alert message
**Features**: Different styling for different message types

## Styling Notes
- All components use Tailwind CSS utility classes for styling
- Consistent color palette and typography throughout the application
- Responsive design principles applied to all components
- Accessibility considerations (keyboard navigation, screen readers) implemented
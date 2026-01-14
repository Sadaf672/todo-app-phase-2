# Task CRUD Operations

## User Stories

### Create Task (Priority: P1)
Users must be able to create new tasks with a title and optional description.

**Why this priority**: Essential functionality for a todo app - users need to add tasks to manage them.

**Independent Test**: User can navigate to the task creation form, enter a title, submit the form, and see the new task appear in their task list.

**Acceptance Scenarios**:
1. **Given** user is logged in and on the task creation page, **When** user enters a title between 1-200 characters and submits, **Then** the task is created and appears in their task list
2. **Given** user is logged in and on the task creation page, **When** user enters a title and optional description (max 1000 characters) and submits, **Then** the task is created with both title and description
3. **Given** user is logged in and on the task creation page, **When** user enters a title that exceeds 200 characters, **Then** an error message is displayed and task is not created

---

### View All Tasks (Priority: P1)
Users must be able to view all their tasks with options to filter by status and sort.

**Why this priority**: Essential functionality to see all tasks and manage them effectively.

**Independent Test**: User can navigate to the task list page and see all their tasks displayed with filtering and sorting options.

**Acceptance Scenarios**:
1. **Given** user is logged in and on the task list page, **When** user views the page, **Then** all tasks belonging to the user are displayed
2. **Given** user is on the task list page, **When** user selects "pending" filter, **Then** only incomplete tasks are displayed
3. **Given** user is on the task list page, **When** user selects "completed" filter, **Then** only completed tasks are displayed
4. **Given** user is on the task list page, **When** user selects "created" sort option, **Then** tasks are sorted by creation date (newest first)

---

### View Single Task (Priority: P2)
Users must be able to view details of a specific task.

**Why this priority**: Allows users to see detailed information about individual tasks.

**Independent Test**: User can click on a task in the list and see its detailed information on a separate page or modal.

**Acceptance Scenarios**:
1. **Given** user is logged in and viewing their task list, **When** user clicks on a specific task, **Then** the task details are displayed
2. **Given** user is viewing a task that belongs to another user, **When** user attempts to access it, **Then** a 404 error or access denied message is returned

---

### Update Task (Priority: P2)
Users must be able to edit existing tasks.

**Why this priority**: Allows users to modify task details as needed.

**Independent Test**: User can edit a task's title or description and save the changes.

**Acceptance Scenarios**:
1. **Given** user is logged in and viewing a task, **When** user edits the title or description and saves, **Then** the changes are persisted
2. **Given** user is logged in and viewing a task that belongs to another user, **When** user attempts to edit it, **Then** an access denied error is returned

---

### Delete Task (Priority: P2)
Users must be able to delete tasks they no longer need.

**Why this priority**: Essential functionality to remove completed or unwanted tasks.

**Independent Test**: User can delete a task and it disappears from their task list.

**Acceptance Scenarios**:
1. **Given** user is logged in and viewing a task, **When** user deletes the task, **Then** the task is removed from the database and task list
2. **Given** user is logged in and viewing a task that belongs to another user, **When** user attempts to delete it, **Then** an access denied error is returned

---

### Mark Task Complete/Incomplete (Priority: P2)
Users must be able to toggle the completion status of tasks.

**Why this priority**: Core functionality of a todo app - marking tasks as done.

**Independent Test**: User can toggle a task's completion status and see the change reflected in the UI.

**Acceptance Scenarios**:
1. **Given** user is logged in and viewing an incomplete task, **When** user toggles completion status, **Then** the task is marked as complete
2. **Given** user is logged in and viewing a complete task, **When** user toggles completion status, **Then** the task is marked as incomplete
3. **Given** user is logged in and viewing a task that belongs to another user, **When** user attempts to toggle its status, **Then** an access denied error is returned

## Requirements

### Functional Requirements
- **FR-001**: System MUST allow users to create tasks with a title (1-200 characters) and optional description (max 1000 characters)
- **FR-002**: System MUST validate task titles to be between 1-200 characters
- **FR-003**: System MUST validate task descriptions to be max 1000 characters if provided
- **FR-004**: System MUST store tasks with user_id to ensure per-user ownership
- **FR-005**: System MUST allow users to view all their tasks with filtering and sorting options
- **FR-006**: System MUST allow users to update their own tasks
- **FR-007**: System MUST allow users to delete their own tasks
- **FR-008**: System MUST allow users to toggle completion status of their own tasks
- **FR-009**: System MUST prevent users from accessing tasks that belong to other users

### Key Entities
- **Task**: Represents a user's todo item with title, description, completion status, and ownership
- **User**: Represents an authenticated user who owns tasks

## Success Criteria

### Measurable Outcomes
- **SC-001**: Users can create a new task in under 30 seconds
- **SC-002**: System displays all user's tasks within 2 seconds of page load
- **SC-003**: 95% of users successfully complete the task creation process on first attempt
- **SC-004**: Users can filter and sort tasks with less than 1 second delay
- **SC-005**: 100% of users can only access their own tasks (no cross-user access)
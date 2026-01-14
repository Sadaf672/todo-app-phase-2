# Data Model for Phase II Todo App

## Entities

### User
- **Fields**:
  - id: string (Primary Key) - Unique identifier for the user (managed by Better Auth)
  - email: string - User's email address
  - name: string - User's name
  - created_at: datetime - Timestamp when the account was created
- **Relationships**: One-to-many with Task (one user can have many tasks)
- **Validation**: Email must be valid format, unique across all users

### Task
- **Fields**:
  - id: integer (Primary Key, Auto-increment) - Unique identifier for the task
  - user_id: string (Foreign Key to users.id) - Links the task to its owner
  - title: string (NOT NULL) - Task title (1-200 characters)
  - description: string (NULLABLE) - Optional task description (max 1000 characters)
  - completed: boolean (NOT NULL, DEFAULT false) - Task completion status
  - created_at: datetime (NOT NULL) - Timestamp when the task was created
  - updated_at: datetime (NOT NULL) - Timestamp when the task was last updated
- **Relationships**: Many-to-one with User (many tasks belong to one user)
- **Validation**: Title must be 1-200 characters, description max 1000 characters if provided

## State Transitions

### Task State Transitions
- **Pending → Completed**: When user marks task as complete
- **Completed → Pending**: When user unmarks task as complete

## Indexes
- Primary Key index on `id` for both tables
- Foreign Key index on `user_id` in tasks table for efficient user-based queries
- Index on `completed` in tasks table for filtering completed/pending tasks

## Constraints
- Foreign key constraint: tasks.user_id references users.id
- Not null constraints on required fields
- Character length constraints on title and description fields
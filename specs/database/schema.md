# Database Schema

## Overview
The application uses Neon Serverless PostgreSQL for persistent storage. The database contains two main tables: users (managed by Better Auth) and tasks (application-specific).

## Tables

### users (Managed by Better Auth)
This table is managed by the Better Auth system and contains user account information.

**Columns**:
- `id`: string (Primary Key) - Unique identifier for the user
- `email`: string - User's email address
- `name`: string - User's name
- `created_at`: datetime - Timestamp when the account was created

### tasks
This table stores the todo tasks for each user.

**Columns**:
- `id`: integer (Primary Key, Auto-increment) - Unique identifier for the task
- `user_id`: string (Foreign Key to users.id) - Links the task to its owner
- `title`: string (NOT NULL) - Task title (1-200 characters)
- `description`: string (NULLABLE) - Optional task description (max 1000 characters)
- `completed`: boolean (NOT NULL, DEFAULT false) - Task completion status
- `created_at`: datetime (NOT NULL) - Timestamp when the task was created
- `updated_at`: datetime (NOT NULL) - Timestamp when the task was last updated

**Indexes**:
- Primary Key index on `id`
- Foreign Key index on `user_id` for efficient user-based queries
- Index on `completed` for filtering completed/pending tasks

## Relationships
- Each task belongs to exactly one user via the `user_id` foreign key
- Each user can own zero or more tasks
- The foreign key constraint ensures referential integrity

## Notes
- Neon Serverless PostgreSQL is used for automatic scaling and cost efficiency
- The users table schema is managed by Better Auth and may include additional fields for authentication purposes
- All timestamps are stored in UTC
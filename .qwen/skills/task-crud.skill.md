# Task CRUD Skill Specification

## Purpose
Handle database operations for task management including create, read, update, delete, and complete operations.

## Description
This skill provides the core database functionality for task management. It handles all CRUD operations while ensuring proper data validation and user isolation.

## Inputs
- **user_id**: The ID of the authenticated user
- **task_id**: Unique identifier for the task (for update/delete operations)
- **title**: Task title (required for create/update)
- **description**: Task description (optional for create/update)
- **status**: Task status (e.g., pending, completed)

## Operations
- **Create**: Create a new task with provided title, description, and associate with user_id
- **List**: Retrieve all tasks belonging to the authenticated user
- **Update**: Modify an existing task's title, description, or status
- **Delete**: Remove a task from the database
- **Complete**: Mark a task as completed

## User Isolation
- All operations must be scoped to the authenticated user
- Prevent users from accessing tasks belonging to other users
- Validate user ownership before performing operations

## Error Handling
- **400 Bad Request**: When input validation fails
- **403 Forbidden**: When user tries to access tasks not belonging to them
- **404 Not Found**: When requested task does not exist

## Usage in Phase-II
- Implement as FastAPI endpoints with SQLModel database operations
- Integrate with authentication to ensure proper user scoping
- Map HTTP methods to CRUD operations (POST for create, GET for list, PUT/PATCH for update, DELETE for delete)

## Usage in Phase-III
- Enable AI agents to perform task operations through MCP tools
- Provide consistent interface for agent-to-database interactions
- Maintain same validation and error handling as Phase-II APIs
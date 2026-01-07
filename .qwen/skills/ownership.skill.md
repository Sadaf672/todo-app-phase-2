# Ownership Skill Specification

## Purpose
Ensure that tasks belong to the authenticated user before allowing modification or deletion operations.

## Description
This skill validates that the authenticated user has permission to perform operations on a specific task. It checks the user_id associated with the task against the authenticated user's ID.

## Validation Logic
- Extract user_id from authenticated user object
- Retrieve task from database using task_id
- Compare the task's user_id with the authenticated user's user_id
- Allow operation if IDs match, deny if they don't

## Error Handling
- **403 Forbidden**: When the authenticated user does not own the task
- **Error Message**: Clear indication that the user does not have permission to perform the operation

## Usage in Update/Delete/Complete Flows
- Apply ownership validation before updating a task
- Apply ownership validation before deleting a task
- Apply ownership validation before marking a task as completed
- Ensure user cannot modify tasks belonging to other users

## Usage in Phase-II
- Implement as a dependency in FastAPI routes that modify tasks
- Integrate with authentication and database layers
- Use as a middleware or decorator to validate ownership

## Usage in Phase-III
- Enable AI agents to validate ownership before performing operations
- Provide consistent ownership checking for agent-initiated operations
- Maintain same validation logic as Phase-II APIs
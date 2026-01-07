# Validation Skill Specification

## Purpose
Validate task inputs to ensure data integrity and prevent invalid data from being stored in the database.

## Description
This skill provides input validation for task creation and updates, ensuring that all required fields meet specified criteria before processing.

## Validation Rules
- **Title Required**: Task title must be provided (not null or empty)
- **Title Length**: Task title must be between 1 and 200 characters inclusive
- **Description Length**: Task description, if provided, must not exceed 1000 characters
- **Data Format**: Ensure all inputs are in the correct format (string, etc.)

## Error Handling
- **400 Bad Request**: When input validation fails
- **Error Message**: Specific error message indicating which validation rule was violated
- **Validation Details**: Include information about what the expected format/length was

## Usage in API
- Apply validation before creating new tasks
- Apply validation before updating existing tasks
- Return appropriate error responses when validation fails
- Ensure database constraints are not violated

## Usage in AI Agents
- Enable AI agents to validate inputs before making API calls
- Provide consistent validation for agent-initiated operations
- Maintain same validation rules as API endpoints
- Help agents understand what constitutes valid input
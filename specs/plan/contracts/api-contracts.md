# API Contracts for Todo App

## Task API Endpoints

### GET /api/tasks
- **Description**: Retrieve all tasks for the authenticated user with optional filtering and sorting
- **Auth Required**: Yes (JWT Bearer token)
- **Query Parameters**:
  - status: Filter by task status (all|pending|completed) - default: all
  - sort: Sort order (created|title) - default: created
- **Response**: 200 OK with array of Task objects
- **Errors**: 401 Unauthorized, 500 Internal Server Error

### POST /api/tasks
- **Description**: Create a new task for the authenticated user
- **Auth Required**: Yes (JWT Bearer token)
- **Request Body**: TaskCreate object with title (required) and description (optional)
- **Response**: 201 Created with created Task object
- **Validation**: Title 1-200 chars, description max 1000 chars
- **Errors**: 400 Bad Request, 401 Unauthorized, 500 Internal Server Error

### GET /api/tasks/{id}
- **Description**: Retrieve a specific task by ID for the authenticated user
- **Auth Required**: Yes (JWT Bearer token)
- **Path Parameter**: id (integer) - Task ID
- **Response**: 200 OK with Task object
- **Errors**: 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error

### PUT /api/tasks/{id}
- **Description**: Update an existing task for the authenticated user
- **Auth Required**: Yes (JWT Bearer token)
- **Path Parameter**: id (integer) - Task ID
- **Request Body**: TaskUpdate object with title (required) and description (optional)
- **Response**: 200 OK with updated Task object
- **Validation**: Title 1-200 chars, description max 1000 chars
- **Errors**: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error

### DELETE /api/tasks/{id}
- **Description**: Delete a specific task for the authenticated user
- **Auth Required**: Yes (JWT Bearer token)
- **Path Parameter**: id (integer) - Task ID
- **Response**: 204 No Content
- **Errors**: 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error

### PATCH /api/tasks/{id}/complete
- **Description**: Toggle the completion status of a specific task for the authenticated user
- **Auth Required**: Yes (JWT Bearer token)
- **Path Parameter**: id (integer) - Task ID
- **Request Body**: Object with completed property (boolean)
- **Response**: 200 OK with updated Task object
- **Errors**: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error

## Authentication Endpoints

### POST /api/auth/signup
- **Description**: Register a new user
- **Auth Required**: No
- **Request Body**: Object with email and password
- **Response**: 200 OK with user info and JWT token
- **Errors**: 400 Bad Request, 500 Internal Server Error

### POST /api/auth/signin
- **Description**: Authenticate an existing user
- **Auth Required**: No
- **Request Body**: Object with email and password
- **Response**: 200 OK with user info and JWT token
- **Errors**: 400 Bad Request, 401 Unauthorized, 500 Internal Server Error

### POST /api/auth/logout
- **Description**: Log out the current user
- **Auth Required**: Yes (JWT Bearer token)
- **Response**: 200 OK
- **Errors**: 401 Unauthorized, 500 Internal Server Error

## Common Error Responses
- **400 Bad Request**: Validation error with details in response body
- **401 Unauthorized**: Invalid or missing JWT token
- **403 Forbidden**: User doesn't have permission to access the resource
- **404 Not Found**: Requested resource doesn't exist
- **500 Internal Server Error**: Server error with generic message

## Data Models

### Task Object
- id: integer - Unique identifier
- user_id: string - Owner's user ID
- title: string - Task title (1-200 chars)
- description: string (nullable) - Task description (max 1000 chars)
- completed: boolean - Completion status
- created_at: string (date-time) - Creation timestamp
- updated_at: string (date-time) - Last update timestamp

### TaskCreate Object
- title: string - Task title (1-200 chars)
- description: string (nullable) - Task description (max 1000 chars)

### TaskUpdate Object
- title: string - Task title (1-200 chars)
- description: string (nullable) - Task description (max 1000 chars)
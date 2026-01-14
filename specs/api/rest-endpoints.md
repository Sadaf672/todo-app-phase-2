# REST API Endpoints

## Base URL
All API endpoints are prefixed with `/api/`

**Note**: All endpoints except authentication require a valid JWT token in the Authorization header.

## Authentication Requirement
All endpoints (except authentication endpoints) require a JWT Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### GET /api/tasks
Retrieve all tasks for the authenticated user with optional filtering and sorting.

**Query Parameters**:
- `status`: Filter by task status (all|pending|completed) - default: all
- `sort`: Sort order (created|title) - default: created

**Request Example**:
```
GET /api/tasks?status=pending&sort=created
Authorization: Bearer <jwt_token>
```

**Response**:
```json
{
  "tasks": [
    {
      "id": 1,
      "user_id": "user123",
      "title": "Sample Task",
      "description": "Sample description",
      "completed": false,
      "created_at": "2026-01-08T10:00:00Z",
      "updated_at": "2026-01-08T10:00:00Z"
    }
  ]
}
```

### POST /api/tasks
Create a new task for the authenticated user.

**Request Example**:
```
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description (optional)"
}
```

**Request Validation**:
- `title`: Required, 1-200 characters
- `description`: Optional, max 1000 characters

**Response**:
```json
{
  "id": 1,
  "user_id": "user123",
  "title": "New Task",
  "description": "Task description (optional)",
  "completed": false,
  "created_at": "2026-01-08T10:00:00Z",
  "updated_at": "2026-01-08T10:00:00Z"
}
```

### GET /api/tasks/{id}
Retrieve a specific task by ID for the authenticated user.

**Request Example**:
```
GET /api/tasks/1
Authorization: Bearer <jwt_token>
```

**Response**:
```json
{
  "id": 1,
  "user_id": "user123",
  "title": "Sample Task",
  "description": "Sample description",
  "completed": false,
  "created_at": "2026-01-08T10:00:00Z",
  "updated_at": "2026-01-08T10:00:00Z"
}
```

### PUT /api/tasks/{id}
Update an existing task for the authenticated user.

**Request Example**:
```
PUT /api/tasks/1
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description"
}
```

**Request Validation**:
- `title`: Required, 1-200 characters
- `description`: Optional, max 1000 characters

**Response**:
```json
{
  "id": 1,
  "user_id": "user123",
  "title": "Updated Task",
  "description": "Updated description",
  "completed": false,
  "created_at": "2026-01-08T10:00:00Z",
  "updated_at": "2026-01-08T11:00:00Z"
}
```

### DELETE /api/tasks/{id}
Delete a specific task for the authenticated user.

**Request Example**:
```
DELETE /api/tasks/1
Authorization: Bearer <jwt_token>
```

**Response**:
```
Status: 204 No Content
```

### PATCH /api/tasks/{id}/complete
Toggle the completion status of a specific task for the authenticated user.

**Request Example**:
```
PATCH /api/tasks/1/complete
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "completed": true
}
```

**Response**:
```json
{
  "id": 1,
  "user_id": "user123",
  "title": "Sample Task",
  "description": "Sample description",
  "completed": true,
  "created_at": "2026-01-08T10:00:00Z",
  "updated_at": "2026-01-08T11:00:00Z"
}
```

## Error Responses
All error responses follow this format:
```json
{
  "detail": "Error message"
}
```

Common HTTP status codes:
- `400`: Bad Request (validation error)
- `401`: Unauthorized (invalid or missing JWT)
- `403`: Forbidden (user doesn't own the resource)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error
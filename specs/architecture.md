# Hackathon II Todo App - Architecture

## High-Level Architecture Diagram

```
[User Browser] 
     ↓ (HTTP/HTTPS)
[Next.js Frontend App]
     ↓ (API calls with JWT)
[FastAPI Backend Server]
     ↓ (Database queries)
[Neon Serverless PostgreSQL]
```

## Component Flow

### Frontend (Next.js) → API calls with JWT → Backend (FastAPI) → Neon DB
1. User interacts with the Next.js frontend application
2. Frontend makes authenticated API calls to the backend, including JWT in Authorization header
3. FastAPI backend validates JWT and processes the request
4. Backend queries Neon PostgreSQL database to perform operations
5. Response is sent back through the same chain to the user

### Authentication Flow with Better Auth + JWT
1. User accesses the application and is presented with signup/signin options
2. Better Auth handles user registration and login
3. Upon successful authentication, Better Auth issues a JWT token
4. Frontend stores the JWT token and includes it in the Authorization header for all subsequent API requests
5. FastAPI backend middleware intercepts requests, validates the JWT, and extracts the user_id
6. Backend enforces user isolation by ensuring users can only access their own data

### User Isolation Explanation
- Each task in the database has a `user_id` field that links it to a specific user
- All API endpoints verify that the authenticated user's ID matches the resource owner's ID
- Backend enforces this at the database level by filtering queries based on the authenticated user's ID
- This ensures strict data isolation between users
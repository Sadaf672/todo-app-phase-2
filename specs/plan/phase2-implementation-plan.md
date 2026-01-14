# Phase II Implementation Plan

## Overview
- Brief summary of Phase II goals: Build a modern multi-user full-stack web application with persistent storage using Next.js, FastAPI, Neon PostgreSQL, and Better Auth with JWT
- Key challenges: Better Auth + JWT integration between Next.js and FastAPI, user isolation, Neon DB setup

## Prerequisites & Setup
1. Monorepo structure verification
2. Environment variables setup (BETTER_AUTH_SECRET, DATABASE_URL, etc.)
3. Neon PostgreSQL database creation and connection string
4. Install dependencies in frontend and backend

## Implementation Phases (Strict Order)

### Phase 1: Foundation & Configuration
- Create root, frontend, and backend qwen.md files with guidelines
- Setup .spec-kit/config.yaml (already exists, verify)
- Configure docker-compose.yml for local development

### Phase 2: Backend Foundation
- Implement database connection (db.py, SQLModel engine)
- Create SQLModel models (@specs/database/schema.md)
- Basic FastAPI app setup with /health endpoint

### Phase 3: Authentication Integration (Critical)
- Implement JWT verification middleware in FastAPI (use PyJWT, shared BETTER_AUTH_SECRET)
- Create dependency to get current_user from JWT
- Test token verification independently

### Phase 4: Task CRUD API (@specs/api/rest-endpoints.md)
- Implement all 6 endpoints
- Enforce user ownership on every route using current_user
- Filtering, sorting, validation as per spec
- Error handling (401, 404, 403 for wrong user)

### Phase 5: Frontend Foundation
- Setup Next.js 16+ with App Router, TypeScript, Tailwind
- Configure Better Auth with JWT plugin enabled
- Create lib/api.ts client that automatically attaches JWT to requests

### Phase 6: Authentication UI (@specs/features/authentication.md + @specs/ui/pages.md)
- Login / Signup pages
- Protected routes (redirect if not authenticated)
- Session management

### Phase 7: Task Management UI (@specs/features/task-crud.md + @specs/ui/*)
- Dashboard page with task list
- Create task form/modal
- Task card component with edit, delete, toggle complete
- Filtering and sorting controls
- Responsive design

### Phase 8: Testing & Polish
- Manual testing of full flows (signup → create task → only own tasks visible)
- Error cases (access other user's task → 403/404)
- Responsive check on mobile
- README update with setup and run instructions

## Dependencies & Risks
- List dependencies between tasks (e.g., backend auth middleware before any route)
- Highlight risks: JWT secret mismatch, CORS issues, Neon connection

## Estimated Order of qwen Commands
Suggest the sequence of commands the developer should give to qwen, e.g.:
1. "Implement backend database models and connection @specs/database/schema.md"
2. "Implement JWT authentication middleware in backend"
3. "Implement @specs/api/rest-endpoints.md with user filtering"
4. etc.

## Success Criteria
- All API endpoints work with JWT and enforce user isolation
- Frontend fully functional with auth and task CRUD
- Data persists in Neon DB
- Clean, maintainable code following qwen.md guidelines
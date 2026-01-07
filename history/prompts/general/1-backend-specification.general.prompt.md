---
id: 1
title: "Backend Specification Creation"
stage: "spec"
date_iso: "2026-01-07"
surface: "agent"
model: "Qwen"
feature: "todo-backend"
branch: "1-todo-backend"
user: "LATITUDE"
command: "/sp.specify"
labels: ["specification", "backend", "todo-app"]
links:
  spec: "specs/001-todo-backend/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "specs/001-todo-backend/spec.md"
  - "specs/001-todo-backend/checklists/requirements.md"
  - "history/prompts/general/1-backend-specification.general.prompt.md"
tests_yaml: []
prompt_text: |
  $ARGUMENTS
  You are an expert backend engineer. Your task is to generate a COMPLETE, PRODUCTION-READY backend for a Hackathon Phase-2 Full-Stack Todo App, strictly following the specifications below. ======================== TECH STACK (MANDATORY) ======================== - Backend Framework: FastAPI (Python) - Database: PostgreSQL (Neon) - ORM: SQLAlchemy - Auth: JWT (Better Auth compatible) - Environment variables via .env - CORS enabled for Next.js frontend - REST API (NO GraphQL, NO MCP, NO agents) ======================== ENVIRONMENT VARIABLES ======================== Use ONLY environment variables (do not hardcode secrets): - Neon_db_url - BETTER_AUTH_URL - JWT_SECRET (create if missing) Example: DATABASE_URL = os.getenv("Neon_db_url") ======================== PROJECT STRUCTURE ======================== backend/ │── main.py │── database.py │── models.py │── schemas.py │── auth.py │── deps.py │── routes/ │ ├── auth.py │ └── todos.py │── requirements.txt │── .env │── README.md ======================== DATABASE MODELS ======================== User (logical, Better Auth managed): - id (string, from JWT subject) - email (string) Todo: - id (int, primary key) - user_id (string, indexed) - title (string, required) - description (text, optional) - completed (boolean, default false) - created_at (timestamp) - updated_at (timestamp) ======================== AUTHENTICATION RULES ======================== - Auth via JWT in HTTP header: Authorization: Bearer <token> - Token verification required for ALL todo routes - If token invalid or missing → return 401 - Extract user_id from JWT `sub` ======================== API ENDPOINTS (STRICT) ======================== Auth: - POST /auth/token - Input: email - Output: JWT token - (Mock login acceptable for Phase-2) Todos (ALL protected): - GET /api/todos - POST /api/todos - GET /api/todos/{id} - PUT /api/todos/{id} - PATCH /api/todos/{id}/complete - DELETE /api/todos/{id} Rules: - Users can ONLY access their own todos - Title is required - Proper HTTP status codes ======================== FRONTEND INTEGRATION (IMPORTANT) ======================== - Frontend: Next.js App Router - CORS must allow http://localhost:3000 - JSON responses only - No cookies (JWT only) - Compatible with fetch / axios ======================== NON-GOALS (DO NOT ADD) ======================== - No NextAuth - No MCP - No AI agents - No Kafka - No background jobs - No WebSockets ======================== OUTPUT REQUIREMENTS ======================== 1. Generate ALL backend files 2. Include requirements.txt 3. Include README.md with: - setup steps - how to run - example curl requests 4. Code must be clean, readable, and commented 5. Backend must run without modification ======================== COMPLETION CRITERIA ======================== The task is COMPLETE only if: - Server starts with `uvicorn main:app --reload` - JWT-protected todo CRUD works - Frontend can call APIs successfully - Data persists in Neon PostgreSQL When finished, clearly write at the end: ✅ BACKEND IMPLEMENTATION COMPLETED
response_text: |
  I have successfully created a feature specification for the backend implementation of the Full-Stack Todo App. Here's what was accomplished:

  1. Created a new branch named `1-todo-backend`
  2. Developed a comprehensive feature specification document at `specs/001-todo-backend/spec.md`
  3. Created a quality checklist at `specs/001-todo-backend/checklists/requirements.md`
  4. Validated that the specification meets all required criteria

  The specification is now ready for the next phase of development. You can proceed with either:
  - `/sp.clarify` to clarify any remaining requirements
  - `/sp.plan` to create a technical implementation plan
outcome: "Successfully created feature specification for the todo app backend implementation"
evaluation: "Specification meets all quality criteria and is ready for planning phase"
---
<!-- 
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- Modified principles: Added security-focused principles relevant to full-stack application
- Added sections: Authentication and Database principles
- Removed sections: None
- Templates requiring updates: N/A
- Follow-up TODOs: None
-->
# Hackathon II Todo App Constitution

## Core Principles

### I. Security-First Architecture
All features must implement proper authentication and authorization from the start; JWT tokens must be validated for every request; User data isolation is mandatory - no cross-user data access allowed.

### II. Full-Stack Consistency
Frontend and backend must use consistent technology stacks (Next.js 16+, TypeScript, FastAPI, SQLModel); Shared specifications must be referenced across both layers (@specs/ references); Same BETTER_AUTH_SECRET must be used in both frontend and backend.

### III. Spec-Driven Development (NON-NEGOTIABLE)
All features must be implemented according to specifications in @specs/ directory; No implementation without corresponding spec documentation; Changes to implementation must be reflected in specs.

### IV. Test-First Approach
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced; All CRUD operations must have corresponding tests.

### V. Responsive Design and User Experience
All UI components must be responsive using Tailwind CSS; User interface must follow modern design principles; Task dashboard must provide intuitive CRUD operations.

## Authentication Requirements
- Better Auth with JWT plugin for user management
- Frontend API client automatically attaches JWT to every request
- FastAPI middleware verifies JWT, extracts user_id, enforces ownership on all operations
- No request without valid token or wrong user_id allowed

## Database and API Standards
- SQLModel for ORM operations
- Neon Serverless PostgreSQL for persistent storage
- REST API endpoints following specified patterns with proper authentication
- All tasks must belong to specific user with strict isolation

## Development Workflow
- Monorepo structure with frontend/ and backend/ directories
- Reference relevant specs throughout implementation
- Prioritize security and correct user isolation
- Use TypeScript for type safety in frontend
- Follow App Router patterns in Next.js

## Governance
Constitution supersedes all other practices; Amendments require documentation and approval; All PRs/reviews must verify compliance with security and authentication requirements; Complexity must be justified with reference to specs.

**Version**: 1.1.0 | **Ratified**: 2025-01-08 | **Last Amended**: 2026-01-08
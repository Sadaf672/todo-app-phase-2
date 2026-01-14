# Phase II - Actionable Tasks

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create monorepo structure with frontend/ and backend/ directories
- [X] T002 [P] Create root qwen.md with project overview and how to use specs @specs/overview.md
- [X] T003 [P] Create backend/qwen.md with FastAPI guidelines @specs/architecture.md
- [X] T004 [P] Create frontend/qwen.md with Next.js guidelines @specs/architecture.md
- [X] T005 Create docker-compose.yml for local development @specs/architecture.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Setup backend database connection backend/db.py with SQLModel engine using DATABASE_URL env var @specs/database/schema.md
- [X] T007 [P] Create database models in backend/models/task_model.py following @specs/database/schema.md
- [X] T008 [P] Install and configure JWT authentication dependencies in backend @specs/features/authentication.md
- [X] T009 Create JWT verification middleware in backend/auth.py using BETTER_AUTH_SECRET @specs/features/authentication.md
- [X] T010 Create get_current_user dependency that returns user_id from token in backend/auth.py @specs/features/authentication.md
- [X] T011 Setup basic FastAPI app structure in backend/main.py with /health endpoint @specs/api/rest-endpoints.md
- [X] T012 Configure CORS middleware in backend for frontend access (allow localhost:3000) @specs/api/rest-endpoints.md

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Registration and Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable users to register, login, and securely access the application with proper authentication

**Independent Test**: User can navigate to the application, register with email/password, log in, and access protected resources.

### Implementation for User Story 1

- [X] T013 [P] [US1] Configure Better Auth in backend with JWT plugin enabled @specs/features/authentication.md
- [X] T014 [P] [US1] Create authentication endpoints in backend/api/routes/auth.py @specs/api/rest-endpoints.md
- [X] T015 [US1] Implement signup endpoint with email/password validation @specs/features/authentication.md
- [X] T016 [US1] Implement signin endpoint with credential verification @specs/features/authentication.md
- [X] T017 [US1] Implement logout endpoint @specs/features/authentication.md
- [X] T018 [P] [US1] Setup Next.js frontend with App Router, TypeScript, Tailwind @specs/ui/pages.md
- [X] T019 [US1] Configure Better Auth in frontend with JWT plugin enabled @specs/features/authentication.md
- [X] T020 [US1] Create authentication pages (login/signup) in frontend/app/(auth)/ @specs/ui/pages.md
- [X] T021 [US1] Implement protected route logic (redirect to login if not authenticated) @specs/features/authentication.md

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Management (Priority: P1)

**Goal**: Allow authenticated users to create, view, update, delete, and mark tasks as complete/incomplete

**Independent Test**: User can create a task, see it in their list, update its details, mark it as complete, and delete it.

### Implementation for User Story 2

- [X] T022 [P] [US2] Create GET /api/tasks endpoint to list user's tasks with filtering and sorting @specs/api/rest-endpoints.md
- [X] T023 [US2] Implement filtering by status (all|pending|completed) in GET /api/tasks @specs/api/rest-endpoints.md
- [X] T024 [US2] Implement sorting by creation date or title in GET /api/tasks @specs/api/rest-endpoints.md
- [X] T025 [US2] Create POST /api/tasks endpoint to create new tasks @specs/api/rest-endpoints.md
- [X] T026 [US2] Implement title validation (1-200 characters) in POST /api/tasks @specs/features/task-crud.md
- [X] T027 [US2] Implement description validation (max 1000 characters) in POST /api/tasks @specs/features/task-crud.md
- [X] T028 [US2] Create GET /api/tasks/{id} endpoint to get single task @specs/api/rest-endpoints.md
- [X] T029 [US2] Create PUT /api/tasks/{id} endpoint to update tasks @specs/api/rest-endpoints.md
- [X] T030 [US2] Create DELETE /api/tasks/{id} endpoint to delete tasks @specs/api/rest-endpoints.md
- [X] T031 [US2] Create PATCH /api/tasks/{id}/complete endpoint to toggle completion status @specs/api/rest-endpoints.md
- [X] T032 [P] [US2] Create frontend API client in frontend/lib/api.ts that automatically attaches JWT @specs/api/rest-endpoints.md
- [X] T033 [US2] Create reusable TaskCard component in frontend/components/TaskCard.tsx @specs/ui/components.md
- [X] T034 [US2] Create reusable TaskList component in frontend/components/TaskList.tsx @specs/ui/components.md
- [X] T035 [US2] Create reusable TaskForm component in frontend/components/TaskForm.tsx @specs/ui/components.md
- [X] T036 [US2] Create Task dashboard page in frontend/app/dashboard/page.tsx @specs/ui/pages.md
- [X] T037 [US2] Implement task creation form/modal in frontend @specs/ui/pages.md
- [X] T038 [US2] Implement task display with edit, delete, toggle complete functionality @specs/ui/pages.md
- [X] T039 [US2] Add filtering and sorting UI controls to dashboard @specs/ui/pages.md

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Secure Data Isolation (Priority: P2)

**Goal**: Ensure users only access their own tasks, with strict enforcement of data isolation

**Independent Test**: User A creates tasks, User B logs in and can only see their own tasks, not User A's tasks.

### Implementation for User Story 3

- [ ] T040 [P] [US3] Enhance all task endpoints to enforce user ownership checks @specs/features/task-crud.md
- [ ] T041 [US3] Add user_id validation in GET /api/tasks to return only user's tasks @specs/features/task-crud.md
- [ ] T042 [US3] Add user_id validation in GET /api/tasks/{id} to return only owned task @specs/features/task-crud.md
- [ ] T043 [US3] Add user_id validation in PUT /api/tasks/{id} to update only owned task @specs/features/task-crud.md
- [ ] T044 [US3] Add user_id validation in DELETE /api/tasks/{id} to delete only owned task @specs/features/task-crud.md
- [ ] T045 [US3] Add user_id validation in PATCH /api/tasks/{id}/complete to toggle only owned task @specs/features/task-crud.md
- [ ] T046 [US3] Update frontend to handle 403 errors appropriately @specs/features/task-crud.md

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Responsive UI Experience (Priority: P2)

**Goal**: Provide a responsive, accessible user interface that works well on different device sizes

**Independent Test**: User can access and use the application effectively on mobile, tablet, and desktop devices.

### Implementation for User Story 4

- [ ] T047 [P] [US4] Apply Tailwind CSS responsive classes to all UI components @specs/ui/components.md
- [ ] T048 [US4] Implement responsive layout for authentication pages @specs/ui/pages.md
- [ ] T049 [US4] Implement responsive layout for task dashboard @specs/ui/pages.md
- [ ] T050 [US4] Test UI components on different screen sizes (mobile, tablet, desktop) @specs/ui/pages.md

**Checkpoint**: All user stories should now be responsive and accessible

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T051 [P] Add comprehensive error handling and user feedback throughout the application
- [ ] T052 [P] Add loading states and spinners for API operations
- [ ] T053 Add comprehensive documentation in README.md with setup instructions, env vars, run commands
- [ ] T054 [P] Add environment variable validation and configuration management
- [ ] T055 Add comprehensive testing (unit, integration) for critical paths
- [ ] T056 Run end-to-end testing of all user flows to ensure everything works together
- [ ] T057 Perform security audit to ensure proper authentication and authorization
- [ ] T058 Performance optimization across all stories

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on User Story 1 (auth)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on User Story 2 (tasks)
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Can work in parallel with other stories

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Implementation Strategy

### MVP First (User Stories 1 and 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Authentication)
4. Complete Phase 4: User Story 2 (Task Management)
5. **STOP and VALIDATE**: Test User Stories 1 and 2 together
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Authentication!)
3. Add User Story 2 → Test with Story 1 → Deploy/Demo (Tasks!)
4. Add User Story 3 → Test with previous stories → Deploy/Demo (Security!)
5. Add User Story 4 → Test with all stories → Deploy/Demo (Responsive!)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Authentication)
   - Developer B: User Story 2 (Tasks) - waits for auth foundation
   - Developer C: User Story 3 (Security) - works alongside tasks
   - Developer D: User Story 4 (UI/UX) - can work in parallel
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [US1], [US2], [US3], [US4] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
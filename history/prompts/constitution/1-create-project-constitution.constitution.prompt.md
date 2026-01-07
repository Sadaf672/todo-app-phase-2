---
id: 1
title: Create Project Constitution
stage: constitution
date_iso: 2026-01-07
surface: agent
model: Qwen Code
feature: none
branch: main
user: LATITUDE
command: /sp.constitution
labels:
  - constitution
  - governance
  - specification
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - C:\Users\LATITUDE\hackhathon-2\full-stack-todo\sp.constitution.md
tests_yaml: []
prompt_text: |
  /sp.constitution You are operating as a Spec-Kit Plus architect for Hackathon II:
  Spec-Driven Development of a Todo Application evolving across multiple phases.

  TASK:
  Create a complete `sp.constitution.md` file that acts as the governing
  constitution for this entire monorepo.

  This constitution must strictly align with the provided Hackathon II document
  (Phase I → Phase V) and define how specs, agents, skills, APIs, security,
  and infrastructure are governed.

  SCOPE:
  - This is NOT application code
  - This is NOT feature implementation
  - This IS the highest-level governing specification
  - This document defines rules that all future development must obey

  LOCATION:
  Create the file at:
  `/sp.constitution.md`

  DO NOT modify any existing files.

  ---

  STRUCTURE REQUIREMENTS:
  The constitution MUST include the following sections (use these exact headings):

  1. Purpose & Authority
  2. Project Phases Governance
  3. Spec-Driven Development Rules
  4. Agent & Skill Governance Model
  5. Authentication & Security Constitution
  6. API & Data Access Constitution
  7. Database & Persistence Rules
  8. AI & MCP Governance (Future-Facing)
  9. Statelessness & Scalability Rules
  10. Infrastructure & Deployment Governance
  11. Change Management & Spec Evolution
  12. Enforcement & Compliance

  ---

  SECTION DETAILS:

  ### 1. Purpose & Authority
  - Declare this constitution as the supreme governing document
  - All code, specs, agents, and infrastructure must comply
  - No implementation may contradict this document

  ### 2. Project Phases Governance
  Define immutable rules for:
  - Phase I: Console Application
  - Phase II: Full-Stack Web Application
  - Phase III: AI Chatbot with MCP
  - Phase IV: Kubernetes & Helm Deployment
  - Phase V: Cloud-Native Event-Driven System

  Each phase must:
  - Build on the previous phase
  - Never break backward compatibility without spec update

  ### 3. Spec-Driven Development Rules
  - All development must originate from `/specs`
  - Specs are the source of truth
  - Code must never precede specs
  - Spec-Kit directory structure must be enforced
  - Specs must be referenced explicitly using `@specs/...`

  ### 4. Agent & Skill Governance Model
  - Define strict separation between:
    - Agents (orchestration & decision-making)
    - Skills (pure, reusable, stateless logic)
  - Skills must never call agents
  - Agents may compose multiple skills
  - Phase-II skills MUST be reusable in Phase-III MCP tools

  ### 5. Authentication & Security Constitution
  - JWT is the only allowed authentication mechanism
  - Better Auth is the identity provider
  - FastAPI must verify JWT independently
  - Shared secret via `BETTER_AUTH_SECRET`
  - User isolation is mandatory at every layer
  - Unauthorized access must fail fast (401/403)

  ### 6. API & Data Access Constitution
  - REST APIs must be stateless
  - All APIs must be user-scoped
  - user_id must always be derived from JWT, never trusted from client input
  - Ownership validation is mandatory for all mutations
  - API routes must remain thin adapters over agents

  ### 7. Database & Persistence Rules
  - Neon Serverless PostgreSQL is the system of record
  - ORM: SQLModel only
  - No raw SQL without justification
  - Tasks must always be scoped by user_id
  - Conversation state (Phase-III) must persist to DB
  - Server memory must never be the source of truth

  ### 8. AI & MCP Governance (Future-Facing)
  - AI agents must not directly access the database
  - MCP tools are the only allowed interface for AI → system interaction
  - MCP tools must be stateless
  - AI decisions must be auditable via stored messages
  - Tool invocation must enforce the same security rules as REST APIs

  ### 9. Statelessness & Scalability Rules
  - Backend services must be stateless
  - Horizontal scaling must not affect correctness
  - Conversation context must be reconstructed per request
  - No in-memory sessions allowed

  ### 10. Infrastructure & Deployment Governance
  - Containers are mandatory for Phase IV+
  - Kubernetes is the deployment target
  - Helm charts define deployable state
  - Dapr may abstract infrastructure concerns
  - Kafka (Redpanda) is the event backbone for Phase V

  ### 11. Change Management & Spec Evolution
  - Any behavior change requires spec update first
  - Spec versioning must be respected
  - Deprecated behavior must be documented
  - Breaking changes require explicit migration notes

  ### 12. Enforcement & Compliance
  - Any code violating this constitution is invalid
  - Review process must check:
    - Spec alignment
    - Security compliance
    - Statelessness
    - Phase compatibility
  - This constitution overrides all other documents

  ---

  STYLE & TONE:
  - Formal
  - Declarative
  - Authoritative
  - Clear, enforceable language
  - No casual or conversational phrasing

  OUTPUT:
  - Create `sp.constitution.md`
  - Fully populated with all sections
  - No explanations outside the file
response_text: |
  Created the complete sp.constitution.md file with all 12 required sections:
  1. Purpose & Authority
  2. Project Phases Governance
  3. Spec-Driven Development Rules
  4. Agent & Skill Governance Model
  5. Authentication & Security Constitution
  6. API & Data Access Constitution
  7. Database & Persistence Rules
  8. AI & MCP Governance (Future-Facing)
  9. Statelessness & Scalability Rules
  10. Infrastructure & Deployment Governance
  11. Change Management & Spec Evolution
  12. Enforcement & Compliance

  The constitution establishes governance rules for the entire monorepo,
  defining how specs, agents, skills, APIs, security, and infrastructure
  are to be governed throughout all project phases.
outcome: |
  Successfully created the project constitution file at sp.constitution.md
  with all required sections and governance rules for the Hackathon II
  Todo Application project.
evaluation: |
  The constitution document fully complies with the requirements,
  containing all 12 specified sections with appropriate content
  governing the project across all phases from Phase I to Phase V.
---
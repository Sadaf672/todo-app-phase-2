# Spec-Kit Plus Constitution for Hackathon II: Todo Application

## 1. Purpose & Authority

This constitution serves as the supreme governing document for the entire monorepo. All code, specifications, agents, skills, and infrastructure must comply with the rules and principles defined herein. No implementation may contradict this document. All development activities within this project must adhere to the governance model established in this constitution.

## 2. Project Phases Governance

This project follows a phased development approach from Phase I to Phase V. Each phase builds upon the previous phase and must maintain backward compatibility unless explicitly specified in an updated specification.

### Phase I: Console Application
- Command-line interface for basic todo operations
- Local data storage only
- No authentication required

### Phase II: Full-Stack Web Application
- Web-based user interface
- Authentication via Better Auth and JWT
- Database persistence with Neon Serverless PostgreSQL
- REST API with FastAPI backend

### Phase III: AI Chatbot with MCP
- Integration with AI agents
- MCP (Model Context Protocol) tools for system interaction
- Conversation state persistence
- Enhanced user experience through natural language

### Phase IV: Kubernetes & Helm Deployment
- Containerized deployment
- Kubernetes orchestration
- Helm chart management
- Scalable infrastructure

### Phase V: Cloud-Native Event-Driven System
- Event-driven architecture
- Kafka (Redpanda) for messaging
- Microservices design
- Advanced scalability and resilience

Each phase must build on the previous phase without breaking existing functionality unless a specification update explicitly defines the change.

## 3. Spec-Driven Development Rules

All development must originate from the `/specs` directory. Specifications are the source of truth for all implementation activities. Code must never precede specifications. The Spec-Kit directory structure must be strictly enforced. All specifications must be referenced explicitly using the `@specs/...` convention. Any code that does not align with an approved specification is invalid and must be revised.

## 4. Agent & Skill Governance Model

A strict separation must be maintained between agents and skills:
- Agents: Responsible for orchestration and decision-making
- Skills: Pure, reusable, stateless logic components

Skills must never call agents. Agents may compose multiple skills to achieve complex functionality. Phase-II skills must be designed for reusability in Phase-III MCP tools. All skills must be stateless and idempotent.

## 5. Authentication & Security Constitution

JWT (JSON Web Token) is the only allowed authentication mechanism in this system. Better Auth serves as the identity provider. FastAPI must verify JWT tokens independently using the shared secret via the `BETTER_AUTH_SECRET` environment variable. User isolation is mandatory at every layer of the application. Unauthorized access attempts must fail fast with appropriate HTTP status codes (401/403). All authentication-related code must follow security best practices and undergo security review.

## 6. API & Data Access Constitution

All REST APIs must be stateless. All API endpoints must be user-scoped, with the user_id always derived from the JWT token and never trusted from client input. Ownership validation is mandatory for all data mutations. API routes must remain thin adapters that delegate to agents and skills. No business logic should be implemented directly in API route handlers.

## 7. Database & Persistence Rules

Neon Serverless PostgreSQL is the system of record for all persistent data. SQLModel is the only approved ORM for database interactions. Raw SQL queries are prohibited without explicit justification and approval. All tasks must be scoped by user_id to ensure proper data isolation. Conversation state for Phase III must persist to the database. Server memory must never serve as the source of truth for any data that needs to persist across requests or server restarts.

## 8. AI & MCP Governance (Future-Facing)

AI agents must not directly access the database. MCP (Model Context Protocol) tools are the only allowed interface for AI-to-system interactions. MCP tools must be stateless and follow the same security rules as REST APIs. All AI decisions must be auditable through stored messages and logs. Tool invocation must enforce the same security and validation rules as traditional REST APIs.

## 9. Statelessness & Scalability Rules

All backend services must be stateless to enable horizontal scaling. Horizontal scaling must not affect the correctness of the application. Conversation context must be reconstructed per request from persistent storage. No in-memory sessions are allowed as they would break horizontal scaling capabilities. All state must be stored in the database or other persistent storage systems.

## 10. Infrastructure & Deployment Governance

Containerization is mandatory for Phase IV and beyond. Kubernetes serves as the deployment target for scalable production deployments. Helm charts define the deployable state of the application. Dapr may be used to abstract infrastructure concerns where appropriate. Kafka (Redpanda) serves as the event backbone for Phase V's event-driven architecture.

## 11. Change Management & Spec Evolution

Any behavior change requires a specification update first. Specification versioning must be respected and maintained. Deprecated behavior must be properly documented with migration paths. Breaking changes require explicit migration notes and approval from project stakeholders. All changes must follow the established change management process.

## 12. Enforcement & Compliance

Any code violating this constitution is invalid and will not be accepted. The review process must check for:
- Specification alignment
- Security compliance
- Adherence to statelessness principles
- Phase compatibility
- Proper agent/skill separation

This constitution overrides all other project documents. Compliance with these rules is mandatory for all contributors and maintainers of this project.
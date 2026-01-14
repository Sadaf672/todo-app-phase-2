# Backend Development Guidelines

Auto-generated from feature plans. Last updated: 2026-01-08

## Active Technologies

- Python 3.9+
- FastAPI
- SQLModel
- PyJWT
- Better Auth with JWT plugin
- Neon Serverless PostgreSQL

## Project Structure

```text
backend/
├── main.py                 # Main FastAPI application entry point
├── db.py                   # Database connection and engine setup
├── models.py               # SQLModel models
├── api/
│   └── routes/
│       ├── auth.py         # Authentication endpoints
│       └── tasks.py        # Task CRUD endpoints
├── auth/
│   ├── __init__.py
│   ├── middleware.py       # JWT verification middleware
│   └── dependencies.py     # get_current_user dependency
├── config/
│   ├── __init__.py
│   └── settings.py         # Configuration settings
├── utils/
│   ├── __init__.py
│   └── helpers.py          # Utility functions
├── requirements.txt        # Python dependencies
└── tests/                  # Test files
    ├── conftest.py
    ├── test_auth.py
    └── test_tasks.py
```

## Commands

- Run locally: `uvicorn main:app --reload`
- Run tests: `pytest`
- Format code: `black .`
- Check linting: `ruff check .`

## Code Style

- Follow PEP 8 conventions
- Use Black for code formatting
- Use Ruff for linting
- Type hint all functions
- Use docstrings for all public functions

## API Guidelines

- Use Pydantic models for request/response validation
- Implement proper error handling with HTTPException
- Use dependency injection for authentication
- Follow REST API best practices
- Include comprehensive API documentation

## Database Guidelines

- Use SQLModel for database models and queries
- Implement proper relationships between models
- Use async database operations
- Handle database transactions properly

## Authentication Guidelines

- Use JWT tokens for authentication
- Verify tokens using the shared BETTER_AUTH_SECRET
- Implement proper user isolation
- Secure all endpoints that require authentication

## Recent Changes

- Added FastAPI, SQLModel, PyJWT, Neon PostgreSQL integration
- Implemented JWT authentication with user isolation
- Created task CRUD endpoints with proper validation
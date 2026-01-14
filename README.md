# Hackathon II Todo App

A modern multi-user full-stack web application with persistent storage.

## Overview

This is a full-stack todo application built with Next.js, FastAPI, and Neon PostgreSQL. It features user authentication, task management with CRUD operations, and strict user isolation to ensure data privacy.

### Features

- User authentication (signup/signin)
- Task CRUD operations (Create, Read, Update, Delete)
- Task completion toggling
- User isolation (users only see their own tasks)
- Responsive UI with Tailwind CSS
- REST API with JWT authentication
- Neon Serverless PostgreSQL for persistent storage

## Tech Stack

- **Frontend**: Next.js 16+, TypeScript, Tailwind CSS
- **Backend**: Python FastAPI
- **ORM**: SQLModel
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: JWT-based authentication with shared BETTER_AUTH_SECRET

## Environment Variables

### Backend (.env)
Create a `.env` file in the backend directory with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/todo_app
BETTER_AUTH_SECRET=your-super-secret-jwt-key-here-must-be-at-least-32-characters-long
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
Create a `.env.local` file in the frontend directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-super-secret-jwt-key-here-must-be-at-least-32-characters-long
```

## Setup Instructions

### Prerequisites

- Node.js 18+ for frontend
- Python 3.9+ for backend
- PostgreSQL-compatible database (Neon recommended)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables as described above

4. Run the backend:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables as described above

4. Run the frontend:
   ```bash
   npm run dev
   ```

## Neon DB Setup

1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new project
3. Get your connection string from the project dashboard
4. Update your `DATABASE_URL` environment variable with the Neon connection string

## Docker Compose Instructions

The project includes a `docker-compose.yml` file for easy setup:

1. Make sure Docker and Docker Compose are installed
2. Run the following command from the project root:
   ```bash
   docker-compose up --build
   ```
3. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

## API Endpoints

All API endpoints are prefixed with `/api/` and require a JWT token in the Authorization header.

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/logout` - User logout

### Task Endpoints
- `GET /api/tasks` - Get all tasks for authenticated user (with optional status and sort query params)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get a specific task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `PATCH /api/tasks/{id}/complete` - Toggle task completion status

## User Isolation Testing

The application implements strict user isolation to ensure that users can only access their own tasks. This is enforced through:

1. **JWT Token Verification**: Each request includes a JWT token that contains the user's ID
2. **Database Query Filtering**: All database queries filter results by the authenticated user's ID
3. **Resource Access Control**: When accessing a specific task, the system verifies that the task belongs to the authenticated user

To test user isolation:
1. Create two different user accounts
2. Log in as the first user and create some tasks
3. Log out and log in as the second user
4. Verify that the second user cannot see the first user's tasks
5. Try to access a specific task that belongs to the first user using the second user's token - this should return a 404 error

## Project Structure

```
hackathon-todo/
├── backend/                # FastAPI backend
│   ├── main.py             # Main application entry point
│   ├── db.py               # Database connection
│   ├── models.py           # SQLModel models
│   ├── auth.py             # Authentication middleware
│   └── api/
│       └── routes/
│           ├── tasks.py    # Task CRUD endpoints
│           └── auth.py     # Authentication endpoints
├── frontend/               # Next.js frontend
│   ├── app/
│   │   ├── (auth)/         # Authentication pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── dashboard/      # Main dashboard page
│   │   └── globals.css
│   ├── components/         # Reusable UI components
│   ├── lib/
│   │   └── api.ts          # API client
│   └── types/
│       └── task.ts         # Task type definitions
├── specs/                  # Specification files
├── docker-compose.yml
├── README.md
└── qwen.md
```

## Development

This project follows a spec-driven development approach. All features are defined in the `specs/` directory before implementation.

## Contributing

1. Check the `specs/` directory for planned features
2. Follow the implementation plan in `specs/plan/`
3. Adhere to the project constitution in `qwen.md`
# Quickstart Guide for Phase II Todo App

## Prerequisites
- Node.js 18+ for frontend
- Python 3.9+ for backend
- PostgreSQL-compatible database (Neon recommended)
- Git

## Setup Instructions

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd hackathon-todo
```

### 2. Environment Variables
Create `.env` files in both frontend and backend directories with the following variables:

**Backend (.env):**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/todo_app"
BETTER_AUTH_SECRET="your-super-secret-jwt-key-here-must-be-at-least-32-characters-long"
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:8000"
BETTER_AUTH_SECRET="your-super-secret-jwt-key-here-must-be-at-least-32-characters-long"
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
```

### 3. Backend Setup
```bash
cd backend
pip install fastapi uvicorn sqlmodel python-jose[cryptography] python-multipart python-dotenv better-exceptions
```

### 4. Frontend Setup
```bash
cd frontend
npm install next react react-dom @types/react @types/node @types/react-dom tailwindcss postcss autoprefixer
npm install @better-auth/react @better-auth/client
```

### 5. Database Setup
Set up your Neon PostgreSQL database and run any required migrations.

### 6. Run the Application

**Backend:**
```bash
cd backend
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## Basic Usage Flow
1. Navigate to the frontend (usually http://localhost:3000)
2. Sign up for a new account or sign in if you already have one
3. Create tasks using the task creation form
4. View, edit, complete, or delete your tasks
5. Use filtering and sorting options to manage your tasks

## Troubleshooting
- If authentication isn't working, verify that `BETTER_AUTH_SECRET` is identical in both frontend and backend
- If database connections fail, check your `DATABASE_URL` and ensure the database server is running
- For CORS issues, ensure your frontend and backend URLs are properly configured
# full-stack-todo Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-08

## Active Technologies

- Python 3.9+ + FastAPI + SQLModel (backend)
- Next.js 16+ + TypeScript + Tailwind CSS (frontend)
- Neon Serverless PostgreSQL (database)
- Better Auth with JWT plugin (authentication)

## Project Structure

```text
backend/
├── main.py
├── db.py
├── models/
├── api/
│   └── routes/
├── auth/
└── requirements.txt
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   └── globals.css
├── components/
├── lib/
│   └── api.ts
├── public/
├── package.json
└── tailwind.config.js
specs/
├── overview.md
├── architecture.md
├── features/
├── api/
├── database/
├── ui/
└── plan/
docker-compose.yml
.env.example
README.md
```

## Commands

Backend: `cd backend; uvicorn main:app --reload`
Frontend: `cd frontend; npm run dev`
Tests: `cd backend; pytest; cd frontend; npm run test`

## Code Style

Python: Follow PEP 8 conventions with Black formatting
JavaScript/TypeScript: Follow Airbnb style guide with Prettier formatting
CSS: Use Tailwind utility classes primarily

## Recent Changes

- master: Added Next.js 16+, FastAPI, SQLModel, Neon PostgreSQL, Better Auth with JWT

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
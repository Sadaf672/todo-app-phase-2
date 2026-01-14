# Frontend Development Guidelines

Auto-generated from feature plans. Last updated: 2026-01-08

## Active Technologies

- Next.js 16+
- TypeScript
- Tailwind CSS
- Better Auth with JWT plugin
- React Server Components

## Project Structure

```text
frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── TaskCard.tsx
│   ├── TaskList.tsx
│   ├── TaskForm.tsx
│   ├── Header.tsx
│   ├── AuthLayout.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Select.tsx
├── lib/
│   └── api.ts
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Commands

- Run locally: `npm run dev`
- Build: `npm run build`
- Run tests: `npm run test`
- Format code: `npm run format`
- Lint: `npm run lint`

## Code Style

- Follow Airbnb JavaScript Style Guide
- Use TypeScript for type safety
- Use Prettier for code formatting
- Use ESLint for linting
- Component-based architecture
- Follow React best practices

## UI Guidelines

- Use Tailwind CSS for styling
- Implement responsive design
- Follow accessibility best practices
- Use consistent color scheme
- Implement proper loading states
- Handle error states gracefully

## Authentication Guidelines

- Use Better Auth for user authentication
- Enable JWT plugin for token handling
- Secure all protected routes
- Implement proper session management
- Use shared BETTER_AUTH_SECRET with backend

## API Integration Guidelines

- Create centralized API client in lib/api.ts
- Automatically attach JWT tokens to requests
- Handle API errors consistently
- Implement proper loading states
- Use React Query or SWR for data fetching

## Component Guidelines

- Create reusable UI components
- Use TypeScript interfaces for props
- Implement proper prop validation
- Follow naming conventions
- Keep components focused and single-purpose

## Recent Changes

- Added Next.js 16+, TypeScript, Tailwind CSS
- Integrated Better Auth with JWT plugin
- Created reusable UI components
- Implemented responsive design
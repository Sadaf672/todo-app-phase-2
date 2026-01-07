# Todo App Frontend

This is a professional, modern Todo application frontend built with Next.js 16+, TypeScript, and Tailwind CSS.

## Features

- User authentication (login/register)
- Dashboard with task overview
- Task management (create, edit, delete, mark as complete)
- Filtering and searching capabilities
- Responsive design for all device sizes
- Accessibility features
- JWT-based authentication flow
- State management with React Context
- API integration for task operations

## Tech Stack

- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- React Icons
- React Context for state management

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root of the project with the following:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
frontend/
├── app/                 # Next.js app router pages
│   ├── login/           # Login page
│   ├── register/        # Register page
│   ├── dashboard/       # Dashboard page
│   ├── tasks/           # Tasks page
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page (redirects to login/dashboard)
├── components/          # Reusable components
│   ├── layout/          # Layout components (Navbar, Sidebar)
│   ├── tasks/           # Task-specific components
│   └── ui/              # UI components (buttons, modals, etc.)
├── lib/                 # Utilities and context providers
│   ├── api.ts           # API client
│   ├── auth-context.tsx # Authentication context
│   └── task-context.tsx # Task state context
├── types/               # TypeScript type definitions
│   └── task.ts          # Task interface
└── app/
    ├── globals.css      # Global styles
    └── layout.tsx       # Root layout
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: The base URL for the backend API (default: http://localhost:3001/api)

## API Integration

The application is designed to work with a backend API that provides the following endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /tasks` - Get all tasks for the authenticated user
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `PATCH /tasks/:id/toggle-completion` - Toggle task completion status

## Authentication Flow

1. Users can register or login using email and password
2. Upon successful authentication, a JWT token is stored in localStorage
3. The token is included in the Authorization header for all API requests
4. Protected routes check for the presence of a valid token
5. Users are redirected to the login page if not authenticated

## State Management

- Authentication state is managed with React Context
- Task state is managed with React Context using useReducer
- Optimistic updates are implemented for better UX

## Responsive Design

The application is fully responsive and works on mobile, tablet, and desktop devices. Key responsive features include:

- Collapsible sidebar on mobile
- Responsive navigation that switches to a hamburger menu on smaller screens
- Flexible grid layouts that adapt to screen size
- Appropriate touch targets for mobile users

## Accessibility

The application follows accessibility best practices:

- Semantic HTML structure
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Sufficient color contrast
- Screen reader support

## Testing

To run tests:
```bash
npm run test
```

## Building for Production

To build the application for production:
```bash
npm run build
```

To start the production server:
```bash
npm run start
```

## Learn More

To learn more about the technologies used in this project, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
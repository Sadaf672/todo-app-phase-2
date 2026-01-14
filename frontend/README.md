# Todo App Frontend

A modern, secure, and intuitive task management solution built with Next.js 16, TypeScript, Tailwind CSS, and Better Auth.

## Features

- User authentication (sign up, login, logout)
- Task management (create, read, update, delete)
- Task filtering and sorting
- Responsive design
- Modern UI with Tailwind CSS

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Better Auth
- React Hooks

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 # Replace with your backend URL
```

For production deployments, make sure to set the appropriate API base URL.

## Deployment

### Deploy on Vercel

The easiest way to deploy this application is to use the [Vercel Platform](https://vercel.com/new).

1. Fork this repository
2. Go to your Vercel dashboard and click "New Project"
3. Import your forked repository
4. Add your environment variables in the Vercel dashboard
5. Click "Deploy"

### Manual Deployment

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Start the production server: `npm start`

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

This frontend connects to a backend API for authentication and task management. Make sure your backend is running and the `NEXT_PUBLIC_API_BASE_URL` environment variable is set correctly.

## Troubleshooting

If you encounter a 404 error after deployment:
1. Check that your environment variables are properly set in the deployment platform
2. Verify that your API endpoints are accessible from the deployed frontend
3. Ensure that your Next.js app is properly configured for the deployment platform
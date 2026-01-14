# Deployment Guide for Full-Stack Todo Application

## Overview
This guide explains how to properly deploy your full-stack application with:
- Frontend: Next.js hosted on Vercel
- Backend: FastAPI hosted on a Python-compatible platform (Railway, Heroku, Render)

## Why Separate Hosting?

Vercel is designed for static sites and serverless functions, primarily for JavaScript/TypeScript applications like Next.js. It does not natively support Python/FastAPI applications. Therefore, you need to host your backend separately.

## Deployment Steps

### Step 1: Deploy Backend (Python/FastAPI)

Choose one of these platforms to host your backend:

#### Option A: Deploy to Railway
1. Sign up at [Railway](https://railway.app)
2. Connect your GitHub repository
3. Create a new project and select your repository
4. Railway will automatically detect it's a Python project
5. Add your environment variables in the Railway dashboard:
   - `DATABASE_URL` (your Neon PostgreSQL connection string)
   - `BETTER_AUTH_SECRET` (the same secret you'll use in frontend)
   - `FRONTEND_URL` (your Vercel frontend URL once deployed)
6. Deploy the backend and note the deployment URL

#### Option B: Deploy to Heroku
1. Sign up at [Heroku](https://heroku.com)
2. Install the Heroku CLI
3. Create a new app: `heroku create your-backend-app-name`
4. Set environment variables: `heroku config:set DATABASE_URL=... BETTER_AUTH_SECRET=... FRONTEND_URL=...`
5. Deploy: `git push heroku main`

#### Option C: Deploy to Render
1. Sign up at [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the build and start commands for Python/uvicorn
5. Add environment variables in the Render dashboard

### Step 2: Deploy Frontend (Next.js) to Vercel

1. Go to [Vercel](https://vercel.com)
2. Import your frontend repository
3. In the project settings, add the environment variables:
   - `NEXT_PUBLIC_API_BASE_URL` (your deployed backend URL)
   - `NEXT_PUBLIC_BETTER_AUTH_URL` (your deployed backend URL)
   - `BETTER_AUTH_SECRET` (the same secret used in backend)
4. Deploy the frontend

### Step 3: Update Backend Environment Variables

After deploying both, make sure your backend environment variables include:
- `FRONTEND_URL` pointing to your Vercel frontend URL

## Important Notes

1. **Shared Secret**: The `BETTER_AUTH_SECRET` must be identical in both frontend and backend environments
2. **URL Consistency**: Ensure all URLs are correctly updated in both environments
3. **CORS**: The backend's `FRONTEND_URL` setting controls which origins can access the API
4. **Database**: Ensure your Neon PostgreSQL database is properly configured and accessible

## Testing Your Deployment

1. Visit your frontend URL
2. Try signing up a new user
3. Create a new task
4. Verify that everything works as expected
5. Test user isolation (create a second user and verify they can't see the first user's tasks)

## Troubleshooting Common Issues

1. **CORS Errors**: Check that `FRONTEND_URL` in your backend matches your actual frontend URL
2. **Auth Issues**: Verify that `BETTER_AUTH_SECRET` is identical in both environments
3. **API Connection Issues**: Ensure your `NEXT_PUBLIC_API_BASE_URL` points to the correct backend URL
4. **Database Connection**: Verify your `DATABASE_URL` is correctly configured and accessible from your backend host
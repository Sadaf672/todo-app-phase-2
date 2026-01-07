# Authentication Flow Specification

## Frontend Auth Behavior with Better Auth

### Registration Flow
1. User navigates to `/register`
2. User fills in registration form (name, email, password)
3. Form validation occurs on submit
4. Credentials are sent to Better Auth registration endpoint
5. On success:
   - JWT token is received and stored securely
   - User is redirected to `/dashboard`
   - User profile is loaded and stored in client state
6. On failure:
   - Error messages are displayed in the form
   - User can correct and resubmit

### Login Flow
1. User navigates to `/login`
2. User fills in login form (email, password)
3. Form validation occurs on submit
4. Credentials are sent to Better Auth login endpoint
5. On success:
   - JWT token is received and stored securely
   - User is redirected to `/dashboard`
   - User profile is loaded and stored in client state
6. On failure:
   - Error messages are displayed in the form
   - User can correct and resubmit

### Logout Flow
1. User clicks logout button in navbar
2. JWT token is cleared from storage
3. User state is reset in client
4. User is redirected to `/login`
5. All cached data is cleared

## JWT Handling & Secure Storage

### Storage Location
- JWT tokens are stored in httpOnly cookies via Better Auth
- Additional user data is stored in React state (not persisted)
- No sensitive data is stored in localStorage or sessionStorage

### Token Refresh
- Tokens are automatically refreshed by Better Auth when needed
- On token expiration, user is redirected to login
- Silent refresh attempts are made before redirecting

### Security Measures
- Tokens are transmitted over HTTPS only
- Tokens have appropriate expiration times
- No tokens are logged or exposed in client-side code

## Route Protection Strategy

### Protected Route Component
- Checks for valid authentication state before rendering
- Redirects unauthenticated users to `/login`
- Preserves intended destination for post-login redirect

### Implementation
- Higher-order component or custom hook to wrap protected pages
- Server-side rendering checks for initial auth state
- Client-side checks for subsequent navigation

## Smooth Redirects with Loading Skeletons

### Loading States
- Show skeleton loaders during authentication checks
- Display loading spinner during redirect transitions
- Maintain consistent UI during token refresh

### Redirect Behavior
- Preserve original destination URL during login redirects
- Show loading state during authentication verification
- Smooth transitions between public and protected routes

## Error Messages UX-Friendly

### Registration Errors
- "Email already exists" → "An account with this email already exists. Try logging in instead."
- "Password too weak" → "Your password must be at least 8 characters with uppercase, lowercase, and number."
- "Invalid email" → "Please enter a valid email address."

### Login Errors
- "Invalid credentials" → "Incorrect email or password. Please try again."
- "Account not found" → "No account found with this email. Please register first."
- "Account locked" → "Your account has been temporarily locked. Please try again later."

### General Auth Errors
- "Session expired" → "Your session has expired. Please log in again."
- "Network error" → "Unable to connect. Please check your connection and try again."
- "Server error" → "We're experiencing technical difficulties. Please try again later."
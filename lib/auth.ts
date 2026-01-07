// // lib/auth.ts
// // Better Auth integration
// // This is a placeholder implementation - actual Better Auth integration will require
// // backend API routes which are outside the scope of the frontend-only implementation
// // In a real implementation, this would handle JWT verification and user session management

// import { signIn, signOut, useSession } from 'next-auth/react';

// // Types for user session
// export interface User {
//   id: string;
//   name?: string;
//   email: string;
//   image?: string;
// }

// export interface Session {
//   user: User;
//   expires: string;
// }

// // Auth utilities
// export const authService = {
//   signIn: async (credentials: { email: string; password: string }) => {
//     // In a real implementation, this would call the Better Auth API
//     console.log('Signing in with:', credentials);
//     return signIn('credentials', {
//       email: credentials.email,
//       password: credentials.password,
//       redirect: false,
//     });
//   },

//   signOut: async () => {
//     // In a real implementation, this would call the Better Auth API
//     return signOut({ redirect: false });
//   },

//   getCurrentUser: (): User | null => {
//     // In a real implementation, this would retrieve user from session/JWT
//     if (typeof window !== 'undefined') {
//       const userStr = localStorage.getItem('currentUser');
//       return userStr ? JSON.parse(userStr) : null;
//     }
//     return null;
//   },

//   isAuthenticated: (): boolean => {
//     // In a real implementation, this would verify JWT validity
//     if (typeof window !== 'undefined') {
//       return !!localStorage.getItem('authToken');
//     }
//     return false;
//   },
// };

// // React hook for session management
// export const useAuth = () => {
//   const { data: session, status } = useSession();
//   const loading = status === 'loading';
//   const authenticated = status === 'authenticated';

//   return {
//     user: session?.user,
//     loading,
//     authenticated,
//     signIn,
//     signOut,
//   };
// };



// lib/auth.ts
// Phase-2 Simple Auth (Better Auth compatible structure)

export interface User {
  id: string
  email: string
  name?: string
}

const USER_KEY = "todo-user"
const TOKEN_KEY = "todo-token"

export const authService = {
  async signIn(credentials: { email: string; password: string }) {
    // TEMP login (Phase-2)
    const fakeUser: User = {
      id: credentials.email,
      email: credentials.email,
      name: "Todo User",
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(fakeUser))
      localStorage.setItem(TOKEN_KEY, "fake-jwt-token")
    }

    return fakeUser
  },

  async signOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_KEY)
      localStorage.removeItem(TOKEN_KEY)
    }
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    return !!localStorage.getItem(TOKEN_KEY)
  },
}

// Hook
export function useAuth() {
  const user = authService.getCurrentUser()

  return {
    user,
    authenticated: !!user,
    loading: false,
    signIn: authService.signIn,
    signOut: authService.signOut,
  }
}

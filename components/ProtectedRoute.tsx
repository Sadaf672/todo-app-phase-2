// // components/ProtectedRoute.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { authService } from '@/lib/auth';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   fallback?: React.ReactNode;
// }

// export default function ProtectedRoute({ 
//   children, 
//   fallback = <div>Loading...</div> 
// }: ProtectedRouteProps) {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
//   useEffect(() => {
//     const checkAuth = async () => {
//       const auth = authService.isAuthenticated();
//       setIsAuthenticated(auth);
      
//       if (!auth) {
//         // Redirect to login if not authenticated
//         router.push('/login');
//       }
//     };
    
//     checkAuth();
//   }, [router]);

//   // Show fallback while checking authentication
//   if (isAuthenticated === null) {
//     return fallback;
//   }

//   // If authenticated, render children
//   if (isAuthenticated) {
//     return <>{children}</>;
//   }

//   // If not authenticated, return fallback (which will trigger redirect)
//   return fallback;
// }




// components/ProtectedRoute.tsx
"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { authenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authenticated) {
      router.push("/login")
    }
  }, [authenticated, router])

  if (!authenticated) return null

  return <>{children}</>
}

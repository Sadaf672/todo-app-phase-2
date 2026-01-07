// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated, otherwise to dashboard
    // This is a placeholder - actual auth check will be implemented later
    router.push('/login');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <p className="text-text-primary">Redirecting...</p>
    </div>
  );
}
// frontend/app/layout.tsx
import { ReactNode } from 'react';
import { TaskProvider } from '@/lib/task-context';
import { AuthProvider } from '@/lib/auth-context';
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <TaskProvider>
            {children}
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
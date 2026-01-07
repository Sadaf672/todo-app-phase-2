'use client';

import { ReactNode, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
  username?: string;
}

export default function Layout({ children, username }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, this would clear the JWT token
    localStorage.removeItem('token');
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar username={username} />
      
      <div className="flex pt-16">
        <Sidebar 
          username={username} 
          onLogout={handleLogout} 
          className="hidden md:block"
        />
        
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
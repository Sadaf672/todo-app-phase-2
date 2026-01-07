// components/Layout.tsx
'use client';

import { ReactNode } from 'react';
import { useTheme } from '@/lib/theme-context';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

export default function Layout({ children, showNavbar = true, showFooter = true }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col bg-background text-text-primary ${theme === 'dark' ? 'dark' : ''}`}>
      {showNavbar && <Navbar />}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
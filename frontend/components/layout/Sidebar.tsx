'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCheckSquare, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

interface SidebarProps {
  username?: string;
  onLogout: () => void;
}

export default function Sidebar({ username, onLogout }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Tasks', href: '/tasks', icon: FiCheckSquare },
    { name: 'Profile', href: '/profile', icon: FiUser },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isExpanded ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 flex flex-col`}
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <span className="text-xl font-bold text-indigo-600">TodoApp</span>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1"
          aria-label="Close navigation"
        >
          <FiX className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    pathname === link.href
                      ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  <link.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" aria-hidden="true" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{username || 'User'}</p>
              <p className="text-xs font-medium text-gray-500">Member</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1"
            aria-label="Logout"
          >
            <FiLogOut className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
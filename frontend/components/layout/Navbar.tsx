'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiMenu, FiX, FiHome, FiCheckSquare, FiUser, FiLogOut } from 'react-icons/fi';

interface NavbarProps {
  username?: string;
}

export default function Navbar({ username }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // In a real app, this would clear the JWT token
    localStorage.removeItem('token');
    router.push('/login');
    router.refresh();
  };

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Tasks', href: '/tasks', icon: FiCheckSquare },
    { name: 'Profile', href: '/profile', icon: FiUser },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0 flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
              <span className="text-xl font-bold text-indigo-600">TodoApp</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    pathname === link.href
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  <link.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <div className="ml-4 relative">
              <div className="flex items-center">
                <span className="text-sm text-gray-700 mr-3 hidden sm:block">
                  Hi, {username || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
                  aria-label="Logout"
                >
                  <FiLogOut className="mr-1 h-5 w-5" aria-hidden="true" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-expanded={isMenuOpen}
              aria-label="Main menu"
            >
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" role="dialog" aria-modal="true">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  pathname === link.href
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                <link.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Logout"
            >
              <FiLogOut className="mr-3 h-5 w-5" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
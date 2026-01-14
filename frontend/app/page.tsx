


'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <div className="text-2xl font-bold text-indigo-600">TodoApp</div>
        <div className="flex space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Organize Your Life with <span className="text-indigo-600">TodoApp</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            A modern, secure, and intuitive task management solution to boost your productivity and stay on top of your goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Get Started - It's Free
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-indigo-600 text-3xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Simple & Intuitive</h3>
            <p className="text-gray-600">
              Clean interface designed to make task management effortless and enjoyable.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-indigo-600 text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your data is protected with industry-standard security measures and encryption.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-indigo-600 text-3xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sync Across Devices</h3>
            <p className="text-gray-600">
              Access your tasks anywhere, anytime on all your devices with seamless sync.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join thousands of users who have transformed the way they manage tasks and achieved their goals.
          </p>
          <Link
            href="/signup"
            className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <p>© {new Date().getFullYear()} TodoApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
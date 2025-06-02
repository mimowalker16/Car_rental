'use client';

import Link from 'next/link';
import { useAuth } from '@/src/hooks/useAuth';

export function Navbar() {
  const { user, userRole, signOut } = useAuth();

  const renderAuthLinks = () => {
    if (user) {
      return (
        <div className="flex items-center gap-4">
          {userRole === 'admin' && (
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              Admin Dashboard
            </Link>
          )}
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Sign Out
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-gray-600 hover:text-gray-900">
          Sign In
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          Register
        </Link>
      </div>
    );
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Techno Cars
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/vehicles" className="text-gray-600 hover:text-gray-900">
                Vehicles
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {renderAuthLinks()}
          </div>
        </div>
      </div>
    </nav>
  );
}
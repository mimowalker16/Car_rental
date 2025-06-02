'use client';

import { useAuth } from '@/src/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'My Bookings', href: '/dashboard/bookings' },
  { name: 'Documents', href: '/dashboard/documents' },
  { name: 'Profile', href: '/dashboard/profile' },
];

const adminNavigation = [
  { name: 'Manage Vehicles', href: '/dashboard/admin/vehicles' },
  { name: 'Manage Bookings', href: '/dashboard/admin/bookings' },
  { name: 'User Management', href: '/dashboard/admin/users' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, userRole } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="h-16 flex items-center px-6 border-b">
            <span className="text-lg font-semibold text-gray-800">Dashboard</span>
          </div>
          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md
                    ${isActive(item.href)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {userRole === 'admin' && (
              <>
                <div className="mt-8">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Admin
                  </h3>
                  <div className="mt-2 space-y-1">
                    {adminNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                          flex items-center px-3 py-2 text-sm font-medium rounded-md
                          ${isActive(item.href)
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                          }
                        `}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <header className="h-16 bg-white shadow-sm">
            <div className="h-full px-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-gray-500">Welcome back, {user?.email}</span>
              </div>
            </div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
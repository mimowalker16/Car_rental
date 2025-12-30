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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 flex">
        {/* Modern Glass Morphism Sidebar */}
        <div className="w-72 min-h-screen backdrop-blur-xl bg-white/10 border-r border-white/20">
          {/* Sidebar Header */}
          <div className="h-20 flex items-center px-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {navigation.map((item, index) => {
                const icons = [
                  <svg key="home" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>,
                  <svg key="calendar" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>,
                  <svg key="document" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>,
                  <svg key="user" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                ];
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300
                      ${isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-sm border border-blue-400/50 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:border-white/20 border border-transparent'
                      }
                    `}
                  >
                    <span className="mr-3 text-lg">{icons[index]}</span>
                    {item.name}
                    {isActive(item.href) && (
                      <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full shadow-lg"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {userRole === 'admin' && (
              <div className="mt-10">
                <div className="px-4 mb-4">
                  <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center">
                    <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Admin Panel
                  </h3>
                </div>
                <div className="space-y-2">
                  {adminNavigation.map((item, index) => {
                    const adminIcons = [
                      <svg key="car" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm-11 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zM5 11h14v3H5v-3z"/>
                      </svg>,
                      <svg key="clipboard" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                      </svg>,
                      <svg key="users" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v4h2v-5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v5h1z"/>
                      </svg>
                    ];
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                          group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300
                          ${isActive(item.href)
                            ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-purple-400/50 text-white shadow-lg'
                            : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:border-white/20 border border-transparent'
                          }
                        `}
                      >
                        <span className="mr-3 text-lg">{adminIcons[index]}</span>
                        {item.name}
                        {isActive(item.href) && (
                          <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full shadow-lg"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* User Info Section */}
            <div className="mt-10 px-4">
              <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                      {user?.email}
                    </p>
                    <p className="text-white/60 text-xs flex items-center space-x-1">
                      {userRole === 'admin' ? (
                        <>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                          <span>Administrator</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                          <span>User</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-h-screen">
          {/* Top Header */}
          <header className="h-20 backdrop-blur-xl bg-white/5 border-b border-white/20">
            <div className="h-full px-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-white">
                  <h1 className="text-lg font-semibold">
                    Welcome back, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {user?.email?.split('@')[0]}
                    </span>
                  </h1>
                  <p className="text-white/60 text-sm">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.405-3.405A9.094 9.094 0 0118 9a9 9 0 10-9 9c1.74 0 3.35-.5 4.72-1.367L17 21v-4z" />
                  </svg>
                </button>
                <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
            <div className="max-w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useAuth } from '@/src/hooks/useAuth';
import { useState, useEffect } from 'react';
import { getTranslations, detectLanguage } from '@/src/utils/i18n';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { user, userRole, signOut } = useAuth();
  const [language, setLanguage] = useState<'fr' | 'en'>('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = getTranslations(language);

  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: t.nav.vehicles,
      href: '/vehicles',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17h4m4 0h4M6 17V9a2 2 0 012-2h8a2 2 0 012 2v8" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
      )
    },
    {
      name: t.nav.about,
      href: '/about',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: t.nav.contact,
      href: '/contact',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    }
  ];

  if (user) {
    navigation.push({
      name: t.nav.dashboard,
      href: '/dashboard',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    });

    if (userRole === 'admin') {
      // Admin hub removed - no additional navigation items for admin
    }
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'p-2' : 'p-4'
    }`}>
      <nav className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/15 backdrop-blur-lg shadow-2xl scale-98' 
          : 'bg-white/10 backdrop-blur-md shadow-xl scale-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-white text-xl font-bold tracking-tight drop-shadow-lg">
              Techno Cars
            </div>
          </Link>

          {/* Center Navigation - Rectangular buttons in container */}
          <div className="hidden lg:flex">
            <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-1 shadow-lg">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/' && pathname?.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                          : 'text-white/80 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg hover:border hover:border-white/20'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center space-x-2 p-2 text-white/80 hover:text-white transition-colors duration-200 rounded-lg border border-white/20 hover:border-white/30 backdrop-blur-md bg-white/10 shadow-lg"
            >
              <span className="text-sm font-medium uppercase">{language}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </button>

            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/20 shadow-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-semibold">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-white/90 text-sm font-medium">
                    {user.email?.split('@')[0] || 'User'}
                  </span>
                  <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <button
                  onClick={async () => {
                    try {
                      await signOut();
                      window.location.href = '/';
                    } catch (error) {
                      console.error('Logout error:', error);
                      window.location.href = '/';
                    }
                  }}
                  className="p-2 text-white/80 hover:text-red-300 transition-colors duration-200 rounded-lg border border-white/20 hover:border-red-300/50 backdrop-blur-md bg-white/10 shadow-lg"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-white/90 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-lg transition-colors duration-200 backdrop-blur-md border border-white/30 shadow-lg"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors duration-200 rounded-lg border border-white/20 hover:border-white/30 backdrop-blur-md bg-white/10 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 py-4 bg-white/5 backdrop-blur-md">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/' && pathname?.startsWith(item.href));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white/20 text-white backdrop-blur-sm border border-white/30 shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-white/10'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            
              {!user && (
                <div className="pt-4 border-t border-white/20 space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm border border-white/10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                    </svg>
                    <span>{t.nav.login}</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium bg-white/20 text-white hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/30 shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>{t.nav.register}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </nav>
    </div>
  );
}
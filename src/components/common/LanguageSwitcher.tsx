'use client';

import React, { useState, useEffect } from 'react';
import { detectLanguage, setLanguage } from '@/src/utils/i18n';

const LanguageSwitcher: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'fr' | 'en'>('en');

  useEffect(() => {
    setCurrentLanguage(detectLanguage());
  }, []);

  const handleLanguageChange = (language: 'fr' | 'en') => {
    setCurrentLanguage(language);
    setLanguage(language);
    // Trigger page refresh to apply translations
    window.location.reload();
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex bg-white/20 backdrop-blur-sm rounded-xl p-1 border border-white/30">
        <button
          onClick={() => handleLanguageChange('fr')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            currentLanguage === 'fr'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
              : 'text-white/80 hover:text-white hover:bg-white/20'
          }`}
        >
          🇫🇷 FR
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            currentLanguage === 'en'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
              : 'text-white/80 hover:text-white hover:bg-white/20'
          }`}
        >
          🇺🇸 EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;

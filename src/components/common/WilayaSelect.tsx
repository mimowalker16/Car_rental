'use client';

import React, { useState, useEffect } from 'react';
import { ALGERIAN_WILAYAS } from '@/src/utils/algeria';
import { detectLanguage } from '@/src/utils/i18n';

interface WilayaSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export const WilayaSelect: React.FC<WilayaSelectProps> = ({
  value,
  onChange,
  label,
  error,
  required = false,
  placeholder
}) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('en');
  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`
            w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 
            text-slate-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
            transition-all duration-300 appearance-none cursor-pointer
            ${error 
              ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/30' 
              : ''
            }
          `}
        >
          <option value="">
            {placeholder || (language === 'fr' ? 'Sélectionner une wilaya' : 'Select a wilaya')}
          </option>
          {ALGERIAN_WILAYAS.map((wilaya) => (
            <option key={wilaya.code} value={wilaya.code}>
              {wilaya.code} - {wilaya.nameEn}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/>
          </svg>
          <span>{error}</span>
        </p>
      )}
      <p className="text-xs text-slate-500">
        {language === 'fr' 
          ? '58 wilayas d\'Algérie disponibles'
          : '58 Algerian wilayas available'
        }
      </p>
    </div>
  );
};

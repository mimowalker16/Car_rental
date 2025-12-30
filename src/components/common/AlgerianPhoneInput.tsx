'use client';

import React, { useState, useEffect } from 'react';
import { validateAlgerianPhone, formatAlgerianPhone } from '@/src/utils/algeria';
import { getTranslations, detectLanguage } from '@/src/utils/i18n';

interface AlgerianPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export const AlgerianPhoneInput: React.FC<AlgerianPhoneInputProps> = ({
  value,
  onChange,
  label,
  error,
  required = false,
  placeholder
}) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('en');
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  const t = getTranslations(language);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocalValue(inputValue);
    
    // Format the phone number as user types
    const formatted = formatAlgerianPhone(inputValue);
    onChange(formatted);
  };

  const isValid = validateAlgerianPhone(value);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="tel"
          value={localValue}
          onChange={handleInputChange}
          placeholder={placeholder || t.forms.phoneFormat}
          required={required}
          className={`
            w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 
            text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 
            focus:border-blue-500 transition-all duration-300
            ${error || (!isValid && value) 
              ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/30' 
              : ''
            }
          `}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <span className="text-slate-400 text-sm">🇩🇿</span>
        </div>
      </div>
      {(error || (!isValid && value)) && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/>
          </svg>
          <span>
            {error || (language === 'fr' 
              ? 'Numéro de téléphone algérien invalide'
              : 'Invalid Algerian phone number'
            )}
          </span>
        </p>
      )}
      {isValid && value && (
        <p className="text-sm text-green-600 flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>
            {language === 'fr' 
              ? 'Numéro valide'
              : 'Valid number'
            }
          </span>
        </p>
      )}
      <p className="text-xs text-slate-500">
        {language === 'fr' 
          ? 'Format: 0555 12 34 56 ou +213 555 12 34 56'
          : 'Format: 0555 12 34 56 or +213 555 12 34 56'
        }
      </p>
    </div>
  );
};

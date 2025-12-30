'use client';

import { FormEvent, useState, useEffect } from 'react';
import { convertUSDToDZD } from '@/src/utils/algeria';
import { getTranslations, detectLanguage } from '@/src/utils/i18n';

interface VehicleFiltersProps {
  onFilter: (filters: {
    car_type?: string;
    min_price?: number;
    max_price?: number;
    available?: boolean;
  }) => void;
}

const carTypes = [
  'All',
  'Sedan',
  'SUV',
  'Sports',
  'Luxury',
  'Electric',
  'Van',
  'Compact'
];

export function VehicleFilters({ onFilter }: VehicleFiltersProps) {
  const [language, setLanguage] = useState<'fr' | 'en'>('en');
  const [filters, setFilters] = useState({
    car_type: '',
    min_price: '',
    max_price: '',
    available: true
  });

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  const t = getTranslations(language);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFilter({
      ...(filters.car_type && filters.car_type !== 'All' && { car_type: filters.car_type }),
      ...(filters.min_price && { min_price: Number(filters.min_price) }),
      ...(filters.max_price && { max_price: Number(filters.max_price) }),
      available: filters.available
    });
  };

  const getCarTypeName = (type: string) => {
    if (type === 'All') {
      return language === 'fr' ? 'Tous' : 'All';
    }
    return t.vehicleTypes[type as keyof typeof t.vehicleTypes] || type;
  };
  // Convert sample USD prices to DZD for placeholders
  const minPricePlaceholder = Math.round(convertUSDToDZD(50)); // ~6,775 DZD
  const maxPricePlaceholder = Math.round(convertUSDToDZD(200)); // ~27,100 DZD
  
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 sticky top-4">
      <h3 className="text-lg font-semibold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6">
        {t.filters.title || 'Filter Vehicles'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-3">
              {t.filters.vehicleType}
            </label>
            <select
              value={filters.car_type}
              onChange={(e) => setFilters({ ...filters, car_type: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 text-white placeholder-white/60"
            >
              {carTypes.map((type) => (
                <option key={type} value={type} className="bg-gray-800 text-white">
                  {getCarTypeName(type)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-3">
                {t.filters.minPrice}
              </label>
              <input
                type="number"
                value={filters.min_price}
                onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 text-white placeholder-white/60"
                placeholder={`${minPricePlaceholder} DZD`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-3">
                {t.filters.maxPrice}
              </label>
              <input
                type="number"
                value={filters.max_price}
                onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 text-white placeholder-white/60"
                placeholder={`${maxPricePlaceholder} DZD`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10">
            <input
              type="checkbox"
              checked={filters.available}
              onChange={(e) => setFilters({ ...filters, available: e.target.checked })}
              className="h-5 w-5 rounded border-white/30 text-blue-500 focus:ring-blue-400 focus:ring-offset-0 bg-white/10"
            />
            <label className="text-sm font-medium text-white/90">
              {t.filters.availability}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 backdrop-blur border border-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{t.filters.apply}</span>
        </button>
        
        <button
          type="button"
          onClick={() => {
            setFilters({ car_type: '', min_price: '', max_price: '', available: true });
            onFilter({ available: true });
          }}
          className="w-full py-3 px-6 bg-white/10 hover:bg-white/20 text-white/90 font-medium rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur border border-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{t.filters.clear}</span>
        </button>
      </form>
    </div>
  );
}
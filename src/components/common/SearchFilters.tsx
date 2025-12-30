'use client';

import { useState, useEffect, useMemo } from 'react';
import { getTranslations, detectLanguage } from '@/src/utils/i18n';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  className?: string;
}

interface FilterOptions {
  priceRange: [number, number];
  carTypes: string[];
  features: string[];
  availability: boolean | null;
  sortBy: 'price_low' | 'price_high' | 'newest' | 'popular';
}

export function SearchFilters({ onSearch, onFilter, className = '' }: SearchFiltersProps) {
  const [language, setLanguage] = useState<'fr' | 'en'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000],
    carTypes: [],
    features: [],
    availability: null,
    sortBy: 'popular'
  });

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  const t = getTranslations(language);

  const carTypes = ['Sedan', 'SUV', 'Sports', 'Luxury', 'Electric', 'Van', 'Compact'];
  const features = ['GPS', 'Bluetooth', 'Air Conditioning', 'Sunroof', 'Automatic', 'Leather Seats'];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters: FilterOptions = {
      priceRange: [0, 10000],
      carTypes: [],
      features: [],
      availability: null,
      sortBy: 'popular'
    };
    setFilters(defaultFilters);
    setSearchQuery('');
    onSearch('');
    onFilter(defaultFilters);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.carTypes.length > 0) count++;
    if (filters.features.length > 0) count++;
    if (filters.availability !== null) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) count++;
    return count;
  }, [filters]);

  return (
    <div className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 ${className}`}>
      {/* Search Bar */}
      <div className="p-6 border-b border-gray-100">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder={language === 'fr' ? 'Rechercher des véhicules...' : 'Search vehicles...'}
          />
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="px-6 py-4 border-b border-gray-100">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">
              {language === 'fr' ? 'Filtres' : 'Filters'}
            </span>
            {activeFilterCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded Filters */}
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[800px]' : 'max-h-0'}`}>
        <div className="p-6 space-y-6">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Trier par' : 'Sort by'}
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="popular">{language === 'fr' ? 'Populaire' : 'Popular'}</option>
              <option value="price_low">{language === 'fr' ? 'Prix croissant' : 'Price: Low to High'}</option>
              <option value="price_high">{language === 'fr' ? 'Prix décroissant' : 'Price: High to Low'}</option>
              <option value="newest">{language === 'fr' ? 'Plus récent' : 'Newest'}</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Gamme de prix (DZD/jour)' : 'Price Range (DZD/day)'}
            </label>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>0 DZD</span>
                <span>{filters.priceRange[1].toLocaleString()} DZD</span>
              </div>
            </div>
          </div>

          {/* Car Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Types de véhicules' : 'Vehicle Types'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {carTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.carTypes.includes(type)}
                    onChange={(e) => {
                      const newTypes = e.target.checked
                        ? [...filters.carTypes, type]
                        : filters.carTypes.filter(t => t !== type);
                      handleFilterChange('carTypes', newTypes);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {language === 'fr' ? 'Disponibilité' : 'Availability'}
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === null}
                  onChange={() => handleFilterChange('availability', null)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {language === 'fr' ? 'Tous' : 'All'}
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === true}
                  onChange={() => handleFilterChange('availability', true)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {language === 'fr' ? 'Disponible' : 'Available'}
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={filters.availability === false}
                  onChange={() => handleFilterChange('availability', false)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {language === 'fr' ? 'Non disponible' : 'Unavailable'}
                </span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearAllFilters}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            {language === 'fr' ? 'Effacer tous les filtres' : 'Clear All Filters'}
          </button>
        </div>
      </div>
    </div>
  );
}

// CSS for custom slider styling
const sliderCSS = `
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
`;

// Add the CSS to the component
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = sliderCSS;
  document.head.appendChild(style);
}

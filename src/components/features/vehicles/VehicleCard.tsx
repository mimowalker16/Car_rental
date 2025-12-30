'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/src/types/database';
import { memo, useState, useEffect } from 'react';
import { convertUSDToDZD, formatDZDPrice } from '@/src/utils/algeria';
import { getTranslations, detectLanguage } from '@/src/utils/i18n';

interface VehicleCardProps {
  vehicle: Vehicle;
  showBookButton?: boolean;
}

export const VehicleCard = memo(function VehicleCard({ vehicle, showBookButton = true }: VehicleCardProps) {
  const [language, setLanguage] = useState<'fr' | 'en'>('en');

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  const t = getTranslations(language);  const getTypeIcon = (type: string) => {
    const iconComponents: Record<string, JSX.Element> = {
      'Sedan': (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm-11 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zM5 11h14v3H5v-3z"/>
        </svg>
      ),
      'SUV': (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19a3 3 0 003-3 3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3zm10 0a3 3 0 003-3 3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3zM4 9h3l2-4h6l2 4h3v4H4V9z"/>
        </svg>
      ),
      'Luxury': (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 16L3 14l5.5-5.5L10 10l4-4 5.5 5.5L18 13l-1.5-1.5L12 17l-4.5-4.5L6 14l-1-2z"/>
        </svg>
      ),
      'Electric': (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66L11 3h1l-1 7h3.5c.49 0 .56.33.47.51L11 21z"/>
        </svg>
      ),
      'Sports': (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      'Van': (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19a2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2 2 2 0 00-2 2zm8 0a2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2 2 2 0 00-2 2zM3 7v8h2a3 3 0 016 0h2a3 3 0 016 0h2V7h-3l-2-2H8L6 7H3z"/>
        </svg>
      ),
      'Compact': (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L4 8v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h10v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8l-1.08-1.99zM6.5 12c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9s1.5.67 1.5 1.5S7.33 12 6.5 12zm11 0c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      )
    };
    return iconComponents[type] || iconComponents['Sedan'];
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Sedan': 'from-blue-500 to-blue-600',
      'SUV': 'from-green-500 to-green-600',
      'Luxury': 'from-purple-500 to-pink-500',
      'Electric': 'from-emerald-500 to-teal-500',
      'Sports': 'from-red-500 to-orange-500',
      'Van': 'from-gray-500 to-slate-600',
      'Compact': 'from-indigo-500 to-blue-500'
    };
    return colors[type] || 'from-blue-500 to-blue-600';
  };
  const getVehicleTypeName = (type: string) => {
    return t.vehicleTypes[type as keyof typeof t.vehicleTypes] || type;
  };

  const formatPrice = (priceUSD: number) => {
    const priceDZD = convertUSDToDZD(priceUSD);
    return formatDZDPrice(priceDZD);
  };  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-slate-100 relative">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <Image
          src={vehicle.image_urls[0] || '/placeholder-car.jpg'}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJyEkMj84MTY3ODYxSUJWRz5PRlVeVkFmXV1zcmtLT1RchGRtdnBwcHD/2wBDARUXFyAeIBshIW0mHyYxMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        
        {/* Type Badge with enhanced animation */}
        <div className={`absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r ${getTypeColor(vehicle.car_type)} text-white text-sm font-medium rounded-full flex items-center space-x-1 shadow-lg backdrop-blur-sm transform group-hover:scale-105 transition-all duration-300`}>
          <span className="animate-pulse">{getTypeIcon(vehicle.car_type)}</span>
          <span>{getVehicleTypeName(vehicle.car_type)}</span>
        </div>
        
        {/* Availability Badge with pulsing animation */}
        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm transform group-hover:scale-105 transition-all duration-300 ${
          vehicle.availability 
            ? 'bg-emerald-500 text-white animate-pulse'
            : 'bg-red-500 text-white'
        }`}>
          {vehicle.availability 
            ? `✓ ${t.status.available}`
            : `✗ ${t.status.unavailable}`
          }
        </div>
        
        {/* Heart Icon for Favorites */}
        <button className="absolute top-4 right-16 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-medium hover:bg-white transition-all duration-200 transform scale-0 group-hover:scale-100">
            {language === 'fr' ? 'Aperçu rapide' : 'Quick View'}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-slate-500 font-medium">{vehicle.year}</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {formatPrice(vehicle.price_per_day)}
            </span>
            <span className="text-slate-500 font-medium">
              /{language === 'fr' ? 'jour' : 'day'}
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>{vehicle.mileage_limit} {language === 'fr' ? 'km/jour' : 'km/day'}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>{vehicle.fuel_policy}</span>
          </div>
        </div>
        
        {/* Action Button */}
        {showBookButton && (
          <Link
            href={`/vehicles/${vehicle.id}`}
            className="group/btn w-full"
          >
            <button 
              className={`w-full py-3 px-4 rounded-2xl font-semibold transition-all duration-300 transform group-hover:scale-105 ${
                vehicle.availability
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
              disabled={!vehicle.availability}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>
                  {vehicle.availability 
                    ? t.vehicle.bookNow
                    : t.status.unavailable
                  }
                </span>
                {vehicle.availability && (
                  <span className="group-hover/btn:translate-x-1 group-hover/btn:transition-transform">
                    →
                  </span>
                )}
              </span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
});
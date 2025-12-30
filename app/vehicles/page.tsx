'use client';

import { useState, useEffect } from 'react';
import { VehicleCard } from '@/src/components/features/vehicles/VehicleCard';
import { VehicleFilters } from '@/src/components/features/vehicles/VehicleFilters';
import { vehicleService } from '@/src/services/vehicle.service';
import { Vehicle } from '@/src/types/database';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const loadInitialVehicles = async () => {
      try {
        const initialVehicles = await vehicleService.getVehicles({ available: true });
        setVehicles(initialVehicles);
      } catch (error) {
        console.error('Error loading vehicles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialVehicles();
  }, []);

  const handleFilter = async (filters: {
    car_type?: string;
    min_price?: number;
    max_price?: number;
    available?: boolean;
  }) => {
    setIsFiltering(true);
    try {
      const filteredVehicles = await vehicleService.getVehicles(filters);
      setVehicles(filteredVehicles);
    } catch (error) {
      console.error('Error filtering vehicles:', error);
    } finally {
      setIsFiltering(false);
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/60"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
            Available Vehicles
          </h1>
          <p className="text-white/80 text-lg">
            Discover our premium collection of vehicles
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <VehicleFilters onFilter={handleFilter} />
            </div>
          </div>          <div className="lg:col-span-3">
            {isFiltering ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/60 mx-auto"></div>
                  <p className="text-white/70">Filtering vehicles...</p>
                </div>
              </div>
            ) : vehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicles.map((vehicle, index) => (
                  <div 
                    key={vehicle.id} 
                    className="transform transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-100/20 to-gray-50/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.109m0 0L3 15.236M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No vehicles found</h3>
                  <p className="text-white/70">
                    Try adjusting your filters to find more vehicles
                  </p>                  <button 
                    onClick={() => handleFilter({})}
                    className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
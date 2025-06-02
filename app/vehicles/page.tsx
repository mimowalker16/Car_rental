'use client';

import { useState } from 'react';
import { VehicleCard } from '@/src/components/features/vehicles/VehicleCard';
import { VehicleFilters } from '@/src/components/features/vehicles/VehicleFilters';
import { vehicleService } from '@/src/services/vehicle.service';
import { Vehicle } from '@/src/types/database';

export default async function VehiclesPage() {
  const initialVehicles = await vehicleService.getVehicles({ available: true });
  
  return (
    <VehiclesList initialVehicles={initialVehicles} />
  );
}

function VehiclesList({ initialVehicles }: { initialVehicles: Vehicle[] }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilter = async (filters: {
    car_type?: string;
    min_price?: number;
    max_price?: number;
    available?: boolean;
  }) => {
    setIsLoading(true);
    try {
      const filteredVehicles = await vehicleService.getVehicles(filters);
      setVehicles(filteredVehicles);
    } catch (error) {
      console.error('Error filtering vehicles:', error);
      // You could add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Vehicles</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <VehicleFilters onFilter={handleFilter} />
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : vehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No vehicles found</h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your filters to find more vehicles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
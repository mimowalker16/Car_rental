'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/src/hooks/useAuth';
import { vehicleService } from '@/src/services/vehicle.service';
import { Vehicle } from '@/src/types/database';
import { VehicleFormModal } from '@/src/components/features/vehicles/VehicleFormModal';

export default function AdminVehiclesPage() {
  const router = useRouter();
  const { userRole } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | undefined>(undefined);

  useEffect(() => {
    if (userRole !== 'admin') {
      router.push('/dashboard');
      return;
    }

    loadVehicles();
  }, [userRole, router]);

  const loadVehicles = async () => {
    try {
      const data = await vehicleService.getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAvailability = async (vehicle: Vehicle) => {
    try {
      await vehicleService.updateVehicle(vehicle.id, {
        availability: !vehicle.availability
      });
      setVehicles(vehicles.map(v => 
        v.id === vehicle.id 
          ? { ...v, availability: !v.availability }
          : v
      ));
    } catch (error) {
      console.error('Error updating vehicle availability:', error);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) {
      return;
    }

    try {
      await vehicleService.deleteVehicle(id);
      setVehicles(vehicles.filter(v => v.id !== id));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Vehicles</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Vehicle
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 flex-shrink-0">
                        <Image
                          src={vehicle.image_urls[0] || '/placeholder-car.jpg'}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {vehicle.brand} {vehicle.model}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vehicle.year}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vehicle.car_type}</div>
                    <div className="text-sm text-gray-500">
                      {vehicle.mileage_limit} km/day
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleAvailability(vehicle)}
                      className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium
                        ${vehicle.availability 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }
                      `}
                    >
                      {vehicle.availability ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${vehicle.price_per_day}/day
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingVehicle(vehicle)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(showAddModal || editingVehicle) && (
        <VehicleFormModal
          vehicle={editingVehicle}
          onClose={() => {
            setShowAddModal(false);
            setEditingVehicle(undefined);
          }}
          onSave={async (vehicleData) => {
            try {
              if (editingVehicle) {
                await vehicleService.updateVehicle(editingVehicle.id, vehicleData);
              } else {
                // Type assertion to ensure all required fields are present
                const newVehicleData: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'> = {
                  brand: vehicleData.brand || '',
                  model: vehicleData.model || '',
                  year: vehicleData.year || new Date().getFullYear(),
                  car_type: vehicleData.car_type || 'Sedan',
                  price_per_day: vehicleData.price_per_day || 0,
                  mileage_limit: vehicleData.mileage_limit || 0,
                  fuel_policy: vehicleData.fuel_policy || 'Full to Full',
                  availability: vehicleData.availability ?? true,
                  image_urls: vehicleData.image_urls || []
                };
                await vehicleService.createVehicle(newVehicleData);
              }
              loadVehicles();
              setShowAddModal(false);
              setEditingVehicle(undefined);
            } catch (error) {
              console.error('Error saving vehicle:', error);
            }
          }}
        />
      )}
    </div>
  );
}
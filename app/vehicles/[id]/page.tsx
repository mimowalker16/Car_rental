'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/src/hooks/useAuth';
import { vehicleService } from '@/src/services/vehicle.service';
import { bookingService } from '@/src/services/booking.service';
import { Vehicle } from '@/src/types/database';

export default function VehicleDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    startDate: '',
    endDate: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadVehicle() {
      try {
        const data = await vehicleService.getVehicleById(params.id);
        setVehicle(data);
      } catch (error) {
        console.error('Error loading vehicle:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadVehicle();
  }, [params.id]);

  const calculateTotalPrice = () => {
    if (!vehicle || !selectedDates.startDate || !selectedDates.endDate) return 0;

    const start = new Date(selectedDates.startDate);
    const end = new Date(selectedDates.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return days * vehicle.price_per_day;
  };

  const handleBooking = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!selectedDates.startDate || !selectedDates.endDate) {
      setError('Please select rental dates');
      return;
    }

    const totalPrice = calculateTotalPrice();
    if (totalPrice <= 0) {
      setError('Invalid date selection');
      return;
    }

    setIsBooking(true);
    setError('');

    try {
      await bookingService.createBooking({
        user_id: user.id,
        vehicle_id: vehicle!.id,
        start_date: selectedDates.startDate,  // Already a string from the date input
        end_date: selectedDates.endDate,      // Already a string from the date input
        total_price: totalPrice
      });

      router.push('/dashboard/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Vehicle not found</h2>
        <p className="mt-2 text-gray-600">The vehicle you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Vehicle Images */}
        <div className="space-y-4">
          <div className="relative aspect-w-16 aspect-h-9">
            <Image
              src={vehicle.image_urls[0] || '/placeholder-car.jpg'}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {vehicle.image_urls.slice(1).map((url, index) => (
              <div key={index} className="relative aspect-w-1 aspect-h-1">
                <Image
                  src={url}
                  alt={`${vehicle.brand} ${vehicle.model} view ${index + 2}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Details and Booking Form */}
        <div className="mt-8 lg:mt-0">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="mt-2 text-xl text-blue-600">${vehicle.price_per_day} / day</p>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Vehicle Details</h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.car_type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Year</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.year}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Mileage Limit</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.mileage_limit} km/day</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Fuel Policy</dt>
                    <dd className="mt-1 text-sm text-gray-900">{vehicle.fuel_policy}</dd>
                  </div>
                </dl>
              </div>

              {vehicle.availability ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Book This Vehicle</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDates.startDate}
                        onChange={(e) => setSelectedDates({ ...selectedDates, startDate: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        min={selectedDates.startDate || new Date().toISOString().split('T')[0]}
                        value={selectedDates.endDate}
                        onChange={(e) => setSelectedDates({ ...selectedDates, endDate: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-md bg-red-50 p-4">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  {selectedDates.startDate && selectedDates.endDate && (
                    <div className="text-lg font-medium text-gray-900">
                      Total: ${calculateTotalPrice()}
                    </div>
                  )}

                  <button
                    onClick={handleBooking}
                    disabled={isBooking || !selectedDates.startDate || !selectedDates.endDate}
                    className={`
                      w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                      bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                      ${(isBooking || !selectedDates.startDate || !selectedDates.endDate) ? 'opacity-75 cursor-not-allowed' : ''}
                    `}
                  >
                    {isBooking ? 'Creating Booking...' : 'Book Now'}
                  </button>
                </div>
              ) : (
                <div className="rounded-md bg-yellow-50 p-4">
                  <p className="text-sm text-yellow-700">
                    This vehicle is currently unavailable for booking.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
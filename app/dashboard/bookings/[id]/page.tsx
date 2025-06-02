'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { bookingService } from '@/src/services/booking.service';
import { useAuth } from '@/src/hooks/useAuth';

interface BookingDetails {
  id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  vehicle: {
    brand: string;
    model: string;
    image_urls: string[];
    price_per_day: number;
  };
  user: {
    name: string;
    email: string;
  };
}

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    async function loadBooking() {
      try {
        const data = await bookingService.getBookingById(params.id);
        setBooking(data);
      } catch (error) {
        console.error('Error loading booking:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadBooking();
  }, [params.id]);

  const handleCancelBooking = async () => {
    if (!booking || !window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setIsCancelling(true);
    try {
      await bookingService.updateBookingStatus(booking.id, 'cancelled');
      router.refresh();
      setBooking({ ...booking, status: 'cancelled' });
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Booking not found</h2>
        <p className="mt-2 text-gray-600">The booking you're looking for doesn't exist.</p>
      </div>
    );
  }

  const isBookingCancellable = booking.status === 'pending';
  const rentDays = Math.ceil(
    (new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / 
    (1000 * 60 * 60 * 24)
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
        </div>

        {/* Vehicle Information */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-6">
            <div className="relative h-48 w-72">
              <Image
                src={booking.vehicle.image_urls[0] || '/placeholder-car.jpg'}
                alt={`${booking.vehicle.brand} ${booking.vehicle.model}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {booking.vehicle.brand} {booking.vehicle.model}
              </h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Daily Rate:</span> ${booking.vehicle.price_per_day}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Rental Period:</span> {rentDays} days
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total Price:</span> ${booking.total_price}
                </p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Rental Period</h4>
            <p className="mt-1 text-sm text-gray-600">
              From: {new Date(booking.start_date).toLocaleDateString()} <br />
              To: {new Date(booking.end_date).toLocaleDateString()}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900">Customer Information</h4>
            <p className="mt-1 text-sm text-gray-600">
              {booking.user.name} <br />
              {booking.user.email}
            </p>
          </div>
        </div>

        {/* Actions */}
        {isBookingCancellable && (
          <div className="px-6 py-4 bg-gray-50">
            <button
              onClick={handleCancelBooking}
              disabled={isCancelling}
              className={`
                w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm
                text-sm font-medium text-white bg-red-600 hover:bg-red-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                ${isCancelling ? 'opacity-75 cursor-not-allowed' : ''}
              `}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { bookingService } from '@/src/services/booking.service';
import Link from 'next/link';

interface Booking {
  id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  created_at: string;
  vehicle?: {
    brand: string;
    model: string;
    year?: number;
    image_urls?: string[];
    price_per_day?: number;
  };
}

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadBookings = useCallback(async () => {
    if (!user) return;
    
    try {
      const data = await bookingService.getUserBookings(user.id);
      setBookings(data);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900">
              My Bookings
            </h1>
          </div>

          {bookings.length > 0 ? (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-white">
                        {booking.vehicle?.brand} {booking.vehicle?.model} {booking.vehicle?.year}
                      </h3>
                      <p className="text-white/80 text-lg">
                        {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                      </p>
                      <p className="text-2xl font-bold bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                        ${booking.total_price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur border ${
                        booking.status === 'confirmed' ? 'bg-green-500/20 text-green-200 border-green-500/30' :
                        booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30' :
                        'bg-red-500/20 text-red-200 border-red-500/30'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <Link
                        href={`/dashboard/bookings/${booking.id}`}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur border border-white/20"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-12 max-w-lg mx-auto">
                <svg className="w-24 h-24 text-white/60 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
                  No bookings found
                </h3>
                <p className="text-white/80 text-lg mb-8">
                  You haven&apos;t made any bookings yet.
                </p>
                <Link
                  href="/vehicles"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur border border-white/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm-11 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zM5 11h14v3H5v-3z"/>
                  </svg>
                  <span>Browse Vehicles</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

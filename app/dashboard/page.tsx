'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { bookingService } from '@/src/services/booking.service';
import { Booking } from '@/src/types/database';
import Link from 'next/link';
import Image from 'next/image';

interface BookingWithVehicle extends Booking {
  vehicle: {
    brand: string;
    model: string;
    image_urls: string[];
  };
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [recentBookings, setRecentBookings] = useState<BookingWithVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      if (user) {
        try {
          const bookings = await bookingService.getUserBookings(user.id);
          setRecentBookings(bookings.slice(0, 5));
        } catch (error) {
          console.error('Error loading bookings:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    loadBookings();
  }, [user]);

  const renderBookingStatus = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30',
      confirmed: 'bg-green-500/20 text-green-200 border-green-500/30',
      cancelled: 'bg-red-500/20 text-red-200 border-red-500/30',
      completed: 'bg-blue-500/20 text-blue-200 border-blue-500/30'
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur ${statusColors[status as keyof typeof statusColors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Welcome to Your Dashboard
        </h1>
        <p className="mt-3 text-white/80 text-lg">
          Manage your bookings, view rental history, and explore available vehicles.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/vehicles"
          className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm-11 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zM5 11h14v3H5v-3z"/>
            </svg>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors">
              Browse Vehicles
            </h3>
          </div>
          <p className="text-white/80">Explore our selection of available vehicles</p>
        </Link>

        <Link
          href="/dashboard/bookings"
          className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors">
              My Bookings
            </h3>
          </div>
          <p className="text-white/80">View and manage your bookings</p>
        </Link>

        <Link
          href="/dashboard/documents"
          className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors">
              Documents
            </h3>
          </div>
          <p className="text-white/80">Upload and manage your documents</p>
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden">
        <div className="px-8 py-6 border-b border-white/20">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Recent Bookings
          </h2>
        </div>
        <div className="divide-y divide-white/10">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/60 mx-auto"></div>
            </div>
          ) : recentBookings.length > 0 ? (
            recentBookings.map((booking) => (
              <div key={booking.id} className="p-6 hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {booking.vehicle.image_urls && booking.vehicle.image_urls.length > 0 && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={booking.vehicle.image_urls[0]}
                          alt={`${booking.vehicle.brand} ${booking.vehicle.model}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-white font-semibold">
                        {booking.vehicle.brand} {booking.vehicle.model}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {renderBookingStatus(booking.status)}                    <span className="text-white font-semibold">
                      ${booking.total_price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <svg className="w-16 h-16 text-white/60 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">No bookings yet</h3>
              <p className="text-white/70 mb-4">Start by browsing our available vehicles</p>
              <Link
                href="/vehicles"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white rounded-lg hover:from-blue-600/90 hover:to-purple-600/90 transition-all duration-300"
              >
                Browse Vehicles
              </Link>
            </div>
          )}
        </div>
        {recentBookings.length > 0 && (
          <div className="px-8 py-6 border-t border-white/20 bg-white/5">
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
            >
              <span>View all bookings</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
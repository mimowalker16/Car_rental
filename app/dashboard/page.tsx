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
          setRecentBookings(bookings.slice(0, 5)); // Limit to 5 bookings on the client side
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
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage your bookings, view rental history, and explore available vehicles.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/vehicles"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900">Browse Vehicles</h3>
          <p className="mt-2 text-gray-600">Explore our selection of available vehicles</p>
        </Link>

        <Link
          href="/dashboard/bookings"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900">My Bookings</h3>
          <p className="mt-2 text-gray-600">View and manage your bookings</p>
        </Link>

        <Link
          href="/dashboard/documents"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-medium text-gray-900">Documents</h3>
          <p className="mt-2 text-gray-600">Upload and manage your documents</p>
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : recentBookings.length > 0 ? (
            recentBookings.map((booking) => (
              <div key={booking.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src={booking.vehicle.image_urls[0] || '/placeholder-car.jpg'}
                      alt={`${booking.vehicle.brand} ${booking.vehicle.model}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {booking.vehicle.brand} {booking.vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.start_date).toLocaleDateString()} -{' '}
                      {new Date(booking.end_date).toLocaleDateString()}
                    </p>
                    <div className="mt-1">
                      {renderBookingStatus(booking.status)}
                    </div>
                  </div>
                </div>
                <Link
                  href={`/dashboard/bookings/${booking.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No bookings found. Start by browsing our available vehicles!
            </div>
          )}
        </div>
        {recentBookings.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <Link
              href="/dashboard/bookings"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all bookings →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
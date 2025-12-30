'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/src/hooks/useAuth';
import { vehicleService } from '@/src/services/vehicle.service';
import { bookingService } from '@/src/services/booking.service';
import { Vehicle } from '@/src/types/database';
import { convertUSDToDZD, formatDZDPrice, calculateTotalWithTVA } from '@/src/utils/algeria';
import { detectLanguage } from '@/src/utils/i18n';
import { AlgerianBookingForm } from '@/src/components/features/vehicles/AlgerianBookingForm';

// Add font imports and Tailwind config if needed in _app or layout

export default function VehicleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);  const [isLoading, setIsLoading] = useState(true);
  const [vehicleId, setVehicleId] = useState<string>('');  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('en');  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageViewMode, setImageViewMode] = useState<'fit' | 'full'>('fit');
  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  const formatPriceDisplay = (price: number) => {
    const dzdPrice = convertUSDToDZD(price);
    const withTVA = calculateTotalWithTVA(dzdPrice);
    return formatDZDPrice(withTVA);
  };

  const handleBookingStart = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowBookingForm(true);
  };

  useEffect(() => {
    // Resolve params Promise and get the vehicle ID
    params.then(({ id }) => {
      setVehicleId(id);
    });  }, [params]);

  const loadVehicle = useCallback(async () => {
    try {
      const data = await vehicleService.getVehicleById(vehicleId);
      setVehicle(data);
    } catch (error) {
      console.error('Error loading vehicle:', error);
    } finally {
      setIsLoading(false);
    }
  }, [vehicleId]);
  useEffect(() => {
    if (vehicleId) {
      loadVehicle();
    }  }, [vehicleId, loadVehicle]);

  // Keyboard navigation for image modal
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!showImageModal || !vehicle?.image_urls || vehicle.image_urls.length <= 1) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setSelectedImageIndex(selectedImageIndex === 0 ? vehicle.image_urls.length - 1 : selectedImageIndex - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setSelectedImageIndex(selectedImageIndex === vehicle.image_urls.length - 1 ? 0 : selectedImageIndex + 1);
          break;
        case 'Escape':
          e.preventDefault();
          setShowImageModal(false);
          break;
      }
    };

    if (showImageModal) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [showImageModal, selectedImageIndex, vehicle?.image_urls]);
  const handleBookingSubmit = async (bookingData: unknown) => {
    setIsBooking(true);

    try {
      const data = bookingData as {
        startDate: string;
        endDate: string;
        pricing: { total: number };
      };
      
      await bookingService.createBooking({
        user_id: user!.id,
        vehicle_id: vehicle!.id,
        start_date: data.startDate,
        end_date: data.endDate,
        total_price: data.pricing.total
      });

      setShowBookingForm(false);
      router.push('/dashboard/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const handleBookingCancel = () => {
    setShowBookingForm(false);
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex justify-center items-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-slate-600 font-medium">Loading vehicle details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex justify-center items-center">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-12 border border-white/20 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm-11 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zM5 11h14v3H5v-3z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-playfair font-bold text-slate-800 mb-4">Vehicle Not Found</h2>
          <p className="text-slate-600 mb-8">The vehicle you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
          <button
            onClick={() => router.push('/vehicles')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Browse All Vehicles
          </button>
        </div>
      </div>
    );
  }  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="mb-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/20">
            <ol className="flex items-center space-x-2 text-sm">
              <li><Link className="text-blue-300 hover:text-blue-200 transition-colors font-medium" href="/dashboard/bookings">My Bookings</Link></li>
              <li><span className="text-white/60">/</span></li>
              <li><span className="text-white font-medium">Vehicle Details</span></li>
            </ol>
          </div>
        </nav>

        {/* Hero Section - Vehicle Title & Main Info */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 mb-8">
          <div className="text-center">
            <h1 className="text-5xl font-playfair font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
              {vehicle.brand} {vehicle.model}
            </h1>
            <div className="flex justify-center items-center space-x-4 text-white/80">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                {vehicle.year}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
                {vehicle.car_type}
              </span>
              <span className={`px-4 py-2 rounded-full border font-medium ${
                vehicle.availability 
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300' 
                  : 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 text-red-300'
              }`}>
                {vehicle.availability ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        </div>        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Vehicle Information */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Vehicle Image Gallery */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                Vehicle Gallery
              </h2>
              
              {vehicle.image_urls && vehicle.image_urls.length > 0 ? (
                <div className="space-y-6">
                  {/* Main Image */}
                  <div className="relative">
                    <div 
                      className="relative w-full h-96 rounded-xl overflow-hidden cursor-pointer group"
                      onClick={() => setShowImageModal(true)}
                    >
                      <Image
                        src={vehicle.image_urls[selectedImageIndex]}
                        alt={`${vehicle.brand} ${vehicle.model} - Image ${selectedImageIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                        {selectedImageIndex + 1} / {vehicle.image_urls.length}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {vehicle.image_urls.length > 1 && (
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                      {vehicle.image_urls.map((imageUrl, index) => (
                        <div
                          key={index}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                            index === selectedImageIndex
                              ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent'
                              : 'hover:ring-2 hover:ring-white/50'
                          }`}
                          onClick={() => setSelectedImageIndex(index)}
                        >
                          <Image
                            src={imageUrl}
                            alt={`${vehicle.brand} ${vehicle.model} - Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {index === selectedImageIndex && (
                            <div className="absolute inset-0 bg-blue-500/20" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-96 bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-xl border-2 border-dashed border-gray-400/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm-11 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zM5 11h14v3H5v-3z"/>
                      </svg>
                    </div>
                    <p className="text-white/70 font-medium">No images available</p>
                    <p className="text-white/50 text-sm mt-1">Images will be displayed here once uploaded</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Vehicle Specifications */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zm-11 0a1.5 1.5 0 01-3 0 1.5 1.5 0 013 0zM5 11h14v3H5v-3z"/>
                  </svg>
                </span>
                Vehicle Specifications
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-white/70">Brand</span>
                    <span className="text-white font-medium">{vehicle.brand}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-white/70">Model</span>
                    <span className="text-white font-medium">{vehicle.model}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-white/70">Year</span>
                    <span className="text-white font-medium">{vehicle.year}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-white/70">Type</span>
                    <span className="text-white font-medium">{vehicle.car_type}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-white/70">Color</span>
                    <span className="text-white font-medium">{vehicle.color || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-white/70">Transmission</span>
                    <span className="text-white font-medium">{vehicle.transmission || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-white/70">Fuel Type</span>
                    <span className="text-white font-medium">{vehicle.fuel_type || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-white/70">Seats</span>
                    <span className="text-white font-medium">{vehicle.seats || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              {/* Rental Terms */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">Rental Terms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Mileage Limit</span>
                      <span className="text-white font-medium">{vehicle.mileage_limit} km/day</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Fuel Policy</span>
                      <span className="text-white font-medium">{vehicle.fuel_policy}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {vehicle?.features && vehicle.features.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
                  <div className="flex flex-wrap gap-3">
                    {vehicle.features.map((feature, idx) => (
                      <span key={idx} className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 text-white text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Payment Information */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                  💳
                </span>
                Payment Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                  <h4 className="text-white font-semibold mb-3">Accepted Methods</h4>
                  <p className="text-white/80">CIB, Edahabia, Cash</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                  <h4 className="text-white font-semibold mb-3">Currency</h4>
                  <p className="text-white/80">Algerian Dinar (DZD)</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                  <h4 className="text-white font-semibold mb-3">Tax (TVA)</h4>
                  <p className="text-white/80">19% included</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-6 border border-green-500/20">
                  <h4 className="text-white font-semibold mb-3">Deposit</h4>
                  <p className="text-white/80">Required at pickup</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                  📞
                </span>
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
                  <h4 className="text-white font-semibold mb-3">Customer Service</h4>
                  <p className="text-white/80">+213 555 123 456</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
                  <h4 className="text-white font-semibold mb-3">Email</h4>
                  <p className="text-white/80">support@technocars.dz</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
                  <h4 className="text-white font-semibold mb-3">Office Hours</h4>
                  <p className="text-white/80">8:00 AM - 8:00 PM</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
                  <h4 className="text-white font-semibold mb-3">Emergency</h4>
                  <p className="text-white/80">+213 555 HELP (4357)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking & Actions */}
          <div className="space-y-8">
            
            {/* Pricing Card */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 border border-white/20 sticky top-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-playfair font-bold text-white mb-2">Rental Price</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {formatPriceDisplay(vehicle.price_per_day)}
                </div>
                <p className="text-white/70 text-sm mt-2">per day</p>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20 mb-6">
                <p className="text-white/80 text-sm text-center">
                  {language === 'fr' 
                    ? 'Prix incluant TVA (19%) selon la réglementation algérienne'
                    : 'Price including VAT (19%) according to Algerian regulations'
                  }
                </p>
              </div>

              {/* Booking Button */}
              {vehicle.availability ? (
                <button
                  onClick={handleBookingStart}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg mb-4"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>📅</span>
                    <span>Book This Vehicle</span>
                  </span>
                </button>
              ) : (
                <div className="w-full bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-300 font-semibold py-4 px-6 rounded-xl text-center mb-4">
                  <span className="flex items-center justify-center gap-2">
                    <span>❌</span>
                    <span>Currently Unavailable</span>
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-slate-600/20 to-slate-700/20 hover:from-slate-600/30 hover:to-slate-700/30 border border-slate-500/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <span>📥</span>
                  <span>Download Details</span>
                </button>
                
                <button 
                  onClick={() => router.push('/vehicles')}
                  className="w-full bg-gradient-to-r from-gray-600/20 to-gray-700/20 hover:from-gray-600/30 hover:to-gray-700/30 border border-gray-500/30 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>🔙</span>
                  <span>Back to Vehicles</span>
                </button>
              </div>
            </div>
          </div>
        </div>      </div>      {/* Image Modal */}
      {showImageModal && vehicle.image_urls && vehicle.image_urls.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-full max-h-full w-full h-full">
            {/* Control Bar */}
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {/* View Mode Toggle */}
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 flex items-center space-x-2">
                  <button
                    onClick={() => setImageViewMode('fit')}
                    className={`px-3 py-1 rounded text-sm transition-colors duration-300 ${
                      imageViewMode === 'fit' 
                        ? 'bg-blue-500 text-white' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Fit Screen
                  </button>
                  <button
                    onClick={() => setImageViewMode('full')}
                    className={`px-3 py-1 rounded text-sm transition-colors duration-300 ${
                      imageViewMode === 'full' 
                        ? 'bg-blue-500 text-white' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Full Size
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setImageViewMode('fit');
                }}
                className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-300"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            {/* Navigation Buttons */}
            {vehicle.image_urls.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(selectedImageIndex === 0 ? vehicle.image_urls.length - 1 : selectedImageIndex - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-300 z-10"
                >
                  <span className="text-xl">‹</span>
                </button>
                <button
                  onClick={() => setSelectedImageIndex(selectedImageIndex === vehicle.image_urls.length - 1 ? 0 : selectedImageIndex + 1)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-300 z-10"
                >
                  <span className="text-xl">›</span>
                </button>
              </>
            )}

            {/* Main Image Container */}
            <div className={`relative w-full h-full flex items-center justify-center ${
              imageViewMode === 'full' ? 'overflow-auto' : ''
            }`}>
              <div className={`relative ${imageViewMode === 'fit' ? 'max-w-full max-h-full' : ''}`}>
                <Image
                  src={vehicle.image_urls[selectedImageIndex]}
                  alt={`${vehicle.brand} ${vehicle.model} - Image ${selectedImageIndex + 1}`}
                  width={imageViewMode === 'fit' ? 1200 : 0}
                  height={imageViewMode === 'fit' ? 800 : 0}
                  sizes={imageViewMode === 'fit' ? '100vw' : 'none'}
                  className={`rounded-lg transition-all duration-300 ${
                    imageViewMode === 'fit' 
                      ? 'object-contain max-w-full max-h-full' 
                      : 'w-auto h-auto'
                  }`}
                  style={imageViewMode === 'full' ? {
                    maxWidth: 'none',
                    maxHeight: 'none',
                    width: 'auto',
                    height: 'auto'
                  } : {}}
                  unoptimized={imageViewMode === 'full'}
                  priority
                />
              </div>
            </div>

            {/* Image Info Bar */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center space-x-4">
              <span>{selectedImageIndex + 1} of {vehicle.image_urls.length}</span>
              {imageViewMode === 'full' && (
                <span className="text-sm text-white/70">• Full Resolution • Scroll to pan</span>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {vehicle.image_urls.length > 1 && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-full px-4">
                {vehicle.image_urls.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      index === selectedImageIndex
                        ? 'ring-2 ring-blue-400'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingForm && vehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <AlgerianBookingForm
              vehicle={vehicle}
              onSubmit={handleBookingSubmit}
              onCancel={handleBookingCancel}
              isSubmitting={isBooking}
            />
          </div>
        </div>
      )}
    </div>
  );
}
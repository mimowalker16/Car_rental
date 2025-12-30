'use client';

import { useState, useEffect } from 'react';
import { Vehicle, CarType } from '@/src/types/database';
import { vehicleService } from '@/src/services/vehicle.service';
import { convertUSDToDZD, formatDZDPrice, getPopularCarBrandsInAlgeria, convertDZDToUSD } from '@/src/utils/algeria';
import { getTranslations, detectLanguage } from '@/src/utils/i18n';
import Image from 'next/image';

interface VehicleFormModalProps {
  vehicle?: Vehicle;
  onClose: () => void;
  onSave: (vehicle: Partial<Vehicle>) => Promise<void>;
}

const carTypes: CarType[] = ['Sedan', 'SUV', 'Sports', 'Luxury', 'Electric', 'Van', 'Compact'];
const algerianCarBrands = getPopularCarBrandsInAlgeria();

export function VehicleFormModal({ vehicle, onClose, onSave }: VehicleFormModalProps) {
  const [language, setLanguage] = useState<'fr' | 'en'>('en');

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  const t = getTranslations(language);
  
  const [formData, setFormData] = useState({
    brand: vehicle?.brand || '',
    model: vehicle?.model || '',
    year: vehicle?.year || new Date().getFullYear(),
    car_type: vehicle?.car_type || 'Sedan',
    price_per_day: vehicle?.price_per_day || 0,
    mileage_limit: vehicle?.mileage_limit || 0,
    fuel_policy: vehicle?.fuel_policy || 'Full to Full',
    availability: vehicle?.availability ?? true,
  });

  // State for pricing display mode
  const [pricingMode, setPricingMode] = useState<'DZD' | 'USD'>('DZD');
  const [dzdPrice, setDzdPrice] = useState(vehicle?.price_per_day ? convertUSDToDZD(vehicle.price_per_day) : 0);

  const [images, setImages] = useState<File[]>([]);
  const [currentImages, setCurrentImages] = useState<string[]>(vehicle?.image_urls || []);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleRemoveCurrentImage = async (url: string, index: number) => {
    try {
      await vehicleService.deleteImage(url);
      setCurrentImages(currentImages.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  const handlePriceChange = (value: number) => {
    if (pricingMode === 'DZD') {
      setDzdPrice(value);
      setFormData({ ...formData, price_per_day: convertDZDToUSD(value) });
    } else {
      setFormData({ ...formData, price_per_day: value });
      setDzdPrice(convertUSDToDZD(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsUploading(true);    try {
      console.log('Starting vehicle save process...');
      console.log('Images to upload:', images);
      console.log('Current images:', currentImages);
        // Upload new images (only if there are any)
      let uploadedUrls: string[] = [];
      if (images.length > 0) {
        console.log('Uploading images...');
        try {
          uploadedUrls = await Promise.all(
            images.map(file => vehicleService.uploadImage(file))
          );
          console.log('Images uploaded successfully:', uploadedUrls);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          // If image upload fails, we can still create the vehicle without images
          console.log('Continuing without images due to upload error');
          uploadedUrls = [];
        }
      } else {
        console.log('No new images to upload');
      }

      // Combine with existing images that weren't removed
      const allImageUrls = [...currentImages, ...uploadedUrls];
      console.log('All image URLs:', allImageUrls);// Prepare vehicle data
      const vehicleData = {
        ...formData,
        image_urls: allImageUrls,
      };

      console.log('About to save vehicle data:', vehicleData);
      await onSave(vehicleData);
      onClose();    } catch (error) {
      console.error('Error saving vehicle:', error);
      console.error('Error type:', typeof error);
      console.error('Error constructor:', error?.constructor?.name);
      console.error('Error stringified:', JSON.stringify(error, null, 2));
      
      let errorMessage = 'An error occurred while saving the vehicle. Please try again.';
        if (error && typeof error === 'object' && 'message' in error) {
        const message = error.message as string;
        if (message.includes('permission') || message.includes('policy')) {
          errorMessage = 'You do not have permission to create vehicles. Please contact an administrator.';
        } else if (message.includes('duplicate') || message.includes('unique')) {
          errorMessage = 'A vehicle with similar details already exists.';
        } else if (message.includes('Bucket not found')) {
          errorMessage = 'Storage not configured. Vehicle created but images could not be uploaded.';
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="backdrop-blur-xl bg-white/90 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {vehicle ? t.vehicleForm.editVehicle : t.vehicleForm.addNewVehicle}
              </h2>
              <p className="text-slate-600 mt-2">{t.vehicleForm.fillVehicleDetails}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl p-2 transition-all duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm mr-3">1</span>
                {t.vehicleForm.basicInformation}
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.vehicleForm.brand}</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  >
                    <option value="">{t.vehicleForm.selectBrand}</option>
                    {algerianCarBrands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.vehicleForm.model}</label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                    placeholder={t.vehicleForm.modelPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.vehicleForm.year}</label>
                  <input
                    type="number"
                    required
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.vehicleForm.vehicleType}</label>
                  <select
                    value={formData.car_type}
                    onChange={(e) => setFormData({ ...formData, car_type: e.target.value as CarType })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  >                    {carTypes.map((type) => (
                      <option key={type} value={type}>
                        {t.vehicleForm.vehicleTypes[type.toLowerCase() as keyof typeof t.vehicleForm.vehicleTypes] || type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing & Policies Section */}
            <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
                {t.vehicleForm.pricingAndPolicies}
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-700">
                      {t.vehicleForm.pricePerDay} ({pricingMode})
                    </label>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => setPricingMode('DZD')}
                        className={`px-3 py-1 text-xs rounded-md transition-all ${
                          pricingMode === 'DZD' 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        DZD
                      </button>
                      <button
                        type="button"
                        onClick={() => setPricingMode('USD')}
                        className={`px-3 py-1 text-xs rounded-md transition-all ${
                          pricingMode === 'USD' 
                            ? 'bg-blue-500 text-white' 
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        USD
                      </button>
                    </div>
                  </div>
                  <input
                    type="number"
                    required
                    min={0}
                    step="0.01"
                    value={pricingMode === 'DZD' ? dzdPrice : formData.price_per_day}
                    onChange={(e) => handlePriceChange(parseFloat(e.target.value) || 0)}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                    placeholder="0.00"
                  />
                  {pricingMode === 'DZD' && (
                    <p className="text-xs text-gray-500 mt-1">
                      ≈ ${formData.price_per_day.toFixed(2)} USD
                    </p>
                  )}
                  {pricingMode === 'USD' && (
                    <p className="text-xs text-gray-500 mt-1">
                      ≈ {formatDZDPrice(dzdPrice)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.vehicleForm.mileageLimit}</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.mileage_limit}
                    onChange={(e) => setFormData({ ...formData, mileage_limit: parseInt(e.target.value) || 0 })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                    placeholder={t.vehicleForm.mileagePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.vehicleForm.fuelPolicy}</label>
                  <select
                    value={formData.fuel_policy}
                    onChange={(e) => setFormData({ ...formData, fuel_policy: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  >
                    <option value="Full to Full">{t.vehicleForm.fuelPolicies.fullToFull}</option>
                    <option value="Same to Same">{t.vehicleForm.fuelPolicies.sameToSame}</option>
                    <option value="Pre-Purchase">{t.vehicleForm.fuelPolicies.prePurchase}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.vehicleForm.availability}</label>
                  <select
                    value={formData.availability.toString()}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value === 'true' })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  >
                    <option value="true">{t.vehicleForm.available}</option>
                    <option value="false">{t.vehicleForm.unavailable}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm mr-3">3</span>
                {t.vehicleForm.vehicleImages}
              </h3>
              
              {/* Current Images */}
              {currentImages.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">{t.vehicleForm.currentImages}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentImages.map((url, index) => (
                      <div key={url} className="relative group">
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <Image
                            src={url}
                            alt={`Vehicle image ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCurrentImage(url, index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images Preview */}
              {images.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">{t.vehicleForm.newImagesToUpload}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`New image ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* File Upload */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="sr-only"
                  id="vehicle-images"
                />
                <label
                  htmlFor="vehicle-images"
                  className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-slate-600 text-center">
                    <span className="font-semibold">{t.vehicleForm.clickToUpload}</span>
                    <br />
                    <span className="text-sm">{t.vehicleForm.uploadLimit}</span>
                  </p>
                </label>
              </div>
            </div>

            {error && (
              <div className="backdrop-blur-sm bg-red-50/80 border border-red-200 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-6 border-t border-white/20">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-300"
              >
                {t.vehicleForm.cancel}
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                {isUploading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {vehicle ? t.vehicleForm.updating : t.vehicleForm.creating}
                  </div>
                ) : (
                  vehicle ? t.vehicleForm.updateVehicle : t.vehicleForm.addVehicle
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
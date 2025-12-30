'use client';

import React, { useState, useEffect } from 'react';
import { AlgerianPhoneInput } from '@/src/components/common/AlgerianPhoneInput';
import { WilayaSelect } from '@/src/components/common/WilayaSelect';
import { AlgerianPaymentMethods } from '@/src/components/common/AlgerianPaymentMethods';
import { calculateTVA, formatDZDPrice, convertUSDToDZD } from '@/src/utils/algeria';
import { getTranslations, detectLanguage } from '@/src/utils/i18n';
import { Vehicle } from '@/src/types/database';

interface AlgerianBookingFormProps {
  vehicle: Vehicle;
  onSubmit: (bookingData: unknown) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const AlgerianBookingForm: React.FC<AlgerianBookingFormProps> = ({
  vehicle,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('en');
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationalId: '',
    
    // Address Information
    address: '',
    wilaya: '',
    city: '',
    postalCode: '',
    
    // Booking Details
    startDate: '',
    endDate: '',
    pickupTime: '09:00',
    returnTime: '18:00',
    additionalDrivers: 0,
    
    // Payment
    paymentMethod: '',
    
    // Insurance (Algeria specific)
    insuranceType: 'basic', // basic (mandatory), comprehensive, collision
    
    // Special Requests
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  const t = getTranslations(language);

  // Calculate pricing
  const calculateBookingPrice = () => {
    if (!formData.startDate || !formData.endDate) return null;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return null;
    
    const basePriceUSD = vehicle.price_per_day * days;
    const basePriceDZD = convertUSDToDZD(basePriceUSD);
    
    // Additional costs
    const additionalDriverCost = formData.additionalDrivers * 500 * days; // 500 DZD per driver per day
    const insuranceCost = formData.insuranceType === 'comprehensive' ? basePriceDZD * 0.15 : 
                         formData.insuranceType === 'collision' ? basePriceDZD * 0.10 : 0;
    
    const subtotal = basePriceDZD + additionalDriverCost + insuranceCost;
    const tva = calculateTVA(subtotal);
    const total = subtotal + tva;
    
    return {
      days,
      basePriceDZD,
      additionalDriverCost,
      insuranceCost,
      subtotal,
      tva,
      total
    };
  };

  const pricing = calculateBookingPrice();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields validation
    if (!formData.fullName) newErrors.fullName = language === 'fr' ? 'Nom complet requis' : 'Full name required';
    if (!formData.email) newErrors.email = language === 'fr' ? 'Email requis' : 'Email required';
    if (!formData.phone) newErrors.phone = language === 'fr' ? 'Téléphone requis' : 'Phone required';
    if (!formData.nationalId) newErrors.nationalId = language === 'fr' ? 'Pièce d\'identité requise' : 'National ID required';
    if (!formData.wilaya) newErrors.wilaya = language === 'fr' ? 'Wilaya requise' : 'Wilaya required';
    if (!formData.startDate) newErrors.startDate = language === 'fr' ? 'Date de début requise' : 'Start date required';
    if (!formData.endDate) newErrors.endDate = language === 'fr' ? 'Date de fin requise' : 'End date required';
    if (!formData.paymentMethod) newErrors.paymentMethod = language === 'fr' ? 'Méthode de paiement requise' : 'Payment method required';
    
    // Date validation
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (start < today) {
        newErrors.startDate = language === 'fr' ? 'Date de début ne peut pas être dans le passé' : 'Start date cannot be in the past';
      }
      if (end <= start) {
        newErrors.endDate = language === 'fr' ? 'Date de fin doit être après la date de début' : 'End date must be after start date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!pricing) return;
    
    const bookingData = {
      ...formData,
      vehicleId: vehicle.id,
      pricing,
      totalAmount: pricing.total,
      currency: 'DZD'
    };
    
    await onSubmit(bookingData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="backdrop-blur-xl bg-white/90 rounded-2xl shadow-2xl border border-white/20">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.booking.title}
            </h2>
            <p className="text-slate-600 mt-2">
              {vehicle.brand} {vehicle.model} ({vehicle.year})
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm mr-3">1</span>
                {language === 'fr' ? 'Informations personnelles' : 'Personal Information'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.forms.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800"
                    placeholder={language === 'fr' ? 'Nom complet' : 'Full name'}
                  />
                  {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.forms.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800"
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                <AlgerianPhoneInput
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value })}
                  label={t.forms.phone}
                  required
                  error={errors.phone}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {language === 'fr' ? 'Date de naissance' : 'Date of Birth'}
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {language === 'fr' ? 'Numéro de carte d\'identité' : 'National ID Number'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800"
                    placeholder={language === 'fr' ? '18 chiffres' : '18 digits'}
                  />
                  {errors.nationalId && <p className="text-sm text-red-600 mt-1">{errors.nationalId}</p>}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
                {language === 'fr' ? 'Adresse' : 'Address'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.forms.address}
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800"
                    placeholder={language === 'fr' ? 'Rue, numéro, quartier' : 'Street, number, district'}
                  />
                </div>

                <WilayaSelect
                  value={formData.wilaya}
                  onChange={(value) => setFormData({ ...formData, wilaya: value })}
                  label={t.forms.wilaya}
                  required
                  error={errors.wilaya}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.forms.city}
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800"
                    placeholder={language === 'fr' ? 'Ville ou commune' : 'City or municipality'}
                  />
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm mr-3">3</span>
                {language === 'fr' ? 'Détails de réservation' : 'Booking Details'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {language === 'fr' ? 'Date de début' : 'Start Date'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.startDate && <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {language === 'fr' ? 'Date de fin' : 'End Date'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800"
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                  />
                  {errors.endDate && <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {language === 'fr' ? 'Heure de prise' : 'Pickup Time'}
                  </label>
                  <input
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {language === 'fr' ? 'Heure de retour' : 'Return Time'}
                  </label>
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                    className="w-full backdrop-blur-sm bg-white/70 border border-white/30 rounded-xl px-4 py-3 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm mr-3">4</span>
                {language === 'fr' ? 'Assurance' : 'Insurance'}
              </h3>
              
              <div className="space-y-4">
                {[
                  { id: 'basic', name: language === 'fr' ? 'Assurance de base (obligatoire)' : 'Basic Insurance (mandatory)', description: language === 'fr' ? 'Assurance responsabilité civile selon la loi algérienne' : 'Third-party liability insurance as per Algerian law', cost: 0 },
                  { id: 'comprehensive', name: language === 'fr' ? 'Assurance tous risques' : 'Comprehensive Insurance', description: language === 'fr' ? 'Couverture complète incluant vol et dommages' : 'Full coverage including theft and damage', cost: pricing ? Math.round(pricing.basePriceDZD * 0.15) : 0 },
                  { id: 'collision', name: language === 'fr' ? 'Assurance collision' : 'Collision Insurance', description: language === 'fr' ? 'Couverture des dommages de collision' : 'Collision damage coverage', cost: pricing ? Math.round(pricing.basePriceDZD * 0.10) : 0 }
                ].map((insurance) => (
                  <label
                    key={insurance.id}
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${formData.insuranceType === insurance.id ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    <input
                      type="radio"
                      name="insurance"
                      value={insurance.id}
                      checked={formData.insuranceType === insurance.id}
                      onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">{insurance.name}</div>
                      <div className="text-sm text-slate-600">{insurance.description}</div>
                      <div className="text-sm font-medium text-blue-600">
                        {insurance.cost > 0 ? `+${formatDZDPrice(insurance.cost)}` : language === 'fr' ? 'Inclus' : 'Included'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm mr-3">5</span>
                {language === 'fr' ? 'Méthode de paiement' : 'Payment Method'}
              </h3>
              
              <AlgerianPaymentMethods
                selectedMethod={formData.paymentMethod}
                onMethodChange={(method) => setFormData({ ...formData, paymentMethod: method })}
                amount={pricing?.total || 0}
              />
              {errors.paymentMethod && <p className="text-sm text-red-600 mt-2">{errors.paymentMethod}</p>}
            </div>

            {/* Price Summary */}
            {pricing && (
              <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                    </svg>
                  </span>
                  {language === 'fr' ? 'Résumé des prix' : 'Price Summary'}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>{language === 'fr' ? `Location (${pricing.days} jour${pricing.days > 1 ? 's' : ''})` : `Rental (${pricing.days} day${pricing.days > 1 ? 's' : ''})`}</span>
                    <span>{formatDZDPrice(pricing.basePriceDZD)}</span>
                  </div>
                  {pricing.additionalDriverCost > 0 && (
                    <div className="flex justify-between">
                      <span>{language === 'fr' ? 'Conducteurs supplémentaires' : 'Additional drivers'}</span>
                      <span>{formatDZDPrice(pricing.additionalDriverCost)}</span>
                    </div>
                  )}
                  {pricing.insuranceCost > 0 && (
                    <div className="flex justify-between">
                      <span>{language === 'fr' ? 'Assurance supplémentaire' : 'Additional insurance'}</span>
                      <span>{formatDZDPrice(pricing.insuranceCost)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between">
                    <span>{language === 'fr' ? 'Sous-total' : 'Subtotal'}</span>
                    <span>{formatDZDPrice(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA (19%)</span>
                    <span>{formatDZDPrice(pricing.tva)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>{language === 'fr' ? 'Total' : 'Total'}</span>
                    <span className="text-blue-600">{formatDZDPrice(pricing.total)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-white/20">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-300"
              >
                {t.vehicleForm.cancel}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !pricing}
                className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 ${
                  isSubmitting || !pricing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {language === 'fr' ? 'Réservation...' : 'Booking...'}
                  </div>
                ) : (
                  language === 'fr' ? 'Confirmer la réservation' : 'Confirm Booking'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

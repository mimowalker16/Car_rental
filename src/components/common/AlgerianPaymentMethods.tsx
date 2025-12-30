'use client';

import React, { useState, useEffect } from 'react';
import { ALGERIAN_PAYMENT_METHODS } from '@/src/utils/algeria';
import { detectLanguage } from '@/src/utils/i18n';

interface AlgerianPaymentMethodsProps {
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
  amount: number;
  label?: string;
}

export const AlgerianPaymentMethods: React.FC<AlgerianPaymentMethodsProps> = ({
  selectedMethod,
  onMethodChange,
  label
}) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('en');

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  return (
    <div className="space-y-4">
      {label && (
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{label}</h3>
      )}
      
      <div className="grid grid-cols-1 gap-3">
        {ALGERIAN_PAYMENT_METHODS.map((method) => (
          <label
            key={method.id}
            className={`
              flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300
              border-2 backdrop-blur-sm
              ${selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50/50 shadow-md'
                : 'border-white/30 bg-white/70 hover:border-blue-300 hover:bg-blue-50/30'
              }
            `}
          >
            <input
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => onMethodChange(e.target.value)}
              className="sr-only"
            />
            
            <div className="flex-1 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <span className="text-2xl">{method.icon}</span>
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-slate-800">
                  {method.name}
                </div>
                <div className="text-sm text-slate-600">
                  {method.nameAr}
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-slate-300'
                  }
                `}>
                  {selectedMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Payment method specific information */}
      {selectedMethod && (
        <div className="mt-4 p-4 rounded-xl bg-blue-50/50 border border-blue-200">
          <div className="text-sm text-blue-800">
            {selectedMethod === 'cib' && (
              <div>
                <p className="font-medium">
                  {language === 'fr' ? 'Carte Interbancaire (CIB)' : 'Interbank Card (CIB)'}
                </p>
                <p>
                  {language === 'fr' 
                    ? 'Acceptée dans toutes les banques algériennes'
                    : 'Accepted in all Algerian banks'
                  }
                </p>
              </div>
            )}
            {selectedMethod === 'edahabia' && (
              <div>
                <p className="font-medium">
                  {language === 'fr' ? 'Carte Edahabia (Algérie Poste)' : 'Edahabia Card (Algeria Post)'}
                </p>
                <p>
                  {language === 'fr' 
                    ? 'Carte prépayée d\'Algérie Poste'
                    : 'Algeria Post prepaid card'
                  }
                </p>
              </div>
            )}
            {selectedMethod === 'satim' && (
              <div>
                <p className="font-medium">
                  {language === 'fr' ? 'Carte SATIM' : 'SATIM Card'}
                </p>
                <p>
                  {language === 'fr' 
                    ? 'Système de télépaiement interbancaire'
                    : 'Interbank remote payment system'
                  }
                </p>
              </div>
            )}
            {selectedMethod === 'bank_transfer' && (
              <div>
                <p className="font-medium">
                  {language === 'fr' ? 'Virement bancaire' : 'Bank Transfer'}
                </p>
                <p>
                  {language === 'fr' 
                    ? 'Transfert direct vers notre compte bancaire'
                    : 'Direct transfer to our bank account'
                  }
                </p>
              </div>
            )}
            {selectedMethod === 'cash' && (
              <div>
                <p className="font-medium">
                  {language === 'fr' ? 'Paiement en espèces' : 'Cash Payment'}
                </p>
                <p>
                  {language === 'fr' 
                    ? 'Paiement lors de la prise du véhicule'
                    : 'Payment when picking up the vehicle'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

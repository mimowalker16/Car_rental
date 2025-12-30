// Algeria-specific email service for booking confirmations
import { formatDZDPrice, ALGERIAN_WILAYAS } from '@/src/utils/algeria';

export interface AlgerianBookingEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerWilaya: string;
  vehicleBrand: string;
  vehicleModel: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  basePrice: number;
  tvaAmount: number;
  totalPrice: number;
  paymentMethod: string;
  bookingReference: string;
  pickupLocation: string;
  returnLocation: string;
  driverLicense: string;
  nationalId: string;
  language: 'fr' | 'en';
}

export const generateAlgerianBookingConfirmationEmail = (data: AlgerianBookingEmailData): string => {
  const wilaya = ALGERIAN_WILAYAS.find(w => w.code === data.customerWilaya);
  const wilayaName = wilaya ? (data.language === 'fr' ? wilaya.nameEn : wilaya.name) : data.customerWilaya;

  if (data.language === 'fr') {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de Réservation - Techno Cars</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .info-label { font-weight: semibold; color: #64748b; }
        .info-value { color: #1e293b; }
        .price-summary { background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .total-price { font-size: 24px; font-weight: bold; color: #059669; text-align: center; margin-top: 15px; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
        .algerian-flag { font-size: 24px; margin-right: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><span class="algerian-flag">🇩🇿</span>Techno Cars Algérie</h1>
            <h2>Confirmation de Réservation</h2>
            <p>Référence: <strong>${data.bookingReference}</strong></p>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">Informations Client</div>
                <div class="info-row">
                    <span class="info-label">Nom complet:</span>
                    <span class="info-value">${data.customerName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${data.customerEmail}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Téléphone:</span>
                    <span class="info-value">${data.customerPhone}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Adresse:</span>
                    <span class="info-value">${data.customerAddress}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Wilaya:</span>
                    <span class="info-value">${wilayaName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Permis de conduire:</span>
                    <span class="info-value">${data.driverLicense}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Carte d'identité:</span>
                    <span class="info-value">${data.nationalId}</span>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Détails du Véhicule</div>
                <div class="info-row">
                    <span class="info-label">Véhicule:</span>
                    <span class="info-value">${data.vehicleBrand} ${data.vehicleModel}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Date de début:</span>
                    <span class="info-value">${new Date(data.startDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Date de fin:</span>
                    <span class="info-value">${new Date(data.endDate).toLocaleDateString('fr-FR')}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Durée:</span>
                    <span class="info-value">${data.totalDays} jour(s)</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Lieu de prise en charge:</span>
                    <span class="info-value">${data.pickupLocation}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Lieu de retour:</span>
                    <span class="info-value">${data.returnLocation}</span>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Résumé des Prix</div>
                <div class="price-summary">
                    <div class="info-row">
                        <span class="info-label">Prix de base (${data.totalDays} jours):</span>
                        <span class="info-value">${formatDZDPrice(data.basePrice)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">TVA (19%):</span>
                        <span class="info-value">${formatDZDPrice(data.tvaAmount)}</span>
                    </div>
                    <hr style="margin: 15px 0; border: none; border-top: 1px solid #e2e8f0;">
                    <div class="total-price">
                        Total: ${formatDZDPrice(data.totalPrice)}
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Mode de Paiement</div>
                <div class="info-row">
                    <span class="info-label">Méthode sélectionnée:</span>
                    <span class="info-value">${data.paymentMethod}</span>
                </div>
            </div>
            
            <div class="section">
                <h3 style="color: #dc2626;">⚠️ Informations Importantes</h3>
                <ul style="color: #374151; line-height: 1.6;">
                    <li>Veuillez vous présenter 30 minutes avant l'heure de prise en charge</li>
                    <li>Apportez votre permis de conduire et votre carte d'identité nationale</li>
                    <li>Le véhicule doit être retourné avec le même niveau de carburant</li>
                    <li>Toute modification doit être signalée 24h à l'avance</li>
                    <li>Assurance obligatoire incluse conformément à la loi algérienne</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Techno Cars Algérie</strong></p>
            <p>Service Client: +213 XXX XXX XXX | Email: support@technocars.dz</p>
            <p>Merci de votre confiance !</p>
        </div>
    </div>
</body>
</html>
    `;
  } else {
    // English version
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - Techno Cars</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: bold; color: #1e293b; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .info-label { font-weight: semibold; color: #64748b; }
        .info-value { color: #1e293b; }
        .price-summary { background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .total-price { font-size: 24px; font-weight: bold; color: #059669; text-align: center; margin-top: 15px; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
        .algerian-flag { font-size: 24px; margin-right: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><span class="algerian-flag">🇩🇿</span>Techno Cars Algeria</h1>
            <h2>Booking Confirmation</h2>
            <p>Reference: <strong>${data.bookingReference}</strong></p>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">Customer Information</div>
                <div class="info-row">
                    <span class="info-label">Full Name:</span>
                    <span class="info-value">${data.customerName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${data.customerEmail}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value">${data.customerPhone}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Address:</span>
                    <span class="info-value">${data.customerAddress}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Wilaya:</span>
                    <span class="info-value">${wilayaName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Driver's License:</span>
                    <span class="info-value">${data.driverLicense}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">National ID:</span>
                    <span class="info-value">${data.nationalId}</span>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Vehicle Details</div>
                <div class="info-row">
                    <span class="info-label">Vehicle:</span>
                    <span class="info-value">${data.vehicleBrand} ${data.vehicleModel}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Start Date:</span>
                    <span class="info-value">${new Date(data.startDate).toLocaleDateString('en-US')}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">End Date:</span>
                    <span class="info-value">${new Date(data.endDate).toLocaleDateString('en-US')}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Duration:</span>
                    <span class="info-value">${data.totalDays} day(s)</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Pickup Location:</span>
                    <span class="info-value">${data.pickupLocation}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Return Location:</span>
                    <span class="info-value">${data.returnLocation}</span>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Price Summary</div>
                <div class="price-summary">
                    <div class="info-row">
                        <span class="info-label">Base Price (${data.totalDays} days):</span>
                        <span class="info-value">${formatDZDPrice(data.basePrice)}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">VAT (19%):</span>
                        <span class="info-value">${formatDZDPrice(data.tvaAmount)}</span>
                    </div>
                    <hr style="margin: 15px 0; border: none; border-top: 1px solid #e2e8f0;">
                    <div class="total-price">
                        Total: ${formatDZDPrice(data.totalPrice)}
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Payment Method</div>
                <div class="info-row">
                    <span class="info-label">Selected Method:</span>
                    <span class="info-value">${data.paymentMethod}</span>
                </div>
            </div>
            
            <div class="section">
                <h3 style="color: #dc2626;">⚠️ Important Information</h3>
                <ul style="color: #374151; line-height: 1.6;">
                    <li>Please arrive 30 minutes before pickup time</li>
                    <li>Bring your driver's license and national ID card</li>
                    <li>Vehicle must be returned with the same fuel level</li>
                    <li>Any modifications must be reported 24 hours in advance</li>
                    <li>Mandatory insurance included as per Algerian law</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Techno Cars Algeria</strong></p>
            <p>Customer Service: +213 XXX XXX XXX | Email: support@technocars.dz</p>
            <p>Thank you for choosing us!</p>
        </div>
    </div>
</body>
</html>
    `;
  }
};

export const sendAlgerianBookingConfirmation = async (emailData: AlgerianBookingEmailData): Promise<boolean> => {
  try {
    // In a real implementation, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Or a local SMTP server
    
    const emailHtml = generateAlgerianBookingConfirmationEmail(emailData);
    
    // For demo purposes, we'll just log the email
    console.log('📧 Algeria Booking Confirmation Email Generated:');
    console.log(`To: ${emailData.customerEmail}`);
    console.log(`Subject: ${emailData.language === 'fr' ? 'Confirmation de réservation' : 'Booking Confirmation'} - ${emailData.bookingReference}`);
    console.log('Email HTML length:', emailHtml.length);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Error sending Algeria booking confirmation email:', error);
    return false;
  }
};

export const generateBookingReference = (): string => {
  const prefix = 'DZ'; // Algeria country code
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

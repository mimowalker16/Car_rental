// Algeria-specific utility functions for the Techno Cars platform

// Currency conversion (USD to DZD)
const USD_TO_DZD_RATE = 135.5; // Current exchange rate (as of 2024)

export const convertUSDToDZD = (usdAmount: number): number => {
  return Math.round(usdAmount * USD_TO_DZD_RATE);
};

export const convertDZDToUSD = (dzdAmount: number): number => {
  return Math.round((dzdAmount / USD_TO_DZD_RATE) * 100) / 100; // Round to 2 decimal places
};

export const formatDZDPrice = (dzdAmount: number): string => {
  return new Intl.NumberFormat('ar-DZ', {
    style: 'currency',
    currency: 'DZD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dzdAmount);
};

// Phone number validation for Algeria (+213)
export const validateAlgerianPhone = (phone: string): boolean => {
  // Remove all non-digits
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it starts with 213 (country code) or is 9 digits local
  if (cleanPhone.startsWith('213')) {
    return cleanPhone.length === 12; // 213 + 9 digits
  }
  
  // Local format: 9 digits starting with 5, 6, or 7
  return cleanPhone.length === 9 && /^[567]/.test(cleanPhone);
};

export const formatAlgerianPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.startsWith('213')) {
    // Format: +213 X XX XX XX XX
    const local = cleanPhone.substring(3);
    return `+213 ${local.substring(0, 1)} ${local.substring(1, 3)} ${local.substring(3, 5)} ${local.substring(5, 7)} ${local.substring(7, 9)}`;
  }
  
  if (cleanPhone.length === 9) {
    // Format: 0X XX XX XX XX
    return `0${cleanPhone.substring(0, 1)} ${cleanPhone.substring(1, 3)} ${cleanPhone.substring(3, 5)} ${cleanPhone.substring(5, 7)} ${cleanPhone.substring(7, 9)}`;
  }
  
  return phone;
};

// Algerian Wilaya (provinces) list
export const ALGERIAN_WILAYAS = [
  { code: '01', name: 'أدرار', nameEn: 'Adrar' },
  { code: '02', name: 'الشلف', nameEn: 'Chlef' },
  { code: '03', name: 'الأغواط', nameEn: 'Laghouat' },
  { code: '04', name: 'أم البواقي', nameEn: 'Oum El Bouaghi' },
  { code: '05', name: 'باتنة', nameEn: 'Batna' },
  { code: '06', name: 'بجاية', nameEn: 'Béjaïa' },
  { code: '07', name: 'بسكرة', nameEn: 'Biskra' },
  { code: '08', name: 'بشار', nameEn: 'Béchar' },
  { code: '09', name: 'البليدة', nameEn: 'Blida' },
  { code: '10', name: 'البويرة', nameEn: 'Bouira' },
  { code: '11', name: 'تمنراست', nameEn: 'Tamanrasset' },
  { code: '12', name: 'تبسة', nameEn: 'Tébessa' },
  { code: '13', name: 'تلمسان', nameEn: 'Tlemcen' },
  { code: '14', name: 'تيارت', nameEn: 'Tiaret' },
  { code: '15', name: 'تيزي وزو', nameEn: 'Tizi Ouzou' },
  { code: '16', name: 'الجزائر', nameEn: 'Algiers' },
  { code: '17', name: 'الجلفة', nameEn: 'Djelfa' },
  { code: '18', name: 'جيجل', nameEn: 'Jijel' },
  { code: '19', name: 'سطيف', nameEn: 'Sétif' },
  { code: '20', name: 'سعيدة', nameEn: 'Saïda' },
  { code: '21', name: 'سكيكدة', nameEn: 'Skikda' },
  { code: '22', name: 'سيدي بلعباس', nameEn: 'Sidi Bel Abbès' },
  { code: '23', name: 'عنابة', nameEn: 'Annaba' },
  { code: '24', name: 'قالمة', nameEn: 'Guelma' },
  { code: '25', name: 'قسنطينة', nameEn: 'Constantine' },
  { code: '26', name: 'المدية', nameEn: 'Médéa' },
  { code: '27', name: 'مستغانم', nameEn: 'Mostaganem' },
  { code: '28', name: 'المسيلة', nameEn: 'M\'Sila' },
  { code: '29', name: 'معسكر', nameEn: 'Mascara' },
  { code: '30', name: 'ورقلة', nameEn: 'Ouargla' },
  { code: '31', name: 'وهران', nameEn: 'Oran' },
  { code: '32', name: 'البيض', nameEn: 'El Bayadh' },
  { code: '33', name: 'إليزي', nameEn: 'Illizi' },
  { code: '34', name: 'برج بوعريريج', nameEn: 'Bordj Bou Arréridj' },
  { code: '35', name: 'بومرداس', nameEn: 'Boumerdès' },
  { code: '36', name: 'الطارف', nameEn: 'El Tarf' },
  { code: '37', name: 'تندوف', nameEn: 'Tindouf' },
  { code: '38', name: 'تيسمسيلت', nameEn: 'Tissemsilt' },
  { code: '39', name: 'الوادي', nameEn: 'El Oued' },
  { code: '40', name: 'خنشلة', nameEn: 'Khenchela' },
  { code: '41', name: 'سوق أهراس', nameEn: 'Souk Ahras' },
  { code: '42', name: 'تيبازة', nameEn: 'Tipaza' },
  { code: '43', name: 'ميلة', nameEn: 'Mila' },
  { code: '44', name: 'عين الدفلى', nameEn: 'Aïn Defla' },
  { code: '45', name: 'النعامة', nameEn: 'Naâma' },
  { code: '46', name: 'عين تموشنت', nameEn: 'Aïn Témouchent' },
  { code: '47', name: 'غرداية', nameEn: 'Ghardaïa' },
  { code: '48', name: 'غليزان', nameEn: 'Relizane' },
  { code: '49', name: 'تيميمون', nameEn: 'Timimoun' },
  { code: '50', name: 'برج باجي مختار', nameEn: 'Bordj Badji Mokhtar' },
  { code: '51', name: 'أولاد جلال', nameEn: 'Ouled Djellal' },
  { code: '52', name: 'بني عباس', nameEn: 'Béni Abbès' },
  { code: '53', name: 'عين صالح', nameEn: 'In Salah' },
  { code: '54', name: 'عين قزام', nameEn: 'In Guezzam' },
  { code: '55', name: 'توقرت', nameEn: 'Touggourt' },
  { code: '56', name: 'جانت', nameEn: 'Djanet' },
  { code: '57', name: 'المغير', nameEn: 'El Meghaier' },
  { code: '58', name: 'المنيعة', nameEn: 'El Meniaa' }
];

// Algerian payment methods
export const ALGERIAN_PAYMENT_METHODS = [
  { 
    id: 'cib', 
    name: 'CIB (Carte Interbancaire)', 
    nameAr: 'البطاقة المصرفية المشتركة',
    icon: '💳'
  },
  { 
    id: 'edahabia', 
    name: 'Edahabia (Algeria Post)', 
    nameAr: 'الذهبية',
    icon: '🏛️'
  },
  { 
    id: 'satim', 
    name: 'SATIM Card', 
    nameAr: 'بطاقة ساتيم',
    icon: 'card'
  },
  { 
    id: 'bank_transfer', 
    name: 'Bank Transfer', 
    nameAr: 'حوالة مصرفية',
    icon: 'bank'
  },
  { 
    id: 'cash', 
    name: 'Cash Payment', 
    nameAr: 'دفع نقدي',
    icon: '💵'
  }
];

// Popular car brands in Algeria
export const ALGERIAN_CAR_BRANDS = [
  'Renault', 'Peugeot', 'Citroën', 'Dacia', 'Hyundai', 'Kia', 
  'Toyota', 'Nissan', 'Volkswagen', 'Ford', 'Chevrolet', 'SEAT',
  'Skoda', 'Fiat', 'Opel', 'Mitsubishi', 'Suzuki', 'Isuzu'
];

// Function to get popular car brands in Algeria
export const getPopularCarBrandsInAlgeria = (): string[] => {
  return ALGERIAN_CAR_BRANDS;
};

// TVA (Tax) calculation for Algeria
export const ALGERIA_TVA_RATE = 0.19; // 19% VAT

export const calculateTVA = (amount: number): number => {
  return Math.round(amount * ALGERIA_TVA_RATE);
};

export const calculateTotalWithTVA = (amount: number): number => {
  return amount + calculateTVA(amount);
};

// Islamic calendar dates (important Islamic holidays)
export const ISLAMIC_HOLIDAYS_2024 = [
  { date: '2024-04-10', name: 'Eid al-Fitr', nameAr: 'عيد الفطر' },
  { date: '2024-06-16', name: 'Eid al-Adha', nameAr: 'عيد الأضحى' },
  { date: '2024-07-07', name: 'Islamic New Year', nameAr: 'رأس السنة الهجرية' },
  { date: '2024-09-15', name: 'Mawlid al-Nabi', nameAr: 'المولد النبوي' }
];

// Algerian business hours
export const ALGERIA_BUSINESS_HOURS = {
  weekdays: {
    start: '08:00',
    end: '17:00',
    lunchBreak: { start: '12:00', end: '13:00' }
  },
  saturday: {
    start: '08:00',
    end: '12:00'
  },
  friday: {
    start: '08:00',
    end: '12:00' // Half day before Jumu'ah prayer
  },
  ramadan: {
    start: '09:00',
    end: '15:00' // Shorter hours during Ramadan
  }
};

// Validate Algerian National ID (Carte Nationale)
export const validateAlgerianNationalId = (id: string): boolean => {
  // Remove all non-digits and letters
  const cleanId = id.replace(/[^0-9]/g, '');
  
  // Algerian National ID is typically 18 digits
  return cleanId.length === 18;
};

// Format date in Arabic
export const formatDateArabic = (date: Date): string => {
  return new Intl.DateTimeFormat('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  }).format(date);
};

// Check if date is an Algerian holiday
export const isAlgerianHoliday = (date: Date): boolean => {
  const dateString = date.toISOString().split('T')[0];
  
  // National holidays
  const nationalHolidays = [
    '2024-01-01', // New Year
    '2024-01-12', // Amazigh New Year
    '2024-05-01', // Labor Day
    '2024-07-05', // Independence Day
    '2024-11-01', // Revolution Day
  ];
  
  // Check Islamic holidays
  const islamicHolidays = ISLAMIC_HOLIDAYS_2024.map(h => h.date);
  
  return nationalHolidays.includes(dateString) || islamicHolidays.includes(dateString);
};

// Insurance types required in Algeria
export const ALGERIA_INSURANCE_TYPES = [
  {
    id: 'basic',
    name: 'Third Party Insurance',
    nameAr: 'تأمين ضد الغير',
    required: true,
    description: 'Mandatory basic insurance as per Algerian law'
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Insurance',
    nameAr: 'تأمين شامل',
    required: false,
    description: 'Full coverage including theft and damage'
  },
  {
    id: 'collision',
    name: 'Collision Coverage',
    nameAr: 'تأمين ضد التصادم',
    required: false,
    description: 'Coverage for collision damages'
  }
];

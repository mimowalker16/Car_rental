// French and English language translations for Techno Cars Algeria

export const FR_TRANSLATIONS = {
  // Navigation
  nav: {
    home: 'Accueil',
    vehicles: 'Véhicules',
    about: 'À propos',
    contact: 'Contact',
    login: 'Connexion',
    register: 'S\'inscrire',
    dashboard: 'Tableau de bord',
    logout: 'Déconnexion',
    profile: 'Profil'
  },

  // Vehicle types
  vehicleTypes: {
    'Sedan': 'Berline',
    'SUV': 'SUV',
    'Sports': 'Sportive',
    'Luxury': 'Luxe',
    'Electric': 'Électrique',
    'Van': 'Fourgonnette',
    'Compact': 'Compacte'
  },

  // Vehicle details
  vehicle: {
    brand: 'Marque',
    model: 'Modèle',
    year: 'Année',
    type: 'Type',
    pricePerDay: 'Prix par jour',
    mileageLimit: 'Limite kilométrage',
    fuelPolicy: 'Politique carburant',
    availability: 'Disponibilité',
    features: 'Caractéristiques',
    bookNow: 'Réserver maintenant',
    viewDetails: 'Voir détails',
    kmPerDay: 'km/jour',
    automatic: 'Automatique',
    manual: 'Manuel',
    airConditioning: 'Climatisation',
    bluetooth: 'Bluetooth',
    gps: 'GPS'
  },

  // Booking
  booking: {
    title: 'Réservation véhicule',
    selectDates: 'Sélectionner les dates',
    startDate: 'Date début',
    endDate: 'Date fin',
    totalDays: 'Nombre de jours',
    totalPrice: 'Prix total',
    priceBreakdown: 'Détail du prix',
    basePrice: 'Prix de base',
    taxes: 'Taxes (TVA)',
    insurance: 'Assurance',
    finalTotal: 'Total final',
    confirmBooking: 'Confirmer réservation',
    pickupLocation: 'Lieu de prise en charge',
    returnLocation: 'Lieu de retour',
    customerInfo: 'Informations client',
    driverLicense: 'Permis de conduire',
    nationalId: 'Carte d\'identité',
    paymentMethod: 'Mode de paiement'
  },

  // Payment
  payment: {
    title: 'Paiement',
    selectMethod: 'Choisir mode de paiement',
    cib: 'Carte Interbancaire (CIB)',
    edahabia: 'Edahabia',
    satim: 'Carte SATIM',
    bankTransfer: 'Virement bancaire',
    cash: 'Paiement espèces',
    cardNumber: 'Numéro carte',
    expiryDate: 'Date expiration',
    cvv: 'Code sécurité',
    cardHolder: 'Nom titulaire',
    processPayment: 'Traiter paiement',
    paymentSuccessful: 'Paiement réussi',
    paymentFailed: 'Paiement échoué',
    pending: 'En attente',
    completed: 'Terminé',
    failed: 'Échoué',
    refunded: 'Remboursé'
  },

  // Forms
  forms: {
    name: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    wilaya: 'Wilaya',
    city: 'Ville',
    postalCode: 'Code postal',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer mot de passe',
    submit: 'Envoyer',
    cancel: 'Annuler',
    save: 'Sauvegarder',
    edit: 'Modifier',
    delete: 'Supprimer',
    required: 'Requis',
    optional: 'Optionnel',
    phoneFormat: 'Ex: 0555 12 34 56 ou +213 555 12 34 56'
  },
  // Dashboard
  dashboard: {
    title: 'Tableau de bord',
    welcome: 'Bienvenue',
    myBookings: 'Mes réservations',
    myProfile: 'Mon profil',
    bookingHistory: 'Historique réservations',
    upcomingBookings: 'Réservations à venir',
    pastBookings: 'Réservations passées',
    bookingStatus: 'Statut réservation',
    bookingDate: 'Date réservation',
    vehicle: 'Véhicule',
    duration: 'Durée',
    amount: 'Montant',
    status: 'Statut',
    actions: 'Actions',
    viewBooking: 'Voir réservation',
    cancelBooking: 'Annuler réservation',
    modifyBooking: 'Modifier réservation'
  },

  // Admin
  admin: {
    title: 'Administration',
    hub: 'Hub Admin',
    manageVehicles: 'Gérer véhicules',
    manageUsers: 'Gérer utilisateurs',
    manageBookings: 'Gérer réservations',
    statistics: 'Statistiques',
    settings: 'Paramètres'
  },

  // Status
  status: {
    pending: 'En attente',
    confirmed: 'Confirmé',
    cancelled: 'Annulé',
    completed: 'Terminé',
    available: 'Disponible',
    unavailable: 'Indisponible',
    active: 'Actif',
    inactive: 'Inactif'
  },

  // Messages
  messages: {
    success: {
      bookingCreated: 'Réservation créée avec succès',
      paymentProcessed: 'Paiement traité avec succès',
      profileUpdated: 'Profil mis à jour',
      loginSuccess: 'Connexion réussie',
      registrationSuccess: 'Compte créé avec succès'
    },
    error: {
      bookingFailed: 'Échec création réservation',
      paymentFailed: 'Échec traitement paiement',
      loginFailed: 'Échec connexion',
      registrationFailed: 'Échec création compte',
      invalidPhone: 'Numéro téléphone invalide',
      invalidEmail: 'Email invalide',
      passwordMismatch: 'Mots de passe différents',
      requiredField: 'Ce champ est requis',
      vehicleUnavailable: 'Véhicule indisponible à ces dates',
      invalidDates: 'Dates invalides'
    },
    info: {
      selectDates: 'Veuillez sélectionner les dates de location',
      loginRequired: 'Connexion requise',
      loadingVehicles: 'Chargement véhicules...',
      processingPayment: 'Traitement paiement...',
      sendingRequest: 'Envoi demande...'
    }
  },

  // Filters
  filters: {
    title: 'Filtrer résultats',
    vehicleType: 'Type véhicule',
    priceRange: 'Gamme prix',
    minPrice: 'Prix minimum',
    maxPrice: 'Prix maximum',
    availability: 'Disponible seulement',
    brand: 'Marque',
    year: 'Année',
    transmission: 'Transmission',
    fuelType: 'Type carburant',
    clear: 'Effacer filtres',
    apply: 'Appliquer'
  },

  // Footer
  footer: {
    about: 'À propos Techno Cars',
    services: 'Nos services',
    contact: 'Contactez-nous',
    privacy: 'Politique confidentialité',
    terms: 'Conditions générales',
    help: 'Aide',
    faq: 'FAQ',
    support: 'Support technique',
    followUs: 'Suivez-nous',
    allRightsReserved: 'Tous droits réservés',
    algerianRentalLicense: 'Agréé par le Ministère des Transports Algérien'
  },

  // Time and Date
  time: {
    today: 'Aujourd\'hui',
    tomorrow: 'Demain',
    yesterday: 'Hier',
    week: 'Semaine',
    month: 'Mois',
    year: 'Année',
    days: 'Jours',
    hours: 'Heures',
    minutes: 'Minutes',
    am: 'AM',
    pm: 'PM'
  },

  // Business hours
  businessHours: {
    title: 'Heures d\'ouverture',
    weekdays: 'Jours ouvrables',
    saturday: 'Samedi',
    friday: 'Vendredi',
    ramadan: 'Ramadan',
    holidays: 'Jours fériés',
    closed: 'Fermé',
    lunchBreak: 'Pause déjeuner',
    jummahBreak: 'Pause prière vendredi'
  },
  // Insurance
  insurance: {
    title: 'Assurance',
    thirdParty: 'Assurance tiers',
    comprehensive: 'Assurance tous risques',
    collision: 'Assurance collision',
    required: 'Obligatoire',
    optional: 'Optionnel',
    coverage: 'Couverture',
    premium: 'Prime',
    deductible: 'Franchise'
  },

  // Vehicle Form Modal
  vehicleForm: {
    editVehicle: 'Modifier véhicule',
    addNewVehicle: 'Ajouter nouveau véhicule',
    fillVehicleDetails: 'Remplissez les détails du véhicule',
    basicInformation: 'Informations de base',
    pricingAndPolicies: 'Tarification et politiques',
    vehicleImages: 'Images du véhicule',
    brand: 'Marque',
    selectBrand: 'Sélectionner la marque',
    model: 'Modèle',
    modelPlaceholder: 'Ex: Clio, Golf, Focus',
    year: 'Année',
    vehicleType: 'Type de véhicule',
    pricePerDay: 'Prix par jour',
    mileageLimit: 'Limite de kilométrage',
    mileagePlaceholder: 'Ex: 200 km/jour',
    fuelPolicy: 'Politique carburant',
    availability: 'Disponibilité',
    available: 'Disponible',
    unavailable: 'Indisponible',
    currentImages: 'Images actuelles',
    newImagesToUpload: 'Nouvelles images à télécharger',
    clickToUpload: 'Cliquer pour télécharger des images',
    uploadLimit: 'PNG, JPG, GIF jusqu\'à 10MB chacun',
    cancel: 'Annuler',
    updateVehicle: '✓ Mettre à jour véhicule',
    addVehicle: '✓ Ajouter véhicule',
    updating: 'Mise à jour...',
    creating: 'Création...',
    vehicleTypes: {
      sedan: 'Berline',
      suv: 'SUV',
      sports: 'Sportive',
      luxury: 'Luxe',
      electric: 'Électrique',
      van: 'Fourgonnette',
      compact: 'Compacte'
    },
    fuelPolicies: {
      fullToFull: 'Plein à plein',
      sameToSame: 'Identique à identique',
      prePurchase: 'Pré-achat'
    }
  }
};

// English translations
export const EN_TRANSLATIONS = {
  // Navigation
  nav: {
    home: 'Home',
    vehicles: 'Vehicles',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    logout: 'Logout',
    profile: 'Profile'
  },

  // Vehicle types
  vehicleTypes: {
    'Sedan': 'Sedan',
    'SUV': 'SUV',
    'Sports': 'Sports',
    'Luxury': 'Luxury',
    'Electric': 'Electric',
    'Van': 'Van',
    'Compact': 'Compact'
  },

  // Vehicle details
  vehicle: {
    brand: 'Brand',
    model: 'Model',
    year: 'Year',
    type: 'Type',
    pricePerDay: 'Price per day',
    mileageLimit: 'Mileage limit',
    fuelPolicy: 'Fuel policy',
    availability: 'Availability',
    features: 'Features',
    bookNow: 'Book now',
    viewDetails: 'View details',
    kmPerDay: 'km/day',
    automatic: 'Automatic',
    manual: 'Manual',
    airConditioning: 'Air conditioning',
    bluetooth: 'Bluetooth',
    gps: 'GPS'
  },

  // Booking
  booking: {
    title: 'Vehicle booking',
    selectDates: 'Select dates',
    startDate: 'Start date',
    endDate: 'End date',
    totalDays: 'Total days',
    totalPrice: 'Total price',
    priceBreakdown: 'Price breakdown',
    basePrice: 'Base price',
    taxes: 'Taxes (VAT)',
    insurance: 'Insurance',
    finalTotal: 'Final total',
    confirmBooking: 'Confirm booking',
    pickupLocation: 'Pickup location',
    returnLocation: 'Return location',
    customerInfo: 'Customer information',
    driverLicense: 'Driver\'s license',
    nationalId: 'National ID',
    paymentMethod: 'Payment method'
  },

  // Payment
  payment: {
    title: 'Payment',
    selectMethod: 'Select payment method',
    cib: 'Interbank Card (CIB)',
    edahabia: 'Edahabia',
    satim: 'SATIM Card',
    bankTransfer: 'Bank transfer',
    cash: 'Cash payment',
    cardNumber: 'Card number',
    expiryDate: 'Expiry date',
    cvv: 'Security code',
    cardHolder: 'Card holder',
    processPayment: 'Process payment',
    paymentSuccessful: 'Payment successful',
    paymentFailed: 'Payment failed',
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
    refunded: 'Refunded'
  },

  // Forms
  forms: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    wilaya: 'Wilaya',
    city: 'City',
    postalCode: 'Postal code',
    password: 'Password',
    confirmPassword: 'Confirm password',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    required: 'Required',
    optional: 'Optional',
    phoneFormat: 'Ex: 0555 12 34 56 or +213 555 12 34 56'
  },
  // Dashboard
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome',
    myBookings: 'My bookings',
    myProfile: 'My profile',
    bookingHistory: 'Booking history',
    upcomingBookings: 'Upcoming bookings',
    pastBookings: 'Past bookings',
    bookingStatus: 'Booking status',
    bookingDate: 'Booking date',
    vehicle: 'Vehicle',
    duration: 'Duration',
    amount: 'Amount',
    status: 'Status',
    actions: 'Actions',
    viewBooking: 'View booking',
    cancelBooking: 'Cancel booking',
    modifyBooking: 'Modify booking'
  },

  // Admin
  admin: {
    title: 'Administration',
    hub: 'Admin Hub',
    manageVehicles: 'Manage Vehicles',
    manageUsers: 'Manage Users',
    manageBookings: 'Manage Bookings',
    statistics: 'Statistics',
    settings: 'Settings'
  },

  // Status
  status: {
    pending: 'Pending',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    completed: 'Completed',
    available: 'Available',
    unavailable: 'Unavailable',
    active: 'Active',
    inactive: 'Inactive'
  },

  // Messages
  messages: {
    success: {
      bookingCreated: 'Booking created successfully',
      paymentProcessed: 'Payment processed successfully',
      profileUpdated: 'Profile updated',
      loginSuccess: 'Login successful',
      registrationSuccess: 'Account created successfully'
    },
    error: {
      bookingFailed: 'Failed to create booking',
      paymentFailed: 'Payment processing failed',
      loginFailed: 'Login failed',
      registrationFailed: 'Account creation failed',
      invalidPhone: 'Invalid phone number',
      invalidEmail: 'Invalid email',
      passwordMismatch: 'Passwords do not match',
      requiredField: 'This field is required',
      vehicleUnavailable: 'Vehicle unavailable for selected dates',
      invalidDates: 'Invalid dates'
    },
    info: {
      selectDates: 'Please select rental dates',
      loginRequired: 'Login required',
      loadingVehicles: 'Loading vehicles...',
      processingPayment: 'Processing payment...',
      sendingRequest: 'Sending request...'
    }
  },

  // Filters
  filters: {
    title: 'Filter results',
    vehicleType: 'Vehicle type',
    priceRange: 'Price range',
    minPrice: 'Minimum price',
    maxPrice: 'Maximum price',
    availability: 'Available only',
    brand: 'Brand',
    year: 'Year',
    transmission: 'Transmission',
    fuelType: 'Fuel type',
    clear: 'Clear filters',
    apply: 'Apply'
  },

  // Footer
  footer: {
    about: 'About Techno Cars',
    services: 'Our services',
    contact: 'Contact us',
    privacy: 'Privacy policy',
    terms: 'Terms & conditions',
    help: 'Help',
    faq: 'FAQ',
    support: 'Technical support',
    followUs: 'Follow us',
    allRightsReserved: 'All rights reserved',
    algerianRentalLicense: 'Licensed by Algerian Ministry of Transport'
  },

  // Time and Date
  time: {
    today: 'Today',
    tomorrow: 'Tomorrow',
    yesterday: 'Yesterday',
    week: 'Week',
    month: 'Month',
    year: 'Year',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    am: 'AM',
    pm: 'PM'
  },

  // Business hours
  businessHours: {
    title: 'Business hours',
    weekdays: 'Weekdays',
    saturday: 'Saturday',
    friday: 'Friday',
    ramadan: 'Ramadan',
    holidays: 'Holidays',
    closed: 'Closed',
    lunchBreak: 'Lunch break',
    jummahBreak: 'Friday prayer break'
  },
  // Insurance
  insurance: {
    title: 'Insurance',
    thirdParty: 'Third party insurance',
    comprehensive: 'Comprehensive insurance',
    collision: 'Collision insurance',
    required: 'Required',
    optional: 'Optional',
    coverage: 'Coverage',
    premium: 'Premium',
    deductible: 'Deductible'
  },

  // Vehicle Form Modal
  vehicleForm: {
    editVehicle: 'Edit Vehicle',
    addNewVehicle: 'Add New Vehicle',
    fillVehicleDetails: 'Fill in the vehicle details',
    basicInformation: 'Basic Information',
    pricingAndPolicies: 'Pricing & Policies',
    vehicleImages: 'Vehicle Images',
    brand: 'Brand',
    selectBrand: 'Select brand',
    model: 'Model',
    modelPlaceholder: 'e.g., Clio, Golf, Focus',
    year: 'Year',
    vehicleType: 'Vehicle Type',
    pricePerDay: 'Price per day',
    mileageLimit: 'Mileage Limit',
    mileagePlaceholder: 'e.g., 200 km/day',
    fuelPolicy: 'Fuel Policy',
    availability: 'Availability',
    available: 'Available',
    unavailable: 'Unavailable',
    currentImages: 'Current Images',
    newImagesToUpload: 'New Images to Upload',
    clickToUpload: 'Click to upload images',
    uploadLimit: 'PNG, JPG, GIF up to 10MB each',
    cancel: 'Cancel',
    updateVehicle: '✓ Update Vehicle',
    addVehicle: '✓ Add Vehicle',
    updating: 'Updating...',
    creating: 'Creating...',
    vehicleTypes: {
      sedan: 'Sedan',
      suv: 'SUV',
      sports: 'Sports',
      luxury: 'Luxury',
      electric: 'Electric',
      van: 'Van',
      compact: 'Compact'
    },
    fuelPolicies: {
      fullToFull: 'Full to Full',
      sameToSame: 'Same to Same',
      prePurchase: 'Pre-Purchase'
    }
  }
};

// Language detection for French/English
export const detectLanguage = (): 'fr' | 'en' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language');
    if (stored === 'fr' || stored === 'en') return stored;
    
    // Detect from browser locale
    const browserLang = navigator.language;
    if (browserLang.startsWith('fr')) return 'fr';
  }
  return 'en'; // Default to English
};

// Get translations based on language
export const getTranslations = (language?: 'fr' | 'en') => {
  const lang = language || detectLanguage();
  return lang === 'fr' ? FR_TRANSLATIONS : EN_TRANSLATIONS;
};

// Get translated text
export const t = (key: string, language?: 'fr' | 'en') => {
  const translations = getTranslations(language);  const keys = key.split('.');
  let value: Record<string, unknown> = translations as Record<string, unknown>;
  
  for (const k of keys) {
    value = value?.[k] as Record<string, unknown>;
  }
  
  return value || key;
};

// Set language and store preference
export const setLanguage = (language: 'fr' | 'en') => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }
};

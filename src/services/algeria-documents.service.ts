// Algeria-specific document requirements and validation
import { validateAlgerianPhone, validateAlgerianNationalId } from '@/src/utils/algeria';

export interface AlgerianDocumentRequirements {
  nationalId: {
    required: boolean;
    format: string;
    description: string;
    descriptionFr: string;
  };
  driverLicense: {
    required: boolean;
    format: string;
    description: string;
    descriptionFr: string;
    minimumAge: number;
    validityPeriod: string;
  };
  proofOfAddress: {
    required: boolean;
    acceptedTypes: string[];
    description: string;
    descriptionFr: string;
  };
  phoneVerification: {
    required: boolean;
    format: string;
    description: string;
    descriptionFr: string;
  };
  insurance: {
    required: boolean;
    type: string;
    description: string;
    descriptionFr: string;
  };
}

export const ALGERIA_DOCUMENT_REQUIREMENTS: AlgerianDocumentRequirements = {
  nationalId: {
    required: true,
    format: '18 digits',
    description: 'Valid Algerian National Identity Card (Carte Nationale d\'Identité)',
    descriptionFr: 'Carte d\'identité nationale algérienne valide'
  },
  driverLicense: {
    required: true,
    format: 'Algerian format',
    description: 'Valid Algerian driver\'s license with minimum 2 years experience',
    descriptionFr: 'Permis de conduire algérien valide avec minimum 2 ans d\'expérience',
    minimumAge: 21,
    validityPeriod: 'Valid for at least 6 months'
  },
  proofOfAddress: {
    required: true,
    acceptedTypes: [
      'Electricity bill (Sonelgaz)',
      'Water bill (ADE)',
      'Gas bill (Naftal)',
      'Bank statement',
      'Municipal tax certificate',
      'Rental contract'
    ],
    description: 'Recent proof of address (less than 3 months old)',
    descriptionFr: 'Justificatif de domicile récent (moins de 3 mois)'
  },
  phoneVerification: {
    required: true,
    format: '+213 format',
    description: 'Verified Algerian phone number (+213)',
    descriptionFr: 'Numéro de téléphone algérien vérifié (+213)'
  },
  insurance: {
    required: true,
    type: 'Third Party (mandatory)',
    description: 'Mandatory third-party insurance as per Algerian law',
    descriptionFr: 'Assurance responsabilité civile obligatoire selon la loi algérienne'
  }
};

export interface DocumentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  missingDocuments: string[];
}

export interface CustomerDocuments {
  nationalId?: string;
  driverLicense?: string;
  phone?: string;
  address?: string;
  wilaya?: string;
  birthDate?: string;
  proofOfAddressType?: string;
}

export const validateAlgerianDocuments = (
  documents: CustomerDocuments,
  language: 'en' | 'fr' = 'en'
): DocumentValidationResult => {
  const result: DocumentValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    missingDocuments: []
  };

  const t = (en: string, fr: string) => language === 'fr' ? fr : en;

  // Validate National ID
  if (!documents.nationalId) {
    result.missingDocuments.push(
      t('National ID Card', 'Carte d\'identité nationale')
    );
    result.isValid = false;
  } else if (!validateAlgerianNationalId(documents.nationalId)) {
    result.errors.push(
      t(
        'Invalid National ID format. Must be 18 digits.',
        'Format de carte d\'identité invalide. Doit contenir 18 chiffres.'
      )
    );
    result.isValid = false;
  }

  // Validate Driver's License
  if (!documents.driverLicense) {
    result.missingDocuments.push(
      t('Driver\'s License', 'Permis de conduire')
    );
    result.isValid = false;
  } else if (documents.driverLicense.length < 8) {
    result.errors.push(
      t(
        'Invalid driver\'s license format.',
        'Format de permis de conduire invalide.'
      )
    );
    result.isValid = false;
  }

  // Validate Phone Number
  if (!documents.phone) {
    result.missingDocuments.push(
      t('Phone Number', 'Numéro de téléphone')
    );
    result.isValid = false;
  } else if (!validateAlgerianPhone(documents.phone)) {
    result.errors.push(
      t(
        'Invalid Algerian phone number format. Must start with +213.',
        'Format de numéro de téléphone algérien invalide. Doit commencer par +213.'
      )
    );
    result.isValid = false;
  }

  // Validate Address
  if (!documents.address || documents.address.length < 10) {
    result.missingDocuments.push(
      t('Complete Address', 'Adresse complète')
    );
    result.isValid = false;
  }

  // Validate Wilaya
  if (!documents.wilaya) {
    result.missingDocuments.push(
      t('Wilaya Selection', 'Sélection de wilaya')
    );
    result.isValid = false;
  }

  // Validate Birth Date (minimum age 21)
  if (!documents.birthDate) {
    result.missingDocuments.push(
      t('Date of Birth', 'Date de naissance')
    );
    result.isValid = false;
  } else {
    const birthDate = new Date(documents.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      // Birthday hasn't occurred this year
    }
    
    if (age < 21) {
      result.errors.push(
        t(
          'Minimum age requirement is 21 years for car rental.',
          'L\'âge minimum requis est de 21 ans pour la location de voiture.'
        )
      );
      result.isValid = false;
    } else if (age < 23) {
      result.warnings.push(
        t(
          'Additional insurance may be required for drivers under 23.',
          'Une assurance supplémentaire peut être requise pour les conducteurs de moins de 23 ans.'
        )
      );
    }
  }

  // Validate Proof of Address Type
  if (!documents.proofOfAddressType) {
    result.warnings.push(
      t(
        'Please specify the type of proof of address document.',
        'Veuillez spécifier le type de justificatif de domicile.'
      )
    );
  }

  return result;
};

export const getRequiredDocumentsList = (language: 'en' | 'fr' = 'en'): string[] => {
  const t = (en: string, fr: string) => language === 'fr' ? fr : en;
  
  return [
    t('Valid Algerian National ID Card', 'Carte d\'identité nationale algérienne valide'),
    t('Valid Algerian Driver\'s License (minimum 2 years)', 'Permis de conduire algérien valide (minimum 2 ans)'),
    t('Proof of Address (less than 3 months old)', 'Justificatif de domicile (moins de 3 mois)'),
    t('Verified Phone Number (+213)', 'Numéro de téléphone vérifié (+213)'),
    t('Minimum age: 21 years', 'Âge minimum : 21 ans')
  ];
};

export const getAcceptedProofOfAddressTypes = (language: 'en' | 'fr' = 'en'): string[] => {
  const types = ALGERIA_DOCUMENT_REQUIREMENTS.proofOfAddress.acceptedTypes;
  
  if (language === 'fr') {
    return [
      'Facture d\'électricité (Sonelgaz)',
      'Facture d\'eau (ADE)',
      'Facture de gaz (Naftal)',
      'Relevé bancaire',
      'Certificat d\'impôt municipal',
      'Contrat de location'
    ];
  }
  
  return types;
};

export const generateDocumentChecklist = (
  documents: CustomerDocuments,
  language: 'en' | 'fr' = 'en'
): Array<{ item: string; completed: boolean; required: boolean }> => {
  const t = (en: string, fr: string) => language === 'fr' ? fr : en;
  
  return [
    {
      item: t('National ID Card', 'Carte d\'identité nationale'),
      completed: !!documents.nationalId && validateAlgerianNationalId(documents.nationalId),
      required: true
    },
    {
      item: t('Driver\'s License', 'Permis de conduire'),
      completed: !!documents.driverLicense && documents.driverLicense.length >= 8,
      required: true
    },
    {
      item: t('Phone Number Verification', 'Vérification du numéro de téléphone'),
      completed: !!documents.phone && validateAlgerianPhone(documents.phone),
      required: true
    },
    {
      item: t('Complete Address', 'Adresse complète'),
      completed: !!documents.address && documents.address.length >= 10,
      required: true
    },
    {
      item: t('Wilaya Selection', 'Sélection de wilaya'),
      completed: !!documents.wilaya,
      required: true
    },
    {
      item: t('Date of Birth (Age Verification)', 'Date de naissance (Vérification d\'âge)'),
      completed: !!documents.birthDate,
      required: true
    },
    {
      item: t('Proof of Address Type', 'Type de justificatif de domicile'),
      completed: !!documents.proofOfAddressType,
      required: false
    }
  ];
};

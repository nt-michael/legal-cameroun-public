// Devis wizard data types and configuration

import { BilingualText } from '@/lib/translations';

export interface DevisFormData {
  // Step 1: Welcome (no data, just intro)

  // Step 2: Activity
  isNewBusiness: boolean | null;

  // Step 3: Status & Delay
  companyType: string;
  timeline: string;

  // Step 4: Company Details
  businessObject: string;
  capital: number;

  // Step 5: Team
  managerFirstName: string;
  managerLastName: string;
  managerId: string;
  associatesCount: number;
  hasNonAssociateManagers: boolean;
  nonAssociateManagers: Array<{ firstName: string; lastName: string; id: string }>;

  // Step 6: Logistics
  headquarters: string;
  city: string;

  // Step 7: Additional Services
  needsAccountant: boolean;
  additionalServices: string[];

  // Step 8: Contact
  email: string;
  phone: string;
  additionalInfo: string;
}

export const initialDevisFormData: DevisFormData = {
  isNewBusiness: null,
  companyType: '',
  timeline: '1-week',
  businessObject: '',
  capital: 100000,
  managerFirstName: '',
  managerLastName: '',
  managerId: '',
  associatesCount: 1,
  hasNonAssociateManagers: false,
  nonAssociateManagers: [],
  headquarters: '',
  city: 'Douala',
  needsAccountant: false,
  additionalServices: [],
  email: '',
  phone: '',
  additionalInfo: '',
};

export interface CompanyType {
  value: string;
  label: string;
  description: BilingualText;
}

export const companyTypes: CompanyType[] = [
  { value: 'sas', label: 'SAS', description: { fr: 'Société par Actions Simplifiée', en: 'Simplified Joint-Stock Company' } },
  { value: 'sasu', label: 'SASU', description: { fr: 'SAS Unipersonnelle', en: 'Single-Member Simplified Joint-Stock Company' } },
  { value: 'sarl', label: 'SARL', description: { fr: 'Société à Responsabilité Limitée', en: 'Limited Liability Company' } },
  { value: 'sarlu', label: 'SARLU', description: { fr: 'SARL Unipersonnelle', en: 'Single-Member Limited Liability Company' } },
  { value: 'association', label: 'Association', description: { fr: 'Association loi 1901', en: 'Non-Profit Association' } },
  { value: 'sci', label: 'SCI', description: { fr: 'Société Civile Immobilière', en: 'Real Estate Civil Company' } },
  { value: 'etablissement', label: 'Etablissement', description: { fr: 'Etablissement', en: 'Establishment' } },
  { value: 'other', label: 'Autre', description: { fr: 'Je ne sais pas encore', en: 'I don\'t know yet' } },
];

export interface TimelineOption {
  value: string;
  label: BilingualText;
  description: BilingualText;
  premium?: boolean;
}

export const timelineOptions: TimelineOption[] = [
  // { value: '48h', label: { fr: '48 heures', en: '48 hours' }, description: { fr: 'Traitement express (Premium)', en: 'Express processing (Premium)' }, premium: true },
  { value: '3-week', label: { fr: '3 semaines', en: '3 weeks' }, description: { fr: 'Délai souhaité (Premium)', en: 'Desired timeline (Premium)' }, premium: true },
  { value: '2-months', label: { fr: '2 mois', en: '2 months' }, description: { fr: 'Délai express', en: 'Express timeline' } },
  { value: 'flexible', label: { fr: 'Flexible', en: 'Flexible' }, description: { fr: 'Délai standard', en: 'Standard timeline' } },
];

export const cities = [
  'Douala',
  'Yaoundé',
  'Garoua',
  'Bamenda',
  'Maroua',
  'Bafoussam',
  'Ngaoundéré',
  'Bertoua',
  'Limbe',
  'Kribi',
  'Autre',
];

export interface AdditionalServiceOption {
  value: string;
  label: BilingualText;
  icon: string;
}

export const additionalServicesOptions: AdditionalServiceOption[] = [
  { value: 'accountant', label: { fr: 'Expert-Comptable', en: 'Chartered Accountant' }, icon: 'calculator' },
  { value: 'legal', label: { fr: 'Conseil Juridique', en: 'Legal Advice' }, icon: 'scale' },
  { value: 'domiciliation', label: { fr: 'Domiciliation', en: 'Business Domiciliation' }, icon: 'building' },
  { value: 'trademark', label: { fr: 'Dépôt de Marque', en: 'Trademark Registration' }, icon: 'badge' },
  { value: 'contracts', label: { fr: 'Rédaction Contrats', en: 'Contract Drafting' }, icon: 'document' },
];

export interface DevisStep {
  id: string;
  title: BilingualText;
  shortTitle: BilingualText;
}

export const devisSteps: DevisStep[] = [
  { id: 'welcome', title: { fr: 'Bienvenue', en: 'Welcome' }, shortTitle: { fr: 'Début', en: 'Start' } },
  { id: 'activity', title: { fr: 'Votre Projet', en: 'Your Project' }, shortTitle: { fr: 'Projet', en: 'Project' } },
  { id: 'status', title: { fr: 'Statut Juridique', en: 'Legal Status' }, shortTitle: { fr: 'Statut', en: 'Status' } },
  { id: 'details', title: { fr: 'Détails Société', en: 'Company Details' }, shortTitle: { fr: 'Détails', en: 'Details' } },
  { id: 'team', title: { fr: 'Équipe Dirigeante', en: 'Management Team' }, shortTitle: { fr: 'Équipe', en: 'Team' } },
  { id: 'logistics', title: { fr: 'Siège Social', en: 'Headquarters' }, shortTitle: { fr: 'Siège', en: 'HQ' } },
  { id: 'services', title: { fr: 'Services', en: 'Services' }, shortTitle: { fr: 'Services', en: 'Services' } },
  { id: 'contact', title: { fr: 'Contact', en: 'Contact' }, shortTitle: { fr: 'Contact', en: 'Contact' } },
  { id: 'summary', title: { fr: 'Récapitulatif', en: 'Summary' }, shortTitle: { fr: 'Récap', en: 'Summary' } },
];

// Validation helpers
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Cameroon phone format: +237 6XX XXX XXX or 6XX XXX XXX
  const regex = /^(\+237|237)?[26][0-9]{8}$/;
  return regex.test(phone.replace(/\s/g, ''));
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('237')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
  }
  if (cleaned.length === 9) {
    return `+237 ${cleaned.slice(0, 1)} ${cleaned.slice(1, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)}`;
  }
  return phone;
};

// Capital requirements by company type
export const getMinCapital = (companyType: string): number => {
  switch (companyType) {
    case 'sarl':
    case 'sarlu':
      return 100000; // 100,000 XAF min for SARL
    case 'sas':
    case 'sasu':
      return 1; // 1 XAF symbolic for SAS
    case 'sci':
      return 1;
    default:
      return 0;
  }
};

export const requiresCapital = (companyType: string): boolean => {
  return ['sas', 'sasu', 'sarl', 'sarlu', 'sci'].includes(companyType);
};

// Contact Page Data
// Content for the Contact page - Legal Cameroun

import { BilingualText } from '@/lib/translations';

export interface ContactOffice {
  city: BilingualText;
  country: BilingualText;
  role: BilingualText;
  company?: string;
  address: BilingualText[];
  phone?: string;
  whatsapp?: string;
  email?: string;
  hours?: BilingualText;
  note?: BilingualText;
  isPrimary?: boolean;
}

export interface ContactSubject {
  value: string;
  label: BilingualText;
}

export interface WhyContactItem {
  icon: string;
  title: BilingualText;
  description: BilingualText;
}

// Hero Data
export const contactHeroData = {
  badge: { fr: 'Contactez-nous', en: 'Contact Us' } as BilingualText,
  title: { fr: 'Parlons de votre projet', en: 'Let\'s Talk About Your Project' } as BilingualText,
  subtitle: {
    fr: 'Que ce soit pour une création rapide à Bonabéri, une modification urgente, ou juste une question sur vos statuts... nous vous écoutons vraiment.',
    en: 'Whether it\'s a quick business setup in Bonabéri, an urgent amendment, or just a question about your articles of incorporation... we truly listen.',
  } as BilingualText,
  responseTime: {
    fr: 'Contactez-nous dès aujourd\'hui — réponse sous 24h (souvent plus rapide !)',
    en: 'Contact us today — response within 24h (often faster!)',
  } as BilingualText,
  trustBadge: {
    fr: '+15 000 entrepreneurs nous font déjà confiance depuis 8 ans.',
    en: '15,000+ entrepreneurs have trusted us for over 8 years.',
  } as BilingualText,
  quickActions: [
    {
      text: { fr: 'Réserver une consultation', en: 'Book a Consultation' } as BilingualText,
      href: '/prendre-un-rendez-vous',
      variant: 'primary',
      icon: 'calendar',
    },
    {
      text: { fr: 'Demander un Devis Personnalisé', en: 'Request a Custom Quote' } as BilingualText,
      href: '/devis',
      variant: 'secondary',
      icon: 'document',
    },
    {
      text: { fr: 'Appeler maintenant', en: 'Call Now' } as BilingualText,
      subtext: '+237 691768285',
      href: 'tel:+237691768285',
      variant: 'phone',
      icon: 'phone',
    },
  ],
};

// Offices Data
export const contactOffices: ContactOffice[] = [
  {
    city: { fr: 'Douala', en: 'Douala' },
    country: { fr: 'Cameroun', en: 'Cameroon' },
    role: { fr: 'Notre Siège au Cameroun', en: 'Our Headquarters in Cameroon' },
    address: [
      { fr: 'Elite Offices Building', en: 'Elite Offices Building' },
      { fr: 'Rue Dubois de Saligny, Akwa', en: 'Rue Dubois de Saligny, Akwa' },
      { fr: 'Douala, Littoral, Cameroun', en: 'Douala, Littoral, Cameroon' },
    ],
    phone: '+237 691 76 82 85',
    whatsapp: '+237691768285',
    email: 'contact-cm@rodecconseils.com',
    hours: { fr: 'Du lundi au vendredi, 9h – 19h (WAT)', en: 'Monday to Friday, 9 AM – 7 PM (WAT)' },
    isPrimary: true,
  },
  {
    city: { fr: 'Paris', en: 'Paris' },
    country: { fr: 'France', en: 'France' },
    role: { fr: 'Siège Europe', en: 'European Headquarters' },
    company: 'RODEC Conseils SAS',
    address: [
      { fr: '2 bis rue de Villiers', en: '2 bis rue de Villiers' },
      { fr: '92300 Levallois-Perret', en: '92300 Levallois-Perret' },
      { fr: 'France', en: 'France' },
    ],
    phone: '+33 1 49 03 00 57',
    email: 'contact@rodecconseils.com',
  },
  {
    city: { fr: 'Cotonou', en: 'Cotonou' },
    country: { fr: 'Bénin', en: 'Benin' },
    role: { fr: 'Présence Afrique de l\'Ouest', en: 'West Africa Presence' },
    address: [
      { fr: 'Support régional pour projets multinationaux', en: 'Regional support for multinational projects' },
    ],
    note: {
      fr: 'Contact via Douala/Paris pour coordination.',
      en: 'Contact via Douala/Paris for coordination.',
    },
  },
];

// Form Subjects
export const contactSubjects: ContactSubject[] = [
  { value: 'creation', label: { fr: 'Création d\'entreprise', en: 'Business Creation' } },
  { value: 'modification', label: { fr: 'Modification de statuts', en: 'Articles Amendment' } },
  { value: 'dissolution', label: { fr: 'Dissolution d\'entreprise', en: 'Business Dissolution' } },
  { value: 'autre-juridique', label: { fr: 'Autre service juridique', en: 'Other Legal Service' } },
  { value: 'question', label: { fr: 'Question générale', en: 'General Inquiry' } },
];

// Why Contact Us
export const whyContactItems: WhyContactItem[] = [
  {
    icon: 'user',
    title: { fr: 'Réponse humaine', en: 'Human Response' },
    description: {
      fr: 'Pas de chatbot — un juriste réel vous répond.',
      en: 'No chatbot — a real legal expert answers you.',
    },
  },
  {
    icon: 'location',
    title: { fr: 'Local & Rapide', en: 'Local & Fast' },
    description: {
      fr: 'Basés à Akwa, nous connaissons les réalités du greffe de Douala.',
      en: 'Based in Akwa, we know the realities of the Douala court registry.',
    },
  },
  {
    icon: 'globe',
    title: { fr: 'Multilingue', en: 'Multilingual' },
    description: {
      fr: 'Français / Anglais (et un peu de pidgin si besoin).',
      en: 'French / English (and a bit of pidgin if needed).',
    },
  },
  {
    icon: 'shield',
    title: { fr: 'Sécurisé', en: 'Secure' },
    description: {
      fr: 'Données confidentielles, conformes RGPD/OHADA.',
      en: 'Confidential data, GDPR/OHADA compliant.',
    },
  },
];

// Urgent Contact
export const urgentContactData = {
  title: {
    fr: 'Besoin d\'Urgence ou de RDV Physique ?',
    en: 'Need Urgent Help or an In-Person Meeting?',
  } as BilingualText,
  items: [
    {
      icon: 'phone',
      text: { fr: 'Appelez-nous directement', en: 'Call us directly' } as BilingualText,
      action: '+237 691 76 82 85',
      href: 'tel:+237691768285',
    },
    {
      icon: 'calendar',
      text: {
        fr: 'Prenez RDV en visio ou présentiel',
        en: 'Book a video or in-person appointment',
      } as BilingualText,
      action: {
        fr: 'Réserver maintenant',
        en: 'Book Now',
      } as BilingualText,
      href: '/prendre-un-rendez-vous',
    },
    {
      icon: 'whatsapp',
      text: {
        fr: 'WhatsApp pour échanges rapides',
        en: 'WhatsApp for quick exchanges',
      } as BilingualText,
      action: '+237 659 810 228',
      href: 'https://wa.me/237659810228',
    },
  ],
};

// Final CTA
export const contactFinalCta = {
  title: {
    fr: 'Prêt à démarrer votre projet ?',
    en: 'Ready to Start Your Project?',
  } as BilingualText,
  buttonText: {
    fr: 'Réserver une consultation',
    en: 'Book a Consultation',
  } as BilingualText,
  href: '/prendre-un-rendez-vous',
};

// Form Labels
export const formLabels = {
  fullName: { fr: 'Nom complet', en: 'Full Name' } as BilingualText,
  email: { fr: 'Email professionnel', en: 'Professional Email' } as BilingualText,
  phone: { fr: 'Téléphone (WhatsApp préféré)', en: 'Phone (WhatsApp preferred)' } as BilingualText,
  subject: { fr: 'Sujet / Type de besoin', en: 'Subject / Type of Need' } as BilingualText,
  message: { fr: 'Message détaillé', en: 'Detailed Message' } as BilingualText,
  file: { fr: 'Joindre un fichier (optionnel)', en: 'Attach a File (optional)' } as BilingualText,
  filePlaceholder: { fr: 'PDF statuts, Kbis, etc.', en: 'PDF articles, Kbis, etc.' } as BilingualText,
  submit: { fr: 'Envoyer mon message', en: 'Send My Message' } as BilingualText,
  submitting: { fr: 'Envoi en cours...', en: 'Sending...' } as BilingualText,
  successTitle: { fr: 'Merci !', en: 'Thank You!' } as BilingualText,
  successMessage: { fr: 'Un expert vous contacte sous 24h.', en: 'An expert will contact you within 24h.' } as BilingualText,
  successCta: { fr: 'En attendant, réservez un RDV ?', en: 'In the meantime, book an appointment?' } as BilingualText,

  fullNamePlaceholder: { fr: 'Votre nom complet', en: 'Your Full Name' },
  emailPlaceholder: { fr: 'votre@email.com', en: 'your@email.com' },
  messagePlaceholder: {
    fr: 'Je souhaite transformer ma SARL en SAS à Douala...',
    en: 'I would like to convert my SARL to a SAS in Douala...',
  } as BilingualText,
};

// Footer note under offices
export const officesFooterNote: BilingualText = {
  fr: 'Nous combinons l\'expertise internationale et la proximité camerounaise. Que vous soyez à Douala, Yaoundé, ou à l\'étranger — on s\'adapte à vous.',
  en: 'We combine international expertise with Cameroonian proximity. Whether you\'re in Douala, Yaounde, or abroad — we adapt to you.',
};

export interface BilingualText {
  fr: string;
  en: string;
}

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      offers: 'Nos Offres',
      about: 'A propos',
      contact: 'Contact',
      appointment: 'Prendre rendez-vous',
    },
    // Menu items
    menu: {
      createBusiness: 'Création d\'entreprise',
      manageBusiness: 'Gestion d\'entreprise',
      support: 'Accompagnement',
      practicalSheets: 'Fiches Pratiques',
      // Create business rubriques
      createSASU: 'Créer une SASU',
      createSAS: 'Créer une SAS',
      createSARL: 'Créer une SARL',
      createSARLU: 'Créer une SARLU',
      createAssociation: 'Créer une Association',
      allStatuses: 'Tous les statuts',
      // Manage business rubriques
      transferHQ: 'Transfert de siège social',
      sasToSarl: 'Transformation SAS en SARL',
      sarlToSas: 'Transformation SARL en SAS',
      allModifications: 'Toutes les modifications',
      dissolution: 'Dissolution d\'entreprise',
      // Support rubriques
      quote: 'Devis',
      withExpert: 'Avec un expert',
      assistance: 'Assistance LegalCameroun',
      // Practical sheets rubriques
      transferPrices: 'Prix des transferts',
      companyPresentation: 'Présentation Société établissement',
      atomRegistration: 'Immatriculation avec ATOM',
      consultationTutorial: 'Tutoriel Consultation',
    },
    // Mega menu
    megaMenu: {
      needHelp: 'Besoin d\'aide pour choisir?',
      expertsHelp: 'Nos experts vous accompagnent gratuitement',
      talkToExpert: 'Parler à un expert',
    },
    // Hero section
    hero: {
      badge: 'Cabinet Juridique de Référence au Cameroun',
      title: 'Votre Partenaire Juridique de Confiance',
      subtitle: 'Expertise juridique d\'excellence pour entreprises et particuliers. Nous transformons les défis légaux en opportunités de croissance.',
      cta: 'Consultation Gratuite',
      learnMore: 'En Savoir Plus',
      stats: {
        experience: 'Années d\'Expérience',
        clients: 'Clients Satisfaits',
        cases: 'Dossiers Traités',
        successRate: 'Taux de Réussite',
      },
    },
    // Services section
    services: {
      badge: 'Nos Services',
      title: 'Expertise Juridique Complète',
      subtitle: 'Nous offrons une gamme complète de services juridiques pour répondre à tous vos besoins légaux avec excellence et professionnalisme.',
      viewAll: 'Voir Tous Nos Services',
      learnMore: 'En savoir plus',
      items: {
        constitution: {
          title: 'Constitution de Sociétés',
          description: 'Profitez d\'une assistance complète et personnalisée pour la création de votre société commerciale ou civile immobilière au Cameroun.',
        },
        transmission: {
          title: 'Transmission et Acquisition',
          description: 'Obtenez des conseils personnalisés et avisés pour optimiser fiscalement la transmission de votre entreprise.',
        },
        secretariat: {
          title: 'Secrétariat Juridique',
          description: 'Bénéficiez d\'un accompagnement complet en matière de rédaction d\'actes de société.',
        },
        accompagnement: {
          title: 'Accompagnement',
          description: 'Bénéficiez d\'un accompagnement spécialisé pour la création d\'associations et fondations.',
        },
        immobilier: {
          title: 'Immobilier',
          description: 'Démarches d\'immatriculation d\'un terrain jusqu\'à l\'obtention du titre foncier.',
        },
        comptes: {
          title: 'Opérations sur les Comptes',
          description: 'Profitez d\'une gamme complète de services comptables.',
        },
      },
    },
    // How it works
    howItWorks: {
      badge: 'Comment Ça Marche',
      title: 'Un Processus Simple et Efficace',
      subtitle: 'Notre approche structurée garantit un accompagnement optimal à chaque étape de votre projet juridique.',
      steps: {
        contact: {
          title: 'Premier Contact',
          description: 'Prenez rendez-vous pour une consultation initiale gratuite.',
        },
        analysis: {
          title: 'Analyse du Dossier',
          description: 'Nos experts étudient votre situation en détail.',
        },
        strategy: {
          title: 'Stratégie Personnalisée',
          description: 'Nous élaborons un plan d\'action adapté à vos besoins.',
        },
        execution: {
          title: 'Exécution',
          description: 'Mise en œuvre rigoureuse de la stratégie définie.',
        },
      },
    },
    // Testimonials
    testimonials: {
      badge: 'Témoignages',
      title: 'Ce Que Disent Nos Clients',
      subtitle: 'La satisfaction de nos clients est notre plus belle récompense.',
      autoPlay: 'Lecture automatique',
      paused: 'En pause',
    },
    // CTA Section
    cta: {
      title: 'Besoin d\'un Conseil Juridique?',
      subtitle: 'Nos experts sont disponibles pour répondre à toutes vos questions juridiques.',
      button: 'Contactez-nous',
      phone: 'Ou appelez-nous',
    },
    // Footer
    footer: {
      description: 'Cabinet d\'avocats de premier plan au Cameroun, offrant des services juridiques de qualité supérieure aux entreprises et aux particuliers depuis plus de 15 ans.',
      contact: 'Contact',
      navigation: 'Navigation',
      services: 'Nos Services',
      blog: 'Actualité',
      contactUs: 'Nous contacter',
      rights: 'Tous droits réservés.',
      legal: 'Mentions Légales',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions Générales',
    },
    // Common
    common: {
      darkMode: 'Mode sombre',
      lightMode: 'Mode clair',
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      offers: 'Our Services',
      about: 'About',
      contact: 'Contact',
      appointment: 'Book Appointment',
    },
    // Menu items
    menu: {
      createBusiness: 'Business Creation',
      manageBusiness: 'Business Management',
      support: 'Support',
      practicalSheets: 'Practical Guides',
      // Create business rubriques
      createSASU: 'Create a SASU',
      createSAS: 'Create a SAS',
      createSARL: 'Create a SARL',
      createSARLU: 'Create a SARLU',
      createAssociation: 'Create an Association',
      allStatuses: 'All legal forms',
      // Manage business rubriques
      transferHQ: 'Headquarters Transfer',
      sasToSarl: 'SAS to SARL Conversion',
      sarlToSas: 'SARL to SAS Conversion',
      allModifications: 'All modifications',
      dissolution: 'Business Dissolution',
      // Support rubriques
      quote: 'Quote',
      withExpert: 'With an expert',
      assistance: 'LegalCameroun Assistance',
      // Practical sheets rubriques
      transferPrices: 'Transfer Prices',
      companyPresentation: 'Company Presentation',
      atomRegistration: 'ATOM Registration',
      consultationTutorial: 'Consultation Tutorial',
    },
    // Mega menu
    megaMenu: {
      needHelp: 'Need help choosing?',
      expertsHelp: 'Our experts assist you for free',
      talkToExpert: 'Talk to an expert',
    },
    // Hero section
    hero: {
      badge: 'Leading Law Firm in Cameroon',
      title: 'Your Trusted Legal Partner',
      subtitle: 'Excellence in legal expertise for businesses and individuals. We transform legal challenges into growth opportunities.',
      cta: 'Free Consultation',
      learnMore: 'Learn More',
      stats: {
        experience: 'Years of Experience',
        clients: 'Satisfied Clients',
        cases: 'Cases Handled',
        successRate: 'Success Rate',
      },
    },
    // Services section
    services: {
      badge: 'Our Services',
      title: 'Complete Legal Expertise',
      subtitle: 'We offer a full range of legal services to meet all your legal needs with excellence and professionalism.',
      viewAll: 'View All Services',
      learnMore: 'Learn more',
      items: {
        constitution: {
          title: 'Company Formation',
          description: 'Get complete and personalized assistance for creating your commercial or real estate company in Cameroon.',
        },
        transmission: {
          title: 'Transfer and Acquisition',
          description: 'Get personalized advice to optimize the tax-efficient transfer of your business.',
        },
        secretariat: {
          title: 'Legal Secretariat',
          description: 'Benefit from comprehensive support in drafting corporate documents.',
        },
        accompagnement: {
          title: 'Support',
          description: 'Benefit from specialized support for creating associations and foundations.',
        },
        immobilier: {
          title: 'Real Estate',
          description: 'Land registration procedures up to obtaining the land title.',
        },
        comptes: {
          title: 'Account Operations',
          description: 'Enjoy a full range of accounting services.',
        },
      },
    },
    // How it works
    howItWorks: {
      badge: 'How It Works',
      title: 'A Simple and Efficient Process',
      subtitle: 'Our structured approach ensures optimal support at every stage of your legal project.',
      steps: {
        contact: {
          title: 'First Contact',
          description: 'Schedule a free initial consultation.',
        },
        analysis: {
          title: 'Case Analysis',
          description: 'Our experts study your situation in detail.',
        },
        strategy: {
          title: 'Personalized Strategy',
          description: 'We develop an action plan tailored to your needs.',
        },
        execution: {
          title: 'Execution',
          description: 'Rigorous implementation of the defined strategy.',
        },
      },
    },
    // Testimonials
    testimonials: {
      badge: 'Testimonials',
      title: 'What Our Clients Say',
      subtitle: 'Our clients\' satisfaction is our greatest reward.',
      autoPlay: 'Auto-play',
      paused: 'Paused',
    },
    // CTA Section
    cta: {
      title: 'Need Legal Advice?',
      subtitle: 'Our experts are available to answer all your legal questions.',
      button: 'Contact Us',
      phone: 'Or call us',
    },
    // Footer
    footer: {
      description: 'Leading law firm in Cameroon, offering superior quality legal services to businesses and individuals for over 15 years.',
      contact: 'Contact',
      navigation: 'Navigation',
      services: 'Our Services',
      blog: 'News',
      contactUs: 'Contact Us',
      rights: 'All rights reserved.',
      legal: 'Legal Notice',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
    },
    // Common
    common: {
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
    },
  },
} as const;

export function getText(text: BilingualText | string | undefined | null, language: Language): string {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[language];
}

export type Language = 'fr' | 'en';

// Define a more flexible type that works for both languages
export interface Translations {
  nav: {
    home: string;
    offers: string;
    about: string;
    contact: string;
    appointment: string;
  };
  menu: {
    createBusiness: string;
    manageBusiness: string;
    support: string;
    practicalSheets: string;
    createSASU: string;
    createSAS: string;
    createSARL: string;
    createSARLU: string;
    createAssociation: string;
    allStatuses: string;
    transferHQ: string;
    sasToSarl: string;
    sarlToSas: string;
    allModifications: string;
    dissolution: string;
    quote: string;
    withExpert: string;
    assistance: string;
    transferPrices: string;
    companyPresentation: string;
    atomRegistration: string;
    consultationTutorial: string;
  };
  megaMenu: {
    needHelp: string;
    expertsHelp: string;
    talkToExpert: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    learnMore: string;
    stats: {
      experience: string;
      clients: string;
      cases: string;
      successRate: string;
    };
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
    learnMore: string;
    items: {
      constitution: { title: string; description: string };
      transmission: { title: string; description: string };
      secretariat: { title: string; description: string };
      accompagnement: { title: string; description: string };
      immobilier: { title: string; description: string };
      comptes: { title: string; description: string };
    };
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    steps: {
      contact: { title: string; description: string };
      analysis: { title: string; description: string };
      strategy: { title: string; description: string };
      execution: { title: string; description: string };
    };
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    autoPlay: string;
    paused: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
    phone: string;
  };
  footer: {
    description: string;
    contact: string;
    navigation: string;
    services: string;
    blog: string;
    contactUs: string;
    rights: string;
    legal: string;
    privacy: string;
    terms: string;
  };
  common: {
    darkMode: string;
    lightMode: string;
  };
}

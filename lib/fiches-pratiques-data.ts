// Fiches Pratiques Data
// Content for the practical guides section - Legal Cameroun

import { BilingualText } from '@/lib/translations';

export interface FichePratique {
  slug: string;
  title: BilingualText;
  shortTitle: BilingualText;
  description: BilingualText;
  icon: 'scale' | 'building' | 'laptop' | 'calendar';
  heroIntro: BilingualText;
  content: FicheContent[];
  resources: FicheResource[];
  ctaTitle: BilingualText;
  ctaDescription: BilingualText;
  ctaButtonText: BilingualText;
  ctaButtonHref: string;
  image?: string;
  imageAlt?: BilingualText;
}

export interface FicheContent {
  type: 'heading' | 'paragraph' | 'list' | 'accordion';
  title?: BilingualText;
  text?: BilingualText;
  items?: BilingualText[];
}

export interface FicheResource {
  title: BilingualText;
  url: string;
  type: 'pdf' | 'ppt' | 'video';
  language?: string;
}

// Hub page data
export const fichesHubData = {
  hero: {
    badge: {
      fr: 'Ressources Gratuites',
      en: 'Free Resources',
    },
    title: {
      fr: 'Fiches Pratiques',
      en: 'Practical Guides',
    },
    subtitle: {
      fr: 'Guides simples, clairs et concrets pour vos démarches juridiques & fiscales au Cameroun.',
      en: 'Simple, clear, and practical guides for your legal & tax procedures in Cameroon.',
    },
    description: {
      fr: 'Téléchargez, consultez, appliquez — tout est fait pour vous faciliter la vie d\'entrepreneur.',
      en: 'Download, read, apply — everything is designed to make your life as an entrepreneur easier.',
    },
  },
  footer: {
    text: {
      fr: 'Ces fiches sont offertes par Legal Cameroun (RODEC Conseils – Douala, Paris, Cotonou).',
      en: 'These guides are provided by Legal Cameroun (RODEC Conseils – Douala, Paris, Cotonou).',
    },
    question: {
      fr: 'Besoin d\'accompagnement personnalisé ?',
      en: 'Need personalized support?',
    },
    primaryCta: {
      text: {
        fr: 'Réserver une consultation',
        en: 'Book a consultation',
      },
      href: '/prendre-un-rendez-vous',
    },
    secondaryCta: {
      text: {
        fr: 'Demander un devis',
        en: 'Request a quote',
      },
      href: '/devis',
    },
  },
};

// Individual fiches data
export const fichesPratiques: FichePratique[] = [
  {
    slug: 'prix-des-transferts',
    title: {
      fr: 'Les Règles Camerounaises sur les Prix de Transfert',
      en: 'Cameroonian Transfer Pricing Rules',
    },
    shortTitle: {
      fr: 'Prix de Transfert',
      en: 'Transfer Pricing',
    },
    description: {
      fr: 'Avant et après l\'adhésion à l\'OCDE – Guide pratique complet.',
      en: 'Before and after OECD membership – Complete practical guide.',
    },
    icon: 'scale',
    heroIntro: {
      fr: 'Avant et après l\'adhésion à l\'OCDE – Un guide essentiel pour les groupes et opérations transfrontalières.',
      en: 'Before and after OECD membership – An essential guide for cross-border groups and operations.',
    },
    content: [
      {
        type: 'heading',
        title: {
          fr: 'Inclus dans le guide',
          en: 'Included in the guide',
        },
      },
      {
        type: 'list',
        items: [
          {
            fr: 'Limitation du taux de déductibilité des charges financières',
            en: 'Limitation on the deductibility rate of financial charges',
          },
          {
            fr: 'Limitation des déductibilités des autres opérations transfrontalières',
            en: 'Limitation on the deductibility of other cross-border transactions',
          },
          {
            fr: 'Obligation de déclaration annuelle des prix de transfert',
            en: 'Annual transfer pricing reporting obligation',
          },
          {
            fr: 'Documentation des prix de transfert',
            en: 'Transfer pricing documentation',
          },
          {
            fr: 'Évolution des règles camerounaises (avant/après OCDE)',
            en: 'Evolution of Cameroonian rules (before/after OECD)',
          },
        ],
      },
      {
        type: 'paragraph',
        text: {
          fr: 'Ce guide vous aide à comprendre les implications fiscales des transactions entre entreprises liées et les obligations déclaratives qui en découlent au Cameroun.',
          en: 'This guide helps you understand the tax implications of transactions between related companies and the resulting reporting obligations in Cameroon.',
        },
      },
    ],
    resources: [
      {
        title: {
          fr: 'Télécharger le Guide PDF – Les Règles Camerounaises sur les Prix de Transfert',
          en: 'Download the PDF Guide – Cameroonian Transfer Pricing Rules',
        },
        url: 'https://legalcameroun.com/wp-content/uploads/2024/10/Les-Regles-Camerounaises-sur-les-Prix-de-Transfert.pdf',
        type: 'pdf',
      },
    ],
    ctaTitle: {
      fr: 'Des opérations internationales ?',
      en: 'International operations?',
    },
    ctaDescription: {
      fr: 'Nos experts vous aident à être conforme aux règles de prix de transfert.',
      en: 'Our experts help you comply with transfer pricing rules.',
    },
    ctaButtonText: {
      fr: 'Obtenir un accompagnement personnalisé',
      en: 'Get personalized support',
    },
    ctaButtonHref: '/devis',
  },
  {
    slug: 'presentation-societe-etablissement',
    title: {
      fr: 'Société ou Établissement : Ce qu\'il faut savoir pour choisir',
      en: 'Company or Branch: What you need to know to choose',
    },
    shortTitle: {
      fr: 'Société vs Établissement',
      en: 'Company vs Branch',
    },
    description: {
      fr: 'Avantages, inconvénients, définitions – pour faire le bon choix dès le départ.',
      en: 'Advantages, disadvantages, definitions – to make the right choice from the start.',
    },
    icon: 'building',
    heroIntro: {
      fr: 'Définitions claires, avantages, inconvénients – pour lancer votre activité sans regret.',
      en: 'Clear definitions, advantages, disadvantages – to launch your business with no regrets.',
    },
    content: [
      {
        type: 'accordion',
        title: {
          fr: 'Définition d\'une Société',
          en: 'Definition of a Company',
        },
        text: {
          fr: 'Une société est une personne morale distincte de ses associés. Elle dispose de sa propre personnalité juridique, d\'un patrimoine propre et d\'une responsabilité généralement limitée aux apports. Elle peut contracter, ester en justice et être propriétaire de biens en son nom propre.',
          en: 'A company is a legal entity separate from its shareholders. It has its own legal personality, its own assets, and liability generally limited to contributions. It can enter into contracts, take legal action, and own property in its own name.',
        },
      },
      {
        type: 'accordion',
        title: {
          fr: 'Définition d\'un Établissement',
          en: 'Definition of a Branch',
        },
        text: {
          fr: 'Un établissement (ou succursale) est une extension d\'une entreprise existante. Il n\'a pas de personnalité juridique propre et dépend entièrement de la société mère. C\'est un centre d\'activité permanent mais sans autonomie juridique.',
          en: 'A branch (or establishment) is an extension of an existing company. It has no legal personality of its own and depends entirely on the parent company. It is a permanent center of activity but without legal autonomy.',
        },
      },
      {
        type: 'heading',
        title: {
          fr: 'Avantages de la Société',
          en: 'Advantages of a Company',
        },
      },
      {
        type: 'list',
        items: [
          {
            fr: 'Protection du patrimoine personnel des associés',
            en: 'Protection of shareholders\' personal assets',
          },
          {
            fr: 'Crédibilité renforcée auprès des investisseurs et partenaires',
            en: 'Enhanced credibility with investors and partners',
          },
          {
            fr: 'Possibilité d\'accueillir des associés et de lever des fonds',
            en: 'Ability to welcome partners and raise funds',
          },
          {
            fr: 'Pérennité de l\'activité indépendante des fondateurs',
            en: 'Business continuity independent of the founders',
          },
        ],
      },
      {
        type: 'heading',
        title: {
          fr: 'Avantages de l\'Établissement',
          en: 'Advantages of a Branch',
        },
      },
      {
        type: 'list',
        items: [
          {
            fr: 'Simplicité des formalités de création',
            en: 'Simplicity of incorporation formalities',
          },
          {
            fr: 'Coûts de constitution réduits',
            en: 'Reduced formation costs',
          },
          {
            fr: 'Flexibilité opérationnelle',
            en: 'Operational flexibility',
          },
          {
            fr: 'Pas de capital minimum requis',
            en: 'No minimum capital required',
          },
        ],
      },
      {
        type: 'heading',
        title: {
          fr: 'Inconvénients de l\'Établissement',
          en: 'Disadvantages of a Branch',
        },
      },
      {
        type: 'list',
        items: [
          {
            fr: 'Responsabilité illimitée de la maison mère',
            en: 'Unlimited liability of the parent company',
          },
          {
            fr: 'Pas de personnalité juridique propre',
            en: 'No separate legal personality',
          },
          {
            fr: 'Dépendance totale envers la société mère',
            en: 'Total dependence on the parent company',
          },
        ],
      },
      {
        type: 'paragraph',
        text: {
          fr: 'Le choix entre société et établissement dépend de votre projet, de sa taille et de vos ambitions. Pour un projet de long terme avec des investisseurs potentiels, la société est souvent préférable. Pour une activité temporaire ou exploratoire, l\'établissement peut suffire.',
          en: 'The choice between a company and a branch depends on your project, its size, and your ambitions. For a long-term project with potential investors, a company is often preferable. For a temporary or exploratory activity, a branch may suffice.',
        },
      },
    ],
    resources: [
      {
        title: {
          fr: 'Télécharger le Guide PDF – Comment choisir entre Société et Établissement',
          en: 'Download the PDF Guide – How to choose between Company and Branch',
        },
        url: 'https://legalcameroun.com/wp-content/uploads/2024/10/Comment-choisir-entre-Societe-et-Etablissement-Ce-quil-faut-savoir.pdf',
        type: 'pdf',
      },
    ],
    ctaTitle: {
      fr: 'Indécis ?',
      en: 'Undecided?',
    },
    ctaDescription: {
      fr: 'Parlons-en ensemble pour faire le meilleur choix pour votre situation.',
      en: 'Let\'s discuss it together to make the best choice for your situation.',
    },
    ctaButtonText: {
      fr: 'Réserver une consultation',
      en: 'Book a consultation',
    },
    ctaButtonHref: '/prendre-un-rendez-vous',
  },
  {
    slug: 'immatriculation-avec-atom',
    title: {
      fr: 'Immatriculation Fiscale avec ATOM',
      en: 'Tax Registration with ATOM',
    },
    shortTitle: {
      fr: 'Guide ATOM',
      en: 'ATOM Guide',
    },
    description: {
      fr: 'Étapes détaillées pour s\'enregistrer et déclarer via le nouveau système DGI. Inclut versions PDF + PPT + anglaise.',
      en: 'Detailed steps to register and file via the new DGI system. Includes PDF + PPT + English versions.',
    },
    icon: 'laptop',
    heroIntro: {
      fr: 'Maîtrisez le nouveau système électronique de la DGI – étape par étape.',
      en: 'Master the new electronic system of the DGI – step by step.',
    },
    content: [
      {
        type: 'heading',
        title: {
          fr: 'Étapes clés incluses dans le guide',
          en: 'Key steps included in the guide',
        },
      },
      {
        type: 'list',
        items: [
          {
            fr: 'S\'enregistrer et se faire authentifier sur la plateforme ATOM',
            en: 'Register and get authenticated on the ATOM platform',
          },
          {
            fr: 'Effectuer l\'immatriculation fiscale',
            en: 'Complete the tax registration',
          },
          {
            fr: 'Soumettre une demande d\'immatriculation fiscale',
            en: 'Submit a tax registration application',
          },
          {
            fr: 'Télécharger l\'avis d\'imposition',
            en: 'Download the tax assessment notice',
          },
          {
            fr: 'Payer l\'avis d\'imposition en ligne',
            en: 'Pay the tax assessment notice online',
          },
          {
            fr: 'Faire vos déclarations d\'impôt périodiques',
            en: 'File your periodic tax returns',
          },
        ],
      },
      {
        type: 'paragraph',
        text: {
          fr: 'ATOM (Application de Traitement des Opérations fiscales via le Mobile) est le nouveau système de la Direction Générale des Impôts du Cameroun. Ce guide vous accompagne pas à pas dans toutes les démarches.',
          en: 'ATOM (Application de Traitement des Opérations fiscales via le Mobile) is the new system of the Cameroon General Directorate of Taxes. This guide walks you through all the procedures step by step.',
        },
      },
    ],
    resources: [
      {
        title: {
          fr: 'Version PDF (Français)',
          en: 'PDF Version (French)',
        },
        url: 'https://legalcameroun.com/wp-content/uploads/2024/10/GUIDE-IMMATRICULATION-AVEC-ATOM-DGI.pdf',
        type: 'pdf',
        language: 'FR',
      },
      {
        title: {
          fr: 'Version PPT (Français)',
          en: 'PPT Version (French)',
        },
        url: 'https://legalcameroun.com/wp-content/uploads/2024/10/Immatriculation-avec-ATOM-1.pptx',
        type: 'ppt',
        language: 'FR',
      },
      {
        title: {
          fr: 'English Version (PDF)',
          en: 'English Version (PDF)',
        },
        url: 'https://legalcameroun.com/wp-content/uploads/2024/10/REGISTER-WITH-ATOM-AT-DGT_USERs-GUIDE.pdf',
        type: 'pdf',
        language: 'EN',
      },
    ],
    image: 'https://legalcameroun.com/wp-content/uploads/2024/10/Guide-Atom1.png',
    imageAlt: {
      fr: 'Capture interface ATOM - Système DGI Cameroun',
      en: 'ATOM interface screenshot - Cameroon DGI System',
    },
    ctaTitle: {
      fr: 'Besoin d\'aide pour naviguer ATOM ?',
      en: 'Need help navigating ATOM?',
    },
    ctaDescription: {
      fr: 'Nos experts peuvent vous assister dans vos démarches fiscales.',
      en: 'Our experts can assist you with your tax procedures.',
    },
    ctaButtonText: {
      fr: 'Demander assistance personnalisée',
      en: 'Request personalized assistance',
    },
    ctaButtonHref: '/devis',
  },
  {
    slug: 'tutoriel-consultation',
    title: {
      fr: 'Comment Réserver une Consultation ?',
      en: 'How to Book a Consultation?',
    },
    shortTitle: {
      fr: 'Tutoriel RDV',
      en: 'Booking Tutorial',
    },
    description: {
      fr: 'Tutoriel simple pour prendre RDV avec un expert RODEC Conseils.',
      en: 'Simple tutorial to book an appointment with a RODEC Conseils expert.',
    },
    icon: 'calendar',
    heroIntro: {
      fr: 'Tutoriel simple pour prendre rendez-vous avec un expert RODEC Conseils en quelques clics.',
      en: 'Simple tutorial to book an appointment with a RODEC Conseils expert in just a few clicks.',
    },
    content: [
      {
        type: 'heading',
        title: {
          fr: 'Suivez ces étapes rapides',
          en: 'Follow these quick steps',
        },
      },
      {
        type: 'list',
        items: [
          {
            fr: 'Rendez-vous sur la page de prise de rendez-vous',
            en: 'Go to the appointment booking page',
          },
          {
            fr: 'Choisissez le type de consultation (création, modification, question générale…)',
            en: 'Choose the consultation type (creation, modification, general question...)',
          },
          {
            fr: 'Sélectionnez la date et l\'heure qui vous conviennent',
            en: 'Select the date and time that suit you',
          },
          {
            fr: 'Remplissez vos informations de contact',
            en: 'Fill in your contact information',
          },
          {
            fr: 'Confirmez votre rendez-vous – vous recevrez un rappel par email',
            en: 'Confirm your appointment – you will receive a reminder by email',
          },
        ],
      },
      {
        type: 'paragraph',
        text: {
          fr: 'La consultation initiale vous permet de discuter de votre projet avec un expert, d\'obtenir des conseils personnalisés et de comprendre les prochaines étapes pour votre entreprise.',
          en: 'The initial consultation allows you to discuss your project with an expert, get personalized advice, and understand the next steps for your business.',
        },
      },
    ],
    resources: [
      {
        title: {
          fr: 'Voir le tutoriel vidéo',
          en: 'Watch the video tutorial',
        },
        url: '#video',
        type: 'video',
      },
    ],
    ctaTitle: {
      fr: 'Prêt à réserver ?',
      en: 'Ready to book?',
    },
    ctaDescription: {
      fr: 'Prenez rendez-vous avec un expert dès maintenant.',
      en: 'Book an appointment with an expert now.',
    },
    ctaButtonText: {
      fr: 'Réservez maintenant',
      en: 'Book now',
    },
    ctaButtonHref: '/prendre-un-rendez-vous',
  },
];

// Helper function to get a fiche by slug
export function getFicheBySlug(slug: string): FichePratique | undefined {
  return fichesPratiques.find((fiche) => fiche.slug === slug);
}

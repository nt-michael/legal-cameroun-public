// Création d'entreprise section data
// Centralized content for easy translation and maintenance

import { BilingualText } from '@/lib/translations';

export interface PricingTier {
  name: BilingualText;
  price: number;
  currency: string;
  period: BilingualText;
  features: BilingualText[];
  highlighted?: boolean;
  badge?: BilingualText;
  cta: {
    text: BilingualText;
    href: string;
  };
}

export interface Step {
  number: number;
  title: BilingualText;
  description: BilingualText;
}

export interface FAQItem {
  question: BilingualText;
  answer: BilingualText;
}

export interface ComparisonRow {
  aspect: BilingualText;
  values: BilingualText[];
}

export interface LegalForm {
  id: string;
  name: BilingualText;
  shortName: BilingualText;
  description: BilingualText;
  advantages: BilingualText[];
  disadvantages: BilingualText[];
  href: string;
}

export interface SubpageData {
  slug: string;
  heroTitle: BilingualText;
  heroSubtitle: BilingualText;
  heroDescription: BilingualText;
  whyCreate: {
    title: BilingualText;
    content: BilingualText[];
  };
  advantages: BilingualText[];
  disadvantages?: BilingualText[];
  steps: Step[];
  comparison?: {
    headers: BilingualText[];
    rows: ComparisonRow[];
  };
  faq: FAQItem[];
  requirements?: BilingualText[];
}

// Trust badges shown throughout the section
export const trustBadges = [
  { value: '15 000+', label: { fr: 'Entrepreneurs accompagnées', en: 'Entrepreneurs supported' } },
  { value: '8', label: { fr: "D'années d'expérience", en: 'Years of experience' } },
  // { value: '50+', label: { fr: 'Juristes diplômés', en: 'Qualified lawyers' } },
  // { value: '48h', label: { fr: 'Traitement Premium', en: 'Premium processing' } },
];

// Why choose Legal Cameroun - 4 pillars
export const whyChooseUs = [
  {
    icon: 'simplicity',
    title: { fr: 'Simplicité', en: 'Simplicity' },
    description: { fr: 'Toutes démarches juridiques et comptables au même endroit.', en: 'All legal and accounting procedures in one place.' },
  },
  {
    icon: 'speed',
    title: { fr: 'Rapidité', en: 'Speed' },
    description: { fr: 'Questionnaire en ligne → Traitement en 48h.', en: 'Online questionnaire → Processing in 48h.' },
  },
  {
    icon: 'reliability',
    title: { fr: 'Fiabilité', en: 'Reliability' },
    description: { fr: '+50 juristes diplômés basés au Cameroun.', en: '50+ qualified lawyers based in Cameroon.' },
  },
  {
    icon: 'price',
    title: { fr: 'Prix', en: 'Price' },
    description: { fr: 'Rapport qualité/prix imbattable grâce au digital.', en: 'Unbeatable value for money thanks to digital.' },
  },
];

// Pricing tiers - used across all pages
export const pricingTiers: PricingTier[] = [
  {
    name: { fr: 'Starter', en: 'Starter' },
    price: 250000,
    currency: 'XAF',
    period: { fr: 'HT + frais admin', en: 'Excl. tax + admin fees' },
    features: [
      { fr: 'Statuts personnalisés', en: 'Customized articles of association' },
      { fr: 'Dossier complet', en: 'Complete file' },
      { fr: 'Guide des démarches', en: 'Step-by-step guide' },
      { fr: 'Support par email', en: 'Email support' },
    ],
    cta: {
      text: { fr: 'Choisir Starter', en: 'Choose Starter' },
      href: '/devis?plan=starter',
    },
  },
  {
    name: { fr: 'Standard', en: 'Standard' },
    price: 350000,
    currency: 'XAF',
    period: { fr: 'HT + frais admin', en: 'Excl. tax + admin fees' },
    features: [
      { fr: 'Tout Starter inclus', en: 'All Starter features included' },
      { fr: 'Validation par un juriste', en: 'Validation by a lawyer' },
      { fr: 'Immatriculation au greffe', en: 'Court registration' },
      { fr: 'Suivi de dossier en ligne', en: 'Online case tracking' },
      { fr: 'Support prioritaire', en: 'Priority support' },
    ],
    cta: {
      text: { fr: 'Choisir Standard', en: 'Choose Standard' },
      href: '/devis?plan=standard',
    },
  },
  {
    name: { fr: 'Premium', en: 'Premium' },
    price: 500000,
    currency: 'XAF',
    period: { fr: 'HT + frais admin', en: 'Excl. tax + admin fees' },
    highlighted: true,
    badge: { fr: 'Choix n°1', en: 'Top choice' },
    features: [
      { fr: 'Tout Standard inclus', en: 'All Standard features included' },
      // { fr: 'Traitement en 48h', en: 'Processing in 48h' },
      { fr: 'Assurance anti-rejet', en: 'Rejection insurance' },
      { fr: 'Assistance 30 jours', en: '30-day assistance' },
      { fr: 'Accompagnement personnalisé', en: 'Personalized support' },
      { fr: 'Conseiller dédié', en: 'Dedicated advisor' },
    ],
    cta: {
      text: { fr: 'Choisir Premium', en: 'Choose Premium' },
      href: '/devis?plan=premium',
    },
  },
];

// Association-specific pricing (slightly different features)
export const associationPricingTiers: PricingTier[] = [
  {
    name: { fr: 'Starter', en: 'Starter' },
    price: 150000,
    currency: 'XAF',
    period: { fr: 'HT', en: 'Excl. tax' },
    features: [
      { fr: 'Statuts personnalisés', en: 'Customized articles of association' },
      { fr: 'PV constitutif', en: 'Founding minutes' },
      { fr: 'Guide des démarches', en: 'Step-by-step guide' },
      { fr: 'Support par email', en: 'Email support' },
    ],
    cta: {
      text: { fr: 'Choisir Starter', en: 'Choose Starter' },
      href: '/devis?plan=starter&type=association',
    },
  },
  {
    name: { fr: 'Standard', en: 'Standard' },
    price: 200000,
    currency: 'XAF',
    period: { fr: 'HT', en: 'Excl. tax' },
    features: [
      { fr: 'Tout Starter inclus', en: 'All Starter features included' },
      { fr: 'Validation par un juriste', en: 'Validation by a lawyer' },
      { fr: 'Déclaration préfecture', en: 'Prefecture declaration' },
      { fr: 'Suivi de dossier', en: 'Case tracking' },
      { fr: 'Support prioritaire', en: 'Priority support' },
    ],
    cta: {
      text: { fr: 'Choisir Standard', en: 'Choose Standard' },
      href: '/devis?plan=standard&type=association',
    },
  },
  {
    name: { fr: 'Premium', en: 'Premium' },
    price: 250000,
    currency: 'XAF',
    period: { fr: 'HT', en: 'Excl. tax' },
    highlighted: true,
    badge: { fr: 'Choix n°1', en: 'Top choice' },
    features: [
      { fr: 'Tout Standard inclus', en: 'All Standard features included' },
      { fr: 'Traitement en 48h', en: 'Processing in 48h' },
      { fr: 'Obtention SIREN', en: 'SIREN number obtainment' },
      { fr: 'Statuts Word éditables', en: 'Editable Word articles' },
      { fr: 'Assistance 30 jours', en: '30-day assistance' },
      { fr: 'Conseiller dédié', en: 'Dedicated advisor' },
    ],
    cta: {
      text: { fr: 'Choisir Premium', en: 'Choose Premium' },
      href: '/devis?plan=premium&type=association',
    },
  },
];

// Legal forms for hub page comparison
export const legalForms: LegalForm[] = [
  {
    id: 'individual',
    name: { fr: 'Entreprise Individuelle / Micro-Entreprise', en: 'Sole Proprietorship / Micro-Enterprise' },
    shortName: { fr: 'Auto-Entrepreneur', en: 'Self-Employed' },
    description: { fr: 'Idéal pour tester un projet seul (ex. freelance à Douala).', en: 'Ideal for testing a project alone (e.g. freelance in Douala).' },
    advantages: [
      { fr: 'Formalités ultra-simples', en: 'Ultra-simple formalities' },
      { fr: 'Pas de statuts à rédiger', en: 'No articles of association to draft' },
      { fr: 'Obligations comptables allégées', en: 'Simplified accounting obligations' },
      { fr: 'Démarrage rapide', en: 'Quick start' },
    ],
    disadvantages: [
      { fr: 'Responsabilité illimitée', en: 'Unlimited liability' },
      { fr: 'Pas de personnalité morale', en: 'No legal personality' },
      { fr: 'Difficile de lever des fonds', en: 'Difficult to raise funds' },
    ],
    href: '/creation-entreprise/auto-entrepreneur',
  },
  {
    id: 'sas',
    name: { fr: 'SAS / SASU', en: 'SAS / SASU' },
    shortName: { fr: 'SAS/SASU', en: 'SAS/SASU' },
    description: { fr: 'Souplesse et flexibilité pour startups et projets innovants.', en: 'Flexibility for startups and innovative projects.' },
    advantages: [
      { fr: 'Statuts très flexibles', en: 'Very flexible articles of association' },
      { fr: 'Responsabilité limitée aux apports', en: 'Liability limited to contributions' },
      { fr: 'Régime social assimilé salarié', en: 'Employee-equivalent social security' },
      { fr: 'Cession de parts simplifiée', en: 'Simplified share transfer' },
      { fr: 'Adapté aux investisseurs', en: 'Suitable for investors' },
    ],
    disadvantages: [
      { fr: 'Charges sociales plus élevées', en: 'Higher social contributions' },
      { fr: 'Formalités de création', en: 'Formation formalities' },
    ],
    href: '/creation-entreprise/sas',
  },
  {
    id: 'sarl',
    name: { fr: 'SARL', en: 'SARL (Limited Liability Company)' },
    shortName: { fr: 'SARL', en: 'SARL' },
    description: { fr: 'Cadre sécurisé et encadré pour PME stables.', en: 'Secure and regulated framework for stable SMEs.' },
    advantages: [
      { fr: 'Protection du patrimoine', en: 'Asset protection' },
      { fr: 'Cadre légal strict et sécurisant', en: 'Strict and reassuring legal framework' },
      { fr: 'Conjoint collaborateur possible', en: 'Collaborating spouse possible' },
      { fr: 'SARL famille : avantages fiscaux', en: 'Family SARL: tax advantages' },
    ],
    disadvantages: [
      { fr: 'Statuts encadrés par la loi', en: 'Articles regulated by law' },
      { fr: 'Agrément requis pour cession', en: 'Approval required for transfer' },
      { fr: 'Moins flexible que SAS', en: 'Less flexible than SAS' },
    ],
    href: '/creation-entreprise/sarl',
  },
  {
    id: 'sarlu',
    name: { fr: 'SARLU / EURL', en: 'SARLU / EURL (Single-Member LLC)' },
    shortName: { fr: 'SARLU', en: 'SARLU' },
    description: { fr: 'SARL unipersonnelle pour entrepreneur solo.', en: 'Single-member LLC for solo entrepreneurs.' },
    advantages: [
      { fr: 'Responsabilité limitée aux apports', en: 'Liability limited to contributions' },
      { fr: 'Cotisations sociales faibles (TNS)', en: 'Low social contributions (self-employed)' },
      { fr: 'Statuts protecteurs', en: 'Protective articles of association' },
      { fr: 'Capital minimum 1 XAF', en: 'Minimum capital 1 XAF' },
    ],
    disadvantages: [
      { fr: 'Encadrement strict', en: 'Strict regulatory framework' },
      { fr: 'Cession de parts complexe', en: 'Complex share transfer' },
      { fr: 'Protection sociale faible', en: 'Weak social protection' },
    ],
    href: '/creation-entreprise/sarlu',
  },
  {
    id: 'association',
    name: { fr: 'Association', en: 'Association (Non-Profit)' },
    shortName: { fr: 'Association', en: 'Association' },
    description: { fr: 'Projets culturels, caritatifs ou éducatifs non lucratifs.', en: 'Cultural, charitable, or educational non-profit projects.' },
    advantages: [
      { fr: 'Création simple et rapide', en: 'Simple and fast creation' },
      { fr: 'Pas de capital requis', en: 'No capital required' },
      { fr: 'Publication JOAFE gratuite', en: 'Free JOAFE publication' },
      { fr: 'Peut recevoir des dons', en: 'Can receive donations' },
    ],
    disadvantages: [
      { fr: 'But non lucratif obligatoire', en: 'Non-profit purpose mandatory' },
      { fr: 'Minimum 2 dirigeants', en: 'Minimum 2 directors' },
    ],
    href: '/creation-entreprise/association',
  },
];

// General steps for hub page
export const generalSteps: Step[] = [
  {
    number: 1,
    title: { fr: 'Rédiger les statuts', en: 'Draft the articles of association' },
    description: { fr: 'Définissez les règles de fonctionnement de votre structure.', en: 'Define the operating rules of your organization.' },
  },
  {
    number: 2,
    title: { fr: 'Déposer le capital', en: 'Deposit the capital' },
    description: { fr: 'Ouvrez un compte et déposez le capital social (min 1 XAF).', en: 'Open an account and deposit the share capital (min 1 XAF).' },
  },
  {
    number: 3,
    title: { fr: 'Publier une annonce légale', en: 'Publish a legal notice' },
    description: { fr: 'Annoncez la création de votre entreprise.', en: 'Announce the creation of your company.' },
  },
  {
    number: 4,
    title: { fr: 'Déposer le dossier', en: 'Submit the file' },
    description: { fr: 'Soumettez votre dossier complet aux formalités.', en: 'Submit your complete file for formalities.' },
  },
  {
    number: 5,
    title: { fr: 'Obtenir l\'immatriculation', en: 'Obtain registration' },
    description: { fr: 'Recevez votre Kbis/RNE et démarrez votre activité.', en: 'Receive your Kbis/RNE and start your business.' },
  },
];

// Aides & Avantages
export const aidesAvantages = [
  {
    title: { fr: 'Subventions innovantes', en: 'Innovation grants' },
    description: { fr: 'Aides des collectivités locales pour projets innovants.', en: 'Local government grants for innovative projects.' },
  },
  {
    title: { fr: 'Aides femmes entrepreneures', en: 'Women entrepreneur support' },
    description: { fr: 'Programmes dédiés aux entrepreneures au Cameroun.', en: 'Dedicated programs for women entrepreneurs in Cameroon.' },
  },
  {
    title: { fr: 'ACRE', en: 'ACRE' },
    description: { fr: 'Exonération de charges sociales la 1ère année.', en: 'Social contribution exemption for the 1st year.' },
  },
  {
    title: { fr: 'Allocations chômage', en: 'Unemployment benefits' },
    description: { fr: 'Maintien ARE ou ARCE (60% droits en 2 versements).', en: 'ARE or ARCE retention (60% of rights in 2 installments).' },
  },
];

// Subpage data
export const subpagesData: Record<string, SubpageData> = {
  sas: {
    slug: 'sas',
    heroTitle: { fr: 'Créez Votre SAS/SASU', en: 'Create Your SAS/SASU' },
    heroSubtitle: { fr: 'Souple et Adaptée à Vos Besoins', en: 'Flexible and Tailored to Your Needs' },
    heroDescription: { fr: 'Simple, sûr, rapide, économique. Questionnaire en ligne.', en: 'Simple, safe, fast, affordable. Online questionnaire.' },
    whyCreate: {
      title: { fr: 'Pourquoi créer une SAS ?', en: 'Why Create a SAS?' },
      content: [
        { fr: 'Souplesse organisationnelle et de gouvernance maximale.', en: 'Maximum organizational and governance flexibility.' },
        { fr: 'Adaptée aux startups innovantes ou projets mixtes.', en: 'Suitable for innovative startups or mixed projects.' },
        { fr: 'Capital minimum de 1 XAF, responsabilité limitée aux apports.', en: 'Minimum capital of 1 XAF, liability limited to contributions.' },
        { fr: 'Régime social assimilé salarié pour le président.', en: 'Employee-equivalent social security for the president.' },
        { fr: 'Cession de parts simplifiée sans agrément obligatoire.', en: 'Simplified share transfer without mandatory approval.' },
      ],
    },
    advantages: [
      { fr: 'Statuts très flexibles et personnalisables', en: 'Very flexible and customizable articles of association' },
      { fr: 'Responsabilité limitée aux apports', en: 'Liability limited to contributions' },
      { fr: 'Attractif pour les investisseurs', en: 'Attractive for investors' },
      { fr: 'Possibilité d\'apports en compte courant', en: 'Possibility of current account contributions' },
      { fr: 'Distribution de dividendes possible', en: 'Dividend distribution possible' },
      { fr: 'Toutes activités autorisées (y compris assurances)', en: 'All activities allowed (including insurance)' },
    ],
    steps: [
      {
        number: 1,
        title: { fr: 'Questionnaire rapide', en: 'Quick questionnaire' },
        description: { fr: 'Accédez à vos statuts et dossier. Signez en ligne, envoyez vos pièces.', en: 'Access your articles and file. Sign online, send your documents.' },
      },
      {
        number: 2,
        title: { fr: 'On s\'occupe de tout', en: 'We handle everything' },
        description: { fr: 'Nos juristes valident, gèrent le greffe et l\'annonce légale → RNE/Kbis.', en: 'Our lawyers validate, manage the court registry and legal notice → RNE/Kbis.' },
      },
      {
        number: 3,
        title: { fr: 'Accompagnement A à Z', en: 'A to Z support' },
        description: { fr: 'Nos experts restent à votre écoute tout au long du processus.', en: 'Our experts are available throughout the entire process.' },
      },
    ],
    comparison: {
      headers: [
        { fr: 'Aspect', en: 'Aspect' },
        { fr: 'SAS/SASU', en: 'SAS/SASU' },
        { fr: 'SARL', en: 'SARL' },
      ],
      rows: [
        { aspect: { fr: 'Associés', en: 'Partners' }, values: [{ fr: '1+ (SASU solo)', en: '1+ (SASU solo)' }, { fr: '2+', en: '2+' }] },
        { aspect: { fr: 'Statuts', en: 'Articles' }, values: [{ fr: 'Très libres/flexibles', en: 'Very free/flexible' }, { fr: 'Encadrés par la loi', en: 'Regulated by law' }] },
        { aspect: { fr: 'Régime Social', en: 'Social Security' }, values: [{ fr: 'Assimilé salarié', en: 'Employee-equivalent' }, { fr: 'TNS majoritaire', en: 'Self-employed (majority)' }] },
        { aspect: { fr: 'Cession Parts', en: 'Share Transfer' }, values: [{ fr: 'Simple (pas agrément)', en: 'Simple (no approval)' }, { fr: 'Agrément requis', en: 'Approval required' }] },
        { aspect: { fr: 'Activités', en: 'Activities' }, values: [{ fr: 'Toutes (incl. assurances)', en: 'All (incl. insurance)' }, { fr: 'Limitées', en: 'Limited' }] },
      ],
    },
    faq: [
      {
        question: { fr: 'Quel est le capital minimum pour une SAS ?', en: 'What is the minimum capital for a SAS?' },
        answer: { fr: '1 XAF symbolique suffit légalement. Cependant, un capital plus élevé est conseillé pour la crédibilité auprès des partenaires et banques.', en: '1 symbolic XAF is legally sufficient. However, a higher capital is recommended for credibility with partners and banks.' },
      },
      {
        question: { fr: 'Quelle différence entre SAS et SASU ?', en: 'What is the difference between SAS and SASU?' },
        answer: { fr: 'La SASU est simplement une SAS avec un seul associé. Les règles de fonctionnement sont identiques, seul le nombre d\'associés diffère.', en: 'The SASU is simply a SAS with a single partner. The operating rules are identical, only the number of partners differs.' },
      },
      {
        question: { fr: 'SAS ou SARL, que choisir ?', en: 'SAS or SARL, which to choose?' },
        answer: { fr: 'La SAS offre plus de souplesse dans les statuts et la gouvernance. La SARL est plus encadrée mais offre un cadre sécurisant. Choisissez selon vos besoins de flexibilité.', en: 'The SAS offers more flexibility in articles and governance. The SARL is more regulated but offers a secure framework. Choose based on your flexibility needs.' },
      },
      {
        question: { fr: 'Combien de temps pour créer une SAS ?', en: 'How long does it take to create a SAS?' },
        answer: { fr: 'Avec notre forfait Premium, votre SAS peut être créée en 48h. Le délai standard est de 5-7 jours ouvrés.', en: 'With our Premium plan, your SAS can be created in 48h. The standard timeframe is 5-7 business days.' },
      },
    ],
  },
  sarl: {
    slug: 'sarl',
    heroTitle: { fr: 'Créez Votre SARL', en: 'Create Your SARL' },
    heroSubtitle: { fr: 'Sécurisée et Encadrée', en: 'Secure and Regulated' },
    heroDescription: { fr: 'Protection du patrimoine, cadre légal strict – Parfait pour les PME stables.', en: 'Asset protection, strict legal framework – Perfect for stable SMEs.' },
    whyCreate: {
      title: { fr: 'Pourquoi créer une SARL ?', en: 'Why Create a SARL?' },
      content: [
        { fr: 'Protection du patrimoine personnel (responsabilité limitée aux apports).', en: 'Personal asset protection (liability limited to contributions).' },
        { fr: 'Gérant minoritaire ou égalitaire = régime assimilé salarié.', en: 'Minority or equal manager = employee-equivalent status.' },
        { fr: 'SARL de famille : option IR au lieu de IS, exonérations sur cessions.', en: 'Family SARL: income tax option instead of corporate tax, exemptions on transfers.' },
        { fr: 'Possibilité d\'intégrer des mineurs comme associés.', en: 'Possibility to include minors as partners.' },
        { fr: 'Cadre légal strict qui évite les risques de conflits.', en: 'Strict legal framework that avoids conflict risks.' },
      ],
    },
    advantages: [
      { fr: 'Patrimoine personnel protégé', en: 'Personal assets protected' },
      { fr: 'Conjoint collaborateur possible', en: 'Collaborating spouse possible' },
      { fr: 'Cadre légal évite les risques', en: 'Legal framework avoids risks' },
      { fr: 'SARL famille : avantages fiscaux IR', en: 'Family SARL: income tax advantages' },
      { fr: 'Structure reconnue et rassurante', en: 'Recognized and reassuring structure' },
    ],
    steps: [
      {
        number: 1,
        title: { fr: 'Rédiger les statuts', en: 'Draft the articles of association' },
        description: { fr: 'Statuts encadrés par la loi – accompagnement professionnel recommandé.', en: 'Articles regulated by law – professional assistance recommended.' },
      },
      {
        number: 2,
        title: { fr: 'Déposer le capital', en: 'Deposit the capital' },
        description: { fr: 'Ouvrez un compte bancaire et déposez le capital (minimum 1 XAF).', en: 'Open a bank account and deposit the capital (minimum 1 XAF).' },
      },
      {
        number: 3,
        title: { fr: 'Documents obligatoires', en: 'Required documents' },
        description: { fr: 'Attestation de non-condamnation, déclaration des bénéficiaires effectifs.', en: 'Certificate of no criminal record, declaration of beneficial owners.' },
      },
      {
        number: 4,
        title: { fr: 'Annonce légale', en: 'Legal notice' },
        description: { fr: 'Publication de l\'avis de constitution dans un journal habilité.', en: 'Publication of the formation notice in an authorized journal.' },
      },
      {
        number: 5,
        title: { fr: 'Immatriculation', en: 'Registration' },
        description: { fr: 'Dépôt du dossier et obtention de l\'immatriculation au greffe.', en: 'File submission and obtaining registration at the court registry.' },
      },
    ],
    comparison: {
      headers: [
        { fr: 'Aspect', en: 'Aspect' },
        { fr: 'SARL', en: 'SARL' },
        { fr: 'SAS', en: 'SAS' },
      ],
      rows: [
        { aspect: { fr: 'Associés', en: 'Partners' }, values: [{ fr: '2+', en: '2+' }, { fr: '1+', en: '1+' }] },
        { aspect: { fr: 'Statuts', en: 'Articles' }, values: [{ fr: 'Encadrés', en: 'Regulated' }, { fr: 'Libres', en: 'Free' }] },
        { aspect: { fr: 'Régime Social', en: 'Social Security' }, values: [{ fr: 'TNS majoritaire', en: 'Self-employed (majority)' }, { fr: 'Assimilé salarié', en: 'Employee-equivalent' }] },
        { aspect: { fr: 'Cession', en: 'Transfer' }, values: [{ fr: 'Agrément obligatoire', en: 'Approval mandatory' }, { fr: 'Flexible', en: 'Flexible' }] },
      ],
    },
    faq: [
      {
        question: { fr: 'Quelle différence entre SARL famille et classique ?', en: 'What is the difference between a family SARL and a standard one?' },
        answer: { fr: 'La SARL de famille permet d\'opter pour l\'impôt sur le revenu (IR) au lieu de l\'IS, offrant des avantages fiscaux significatifs notamment lors de cessions de parts.', en: 'The family SARL allows opting for income tax (IR) instead of corporate tax (IS), offering significant tax advantages especially during share transfers.' },
      },
      {
        question: { fr: 'Peut-on créer une SARL sans activité immédiate ?', en: 'Can you create a SARL without immediate activity?' },
        answer: { fr: 'Oui, il est possible de créer une SARL en attendant de démarrer l\'activité. Cela peut être utile pour sécuriser un nom ou préparer un projet.', en: 'Yes, it is possible to create a SARL while waiting to start the activity. This can be useful to secure a name or prepare a project.' },
      },
      {
        question: { fr: 'Quel est le nombre minimum d\'associés ?', en: 'What is the minimum number of partners?' },
        answer: { fr: 'Une SARL nécessite au minimum 2 associés. Pour un associé unique, optez pour une SARLU (EURL).', en: 'A SARL requires at least 2 partners. For a single partner, opt for a SARLU (EURL).' },
      },
    ],
  },
  sarlu: {
    slug: 'sarlu',
    heroTitle: { fr: 'Créez Votre SARLU/EURL', en: 'Create Your SARLU/EURL' },
    heroSubtitle: { fr: 'L\'Entreprise Solo Protégée', en: 'The Protected Solo Business' },
    heroDescription: { fr: 'SARLU = Société à Responsabilité Limitée Unipersonnelle. Encadrée par la loi, idéale pour entrepreneur seul.', en: 'SARLU = Single-Member Limited Liability Company. Regulated by law, ideal for solo entrepreneurs.' },
    whyCreate: {
      title: { fr: 'Pourquoi créer une SARLU ?', en: 'Why Create a SARLU?' },
      content: [
        { fr: 'Structure unipersonnelle avec responsabilité limitée.', en: 'Single-member structure with limited liability.' },
        { fr: 'Cotisations sociales faibles grâce au statut TNS.', en: 'Low social contributions thanks to self-employed status.' },
        { fr: 'Statuts protecteurs encadrés par la loi.', en: 'Protective articles of association regulated by law.' },
        { fr: 'Capital minimum de 1 XAF.', en: 'Minimum capital of 1 XAF.' },
        { fr: 'Possibilité d\'évoluer vers une SARL en ajoutant des associés.', en: 'Possibility to evolve into a SARL by adding partners.' },
      ],
    },
    advantages: [
      { fr: 'Capital minimum 1 XAF (plus conseillé pour crédibilité)', en: 'Minimum capital 1 XAF (higher recommended for credibility)' },
      { fr: 'Responsabilité limitée aux apports', en: 'Liability limited to contributions' },
      { fr: 'Cotisations sociales faibles (TNS)', en: 'Low social contributions (self-employed)' },
      { fr: 'Statuts protecteurs', en: 'Protective articles of association' },
      { fr: 'Évolution possible vers SARL', en: 'Possible evolution to SARL' },
    ],
    disadvantages: [
      { fr: 'Encadrement strict des statuts', en: 'Strict regulatory framework for articles' },
      { fr: 'Cession de parts complexe et onéreuse', en: 'Complex and costly share transfer' },
      { fr: 'Protection sociale plus faible que SAS', en: 'Weaker social protection than SAS' },
    ],
    steps: [
      {
        number: 1,
        title: { fr: 'Questionnaire', en: 'Questionnaire' },
        description: { fr: 'Remplissez le questionnaire → Dossier complet + signature en ligne.', en: 'Fill out the questionnaire → Complete file + online signature.' },
      },
      {
        number: 2,
        title: { fr: 'Traitement juriste', en: 'Lawyer processing' },
        description: { fr: 'Nos juristes gèrent le greffe et l\'annonce légale.', en: 'Our lawyers handle the court registry and legal notice.' },
      },
      {
        number: 3,
        title: { fr: 'Accompagnement', en: 'Support' },
        description: { fr: 'Nos experts vous accompagnent jusqu\'à l\'immatriculation.', en: 'Our experts support you until registration.' },
      },
    ],
    requirements: [
      { fr: 'Associé unique', en: 'Single partner' },
      { fr: 'Capital minimum 1 XAF', en: 'Minimum capital 1 XAF' },
      { fr: 'Cumul gérant/associé possible', en: 'Manager/partner combination possible' },
      { fr: 'Justificatif de siège social', en: 'Proof of registered office' },
      { fr: 'Attestation de dépôt des fonds', en: 'Certificate of deposit of funds' },
      { fr: 'Statuts signés', en: 'Signed articles of association' },
      { fr: 'Attestation de non-condamnation', en: 'Certificate of no criminal record' },
    ],
    faq: [
      {
        question: { fr: 'Quelle différence entre SARLU et SASU ?', en: 'What is the difference between SARLU and SASU?' },
        answer: { fr: 'La principale différence réside dans la cession de parts : plus lourde en SARLU (formalisme + modification des statuts) et le régime social (TNS vs assimilé salarié).', en: 'The main difference lies in share transfer: more burdensome in SARLU (formalism + articles modification) and the social security regime (self-employed vs employee-equivalent).' },
      },
      {
        question: { fr: 'Peut-on passer de SARLU à SARL ?', en: 'Can you switch from SARLU to SARL?' },
        answer: { fr: 'Oui, en ajoutant un ou plusieurs associés, votre SARLU devient automatiquement une SARL. Les statuts devront être mis à jour.', en: 'Yes, by adding one or more partners, your SARLU automatically becomes a SARL. The articles will need to be updated.' },
      },
      {
        question: { fr: 'Quel régime fiscal pour une SARLU ?', en: 'What tax regime for a SARLU?' },
        answer: { fr: 'Par défaut, la SARLU est soumise à l\'IR (impôt sur le revenu). Vous pouvez opter pour l\'IS (impôt sur les sociétés) de manière irrévocable.', en: 'By default, the SARLU is subject to income tax (IR). You can irrevocably opt for corporate tax (IS).' },
      },
    ],
  },
  association: {
    slug: 'association',
    heroTitle: { fr: 'Créez Votre Association', en: 'Create Your Association' },
    heroSubtitle: { fr: 'Culturelle, Caritative, Éducative', en: 'Cultural, Charitable, Educational' },
    heroDescription: { fr: 'Projets non lucratifs simples et rapides. Idéal pour activités culturelles, humanitaires ou éducatives.', en: 'Simple and fast non-profit projects. Ideal for cultural, humanitarian, or educational activities.' },
    whyCreate: {
      title: { fr: 'Pourquoi créer une Association ?', en: 'Why Create an Association?' },
      content: [
        { fr: 'Structure idéale pour projets à but non lucratif.', en: 'Ideal structure for non-profit projects.' },
        { fr: 'Création simple et rapide (récépissé en 5 jours max).', en: 'Simple and fast creation (receipt within 5 days max).' },
        { fr: 'Pas de capital social requis.', en: 'No share capital required.' },
        { fr: 'Publication gratuite au JOAFE depuis 2020.', en: 'Free publication in the JOAFE since 2020.' },
        { fr: 'Possibilité de recevoir des dons et subventions.', en: 'Possibility to receive donations and grants.' },
      ],
    },
    advantages: [
      { fr: 'Création simple et rapide', en: 'Simple and fast creation' },
      { fr: 'Pas de capital requis', en: 'No capital required' },
      { fr: 'Publication JOAFE gratuite', en: 'Free JOAFE publication' },
      { fr: 'Peut recevoir des dons', en: 'Can receive donations' },
      { fr: 'Peut employer des salariés', en: 'Can hire employees' },
      { fr: 'Exonérations fiscales possibles', en: 'Possible tax exemptions' },
    ],
    steps: [
      {
        number: 1,
        title: { fr: 'Rédiger les statuts', en: 'Draft the articles of association' },
        description: { fr: 'Définissez raison sociale, objet, siège, durée, règles de fonctionnement et ressources.', en: 'Define the name, purpose, headquarters, duration, operating rules, and resources.' },
      },
      {
        number: 2,
        title: { fr: 'Assemblée constitutive', en: 'Founding assembly' },
        description: { fr: 'Réunissez les membres fondateurs et désignez au moins 2 dirigeants.', en: 'Gather the founding members and appoint at least 2 directors.' },
      },
      {
        number: 3,
        title: { fr: 'Préparer les documents', en: 'Prepare the documents' },
        description: { fr: 'Formulaire, statuts signés, PV d\'assemblée, liste des dirigeants.', en: 'Form, signed articles, assembly minutes, list of directors.' },
      },
      {
        number: 4,
        title: { fr: 'Déclaration préfecture', en: 'Prefecture declaration' },
        description: { fr: 'Déposez le dossier → Récépissé sous 5 jours (en ligne).', en: 'Submit the file → Receipt within 5 days (online).' },
      },
      {
        number: 5,
        title: { fr: 'Publication JOAFE', en: 'JOAFE publication' },
        description: { fr: 'Annonce légale gratuite au Journal Officiel depuis 2020.', en: 'Free legal notice in the Official Journal since 2020.' },
      },
    ],
    faq: [
      {
        question: { fr: 'Peut-on créer une association seul ?', en: 'Can you create an association alone?' },
        answer: { fr: 'Non, une association nécessite au minimum 2 dirigeants (président et au moins un autre membre du bureau).', en: 'No, an association requires at least 2 directors (president and at least one other board member).' },
      },
      {
        question: { fr: 'Faut-il un compte bancaire ?', en: 'Is a bank account required?' },
        answer: { fr: 'Ce n\'est pas obligatoire mais fortement recommandé pour recevoir des dons, cotisations et gérer les finances de l\'association.', en: 'It is not mandatory but strongly recommended to receive donations, membership fees, and manage the association\'s finances.' },
      },
      {
        question: { fr: 'Peut-on domicilier l\'association en mairie ?', en: 'Can the association be registered at the town hall?' },
        answer: { fr: 'Oui, c\'est possible avec l\'accord du maire. C\'est une solution pratique pour les petites associations.', en: 'Yes, it is possible with the mayor\'s agreement. It is a practical solution for small associations.' },
      },
      {
        question: { fr: 'Comment créer une association humanitaire ?', en: 'How to create a humanitarian association?' },
        answer: { fr: 'Le processus est identique à toute association. Seul l\'objet social change pour mentionner l\'aide aux populations.', en: 'The process is identical to any association. Only the social purpose changes to mention aid to populations.' },
      },
      {
        question: { fr: 'Combien coûte la création ?', en: 'How much does creation cost?' },
        answer: { fr: 'La déclaration en préfecture est gratuite. Seuls les frais optionnels (rédaction statuts pro, domiciliation) sont payants.', en: 'The prefecture declaration is free. Only optional fees (professional articles drafting, domiciliation) are chargeable.' },
      },
    ],
  },
};

// Hub page hero content
export const hubHero = {
  title: { fr: 'Créez l\'Entreprise Faite pour Vous au Cameroun', en: 'Create the Right Business for You in Cameroon' },
  subtitle: { fr: 'Zéro stress, rapide (48h Premium), économique.', en: 'Zero stress, fast (48h Premium), affordable.' },
  description: { fr: 'SASU, SAS, SARL, SARLU, SCI, Auto-entrepreneur, Entreprise individuelle... +15 000 entrepreneurs accompagnés depuis 8 ans par des juristes basés au Cameroun.', en: 'SASU, SAS, SARL, SARLU, SCI, Self-employed, Sole proprietorship... 15,000+ entrepreneurs supported for 8 years by lawyers based in Cameroon.' },
  primaryCta: {
    text: { fr: 'C\'est parti ! Démarrer le q uestionnaire', en: 'Let\'s go! Start the questionnaire' },
    href: '/devis',
  },
  secondaryCta: {
    text: { fr: 'Comparateur de Statuts', en: 'Legal Form Comparator' },
    href: '#comparateur',
  },
};

// Subpages grid for hub page
export const subpagesGrid = [
  {
    title: { fr: 'Créer une SAS/SASU', en: 'Create a SAS/SASU' },
    description: { fr: 'Souplesse et flexibilité maximales', en: 'Maximum flexibility' },
    href: '/creation-entreprise/sas',
    icon: 'building',
  },
  {
    title: { fr: 'Créer une SARL', en: 'Create a SARL' },
    description: { fr: 'Cadre sécurisé et encadré', en: 'Secure and regulated framework' },
    href: '/creation-entreprise/sarl',
    icon: 'shield',
  },
  {
    title: { fr: 'Créer une SARLU/EURL', en: 'Create a SARLU/EURL' },
    description: { fr: 'Entrepreneur solo protégé', en: 'Protected solo entrepreneur' },
    href: '/creation-entreprise/sarlu',
    icon: 'user',
  },
  {
    title: { fr: 'Créer une Association', en: 'Create an Association' },
    description: { fr: 'Projets non lucratifs', en: 'Non-profit projects' },
    href: '/creation-entreprise/association',
    icon: 'users',
  },
];

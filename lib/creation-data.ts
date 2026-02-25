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
  pricePrefix?: BilingualText;
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

const COMPARISON_ROW_DATA: ComparisonRow[] = [
  {
    aspect: {
      fr: "Nombre d’associés",
      en: "Number of shareholders",
    },
    values: [
      {
        fr: "SAS : 2+\n SASU : 1 associé unique",
        en: "SAS: 2+\n SASU: single shareholder",
      },
      {
        fr: "2 à 50 associés (SARLU : 1 associé possible)",
        en: "2 to 50 shareholders (SARLU: single shareholder allowed)",
      },
    ],
  },
  {
    aspect: {
      fr: "Responsabilité des associés",
      en: "Shareholder liability",
    },
    values: [
      {
        fr: "Limitée aux apports",
        en: "Limited to contributions",
      },
      {
        fr: "Limitée aux apports",
        en: "Limited to contributions",
      },
    ],
  },
  {
    aspect: {
      fr: "Régime social du dirigeant",
      en: "Executive social security regime",
    },
    values: [
      {
        fr: "Selon le droit national (CNPS si rémunéré)",
        en: "According to national law (CNPS if remunerated)",
      },
      {
        fr: "Gérant minoritaire ou égalitaire peut relever de la CNPS",
        en: "Minority or equal manager may be affiliated with CNPS",
      },
    ],
  },
  {
    aspect: {
      fr: "Flexibilité statutaire",
      en: "Statutory flexibility",
    },
    values: [
      {
        fr: "Très flexible : organisation et gouvernance libre",
        en: "Very flexible: free organization and governance",
      },
      {
        fr: "Encadrée par la loi, statuts moins modulables",
        en: "Regulated by law, less flexible articles",
      },
    ],
  },
  {
    aspect: {
      fr: "Dirigeants",
      en: "Management",
    },
    values: [
      {
        fr: "Président ou plusieurs dirigeants selon les statuts",
        en: "President or multiple managers as defined in the articles",
      },
      {
        fr: "Gérant(s) nommé(s) par les associés",
        en: "Manager(s) appointed by shareholders",
      },
    ],
  },
  {
    aspect: {
      fr: "Cession de parts",
      en: "Share transfer",
    },
    values: [
      {
        fr: "Libre par défaut, sauf clause statutaire",
        en: "Free by default, unless restricted by the articles",
      },
      {
        fr: "Cession à des tiers soumise à agrément obligatoire",
        en: "Transfer to third parties subject to mandatory approval",
      },
    ],
  },
  {
    aspect: {
      fr: "Activités autorisées",
      en: "Authorized activities",
    },
    values: [
      {
        fr: "Toute activité commerciale licite, sous réserve des restrictions sectorielles",
        en: "Any lawful commercial activity, subject to sectoral restrictions",
      },
      {
        fr: "Toute activité commerciale licite, sous réserve des restrictions sectorielles",
        en: "Any lawful commercial activity, subject to sectoral restrictions",
      },
    ],
  },
  {
    aspect: {
      fr: "Capital minimum",
      en: "Minimum capital",
    },
    values: [
      {
        fr: "Libre, fixé dans les statuts, sans minimum légal",
        en: "Freely determined in the articles, no legal minimum",
      },
      {
        fr: "Libre mais mention obligatoire dans les statuts (minimum conseillé : 100 000 XAF)",
        en: "Freely set but must be stated in the articles (recommended minimum: 100,000 XAF)",
      },
    ],
  },
  {
    aspect: {
      fr: "Adaptée à",
      en: "Best suited for",
    },
    values: [
      {
        fr: "Startups, projets innovants, levée de fonds, investisseurs",
        en: "Startups, innovative projects, fundraising, investors",
      },
      {
        fr: "PME, entreprises familiales, projets nécessitant un cadre sécurisé",
        en: "SMEs, family businesses, projects requiring a secure legal framework",
      },
    ],
  },
  {
    aspect: {
      fr: "Fiscalité",
      en: "Taxation",
    },
    values: [
      {
        fr: "Impôt sur les sociétés (IS) par défaut",
        en: "Corporate income tax (CIT) by default",
      },
      {
        fr: "Impôt sur les sociétés (IS) par défaut (IRPP possible pour SARLU)",
        en: "Corporate income tax (CIT) by default (personal income tax possible for SARLU)",
      },
    ],
  },
];

// Trust badges shown throughout the section
export const trustBadges = [
  { value: '15 000+', label: { fr: 'Entrepreneurs accompagnées', en: 'Entrepreneurs supported' } },
  { value: '8', label: { fr: "Années d'expérience", en: 'Years of experience' } },
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
    description: { fr: '+50 experts diplômés basés au Cameroun.', en: '50+ qualified experts based in Cameroon.' },
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
    pricePrefix: { fr: 'À partir de', en: 'Starting from' },
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
    pricePrefix: { fr: 'À partir de', en: 'Starting from' },
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
    pricePrefix: { fr: 'À partir de', en: 'Starting from' },
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
    name: { fr: 'Établissement Commercial', en: 'Commercial Establishment' },
    shortName: { fr: 'Établissement Commercial', en: 'Commercial Establishment' },
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
    name: { fr: 'SAS', en: 'SAS' },
    shortName: { fr: 'SAS', en: 'SAS' },
    description: { fr: 'Souplesse et flexibilité pour startups et projets innovants.', en: 'Flexibility for startups and innovative projects.' },
    advantages: [
      { fr: 'Statuts très flexibles et personnalisables', en: 'Very flexible and customizable articles of association' },
      { fr: 'Responsabilité limitée aux apports', en: 'Liability limited to contributions' },
      { fr: 'Attractif pour les investisseurs', en: 'Attractive for investors' },
      { fr: 'Possibilité d\'apports en compte courant', en: 'Possibility of current account contributions' },
      { fr: 'Distribution de dividendes possible', en: 'Dividend distribution possible' },
      { fr: 'Toutes activités autorisées (sauf certaines activités règlementées qui exigent souvent une forme sociale spécifique)', en: 'All activities are permitted (except for certain regulated activities, which often require a specific legal form).' }
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
      { fr: "Responsabilité limitée aux apports", en: "Liability limited to contributions" },
      { fr: "Stabilité du capital social", en: "Stability of share capital" },
      { fr: "Gérance organisée par la loi", en: "Management governed by law" },
      { fr: "Cadre légal rassurant", en: "Reassuring legal framework" },
      { fr: "Constitution possible entre membres d\’une même famille", en: "Can be formed among members of the same family" },
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
    name: { fr: 'SARLU', en: 'SARLU' },
    shortName: { fr: 'SARLU', en: 'SARLU' },
    description: { fr: 'SARL unipersonnelle pour entrepreneur solo.', en: 'Single-member LLC for solo entrepreneurs.' },
    advantages: [
      { fr: 'Patrimoine personnel protégé', en: 'Protection of personal assets' },
      { fr: 'Simplicité administrative et juridique', en: 'Administrative and legal simplicity' },
      { fr: 'Structure légale rassurante', en: 'Reassuring legal structure' },
      { fr: 'Evolution possible vers SARL classique', en: 'Possible evolution into a classic SARL' },
    ],
    disadvantages: [
      { fr: 'Cession de parts libre', en: 'Free transfer of shares' },
      { fr: 'Régime social du gérant dépend du droit national (affiliation à la CNPS possible si rémunération au Cameroun.)', en: 'The manager’s social security regime depends on national law (in Cameroon, affiliation to the CNPS is possible if the manager is remunerated)' }
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
      { fr: 'Peut employer des salariés', en: 'Can hire employees' },
      { fr: 'Exonérations fiscales possibles', en: 'Possible tax exemptions' },
      { fr: 'Accès à la personnalité juridique', en: 'Access to legal personality' }
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
    description: { fr: 'Recevez votre RCCM et démarrez votre activité.', en: 'Receive your RCCM and start your business.' },
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
    heroTitle: { fr: 'Créer une SAS', en: 'Create a SAS (Simplified Joint-Stock Company)' },
    heroSubtitle: { fr: 'Souple et Adaptée à Vos Besoins', en: 'Flexible and Tailored to Your Needs' },
    heroDescription: { fr: 'Simple, sûr, rapide, économique. Questionnaire en ligne.', en: 'Simple, safe, fast, affordable. Online questionnaire.' },
    whyCreate: {
      title: { fr: 'Pourquoi créer une SAS ?', en: 'Why Create a SAS?' },
      content: [
        { fr: 'Souplesse organisationnelle et de gouvernance maximale.', en: 'Maximum organizational and governance flexibility.' },
        { fr: 'Adaptée aux startups innovantes ou projets mixtes.', en: 'Suitable for innovative startups or mixed projects.' },
        { fr: 'Capital minimum de 1 XAF, responsabilité limitée aux apports.', en: 'Minimum capital of 1 XAF, liability limited to contributions.' },
        { fr: 'Régime social : affiliation du président ou gérant à la CNPS en tant que mandataire social si rémunéré.', en: 'Social security regime: affiliation of the president or managing director to the CNPS as a corporate officer (mandataire social) if remunerated.' },
        { fr: 'Cession de parts libre sauf stipulation contraire des statuts prévoyant des conditions particulières d\’agrément.', en: 'Transfer of shares: free transfer unless otherwise provided by the articles of association, which may stipulate specific approval conditions.' },
      ],
    },
    advantages: [
      { fr: 'Statuts très flexibles et personnalisables', en: 'Very flexible and customizable articles of association' },
      { fr: 'Responsabilité limitée aux apports', en: 'Liability limited to contributions' },
      { fr: 'Attractif pour les investisseurs', en: 'Attractive for investors' },
      { fr: 'Possibilité d\'apports en compte courant', en: 'Possibility of current account contributions' },
      { fr: 'Distribution de dividendes possible', en: 'Dividend distribution possible' },
      { fr: 'Toutes activités autorisées (sauf certaines activités règlementées qui exigent souvent une forme sociale spécifique)', en: 'All activities are permitted (except for certain regulated activities, which often require a specific legal form).' },
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
        description: { fr: 'Nos juristes valident, gèrent le greffe et l\'annonce légale → RCCM.', en: 'Our lawyers validate, manage the court registry and legal notice → RCCM.' },
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
      rows: COMPARISON_ROW_DATA
      // [
      //   { aspect: { fr: 'Nombre d\’Associé', en: 'Number of shareholder' }, values: [{ fr: 'SAS: 2+ | SASU: 1 seul associé', en: 'SAS: 2 or more shareholders\nSASU: 1 single shareholder' }, { fr: '2 à 50 associés', en: '2+' }] },
      //   { aspect: { fr: 'Statuts', en: 'Articles' }, values: [{ fr: 'Highly flexible, with articles of association that can be largely customized', en: 'Highly flexible, with articles of association that can be largely customized' }, { fr: 'Encadré par la loi, moins flexible', en: 'Governed by law, less flexible' }] },
      //   { aspect: { fr: 'Régime Social du Dirigeant', en: 'Social security regime of the executive' }, values: [{ fr: 'Déterminé par la législation nationale (au Cameroun l’affiliation est possible à la CNPS en tant que mandataire social remunéré)', en: 'Determined by national legislation (in Cameroon, affiliation to the CNPS is possible for a remunerated corporate officer)' }, { fr: 'Gérant soumis au régime national ; affiliation à la CNPS selon rémunération et statut', en: 'Manager subject to the national scheme; affiliation to the CNPS depends on remuneration and status' }] },
      //   { aspect: { fr: 'Cession Parts', en: 'Transfer of Shares' }, values: [{ fr: 'Libre par défaut, sauf clause statutaire d’agrément ou restriction', en: 'Free by default, unless restricted or subject to approval by a clause in the articles of association' }, { fr: 'Cession à des tiers soumise à agrément obligatoire des associés', en: 'Transfer to third parties is subject to mandatory approval by the partners/shareholders.' }] },
      //   { aspect: { fr: 'Activités Autorisées', en: 'Permitted Activities' }, values: [{ fr: 'Toute activité commerciale licite, sauf réglementations spécifiques (banque, assurance)', en: 'Any lawful commercial activity, except those subject to specific regulations (e.g. banking, insurance).' }, { fr: 'Toute activité commerciale licite, mais également soumise aux mêmes restrictions sectorielles', en: 'Any lawful commercial activity, but also subject to the same sector-specific restrictions' }] },
      //   { aspect: { fr: 'Capital Minimum', en: 'Activities' }, values: [{ fr: 'Aucun minimum légal', en: 'No legal minimum' }, { fr: 'Libre mais doit être mentionné dans les statuts. (Au cameroun, le minimum conseillé est de 100 000XAF)', en: 'Free, but must be stated in the articles of association. (In Cameroon, the recommended minimum is XAF 100,000.)' }] },
      // ],
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
    heroTitle: { fr: 'Créer une SARL', en: 'Create a SARL' },
    heroSubtitle: { fr: 'Sécurisée et Encadrée', en: 'Secure and Regulated' },
    heroDescription: { fr: 'Protection du patrimoine, cadre légal strict \– Parfait pour les PME stables.', en: 'Asset protection, strict legal framework – Perfect for stable SMEs.' },
    whyCreate: {
      title: { fr: 'Pourquoi créer une SARL ?', en: 'Why Create a SARL?' },
      content: [
        { fr: 'Protection du patrimoine personnel.', en: 'Protection of personal assets.' },
        { fr: 'Cadre juridique sécurisé et structuré.', en: 'Secure and structured legal framework.' },
        { fr: 'Contrôle de l\’entrée des tiers.', en: 'Control over entry of third parties.' },
        { fr: 'Souplesse dans le capital social.', en: 'Flexibility in share capital.' },
        { fr: 'Structure adaptée aux PME.', en: 'Structure suitable for SMEs.' },
        { fr: 'Adaptée à l’évolution.', en: 'Designed to support business growth.' }
      ],
    },
    advantages: [
      { fr: 'Responsabilité limitée aux apports', en: 'Liability limited to contributions' },
      { fr: 'Stabilité du capital social', en: 'Stable share capital' },
      { fr: 'Gérance organisée par la loi', en: 'Management governed by law' },
      { fr: 'Cadre légal rassurant', en: 'Reassuring legal framework' },
      { fr: 'Constitution possible entre membres d\’une même famille', en: 'Can be formed among members of the same family' },
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
        { fr: 'SAS/SASU', en: 'SAS/SASU' },
        { fr: 'SARL', en: 'SARL' },
      ],
      rows: COMPARISON_ROW_DATA
      // [
      //   { aspect: { fr: 'Nombre d\’Associé', en: 'Number of shareholder' }, values: [{ fr: 'SAS: 2+ | SASU: 1 seul associé', en: 'SAS: 2 or more shareholders\nSASU: 1 single shareholder' }, { fr: '2 à 50 associés', en: '2+' }] },
      //   { aspect: { fr: 'Statuts', en: 'Articles' }, values: [{ fr: 'Highly flexible, with articles of association that can be largely customized', en: 'Highly flexible, with articles of association that can be largely customized' }, { fr: 'Encadré par la loi, moins flexible', en: 'Governed by law, less flexible' }] },
      //   { aspect: { fr: 'Régime Social du Dirigeant', en: 'Social security regime of the executive' }, values: [{ fr: 'Déterminé par la législation nationale (au Cameroun l’affiliation est possible à la CNPS en tant que mandataire social remunéré)', en: 'Determined by national legislation (in Cameroon, affiliation to the CNPS is possible for a remunerated corporate officer)' }, { fr: 'Gérant soumis au régime national ; affiliation à la CNPS selon rémunération et statut', en: 'Manager subject to the national scheme; affiliation to the CNPS depends on remuneration and status' }] },
      //   { aspect: { fr: 'Cession Parts', en: 'Transfer of Shares' }, values: [{ fr: 'Libre par défaut, sauf clause statutaire d’agrément ou restriction', en: 'Free by default, unless restricted or subject to approval by a clause in the articles of association' }, { fr: 'Cession à des tiers soumise à agrément obligatoire des associés', en: 'Transfer to third parties is subject to mandatory approval by the partners/shareholders.' }] },
      //   { aspect: { fr: 'Activités Autorisées', en: 'Permitted Activities' }, values: [{ fr: 'Toute activité commerciale licite, sauf réglementations spécifiques (banque, assurance)', en: 'Any lawful commercial activity, except those subject to specific regulations (e.g. banking, insurance).' }, { fr: 'Toute activité commerciale licite, mais également soumise aux mêmes restrictions sectorielles', en: 'Any lawful commercial activity, but also subject to the same sector-specific restrictions' }] },
      //   { aspect: { fr: 'Capital Minimum', en: 'Activities' }, values: [{ fr: 'Aucun minimum légal', en: 'No legal minimum' }, { fr: 'Libre mais doit être mentionné dans les statuts. (Au cameroun, le minimum conseillé est de 100 000XAF)', en: 'Free, but must be stated in the articles of association. (In Cameroon, the recommended minimum is XAF 100,000.)' }] },
      // ],
    },
    faq: [
      {
        question: { fr: 'Quelle différence entre SARL famille et Classique ?', en: 'What is the difference between a family SARL and a classic SARL?' },
        answer: { fr: 'Il n\’existe aucune différence juridique. L\’Acte Uniforme OHADA ne prévoit aucun régime spécial pour les associés liés par le mariage, la filiation ou la parenté', en: 'There is no legal difference. The OHADA Uniform Act does not provide any special regime for shareholders related by marriage or family ties.' },
      },
      {
        question: { fr: 'Peut-on créer une SARL sans activité immédiate ?', en: 'Can you create a SARL without immediate activity?' },
        answer: { fr: 'Oui, il est possible de créer une SARL en attendant de démarrer l\'activité. Cela peut être utile pour sécuriser un nom ou préparer un projet.', en: 'Yes, it is possible to create a SARL while waiting to start the activity. This can be useful to secure a name or prepare a project.' },
      },
      {
        question: { fr: 'Quel est le nombre minimum d\'associés ?', en: 'What is the minimum number of partners?' },
        answer: { fr: 'Une SARL nécessite au minimum 2 associés. Pour un associé unique, optez pour une SARLU.', en: 'A SARL requires at least 2 partners. For a single partner, opt for a SARLU.' },
      },
    ],
  },
  sarlu: {
    slug: 'sarlu',
    heroTitle: { fr: 'Créer une SARLU', en: 'Create a SARLU' },
    heroSubtitle: { fr: 'L\'Entreprise Solo Protégée', en: 'The Protected Solo Business' },
    heroDescription: { fr: 'SARLU = Société à Responsabilité Limitée Unipersonnelle. Encadrée par la loi, idéale pour entrepreneur seul.', en: 'SARLU = Single-Member Limited Liability Company. Regulated by law, ideal for solo entrepreneurs.' },
    whyCreate: {
      title: { fr: 'Pourquoi créer une SARLU ?', en: 'Why Create a SARLU?' },
      content: [
        { fr: 'La SARL et la SARLU obéissent aux mêmes règles. La différence réside uniquement dans le nombre d’associés.', en: 'SARL and SARLU follow the same legal rules. The only difference lies in the number of shareholders.' }
        // { fr: 'Responsabilité aux apports.', en: 'Liability limited to contributions.' },
        // { fr: 'Structure simple et encadrée.', en: 'Simple and well-regulated structure.' },
        // { fr: 'Facilité de création et d’organisation.', en: 'Easy of formation and organization.' },
        // { fr: 'Capital librement fixé.', en: 'Capital freely determined.' },
        // { fr: 'Souplesse pour évoluer.', en: 'Flexibility to evolve.' },
      ],
    },
    advantages: [
      { fr: 'Patrimoine personnel protégé', en: 'Protection of personal assets' },
      { fr: 'Simplicité administrative et juridique', en: 'Administrative and legal simplicity' },
      { fr: 'Structure légale rassurante', en: 'Reassuring legal structure' },
      { fr: 'Evolution possible vers SARL classique', en: 'Possible evolution into a classic SARL' },
    ],
    disadvantages: [
      { fr: 'Cession de parts libre', en: 'Free transfer of shares' },
      { fr: 'Régime social du gérant dépend du droit national (affiliation à la CNPS possible si rémunération au Cameroun.)', en: 'The manager’s social security regime depends on national law (in Cameroon, affiliation to the CNPS is possible if the manager is remunerated)' },
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
      { fr: 'Statuts de la société', en: 'Articles of association' },
      { fr: 'Attestation de dépôt du capital', en: 'Certificate of capital deposit' },
      { fr: 'Justificatif du siège social', en: 'Proof of registered office address' },
      { fr: 'Publication d\’un avis de constitution dans un journal d\’annonces légales', en: 'Publication of a notice of incorporation in a legal announcements journal' }
    ],
    faq: [
      {
        question: { fr: 'Quelle différence entre SARLU et SASU ?', en: 'What is the difference between SARLU and SASU?' },
        answer: { fr: 'La principale différence réside dans la flexibilité et l\’organisation statutaire. La SASU est beaucoup plus modulable que la SARLU qui reste encadrée par la loi.', en: 'The main difference lies in flexibility and statutory organization. The SASU is far more adaptable, whereas the SARLU remains more strictly governed by law.' },
      },
      {
        question: { fr: 'Peut-on passer de SARLU à SARL ?', en: 'Can you switch from SARLU to SARL?' },
        answer: { fr: 'Oui, en ajoutant un ou plusieurs associés, votre SARLU devient automatiquement une SARL. Les statuts devront être mis à jour.', en: 'Yes, by adding one or more partners, your SARLU automatically becomes a SARL. The articles will need to be updated.' },
      },
      {
        question: { fr: 'Quel régime fiscal pour une SARLU ?', en: 'What tax regime for a SARLU?' },
        answer: { fr: 'Au Cameroun, la SARLU est généralement soumise à l\’impôt sur les sociétés (IS); les dividendes sont soumis à retenue à la source; TVA et autres taxes applicables selon l\’activité exercée.', en: 'In Cameroon, SARLU is generally subject to corporate income tax (CIT). Dividends are subject to withholding tax, as well as VAT and other activity-related taxes.' },
      },
    ],
  },
  association: {
    slug: 'association',
    heroTitle: { fr: 'Créer une Association', en: 'Create an Association' },
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
        { fr: 'Seules les associations reconnues d\’utilité publique par décret peuvent bénéficier de certains dons, legs et subventions.', en: 'Only associations recognized as being of public utility by decree may benefit from certain donations, bequests, and subsidies.' }
      ],
    },
    advantages: [
      { fr: 'Création simple et rapide', en: 'Simple and fast creation' },
      { fr: 'Pas de capital requis', en: 'No capital required' },
      { fr: 'Publication JOAFE gratuite', en: 'Free JOAFE publication' },
      { fr: 'Peut recevoir des dons', en: 'Can receive donations' },
      { fr: 'Peut employer des salariés', en: 'Can hire employees' },
      { fr: 'Exonérations fiscales possibles', en: 'Possible tax exemptions' },
      { fr: 'Accès à la personnalité juridique', en: 'Access to legal personality' }
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
        description: { fr: 'Déposez le dossier → Silence vaut acceptation.', en: 'Submit the file → Silence implies acceptance.' },
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
  description: { fr: 'SASU, SAS, SARL, SARLU, SCI, Établissement commercial... +15 000 entrepreneurs accompagnés depuis 8 ans par des juristes basés au Cameroun.', en: 'SASU, SAS, SARL, SARLU, SCI, Commercial establishment... 15,000+ entrepreneurs supported for 8 years by lawyers based in Cameroon.' },
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
    title: { fr: 'Créer une SARLU', en: 'Create a SARLU' },
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

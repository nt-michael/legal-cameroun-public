// Gestion d'Entreprise Section Data
// Types and content for modification des statuts, transfert siege, transformations, dissolution

import { BilingualText } from '@/lib/translations';

export interface GestionPricingTier {
  name: BilingualText;
  price: string;
  priceNote?: BilingualText;
  pricePrefix?: BilingualText;
  description: BilingualText;
  features: BilingualText[];
  highlighted?: boolean;
  ctaText: BilingualText;
  ctaHref: string;
}

export interface GestionStep {
  number: string;
  title: BilingualText;
  description: BilingualText;
}

export interface GestionFAQItem {
  question: BilingualText;
  answer: BilingualText;
}

export interface GestionDocument {
  name: BilingualText;
  description?: BilingualText;
  required?: boolean;
}

export interface ModificationType {
  id: string;
  name: BilingualText;
  description: BilingualText;
  icon: string;
  href: string;
}

export interface SocieteType {
  id: string;
  name: BilingualText;
  flexibility: BilingualText;
  decisionProcess: BilingualText;
  majorityRequired: BilingualText;
  specificNotes: BilingualText[];
}

// ============================================
// HUB PAGE DATA - Gestion d'Entreprise
// ============================================

export const hubHeroData = {
  badge: { fr: 'Modification des Statuts', en: 'Articles of Association Amendment' },
  title: { fr: 'Modifiez Vos Statuts Sans Stress ni Surprises', en: 'Amend Your Articles of Association Without Stress or Surprises' },
  subtitle: { fr: 'Changement de siège, objet social, capital, transformation de forme (SAS \u2194 SARL), dissolution... tout devient simple et sécurisé.', en: 'Registered office change, corporate purpose, share capital, legal form conversion (SAS \u2194 SARL), dissolution... everything becomes simple and secure.' },
  features: [
    { fr: 'Questionnaire en ligne', en: 'Online questionnaire' },
    { fr: 'Juristes valident', en: 'Lawyers validate' },
    { fr: 'Greffe en 24-48h', en: 'Court registry in 24-48h' },
  ],
  stats: [
    { value: '15 000+', label: { fr: 'entrepreneurs accompagnés', en: 'entrepreneurs supported' } },
    { value: '8 ans', label: { fr: 'd\'expérience', en: 'of experience' } },
    { value: '100%', label: { fr: 'Experts locaux', en: 'Local experts' } },
  ],
};

export const whyModifyReasons = [
  { icon: 'location', title: { fr: 'Changer l\'adresse', en: 'Change address' }, description: { fr: 'Modifier le siège social de votre entreprise', en: 'Change your company\'s registered office' } },
  { icon: 'document', title: { fr: 'Modifier l\'objet social', en: 'Modify corporate purpose' }, description: { fr: 'Adapter votre activité ou dénomination', en: 'Adapt your business activity or name' } },
  { icon: 'money', title: { fr: 'Capital social', en: 'Share capital' }, description: { fr: 'Augmenter ou réduire le capital', en: 'Increase or reduce the share capital' } },
  { icon: 'transform', title: { fr: 'Transformer la forme', en: 'Convert legal form' }, description: { fr: 'SAS en SARL ou inversement', en: 'SAS to SARL or vice versa' } },
  { icon: 'user', title: { fr: 'Commissaire aux comptes', en: 'Statutory auditor' }, description: { fr: 'Nommer un CAC si nécessaire', en: 'Appoint an auditor if required' } },
  { icon: 'calendar', title: { fr: 'Date de clôture', en: 'Closing date' }, description: { fr: 'Changer la date de fin d\'exercice', en: 'Change the financial year-end date' } },
];

export const hubProcessSteps: GestionStep[] = [
  {
    number: '01',
    title: { fr: 'Questionnaire rapide', en: 'Quick questionnaire' },
    description: { fr: 'Répondez à quelques questions sur votre modification souhaitée.', en: 'Answer a few questions about your desired amendment.' },
  },
  {
    number: '02',
    title: { fr: 'Dossier complet', en: 'Complete file' },
    description: { fr: 'Accédez à votre dossier (PV, statuts mis à jour). Signez en ligne et transmettez les pièces.', en: 'Access your file (minutes, updated articles). Sign online and submit the documents.' },
  },
  {
    number: '03',
    title: { fr: 'Validation juristes', en: 'Lawyer validation' },
    description: { fr: 'Nos experts vérifient votre dossier et répondent à vos questions.', en: 'Our experts review your file and answer your questions.' },
  },
  {
    number: '04',
    title: { fr: 'Formalités gérées', en: 'Formalities handled' },
    description: { fr: 'Annonce légale, échanges greffe, enregistrement (1 mois max).', en: 'Legal notice, court registry exchanges, registration (1 month max).' },
  },
  {
    number: '05',
    title: { fr: 'Accompagnement A à Z', en: 'A to Z support' },
    description: { fr: 'Assistance 30 jours (Premium), statuts Word éditables.', en: '30-day assistance (Premium), editable Word articles.' },
  },
];

export const societeTypes: SocieteType[] = [
  {
    id: 'sas',
    name: { fr: 'SAS / SASU', en: 'SAS / SASU' },
    flexibility: { fr: 'Très flexible', en: 'Very flexible' },
    decisionProcess: { fr: 'Statuts définissent quorum, majorité, organe compétent', en: 'Articles define quorum, majority, competent body' },
    majorityRequired: { fr: 'Variable selon statuts', en: 'Varies according to articles' },
    specificNotes: [
      { fr: 'Grande liberté statutaire', en: 'Great statutory freedom' },
      { fr: 'Changements majeurs nécessitent formalités', en: 'Major changes require formalities' },
      { fr: 'Idéal pour évolutions fréquentes', en: 'Ideal for frequent changes' },
    ],
  },
  {
    id: 'sarl',
    name: { fr: 'SARL', en: 'SARL' },
    flexibility: { fr: 'Encadrée par la loi', en: 'Regulated by law' },
    decisionProcess: { fr: 'Majorités fixées par le Code de commerce', en: 'Majorities set by the Commercial Code' },
    majorityRequired: { fr: '2/3 des parts (associés détenant au moins 2/3)', en: '2/3 of shares (partners holding at least 2/3)' },
    specificNotes: [
      { fr: 'Avant 2005 : 3/4 des parts requises', en: 'Before 2005: 3/4 of shares required' },
      { fr: 'Après 2005 : 2/3 des parts', en: 'After 2005: 2/3 of shares' },
      { fr: 'Protection des minoritaires', en: 'Minority shareholder protection' },
    ],
  },
  {
    id: 'sci',
    name: { fr: 'SCI', en: 'SCI' },
    flexibility: { fr: 'Variable selon statuts', en: 'Varies according to articles' },
    decisionProcess: { fr: 'AGE pour décisions importantes', en: 'EGM for important decisions' },
    majorityRequired: { fr: 'Souvent unanimité (sauf statuts contraires)', en: 'Often unanimity (unless articles state otherwise)' },
    specificNotes: [
      { fr: 'Unanimité par défaut', en: 'Unanimity by default' },
      { fr: 'Statuts peuvent prévoir majorité', en: 'Articles may provide for majority' },
      { fr: 'Attention aux clauses d\'agrément', en: 'Watch out for approval clauses' },
    ],
  },
];

export const hubPricingTiers: GestionPricingTier[] = [
  {
    name: { fr: 'Starter', en: 'Starter' },
    price: '150 000',
    priceNote: { fr: 'XAF HT + frais admin', en: 'XAF excl. tax + admin fees' },
    pricePrefix: { fr: 'À partir de', en: 'Starting from' },
    description: { fr: 'Pour les modifications simples', en: 'For simple amendments' },
    features: [
      { fr: 'PV de modification', en: 'Amendment minutes' },
      { fr: 'Dossier complet', en: 'Complete file' },
      { fr: 'Guide des démarches', en: 'Procedure guide' },
      { fr: 'Support par email', en: 'Email support' },
    ],
    ctaText: { fr: 'Choisir Starter', en: 'Choose Starter' },
    ctaHref: '/devis?service=modification&plan=starter',
  },
  {
    name: { fr: 'Standard', en: 'Standard' },
    price: '250 000',
    priceNote: { fr: 'XAF HT + frais admin', en: 'XAF excl. tax + admin fees' },
    pricePrefix: { fr: 'À partir de', en: 'Starting from' },
    description: { fr: 'La solution complète', en: 'The complete solution' },
    features: [
      { fr: 'Tout Starter inclus', en: 'Everything in Starter included' },
      { fr: 'Validation complète du dossier', en: 'Full file validation' },
      { fr: 'Enregistrement au greffe', en: 'Court registry registration' },
      { fr: 'Suivi personnalisé', en: 'Personalized follow-up' },
    ],
    ctaText: { fr: 'Choisir Standard', en: 'Choose Standard' },
    ctaHref: '/devis?service=modification&plan=standard',
  },
  {
    name: { fr: 'Premium', en: 'Premium' },
    price: '350 000',
    priceNote: { fr: 'XAF HT + frais admin', en: 'XAF excl. tax + admin fees' },
    pricePrefix: { fr: 'À partir de', en: 'Starting from' },
    description: { fr: 'Service prioritaire complet', en: 'Complete priority service' },
    features: [
      { fr: 'Tout Standard inclus', en: 'Everything in Standard included' },
      { fr: 'Traitement en 48h', en: 'Processing in 48h' },
      { fr: 'Assurance anti-rejet', en: 'Rejection insurance' },
      { fr: 'Statuts Word éditables', en: 'Editable Word articles' },
      { fr: 'Assistance 30 jours', en: '30-day assistance' },
    ],
    highlighted: true,
    ctaText: { fr: 'Choisir Premium', en: 'Choose Premium' },
    ctaHref: '/devis?service=modification&plan=premium',
  },
];

export const hubDocuments: GestionDocument[] = [
  { name: { fr: 'PV de décision (AGE)', en: 'Decision minutes (EGM)' }, description: { fr: 'Procès-verbal de l\'assemblée générale extraordinaire', en: 'Minutes of the extraordinary general meeting' }, required: true },
  { name: { fr: 'Statuts mis à jour', en: 'Updated articles' }, description: { fr: 'Signés et certifiés conformes', en: 'Signed and certified as true copies' }, required: true },
  { name: { fr: 'Attestation annonce légale', en: 'Legal notice certificate' }, description: { fr: 'Preuve de publication dans un JAL', en: 'Proof of publication in a legal gazette' }, required: true },
  { name: { fr: 'Chèque frais greffe', en: 'Registry fee check' }, description: { fr: 'Règlement des frais d\'enregistrement', en: 'Payment of registration fees' }, required: true },
  { name: { fr: 'Rapport commissaire', en: 'Auditor\'s report' }, description: { fr: 'Pour transformations uniquement', en: 'For conversions only' }, required: false },
];

export const hubFAQ: GestionFAQItem[] = [
  {
    question: { fr: 'Combien coûte une modification de statuts ?', en: 'How much does an articles amendment cost?' },
    answer: { fr: 'Le coût varie selon le type de modification. Par exemple, un transfert de siège inter-départements nécessite 2 annonces légales, donc un coût plus élevé. Nos forfaits commencent à 150 000 XAF HT.', en: 'The cost varies depending on the type of amendment. For example, an inter-departmental registered office transfer requires 2 legal notices, thus a higher cost. Our packages start at 150,000 XAF excl. tax.' },
  },
  {
    question: { fr: 'Quel est le délai pour une modification ?', en: 'What is the timeframe for an amendment?' },
    answer: { fr: 'Le délai standard est de 1 mois maximum pour l\'enregistrement au greffe. Avec notre forfait Premium, le traitement est effectué en 24-48h.', en: 'The standard timeframe is a maximum of 1 month for court registry registration. With our Premium package, processing is completed in 24-48h.' },
  },
  {
    question: { fr: 'Quelles sont les conditions selon la forme juridique ?', en: 'What are the conditions depending on the legal form?' },
    answer: { fr: 'Les conditions varient : la SAS offre une grande liberté statutaire, tandis que la SARL est plus encadrée par la loi avec des majorités fixes. Nous vous guidons selon votre situation.', en: 'The conditions vary: the SAS offers great statutory freedom, while the SARL is more regulated by law with fixed majorities. We guide you based on your situation.' },
  },
  {
    question: { fr: 'Puis-je modifier plusieurs éléments en même temps ?', en: 'Can I amend several elements at the same time?' },
    answer: { fr: 'Oui, vous pouvez regrouper plusieurs modifications dans une même procédure (ex: siège + capital), ce qui optimise les coûts et délais.', en: 'Yes, you can combine several amendments in a single procedure (e.g., registered office + share capital), which optimizes costs and timelines.' },
  },
];

export const modificationTypes: ModificationType[] = [
  {
    id: 'transfert-siege',
    name: { fr: 'Transfert de Siège Social', en: 'Registered Office Transfer' },
    description: { fr: 'Changez l\'adresse de votre entreprise facilement', en: 'Change your company\'s address easily' },
    icon: 'location',
    href: '/modification-entreprise/transfert-siege',
  },
  {
    id: 'sas-vers-sarl',
    name: { fr: 'Transformation SAS en SARL', en: 'SAS to SARL Conversion' },
    description: { fr: 'Passez à un cadre plus structuré', en: 'Switch to a more structured framework' },
    icon: 'transform',
    href: '/modification-entreprise/sas-vers-sarl',
  },
  {
    id: 'sarl-vers-sas',
    name: { fr: 'Transformation SARL en SAS', en: 'SARL to SAS Conversion' },
    description: { fr: 'Gagnez en flexibilité et souplesse', en: 'Gain flexibility and agility' },
    icon: 'transform',
    href: '/modification-entreprise/sarl-vers-sas',
  },
  {
    id: 'dissolution',
    name: { fr: 'Dissolution d\'Entreprise', en: 'Company Dissolution' },
    description: { fr: 'Clôturez votre société proprement', en: 'Close your company properly' },
    icon: 'close',
    href: '/modification-entreprise/dissolution',
  },
];

// ============================================
// TRANSFERT SIEGE SOCIAL DATA
// ============================================

export const transfertSiegeData = {
  hero: {
    badge: { fr: 'Transfert de Siège', en: 'Office Transfer' },
    title: { fr: 'Changez le Siège Social de Votre Entreprise Facilement', en: 'Change Your Company\'s Registered Office Easily' },
    subtitle: { fr: 'Bénéficiez d\'aides locales, bail expiré, local plus grand ou moins cher... Nous rendons le transfert simple, sûr et rapide.', en: 'Benefit from local incentives, expired lease, larger or cheaper premises... We make the transfer simple, safe, and fast.' },
  },
  whyTransfer: [
    { icon: 'gift', title: { fr: 'Aides géographiques', en: 'Geographic incentives' }, description: { fr: 'Bénéficiez d\'aides spécifiques à certaines zones', en: 'Benefit from incentives specific to certain areas' } },
    { icon: 'document', title: { fr: 'Fin de bail', en: 'Lease expiry' }, description: { fr: 'Votre bail commercial arrive à expiration', en: 'Your commercial lease is expiring' } },
    { icon: 'home', title: { fr: 'Domiciliation dirigeant', en: 'Director\'s domiciliation' }, description: { fr: 'Changement d\'adresse du dirigeant', en: 'Change of director\'s address' } },
    { icon: 'money', title: { fr: 'Local plus adapté', en: 'More suitable premises' }, description: { fr: 'Trouvez un local plus grand ou économique', en: 'Find larger or more cost-effective premises' } },
  ],
  processSteps: [
    { number: '01', title: { fr: 'Décision de l\'organe compétent', en: 'Decision by the competent body' }, description: { fr: 'PV de l\'AGE actant le changement de siège', en: 'EGM minutes recording the office change' } },
    { number: '02', title: { fr: 'Mise à jour des statuts', en: 'Update the articles' }, description: { fr: 'Nouvelle adresse, clause signée "certifiés conformes"', en: 'New address, clause signed "certified true copies"' } },
    { number: '03', title: { fr: 'Publication annonce légale', en: 'Legal notice publication' }, description: { fr: 'Dans un JAL (1 mois max après décision)', en: 'In a legal gazette (1 month max after decision)' } },
    { number: '04', title: { fr: 'Dépôt au greffe', en: 'Filing with the court registry' }, description: { fr: 'Dossier complet en ligne', en: 'Complete file online' } },
  ],
  casTypes: [
    {
      id: 'meme-departement',
      title: { fr: 'Même Département', en: 'Same Department' },
      description: { fr: '1 seule annonce légale requise', en: 'Only 1 legal notice required' },
      cost: { fr: 'Coût standard', en: 'Standard cost' },
      highlight: false,
    },
    {
      id: 'different-departement',
      title: { fr: 'Département Différent', en: 'Different Department' },
      description: { fr: '2 annonces légales (départ + arrivée)', en: '2 legal notices (departure + arrival)' },
      cost: { fr: 'Coût plus élevé', en: 'Higher cost' },
      highlight: true,
    },
  ],
  documents: [
    { name: { fr: 'PV changement de siège', en: 'Office change minutes' }, required: true },
    { name: { fr: 'Statuts mis à jour signés', en: 'Signed updated articles' }, required: true },
    { name: { fr: 'Attestation parution JAL', en: 'Legal gazette publication certificate' }, required: true },
    { name: { fr: 'Justificatif nouveau siège', en: 'New registered office proof' }, required: true },
  ],
  pricingTiers: [
    {
      name: { fr: 'Starter', en: 'Starter' },
      price: '150 000',
      pricePrefix: { fr: 'À partir de', en: 'Starting from' },
      priceNote: { fr: 'XAF HT', en: 'XAF excl. tax' },
      description: { fr: 'Transfert simple', en: 'Simple transfer' },
      features: [
        { fr: 'PV de transfert', en: 'Transfer minutes' },
        { fr: 'Dossier complet', en: 'Complete file' },
        { fr: 'Guide des démarches', en: 'Procedure guide' },
      ],
      ctaText: { fr: 'Choisir Starter', en: 'Choose Starter' },
      ctaHref: '/devis?service=transfert-siege&plan=starter',
    },
    {
      name: { fr: 'Standard', en: 'Standard' },
      price: '200 000',
      pricePrefix: { fr: 'À partir de', en: 'Starting from' },
      priceNote: { fr: 'XAF HT', en: 'XAF excl. tax' },
      description: { fr: 'Transfert accompagné', en: 'Supported transfer' },
      features: [
        { fr: 'Tout Starter inclus', en: 'Everything in Starter included' },
        { fr: 'Validation dossier', en: 'File validation' },
        { fr: 'Dépôt greffe', en: 'Court registry filing' },
        { fr: 'Suivi personnalisé', en: 'Personalized follow-up' },
      ],
      ctaText: { fr: 'Choisir Standard', en: 'Choose Standard' },
      ctaHref: '/devis?service=transfert-siege&plan=standard',
    },
    {
      name: { fr: 'Premium', en: 'Premium' },
      price: '250 000',
      pricePrefix: { fr: 'À partir de', en: 'Starting from' },
      priceNote: { fr: 'XAF HT', en: 'XAF excl. tax' },
      description: { fr: 'Service prioritaire', en: 'Priority service' },
      features: [
        { fr: 'Tout Standard inclus', en: 'Everything in Standard included' },
        { fr: 'Traitement 48h', en: '48h processing' },
        { fr: 'Assurance anti-rejet', en: 'Rejection insurance' },
        { fr: 'Statuts Word', en: 'Word articles' },
        { fr: 'Assistance 30j', en: '30-day assistance' },
      ],
      highlighted: true,
      ctaText: { fr: 'Choisir Premium', en: 'Choose Premium' },
      ctaHref: '/devis?service=transfert-siege&plan=premium',
    },
  ],
  faq: [
    {
      question: { fr: 'Quel impact si le transfert est inter-départements ?', en: 'What is the impact if the transfer is between departments?' },
      answer: { fr: 'Un transfert vers un autre département nécessite deux annonces légales (une dans le département de départ, une dans celui d\'arrivée), ce qui augmente les coûts.', en: 'A transfer to another department requires two legal notices (one in the departure department, one in the arrival department), which increases costs.' },
    },
    {
      question: { fr: 'Le siège peut-il être chez le dirigeant ?', en: 'Can the registered office be at the director\'s home?' },
      answer: { fr: 'Oui, le siège peut être domicilié chez le dirigeant. Si celui-ci change d\'adresse personnelle, une mise à jour des statuts sera nécessaire.', en: 'Yes, the registered office can be domiciled at the director\'s home. If they change their personal address, an update of the articles will be necessary.' },
    },
    {
      question: { fr: 'Quel délai pour un transfert de siège ?', en: 'What is the timeframe for an office transfer?' },
      answer: { fr: 'Comptez environ 2-4 semaines pour un transfert standard. Avec notre forfait Premium, le dossier est traité en 48h.', en: 'Allow approximately 2-4 weeks for a standard transfer. With our Premium package, the file is processed in 48h.' },
    },
  ],
};

// ============================================
// TRANSFORMATION SAS EN SARL DATA
// ============================================

export const sasVersSarlData = {
  hero: {
    badge: { fr: 'Transformation SAS \u2192 SARL', en: 'SAS \u2192 SARL Conversion' },
    title: { fr: 'Transformez Votre SAS en SARL', en: 'Convert Your SAS into an SARL' },
    subtitle: { fr: 'Passez à un cadre plus structuré avec une protection sociale adaptée, sans créer de nouvelle société.', en: 'Switch to a more structured framework with adapted social protection, without creating a new company.' },
  },
  advantages: [
    { icon: 'shield', title: { fr: 'Cadre plus structuré', en: 'More structured framework' }, description: { fr: 'Règles de fonctionnement plus encadrées par la loi', en: 'Operating rules more regulated by law' } },
    { icon: 'user', title: { fr: 'Protection sociale', en: 'Social protection' }, description: { fr: 'Régime TNS possible selon votre situation', en: 'Self-employed scheme possible depending on your situation' } },
    { icon: 'lock', title: { fr: 'Responsabilité limitée', en: 'Limited liability' }, description: { fr: 'Maintien de la responsabilité limitée aux apports', en: 'Maintaining liability limited to contributions' } },
    { icon: 'document', title: { fr: 'Continuité juridique', en: 'Legal continuity' }, description: { fr: 'Contrats et baux inchangés, pas de nouvelle entité', en: 'Contracts and leases unchanged, no new entity' } },
  ],
  processSteps: [
    { number: '01', title: { fr: 'AGE des associés', en: 'Partners\' EGM' }, description: { fr: 'Décision collective avec procès-verbal', en: 'Collective decision with minutes' } },
    { number: '02', title: { fr: 'Commissaire à la transformation', en: 'Transformation auditor' }, description: { fr: 'Valorisation des biens, vérification capitaux propres \u2265 capital', en: 'Asset valuation, verification that equity \u2265 share capital' } },
    { number: '03', title: { fr: 'Annonce légale', en: 'Legal notice' }, description: { fr: 'Publication dans un journal d\'annonces légales', en: 'Publication in a legal gazette' } },
    { number: '04', title: { fr: 'Dépôt au greffe', en: 'Filing with the court registry' }, description: { fr: 'Inscription modificative au RCCM', en: 'Amendment registration at the RCCM' } },
  ],
  documents: [
    { name: { fr: 'Nouveaux statuts SARL', en: 'New SARL articles' }, required: true },
    { name: { fr: 'PV d\'AGE de transformation', en: 'Transformation EGM minutes' }, required: true },
    { name: { fr: 'Rapport du commissaire', en: 'Auditor\'s report' }, required: true },
    { name: { fr: 'Attestation annonce légale', en: 'Legal notice certificate' }, required: true },
    { name: { fr: 'Pièces justificatives', en: 'Supporting documents' }, required: true },
  ],
  pricingTiers: [
    {
      name: { fr: 'Standard', en: 'Standard' },
      price: '200 000',
      pricePrefix: { fr: 'À partir de', en: 'Starting from' },
      priceNote: { fr: 'XAF HT', en: 'XAF excl. tax' },
      description: { fr: 'Transformation accompagnée', en: 'Supported conversion' },
      features: [
        { fr: 'Nouveaux statuts', en: 'New articles' },
        { fr: 'PV de transformation', en: 'Conversion minutes' },
        { fr: 'Dépôt greffe', en: 'Court registry filing' },
        { fr: 'Suivi personnalisé', en: 'Personalized follow-up' },
      ],
      ctaText: { fr: 'Choisir Standard', en: 'Choose Standard' },
      ctaHref: '/devis?service=sas-sarl&plan=standard',
    },
    {
      name: { fr: 'Premium', en: 'Premium' },
      price: '250 000',
      pricePrefix: { fr: 'À partir de', en: 'Starting from' },
      priceNote: { fr: 'XAF HT', en: 'XAF excl. tax' },
      description: { fr: 'Service prioritaire', en: 'Priority service' },
      features: [
        { fr: 'Tout Standard inclus', en: 'Everything in Standard included' },
        { fr: 'Traitement 48h', en: '48h processing' },
        { fr: 'Assurance anti-rejet', en: 'Rejection insurance' },
        { fr: 'Statuts Word', en: 'Word articles' },
        { fr: 'Assistance 30j', en: '30-day assistance' },
      ],
      highlighted: true,
      ctaText: { fr: 'Choisir Premium', en: 'Choose Premium' },
      ctaHref: '/devis?service=sas-sarl&plan=premium',
    },
  ],
  faq: [
    {
      question: { fr: 'Le capital est-il modifié lors de la transformation ?', en: 'Is the share capital modified during the conversion?' },
      answer: { fr: 'Non, le capital social reste inchangé lors de la transformation. Seule la forme juridique change.', en: 'No, the share capital remains unchanged during the conversion. Only the legal form changes.' },
    },
    {
      question: { fr: 'Les contrats et créanciers sont-ils impactés ?', en: 'Are contracts and creditors affected?' },
      answer: { fr: 'Non, la transformation n\'affecte pas les contrats en cours ni les relations avec les créanciers. La société conserve son identité juridique.', en: 'No, the conversion does not affect existing contracts or relationships with creditors. The company retains its legal identity.' },
    },
    {
      question: { fr: 'Quelles sont les majorités requises ?', en: 'What majorities are required?' },
      answer: { fr: 'La transformation nécessite généralement l\'unanimité ou une majorité qualifiée selon les statuts de la SAS.', en: 'The conversion generally requires unanimity or a qualified majority according to the SAS articles.' },
    },
  ],
};

// ============================================
// TRANSFORMATION SARL EN SAS DATA
// ============================================

export const sarlVersSasData = {
  hero: {
    badge: { fr: 'Transformation SARL \u2192 SAS', en: 'SARL \u2192 SAS Conversion' },
    title: { fr: 'Transformez Votre SARL en SAS', en: 'Convert Your SARL into an SAS' },
    subtitle: { fr: 'Gagnez en flexibilité et souplesse pour ouvrir à des investisseurs et faciliter les cessions.', en: 'Gain flexibility and agility to welcome investors and facilitate share transfers.' },
  },
  advantages: [
    { icon: 'freedom', title: { fr: 'Statuts très flexibles', en: 'Very flexible articles' }, description: { fr: 'Liberté d\'organisation vs SARL encadrée', en: 'Freedom of organization vs. regulated SARL' } },
    { icon: 'transfer', title: { fr: 'Cessions facilitées', en: 'Facilitated transfers' }, description: { fr: 'Cession de parts sans agrément (sauf statuts)', en: 'Share transfers without approval (unless articles state otherwise)' } },
    { icon: 'user', title: { fr: 'Régime social dirigeant', en: 'Director\'s social scheme' }, description: { fr: 'Président assimilé salarié', en: 'President treated as employee' } },
    { icon: 'check', title: { fr: 'Préférable à dissolution', en: 'Preferable to dissolution' }, description: { fr: 'Évitez de créer une nouvelle société', en: 'Avoid creating a new company' } },
  ],
  processSteps: [
    { number: '01', title: { fr: 'AGE des associés', en: 'Partners\' EGM' }, description: { fr: 'Décision à l\'unanimité ou majorité selon statuts', en: 'Decision by unanimity or majority according to articles' } },
    { number: '02', title: { fr: 'Commissaire à la transformation', en: 'Transformation auditor' }, description: { fr: 'Rapport sur la situation de la société', en: 'Report on the company\'s situation' } },
    { number: '03', title: { fr: 'Annonce légale', en: 'Legal notice' }, description: { fr: 'Publication de la transformation', en: 'Publication of the conversion' } },
    { number: '04', title: { fr: 'Dépôt au greffe', en: 'Filing with the court registry' }, description: { fr: 'Inscription modificative au RCCM', en: 'Amendment registration at the RCCM' } },
  ],
  documents: [
    { name: { fr: 'Nouveaux statuts SAS', en: 'New SAS articles' }, required: true },
    { name: { fr: 'PV d\'AGE de transformation', en: 'Transformation EGM minutes' }, required: true },
    { name: { fr: 'Rapport du commissaire', en: 'Auditor\'s report' }, required: true },
    { name: { fr: 'Attestation annonce légale', en: 'Legal notice certificate' }, required: true },
    { name: { fr: 'Pièces justificatives', en: 'Supporting documents' }, required: true },
  ],
  pricingTiers: [
    {
      name: { fr: 'Standard', en: 'Standard' },
      price: '200 000',
      pricePrefix: { fr: 'À partir de', en: 'Starting from' },
      priceNote: { fr: 'XAF HT', en: 'XAF excl. tax' },
      description: { fr: 'Transformation accompagnée', en: 'Supported conversion' },
      features: [
        { fr: 'Nouveaux statuts', en: 'New articles' },
        { fr: 'PV de transformation', en: 'Conversion minutes' },
        { fr: 'Dépôt greffe', en: 'Court registry filing' },
        { fr: 'Suivi personnalisé', en: 'Personalized follow-up' },
      ],
      ctaText: { fr: 'Choisir Standard', en: 'Choose Standard' },
      ctaHref: '/devis?service=sarl-sas&plan=standard',
    },
    {
      name: { fr: 'Premium', en: 'Premium' },
      price: '250 000',
      pricePrefix: { fr: 'À partir de', en: 'Starting from' },
      priceNote: { fr: 'XAF HT', en: 'XAF excl. tax' },
      description: { fr: 'Service prioritaire', en: 'Priority service' },
      features: [
        { fr: 'Tout Standard inclus', en: 'Everything in Standard included' },
        { fr: 'Traitement 48h', en: '48h processing' },
        { fr: 'Assurance anti-rejet', en: 'Rejection insurance' },
        { fr: 'Statuts Word', en: 'Word articles' },
        { fr: 'Assistance 30j', en: '30-day assistance' },
      ],
      highlighted: true,
      ctaText: { fr: 'Choisir Premium', en: 'Choose Premium' },
      ctaHref: '/devis?service=sarl-sas&plan=premium',
    },
  ],
  faq: [
    {
      question: { fr: 'Quelle majorité est requise pour transformer une SARL en SAS ?', en: 'What majority is required to convert an SARL into an SAS?' },
      answer: { fr: 'La transformation nécessite généralement l\'unanimité des associés, sauf disposition contraire dans les statuts.', en: 'The conversion generally requires the unanimity of the partners, unless the articles state otherwise.' },
    },
    {
      question: { fr: 'La transformation impacte-t-elle les contrats en cours ?', en: 'Does the conversion affect existing contracts?' },
      answer: { fr: 'Non, tous les contrats, baux et engagements restent valides. La société conserve son numéro RCCM.', en: 'No, all contracts, leases, and commitments remain valid. The company retains its RCCM number.' },
    },
    {
      question: { fr: 'Pourquoi préférer la transformation à la dissolution ?', en: 'Why prefer conversion over dissolution?' },
      answer: { fr: 'La transformation évite la création d\'une nouvelle entité, préserve l\'ancienneté et évite les formalités de dissolution/création.', en: 'Conversion avoids creating a new entity, preserves seniority, and avoids dissolution/creation formalities.' },
    },
  ],
};

// ============================================
// DISSOLUTION D'ENTREPRISE DATA
// ============================================

export const dissolutionData = {
  hero: {
    badge: { fr: 'Dissolution & Liquidation', en: 'Dissolution & Liquidation' },
    title: { fr: 'Clôturez Votre Société Proprement et Rapidement', en: 'Close Your Company Properly and Quickly' },
    subtitle: { fr: 'Dissolution + liquidation amiable guidée : zéro dettes impayées, conformité totale.', en: 'Guided dissolution + amicable liquidation: zero unpaid debts, total compliance.' },
  },
  whyDissolve: [
    { title: { fr: 'Cessation définitive', en: 'Permanent cessation' }, description: { fr: 'Vous souhaitez arrêter définitivement votre activité', en: 'You wish to permanently cease your business activity' } },
    { title: { fr: 'Projet terminé', en: 'Project completed' }, description: { fr: 'L\'objet social de la société est accompli', en: 'The company\'s corporate purpose has been fulfilled' } },
    { title: { fr: 'Mésentente entre associés', en: 'Partner disagreements' }, description: { fr: 'Désaccords insurmontables entre les parties', en: 'Irreconcilable disagreements between the parties' } },
    { title: { fr: 'Difficultés économiques', en: 'Economic difficulties' }, description: { fr: 'Activité non rentable sans perspectives', en: 'Unprofitable business with no prospects' } },
  ],
  alternatives: [
    {
      type: { fr: 'Dissolution', en: 'Dissolution' },
      description: { fr: 'Cessation définitive et radiation du RCS', en: 'Permanent cessation and removal from the trade register' },
      permanent: true,
    },
    {
      type: { fr: 'Mise en Sommeil', en: 'Dormancy' },
      description: { fr: 'Suspension temporaire (2 ans max), obligations allégées', en: 'Temporary suspension (2 years max), reduced obligations' },
      permanent: false,
    },
  ],
  processPhases: [
    {
      phase: { fr: 'Phase 1 : Dissolution', en: 'Phase 1: Dissolution' },
      steps: [
        { number: '01', title: { fr: 'Décision des associés', en: 'Partners\' decision' }, description: { fr: 'AGE et procès-verbal de dissolution', en: 'EGM and dissolution minutes' } },
        { number: '02', title: { fr: 'Nomination du liquidateur', en: 'Appointment of liquidator' }, description: { fr: 'Dirigeant, associé ou tiers désigné', en: 'Director, partner, or designated third party' } },
        { number: '03', title: { fr: 'Publication annonce légale', en: 'Legal notice publication' }, description: { fr: 'Avis de dissolution dans un JAL', en: 'Dissolution notice in a legal gazette' } },
        { number: '04', title: { fr: 'Inscription au greffe', en: 'Court registry registration' }, description: { fr: 'Mention "société en liquidation"', en: '"Company in liquidation" mention' } },
      ],
    },
    {
      phase: { fr: 'Phase 2 : Liquidation', en: 'Phase 2: Liquidation' },
      steps: [
        { number: '05', title: { fr: 'Vente des actifs', en: 'Sale of assets' }, description: { fr: 'Réalisation de l\'actif de la société', en: 'Realization of the company\'s assets' } },
        { number: '06', title: { fr: 'Règlement des dettes', en: 'Debt settlement' }, description: { fr: 'Paiement des créanciers', en: 'Payment of creditors' } },
        { number: '07', title: { fr: 'Clôture des comptes', en: 'Closing of accounts' }, description: { fr: 'Établissement du bilan de liquidation', en: 'Preparation of the liquidation balance sheet' } },
        { number: '08', title: { fr: 'Radiation RCS', en: 'Trade register removal' }, description: { fr: 'Radiation définitive du registre', en: 'Permanent removal from the register' } },
      ],
    },
  ],
  liquidatorRole: {
    title: { fr: 'Rôle du Liquidateur', en: 'Role of the Liquidator' },
    responsibilities: [
      { fr: 'Représenter la société pendant la liquidation', en: 'Represent the company during liquidation' },
      { fr: 'Réaliser l\'actif (vendre les biens)', en: 'Realize assets (sell property)' },
      { fr: 'Régler le passif (payer les dettes)', en: 'Settle liabilities (pay debts)' },
      { fr: 'Licencier les employés (procédure économique)', en: 'Dismiss employees (economic procedure)' },
      { fr: 'Établir les comptes de liquidation', en: 'Prepare liquidation accounts' },
      { fr: 'Convoquer l\'AG de clôture', en: 'Convene the closing general meeting' },
    ],
  },
  employeeObligations: {
    title: { fr: 'Obligations envers les Salariés', en: 'Obligations Towards Employees' },
    items: [
      { fr: 'Licenciement économique avec préavis (1-2 mois)', en: 'Economic dismissal with notice period (1-2 months)' },
      { fr: 'Indemnités de licenciement substantielles', en: 'Substantial severance pay' },
      { fr: 'Entretien préalable obligatoire', en: 'Mandatory preliminary interview' },
      { fr: 'Priorité de réembauchage', en: 'Priority for rehiring' },
    ],
  },
  documents: [
    { name: { fr: 'PV de dissolution', en: 'Dissolution minutes' }, required: true },
    { name: { fr: 'Attestation annonce légale', en: 'Legal notice certificate' }, required: true },
    { name: { fr: 'Bilan de liquidation', en: 'Liquidation balance sheet' }, required: true },
    { name: { fr: 'PV de clôture de liquidation', en: 'Liquidation closing minutes' }, required: true },
    { name: { fr: 'Formulaires de radiation', en: 'Removal forms' }, required: true },
  ],
  pricingTiers: [
    {
      name: { fr: 'Starter', en: 'Starter' },
      price: '150 000',
      pricePrefix: { fr: 'À partir de', en: 'Starting from' },
      priceNote: { fr: 'XAF HT', en: 'XAF excl. tax' },
      description: { fr: 'Dissolution simple', en: 'Simple dissolution' },
      features: [
        { fr: 'PV de dissolution', en: 'Dissolution minutes' },
        { fr: 'Dossier complet', en: 'Complete file' },
        { fr: 'Guide des démarches', en: 'Procedure guide' },
      ],
      ctaText: { fr: 'Choisir Starter', en: 'Choose Starter' },
      ctaHref: '/devis?service=dissolution&plan=starter',
    },
    {
      name: { fr: 'Standard', en: 'Standard' },
      price: '200 000',
      pricePrefix: { fr: 'À partir de', en: 'Starting from' },
      priceNote: { fr: 'XAF HT', en: 'XAF excl. tax' },
      description: { fr: 'Dissolution accompagnée', en: 'Supported dissolution' },
      features: [
        { fr: 'Tout Starter inclus', en: 'Everything in Starter included' },
        { fr: 'Validation dossier', en: 'File validation' },
        { fr: 'Dépôt greffe', en: 'Court registry filing' },
        { fr: 'Suivi liquidation', en: 'Liquidation follow-up' },
      ],
      ctaText: { fr: 'Choisir Standard', en: 'Choose Standard' },
      ctaHref: '/devis?service=dissolution&plan=standard',
    },
    {
      name: { fr: 'Premium', en: 'Premium' },
      price: '250 000',
      pricePrefix: { fr: 'À partir de', en: 'Starting from' },
      priceNote: { fr: 'XAF HT', en: 'XAF excl. tax' },
      description: { fr: 'Service complet', en: 'Complete service' },
      features: [
        { fr: 'Tout Standard inclus', en: 'Everything in Standard included' },
        { fr: 'Traitement 48h', en: '48h processing' },
        { fr: 'Assurance anti-rejet', en: 'Rejection insurance' },
        { fr: 'Assistance 30j', en: '30-day assistance' },
      ],
      highlighted: true,
      ctaText: { fr: 'Choisir Premium', en: 'Choose Premium' },
      ctaHref: '/devis?service=dissolution&plan=premium',
    },
  ],
  faq: [
    {
      question: { fr: 'Comment dissoudre une SASU ou EURL (associé unique) ?', en: 'How to dissolve a SASU or EURL (sole shareholder)?' },
      answer: { fr: 'L\'associé unique peut décider seul de la dissolution. La liquidation suit le même processus, ou une transmission universelle de patrimoine est possible si l\'associé est une société.', en: 'The sole shareholder can decide on dissolution alone. Liquidation follows the same process, or a universal transfer of assets is possible if the shareholder is a company.' },
    },
    {
      question: { fr: 'Quelle différence entre dissolution et mise en sommeil ?', en: 'What is the difference between dissolution and dormancy?' },
      answer: { fr: 'La dissolution est définitive et mène à la radiation. La mise en sommeil est temporaire (2 ans max), suspend l\'activité mais maintient la société au RCS avec des obligations allégées.', en: 'Dissolution is permanent and leads to removal from the register. Dormancy is temporary (2 years max), suspends activity but keeps the company on the trade register with reduced obligations.' },
    },
    {
      question: { fr: 'Que faire des dettes de la société ?', en: 'What to do with the company\'s debts?' },
      answer: { fr: 'Toutes les dettes doivent être réglées avant la clôture de liquidation. Si l\'actif est insuffisant, une procédure collective peut être nécessaire.', en: 'All debts must be settled before closing the liquidation. If assets are insufficient, collective proceedings may be necessary.' },
    },
    {
      question: { fr: 'Combien de temps dure une dissolution-liquidation ?', en: 'How long does a dissolution-liquidation take?' },
      answer: { fr: 'La durée varie selon la complexité (actifs à vendre, dettes à régler). Comptez minimum 2-3 mois pour une liquidation simple.', en: 'The duration varies depending on complexity (assets to sell, debts to settle). Allow a minimum of 2-3 months for a simple liquidation.' },
    },
  ],
};

// ============================================
// SHARED COMPONENTS DATA
// ============================================

export const gestionCtaData = {
  title: { fr: 'Besoin d\'aide personnalisée ?', en: 'Need personalized help?' },
  subtitle: { fr: 'Nos experts sont disponibles pour répondre à toutes vos questions sur la modification de vos statuts.', en: 'Our experts are available to answer all your questions about amending your articles.' },
  primaryCta: {
    text: { fr: 'Modifier mes Statuts', en: 'Amend My Articles' },
    href: '/devis?service=modification',
  },
  secondaryCta: {
    text: { fr: 'Parler à un Expert', en: 'Talk to an Expert' },
    href: '/prendre-un-rendez-vous',
  },
};

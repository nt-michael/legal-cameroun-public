export interface Pack {
  slug: string;
  envKey: string;
  price: number;
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  icon: string;
}

export const PACKS: Pack[] = [
  {
    slug: 'etablissement',
    envKey: 'PACK_ETABLISSEMENT_PRODUCT_ID',
    price: 40000,
    icon: '🏪',
    name: { fr: 'Pack Établissement', en: 'Business Establishment Pack' },
    description: {
      fr: 'Tous les documents essentiels pour créer votre établissement au Cameroun.',
      en: 'All essential documents to set up your business establishment in Cameroon.',
    },
  },
  {
    slug: 'sasu',
    envKey: 'PACK_SASU_PRODUCT_ID',
    price: 70000,
    icon: '👤',
    name: { fr: 'Pack SASU', en: 'SASU Pack' },
    description: {
      fr: 'Pack complet pour la création d\'une Société par Actions Simplifiée Unipersonnelle.',
      en: 'Complete pack for creating a Single-Member Simplified Joint-Stock Company.',
    },
  },
  {
    slug: 'sas',
    envKey: 'PACK_SAS_PRODUCT_ID',
    price: 75000,
    icon: '🤝',
    name: { fr: 'Pack SAS', en: 'SAS Pack' },
    description: {
      fr: 'Documentation complète pour constituer une Société par Actions Simplifiée.',
      en: 'Complete documentation to form a Simplified Joint-Stock Company.',
    },
  },
  {
    slug: 'sarl',
    envKey: 'PACK_SARL_PRODUCT_ID',
    price: 60000,
    icon: '🏢',
    name: { fr: 'Pack SARL', en: 'SARL Pack' },
    description: {
      fr: 'Tous les documents pour créer votre Société à Responsabilité Limitée.',
      en: 'All documents to create your Limited Liability Company.',
    },
  },
  {
    slug: 'sarlu',
    envKey: 'PACK_SARLU_PRODUCT_ID',
    price: 60000,
    icon: '🔑',
    name: { fr: 'Pack SARLU', en: 'SARLU Pack' },
    description: {
      fr: 'Documentation pour créer votre Société à Responsabilité Limitée Unipersonnelle.',
      en: 'Documentation to create your Single-Member Limited Liability Company.',
    },
  },
  {
    slug: 'contrats',
    envKey: 'PACK_CONTRATS_PRODUCT_ID',
    price: 50000,
    icon: '📜',
    name: { fr: 'Pack Contrats', en: 'Contracts Pack' },
    description: {
      fr: 'Modèles de contrats commerciaux et juridiques essentiels pour votre activité.',
      en: 'Essential commercial and legal contract templates for your business.',
    },
  },
  {
    slug: 'rh',
    envKey: 'PACK_RH_PRODUCT_ID',
    price: 75000,
    icon: '👥',
    name: { fr: 'Pack RH', en: 'HR Pack' },
    description: {
      fr: 'Tous les documents RH pour gérer vos ressources humaines conformément au droit camerounais.',
      en: 'All HR documents to manage your human resources in compliance with Cameroonian law.',
    },
  },
];

export function getPackBySlug(slug: string): Pack | undefined {
  return PACKS.find((p) => p.slug === slug);
}

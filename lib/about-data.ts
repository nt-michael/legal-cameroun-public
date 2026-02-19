// About Page Data
// Content for the About page - Legal Cameroun / RODEC Conseils

import { BilingualText } from '@/lib/translations';

export interface TimelineEvent {
  year: string;
  title: BilingualText;
  description: BilingualText;
  location?: string;
}

export interface ValueCard {
  icon: string;
  title: BilingualText;
  description: BilingualText;
}

export interface Office {
  city: string;
  country: BilingualText;
  role: BilingualText;
  address: BilingualText;
  phone?: string;
  email?: string;
  mapCoords?: { lat: number; lng: number };
}

export interface Testimonial {
  quote: BilingualText;
  author: string;
  role: BilingualText;
  company: string;
  avatar?: string;
}

// Hero Data
export const aboutHeroData = {
  welcomeText: {
    fr: 'Bienvenue chez Legal Cameroun',
    en: 'Welcome to Legal Cameroun',
  } as BilingualText,
  tagline: {
    fr: 'Nous ne sommes pas qu\'un service juridique.',
    en: 'We are not just a legal service.',
  } as BilingualText,
  highlight: {
    fr: 'Nous sommes l\'équipe qui comprend que votre entreprise est unique — comme vous.',
    en: 'We are the team that understands your business is unique — just like you.',
  } as BilingualText,
  description: {
    fr: '+15 000 entrepreneurs accompagnés en 8 ans, une conviction :',
    en: '+15,000 entrepreneurs supported in 8 years, one conviction:',
  } as BilingualText,
  values: {
    fr: 'Zéro stress, rapidité, proximité et expertise locale font la différence.',
    en: 'Zero stress, speed, proximity, and local expertise make the difference.',
  } as BilingualText,
  origin: {
    fr: 'Legal Cameroun est né de RODEC Conseils — un cabinet multinational d\'expertise-comptable et juridique implanté à Paris, Douala et Cotonou.',
    en: 'Legal Cameroun was born from RODEC Conseils — a multinational accounting and legal firm established in Paris, Douala, and Cotonou.',
  } as BilingualText,
  promise: {
    fr: 'Ici, à Akwa, nous combinons la rigueur européenne et la chaleur camerounaise pour vous offrir un accompagnement sur mesure... où que vous soyez.',
    en: 'Here in Akwa, we combine European rigor and Cameroonian warmth to offer you tailored support... wherever you are.',
  } as BilingualText,
  stats: [
    {
      value: '15 000+',
      label: {
        fr: 'entrepreneurs accompagnés',
        en: 'entrepreneurs supported',
      } as BilingualText,
    },
    {
      value: '8 ans',
      label: {
        fr: 'd\'expérience',
        en: 'of experience',
      } as BilingualText,
    },
    {
      value: '3',
      label: {
        fr: 'bureaux internationaux',
        en: 'international offices',
      } as BilingualText,
    },
  ],
};

// Timeline Events
export const timelineEvents: TimelineEvent[] = [
  // {
  //   year: '2017-2018',
  //   title: {
  //     fr: 'Naissance de RODEC Conseils',
  //     en: 'Birth of RODEC Conseils',
  //   },
  //   description: {
  //     fr: 'Une vision : rapprocher l\'expertise internationale des réalités africaines.',
  //     en: 'A vision: bringing international expertise closer to African realities.',
  //   },
  //   location: 'Paris',
  // },
  // {
  //   year: '2019',
  //   title: {
  //     fr: 'Implantation à Douala',
  //     en: 'Establishment in Douala',
  //   },
  //   description: {
  //     fr: 'Elite Offices, Rue Dubois de Saligny, Akwa – le cœur battant de notre présence camerounaise.',
  //     en: 'Elite Offices, Rue Dubois de Saligny, Akwa – the beating heart of our Cameroonian presence.',
  //   },
  //   location: 'Douala',
  // },
  // {
  //   year: '2020-2022',
  //   title: {
  //     fr: 'Expansion régionale',
  //     en: 'Regional Expansion',
  //   },
  //   description: {
  //     fr: 'Extension à Cotonou + lancement des premiers outils digitaux pour entrepreneurs.',
  //     en: 'Expansion to Cotonou + launch of the first digital tools for entrepreneurs.',
  //   },
  //   location: 'Cotonou',
  // },
  {
    year: '2021',
    title: {
      fr: 'Création de Legal Cameroun',
      en: 'Creation of Legal Cameroun',
    },
    description: {
      fr: 'Une plateforme interactive 100% dédiée aux démarches juridiques au Cameroun.',
      en: 'An interactive platform 100% dedicated to legal procedures in Cameroon.',
    },
    location: 'Douala',
  },
  {
    year: '2026',
    title: {
      fr: 'Aujourd\'hui',
      en: 'Today',
    },
    description: {
      fr: '+15 000 entreprises accompagnées, des startups aux PME, en passant par des projets innovants.',
      en: '+15,000 businesses supported, from startups to SMEs, including innovative projects.',
    },
    location: 'Cameroun',
  },
];

// Who We Are Section
export const whoWeAreData = {
  intro: {
    fr: 'Chez nous, pas de jargon inutile ni de réponses automatiques.',
    en: 'With us, no unnecessary jargon or automated responses.',
  } as BilingualText,
  team: {
    fr: 'Nous sommes une équipe de juristes assermentés et d\'experts-comptables passionnés par le droit des affaires camerounais (OHADA inclus).',
    en: 'We are a team of sworn lawyers and chartered accountants passionate about Cameroonian business law (including OHADA).',
  } as BilingualText,
  diversity: {
    fr: 'Certains ont grandi à Douala, d\'autres ont étudié à Paris ou Cotonou — mais tous parlent le même langage : celui de l\'entrepreneur qui veut avancer vite, bien et sans se ruiner.',
    en: 'Some grew up in Douala, others studied in Paris or Cotonou — but all speak the same language: that of the entrepreneur who wants to move forward quickly, effectively, and without breaking the bank.',
  } as BilingualText,
  loves: [
    {
      fr: 'Le café noir matinal à Akwa avant une assemblée.',
      en: 'The morning black coffee in Akwa before a meeting.',
    } as BilingualText,
    {
      fr: 'Les défis fiscaux qui deviennent opportunités.',
      en: 'Tax challenges that become opportunities.',
    } as BilingualText,
    {
      fr: 'Voir une startup locale décrocher son premier gros contrat grâce à des statuts solides.',
      en: 'Seeing a local startup land its first big contract thanks to solid articles of incorporation.',
    } as BilingualText,
    {
      fr: 'La satisfaction d\'un entrepreneur qui nous dit : « Merci, c\'était simple grâce à vous. »',
      en: 'The satisfaction of an entrepreneur who tells us: "Thank you, it was simple thanks to you."',
    } as BilingualText,
  ],
  promise: {
    fr: 'Votre entreprise est unique → Notre accompagnement l\'est aussi.',
    en: 'Your business is unique → Our support is too.',
  } as BilingualText,
};

// Values
export const valuesData: ValueCard[] = [
  {
    icon: 'heart',
    title: {
      fr: 'Proximité & Chaleur',
      en: 'Proximity & Warmth',
    },
    description: {
      fr: 'Nous sommes à Douala, à deux pas de vous. En visio ou en présentiel — on vous écoute vraiment.',
      en: 'We are in Douala, just a step away from you. Via video call or in person — we truly listen.',
    },
  },
  {
    icon: 'globe',
    title: {
      fr: 'Expertise Sans Frontières',
      en: 'Expertise Without Borders',
    },
    description: {
      fr: 'Rigueur parisienne + connaissance terrain camerounais = solutions qui marchent ici.',
      en: 'Parisian rigor + Cameroonian field knowledge = solutions that work here.',
    },
  },
  {
    icon: 'lightning',
    title: {
      fr: 'Simplicité & Rapidité',
      en: 'Simplicity & Speed',
    },
    description: {
      fr: 'Questionnaire en ligne → Dossier prêt en 48h (Premium). Zéro paperasse inutile.',
      en: 'Online questionnaire → File ready in 48h (Premium). Zero unnecessary paperwork.',
    },
  },
  {
    icon: 'shield',
    title: {
      fr: 'Confiance & Transparence',
      en: 'Trust & Transparency',
    },
    description: {
      fr: 'Prix clairs, accompagnement 30 jours, juristes assermentés. Pas de mauvaises surprises.',
      en: 'Clear pricing, 30-day support, sworn lawyers. No unpleasant surprises.',
    },
  },
];

// Offices
export const officesData: Office[] = [
  {
    city: 'Douala',
    country: {
      fr: 'Cameroun',
      en: 'Cameroon',
    },
    role: {
      fr: 'Siège Cameroun',
      en: 'Cameroon Headquarters',
    },
    address: {
      fr: 'Elite Offices Building, Rue Dubois de Saligny, Akwa',
      en: 'Elite Offices Building, Rue Dubois de Saligny, Akwa',
    },
    phone: '+237 691 76 82 85',
    email: 'contact-cm@rodecconseils.com',
    mapCoords: { lat: 4.0511, lng: 9.7679 },
  },
  {
    city: 'Paris',
    country: {
      fr: 'France',
      en: 'France',
    },
    role: {
      fr: 'Siège Europe',
      en: 'European Headquarters',
    },
    address: {
      fr: '2 bis rue de Villiers, 92300 Levallois-Perret',
      en: '2 bis rue de Villiers, 92300 Levallois-Perret',
    },
    mapCoords: { lat: 48.8941, lng: 2.2870 },
  },
  {
    city: 'Cotonou',
    country: {
      fr: 'Bénin',
      en: 'Benin',
    },
    role: {
      fr: 'Afrique de l\'Ouest',
      en: 'West Africa',
    },
    address: {
      fr: 'Présence active pour projets régionaux',
      en: 'Active presence for regional projects',
    },
    mapCoords: { lat: 6.3654, lng: 2.4183 },
  },
];

// Testimonials
export const testimonialsData: Testimonial[] = [
  {
    quote: {
      fr: 'Services exceptionnels… Leurs compétences en transmission et acquisition ont grandement facilité nos processus.',
      en: 'Exceptional services... Their expertise in transfer and acquisition greatly facilitated our processes.',
    },
    author: 'Laurent NORTH',
    role: {
      fr: 'Directeur',
      en: 'Director',
    },
    company: 'BlueWindow Ltd',
  },
  {
    quote: {
      fr: 'Leur expertise en fusions-acquisitions et secrétariat juridique a dépassé nos attentes.',
      en: 'Their expertise in mergers and acquisitions and legal secretariat exceeded our expectations.',
    },
    author: 'Romeo FOKO',
    role: {
      fr: 'Associé',
      en: 'Partner',
    },
    company: 'Pategou Consulting',
  },
  {
    quote: {
      fr: 'Indispensable pour notre conformité légale à un niveau optimal.',
      en: 'Essential for our legal compliance at an optimal level.',
    },
    author: 'Calvin JOB',
    role: {
      fr: 'Fondateur',
      en: 'Founder',
    },
    company: 'Calvin Job & Partners',
  },
  {
    quote: {
      fr: 'Une équipe réactive et professionnelle. Création de ma SARL en moins de 2 semaines !',
      en: 'A responsive and professional team. My SARL was created in less than 2 weeks!',
    },
    author: 'Marie ESSOMBA',
    role: {
      fr: 'Fondatrice',
      en: 'Founder',
    },
    company: 'Essomba Fashion',
  },
  {
    quote: {
      fr: 'Accompagnement personnalisé du début à la fin. Je recommande vivement.',
      en: 'Personalized support from start to finish. I highly recommend.',
    },
    author: 'Paul MBARGA',
    role: {
      fr: 'CEO',
      en: 'CEO',
    },
    company: 'TechCam Solutions',
  },
];

// Final CTA
export const finalCtaData = {
  title: {
    fr: 'Prêt à Écrire la Suite de Votre Histoire ?',
    en: 'Ready to Write the Next Chapter of Your Story?',
  } as BilingualText,
  description: {
    fr: 'Que vous démarriez, transformiez ou transmettiez votre entreprise — où que vous soyez au Cameroun, nous sommes là, à vos côtés.',
    en: 'Whether you are starting, growing, or passing on your business — wherever you are in Cameroon, we are here, by your side.',
  } as BilingualText,
  primaryCta: {
    text: {
      fr: 'Réserver une consultation',
      en: 'Book a consultation',
    } as BilingualText,
    href: '/prendre-un-rendez-vous',
  },
  secondaryCta: {
    text: {
      fr: 'Obtenir un devis personnalisé',
      en: 'Get a personalized quote',
    } as BilingualText,
    href: '/devis',
  },
};

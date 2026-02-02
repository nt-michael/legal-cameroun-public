// Actualité / Blog Data
// Static content extracted from legalcameroun.com/news/
// Will be replaced with WordPress API integration later

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  dateFormatted: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  externalUrl?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'cameroun-paradis-fiscal-startups-innovantes',
    title: 'Cameroun : Un Paradis Fiscal pour les Startups Innovantes ?',
    excerpt: 'Le Cameroun mise sur l\'innovation et les startups pour sa croissance économique. Découvrez les avantages fiscaux offerts aux entrepreneurs innovants et comment en bénéficier.',
    date: '2025-02-25',
    dateFormatted: '25 Février 2025',
    image: 'https://legalcameroun.com/wp-content/uploads/2025/02/innovative-startups-930x620.png',
    category: 'Fiscalité',
    author: 'Legal Cameroun',
    readTime: '5 min',
    externalUrl: 'https://legalcameroun.com/cameroun-un-paradis-fiscal-pour-les-startups-innovantes/',
  },
  {
    id: '2',
    slug: 'nouvelle-loi-protection-donnees-entreprises',
    title: 'Nouvelle Loi Camerounaise sur la Protection des Données : Enjeux pour les Entreprises',
    excerpt: 'La promulgation de la loi n° 2024/017 du 23 décembre 2024 relative à la protection des données personnelles marque un tournant majeur pour les entreprises au Cameroun.',
    date: '2025-02-18',
    dateFormatted: '18 Février 2025',
    image: 'https://legalcameroun.com/wp-content/uploads/2025/02/Data-protection-930x620.png',
    category: 'Juridique',
    author: 'Legal Cameroun',
    readTime: '7 min',
    externalUrl: 'https://legalcameroun.com/nouvelle-loi-camerounaise-sur-la-protection-des-donnees-enjeux-pour-les-entreprises/',
  },
  {
    id: '3',
    slug: 'droit-affaires-cameroun-guide-complet-entrepreneurs',
    title: 'Droit des Affaires au Cameroun : Guide Complet pour les Entrepreneurs',
    excerpt: 'Le cadre juridique et réglementaire du droit des affaires au Cameroun est régi par un cadre complexe. Voici tout ce que vous devez savoir pour entreprendre en toute légalité.',
    date: '2025-01-30',
    dateFormatted: '30 Janvier 2025',
    image: 'https://legalcameroun.com/wp-content/uploads/2025/01/droit-affaires1-930x620.png',
    category: 'Droit des Affaires',
    author: 'Legal Cameroun',
    readTime: '10 min',
    externalUrl: 'https://legalcameroun.com/droit-des-affaires-au-cameroun-guide-complet-pour-les-entrepreneurs/',
  },
  {
    id: '4',
    slug: 'protection-propriete-intellectuelle-cameroun',
    title: 'La Protection de la Propriété Intellectuelle au Cameroun',
    excerpt: 'La propriété intellectuelle désigne les créations de l\'esprit telles que les inventions, les œuvres littéraires et artistiques. Découvrez comment protéger vos créations.',
    date: '2025-01-30',
    dateFormatted: '30 Janvier 2025',
    image: 'https://legalcameroun.com/wp-content/uploads/2025/01/teledeclaration1-930x620.png',
    category: 'Propriété Intellectuelle',
    author: 'Legal Cameroun',
    readTime: '6 min',
    externalUrl: 'https://legalcameroun.com/la-protection-de-la-propriete-intellectuelle-au-cameroun/',
  },
  {
    id: '5',
    slug: 'loi-finances-2025-nouvelle-ere-economie-cameroun',
    title: 'Loi de Finances 2025 : Une Nouvelle Ère pour l\'Économie Camerounaise',
    excerpt: 'La loi de finances 2025 représente une avancée significative dans le paysage économique camerounais. Analyse des principales mesures et leurs impacts sur les entreprises.',
    date: '2024-12-13',
    dateFormatted: '13 Décembre 2024',
    image: 'https://legalcameroun.com/wp-content/uploads/2024/12/loi-de-finances-930x620.png',
    category: 'Fiscalité',
    author: 'Legal Cameroun',
    readTime: '8 min',
    externalUrl: 'https://legalcameroun.com/finance-law-2025-a-new-era-for-cameroons-economy/',
  },
  {
    id: '6',
    slug: 'declarez-impots-en-ligne-dgi',
    title: 'Simplifiez votre vie : Déclarez vos impôts en ligne avec la DGI',
    excerpt: 'Le timbre fiscal fait peau neuve au Cameroun. Fini les allers-retours en quête de timbres physiques. Découvrez la télédéclaration fiscale.',
    date: '2024-12-09',
    dateFormatted: '9 Décembre 2024',
    image: 'https://legalcameroun.com/wp-content/uploads/2024/12/dgi-930x620.png',
    category: 'Fiscalité',
    author: 'Legal Cameroun',
    readTime: '4 min',
    externalUrl: 'https://legalcameroun.com/simplifiez-votre-vie-declarez-vos-impots-en-ligne-avec-la-dgi/',
  },
  {
    id: '7',
    slug: 'rappel-contribuables-non-professionnels',
    title: 'Rappel aux Contribuables Non-Professionnels au Cameroun',
    excerpt: 'Le Ministère des Finances du Cameroun a publié un rappel important à l\'attention de tous les contribuables non-professionnels concernant leurs obligations fiscales.',
    date: '2024-11-30',
    dateFormatted: '30 Novembre 2024',
    image: 'https://legalcameroun.com/wp-content/uploads/2024/11/Copy-of-Consultation-product-930x620.png',
    category: 'Fiscalité',
    author: 'Legal Cameroun',
    readTime: '3 min',
    externalUrl: 'https://legalcameroun.com/rappel-aux-contribuables-non-professionnels-au-cameroun/',
  },
  {
    id: '8',
    slug: 'contrats-partenariat-public-prive-ppp',
    title: 'Les Contrats de Partenariat Public Privé (PPP)',
    excerpt: 'D\'après la loi du N°2023/008 du 25 juillet 2023 fixant le régime général des PPP au Cameroun, découvrez les opportunités et le cadre juridique des partenariats public-privé.',
    date: '2024-11-25',
    dateFormatted: '25 Novembre 2024',
    image: 'https://legalcameroun.com/wp-content/uploads/2024/11/PPP-930x620.png',
    category: 'Droit des Affaires',
    author: 'Legal Cameroun',
    readTime: '6 min',
    externalUrl: 'https://legalcameroun.com/les-contrats-de-partenariat-public-prive-ppp/',
  },
  {
    id: '9',
    slug: 'financement-projets-entrepreneuriaux-cameroun',
    title: 'Le Financement des Projets Entrepreneuriaux au Cameroun',
    excerpt: 'Un projet entrepreneurial est une initiative visant à créer une nouvelle entreprise ou développer une activité existante. Explorez les options de financement disponibles.',
    date: '2024-11-04',
    dateFormatted: '4 Novembre 2024',
    image: 'https://legalcameroun.com/wp-content/uploads/2024/11/entreprenariat-930x620.png',
    category: 'Entrepreneuriat',
    author: 'Legal Cameroun',
    readTime: '7 min',
    externalUrl: 'https://legalcameroun.com/le-financement-des-projets-entrepreneuriaux-au-cameroun/',
  },
  {
    id: '10',
    slug: 'reforme-cnps-consequences-dirigeants-entreprises',
    title: 'Réforme CNPS : Quelles Conséquences pour les Dirigeants d\'Entreprises ?',
    excerpt: 'La Caisse Nationale de Prévoyance Sociale a récemment émis une note clarifiant les conditions d\'affiliation des dirigeants. Voici ce que vous devez savoir.',
    date: '2024-11-04',
    dateFormatted: '4 Novembre 2024',
    image: 'https://legalcameroun.com/wp-content/uploads/2024/11/cnps-930x620.png',
    category: 'Social',
    author: 'Legal Cameroun',
    readTime: '5 min',
    externalUrl: 'https://legalcameroun.com/reforme-cnps-quelles-consequences-pour-les-dirigeants-dentreprises/',
  },
];

// Get all unique categories
export const categories = [...new Set(blogPosts.map(post => post.category))];

// Get featured posts (latest 3)
export const featuredPosts = blogPosts.slice(0, 3);

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

// Get post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

// Hero data
export const actualiteHeroData = {
  badge: 'Actualités',
  title: 'Actualité Juridique & Fiscale',
  subtitle: 'Restez informé des dernières évolutions',
  description: 'Analyses, guides pratiques et actualités du droit des affaires au Cameroun. Notre équipe d\'experts décrypte pour vous les évolutions juridiques et fiscales.',
};

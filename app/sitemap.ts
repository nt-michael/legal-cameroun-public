import { MetadataRoute } from 'next';

const BASE = 'https://legalcameroun.com';

const pages: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '',                                              changeFrequency: 'daily',   priority: 1.0 },
  { path: '/creation-entreprise',                         changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/modification-entreprise',                     changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/creation-entreprise/sas',                     changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/creation-entreprise/sarl',                    changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/creation-entreprise/sarlu',                   changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/creation-entreprise/association',             changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/modification-entreprise/transfert-siege',     changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/modification-entreprise/dissolution',         changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/modification-entreprise/sarl-vers-sas',       changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/modification-entreprise/sas-vers-sarl',       changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/actualite',                                   changeFrequency: 'daily',   priority: 0.8 },
  { path: '/simulateurs',                                 changeFrequency: 'monthly', priority: 0.7 },
  { path: '/simulateurs/tva',                             changeFrequency: 'monthly', priority: 0.7 },
  { path: '/simulateurs/is',                              changeFrequency: 'monthly', priority: 0.7 },
  { path: '/simulateurs/salaire',                         changeFrequency: 'monthly', priority: 0.7 },
  { path: '/fiches-pratiques',                            changeFrequency: 'monthly', priority: 0.7 },
  { path: '/fiches-pratiques/immatriculation-avec-atom',  changeFrequency: 'monthly', priority: 0.7 },
  { path: '/fiches-pratiques/prix-des-transferts',        changeFrequency: 'monthly', priority: 0.7 },
  { path: '/fiches-pratiques/presentation-societe-etablissement', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/fiches-pratiques/tutoriel-consultation',      changeFrequency: 'monthly', priority: 0.7 },
  { path: '/a-propos',                                    changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact',                                     changeFrequency: 'monthly', priority: 0.7 },
  { path: '/devis',                                       changeFrequency: 'monthly', priority: 0.7 },
  { path: '/prendre-un-rendez-vous',                      changeFrequency: 'monthly', priority: 0.7 },
  { path: '/mentions-legales',                            changeFrequency: 'monthly', priority: 0.3 },
  { path: '/politique-de-confidentialite',                changeFrequency: 'monthly', priority: 0.3 },
  { path: '/conditions-generales',                        changeFrequency: 'monthly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    // French (canonical, no prefix)
    entries.push({
      url: `${BASE}${page.path || '/'}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
    // English (/en prefix)
    entries.push({
      url: `${BASE}/en${page.path || ''}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  return entries;
}

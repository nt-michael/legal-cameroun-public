import { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-config';
import { getPostsForSitemap } from '@/lib/wordpress';

// Blog content changes without a redeploy, so the sitemap is regenerated hourly.
export const revalidate = 3600;

// Must match the page size used by lib/actualite-page-utils.ts
const POSTS_PER_PAGE = 9;

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const buildDate = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static routes, French (canonical) and English
  for (const page of pages) {
    const path = page.path || '/';
    for (const lang of ['fr', 'en'] as const) {
      entries.push({
        url: absoluteUrl(path, lang),
        lastModified: buildDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // If WordPress is unreachable this returns [] and the sitemap degrades to the
  // static routes above rather than failing the build.
  const posts = await getPostsForSitemap();

  for (const post of posts) {
    const path = `/actualite/${post.slug}`;
    const lastModified = new Date(post.modified);

    entries.push({
      url: absoluteUrl(path, 'fr'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    });

    // An English URL without a translation is the French text on a second URL —
    // it canonicalises to the French original, so it does not belong here.
    if (post.hasEnglish) {
      entries.push({
        url: absoluteUrl(path, 'en'),
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // Paginated listings. Page 1 is omitted: it canonicalises to /actualite.
  const listingPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  for (let num = 2; num <= listingPages; num++) {
    const path = `/actualite/page/${num}`;
    for (const lang of ['fr', 'en'] as const) {
      entries.push({
        url: absoluteUrl(path, lang),
        lastModified: buildDate,
        changeFrequency: 'daily',
        priority: 0.5,
      });
    }
  }

  return entries;
}

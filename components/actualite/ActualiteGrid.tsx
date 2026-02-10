'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BlogPostCard from './BlogPostCard';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPost } from '@/lib/wordpress-utils';
import type { BlogPost as StaticBlogPost } from '@/lib/actualite-data';
import type { CategoryInfo } from '@/lib/actualite-page-utils';

interface ActualiteGridProps {
  posts: BlogPost[] | StaticBlogPost[];
  categories: CategoryInfo[];
  currentPage?: number;
  totalPages?: number;
  currentCategory?: string;
  useWordPress?: boolean;
}

const text = {
  allArticles: { fr: 'Tous les articles', en: 'All articles' },
  noArticles: { fr: 'Aucun article dans cette catégorie.', en: 'No articles in this category.' },
  newsletterTitle: { fr: 'Restez informé des dernières actualités', en: 'Stay informed of the latest news' },
  newsletterDesc: {
    fr: "Recevez nos analyses et guides pratiques directement dans votre boîte mail. Rejoignez notre communauté d'entrepreneurs camerounais.",
    en: 'Receive our analyses and practical guides directly in your inbox. Join our community of Cameroonian entrepreneurs.',
  },
  emailPlaceholder: { fr: 'Votre adresse email', en: 'Your email address' },
  subscribe: { fr: "S'abonner", en: 'Subscribe' },
  previous: { fr: 'Précédent', en: 'Previous' },
  next: { fr: 'Suivant', en: 'Next' },
  page: { fr: 'Page', en: 'Page' },
};

function buildPageUrl(page: number, categorySlug?: string): string {
  const base = page === 1 ? '/actualite' : `/actualite/page/${page}`;
  if (categorySlug) return `${base}?category=${categorySlug}`;
  return base;
}

export default function ActualiteGrid({
  posts,
  categories,
  currentPage = 1,
  totalPages = 1,
  currentCategory,
  useWordPress = false,
}: ActualiteGridProps) {
  const { language } = useLanguage();
  const router = useRouter();

  const handleCategoryClick = (slug: string | null) => {
    if (slug) {
      router.push(`/actualite?category=${slug}`);
    } else {
      router.push('/actualite');
    }
  };

  // For static data, filter client-side
  const displayPosts = !useWordPress && currentCategory
    ? posts.filter(post => {
        const cat = categories.find(c => c.slug === currentCategory);
        return cat ? post.category === cat.name : true;
      })
    : posts;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !currentCategory
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {text.allArticles[language]}
          </button>
          {categories.map(category => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentCategory === category.slug
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <BlogPostCard
              key={post.id}
              post={post}
              index={index}
              featured={index === 0 && !currentCategory}
              useWordPress={useWordPress}
            />
          ))}
        </div>

        {/* No Results */}
        {displayPosts.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">{text.noArticles[language]}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <Link
              href={currentPage > 1 ? buildPageUrl(currentPage - 1, currentCategory) : '#'}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage > 1
                  ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
              aria-disabled={currentPage <= 1}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {text.previous[language]}
              </span>
            </Link>

            <span className="text-gray-600 dark:text-gray-400">
              {text.page[language]} {currentPage} / {totalPages}
            </span>

            <Link
              href={currentPage < totalPages ? buildPageUrl(currentPage + 1, currentCategory) : '#'}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage < totalPages
                  ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
              aria-disabled={currentPage >= totalPages}
            >
              <span className="flex items-center gap-2">
                {text.next[language]}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {text.newsletterTitle[language]}
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            {text.newsletterDesc[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={text.emailPlaceholder[language]}
              className="flex-1 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-primary-700 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
              {text.subscribe[language]}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

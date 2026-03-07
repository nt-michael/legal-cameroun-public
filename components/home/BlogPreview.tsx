'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPost } from '@/lib/wordpress-utils';

const sectionText = {
  badge: { fr: 'Actualités', en: 'News' },
  title: { fr: 'Nos Analyses', en: 'Our Analyses' },
  subtitle: {
    fr: 'Ne manquez aucune évolution clé de l\'écosystème business camerounais. Réformes fiscales, nouvelles réglementations, tendances financières et comptables : nous décryptons l\'actualité avec des analyses pointues et la traduisons en recommandations concrètes pour prendre les bonnes décisions au bon moment.',
    en: 'Never miss a key development in the Cameroonian business ecosystem. Tax reforms, new regulations, financial and accounting trends: we decode the news with sharp analysis and translate it into concrete recommendations to make the right decisions at the right time.',
  },
  viewAll: { fr: 'Voir Toutes les Analyses', en: 'View All Analyses' },
  readMore: { fr: 'Lire la suite', en: 'Read more' },
  empty: {
    fr: 'Aucun article disponible pour le moment. Revenez bientôt.',
    en: 'No articles available at the moment. Check back soon.',
  },
};

interface BlogPreviewProps {
  posts?: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
  });
  const { language } = useLanguage();

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-medium mb-4">
              {sectionText.badge[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {sectionText.title[language]}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              {sectionText.subtitle[language]}
            </p>
          </div>
          <Link
            href="/actualite"
            className="btn-secondary shrink-0"
          >
            {sectionText.viewAll[language]}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Blog Grid */}
        {!posts || posts.length === 0 ? (
          <div ref={ref} className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-gray-500 max-w-sm">{sectionText.empty[language]}</p>
          </div>
        ) : (
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="h-48 relative overflow-hidden">
                <Image
                  unoptimized
                  src={post.image || '/images/blog-placeholder.svg'}
                  alt={post.imageAlt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {post.dateFormatted}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  <Link href={`/actualite/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/actualite/${post.slug}`}
                  className="inline-flex items-center text-primary-600 font-medium group-hover:gap-2 transition-all"
                >
                  {sectionText.readMore[language]}
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

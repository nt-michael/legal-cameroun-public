'use client';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

const blogPosts = [
  {
    id: 1,
    title: 'Nouvelles Reformes du Code du Travail au Cameroun en 2024',
    excerpt: 'Decouvrez les changements majeurs apportes au Code du Travail camerounais et leurs implications pour les employeurs et les salaries.',
    category: 'Droit du Travail',
    date: '15 Jan 2024',
    readTime: '5 min',
    slug: 'reformes-code-travail-2024',
  },
  {
    id: 2,
    title: 'Guide Complet pour Creer une Entreprise au Cameroun',
    excerpt: 'Toutes les etapes et documents necessaires pour immatriculer votre entreprise au registre du commerce camerounais.',
    category: 'Droit des Affaires',
    date: '10 Jan 2024',
    readTime: '8 min',
    slug: 'guide-creation-entreprise',
  },
  {
    id: 3,
    title: 'Protection des Donnees Personnelles: Ce Que Dit la Loi',
    excerpt: 'Analyse de la reglementation camerounaise sur la protection des donnees personnelles et les obligations des entreprises.',
    category: 'Droit Numerique',
    date: '5 Jan 2024',
    readTime: '6 min',
    slug: 'protection-donnees-personnelles',
  },
];

const categoryColors: Record<string, string> = {
  'Droit du Travail': 'bg-primary-100 text-primary-600',
  'Droit des Affaires': 'bg-green-100 text-green-600',
  'Droit Numerique': 'bg-purple-100 text-purple-600',
};

const sectionText = {
  badge: { fr: 'Actualités', en: 'News' },
  title: { fr: 'Actualites Juridiques', en: 'Legal News' },
  subtitle: {
    fr: 'Restez informe des dernieres evolutions du droit camerounais et decouvrez nos conseils pratiques.',
    en: 'Stay informed about the latest developments in Cameroonian law and discover our practical advice.',
  },
  viewAll: { fr: 'Voir Tous les Articles', en: 'View All Articles' },
  readMore: { fr: 'Lire la suite', en: 'Read more' },
};

export default function BlogPreview() {
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
            href="/blog"
            className="btn-secondary shrink-0"
          >
            {sectionText.viewAll[language]}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Blog Grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                {/* Category Badge */}
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
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
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
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
      </div>
    </section>
  );
}

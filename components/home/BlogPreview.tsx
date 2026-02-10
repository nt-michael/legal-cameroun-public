'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPost } from '@/lib/wordpress-utils';

// Fallback static posts when WordPress is not configured
const fallbackPosts = [
  {
    id: '1',
    slug: 'reformes-code-travail-2024',
    title: 'Nouvelles Reformes du Code du Travail au Cameroun en 2024',
    excerpt: 'Decouvrez les changements majeurs apportes au Code du Travail camerounais et leurs implications pour les employeurs et les salaries.',
    category: 'Droit du Travail',
    dateFormatted: '15 Jan 2024',
    readTime: '5 min',
    image: '/images/default-post.jpg',
  },
  {
    id: '2',
    slug: 'guide-creation-entreprise',
    title: 'Guide Complet pour Creer une Entreprise au Cameroun',
    excerpt: 'Toutes les etapes et documents necessaires pour immatriculer votre entreprise au registre du commerce camerounais.',
    category: 'Droit des Affaires',
    dateFormatted: '10 Jan 2024',
    readTime: '8 min',
    image: '/images/default-post.jpg',
  },
  {
    id: '3',
    slug: 'protection-donnees-personnelles',
    title: 'Protection des Donnees Personnelles: Ce Que Dit la Loi',
    excerpt: 'Analyse de la reglementation camerounaise sur la protection des donnees personnelles et les obligations des entreprises.',
    category: 'Droit Numerique',
    dateFormatted: '5 Jan 2024',
    readTime: '6 min',
    image: '/images/default-post.jpg',
  },
];

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

  const displayPosts = posts || fallbackPosts;
  const isWordPress = !!posts;

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
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="h-48 relative overflow-hidden">
                {post.image && post.image !== '/images/default-post.jpg' ? (
                  <Image
                    src={post.image}
                    alt={'imageAlt' in post ? (post as BlogPost).imageAlt : post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <Image src="/custom-icons/SVG/42ICONE_BICHROME.svg" alt="Article" width={64} height={64} />
                  </div>
                )}
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
      </div>
    </section>
  );
}

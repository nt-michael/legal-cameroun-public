'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BlogPost } from '@/lib/wordpress-utils';
import type { BlogPost as StaticBlogPost } from '@/lib/actualite-data';

interface BlogPostCardProps {
  post: BlogPost | StaticBlogPost;
  index: number;
  featured?: boolean;
  useWordPress?: boolean;
}

const text = {
  readArticle: { fr: "Lire l'article", en: 'Read article' },
};

export default function BlogPostCard({ post, index, featured = false, useWordPress = false }: BlogPostCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import('gsap')).default;

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
          }
        );
      }
    };

    loadGSAP();
  }, [index]);

  const handleMouseEnter = async () => {
    const gsap = (await import('gsap')).default;
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = async () => {
    const gsap = (await import('gsap')).default;
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  // Determine the link - WordPress posts go to internal page, static posts to external URL
  const href = useWordPress
    ? `/actualite/${post.slug}`
    : ('externalUrl' in post && post.externalUrl) || `/actualite/${post.slug}`;

  const isExternal = !useWordPress && 'externalUrl' in post && post.externalUrl;

  // Get image - handle both WordPress and static formats
  const imageUrl = 'image' in post ? post.image : '/images/default-post.jpg';
  const imageAlt = 'imageAlt' in post ? post.imageAlt : post.title;

  // Get date formatted
  const dateDisplay = post.dateFormatted;

  const CardWrapper = isExternal ? 'a' : Link;
  const linkProps = isExternal
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href };

  return (
    <CardWrapper
      ref={cardRef}
      {...linkProps}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow opacity-0 ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-full' : 'h-48'}`}>
        {imageUrl && imageUrl !== '/images/default-post.jpg' ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
            <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${featured ? 'flex flex-col justify-center' : ''}`}>
        {/* Date & Read Time */}
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {dateDisplay}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-3 ${
          featured ? 'text-2xl' : 'text-lg'
        }`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-gray-600 dark:text-gray-300 mb-4 ${featured ? 'text-base' : 'text-sm line-clamp-2'}`}>
          {post.excerpt}
        </p>

        {/* Read More */}
        <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm">
          <span>{text.readArticle[language]}</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </CardWrapper>
  );
}

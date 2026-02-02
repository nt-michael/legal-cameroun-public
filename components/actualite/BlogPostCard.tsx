'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { BlogPost } from '@/lib/actualite-data';

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
}

export default function BlogPostCard({ post, index, featured = false }: BlogPostCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

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

  return (
    <a
      ref={cardRef}
      href={post.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow opacity-0 ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-full' : 'h-48'}`}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
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
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {post.dateFormatted}
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
        <h3 className={`font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-3 ${
          featured ? 'text-2xl' : 'text-lg'
        }`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-gray-600 mb-4 ${featured ? 'text-base' : 'text-sm line-clamp-2'}`}>
          {post.excerpt}
        </p>

        {/* Read More */}
        <div className="flex items-center text-primary-600 font-medium text-sm">
          <span>Lire l&apos;article</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </a>
  );
}

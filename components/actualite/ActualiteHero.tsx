'use client';

import { useEffect, useRef } from 'react';
import { actualiteHeroData } from '@/lib/actualite-data';

export default function ActualiteHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import('gsap')).default;

      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.animate-item'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
      }
    };

    loadGSAP();
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary-400/20 rounded-full blur-2xl" />

      <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-item">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {actualiteHeroData.badge}
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          {actualiteHeroData.title}
        </h1>

        {/* Subtitle */}
        <p className="animate-item text-xl sm:text-2xl text-primary-300 font-medium mb-6">
          {actualiteHeroData.subtitle}
        </p>

        {/* Description */}
        <p className="animate-item text-lg text-gray-300 max-w-3xl mx-auto">
          {actualiteHeroData.description}
        </p>
      </div>
    </section>
  );
}

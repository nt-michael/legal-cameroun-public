'use client';

import { useEffect, useRef } from 'react';
import { heroData } from '@/lib/simulateurs-data';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SimulateursHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

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

      {/* Floating Calculator Icons */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center animate-pulse">
        <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center animate-pulse" style={{ animationDelay: '1s' }}>
        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-item">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            {heroData.badge[language]}
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-item text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          {heroData.title[language]}
        </h1>

        {/* Subtitle */}
        <p className="animate-item text-xl sm:text-2xl text-primary-300 font-medium mb-6">
          {heroData.subtitle[language]}
        </p>

        {/* Description */}
        <p className="animate-item text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          {heroData.description[language]}
        </p>

        {/* Privacy Note */}
        <div className="animate-item inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          {heroData.privacyNote[language]}
        </div>

        {/* Disclaimer */}
        <p className="animate-item text-sm text-gray-400 max-w-2xl mx-auto">
          {heroData.disclaimer[language]}
        </p>
      </div>
    </section>
  );
}

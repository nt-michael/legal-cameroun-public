'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { fichesHubData } from '@/lib/fiches-pratiques-data';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FichesHero() {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
      }

      // Content stagger
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, delay: 0.3, ease: 'power2.out' }
        );
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #041c28, #0a3d4f, #041c28)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-400/10 rounded-full blur-2xl" />

      {/* Illustration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 lg:opacity-20 pointer-events-none">
        <svg className="w-96 h-96" viewBox="0 0 400 400" fill="none">
          {/* Notebook */}
          <rect x="100" y="80" width="200" height="240" rx="8" fill="currentColor" className="text-primary-300" />
          <rect x="110" y="90" width="180" height="220" rx="4" fill="currentColor" className="text-primary-900" />
          {/* Lines on notebook */}
          <line x1="130" y1="130" x2="270" y2="130" stroke="currentColor" className="text-primary-400" strokeWidth="2" />
          <line x1="130" y1="160" x2="270" y2="160" stroke="currentColor" className="text-primary-400" strokeWidth="2" />
          <line x1="130" y1="190" x2="250" y2="190" stroke="currentColor" className="text-primary-400" strokeWidth="2" />
          <line x1="130" y1="220" x2="260" y2="220" stroke="currentColor" className="text-primary-400" strokeWidth="2" />
          {/* Coffee cup */}
          <ellipse cx="320" cy="280" rx="40" ry="15" fill="currentColor" className="text-primary-400" />
          <path d="M280 280 L285 340 Q300 360 340 360 L345 340 L350 280" fill="currentColor" className="text-primary-500" />
          <path d="M350 290 Q380 290 380 320 Q380 350 350 340" stroke="currentColor" className="text-primary-400" strokeWidth="6" fill="none" />
          {/* Steam */}
          <path d="M300 260 Q305 250 300 240 Q295 230 300 220" stroke="currentColor" className="text-primary-300" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M320 255 Q325 245 320 235 Q315 225 320 215" stroke="currentColor" className="text-primary-300" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6">
          {fichesHubData.hero.badge[language]}
        </span>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          {fichesHubData.hero.title[language]}
        </h1>

        {/* Content */}
        <div ref={contentRef} className="space-y-4">
          <p className="text-xl text-gray-300">
            {fichesHubData.hero.subtitle[language]}
          </p>
          <p className="text-lg text-gray-400">
            {fichesHubData.hero.description[language]}
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
    </section>
  );
}

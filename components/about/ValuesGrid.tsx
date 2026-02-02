'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { valuesData } from '@/lib/about-data';
import { useLanguage } from '@/contexts/LanguageContext';

const sectionText = {
  badge: { fr: 'Nos Valeurs', en: 'Our Values' },
  title: { fr: 'Ce Qui Nous Anime', en: 'What Drives Us' },
  subtitle: { fr: 'Des principes simples pour un accompagnement d\'exception', en: 'Simple principles for exceptional support' },
};

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  heart: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  globe: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  lightning: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  shield: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
};

const cardColors = [
  { bg: 'from-amber-50 to-orange-50', border: 'border-amber-200', hover: 'hover:border-amber-400', icon: 'text-amber-600', darkBg: 'dark:from-amber-900/20 dark:to-orange-900/20', darkBorder: 'dark:border-amber-800' },
  { bg: 'from-green-50 to-teal-50', border: 'border-green-200', hover: 'hover:border-green-400', icon: 'text-green-600', darkBg: 'dark:from-green-900/20 dark:to-teal-900/20', darkBorder: 'dark:border-green-800' },
  { bg: 'from-primary-50 to-primary-100', border: 'border-primary-200', hover: 'hover:border-primary-400', icon: 'text-primary-600', darkBg: 'dark:from-primary-900/20 dark:to-primary-800/20', darkBorder: 'dark:border-primary-800' },
  { bg: 'from-purple-50 to-pink-50', border: 'border-purple-200', hover: 'hover:border-purple-400', icon: 'text-purple-600', darkBg: 'dark:from-purple-900/20 dark:to-pink-900/20', darkBorder: 'dark:border-purple-800' },
];

export default function ValuesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Hover animation - warm color shift and subtle rotate
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            rotate: 1,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotate: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 800 800">
          <pattern id="values-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M0 40 Q 20 20, 40 40 T 80 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary-600" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#values-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            {sectionText.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {sectionText.title[language]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {sectionText.subtitle[language]}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuesData.map((value, index) => {
            const colors = cardColors[index % cardColors.length];
            return (
              <div
                key={value.title[language]}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`bg-gradient-to-br ${colors.bg} ${colors.darkBg} rounded-2xl p-6 border-2 ${colors.border} ${colors.darkBorder} ${colors.hover} transition-all duration-300 cursor-pointer`}
              >
                <div className={`w-14 h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center ${colors.icon} dark:text-white mb-4 shadow-sm`}>
                  {iconMap[value.icon]}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {value.title[language]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description[language]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

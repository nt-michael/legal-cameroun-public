'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GestionPricingTier } from '@/lib/modification-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText, getText } from '@/lib/translations';

const sectionText = {
  badge: { fr: 'Tarifs Transparents', en: 'Transparent Pricing' },
  recommended: { fr: 'Recommandé', en: 'Recommended' },
};

gsap.registerPlugin(ScrollTrigger);

interface GestionPricingCardsProps {
  tiers: GestionPricingTier[];
  title?: string | BilingualText;
  subtitle?: string | BilingualText;
  note?: string | BilingualText;
}

export default function GestionPricingCards({
  tiers,
  title = 'Nos Forfaits',
  subtitle = 'Des solutions adaptées à vos besoins',
  note,
}: GestionPricingCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            {sectionText.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {getText(title, language)}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {getText(subtitle, language)}
          </p>
        </div>

        <div className={`grid gap-8 ${tiers.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {tiers.map((tier, index) => (
            <div
              key={tier.name[language]}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`relative rounded-3xl p-8 ${
                tier.highlighted
                  ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-2xl shadow-primary-600/30 scale-105'
                  : 'bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-secondary-500 text-white text-sm font-semibold rounded-full">
                  {sectionText.recommended[language]}
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {tier.name[language]}
                </h3>
                <p className={`text-sm ${tier.highlighted ? 'text-primary-100' : 'text-gray-600 dark:text-gray-400'}`}>
                  {tier.description[language]}
                </p>
              </div>

              <div className="mb-6">
                {tier.pricePrefix && (
                  <p className={`text-sm font-medium mb-1 ${
                    tier.highlighted ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {tier.pricePrefix[language]}
                  </p>
                )}
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {tier.price}
                  </span>
                </div>
                {tier.priceNote && (
                  <p className={`text-sm mt-1 ${tier.highlighted ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {tier.priceNote[language]}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 shrink-0 mt-0.5 ${tier.highlighted ? 'text-primary-200' : 'text-green-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={tier.highlighted ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
                      {feature[language]}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-white text-primary-600 hover:bg-primary-50'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {tier.ctaText[language]}
              </Link>
            </div>
          ))}
        </div>

        {note && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-6 py-3 inline-block">
              <svg className="w-4 h-4 inline mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {getText(note, language)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

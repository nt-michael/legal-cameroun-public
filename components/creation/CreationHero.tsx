'use client';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import TrustBadges from './TrustBadges';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText } from '@/lib/translations';

const heroText = {
  badge: { fr: "Creation d'entreprise au Cameroun", en: 'Business Creation in Cameroon' },
};

interface CreationHeroProps {
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  primaryCta: {
    text: BilingualText;
    href: string;
  };
  secondaryCta?: {
    text: BilingualText;
    href: string;
  };
  showTrustBadges?: boolean;
}

export default function CreationHero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  showTrustBadges = true,
}: CreationHeroProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language } = useLanguage();

  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary-400/30 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary-300/40 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div
          ref={ref}
          className={`text-center max-w-4xl mx-auto ${
            inView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          {/* Badge */}
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6">
            {heroText.badge[language]}
          </span>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {title[language]}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-primary-200 font-medium mb-4">
            {subtitle[language]}
          </p>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            {description[language]}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-primary-500/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {primaryCta.text[language]}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-white/20"
              >
                {secondaryCta.text[language]}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            )}
          </div>

          {/* Trust Badges */}
          {showTrustBadges && (
            <div className="pt-8 border-t border-white/10">
              <TrustBadges variant="dark" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
    </section>
  );
}

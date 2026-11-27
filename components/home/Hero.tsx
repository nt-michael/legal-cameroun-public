'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { drawParticles } from './heroParticles';

const heroContent = {
  badge: {
    fr: 'Plateforme d\'accompagnement juridique, comptable et fiscale',
    en: 'Legal, accounting, and tax support platform',
  },
  title1: {
    fr: 'Votre LEGALTECH au Cameroun.',
    en: 'Your LEGALTECH in Cameroon.',
  },
  subtitle: {
    fr: "Statuts, immatriculation, modifications : des juristes basés au Cameroun s'occupent de vos démarches, avec des tarifs annoncés à l'avance.",
    en: 'Articles, registration, amendments: lawyers based in Cameroon handle your paperwork, with prices stated upfront.',
  },
  ctaPrimary: {
    fr: 'Créer mon entreprise',
    en: 'Create my company',
  },
  ctaSecondary: {
    fr: 'Voir les tarifs',
    en: 'See prices',
  },
  stats: [
    { value: { fr: '300+', en: '300+' }, label: { fr: 'clients satisfaits', en: 'satisfied clients' } },
    { value: { fr: '5', en: '5' }, label: { fr: "années d'expérience", en: 'years of experience' } },
    { value: { fr: '500+', en: '500+' }, label: { fr: 'entreprises installées', en: 'businesses established' } },
  ],
  statsTitle: { fr: 'Legal Cameroun en chiffres', en: 'Legal Cameroun in figures' },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (!canvasRef.current) return;
    return drawParticles(canvasRef.current, sectionRef.current);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[70svh] lg:min-h-[78vh] flex items-center justify-center overflow-hidden pt-28 pb-20" style={{ background: 'linear-gradient(to bottom right, #041c28, #0a3d4f, #041c28)' }}>
      {/* Particle canvas, drawn by heroParticles.ts */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50" />

      {/* Content: text first, key figures in a band underneath, over the particles */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-12 lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-down">
              <span className="eyebrow text-secondary-300!">
                {heroContent.badge[language]}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up animation-delay-100">
              {heroContent.title1[language]}
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 animate-fade-in-up animation-delay-200">
              {heroContent.subtitle[language]}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-300">
              <Link href="/contact?sujet=creation" className="btn-gold text-lg px-8 py-4">
                {heroContent.ctaPrimary[language]}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/tarifs" className="btn-secondary text-lg px-8 py-4 border-white/30! text-white! hover:bg-white hover:text-gray-900">
                {heroContent.ctaSecondary[language]}
              </Link>
            </div>
          </div>

          {/* Key figures band */}
          <div className="animate-fade-in-up animation-delay-400">
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm px-6 py-6 sm:px-8 lg:flex lg:items-center lg:gap-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-secondary-300 mb-5 text-center lg:mb-0 lg:text-left lg:shrink-0 lg:max-w-[12rem]">
                {heroContent.statsTitle[language]}
              </p>
              <ul className="grid grid-cols-3 gap-4 lg:flex-1 lg:divide-x lg:divide-white/15">
                {heroContent.stats.map((stat) => (
                  <li key={stat.value.fr} className="text-center lg:px-6">
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{stat.value[language]}</span>
                    <span className="block mt-1 text-xs sm:text-sm text-gray-300">{stat.label[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

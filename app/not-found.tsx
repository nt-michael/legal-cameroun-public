'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const text = {
  number: '404',
  title: { fr: 'Page introuvable', en: 'Page Not Found' },
  description: {
    fr: "La page que vous recherchez n'existe pas ou a été déplacée.",
    en: 'The page you are looking for does not exist or has been moved.',
  },
  home: { fr: "Retour à l'accueil", en: 'Back to Home' },
};

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#0a3d4f] to-[#041c28] dark:from-[#020e14] dark:to-[#000508]">
      {/* Decorative blur orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        {/* Icon */}
        <div className="w-24 h-24 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>

        {/* 404 number */}
        <p className="text-8xl font-extrabold text-primary-300 mb-4 leading-none">
          {text.number}
        </p>

        {/* Headline */}
        <h1 className="text-2xl font-bold text-white mb-4">
          {text.title[language]}
        </h1>

        {/* Description */}
        <p className="text-primary-200/70 dark:text-gray-400 mb-8">
          {text.description[language]}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {text.home[language]}
        </Link>
      </div>
    </main>
  );
}

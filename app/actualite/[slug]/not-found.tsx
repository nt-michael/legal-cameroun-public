'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const text = {
  title: { fr: 'Article non trouvé', en: 'Article Not Found' },
  description: {
    fr: "L'article que vous recherchez n'existe pas ou a été déplacé.",
    en: 'The article you are looking for does not exist or has been moved.',
  },
  backButton: { fr: 'Retour aux actualités', en: 'Back to News' },
};

export default function PostNotFound() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-primary-600 dark:text-primary-400\" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {text.title[language]}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          {text.description[language]}
        </p>
        <Link
          href="/actualite"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {text.backButton[language]}
        </Link>
      </div>
    </main>
  );
}

'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const text = {
  title: { fr: 'Article temporairement indisponible', en: 'Article Temporarily Unavailable' },
  description: {
    fr: "Cet article existe, mais nous n'avons pas pu le charger. Merci de réessayer dans un instant.",
    en: 'This article exists, but we could not load it. Please try again in a moment.',
  },
  retryButton: { fr: 'Réessayer', en: 'Try again' },
  backButton: { fr: 'Retour aux actualités', en: 'Back to News' },
};

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language } = useLanguage();

  useEffect(() => {
    console.error('Failed to render post page', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {text.title[language]}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          {text.description[language]}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.023 9.348h4.992V4.356m-4.992 4.992l3.181-3.183a8.25 8.25 0 00-13.803 3.7M4.031 9.865v4.99h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7" />
            </svg>
            {text.retryButton[language]}
          </button>
          <Link
            href="/actualite"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {text.backButton[language]}
          </Link>
        </div>
      </div>
    </main>
  );
}

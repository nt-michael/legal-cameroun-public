'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import DevisWizard from '@/components/devis/DevisWizard';

const pageText = {
  badge: { fr: '100% Gratuit & Sans Engagement', en: '100% Free & No Commitment' },
  title: { fr: 'Demandez Votre Devis Personnalisé', en: 'Request Your Personalized Quote' },
  subtitle: {
    fr: 'Répondez à quelques questions. Un juriste vous envoie votre devis personnalisé par e-mail sous 48h.',
    en: 'Answer a few questions. A lawyer emails you a personalized quote within 48 hours.',
  },
  loading: { fr: 'Chargement du formulaire...', en: 'Loading form...' },
  stat1Label: { fr: 'Entrepreneurs accompagnés', en: 'Entrepreneurs supported' },
  stat2Label: { fr: 'Délai de réponse', en: 'Response time' },
  stat3Label: { fr: 'Experts', en: 'Experts' },
  stat4Label: { fr: 'Clients satisfaits', en: 'Satisfied clients' },
  reassuranceTitle: { fr: 'Votre devis en toute sérénité', en: 'Your quote, worry-free' },
  reassurance: [
    { fr: 'Gratuit et sans engagement', en: 'Free and no commitment' },
    { fr: 'Devis par e-mail sous 48h', en: 'Quote by email within 48h' },
    { fr: 'Informations confidentielles', en: 'Confidential information' },
  ],
  helpTitle: { fr: 'Une question sur votre projet ?', en: 'A question about your project?' },
  helpLink: { fr: 'Parler à un expert', en: 'Talk to an expert' },
};

const checkIcon = (
  <svg className="w-4 h-4 text-section-accompagnement shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

export default function DevisPageContent() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative pt-28 pb-16 lg:pt-36 lg:pb-24"
        style={{ background: 'linear-gradient(to bottom right, #041c28, #0a3d4f, #041c28)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-4">
            {pageText.badge[language]}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {pageText.title[language]}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {pageText.subtitle[language]}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Wizard Section */}
      <section className="py-12 lg:py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* The reassurance stays in view at every step: beside the form on desktop, above it on mobile */}
          <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-start lg:justify-center lg:gap-8">
            <aside className="lg:w-72 lg:shrink-0 lg:sticky lg:top-28">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 lg:p-6">
                <p className="hidden lg:block font-bold text-gray-900 dark:text-white mb-4">{pageText.reassuranceTitle[language]}</p>
                <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:block lg:space-y-3">
                  {pageText.reassurance.map((item) => (
                    <li key={item.fr} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                      {checkIcon}
                      {item[language]}
                    </li>
                  ))}
                </ul>
                <div className="hidden lg:block mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{pageText.helpTitle[language]}</p>
                  <Link href="/prendre-un-rendez-vous" className="text-sm font-medium text-primary-600 hover:underline">
                    {pageText.helpLink[language]}
                  </Link>
                </div>
              </div>
            </aside>

            <div className="flex-1 min-w-0 lg:max-w-3xl">
              <Suspense fallback={
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 text-center">
                  <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">{pageText.loading[language]}</p>
                </div>
              }>
                <DevisWizard />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{pageText.stat1Label[language]}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">48h</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{pageText.stat2Label[language]}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{pageText.stat3Label[language]}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">300+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{pageText.stat4Label[language]}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

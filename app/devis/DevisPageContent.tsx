'use client';

import { Suspense } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import DevisWizard from '@/components/devis/DevisWizard';

const pageText = {
  badge: { fr: '100% Gratuit & Sans Engagement', en: '100% Free & No Commitment' },
  title: { fr: 'Demandez Votre Devis Personnalisé', en: 'Request Your Personalized Quote' },
  subtitle: {
    fr: 'Répondez à quelques questions et recevez une proposition détaillée sous 24h. Nos experts vous accompagnent dans votre projet.',
    en: 'Answer a few questions and receive a detailed proposal within 24 hours. Our experts will guide you through your project.',
  },
  loading: { fr: 'Chargement du formulaire...', en: 'Loading form...' },
  stat1Label: { fr: 'Entrepreneurs accompagnés', en: 'Entrepreneurs supported' },
  stat2Label: { fr: 'Délai de réponse', en: 'Response time' },
  stat3Label: { fr: 'Experts', en: 'Experts' },
  stat4Label: { fr: 'Clients satisfaits', en: 'Satisfied clients' },
};

export default function DevisPageContent() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative py-16 lg:py-24"
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
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
      </section>

      {/* Wizard Section */}
      <section className="py-12 lg:py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 text-center">
              <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">{pageText.loading[language]}</p>
            </div>
          }>
            <DevisWizard />
          </Suspense>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">15 000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{pageText.stat1Label[language]}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-1">24h</div>
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

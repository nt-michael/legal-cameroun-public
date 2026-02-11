'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { legalForms } from '@/lib/creation-data';
import { useLanguage } from '@/contexts/LanguageContext';

const sectionText = {
  badge: { fr: 'Comparateur', en: 'Comparison Tool' },
  title: { fr: 'Quelle Forme Juridique Choisir ?', en: 'Which Legal Form to Choose?' },
  subtitle: {
    fr: 'Comparez les differentes options pour trouver la structure adaptee a votre projet.',
    en: 'Compare the different options to find the structure suited to your project.',
  },
  advantages: { fr: 'Avantages', en: 'Advantages' },
  cautions: { fr: "Points d'attention", en: 'Points of Caution' },
  learnMore: { fr: 'En savoir plus', en: 'Learn more' },
  startNow: { fr: 'Demarrez maintenant', en: 'Start now' },
  talkExpert: { fr: 'Parler à un expert', en: 'Talk to an expert' },
};

export default function LegalFormsComparison() {
  const [activeTab, setActiveTab] = useState(legalForms[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedTab, setDisplayedTab] = useState(legalForms[0].id);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language } = useLanguage();

  const activeForm = legalForms.find(form => form.id === displayedTab) || legalForms[0];

  const handleTabChange = (formId: string) => {
    if (formId === activeTab || isTransitioning) return;

    setIsTransitioning(true);
    setActiveTab(formId);

    // Wait for fade out, then switch content and fade in
    setTimeout(() => {
      setDisplayedTab(formId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

  return (
    <section id="comparateur" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
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

        <div ref={ref} className={inView ? 'animate-fade-in' : 'opacity-0'}>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {legalForms.map((form) => (
              <button
                key={form.id}
                onClick={() => handleTabChange(form.id)}
                disabled={isTransitioning}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeTab === form.id
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:scale-105'
                } ${isTransitioning ? 'pointer-events-none' : ''}`}
              >
                {form.shortName[language]}
              </button>
            ))}
          </div>

          {/* Active Form Content */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: Info */}
              <div
                className={`p-8 lg:p-12 transition-all duration-300 ease-out ${
                  isTransitioning
                    ? 'opacity-0 -translate-x-4'
                    : 'opacity-100 translate-x-0'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {activeForm.name[language]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {activeForm.description[language]}
                </p>

                {/* Advantages */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {sectionText.advantages[language]}
                  </h4>
                  <ul className="space-y-2">
                    {activeForm.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                        {advantage[language]}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disadvantages */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {sectionText.cautions[language]}
                  </h4>
                  <ul className="space-y-2">
                    {activeForm.disadvantages.map((disadvantage, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 shrink-0" />
                        {disadvantage[language]}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href={activeForm.href}
                  className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  {sectionText.learnMore[language]}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Right: Visual/Summary Card */}
              <div
                className={`p-8 lg:p-12 flex items-center justify-center transition-all duration-300 ease-out ${
                  isTransitioning
                    ? 'opacity-0 translate-x-4'
                    : 'opacity-100 translate-x-0'
                }`}
                style={{ background: 'linear-gradient(to bottom right, #0a3d4f, #062735)' }}
              >
                <div className="text-center text-white">
                  <div className={`w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm transition-transform duration-500 ${
                    isTransitioning ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
                  }`}>
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{activeForm.shortName[language]}</h4>
                  <p className="text-primary-100 mb-6 max-w-xs mx-auto">
                    {activeForm.description[language]}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/devis"
                      className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105"
                    >
                      {sectionText.startNow[language]}
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105"
                    >
                      {sectionText.talkExpert[language]}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

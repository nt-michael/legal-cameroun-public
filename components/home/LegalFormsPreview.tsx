'use client';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import { legalForms, startingTier } from '@/lib/creation-data';

const sectionText = {
  badge: { fr: 'Création d\'entreprise', en: 'Company formation' },
  heading: { fr: 'Quelle forme pour votre projet ?', en: 'Which structure fits your project?' },
  subheading: {
    fr: 'Choisissez votre statut pour voir ce qui est inclus et lancer votre création.',
    en: 'Pick a structure to see what is included and start your formation.',
  },
  from: { fr: 'À partir de', en: 'From' },
  learnMore: { fr: 'Voir le détail', en: 'See details' },
  unsure: { fr: 'Vous hésitez ?', en: 'Not sure?' },
  compare: { fr: 'Comparer les statuts', en: 'Compare structures' },
  quote: { fr: 'Obtenir mon devis gratuit', en: 'Get my free quote' },
};

export default function LegalFormsPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { language } = useLanguage();
  const formatter = new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US');

  return (
    <section className="section-padding bg-white dark:bg-gray-900" id="statuts">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-medium mb-4">
            {sectionText.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {sectionText.heading[language]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {sectionText.subheading[language]}
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {legalForms.map((form, index) => {
            const tier = startingTier(form.id);
            return (
              <Link
                key={form.id}
                href={form.href ?? '/creation-entreprise'}
                className={`group bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 card-hover flex flex-col ${
                  inView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                  {form.name[language]}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 flex-grow">
                  {form.description[language]}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{sectionText.from[language]}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {formatter.format(tier.price)} FCFA
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tier.period[language]}</p>
                <span className="inline-flex items-center text-primary-600 font-medium text-sm mt-auto">
                  {sectionText.learnMore[language]}
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/devis" className="btn-primary">
            {sectionText.quote[language]}
          </Link>
          <p className="text-gray-600 dark:text-gray-300">
            {sectionText.unsure[language]}{' '}
            <Link href="/creation-entreprise#comparateur" className="text-primary-600 font-medium hover:underline">
              {sectionText.compare[language]}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

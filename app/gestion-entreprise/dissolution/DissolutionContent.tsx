'use client';

import Link from 'next/link';
import GestionPricingCards from '@/components/gestion/GestionPricingCards';
import GestionDocumentsChecklist from '@/components/gestion/GestionDocumentsChecklist';
import FAQSection from '@/components/creation/FAQSection';
import { dissolutionData, gestionCtaData } from '@/lib/gestion-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { getText } from '@/lib/translations';

const pageText = {
  breadcrumbHome: { fr: 'Accueil', en: 'Home' },
  breadcrumbGestion: { fr: "Gestion d'entreprise", en: 'Business Management' },
  breadcrumbCurrent: { fr: 'Dissolution', en: 'Dissolution' },
  ctaPrimary: { fr: 'Dissoudre ma Soci\u00e9t\u00e9', en: 'Dissolve my Company' },
  ctaSecondary: { fr: 'Consultation Gratuite', en: 'Free Consultation' },
  whyTitle: { fr: 'Pourquoi Dissoudre Votre Soci\u00e9t\u00e9 ?', en: 'Why Dissolve Your Company?' },
  altTitle: { fr: 'Dissolution vs Mise en Sommeil', en: 'Dissolution vs Dormancy' },
  altPermanent: { fr: 'D\u00e9finitif', en: 'Permanent' },
  altTemporary: { fr: 'Temporaire', en: 'Temporary' },
  phasesBadge: { fr: 'Processus en 2 Phases', en: '2-Phase Process' },
  phasesTitle: { fr: 'Dissolution & Liquidation', en: 'Dissolution & Liquidation' },
  documentsTitle: { fr: 'Documents N\u00e9cessaires', en: 'Required Documents' },
  documentsSubtitle: { fr: 'Pr\u00e9parez votre dossier de dissolution', en: 'Prepare your dissolution file' },
  pricingTitle: { fr: 'Nos Forfaits Dissolution', en: 'Our Dissolution Packages' },
  pricingSubtitle: { fr: 'Choisissez la formule adapt\u00e9e \u00e0 votre situation', en: 'Choose the package suited to your situation' },
  faqTitle: { fr: 'Questions Fr\u00e9quentes', en: 'Frequently Asked Questions' },
  faqSubtitle: { fr: "Tout sur la dissolution d'entreprise", en: 'Everything about company dissolution' },
};

export default function DissolutionContent() {
  const { language } = useLanguage();
  const { hero, whyDissolve, alternatives, processPhases, liquidatorRole, employeeObligations, documents, pricingTiers, faq } = dissolutionData;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative py-20 lg:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, #041c28, #7f1d1d, #041c28)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex justify-center mb-6">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white">{pageText.breadcrumbHome[language]}</Link></li>
                <li>/</li>
                <li><Link href="/gestion-entreprise" className="hover:text-white">{pageText.breadcrumbGestion[language]}</Link></li>
                <li>/</li>
                <li className="text-white">{pageText.breadcrumbCurrent[language]}</li>
              </ol>
            </nav>

            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-red-300 text-sm font-medium mb-6">
              {getText(hero.badge, language)}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {getText(hero.title, language)}
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              {getText(hero.subtitle, language)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/devis?service=dissolution"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {pageText.ctaPrimary[language]}
              </Link>
              <Link
                href="/prendre-un-rendez-vous"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                {pageText.ctaSecondary[language]}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </section>

      {/* Why Dissolve Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {pageText.whyTitle[language]}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {whyDissolve.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400 mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {getText(item.title, language)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {getText(item.description, language)}
                </p>
              </div>
            ))}
          </div>

          {/* Alternatives Comparison */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {pageText.altTitle[language]}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {alternatives.map((alt) => (
                <div
                  key={getText(alt.type, language)}
                  className={`rounded-2xl p-6 border-2 ${
                    alt.permanent
                      ? 'border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                      : 'border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      alt.permanent
                        ? 'bg-red-200 dark:bg-red-800'
                        : 'bg-amber-200 dark:bg-amber-800'
                    }`}>
                      {alt.permanent ? (
                        <svg className="w-5 h-5 text-red-700 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-amber-700 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <h4 className={`font-bold ${
                      alt.permanent
                        ? 'text-red-800 dark:text-red-200'
                        : 'text-amber-800 dark:text-amber-200'
                    }`}>
                      {getText(alt.type, language)}
                    </h4>
                  </div>
                  <p className={`text-sm ${
                    alt.permanent
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-amber-700 dark:text-amber-300'
                  }`}>
                    {getText(alt.description, language)}
                  </p>
                  <span className={`inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full ${
                    alt.permanent
                      ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                      : 'bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200'
                  }`}>
                    {alt.permanent ? pageText.altPermanent[language] : pageText.altTemporary[language]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Phases */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
              {pageText.phasesBadge[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {pageText.phasesTitle[language]}
            </h2>
          </div>

          <div className="space-y-12">
            {processPhases.map((phase, phaseIndex) => (
              <div key={getText(phase.phase, language)}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    phaseIndex === 0 ? 'bg-primary-600' : 'bg-secondary-600'
                  }`}>
                    {phaseIndex + 1}
                  </span>
                  {getText(phase.phase, language)}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {phase.steps.map((step) => (
                    <div
                      key={step.number}
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-3 ${
                        phaseIndex === 0 ? 'bg-primary-600' : 'bg-secondary-600'
                      }`}>
                        {step.number}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {getText(step.title, language)}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getText(step.description, language)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liquidator Role & Employee Obligations */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Liquidator Role */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {getText(liquidatorRole.title, language)}
                </h3>
              </div>
              <ul className="space-y-3">
                {liquidatorRole.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{getText(item, language)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Employee Obligations */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-amber-200 dark:bg-amber-800 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-700 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200">
                  {getText(employeeObligations.title, language)}
                </h3>
              </div>
              <ul className="space-y-3">
                {employeeObligations.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-amber-800 dark:text-amber-200">{getText(item, language)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <GestionDocumentsChecklist
        documents={documents}
        title={pageText.documentsTitle}
        subtitle={pageText.documentsSubtitle}
      />

      {/* Pricing */}
      <GestionPricingCards
        tiers={pricingTiers}
        title={pageText.pricingTitle}
        subtitle={pageText.pricingSubtitle}
      />

      {/* FAQ */}
      <FAQSection
        items={faq}
        title={pageText.faqTitle}
        subtitle={pageText.faqSubtitle}
      />

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {getText(gestionCtaData.title, language)}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {getText(gestionCtaData.subtitle, language)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis?service=dissolution" className="btn-primary">
              {pageText.ctaPrimary[language]}
            </Link>
            <Link href={gestionCtaData.secondaryCta.href} className="btn-secondary">
             {getText(gestionCtaData.secondaryCta.text, language)}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

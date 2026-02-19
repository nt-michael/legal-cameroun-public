'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import GestionTimeline from '@/components/modification/GestionTimeline';
import SocieteTypeTabs from '@/components/modification/SocieteTypeTabs';
import GestionPricingCards from '@/components/modification/GestionPricingCards';
import GestionDocumentsChecklist from '@/components/modification/GestionDocumentsChecklist';
import ModificationTypesGrid from '@/components/modification/ModificationTypesGrid';
import FAQSection from '@/components/creation/FAQSection';
import {
  hubHeroData,
  whyModifyReasons,
  hubProcessSteps,
  hubPricingTiers,
  hubDocuments,
  hubFAQ,
  gestionCtaData,
} from '@/lib/modification-data';

const reasonIcons: Record<string, React.ReactNode> = {
  location: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  money: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  transform: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  user: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

export default function GestionPageContent() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative py-20 lg:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, #041c28, #0a3d4f, #041c28)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6">
              {hubHeroData.badge[language]}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {hubHeroData.title[language]}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {hubHeroData.subtitle[language]}
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {hubHeroData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white/80">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature[language]}</span>
                  {index < hubHeroData.features.length - 1 && (
                    <span className="mx-2 text-white/30">|</span>
                  )}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/devis?service=modification"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {{ fr: 'Modifier mes Statuts', en: 'Modify my Statutes' }[language]}
              </Link>
              <Link
                href="/prendre-un-rendez-vous"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ fr: 'Consultation Gratuite', en: 'Free Consultation' }[language]}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
              {hubHeroData.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label[language]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </section>

      {/* Why Modify Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
              {{ fr: 'Pourquoi Modifier ?', en: 'Why Modify?' }[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {{ fr: 'Pourquoi Modifier Vos Statuts ?', en: 'Why Modify Your Statutes?' }[language]}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {{ fr: 'La modification des statuts est une formalit\u00e9 importante qui intervient suite \u00e0 des changements en cours de vie sociale.', en: 'Statute modification is an important formality that occurs following changes during the company\'s lifetime.' }[language]}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyModifyReasons.map((reason, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  {reasonIcons[reason.icon]}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {reason.title[language]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {reason.description[language]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-amber-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                  {{ fr: 'Important \u00e0 savoir', en: 'Important to know' }[language]}
                </h4>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  {{ fr: 'Les formalit\u00e9s varient selon la forme juridique : la SAS offre une grande flexibilit\u00e9 tandis que la SARL est plus encadr\u00e9e par la loi.', en: 'Formalities vary according to the legal form: the SAS offers great flexibility while the SARL is more regulated by law.' }[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <GestionTimeline
        steps={hubProcessSteps}
        title={{ fr: 'Processus G\u00e9n\u00e9ral en 5 \u00c9tapes', en: 'General Process in 5 Steps' }}
        subtitle={{ fr: "De votre demande \u00e0 l'enregistrement au greffe", en: 'From your request to court registration' }}
        badge={{ fr: 'Comment \u00c7a Marche', en: 'How It Works' }}
      />

      {/* Societe Type Tabs */}
      <SocieteTypeTabs />

      {/* Modification Types Grid */}
      <ModificationTypesGrid />

      {/* Pricing Cards */}
      <GestionPricingCards
        tiers={hubPricingTiers}
        title={{ fr: 'Nos Forfaits Modification', en: 'Our Modification Packages' }}
        subtitle={{ fr: 'Choisissez la formule adapt\u00e9e \u00e0 vos besoins', en: 'Choose the package suited to your needs' }}
        note={{ fr: 'Co\u00fbts variables selon le type de modification (ex: double annonce l\u00e9gale si transfert inter-d\u00e9partements)', en: 'Variable costs depending on modification type (e.g., double legal notice if inter-department transfer)' }}
      />

      {/* Documents Checklist */}
      <GestionDocumentsChecklist
        documents={hubDocuments}
        title={{ fr: 'Documents N\u00e9cessaires', en: 'Required Documents' }}
        subtitle={{ fr: 'Pr\u00e9parez votre dossier complet', en: 'Prepare your complete file' }}
      />

      {/* FAQ */}
      <FAQSection
        items={hubFAQ}
        title={{ fr: 'Questions Fr\u00e9quentes', en: 'Frequently Asked Questions' }}
        subtitle={{ fr: 'Tout ce que vous devez savoir sur la modification des statuts', en: 'Everything you need to know about statute modifications' }}
      />

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {gestionCtaData.title[language]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {gestionCtaData.subtitle[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={gestionCtaData.primaryCta.href}
              className="btn-primary"
            >
              {gestionCtaData.primaryCta.text[language]}
            </Link>
            <Link
              href={gestionCtaData.secondaryCta.href}
              className="btn-secondary"
            >
              {gestionCtaData.secondaryCta.text[language]}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

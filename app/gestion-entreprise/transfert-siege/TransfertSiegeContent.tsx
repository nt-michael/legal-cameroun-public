'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import GestionTimeline from '@/components/gestion/GestionTimeline';
import GestionPricingCards from '@/components/gestion/GestionPricingCards';
import GestionDocumentsChecklist from '@/components/gestion/GestionDocumentsChecklist';
import FAQSection from '@/components/creation/FAQSection';
import { transfertSiegeData, gestionCtaData } from '@/lib/gestion-data';

const pageText = {
  breadcrumbHome: { fr: 'Accueil', en: 'Home' },
  breadcrumbGestion: { fr: "Gestion d'entreprise", en: 'Business Management' },
  breadcrumbCurrent: { fr: 'Transfert de si\u00e8ge', en: 'Office Transfer' },
  ctaPrimary: { fr: 'Transf\u00e9rer mon Si\u00e8ge', en: 'Transfer my Office' },
  ctaSecondary: { fr: 'Consultation Gratuite', en: 'Free Consultation' },
  whyTitle: { fr: 'Pourquoi Transf\u00e9rer Votre Si\u00e8ge ?', en: 'Why Transfer Your Office?' },
  attentionBadge: { fr: 'Attention', en: 'Note' },
  casTitle: { fr: 'M\u00eame ou Diff\u00e9rent D\u00e9partement ?', en: 'Same or Different Department?' },
  casSubtitle: { fr: 'Le co\u00fbt et les formalit\u00e9s varient selon la localisation du nouveau si\u00e8ge', en: 'The cost and formalities vary depending on the new office location' },
  timelineTitle: { fr: 'Proc\u00e9dure de Transfert', en: 'Transfer Procedure' },
  timelineSubtitle: { fr: 'Les \u00e9tapes pour transf\u00e9rer votre si\u00e8ge social', en: 'The steps to transfer your registered office' },
  timelineBadge: { fr: 'Processus', en: 'Process' },
  documentsTitle: { fr: 'Documents N\u00e9cessaires', en: 'Required Documents' },
  documentsSubtitle: { fr: 'Pr\u00e9parez votre dossier de transfert', en: 'Prepare your transfer file' },
  pricingTitle: { fr: 'Nos Forfaits Transfert', en: 'Our Transfer Packages' },
  pricingSubtitle: { fr: 'Choisissez la formule adapt\u00e9e \u00e0 votre situation', en: 'Choose the package suited to your situation' },
  faqTitle: { fr: 'Questions Fr\u00e9quentes', en: 'Frequently Asked Questions' },
  faqSubtitle: { fr: 'Tout sur le transfert de si\u00e8ge social', en: 'Everything about registered office transfer' },
};

const whyIcons: Record<string, React.ReactNode> = {
  gift: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  home: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  money: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function TransfertSiegeContent() {
  const { language } = useLanguage();
  const { hero, whyTransfer, processSteps, casTypes, documents, pricingTiers, faq } = transfertSiegeData;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative py-20 lg:py-32 overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)' }}
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

            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6">
              {hero.badge[language]}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {hero.title[language]}
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              {hero.subtitle[language]}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/devis?service=transfert-siege"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg"
              >
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

        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </section>

      {/* Why Transfer Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {pageText.whyTitle[language]}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyTransfer.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-4">
                  {whyIcons[item.icon]}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {item.title[language]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <GestionTimeline
        steps={processSteps}
        title={pageText.timelineTitle}
        subtitle={pageText.timelineSubtitle}
        badge={pageText.timelineBadge}
      />

      {/* Cas Types Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium mb-4">
              {pageText.attentionBadge[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {pageText.casTitle[language]}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {pageText.casSubtitle[language]}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {casTypes.map((cas) => (
              <div
                key={cas.id}
                className={`rounded-2xl p-6 border-2 ${
                  cas.highlight
                    ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    cas.highlight
                      ? 'bg-amber-200 dark:bg-amber-800'
                      : 'bg-green-100 dark:bg-green-900/30'
                  }`}>
                    {cas.highlight ? (
                      <svg className="w-6 h-6 text-amber-700 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-bold mb-2 ${
                      cas.highlight
                        ? 'text-amber-800 dark:text-amber-200'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {cas.title[language]}
                    </h3>
                    <p className={`text-sm mb-2 ${
                      cas.highlight
                        ? 'text-amber-700 dark:text-amber-300'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {cas.description[language]}
                    </p>
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                      cas.highlight
                        ? 'bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    }`}>
                      {cas.cost[language]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
            {gestionCtaData.title[language]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {gestionCtaData.subtitle[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis?service=transfert-siege" className="btn-primary">
              {pageText.ctaPrimary[language]}
            </Link>
            <Link href={gestionCtaData.secondaryCta.href} className="btn-secondary">
              {gestionCtaData.secondaryCta.text[language]}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

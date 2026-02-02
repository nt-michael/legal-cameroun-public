'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import GestionTimeline from '@/components/gestion/GestionTimeline';
import GestionPricingCards from '@/components/gestion/GestionPricingCards';
import GestionDocumentsChecklist from '@/components/gestion/GestionDocumentsChecklist';
import FAQSection from '@/components/creation/FAQSection';
import { sasVersSarlData, gestionCtaData } from '@/lib/gestion-data';

const pageText = {
  breadcrumbHome: { fr: 'Accueil', en: 'Home' },
  breadcrumbGestion: { fr: "Gestion d'entreprise", en: 'Business Management' },
  breadcrumbCurrent: { fr: 'SAS vers SARL', en: 'SAS to SARL' },
  ctaPrimary: { fr: 'Transformer ma SAS', en: 'Convert my SAS' },
  ctaSecondary: { fr: 'Consultation Gratuite', en: 'Free Consultation' },
  advantagesBadge: { fr: 'Avantages', en: 'Advantages' },
  whyTitle: { fr: 'Pourquoi Passer en SARL ?', en: 'Why Switch to SARL?' },
  timelineTitle: { fr: 'Proc\u00e9dure de Transformation', en: 'Conversion Procedure' },
  timelineSubtitle: { fr: 'Les \u00e9tapes pour transformer votre SAS en SARL', en: 'The steps to convert your SAS into an SARL' },
  timelineBadge: { fr: 'Processus', en: 'Process' },
  infoTitle: { fr: 'Bon \u00e0 savoir', en: 'Good to know' },
  infoText: { fr: 'La transformation de SAS en SARL n\u00e9cessite la nomination d\u2019un commissaire \u00e0 la transformation qui v\u00e9rifiera que les capitaux propres sont au moins \u00e9gaux au capital social. Cette proc\u00e9dure garantit la protection des associ\u00e9s et des cr\u00e9anciers.', en: 'The conversion from SAS to SARL requires the appointment of a transformation auditor who will verify that equity is at least equal to the share capital. This procedure ensures the protection of partners and creditors.' },
  documentsTitle: { fr: 'Documents N\u00e9cessaires', en: 'Required Documents' },
  documentsSubtitle: { fr: 'Pr\u00e9parez votre dossier de transformation', en: 'Prepare your conversion file' },
  pricingTitle: { fr: 'Nos Forfaits Transformation', en: 'Our Conversion Packages' },
  pricingSubtitle: { fr: 'Choisissez la formule adapt\u00e9e \u00e0 votre situation', en: 'Choose the package suited to your situation' },
  faqTitle: { fr: 'Questions Fr\u00e9quentes', en: 'Frequently Asked Questions' },
  faqSubtitle: { fr: 'Tout sur la transformation SAS en SARL', en: 'Everything about SAS to SARL conversion' },
};

const advantageIcons: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  user: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  lock: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

export default function SasVersSarlContent() {
  const { language } = useLanguage();
  const { hero, advantages, processSteps, documents, pricingTiers, faq } = sasVersSarlData;

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
                href="/devis?service=sas-sarl"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
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

        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </section>

      {/* Advantages Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-4">
              {pageText.advantagesBadge[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {pageText.whyTitle[language]}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                  {advantageIcons[item.icon]}
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

      {/* Info Box */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
                  {pageText.infoTitle[language]}
                </h4>
                <p className="text-primary-700 dark:text-primary-300 text-sm">
                  {pageText.infoText[language]}
                </p>
              </div>
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
            {gestionCtaData.title[language]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {gestionCtaData.subtitle[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis?service=sas-sarl" className="btn-primary">
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

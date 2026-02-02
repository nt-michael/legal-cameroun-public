'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import GestionTimeline from '@/components/gestion/GestionTimeline';
import GestionPricingCards from '@/components/gestion/GestionPricingCards';
import GestionDocumentsChecklist from '@/components/gestion/GestionDocumentsChecklist';
import FAQSection from '@/components/creation/FAQSection';
import { sarlVersSasData, gestionCtaData } from '@/lib/gestion-data';

const pageText = {
  breadcrumbHome: { fr: 'Accueil', en: 'Home' },
  breadcrumbGestion: { fr: "Gestion d'entreprise", en: 'Business Management' },
  breadcrumbCurrent: { fr: 'SARL vers SAS', en: 'SARL to SAS' },
  ctaPrimary: { fr: 'Transformer ma SARL', en: 'Convert my SARL' },
  ctaSecondary: { fr: 'Consultation Gratuite', en: 'Free Consultation' },
  advantagesBadge: { fr: 'Avantages', en: 'Advantages' },
  whyTitle: { fr: 'Pourquoi Passer en SAS ?', en: 'Why Switch to SAS?' },
  compBefore: { fr: 'Avant', en: 'Before' },
  compAfter: { fr: 'Apr\u00e8s', en: 'After' },
  compSarlItem1: { fr: 'R\u00e8gles encadr\u00e9es par la loi', en: 'Rules regulated by law' },
  compSarlItem2: { fr: 'Cession de parts avec agr\u00e9ment', en: 'Share transfer with approval' },
  compSarlItem3: { fr: 'Majorit\u00e9s fixes', en: 'Fixed majorities' },
  compSasItem1: { fr: 'Libert\u00e9 statutaire totale', en: 'Total statutory freedom' },
  compSasItem2: { fr: 'Cession libre (sauf statuts)', en: 'Free transfer (unless articles state otherwise)' },
  compSasItem3: { fr: 'Flexibilit\u00e9 des d\u00e9cisions', en: 'Decision-making flexibility' },
  timelineTitle: { fr: 'Proc\u00e9dure de Transformation', en: 'Conversion Procedure' },
  timelineSubtitle: { fr: 'Les \u00e9tapes pour transformer votre SARL en SAS', en: 'The steps to convert your SARL into an SAS' },
  timelineBadge: { fr: 'Processus', en: 'Process' },
  documentsTitle: { fr: 'Documents N\u00e9cessaires', en: 'Required Documents' },
  documentsSubtitle: { fr: 'Pr\u00e9parez votre dossier de transformation', en: 'Prepare your conversion file' },
  pricingTitle: { fr: 'Nos Forfaits Transformation', en: 'Our Conversion Packages' },
  pricingSubtitle: { fr: 'Choisissez la formule adapt\u00e9e \u00e0 votre situation', en: 'Choose the package suited to your situation' },
  faqTitle: { fr: 'Questions Fr\u00e9quentes', en: 'Frequently Asked Questions' },
  faqSubtitle: { fr: 'Tout sur la transformation SARL en SAS', en: 'Everything about SARL to SAS conversion' },
};

const advantageIcons: Record<string, React.ReactNode> = {
  freedom: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  transfer: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  user: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  check: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function SarlVersSasContent() {
  const { language } = useLanguage();
  const { hero, advantages, processSteps, documents, pricingTiers, faq } = sarlVersSasData;

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
                href="/devis?service=sarl-sas"
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

      {/* Comparison Box */}
      <section className="py-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-gray-600 dark:text-gray-400">SARL</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">{pageText.compBefore[language]}</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {pageText.compSarlItem1[language]}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {pageText.compSarlItem2[language]}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {pageText.compSarlItem3[language]}
                </li>
              </ul>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white">SAS</span>
                </div>
                <h3 className="font-bold text-primary-800 dark:text-primary-200">{pageText.compAfter[language]}</h3>
              </div>
              <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {pageText.compSasItem1[language]}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {pageText.compSasItem2[language]}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {pageText.compSasItem3[language]}
                </li>
              </ul>
            </div>
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
            <Link href="/devis?service=sarl-sas" className="btn-primary">
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

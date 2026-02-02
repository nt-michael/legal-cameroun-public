'use client';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { SubpageData, PricingTier } from '@/lib/creation-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText, Language } from '@/lib/translations';

const layoutText = {
  advantages: { fr: 'Avantages', en: 'Advantages' },
  cautions: { fr: "Points d'attention", en: 'Points of Caution' },
  docsTitle: { fr: 'Documents & Exigences', en: 'Documents & Requirements' },
  docsSubtitle: { fr: 'Voici les elements necessaires pour constituer votre dossier.', en: 'Here are the elements needed to build your file.' },
  howItWorks: { fr: 'Comment Ca Marche ?', en: 'How It Works?' },
  howItWorksSubtitle: { fr: 'Un processus simple et rapide avec notre accompagnement expert.', en: 'A simple and fast process with our expert support.' },
  comparison: { fr: 'Comparatif', en: 'Comparison' },
  comparisonSubtitle: { fr: "Comparez les caracteristiques principales avec d'autres formes juridiques.", en: 'Compare key features with other legal forms.' },
  pricing: { fr: 'Nos Forfaits', en: 'Our Packages' },
  pricingSubtitle: { fr: 'Choisissez la formule adaptee a vos besoins.', en: 'Choose the plan that suits your needs.' },
  faq: { fr: 'Questions Frequentes', en: 'Frequently Asked Questions' },
  faqSubtitle: { fr: 'Retrouvez les reponses aux questions les plus posees.', en: 'Find answers to the most frequently asked questions.' },
  readyTitle: { fr: 'Pret a Creer Votre Entreprise ?', en: 'Ready to Create Your Business?' },
  readySubtitle: { fr: 'Lancez-vous des maintenant avec notre accompagnement expert.', en: 'Get started now with our expert support.' },
  startQuestionnaire: { fr: 'Demarrer le Questionnaire', en: 'Start the Questionnaire' },
  viewAllStatuses: { fr: 'Voir tous les statuts', en: 'View all statuses' },
  startNow: { fr: 'Demarrer maintenant', en: 'Start now' },
  talkExpert: { fr: 'Parler a un expert', en: 'Talk to an expert' },
};
import CreationHero from './CreationHero';
import StepsTimeline from './StepsTimeline';
import PricingCards from './PricingCards';
import FAQSection from './FAQSection';
import ComparisonTable from './ComparisonTable';
import TrustBadges from './TrustBadges';

interface SubpageLayoutProps {
  data: SubpageData;
  pricingTiers: PricingTier[];
}

function AdvantagesSection({ advantages, disadvantages, language }: { advantages: BilingualText[]; disadvantages?: BilingualText[]; language: Language }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {/* Advantages */}
          <div
            className={`bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 ${
              inView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{layoutText.advantages[language]}</h3>
            </div>
            <ul className="space-y-3">
              {advantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{advantage[language]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disadvantages (if provided) */}
          {disadvantages && disadvantages.length > 0 && (
            <div
              className={`bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-8 ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '100ms' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{layoutText.cautions[language]}</h3>
              </div>
              <ul className="space-y-3">
                {disadvantages.map((disadvantage, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{disadvantage[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WhyCreateSection({ title, content, language }: { title: BilingualText; content: BilingualText[]; language: Language }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {title[language]}
          </h2>
          <div className="space-y-4 text-left">
            {content.map((paragraph, index) => (
              <p
                key={index}
                className="flex items-start gap-3 text-lg text-gray-600 dark:text-gray-300"
              >
                <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {paragraph[language]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RequirementsSection({ requirements, language }: { requirements: BilingualText[]; language: Language }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {layoutText.docsTitle[language]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {layoutText.docsSubtitle[language]}
          </p>
        </div>

        <div
          ref={ref}
          className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 ${
            inView ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <ul className="grid sm:grid-cols-2 gap-4">
            {requirements.map((requirement, index) => (
              <li
                key={index}
                className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm"
              >
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{requirement[language]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function SubpageLayout({ data, pricingTiers }: SubpageLayoutProps) {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <CreationHero
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        description={data.heroDescription}
        primaryCta={{
          text: layoutText.startNow,
          href: `/devis?type=${data.slug}`,
        }}
        secondaryCta={{
          text: layoutText.talkExpert,
          href: '/contact',
        }}
        showTrustBadges={true}
      />

      {/* Why Create */}
      <WhyCreateSection
        title={data.whyCreate.title}
        content={data.whyCreate.content}
        language={language}
      />

      {/* Steps */}
      <section className="bg-white dark:bg-gray-900">
        <StepsTimeline
          steps={data.steps}
          title={layoutText.howItWorks[language]}
          subtitle={layoutText.howItWorksSubtitle[language]}
          variant="vertical"
        />
      </section>

      {/* Advantages/Disadvantages */}
      <AdvantagesSection
        advantages={data.advantages}
        disadvantages={data.disadvantages}
        language={language}
      />

      {/* Comparison Table */}
      {data.comparison && (
        <section className="bg-gray-50 dark:bg-gray-800">
          <ComparisonTable
            headers={data.comparison.headers}
            rows={data.comparison.rows}
            title={layoutText.comparison[language]}
            subtitle={layoutText.comparisonSubtitle[language]}
          />
        </section>
      )}

      {/* Requirements */}
      {data.requirements && data.requirements.length > 0 && (
        <RequirementsSection requirements={data.requirements} language={language} />
      )}

      {/* Pricing */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <PricingCards
          tiers={pricingTiers}
          title={layoutText.pricing[language]}
          subtitle={layoutText.pricingSubtitle[language]}
        />
      </section>

      {/* FAQ */}
      <FAQSection
        items={data.faq}
        title={layoutText.faq[language]}
        subtitle={layoutText.faqSubtitle[language]}
      />

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-3xl p-8 sm:p-12"
            style={{ background: 'linear-gradient(to right, #2563eb, #1e40af)' }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {layoutText.readyTitle[language]}
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              {layoutText.readySubtitle[language]}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/devis?type=${data.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105"
              >
                {layoutText.startQuestionnaire[language]}
              </Link>
              <Link
                href="/creation-entreprise"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                {layoutText.viewAllStatuses[language]}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

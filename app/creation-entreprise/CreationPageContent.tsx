'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  CreationHero,
  WhyChooseUsSection,
  LegalFormsComparison,
  StepsTimeline,
  PricingCards,
  AidesAvantages,
  SubpagesGrid,
} from '@/components/creation';
import { hubHero, generalSteps, pricingTiers } from '@/lib/creation-data';

const pageText = {
  ctaTitle: {
    fr: "Pr\u00eat \u00e0 Lancer Votre Entreprise ?",
    en: "Ready to Launch Your Business?",
  },
  ctaDescription: {
    fr: "Nos experts sont l\u00e0 pour vous accompagner. B\u00e9n\u00e9ficiez d\u2019une consultation gratuite pour discuter de votre projet.",
    en: "Our experts are here to support you. Benefit from a free consultation to discuss your project.",
  },
  ctaPrimary: {
    fr: "D\u00e9marrer le Questionnaire",
    en: "Start the Questionnaire",
  },
  ctaSecondary: {
    fr: "R\u00e9server une Consultation",
    en: "Book a Consultation",
  },
};

export default function CreationPageContent() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <CreationHero
        title={hubHero.title}
        subtitle={hubHero.subtitle}
        description={hubHero.description}
        primaryCta={hubHero.primaryCta}
        secondaryCta={hubHero.secondaryCta}
        showTrustBadges={true}
      />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Legal Forms Comparison */}
      <LegalFormsComparison />

      {/* Steps Timeline */}
      <StepsTimeline
        steps={generalSteps}
        title={{ fr: "Comment \u00c7a Marche ?", en: "How Does It Work?" }}
        subtitle={{ fr: "De la cr\u00e9ation de votre dossier \u00e0 l\u2019immatriculation, nous vous accompagnons \u00e0 chaque \u00e9tape.", en: "From creating your file to registration, we guide you through every step." }}
        variant="vertical"
      />

      {/* Pricing */}
      <section className="bg-gray-50 dark:bg-gray-800">
        <PricingCards
          tiers={pricingTiers}
          title={{ fr: "Nos Forfaits", en: "Our Packages" }}
          subtitle={{ fr: "Des solutions adapt\u00e9es \u00e0 chaque besoin, de l\u2019essentiel au premium avec traitement acc\u00e9l\u00e9r\u00e9.", en: "Solutions tailored to every need, from essential to premium with expedited processing." }}
        />
      </section>

      {/* Aides & Avantages */}
      <AidesAvantages />

      {/* Subpages Grid */}
      <SubpagesGrid />

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-3xl p-8 sm:p-12 lg:p-16"
            style={{ background: 'linear-gradient(to right, #0a3d4f, #062735)' }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {pageText.ctaTitle[language]}
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              {pageText.ctaDescription[language]}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-all duration-300 hover:scale-105"
              >
                {pageText.ctaPrimary[language]}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                {pageText.ctaSecondary[language]}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

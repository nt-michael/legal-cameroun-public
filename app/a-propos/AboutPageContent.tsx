'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import AboutHero from '@/components/about/AboutHero';
import AboutTimeline from '@/components/about/AboutTimeline';
import WhoWeAre from '@/components/about/WhoWeAre';
import ValuesGrid from '@/components/about/ValuesGrid';
import OfficesSection from '@/components/about/OfficesSection';
import TestimonialsCarousel from '@/components/about/TestimonialsCarousel';
import { finalCtaData } from '@/lib/about-data';

export default function AboutPageContent() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <AboutHero />

      {/* Timeline Section */}
      <AboutTimeline />

      {/* Who We Are Section */}
      <WhoWeAre />

      {/* Values Grid */}
      <ValuesGrid />

      {/* Offices Section */}
      <OfficesSection />

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Final CTA Section */}
      <section
        className="py-20 lg:py-32 relative overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #2563eb, #1e40af)',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-primary-300/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {finalCtaData.title[language]}
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {finalCtaData.description[language]}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={finalCtaData.primaryCta.href}
              className="group inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-10 py-5 rounded-2xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {finalCtaData.primaryCta.text[language]}
            </Link>
            <Link
              href={finalCtaData.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {finalCtaData.secondaryCta.text[language]}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

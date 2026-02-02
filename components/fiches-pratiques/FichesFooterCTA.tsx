'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fichesHubData } from '@/lib/fiches-pratiques-data';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function FichesFooterCTA() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={contentRef}>
          {/* Text */}
          <p className="text-gray-600 dark:text-gray-400 italic mb-4">
            {fichesHubData.footer.text[language]}
          </p>
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-8">
            {fichesHubData.footer.question[language]}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={fichesHubData.footer.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-teal-500/20 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {fichesHubData.footer.primaryCta.text[language]}
            </Link>
            <Link
              href={fichesHubData.footer.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 px-8 py-4 rounded-xl font-semibold border-2 border-teal-600 dark:border-teal-400 hover:bg-teal-50 dark:hover:bg-gray-700 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {fichesHubData.footer.secondaryCta.text[language]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';
import { aboutHeroData, whoWeAreData } from '@/lib/about-data';

const linkText = { fr: 'En savoir plus sur nous', en: 'Learn more about us' };

// Same words as the About page: people, not an automated form, handle each file
export default function HomeTeam() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { language } = useLanguage();

  return (
    <section className="section-padding bg-white dark:bg-gray-900">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
          inView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <div className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-secondary-50 dark:bg-gray-800 flex items-center justify-center">
          <Image src="/custom-icons/SVG/36ICONE_BICHROME.svg" alt="" width={88} height={88} />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {aboutHeroData.tagline[language]}
          </h2>
          <p className="text-lg font-medium text-primary-600 dark:text-primary-300 mb-4">{whoWeAreData.intro[language]}</p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{whoWeAreData.team[language]}</p>
          <Link href="/a-propos" className="inline-flex items-center text-primary-600 dark:text-primary-300 font-medium hover:underline">
            {linkText[language]}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

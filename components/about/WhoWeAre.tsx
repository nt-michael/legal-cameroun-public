'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whoWeAreData } from '@/lib/about-data';
import { useLanguage } from '@/contexts/LanguageContext';

const sectionText = {
  badge: { fr: 'Qui Sommes-Nous ?', en: 'Who Are We?' },
  titleLine1: { fr: 'Plus qu\'une plateforme,', en: 'More Than a Platform,' },
  titleLine2: { fr: 'Une Famille', en: 'A Family' },
  weLove: { fr: 'Nous aimons :', en: 'We love:' },
  ourPromise: { fr: 'Notre promesse', en: 'Our promise' },
  legalExperts: { fr: 'Experts', en: 'Experts' },
  countriesCovered: { fr: 'Pays couverts', en: 'Countries covered' },
  entrepreneursSupported: { fr: 'Entrepreneurs accompagnés', en: 'Entrepreneurs supported' },
};

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Text content animation
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={textRef} className="space-y-10">

          {/* Child 1 — Badge + Title */}
          <div>
            <span className="eyebrow">
              {sectionText.badge[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {sectionText.titleLine1[language]}<br />
              <span className="text-secondary-700 dark:text-secondary-300">
                {sectionText.titleLine2[language]}
              </span>
            </h2>
          </div>

          {/* Child 2 — Paragraphs + "Nous aimons" box */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
                {whoWeAreData.intro[language]}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {whoWeAreData.team[language]}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {whoWeAreData.diversity[language]}
              </p>
            </div>

            {/* What we love */}
            <div className="bg-secondary-50 dark:bg-secondary-800/20 rounded-2xl p-6 border border-secondary-200 dark:border-secondary-800">
              <h4 className="font-semibold text-secondary-800 dark:text-secondary-300 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {sectionText.weLove[language]}
              </h4>
              <ul className="space-y-3">
                {whoWeAreData.loves.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-secondary-800 dark:text-secondary-200">
                    <span className="text-secondary-500 mt-1">•</span>
                    <span>{item[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Child 3 — Stats row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-6 border border-primary-200 dark:border-primary-800 text-center">
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">50+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{sectionText.legalExperts[language]}</p>
            </div>
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-800/20 dark:to-secondary-800/20 rounded-2xl p-6 border border-secondary-200 dark:border-secondary-800 text-center">
              <p className="text-3xl font-bold text-secondary-700 dark:text-secondary-400">3</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{sectionText.countriesCovered[language]}</p>
            </div>
            <div className="bg-primary-50 dark:bg-gray-800 rounded-2xl p-6 border border-primary-100 dark:border-gray-700 text-center">
              <p className="text-3xl font-bold text-primary-600">1 500+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{sectionText.entrepreneursSupported[language]}</p>
            </div>
          </div>

          {/* Child 4 — Promise */}
          <div className="flex items-center gap-4 pt-4">
            <div className="w-1 h-16 bg-secondary-400 rounded-full" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{sectionText.ourPromise[language]}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {whoWeAreData.promise[language]}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

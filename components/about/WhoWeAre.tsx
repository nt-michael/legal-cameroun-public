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
  legalExperts: { fr: 'Juristes experts', en: 'Legal experts' },
  countriesCovered: { fr: 'Pays couverts', en: 'Countries covered' },
};

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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

      // Image parallax effect
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Subtle parallax
        gsap.to(imageRef.current, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div ref={textRef} className="space-y-6">
            <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium">
              {sectionText.badge[language]}
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {sectionText.titleLine1[language]}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                {sectionText.titleLine2[language]}
              </span>
            </h2>

            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
              {whoWeAreData.intro[language]}
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              {whoWeAreData.team[language]}
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              {whoWeAreData.diversity[language]}
            </p>

            {/* What we love */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {sectionText.weLove[language]}
              </h4>
              <ul className="space-y-3">
                {whoWeAreData.loves.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-amber-900 dark:text-amber-200">
                    <span className="text-amber-500 mt-1">•</span>
                    <span>{item[language]}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promise */}
            <div className="flex items-center gap-4 pt-4">
              <div className="w-1 h-16 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{sectionText.ourPromise[language]}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {whoWeAreData.promise[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div ref={imageRef} className="relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-800/30 dark:to-orange-800/30 rounded-3xl blur-xl opacity-50" />

            {/* Main visual card */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-400" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#pattern)" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-6">
                {/* Team icon grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center"
                    >
                      <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-amber-400">50+</p>
                    <p className="text-sm text-gray-400">{sectionText.legalExperts[language]}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-400">3</p>
                    <p className="text-sm text-gray-400">{sectionText.countriesCovered[language]}</p>
                  </div>
                </div>

                {/* Location badge */}
                <div className="flex items-center justify-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="text-sm text-gray-300">Akwa, Douala</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FichePratique } from '@/lib/fiches-pratiques-data';
import { useLanguage } from '@/contexts/LanguageContext';

const templateText = {
  backToGuides: { fr: 'Retour aux Fiches Pratiques', en: 'Back to Practical Guides' },
  downloadableResources: { fr: 'Ressources Téléchargeables', en: 'Downloadable Resources' },
};

gsap.registerPlugin(ScrollTrigger);

interface FichePageTemplateProps {
  fiche: FichePratique;
}

const icons = {
  scale: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  building: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  laptop: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  calendar: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

export default function FichePageTemplate({ fiche }: FichePageTemplateProps) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.animate-in'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
        );
      }

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll('.content-block'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Resources animation
      if (resourcesRef.current) {
        gsap.fromTo(
          resourcesRef.current.querySelectorAll('.resource-btn'),
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: resourcesRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleResourceHover = (e: React.MouseEvent<HTMLAnchorElement>, isEntering: boolean) => {
    gsap.to(e.currentTarget, {
      scale: isEntering ? 1.02 : 1,
      boxShadow: isEntering
        ? '0 10px 30px rgba(13, 148, 136, 0.25)'
        : '0 4px 6px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'ppt':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        );
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-400/10 rounded-full blur-2xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="animate-in mb-6">
            <Link
              href="/fiches-pratiques"
              className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {templateText.backToGuides[language]}
            </Link>
          </nav>

          {/* Icon */}
          <div className="animate-in w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-primary-300 mb-6">
            {icons[fiche.icon]}
          </div>

          {/* Title */}
          <h1 className="animate-in text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {fiche.title[language]}
          </h1>

          {/* Intro */}
          <p className="animate-in text-xl text-gray-300">
            {fiche.heroIntro[language]}
          </p>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {fiche.content.map((block, index) => (
              <div key={index} className="content-block">
                {block.type === 'heading' && block.title && (
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {block.title[language]}
                  </h2>
                )}

                {block.type === 'paragraph' && block.text && (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {block.text[language]}
                  </p>
                )}

                {block.type === 'list' && block.items && (
                  <ul className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 space-y-3">
                    {block.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{item[language]}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {block.type === 'accordion' && block.title && (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {block.title[language]}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${openAccordion === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openAccordion === index && block.text && (
                      <div className="p-4 bg-white dark:bg-gray-900">
                        <p className="text-gray-600 dark:text-gray-400">{block.text[language]}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image if exists */}
          {fiche.image && (
            <div className="mt-12 content-block">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={fiche.image}
                  alt={(fiche.imageAlt && fiche.imageAlt[language]) || fiche.title[language]}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 lg:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {templateText.downloadableResources[language]}
          </h2>

          <div
            ref={resourcesRef}
            className={`grid gap-4 ${fiche.resources.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-md mx-auto'}`}
          >
            {fiche.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => handleResourceHover(e, true)}
                onMouseLeave={(e) => handleResourceHover(e, false)}
                className="resource-btn flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:border-teal-300 dark:hover:border-teal-600 transition-colors"
              >
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {resource.title[language]}
                  </p>
                  {resource.language && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-500 dark:text-gray-400">
                      {resource.language}
                    </span>
                  )}
                </div>
                <svg className="w-5 h-5 text-teal-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-16 lg:py-20"
        style={{
          background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {fiche.ctaTitle[language]}
          </h2>
          <p className="text-teal-100 mb-8">
            {fiche.ctaDescription[language]}
          </p>
          <Link
            href={fiche.ctaButtonHref}
            className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-300 shadow-lg hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {fiche.ctaButtonText[language]}
          </Link>
        </div>
      </section>
    </main>
  );
}

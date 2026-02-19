'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { officesData } from '@/lib/about-data';
import { useLanguage } from '@/contexts/LanguageContext';

const sectionText = {
  badge: { fr: 'Notre Reseau', en: 'Our Network' },
  title: { fr: 'Présents là où Vous Êtes', en: 'Present Where You Are' },
  subtitle: {
    fr: 'Du Boulevard de la Liberté à Akwa jusqu\'aux Champs-Élysées — nous connectons les mondes pour votre succès.',
    en: 'From Boulevard de la Liberté in Akwa to the Champs-Élysées — we connect worlds for your success.',
  },
  headquarters: { fr: 'Siège principal', en: 'Headquarters' },
};

gsap.registerPlugin(ScrollTrigger);

const cityColors: Record<string, { bg: string; text: string; accent: string }> = {
  Douala: { bg: 'bg-primary-600', text: 'text-primary-600', accent: 'border-primary-500' },
  Paris: { bg: 'bg-primary-500', text: 'text-primary-500', accent: 'border-primary-400' },
  Cotonou: { bg: 'bg-primary-400', text: 'text-primary-400', accent: 'border-primary-300' },
};

export default function OfficesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Map animation
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: mapRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Hover effect - zoom on map pin
        const pin = card.querySelector('.office-pin');
        if (pin) {
          card.addEventListener('mouseenter', () => {
            gsap.to(pin, { scale: 1.2, duration: 0.3, ease: 'power2.out' });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(pin, { scale: 1, duration: 0.3, ease: 'power2.out' });
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            {sectionText.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {sectionText.title[language]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {sectionText.subtitle[language]}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <div ref={mapRef} className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-8 aspect-square relative overflow-hidden">
              {/* Simplified Africa/Europe map visualization */}
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                {/* Connection lines */}
                <path
                  d="M100 120 Q 200 80, 250 180 T 300 280"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  className="animate-pulse"
                />
                <path
                  d="M100 120 Q 150 200, 300 280"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  opacity="0.5"
                />

                {/* Paris pin */}
                <g className="cursor-pointer" transform="translate(100, 100)">
                  <circle r="20" fill="url(#parisGlow)" opacity="0.3" />
                  <circle r="12" className="fill-primary-500" />
                  <text y="35" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300 text-xs font-medium">Paris</text>
                </g>

                {/* Douala pin */}
                <g className="cursor-pointer" transform="translate(250, 200)">
                  <circle r="25" fill="url(#doualaGlow)" opacity="0.4" className="animate-ping" style={{ animationDuration: '3s' }} />
                  <circle r="16" className="fill-primary-600" />
                  <circle r="6" className="fill-white" />
                  <text y="40" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300 text-xs font-bold">Douala</text>
                </g>

                {/* Cotonou pin */}
                <g className="cursor-pointer" transform="translate(300, 280)">
                  <circle r="18" fill="url(#cotonouGlow)" opacity="0.3" />
                  <circle r="10" className="fill-primary-400" />
                  <text y="30" textAnchor="middle" className="fill-gray-600 dark:fill-gray-300 text-xs font-medium">Cotonou</text>
                </g>

                {/* Gradients */}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0a6a85" />
                    <stop offset="50%" stopColor="#0a3d4f" />
                    <stop offset="100%" stopColor="#083242" />
                  </linearGradient>
                  <radialGradient id="parisGlow">
                    <stop offset="0%" stopColor="#0a6a85" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <radialGradient id="doualaGlow">
                    <stop offset="0%" stopColor="#0a3d4f" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <radialGradient id="cotonouGlow">
                    <stop offset="0%" stopColor="#26819b" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-primary-600" />
                  <span className="text-gray-600 dark:text-gray-300">{sectionText.headquarters[language]}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Office Cards */}
          <div className="space-y-4">
            {officesData.map((office, index) => {
              const colors = cityColors[office.city] || cityColors.Douala;
              return (
                <div
                  key={office.city}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className={`bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border-l-4 ${colors.accent} hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`office-pin w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center text-white shrink-0 transition-transform duration-300`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {office.city}
                        </h3>
                        <span className={`text-xs font-medium ${colors.text} dark:text-opacity-80 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full`}>
                          {office.role[language]}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                        {office.address[language]}
                      </p>
                      {(office.phone || office.email) && (
                        <div className="flex flex-wrap gap-4 text-sm">
                          {office.phone && (
                            <a href={`tel:${office.phone}`} className="flex items-center gap-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              {office.phone}
                            </a>
                          )}
                          {office.email && (
                            <a href={`mailto:${office.email}`} className="flex items-center gap-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Email
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineEvents } from '@/lib/about-data';
import { useLanguage } from '@/contexts/LanguageContext';

const sectionText = {
  badge: { fr: 'Notre Histoire', en: 'Our Story' },
  title: { fr: 'Une Aventure Qui Continue', en: 'An Ongoing Adventure' },
  subtitle: { fr: 'Nous grandissons avec vous depuis 2017', en: 'Growing with you since 2017' },
};

gsap.registerPlugin(ScrollTrigger);

const locationColors: Record<string, string> = {
  Paris: 'bg-primary-500',
  Douala: 'bg-amber-500',
  Cotonou: 'bg-green-500',
  Cameroun: 'bg-orange-500',
};

export default function AboutTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      // Animate the timeline line
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate each event with scale and glow effect
      eventsRef.current.forEach((event, index) => {
        if (!event) return;

        const pin = event.querySelector('.timeline-pin');
        const content = event.querySelector('.timeline-content');

        // Pin pulse animation
        gsap.fromTo(
          pin,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: event,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Content slide in
        gsap.fromTo(
          content,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: index * 0.2 + 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: event,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Pin glow on hover
        if (pin) {
          pin.addEventListener('mouseenter', () => {
            gsap.to(pin, { scale: 1.2, duration: 0.3, ease: 'power2.out' });
          });
          pin.addEventListener('mouseleave', () => {
            gsap.to(pin, { scale: 1, duration: 0.3, ease: 'power2.out' });
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium mb-4">
            {sectionText.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {sectionText.title[language]}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {sectionText.subtitle[language]}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-orange-500 to-amber-600 origin-top"
            style={{ transform: 'translateX(-50%)' }}
          />

          <div className="space-y-12 lg:space-y-16">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                ref={(el) => { eventsRef.current[index] = el; }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Pin */}
                <div
                  className={`timeline-pin absolute left-8 lg:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10 cursor-pointer transition-shadow duration-300 hover:shadow-lg hover:shadow-amber-500/30 ${
                    locationColors[event.location || 'Cameroun'] || 'bg-amber-500'
                  }`}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>

                {/* Content Card */}
                <div
                  className={`timeline-content ml-24 lg:ml-0 lg:w-[calc(50%-4rem)] ${
                    index % 2 === 0 ? 'lg:mr-auto lg:pr-8 lg:text-right' : 'lg:ml-auto lg:pl-8 lg:text-left'
                  }`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                      <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                        {event.year}
                      </span>
                      {event.location && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {event.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {event.title[language]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {event.description[language]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

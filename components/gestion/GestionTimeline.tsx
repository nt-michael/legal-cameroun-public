'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GestionStep } from '@/lib/gestion-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText, getText } from '@/lib/translations';

gsap.registerPlugin(ScrollTrigger);

interface GestionTimelineProps {
  steps: GestionStep[];
  title?: string | BilingualText;
  subtitle?: string | BilingualText;
  badge?: string | BilingualText;
}

export default function GestionTimeline({
  steps,
  title = 'Comment Ça Marche',
  subtitle = 'Un processus simple et efficace',
  badge = 'Processus',
}: GestionTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      // Animate the vertical line
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

      // Animate each step
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            {getText(badge, language)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {getText(title, language)}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {getText(subtitle, language)}
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-primary-600 origin-top"
            style={{ transform: 'translateX(-50%)' }}
          />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[index] = el; }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Number Circle */}
                <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-600/30 z-10">
                  {step.number}
                </div>

                {/* Content Card */}
                <div className={`ml-24 lg:ml-0 lg:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title[language]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description[language]}
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

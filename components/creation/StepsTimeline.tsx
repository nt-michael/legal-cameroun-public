'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Step } from '@/lib/creation-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText, getText } from '@/lib/translations';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepsTimelineProps {
  steps: Step[];
  title?: string | BilingualText;
  subtitle?: string | BilingualText;
  variant?: 'horizontal' | 'vertical';
}

export default function StepsTimeline({
  steps,
  title,
  subtitle,
  variant = 'horizontal'
}: StepsTimelineProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language } = useLanguage();

  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // GSAP animation for timeline line and steps
  useEffect(() => {
    if (!containerRef.current || !inView) return;

    const ctx = gsap.context(() => {
      // Animate the timeline line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: variant === 'horizontal' ? 0 : 1, scaleY: variant === 'vertical' ? 0 : 1 },
          {
            scaleX: 1,
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.out',
          }
        );
      }

      // Animate step circles
      const circles = containerRef.current?.querySelectorAll('.step-circle');
      if (circles) {
        gsap.fromTo(
          circles,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            delay: 0.3,
          }
        );
      }

      // Animate step content cards
      const cards = containerRef.current?.querySelectorAll('.step-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out',
            delay: 0.5,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [inView, variant]);

  if (variant === 'vertical') {
    return (
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {getText(title, language)}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {getText(subtitle, language)}
                </p>
              )}
            </div>
          )}

          <div ref={(node) => { ref(node); containerRef.current = node; }} className="relative">
            {/* Vertical line */}
            <div ref={lineRef} className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-300 origin-top" />

            <div className="space-y-8">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex gap-6"
                >
                  {/* Step number circle */}
                  <div className="step-circle relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white text-xl font-bold shadow-lg shadow-primary-500/30 shrink-0">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="step-card flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title[language]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Horizontal variant (default)
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {getText(title, language)}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {getText(subtitle, language)}
              </p>
            )}
          </div>
        )}

        <div ref={(node) => { ref(node); containerRef.current = node; }} className="relative">
          {/* Horizontal line - hidden on mobile */}
          <div ref={lineRef} className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-500 to-primary-200 origin-left" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative text-center"
              >
                {/* Step number circle */}
                <div className="step-circle relative z-10 mx-auto mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white text-2xl font-bold shadow-xl shadow-primary-500/30 transition-transform duration-300 hover:scale-110">
                  {step.number}
                </div>

                {/* Arrow between steps - hidden on mobile */}
                {index < steps.length - 1 && (
                  <div className="step-arrow hidden xl:block absolute top-12 -right-4 transform -translate-y-1/2 text-primary-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="step-card bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title[language]}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.description[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

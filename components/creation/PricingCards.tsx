'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { PricingTier } from '@/lib/creation-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText, getText } from '@/lib/translations';

interface PricingCardsProps {
  tiers: PricingTier[];
  title?: string | BilingualText;
  subtitle?: string | BilingualText;
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-secondary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR').format(price);
}

export default function PricingCards({ tiers, title, subtitle }: PricingCardsProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language } = useLanguage();

  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP animations for pricing cards
  useEffect(() => {
    if (!containerRef.current || !inView) return;

    const ctx = gsap.context(() => {
      // Animate pricing cards
      const cards = containerRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
          }
        );
      }

      // Animate badges
      const badges = containerRef.current?.querySelectorAll('.pricing-badge');
      if (badges) {
        gsap.fromTo(
          badges,
          { y: -20, opacity: 0, scale: 0.5 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.6,
            ease: 'back.out(2)',
          }
        );
      }

      // Animate feature list items
      const features = containerRef.current?.querySelectorAll('.pricing-feature');
      if (features) {
        gsap.fromTo(
          features,
          { x: -10, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.4,
            ease: 'power2.out',
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [inView]);

  return (
    <section className="py-16 lg:py-24">
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

        <div
          ref={(node) => { ref(node); containerRef.current = node; }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {tiers.map((tier) => (
            <div
              key={tier.name[language]}
              // Same sober card for every plan; the recommended one only gets a gold frame and badge
              className={`pricing-card relative flex flex-col rounded-2xl p-8 bg-white dark:bg-gray-800 ${tier.highlighted ? 'border-2 border-secondary-400 shadow-xl shadow-secondary-400/20' : 'border border-gray-200 dark:border-gray-700'}`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="pricing-badge absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1.5 bg-secondary-400 text-navy-deep text-sm font-semibold rounded-full">
                    {tier.badge[language]}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {tier.name[language]}
                </h3>
                {tier.pricePrefix && (
                  <p className="text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">
                    {tier.pricePrefix[language]}
                  </p>
                )}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-bold text-secondary-700 dark:text-secondary-300">
                    {formatPrice(tier.price)}
                  </span>
                  {/* FCFA everywhere on the site, whatever the data file says */}
                  <span className="text-lg text-gray-500 dark:text-gray-400">FCFA</span>
                </div>
                <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                  {tier.period[language]}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="pricing-feature flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature[language]}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={tier.cta.href}
                className={tier.highlighted ? 'btn-gold w-full py-3' : 'block w-full text-center py-3 px-6 rounded-lg font-semibold border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors'}
              >
                {tier.cta.text[language]}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

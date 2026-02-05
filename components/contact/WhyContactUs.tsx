'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whyContactItems } from '@/lib/contact-data';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  user: (
    <Image src="/custom-icons/SVG/16ICONE_BICHROME.svg" alt="Person" width={32} height={32}
      className="brightness-0 invert" />
  ),
  location: (
    <Image src="/custom-icons/SVG/32ICONE_BICHROME.svg" alt="Location" width={32} height={32}
      className="brightness-0 invert" />
  ),
  globe: (
    <Image src="/custom-icons/SVG/43ICONE_BICHROME.svg" alt="International" width={32} height={32}
      className="brightness-0 invert" />
  ),
  shield: (
    <Image src="/custom-icons/SVG/45ICONE_BICHROME.svg" alt="Security" width={32} height={32}
      className="brightness-0 invert" />
  ),
};

export default function WhyContactUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pourquoi Nous Contacter Directement ?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez ce qui nous différencie et pourquoi nos clients nous recommandent.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyContactItems.map((item, index) => (
            <div
              key={item.title[language]}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-primary-500/30">
                {iconMap[item.icon]}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {item.title[language]}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

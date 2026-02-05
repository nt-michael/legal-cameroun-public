'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactOffices, officesFooterNote } from '@/lib/contact-data';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const cityColors: Record<string, { bg: string; border: string; icon: string }> = {
  Douala: { bg: 'bg-primary-50 dark:bg-primary-900/20', border: 'border-primary-500', icon: 'bg-primary-600' },
  Paris: { bg: 'bg-primary-50 dark:bg-primary-900/20', border: 'border-primary-400', icon: 'bg-primary-500' },
  Cotonou: { bg: 'bg-primary-50 dark:bg-primary-900/20', border: 'border-primary-300', icon: 'bg-primary-400' },
};

export default function ContactOffices() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
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

        // Hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            Nos Coordonnées
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Où Nous Trouver
          </h2>
        </div>

        {/* Office Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {contactOffices.map((office, index) => {
            const colors = cityColors[office.city[language]] || cityColors.Douala;
            return (
              <div
                key={office.city[language]}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`${colors.bg} rounded-2xl p-6 border-l-4 ${colors.border} transition-all duration-300 cursor-pointer ${
                  office.isPrimary ? 'ring-2 ring-primary-400 ring-offset-2 dark:ring-offset-gray-800' : ''
                }`}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center shrink-0`}>
                    <Image src="/custom-icons/SVG/32ICONE_bleue.svg" alt="Location" width={24} height={24}
                      className="brightness-0 invert" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {office.city[language]}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {office.role[language]}
                    </p>
                    {office.isPrimary && (
                      <span className="inline-block mt-1 text-xs font-semibold text-primary-700 dark:text-primary-300 bg-primary-200 dark:bg-primary-800 px-2 py-0.5 rounded-full">
                        Siège principal
                      </span>
                    )}
                  </div>
                </div>

                {/* Company name if exists */}
                {office.company && (
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {office.company}
                  </p>
                )}

                {/* Address */}
                <div className="mb-4">
                  {office.address.map((line, i) => (
                    <p key={i} className="text-gray-600 dark:text-gray-400 text-sm">
                      {line[language]}
                    </p>
                  ))}
                </div>

                {/* Contact info */}
                <div className="space-y-2">
                  {office.phone && (
                    <a
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {office.phone}
                    </a>
                  )}

                  {office.whatsapp && (
                    <a
                      href={`https://wa.me/${office.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                      <Image src="/custom-icons/SVG/52ICONE_bleue.svg" alt="WhatsApp" width={16} height={16} />
                      WhatsApp
                    </a>
                  )}

                  {office.email && (
                    <a
                      href={`mailto:${office.email}`}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Image src="/custom-icons/SVG/18ICONE_bleue.svg" alt="Email" width={16} height={16} />
                      {office.email}
                    </a>
                  )}

                  {office.hours && (
                    <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {office.hours[language]}
                    </p>
                  )}

                  {office.note && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-2">
                      {office.note[language]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {officesFooterNote[language]}
        </p>
      </div>
    </section>
  );
}

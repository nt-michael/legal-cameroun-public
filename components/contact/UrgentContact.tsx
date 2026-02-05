'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { urgentContactData } from '@/lib/contact-data';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  phone: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  whatsapp: (
    <Image src="/custom-icons/SVG/52ICONE_bleue.svg" alt="WhatsApp" width={24} height={24}
      className="brightness-0 invert" />
  ),
};

export default function UrgentContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Items animation
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const getItemStyles = (icon: string) => {
    switch (icon) {
      case 'phone':
        return 'bg-primary-600 hover:bg-primary-700 text-white';
      case 'calendar':
        return 'bg-primary-500 hover:bg-primary-600 text-white';
      case 'whatsapp':
        return 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {urgentContactData.title[language]}
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
        </div>

        {/* Contact Options */}
        <div className="grid sm:grid-cols-3 gap-4">
          {urgentContactData.items.map((item, index) => {
            const isExternal = item.href.startsWith('http') || item.href.startsWith('tel:');
            const Component = isExternal ? 'a' : Link;
            const extraProps = isExternal
              ? { target: item.href.startsWith('http') ? '_blank' : undefined, rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined }
              : {};

            return (
              <Component
                key={typeof item.text === 'string' ? item.text : item.text[language]}
                href={item.href}
                ref={(el: HTMLAnchorElement | null) => { itemsRef.current[index] = el; }}
                className={`flex flex-col items-center text-center p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${getItemStyles(item.icon)}`}
                {...extraProps}
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  {iconMap[item.icon]}
                </div>
                <p className="text-sm opacity-90 mb-1">{typeof item.text === 'string' ? item.text : item.text[language]}</p>
                <p className="font-semibold">{typeof item.action === 'string' ? item.action : item.action[language]}</p>
              </Component>
            );
          })}
        </div>
      </div>
    </section>
  );
}

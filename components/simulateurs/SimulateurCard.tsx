'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const cardText = {
  accessSimulator: { fr: 'Accéder au simulateur', en: 'Access the simulator' },
};

interface SimulateurCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  features: string[];
  index: number;
}

const icons: Record<string, React.ReactNode> = {
  percent: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
    </svg>
  ),
  building: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  users: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
};

const colorClasses: Record<string, { bg: string; icon: string; border: string; hover: string }> = {
  teal: {
    bg: 'bg-primary-50',
    icon: 'bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white',
    border: 'border-primary-100 hover:border-primary-300',
    hover: 'hover:shadow-primary-100/50',
  },
  gold: {
    bg: 'bg-yellow-50',
    icon: 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white',
    border: 'border-yellow-100 hover:border-yellow-300',
    hover: 'hover:shadow-yellow-100/50',
  },
  beige: {
    bg: 'bg-orange-50',
    icon: 'bg-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white',
    border: 'border-orange-100 hover:border-orange-300',
    hover: 'hover:shadow-orange-100/50',
  },
};

export default function SimulateurCard({
  title,
  description,
  icon,
  href,
  color,
  features,
  index,
}: SimulateurCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const colors = colorClasses[color] || colorClasses.teal;
  const { language } = useLanguage();

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import('gsap')).default;

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power3.out',
          }
        );

        // Hover animation
        cardRef.current.addEventListener('mouseenter', () => {
          gsap.to(cardRef.current, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
        });
        cardRef.current.addEventListener('mouseleave', () => {
          gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      }
    };

    loadGSAP();
  }, [index]);

  return (
    <Link
      ref={cardRef}
      href={href}
      className={`group block bg-white rounded-3xl p-8 border-2 ${colors.border} shadow-lg ${colors.hover} transition-all duration-300 opacity-0`}
    >
      {/* Icon */}
      <div className={`w-16 h-16 ${colors.icon} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300`}>
        {icons[icon]}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="flex items-center text-primary-600 font-medium">
        <span>{cardText.accessSimulator[language]}</span>
        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );
}

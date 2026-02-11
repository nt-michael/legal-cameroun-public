'use client';

import { useInView } from 'react-intersection-observer';
import { trustBadges } from '@/lib/creation-data';
import { useLanguage } from '@/contexts/LanguageContext';

interface TrustBadgesProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function TrustBadges({ variant = 'light', className = '' }: TrustBadgesProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language } = useLanguage();

  const isDark = variant === 'dark';

  return (
    <div
      ref={ref}
      // grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8
      className={`grid grid-cols-1 gap-6 md:flex md:flex-row md:justify-center md:items-center  ${className}`}
    >
      {trustBadges.map((badge, index) => (
        <div
          key={badge.label[language]}
          className={`text-center ${
            inView ? 'animate-fade-in-up opacity-100' : 'opacity-0'
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div
            className={`text-3xl sm:text-4xl font-bold mb-1 ${
              isDark ? 'text-white' : 'text-primary-600'
            }`}
          >
            {badge.value}
          </div>
          <div
            className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {badge.label[language]}
          </div>
        </div>
      ))}
    </div>
  );
}

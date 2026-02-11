'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

const stats = [
  {
    value: 300,
    suffix: '+',
    label: { fr: 'Clients Satisfaits', en: 'Satisfied Clients' },
    description: { fr: 'Entreprises et particuliers nous font confiance', en: 'Businesses and individuals trust us' },
  },
  {
    value: 8,
    suffix: '+',
    label: { fr: 'Annees d\'Experience', en: 'Years of Experience' },
    description: { fr: 'Au service de nos clients', en: 'At the service of our clients' },
  },
  {
    value: 15000,
    suffix: '+',
    label: { fr: 'Entreprises installées', en: 'Businesses established' },
    description: { fr: 'Entreprises Installées avec Succès ', en: 'Successfully Established Businesses' },
  },
  // {
  //   value: 98,
  //   suffix: '%',
  //   label: { fr: 'Taux de Succes', en: 'Success Rate' },
  //   description: { fr: 'Dans les affaires traitees', en: 'In cases handled' },
  // },
  // {
  //   value: 12,
  //   suffix: '',
  //   label: { fr: 'Avocats Experts', en: 'Expert Lawyers' },
  //   description: { fr: 'Specialises dans differents domaines', en: 'Specialized in various fields' },
  // },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;

    hasAnimated.current = true;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const newCount = Math.floor(easeOutQuart * value);
      setCount(newCount);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, inView]);

  return (
    <span className="text-5xl sm:text-6xl font-bold gradient-text">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px',
  });
  const { language } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="rounded-3xl p-8 sm:p-12 lg:p-16" style={{ background: 'linear-gradient(to bottom right, #f9fafb, #e6f0f3)' }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label.fr}
                className={`text-center ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                <h3 className="text-lg font-bold mt-2 mb-1" style={{ color: '#0a3d4f' }}>
                  {stat.label[language]}
                </h3>
                <p className="text-sm" style={{ color: '#4b5563' }}>
                  {stat.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

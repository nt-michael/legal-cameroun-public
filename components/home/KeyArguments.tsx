'use client';

import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

// Four short promises right under the hero, without a section title, so the page gets to the prices fast
const argumentsList = [
  {
    icon: '28ICONE_BICHROME.svg',
    title: { fr: 'Expertise reconnue', en: 'Recognized expertise' },
    description: {
      fr: 'Plus de 08 ans d\'expérience et une équipe d\'experts hautement qualifiés.',
      en: 'Over 8 years of experience and a team of highly qualified experts.',
    },
  },
  {
    icon: '36ICONE_BICHROME.svg',
    title: { fr: 'Approche personnalisée', en: 'Personalized approach' },
    description: {
      fr: 'Chaque dossier est unique. Nous adaptons notre accompagnement à vos besoins.',
      en: 'Every case is unique. We tailor our support to your needs.',
    },
  },
  {
    icon: '29ICONE_BICHROME.svg',
    title: { fr: 'Tarifs transparents', en: 'Transparent pricing' },
    description: {
      fr: 'Pas de surprises. Un devis clair et détaillé avant toute intervention.',
      en: 'No surprises. A clear and detailed quote before any work begins.',
    },
  },
  {
    icon: '2ICONE_BICHROME.svg',
    title: { fr: 'Disponibilité 7j/7', en: 'Available 7 days a week' },
    description: {
      fr: 'Nous restons joignables en cas d\'urgence juridique.',
      en: 'We remain reachable in case of a legal emergency.',
    },
  },
];

export default function KeyArguments() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { language } = useLanguage();

  return (
    <section className="bg-secondary-50 dark:bg-gray-800">
      <ul ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        {argumentsList.map((item, index) => (
          <li
            key={item.icon}
            className={`flex items-start gap-4 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <span className="shrink-0 w-14 h-14 rounded-xl bg-white dark:bg-gray-900 border border-secondary-200 dark:border-gray-700 flex items-center justify-center">
              <Image src={`/custom-icons/SVG/${item.icon}`} alt="" width={36} height={36} />
            </span>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{item.title[language]}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description[language]}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

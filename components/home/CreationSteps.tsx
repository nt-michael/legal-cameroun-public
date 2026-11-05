'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

// What the visitor actually goes through with us, in the words of the plans in lib/creation-data.ts
const steps = [
  {
    icon: '9ICONE_BICHROME.svg',
    title: { fr: 'Demandez votre devis', en: 'Request your quote' },
    description: {
      fr: 'Répondez à quelques questions. Un juriste vous envoie votre devis personnalisé par e-mail sous 48h.',
      en: 'Answer a few questions. A lawyer emails you a personalized quote within 48 hours.',
    },
  },
  {
    icon: '4ICONE_BICHROME.svg',
    title: { fr: 'Nous préparons votre dossier', en: 'We prepare your file' },
    description: {
      fr: 'Nous rédigeons vos statuts personnalisés et constituons votre dossier complet.',
      en: 'We draft your customized articles and put together your complete file.',
    },
  },
  {
    icon: '7ICONE_BICHROME.svg',
    title: { fr: 'Recevez votre RCCM', en: 'Receive your RCCM' },
    description: {
      fr: 'Avec les formules Standard et Premium, nous immatriculons votre entreprise au greffe. Vous démarrez votre activité.',
      en: 'With the Standard and Premium plans, we register your company with the court registry. You start your business.',
    },
  },
];

const sectionText = {
  badge: { fr: 'Comment ça marche', en: 'How it works' },
  heading: { fr: 'De votre projet à votre RCCM en 3 étapes', en: 'From your project to your RCCM in 3 steps' },
  cta: { fr: 'Commencer mon devis', en: 'Start my quote' },
};

export default function CreationSteps() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { language } = useLanguage();

  return (
    <section className="section-padding bg-secondary-50/50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="eyebrow">
            {sectionText.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{sectionText.heading[language]}</h2>
        </div>

        <ol ref={ref} className="grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <li
              key={step.icon}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="flex items-center justify-between mb-5">
                <Image src={`/custom-icons/SVG/${step.icon}`} alt="" width={48} height={48} />
                <span className="text-4xl font-bold text-secondary-300 dark:text-secondary-600" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title[language]}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description[language]}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link href="/devis" className="btn-primary">
            {sectionText.cta[language]}
          </Link>
        </div>
      </div>
    </section>
  );
}

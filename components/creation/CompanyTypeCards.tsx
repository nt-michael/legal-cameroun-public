'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { legalForms } from '@/lib/creation-data';
import type { BilingualText } from '@/lib/translations';

// One card per company type, each opening the contact form already filled in for that type.
// `type` is the value the contact form understands (see lib/contact-prefill.ts and companyTypes).
const cards: { formId: string; type: string; icon: string }[] = [
  { formId: 'sarl', type: 'sarl', icon: '3ICONE_BICHROME.svg' },
  { formId: 'sarlu', type: 'sarlu', icon: '18ICONE_BICHROME.svg' },
  { formId: 'association', type: 'association', icon: '25ICONE_BICHROME.svg' },
  { formId: 'sas', type: 'sas', icon: '1ICONE_BICHROME.svg' },
  { formId: 'individual', type: 'etablissement', icon: '44ICONE_BICHROME.svg' },
];

const sectionText = {
  badge: { fr: 'Votre société', en: 'Your company' },
  title: { fr: 'Quelle société souhaitez-vous créer ?', en: 'Which company do you want to set up?' },
  subtitle: {
    fr: 'Choisissez votre forme juridique : un juriste reçoit votre demande et vous répond sous 48h.',
    en: 'Pick your legal form: a lawyer receives your request and replies within 48h.',
  },
  cta: { fr: 'Faire ma demande', en: 'Start my request' },
} satisfies Record<string, BilingualText>;

export default function CompanyTypeCards() {
  const { language } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="eyebrow">{sectionText.badge[language]}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{sectionText.title[language]}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{sectionText.subtitle[language]}</p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card) => {
            const form = legalForms.find((item) => item.id === card.formId);
            if (!form) return null;
            return (
              <li key={card.type}>
                <Link
                  href={`/contact?sujet=creation&type=${card.type}`}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 transition-colors hover:border-secondary-400"
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-50 dark:bg-gray-900" aria-hidden="true">
                    <Image src={`/custom-icons/SVG/${card.icon}`} alt="" width={28} height={28} />
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{form.shortName[language]}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">{form.description[language]}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-600 dark:text-secondary-300">
                    {sectionText.cta[language]}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

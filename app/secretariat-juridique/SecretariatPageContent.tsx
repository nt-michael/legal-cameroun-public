'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { secretariatServices } from '@/lib/secretariat-data';
import type { BilingualText } from '@/lib/translations';

const pageText = {
  badge: { fr: 'Secrétariat juridique', en: 'Legal secretariat' },
  title: { fr: 'Secrétariat juridique', en: 'Legal secretariat' },
  // Introduction written by the legal team (audit, Nov 2026)
  intro: {
    fr: 'Nous mettons à votre disposition une gamme complète de services de secrétariat juridique afin d’assurer la conformité et le suivi de la vie juridique de votre entreprise.',
    en: 'We offer a full range of legal secretariat services to keep your company compliant and to follow up on its legal life.',
  },
  cta: { fr: 'Faire ma demande', en: 'Start my request' },
  response: { fr: 'Un juriste vous répond sous 48h.', en: 'A lawyer replies within 48h.' },
} satisfies Record<string, BilingualText>;

export default function SecretariatPageContent() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-secondary-50/50 dark:bg-gray-900">
      <section
        className="relative pt-28 pb-14 lg:pt-36 lg:pb-20"
        style={{ background: 'linear-gradient(to bottom right, #041c28, #0a3d4f, #041c28)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow text-secondary-300!">{pageText.badge[language]}</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{pageText.title[language]}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{pageText.intro[language]}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(secretariatServices).map(([key, service]) => (
            <li key={key}>
              <Link
                href={`/contact?besoin=${key}`}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 transition-colors hover:border-secondary-400"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-50 dark:bg-gray-900" aria-hidden="true">
                  <Image src={`/custom-icons/SVG/${service.icon}`} alt="" width={28} height={28} />
                </span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex-grow">{service.name[language]}</h2>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-600 dark:text-secondary-300">
                  {pageText.cta[language]}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">{pageText.response[language]}</p>
      </div>
    </main>
  );
}

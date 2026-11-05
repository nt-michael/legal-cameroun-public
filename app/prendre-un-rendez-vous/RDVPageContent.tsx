'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import BookingForm from '@/components/rdv/BookingForm';
import { Suspense } from 'react';

const pageText = {
  badge: { fr: 'Réservez votre rendez-vous', en: 'Book Your Appointment' },
  title: { fr: 'Réservez Votre Rendez-vous avec un Expert', en: 'Book Your Appointment with an Expert' },
  subtitle: {
    fr: "Nos juristes sont disponibles pour répondre à toutes vos questions. Prenez rendez-vous en quelques clics et bénéficiez d'un accompagnement personnalisé.",
    en: 'Our lawyers are available to answer all your questions. Book in a few clicks and benefit from personalized support.',
  },
  features: [
    { fr: 'Consultation de 30 min', en: '30-min consultation' },
    { fr: 'Un expert dédié', en: 'A dedicated expert' },
    { fr: 'Vidéo ou téléphone, au choix', en: 'Video or phone, your choice' },
  ],
  priceLabel: { fr: 'Tarif de la consultation', en: 'Consultation fee' },
  chooseSlot: { fr: 'Choisir mon créneau', en: 'Choose my time slot' },
  faqTitle: { fr: 'Questions Fréquentes', en: 'Frequently Asked Questions' },
  faq1Q: { fr: 'Comment se déroule la consultation ?', en: 'How does the consultation work?' },
  faq1A: {
    fr: "La consultation dure environ 30 minutes. Un expert vous contactera par téléphone ou vidéo selon votre préférence pour discuter de votre projet et répondre à vos questions.",
    en: 'The consultation lasts about 30 minutes. An expert will contact you by phone or video according to your preference to discuss your project and answer your questions.',
  },
  faq2Q: { fr: 'Puis-je annuler ou reporter mon rendez-vous ?', en: 'Can I cancel or reschedule my appointment?' },
  faq2A: {
    fr: 'Bien sûr ! Vous pouvez annuler ou reporter votre rendez-vous à tout moment en nous contactant par email ou téléphone.',
    en: 'Of course! You can cancel or reschedule your appointment at any time by contacting us by email or phone.',
  },
};

export default function RDVPageContent({ consultationPrice }: { consultationPrice: number | null }) {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative pb-16 pt-28 lg:pb-26 lg:pt-36 overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, #041c28, #0a3d4f, #041c28)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            {/* Text */}
            <div className="text-center max-w-3xl w-full">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-4">
                {pageText.badge[language]}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {pageText.title[language]}
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                {pageText.subtitle[language]}
              </p>

              {/* Plain facts, not cards, so nothing looks clickable except the one button below */}
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-300 mb-8">
                {pageText.features.map((feature) => (
                  <li key={feature.fr} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-secondary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature[language]}
                  </li>
                ))}
              </ul>

              {/* The fee is shown before the form, then one real action takes the visitor to the calendar */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {consultationPrice !== null && (
                  <p className="text-white">
                    <span className="block text-xs uppercase tracking-wider text-secondary-300">{pageText.priceLabel[language]}</span>
                    <span className="text-2xl font-bold">
                      {new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US').format(consultationPrice)} FCFA
                    </span>
                  </p>
                )}
                <a href="#reservation" className="btn-gold text-lg px-8 py-4">
                  {pageText.chooseSlot[language]}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative glows: they must never catch clicks meant for the button */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Booking Form Section */}
      <section id="reservation" className="py-12 lg:py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <BookingForm consultationPrice={consultationPrice} />
          </Suspense>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {pageText.faqTitle[language]}
          </h2>
          <div className="space-y-4">
            <details className="group bg-gray-50 dark:bg-gray-700 rounded-2xl">
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <span className="font-medium text-gray-900 dark:text-white">
                  {pageText.faq1Q[language]}
                </span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                {pageText.faq1A[language]}
              </div>
            </details>
            <details className="group bg-gray-50 dark:bg-gray-700 rounded-2xl">
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <span className="font-medium text-gray-900 dark:text-white">
                  {pageText.faq2Q[language]}
                </span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                {pageText.faq2A[language]}
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}

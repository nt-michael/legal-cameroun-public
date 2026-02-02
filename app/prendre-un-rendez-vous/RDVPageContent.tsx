'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import BookingForm from '@/components/rdv/BookingForm';

const pageText = {
  badge: { fr: 'Consultation Gratuite', en: 'Free Consultation' },
  title: { fr: 'Réservez Votre Rendez-vous avec un Expert', en: 'Book Your Appointment with an Expert' },
  subtitle: {
    fr: "Nos juristes sont disponibles pour répondre à toutes vos questions. Prenez rendez-vous en quelques clics et bénéficiez d'un accompagnement personnalisé.",
    en: 'Our lawyers are available to answer all your questions. Book in a few clicks and benefit from personalized support.',
  },
  duration: { fr: '30 min', en: '30 min' },
  consultation: { fr: 'Consultation', en: 'Consultation' },
  free: { fr: 'Gratuit', en: 'Free' },
  noCommitment: { fr: 'Sans engagement', en: 'No commitment' },
  videoPhone: { fr: 'Vidéo/Téléphone', en: 'Video/Phone' },
  yourChoice: { fr: 'Au choix', en: 'Your choice' },
  faqTitle: { fr: 'Questions Fréquentes', en: 'Frequently Asked Questions' },
  faq1Q: { fr: 'Comment se déroule la consultation ?', en: 'How does the consultation work?' },
  faq1A: {
    fr: "La consultation dure environ 30 minutes. Un expert vous contactera par téléphone ou vidéo selon votre préférence pour discuter de votre projet et répondre à vos questions.",
    en: 'The consultation lasts about 30 minutes. An expert will contact you by phone or video according to your preference to discuss your project and answer your questions.',
  },
  faq2Q: { fr: 'La consultation est-elle vraiment gratuite ?', en: 'Is the consultation really free?' },
  faq2A: {
    fr: "Oui, la première consultation est entièrement gratuite et sans engagement. C'est l'occasion de nous présenter votre projet et d'obtenir des conseils personnalisés.",
    en: "Yes, the first consultation is completely free and without commitment. It's an opportunity to present your project and get personalized advice.",
  },
  faq3Q: { fr: 'Puis-je annuler ou reporter mon rendez-vous ?', en: 'Can I cancel or reschedule my appointment?' },
  faq3A: {
    fr: 'Bien sûr ! Vous pouvez annuler ou reporter votre rendez-vous à tout moment en nous contactant par email ou téléphone.',
    en: 'Of course! You can cancel or reschedule your appointment at any time by contacting us by email or phone.',
  },
};

const frDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const enDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function RDVPageContent() {
  const { language } = useLanguage();
  const days = language === 'fr' ? frDays : enDays;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-4">
                {pageText.badge[language]}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {pageText.title[language]}
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                {pageText.subtitle[language]}
              </p>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">{pageText.duration[language]}</p>
                    <p className="text-gray-400 text-sm">{pageText.consultation[language]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">{pageText.free[language]}</p>
                    <p className="text-gray-400 text-sm">{pageText.noCommitment[language]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">{pageText.videoPhone[language]}</p>
                    <p className="text-gray-400 text-sm">{pageText.yourChoice[language]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {days.map((day, i) => (
                    <div key={i} className="text-center text-gray-400 text-sm font-medium">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 3;
                    const isToday = day === 15;
                    const isSelected = day === 18;
                    const isPast = day < 1 || day > 31;
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg flex items-center justify-center text-sm ${
                          isPast
                            ? 'text-gray-600'
                            : isSelected
                            ? 'bg-primary-600 text-white font-bold'
                            : isToday
                            ? 'bg-white/20 text-white font-medium'
                            : 'text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {!isPast && day}
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-2">
                  {['09:00', '10:00', '14:00', '15:00'].map((time, i) => (
                    <div
                      key={time}
                      className={`px-4 py-2 rounded-lg text-center text-sm ${
                        i === 2
                          ? 'bg-primary-600 text-white'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </section>

      {/* Booking Form Section */}
      <section className="py-12 lg:py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
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
            <details className="group bg-gray-50 dark:bg-gray-700 rounded-2xl">
              <summary className="flex items-center justify-between p-6 cursor-pointer">
                <span className="font-medium text-gray-900 dark:text-white">
                  {pageText.faq3Q[language]}
                </span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                {pageText.faq3A[language]}
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}

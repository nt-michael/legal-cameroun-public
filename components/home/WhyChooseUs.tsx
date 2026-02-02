'use client';

import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

const reasons = [
  {
    title: { fr: 'Expertise Reconnue', en: 'Recognized Expertise' },
    description: {
      fr: 'Plus de 15 ans d\'experience et une equipe d\'avocats hautement qualifies dans divers domaines du droit.',
      en: 'Over 15 years of experience and a team of highly qualified lawyers in various areas of law.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: { fr: 'Approche Personnalisee', en: 'Personalized Approach' },
    description: {
      fr: 'Chaque dossier est unique. Nous adaptons notre strategie a vos besoins specifiques pour des resultats optimaux.',
      en: 'Every case is unique. We adapt our strategy to your specific needs for optimal results.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: { fr: 'Tarifs Transparents', en: 'Transparent Pricing' },
    description: {
      fr: 'Pas de surprises. Nous vous fournissons des devis clairs et detailles avant toute intervention.',
      en: 'No surprises. We provide clear and detailed quotes before any intervention.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: { fr: 'Disponibilite 24/7', en: '24/7 Availability' },
    description: {
      fr: 'Nous restons joignables en cas d\'urgence juridique. Votre tranquillite d\'esprit est notre priorite.',
      en: 'We remain reachable in case of legal emergencies. Your peace of mind is our priority.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const sectionText = {
  badge: { fr: 'Pourquoi Nous Choisir', en: 'Why Choose Us' },
  title: { fr: 'La Reference du Droit au', en: 'The Legal Reference in' },
  titleHighlight: { fr: 'Cameroun', en: 'Cameroon' },
  subtitle: {
    fr: 'Chez Legal Cameroun, nous combinons expertise juridique, ethique professionnelle et engagement envers nos clients pour offrir des services juridiques d\'excellence.',
    en: 'At Legal Cameroun, we combine legal expertise, professional ethics, and commitment to our clients to offer legal services of excellence.',
  },
  commitments: { fr: 'Nos Engagements', en: 'Our Commitments' },
  commitmentsList: [
    { fr: 'Confidentialite absolue de vos dossiers', en: 'Absolute confidentiality of your files' },
    { fr: 'Communication claire et reguliere', en: 'Clear and regular communication' },
    { fr: 'Defense acharnee de vos interets', en: 'Fierce defense of your interests' },
    { fr: 'Respect des delais et procedures', en: 'Respect for deadlines and procedures' },
    { fr: 'Satisfaction client garantie', en: 'Guaranteed client satisfaction' },
  ],
  joinOur: { fr: 'Rejoignez nos', en: 'Join our' },
  satisfiedClients: { fr: '500+ clients satisfaits', en: '500+ satisfied clients' },
};

export default function WhyChooseUs() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-medium mb-4">
              {sectionText.badge[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {sectionText.title[language]}{' '}
              <span className="gradient-text">{sectionText.titleHighlight[language]}</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {sectionText.subtitle[language]}
            </p>

            <div ref={ref} className="grid sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <div
                  key={reason.title.fr}
                  className={`${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                      {reason.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {reason.title[language]}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {reason.description[language]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-3xl p-8 text-white" style={{ background: 'linear-gradient(to bottom right, #2563eb, #1e40af)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <h3 className="text-2xl font-bold mb-6">
                  {sectionText.commitments[language]}
                </h3>
                <ul className="space-y-4">
                  {sectionText.commitmentsList.map((item) => (
                    <li key={item.fr} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-secondary-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item[language]}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white">JD</div>
                      <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white">AM</div>
                      <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white">PK</div>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">{sectionText.joinOur[language]}</p>
                      <p className="font-bold">{sectionText.satisfiedClients[language]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary-200 rounded-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import {
  ContactHero,
  ContactOffices,
  ContactForm,
  WhyContactUs,
} from '@/components/contact';

const pageText = {
  sendMessage: { fr: 'Envoyez-nous un message', en: 'Send us a message' },
  describeProject: { fr: 'Décrivez votre projet et nous vous répondrons sous 24h.', en: 'Describe your project and we will respond within 24 hours.' },
  quickResponse: { fr: 'Réponse Rapide', en: 'Quick Response' },
  guaranteed24h: { fr: 'Sous 24h garantie', en: 'Guaranteed within 24h' },
  teamCommitment: { fr: "Notre équipe s\u2019engage à vous répondre dans les plus brefs délais. Pour les urgences, privilégiez l\u2019appel direct ou WhatsApp.", en: 'Our team is committed to responding as quickly as possible. For emergencies, prefer direct calls or WhatsApp.' },
  whyTrustUs: { fr: 'Pourquoi nous faire confiance ?', en: 'Why trust us?' },
  stat1: { fr: '+15 000 entreprises accompagnées', en: '+15,000 businesses supported' },
  stat2: { fr: "8 ans d\u2019expertise OHADA", en: '8 years of OHADA expertise' },
  stat3: { fr: 'Présence à Douala, Paris, Cotonou', en: 'Offices in Douala, Paris, Cotonou' },
  stat4: { fr: 'Données sécurisées RGPD/OHADA', en: 'GDPR/OHADA secured data' },
  needImmediate: { fr: "Besoin d\u2019une réponse immédiate ?", en: 'Need an immediate response?' },
};

export default function ContactPageContent() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen">
      {/* Hero Section with Quick Actions */}
      <ContactHero />

      {/* Why Contact Us Section */}
      <WhyContactUs />

      {/* Contact Form and Offices Grid */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Quick Info Sidebar - Now on the left */}
            <div className="lg:sticky lg:top-24 space-y-6 order-2 lg:order-1">
              {/* Section Header */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {pageText.sendMessage[language]}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {pageText.describeProject[language]}
                </p>
              </div>

              {/* Response Time Card */}
              <div className="bg-primary-600 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{pageText.quickResponse[language]}</h3>
                    <p className="text-primary-100 text-sm">{pageText.guaranteed24h[language]}</p>
                  </div>
                </div>
                <p className="text-primary-50 text-sm">
                  {pageText.teamCommitment[language]}
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  {pageText.whyTrustUs[language]}
                </h3>
                <ul className="space-y-3">
                  {[pageText.stat1, pageText.stat2, pageText.stat3, pageText.stat4].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item[language]}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Contact Card */}
              <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4">{pageText.needImmediate[language]}</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+237659810228"
                    className="flex items-center gap-3 text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +237 691768285
                  </a>
                  <a
                    href="https://wa.me/237659810228"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form - Now on the right */}
            <div className="order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <ContactOffices />
    </main>
  );
}

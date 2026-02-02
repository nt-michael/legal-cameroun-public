'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE_SIMULATEUR } from '@/lib/simulateurs-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText, getText } from '@/lib/translations';

const templateText = {
  backToSimulators: { fr: 'Retour aux Simulateurs', en: 'Back to Simulators' },
  badge: { fr: 'Simulateur Fiscal', en: 'Tax Simulator' },
  privacyNote: { fr: 'Calculs 100% locaux — Aucune donnée sauvegardée', en: '100% local calculations — No data saved' },
  needHelp: { fr: 'Besoin d\'aide avec vos déclarations fiscales ?', en: 'Need help with your tax filings?' },
  helpSubtitle: { fr: 'Nos experts sont disponibles pour vous accompagner dans vos démarches et interpréter vos résultats.', en: 'Our experts are available to guide you through your procedures and interpret your results.' },
  contactExpert: { fr: 'Contacter un Expert', en: 'Contact an Expert' },
  allSimulators: { fr: 'Tous les simulateurs', en: 'All simulators' },
};

interface SimulateurPageTemplateProps {
  title: string | BilingualText;
  shortTitle: string | BilingualText;
  description: string | BilingualText;
  children: React.ReactNode;
}

export default function SimulateurPageTemplate({
  title,
  shortTitle,
  description,
  children,
}: SimulateurPageTemplateProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const loadGSAP = async () => {
      const gsap = (await import('gsap')).default;

      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.animate-item'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
        );
      }
    };

    loadGSAP();
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_SIMULATEUR[language])}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section - Background spans full width including navbar area */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content with padding for navbar */}
        <div ref={heroRef} className="relative pt-32 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <nav className="animate-item mb-8">
            <Link
              href="/simulateurs"
              className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {templateText.backToSimulators[language]}
            </Link>
          </nav>

          {/* Centered Content */}
          <div className="text-center">
            {/* Badge */}
            <span className="animate-item inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {templateText.badge[language]}
            </span>

            {/* Title */}
            <h1 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {getText(title, language)}
            </h1>

            {/* Description */}
            <p className="animate-item text-lg text-gray-300 max-w-2xl mx-auto mb-6">
              {getText(description, language)}
            </p>

            {/* Privacy Badge */}
            <div className="animate-item inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {templateText.privacyNote[language]}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            {templateText.needHelp[language]}
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            {templateText.helpSubtitle[language]}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-lg hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {templateText.contactExpert[language]}
            </a>
            <Link
              href="/simulateurs"
              className="inline-flex items-center justify-center gap-2 bg-primary-500/30 hover:bg-primary-500/50 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {templateText.allSimulators[language]}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

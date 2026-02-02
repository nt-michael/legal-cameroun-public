'use client';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

const services = [
  {
    title: { fr: 'Constitution de Soci\u00e9t\u00e9s', en: 'Company Formation' },
    description: {
      fr: 'Profitez d\'une assistance compl\u00e8te et personnalis\u00e9e pour la cr\u00e9ation de votre soci\u00e9t\u00e9 commerciale ou civile immobili\u00e8re au Cameroun. Nos experts vous accompagnent de A \u00e0 Z, en s\'adaptant \u00e0 vos besoins sp\u00e9cifiques et en vous garantissant un service rapide et efficace.',
      en: 'Enjoy complete and personalized assistance for the creation of your commercial or real estate company in Cameroon. Our experts guide you from A to Z, adapting to your specific needs and guaranteeing fast and efficient service.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: { fr: 'Transmission et Acquisition', en: 'Transfer & Acquisition' },
    description: {
      fr: 'Obtenez des conseils personnalis\u00e9s et avis\u00e9s pour optimiser fiscalement la transmission de votre entreprise, incluant une expertise dans les processus d\'acquisition par fusion-absorption, cession, pour des op\u00e9rations fluides et r\u00e9ussies.',
      en: 'Get personalized and expert advice to fiscally optimize the transfer of your business, including expertise in acquisition processes through mergers, disposals, for smooth and successful operations.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    title: { fr: 'Secr\u00e9tariat Juridique', en: 'Legal Secretariat' },
    description: {
      fr: 'B\u00e9n\u00e9ficiez d\'un accompagnement complet en mati\u00e8re de r\u00e9daction d\'actes de soci\u00e9t\u00e9, pour assurer la conformit\u00e9 administrative et l\u00e9gale de votre entreprise, vous permettant de vous concentrer sur votre activit\u00e9 principale.',
      en: 'Benefit from comprehensive support in drafting company documents, to ensure the administrative and legal compliance of your business, allowing you to focus on your core activity.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: { fr: 'Accompagnement', en: 'Support' },
    description: {
      fr: 'B\u00e9n\u00e9ficiez d\'un accompagnement sp\u00e9cialis\u00e9 pour la cr\u00e9ation d\'associations, de fondations d\'entreprises et de groupements d\'int\u00e9r\u00eat \u00e9conomique, adapt\u00e9 aux besoins sp\u00e9cifiques des organismes \u00e0 but non lucratif.',
      en: 'Benefit from specialized support for the creation of associations, corporate foundations, and economic interest groups, tailored to the specific needs of non-profit organizations.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: { fr: 'Immobilier', en: 'Real Estate' },
    description: {
      fr: 'D\u00e9marches d\'immatriculation d\'un terrain jusqu\'\u00e0 l\'obtention du titre foncier, r\u00e8glement de successions immobili\u00e8res, acquisition, cession et gestion immobili\u00e8re, strat\u00e9gie d\'optimisation et de gestion du patrimoine.',
      en: 'Land registration procedures through to obtaining the land title, settlement of real estate successions, acquisition, disposal, and property management, optimization and asset management strategy.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: { fr: 'Op\u00e9rations sur les Comptes', en: 'Account Operations' },
    description: {
      fr: 'Profitez d\'une gamme compl\u00e8te de services comptables, incluant la pr\u00e9sentation des comptes, les examens limit\u00e9s et les audits contractuels, afin d\'assurer la fiabilit\u00e9, la transparence et la s\u00e9curit\u00e9 de votre gestion financi\u00e8re.',
      en: 'Enjoy a full range of accounting services, including financial statement presentation, limited reviews, and contractual audits, to ensure the reliability, transparency, and security of your financial management.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const WHATSAPP_NUMBER = '237659810228';

const sectionText = {
  badge: { fr: 'Nos Services', en: 'Our Services' },
  heading: { fr: 'Expertise Juridique Compl\u00e8te', en: 'Complete Legal Expertise' },
  subheading: {
    fr: 'Nous offrons une gamme compl\u00e8te de services juridiques pour r\u00e9pondre \u00e0 tous vos besoins l\u00e9gaux avec excellence et professionnalisme.',
    en: 'We offer a full range of legal services to meet all your legal needs with excellence and professionalism.',
  },
  learnMore: { fr: 'En savoir plus', en: 'Learn more' },
  whatsappCta: { fr: 'Continuer sur WhatsApp', en: 'Continue on WhatsApp' },
  whatsappMessage: {
    fr: 'Bonjour, j\'ai une question concernant vos services juridiques.',
    en: 'Hello, I have a question about your legal services.',
  },
};

export default function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language } = useLanguage();

  return (
    <section className="section-padding bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-medium mb-4">
            {sectionText.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {sectionText.heading[language]}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {sectionText.subheading[language]}
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <Link
              key={service.title.fr}
              href="/prendre-un-rendez-vous"
              className={`group bg-white rounded-2xl p-8 card-hover border border-gray-100 flex flex-col ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {service.title[language]}
              </h3>
              <p className="text-gray-600 mb-4 flex-grow text-sm leading-relaxed">
                {service.description[language]}
              </p>
              <span className="inline-flex items-center text-primary-600 font-medium mt-auto">
                {sectionText.learnMore[language]}
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* CTA - WhatsApp */}
        <div className="text-center mt-12">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(sectionText.whatsappMessage[language])}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-600/20 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {sectionText.whatsappCta[language]}
          </a>
        </div>
      </div>
    </section>
  );
}

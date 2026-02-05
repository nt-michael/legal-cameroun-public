'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      <Image src="/custom-icons/SVG/1ICONE_BICHROME.svg" alt="Constitution" width={32} height={32}
        className="group-hover:brightness-0 group-hover:invert transition-all duration-300" />
    ),
  },
  {
    title: { fr: 'Transmission et Acquisition', en: 'Transfer & Acquisition' },
    description: {
      fr: 'Obtenez des conseils personnalis\u00e9s et avis\u00e9s pour optimiser fiscalement la transmission de votre entreprise, incluant une expertise dans les processus d\'acquisition par fusion-absorption, cession, pour des op\u00e9rations fluides et r\u00e9ussies.',
      en: 'Get personalized and expert advice to fiscally optimize the transfer of your business, including expertise in acquisition processes through mergers, disposals, for smooth and successful operations.',
    },
    icon: (
      <Image src="/custom-icons/SVG/23ICONE_BICHROME.svg" alt="Transmission" width={32} height={32}
        className="group-hover:brightness-0 group-hover:invert transition-all duration-300" />
    ),
  },
  {
    title: { fr: 'Secr\u00e9tariat Juridique', en: 'Legal Secretariat' },
    description: {
      fr: 'B\u00e9n\u00e9ficiez d\'un accompagnement complet en mati\u00e8re de r\u00e9daction d\'actes de soci\u00e9t\u00e9, pour assurer la conformit\u00e9 administrative et l\u00e9gale de votre entreprise, vous permettant de vous concentrer sur votre activit\u00e9 principale.',
      en: 'Benefit from comprehensive support in drafting company documents, to ensure the administrative and legal compliance of your business, allowing you to focus on your core activity.',
    },
    icon: (
      <Image src="/custom-icons/SVG/4ICONE_BICHROME.svg" alt="Secrétariat Juridique" width={32} height={32}
        className="group-hover:brightness-0 group-hover:invert transition-all duration-300" />
    ),
  },
  {
    title: { fr: 'Accompagnement', en: 'Support' },
    description: {
      fr: 'B\u00e9n\u00e9ficiez d\'un accompagnement sp\u00e9cialis\u00e9 pour la cr\u00e9ation d\'associations, de fondations d\'entreprises et de groupements d\'int\u00e9r\u00eat \u00e9conomique, adapt\u00e9 aux besoins sp\u00e9cifiques des organismes \u00e0 but non lucratif.',
      en: 'Benefit from specialized support for the creation of associations, corporate foundations, and economic interest groups, tailored to the specific needs of non-profit organizations.',
    },
    icon: (
      <Image src="/custom-icons/SVG/36ICONE_BICHROME.svg" alt="Accompagnement" width={32} height={32}
        className="group-hover:brightness-0 group-hover:invert transition-all duration-300" />
    ),
  },
  {
    title: { fr: 'Immobilier', en: 'Real Estate' },
    description: {
      fr: 'D\u00e9marches d\'immatriculation d\'un terrain jusqu\'\u00e0 l\'obtention du titre foncier, r\u00e8glement de successions immobili\u00e8res, acquisition, cession et gestion immobili\u00e8re, strat\u00e9gie d\'optimisation et de gestion du patrimoine.',
      en: 'Land registration procedures through to obtaining the land title, settlement of real estate successions, acquisition, disposal, and property management, optimization and asset management strategy.',
    },
    icon: (
      <Image src="/custom-icons/SVG/27ICONE_BICHROME.svg" alt="Immobilier" width={32} height={32}
        className="group-hover:brightness-0 group-hover:invert transition-all duration-300" />
    ),
  },
  {
    title: { fr: 'Op\u00e9rations sur les Comptes', en: 'Account Operations' },
    description: {
      fr: 'Profitez d\'une gamme compl\u00e8te de services comptables, incluant la pr\u00e9sentation des comptes, les examens limit\u00e9s et les audits contractuels, afin d\'assurer la fiabilit\u00e9, la transparence et la s\u00e9curit\u00e9 de votre gestion financi\u00e8re.',
      en: 'Enjoy a full range of accounting services, including financial statement presentation, limited reviews, and contractual audits, to ensure the reliability, transparency, and security of your financial management.',
    },
    icon: (
      <Image src="/custom-icons/SVG/10ICONE_BICHROME.svg" alt="Opérations sur Comptes" width={32} height={32}
        className="group-hover:brightness-0 group-hover:invert transition-all duration-300" />
    ),
  },
];

const WHATSAPP_NUMBER = '237659810228';

const sectionText = {
  badge: { fr: 'Nos Services', en: 'Our Services' },
  heading: { fr: 'Une expertise complète', en: 'Complete Expertise' },
  subheading: {
    fr: 'Nous offrons une gamme complète de services d\'accompagnement pour répondre à tous vos besoins légaux, comptables, financiers et fiscaux.',
    en: 'We offer a full range of support services to meet all your legal, accounting, financial, and tax needs.',
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
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
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
            <Image src="/custom-icons/SVG/52ICONE_bleue.svg" alt="WhatsApp" width={20} height={20}
              className="brightness-0 invert" />
            {sectionText.whatsappCta[language]}
          </a>
        </div>
      </div>
    </section>
  );
}

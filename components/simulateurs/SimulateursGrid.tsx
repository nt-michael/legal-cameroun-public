'use client';

import Image from 'next/image';
import SimulateurCard from './SimulateurCard';
import { simulatorsData, WHATSAPP_NUMBER, WHATSAPP_MESSAGE_SIMULATEUR } from '@/lib/simulateurs-data';
import { useLanguage } from '@/contexts/LanguageContext';

const sectionText = {
  title: { fr: 'Choisissez votre simulateur', en: 'Choose your simulator' },
  subtitle: {
    fr: 'Trois outils essentiels pour estimer vos obligations fiscales au Cameroun. Résultats instantanés, calculs conformes au CGI 2024.',
    en: 'Three essential tools to estimate your tax obligations in Cameroon. Instant results, calculations compliant with CGI 2024.',
  },
  needHelp: { fr: 'Besoin d\'aide pour interpréter vos résultats ?', en: 'Need help interpreting your results?' },
  contactExpert: { fr: 'Contacter un Expert', en: 'Contact an Expert' },
};

export default function SimulateursGrid() {
  const { language } = useLanguage();
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_SIMULATEUR[language])}`;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {sectionText.title[language]}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {sectionText.subtitle[language]}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {simulatorsData.map((simulator, index) => (
            <SimulateurCard
              key={simulator.id}
              title={simulator.title[language]}
              description={simulator.description[language]}
              icon={simulator.icon}
              href={simulator.href}
              color={simulator.color}
              features={simulator.features.map(f => f[language])}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {sectionText.needHelp[language]}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-600/20 hover:scale-105"
          >
            <Image src="/custom-icons/SVG/52ICONE_bleue.svg" alt="WhatsApp" width={20} height={20}
              className="brightness-0 invert" />
            {sectionText.contactExpert[language]}
          </a>
        </div>
      </div>
    </section>
  );
}

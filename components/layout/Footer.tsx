'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BilingualText } from '@/lib/translations';

interface FooterRubrique {
  name: BilingualText;
  href: string;
}

interface FooterSection {
  name: BilingualText;
  href: string;
  rubriques: FooterRubrique[];
}

// Menu structure matching the header
const menuSections: FooterSection[] = [
  {
    name: { fr: 'Création d\'entreprise', en: 'Business Creation' },
    href: '/creation-entreprise',
    rubriques: [
      { name: { fr: 'Créer une SAS', en: 'Create a SAS' }, href: '/creation-entreprise/sas' },
      { name: { fr: 'Créer une SARL', en: 'Create a SARL' }, href: '/creation-entreprise/sarl' },
      { name: { fr: 'Créer une SARLU', en: 'Create a SARLU' }, href: '/creation-entreprise/sarlu' },
      { name: { fr: 'Créer une Association', en: 'Create an Association' }, href: '/creation-entreprise/association' },
      { name: { fr: 'Tous les statuts', en: 'All Legal Forms' }, href: '/creation-entreprise' },
    ],
  },
  {
    name: { fr: 'Gestion d\'entreprise', en: 'Business Management' },
    href: '/gestion-entreprise',
    rubriques: [
      { name: { fr: 'Transfert de siège social', en: 'Headquarters Transfer' }, href: '/gestion-entreprise/transfert-siege' },
      { name: { fr: 'Transformation SAS en SARL', en: 'SAS to SARL Conversion' }, href: '/gestion-entreprise/sas-vers-sarl' },
      { name: { fr: 'Transformation SARL en SAS', en: 'SARL to SAS Conversion' }, href: '/gestion-entreprise/sarl-vers-sas' },
      { name: { fr: 'Dissolution d\'entreprise', en: 'Business Dissolution' }, href: '/gestion-entreprise/dissolution' },
      { name: { fr: 'Toutes les modifications', en: 'All Modifications' }, href: '/gestion-entreprise' },
    ],
  },
  {
    name: { fr: 'Accompagnement', en: 'Support' },
    href: '/prendre-un-rendez-vous',
    rubriques: [
      { name: { fr: 'Devis', en: 'Quote' }, href: '/devis' },
      { name: { fr: 'Avec un expert', en: 'With an Expert' }, href: '/prendre-un-rendez-vous' },
      { name: { fr: 'Assistance LegalCameroun', en: 'LegalCameroun Assistance' }, href: '/contact' },
    ],
  },
  {
    name: { fr: 'Fiches Pratiques', en: 'Practical Guides' },
    href: '/fiches-pratiques',
    rubriques: [
      { name: { fr: 'Prix de Transfert', en: 'Transfer Pricing' }, href: '/fiches-pratiques/prix-des-transferts' },
      { name: { fr: 'Société vs Établissement', en: 'Company vs Branch' }, href: '/fiches-pratiques/presentation-societe-etablissement' },
      { name: { fr: 'Immatriculation ATOM', en: 'ATOM Registration' }, href: '/fiches-pratiques/immatriculation-avec-atom' },
      { name: { fr: 'Tutoriel Consultation', en: 'Consultation Tutorial' }, href: '/fiches-pratiques/tutoriel-consultation' },
    ],
  },
  {
    name: { fr: 'Navigation', en: 'Navigation' },
    href: '/',
    rubriques: [
      { name: { fr: 'Accueil', en: 'Home' }, href: '/' },
      { name: { fr: 'A propos', en: 'About' }, href: '/a-propos' },
      { name: { fr: 'Actualité', en: 'News' }, href: '/actualite' },
      { name: { fr: 'Nous contacter', en: 'Contact Us' }, href: '/contact' },
    ],
  },
];

const footerLinks = {
  legal: [
    { name: { fr: 'Mentions Légales', en: 'Legal Notice' }, href: '/legal' },
    { name: { fr: 'Politique de Confidentialité', en: 'Privacy Policy' }, href: '/privacy' },
    { name: { fr: 'Conditions Générales', en: 'Terms & Conditions' }, href: '/terms' },
  ],
};

const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <Image src="/custom-icons/SVG/46ICONE_bleue.svg" alt="Facebook" width={20} height={20}
        className="brightness-0 invert" />
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <Image src="/custom-icons/SVG/54ICONE_bleue.svg" alt="LinkedIn" width={20} height={20}
        className="brightness-0 invert" />
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <Image src="/custom-icons/SVG/50ICONE_bleue.svg" alt="Twitter" width={20} height={20}
        className="brightness-0 invert" />
    ),
  },
];

const footerText = {
  byRodec: { fr: 'par RODEC Conseils SAS', en: 'by RODEC Conseils SAS' },
  description: {
    fr: 'Plateforme d\'accompagnement juridique, comptable et fiscale de premier choix au Cameroun, offrant des services de qualité supérieure aux entreprises et aux particuliers depuis plus de 08 ans.',
    en: 'Leading legal, accounting, and tax support platform in Cameroon, offering superior quality services to businesses and individuals for over 08 years.',
  },
  contact: { fr: 'Contact', en: 'Contact' },
  addressLine1: { fr: 'Douala, Cameroun', en: 'Douala, Cameroon' },
  addressLine2: { fr: 'Elite Offices Building, Rue Dubois de Saligny, Akwa', en: 'Elite Offices Building, Rue Dubois de Saligny, Akwa' },
  rights: { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
};

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* First Row: Menu Sections with Rubriques */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-800">
          {menuSections.map((section) => (
            <div key={section.name.fr}>
              <Link
                href={section.href}
                className="font-semibold text-white mb-4 block hover:text-primary-400 transition-colors"
              >
                {section.name[language]}
              </Link>
              <ul className="space-y-2">
                {section.rubriques.map((rubrique) => (
                  <li key={rubrique.name.fr}>
                    <Link
                      href={rubrique.href}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {rubrique.name[language]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Second Row: Brand and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-12 border-b border-gray-800">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image
                src="/logo.png"
                alt="Legal Cameroun"
                width={150}
                height={50}
                className="h-12 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="text-sm text-gray-400">{footerText.byRodec[language]}</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {footerText.description[language]}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">{footerText.contact[language]}</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <Image src="/custom-icons/SVG/32ICONE_bleue.svg" alt="Location" width={20} height={20}
                  className="mt-0.5 shrink-0 brightness-0 invert" />
                <span>{footerText.addressLine1[language]}<br />{footerText.addressLine2[language]}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+237 233 42 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Image src="/custom-icons/SVG/18ICONE_bleue.svg" alt="Email" width={20} height={20}
                  className="shrink-0 brightness-0 invert" />
                <span>contact@legalcameroun.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Legal Cameroun. {footerText.rights[language]}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name.fr}
                  href={link.href}
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors"
                >
                  {link.name[language]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

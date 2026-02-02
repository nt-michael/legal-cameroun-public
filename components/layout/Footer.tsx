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
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
];

const footerText = {
  byRodec: { fr: 'par RODEC Conseils SAS', en: 'by RODEC Conseils SAS' },
  description: {
    fr: 'Cabinet d\'avocats de premier plan au Cameroun, offrant des services juridiques de qualité supérieure aux entreprises et aux particuliers depuis plus de 15 ans.',
    en: 'Leading law firm in Cameroon, offering superior quality legal services to businesses and individuals for over 15 years.',
  },
  contact: { fr: 'Contact', en: 'Contact' },
  addressLine1: { fr: 'Douala, Cameroun', en: 'Douala, Cameroon' },
  addressLine2: { fr: 'Bonanjo, Rue de la Liberté', en: 'Bonanjo, Rue de la Liberté' },
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
                <svg className="w-5 h-5 mt-0.5 text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{footerText.addressLine1[language]}<br />{footerText.addressLine2[language]}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+237 233 42 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
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

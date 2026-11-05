'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { BilingualText } from '@/lib/translations';

interface MenuRubrique {
  name: BilingualText;
  href: string;
}

interface MenuItem {
  name: BilingualText;
  href: string;
  /** Underline in the colour of the service area, as the brand charter asks */
  accent: string;
  rubriques: MenuRubrique[];
}

type DropdownId = 'offers' | 'resources';

interface NavItem {
  name: BilingualText;
  href: string;
  dropdown?: DropdownId;
}

// Menu structure
const menuItems: MenuItem[] = [
  {
    name: { fr: 'Création d\'entreprise', en: 'Business Creation' },
    href: '/creation-entreprise',
    accent: 'border-section-creation',
    rubriques: [
      { name: { fr: 'Créer une SAS', en: 'Create a SAS' }, href: '/creation-entreprise/sas' },
      { name: { fr: 'Créer une SARL', en: 'Create a SARL' }, href: '/creation-entreprise/sarl' },
      { name: { fr: 'Créer une SARLU', en: 'Create a SARLU' }, href: '/creation-entreprise/sarlu' },
      { name: { fr: 'Créer une Association', en: 'Create an Association' }, href: '/creation-entreprise/association' },
      { name: { fr: 'Tous les statuts', en: 'All Legal Forms' }, href: '/creation-entreprise' },
    ],
  },
  {
    name: { fr: 'Modification d\'entreprise', en: 'Business Modification' },
    href: '/modification-entreprise',
    accent: 'border-section-gestion',
    rubriques: [
      { name: { fr: 'Transfert de siège social', en: 'Headquarters Transfer' }, href: '/modification-entreprise/transfert-siege' },
      { name: { fr: 'Transformation SAS en SARL', en: 'SAS to SARL Conversion' }, href: '/modification-entreprise/sas-vers-sarl' },
      { name: { fr: 'Transformation SARL en SAS', en: 'SARL to SAS Conversion' }, href: '/modification-entreprise/sarl-vers-sas' },
      { name: { fr: 'Dissolution d\'entreprise', en: 'Business Dissolution' }, href: '/modification-entreprise/dissolution' },
      { name: { fr: 'Toutes les modifications', en: 'All Modifications' }, href: '/modification-entreprise' },
    ],
  },
  {
    name: { fr: 'Accompagnement', en: 'Support' },
    href: '/prendre-un-rendez-vous',
    accent: 'border-section-accompagnement',
    rubriques: [
      { name: { fr: 'Devis', en: 'Quote' }, href: '/devis' },
      { name: { fr: 'Avec un expert', en: 'With an Expert' }, href: '/prendre-un-rendez-vous' },
      { name: { fr: 'Assistance LegalCameroun', en: 'LegalCameroun Assistance' }, href: '/contact' },
    ],
  },
];

// The logo links home, so the bar keeps only what a visitor looks for
const navigation: NavItem[] = [
  { name: { fr: 'Nos Offres', en: 'Our Services' }, href: '#', dropdown: 'offers' },
  { name: { fr: 'Tarifs', en: 'Pricing' }, href: '/tarifs' },
  { name: { fr: 'À propos', en: 'About' }, href: '/a-propos' },
  { name: { fr: 'Ressources', en: 'Resources' }, href: '#', dropdown: 'resources' },
  { name: { fr: 'Contact', en: 'Contact' }, href: '/contact' },
];

const resourceLinks: MenuRubrique[] = [
  { name: { fr: 'Fiches pratiques', en: 'Practical guides' }, href: '/fiches-pratiques' },
  { name: { fr: 'Simulateurs', en: 'Simulators' }, href: '/simulateurs' },
  { name: { fr: 'Actualité', en: 'Blog' }, href: '/actualite' },
];

const megaMenuBottom = {
  needHelp: { fr: 'Besoin d\'aide pour choisir?', en: 'Need help choosing?' },
  expertsHelp: { fr: 'Nos experts vous conseillent', en: 'Our experts advise you' },
  talkToExpert: { fr: 'Parler à un expert', en: 'Talk to an expert' },
};

const mobileOffersLabel = { fr: 'Nos Offres', en: 'Our Services' };
const createCompanyLabel = { fr: 'Créer mon entreprise', en: 'Create my company' };

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<DropdownId | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const isMegaMenuOpen = openMenu === 'offers';
  // Any open dropdown gives the bar a solid background so the panel reads as part of it
  const isSolid = isScrolled || openMenu !== null;

  const openDropdown = (id: DropdownId) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpenMenu(id);
  };

  const closeDropdownSoon = () => {
    // Short grace period so the panel stays open while the mouse travels down to it
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

  const closeDropdown = () => setOpenMenu(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape closes any open dropdown, as visitors expect
  useEffect(() => {
    if (!openMenu) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [openMenu]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar */}
      <div
        className={`transition-all duration-300 ${
          isSolid
            ? 'bg-gray-100 dark:bg-gray-800'
            : 'bg-white/10 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end gap-4 h-8">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className={`text-xs font-medium transition-colors ${
                isSolid
                  ? 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>

            <span className={`text-xs ${isSolid ? 'text-gray-300 dark:text-gray-600' : 'text-white/30'}`}>|</span>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`transition-colors ${
                isSolid
                  ? 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  : 'text-white/70 hover:text-white'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-300 ${
          isSolid
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Legal Cameroun"
              width={150}
              height={50}
              className="h-12 w-auto transition-all duration-300"
              style={{
                filter: isSolid && theme === 'light' ? 'none' : 'brightness(0) invert(1)'
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
            {navigation.map((item) => {
              const linkColor = isSolid
                ? 'text-gray-700 dark:text-gray-200 hover:text-primary-600'
                : 'text-white/90 hover:text-white';

              if (!item.dropdown) {
                return (
                  <Link key={item.name.fr} href={item.href} className={`font-medium transition-colors ${linkColor}`}>
                    {item.name[language]}
                  </Link>
                );
              }

              const dropdown = item.dropdown;
              const isOpen = openMenu === dropdown;
              return (
                <div
                  key={item.name.fr}
                  className="relative"
                  onMouseEnter={() => openDropdown(dropdown)}
                  onMouseLeave={closeDropdownSoon}
                >
                  <button
                    onClick={() => setOpenMenu(isOpen ? null : dropdown)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 font-medium transition-colors ${
                      isOpen ? 'text-primary-600 dark:text-primary-300' : linkColor
                    }`}
                  >
                    {item.name[language]}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Small list under the button; the top padding bridges the gap so hovering down keeps it open */}
                  {dropdown === 'resources' && (
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full pt-5 transition duration-200 ease-out ${
                        isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="w-56 rounded-xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800 p-2">
                        {resourceLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeDropdown}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-gray-800 transition-colors duration-150"
                          >
                            {link.name[language]}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex items-center gap-3">
              <Link
                href="/prendre-un-rendez-vous"
                className={`inline-flex items-center rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                  isSolid
                    ? 'border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-300 dark:text-primary-300'
                    : 'border-white/40 text-white hover:bg-white hover:text-gray-900'
                }`}
              >
                {t.nav.appointment}
              </Link>
              <Link href="/devis" className="btn-primary text-sm">
                {createCompanyLabel[language]}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        </div>

        {/* Mega Menu - Desktop */}
        {/* Opens at once with a short fade; every column stays readable and only the hovered line lights up */}
        <div
          className={`hidden lg:block absolute left-0 right-0 top-full bg-white dark:bg-gray-900 shadow-2xl border-t border-gray-100 dark:border-gray-800 transition duration-200 ease-out ${
            isMegaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={() => openDropdown('offers')}
          onMouseLeave={closeDropdownSoon}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800">
              {menuItems.map((item) => (
                <div key={item.name.fr} className="px-6 first:pl-0 last:pr-0">
                  <Link
                    href={item.href}
                    onClick={closeDropdown}
                    className={`block text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-300 hover:text-primary-500 mx-3 mb-3 pb-3 border-b-2 ${item.accent}`}
                  >
                    {item.name[language]}
                  </Link>
                  <div className="space-y-1">
                    {item.rubriques.map((rubrique) => (
                      <Link
                        key={rubrique.name.fr}
                        href={rubrique.href}
                        onClick={closeDropdown}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-gray-800 transition-colors duration-150"
                      >
                        {rubrique.name[language]}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Featured section at bottom */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{megaMenuBottom.needHelp[language]}</p>
                    <p className="text-sm text-gray-500">{megaMenuBottom.expertsHelp[language]}</p>
                  </div>
                </div>
                <Link
                  href="/prendre-un-rendez-vous"
                  onClick={closeDropdown}
                  className="btn-primary text-sm"
                >
                  {megaMenuBottom.talkToExpert[language]}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white rounded-xl shadow-xl mt-2 py-4 px-4 max-h-[70vh] overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name.fr}>
                {item.dropdown === 'offers' ? (
                  <div className="py-2">
                    <p className="font-bold text-gray-900 mb-2">{mobileOffersLabel[language]}</p>
                    {menuItems.map((menuItem, idx) => (
                      <div key={menuItem.name.fr} className="mb-4">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                          aria-expanded={activeDropdown === idx}
                          className={`flex items-center justify-between w-full py-2 text-gray-700 font-medium text-sm border-b-2 ${menuItem.accent}`}
                        >
                          {menuItem.name[language]}
                          <svg
                            className={`w-4 h-4 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-200 ${
                            activeDropdown === idx ? 'max-h-96' : 'max-h-0'
                          }`}
                        >
                          {menuItem.rubriques.map((rubrique) => (
                            <Link
                              key={rubrique.name.fr}
                              href={rubrique.href}
                              className="block py-2 pl-4 text-sm text-gray-600 hover:text-primary-600"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {rubrique.name[language]}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : item.dropdown === 'resources' ? (
                  <div className="py-1">
                    <button
                      onClick={() => setIsMobileResourcesOpen((open) => !open)}
                      aria-expanded={isMobileResourcesOpen}
                      className="flex items-center justify-between w-full py-3 text-gray-700 font-medium"
                    >
                      {item.name[language]}
                      <svg
                        className={`w-4 h-4 transition-transform ${isMobileResourcesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ${isMobileResourcesOpen ? 'max-h-60' : 'max-h-0'}`}>
                      {resourceLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block py-2 pl-4 text-sm text-gray-600 hover:text-primary-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name[language]}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 text-gray-700 font-medium hover:text-primary-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name[language]}
                  </Link>
                )}
              </div>
            ))}
            {/* Language and Theme - Mobile */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {language === 'fr' ? 'English' : 'Français'}
              </button>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>

            <Link
              href="/devis"
              className="btn-primary w-full mt-4 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {createCompanyLabel[language]}
            </Link>
            <Link
              href="/prendre-un-rendez-vous"
              className="btn-secondary w-full mt-3 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.appointment}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
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
  rubriques: MenuRubrique[];
}

interface NavItem {
  name: BilingualText;
  href: string;
  hasDropdown?: boolean;
}

// Menu structure
const menuItems: MenuItem[] = [
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
];

const navigation: NavItem[] = [
  { name: { fr: 'Accueil', en: 'Home' }, href: '/' },
  { name: { fr: 'Nos Offres', en: 'Our Services' }, href: '#', hasDropdown: true },
  { name: { fr: 'Fiches Pratiques', en: 'Practical Guides' }, href: '/fiches-pratiques' },
  { name: { fr: 'Simulateurs', en: 'Simulators' }, href: '/simulateurs' },
  { name: { fr: 'A propos', en: 'About' }, href: '/a-propos' },
  { name: { fr: 'Actualité', en: 'Blog' }, href: '/actualite' },
  { name: { fr: 'Contact', en: 'Contact' }, href: '/contact' },
];

const megaMenuBottom = {
  needHelp: { fr: 'Besoin d\'aide pour choisir?', en: 'Need help choosing?' },
  expertsHelp: { fr: 'Nos experts vous accompagnent gratuitement', en: 'Our experts assist you for free' },
  talkToExpert: { fr: 'Parler à un expert', en: 'Talk to an expert' },
};

const mobileOffersLabel = { fr: 'Nos Offres', en: 'Our Services' };

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuContentRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const handleMouseEnterDropdown = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150);
  };

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

  // GSAP animation for mega menu
  useEffect(() => {
    if (!megaMenuRef.current || !megaMenuContentRef.current) return;

    if (isMegaMenuOpen) {
      // Open animation
      gsap.set(megaMenuRef.current, { display: 'block' });
      gsap.fromTo(
        megaMenuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );

      // Stagger animate menu items
      gsap.fromTo(
        menuItemsRef.current.filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.1,
        }
      );
    } else {
      // Close animation
      gsap.to(megaMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          if (megaMenuRef.current) {
            gsap.set(megaMenuRef.current, { display: 'none' });
          }
        },
      });
    }
  }, [isMegaMenuOpen]);

  // GSAP animation for dropdown items
  const animateDropdownItems = (index: number) => {
    const container = document.querySelector(`[data-dropdown="${index}"]`);
    if (container) {
      const items = container.querySelectorAll('.rubrique-item');
      gsap.fromTo(
        items,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.03,
          ease: 'power2.out',
        }
      );
    }
  };

  const handleMenuItemHover = (index: number) => {
    setActiveDropdown(index);
    setTimeout(() => animateDropdownItems(index), 50);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled || isMegaMenuOpen
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
                isScrolled || isMegaMenuOpen
                  ? 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>

            <span className={`text-xs ${isScrolled || isMegaMenuOpen ? 'text-gray-300 dark:text-gray-600' : 'text-white/30'}`}>|</span>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`transition-colors ${
                isScrolled || isMegaMenuOpen
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
          isScrolled || isMegaMenuOpen
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
                filter: (isScrolled || isMegaMenuOpen) && theme === 'light' ? 'none' : 'brightness(0) invert(1)'
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name.fr} className="relative">
                {item.hasDropdown ? (
                  <button
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                    className={`flex items-center gap-1 font-medium transition-colors ${
                      isScrolled || isMegaMenuOpen
                        ? 'text-gray-700 hover:text-primary-600'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item.name[language]}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors ${
                      isScrolled || isMegaMenuOpen
                        ? 'text-gray-700 hover:text-primary-600'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item.name[language]}
                  </Link>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link href="/prendre-un-rendez-vous" className="btn-primary text-sm">
              {t.nav.appointment}
            </Link>
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
        <div
          ref={megaMenuRef}
          className="hidden absolute left-0 right-0 top-full bg-white shadow-2xl border-t border-gray-100"
          style={{ display: 'none' }}
          onMouseEnter={handleMouseEnterDropdown}
          onMouseLeave={handleMouseLeaveDropdown}
        >
          <div ref={megaMenuContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-4 gap-8">
              {menuItems.map((item, index) => (
                <div
                  key={item.name.fr}
                  ref={(el) => { menuItemsRef.current[index] = el; }}
                  className="relative"
                  onMouseEnter={() => handleMenuItemHover(index)}
                >
                  <Link
                    href={item.href}
                    className={`block font-bold text-lg mb-4 transition-colors ${
                      activeDropdown === index ? 'text-primary-600' : 'text-gray-900 hover:text-primary-600'
                    }`}
                  >
                    {item.name[language]}
                  </Link>
                  <div
                    data-dropdown={index}
                    className={`space-y-2 transition-opacity ${
                      activeDropdown === index ? 'opacity-100' : 'opacity-70'
                    }`}
                  >
                    {item.rubriques.map((rubrique) => (
                      <Link
                        key={rubrique.name.fr}
                        href={rubrique.href}
                        className="rubrique-item block text-sm text-gray-600 hover:text-primary-600 hover:translate-x-1 transition-all py-1"
                      >
                        {rubrique.name[language]}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Featured section at bottom */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{megaMenuBottom.needHelp[language]}</p>
                    <p className="text-sm text-gray-500">{megaMenuBottom.expertsHelp[language]}</p>
                  </div>
                </div>
                <Link
                  href="/prendre-un-rendez-vous"
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
                {item.hasDropdown ? (
                  <div className="py-2">
                    <p className="font-bold text-gray-900 mb-2">{mobileOffersLabel[language]}</p>
                    {menuItems.map((menuItem, idx) => (
                      <div key={menuItem.name.fr} className="mb-4">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                          className="flex items-center justify-between w-full py-2 text-gray-700 font-medium text-sm"
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
              href="/prendre-un-rendez-vous"
              className="btn-primary w-full mt-4 text-center"
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

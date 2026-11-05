'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { BilingualText } from '@/lib/translations';
import { legalForms } from '@/lib/creation-data';
import { modificationTypes } from '@/lib/modification-data';

interface MenuRubrique {
  name: BilingualText;
  href: string;
  /** One line under the link in the desktop panel */
  description?: BilingualText;
  /** File name in /public/custom-icons/SVG (official charter icons) */
  icon?: string;
}

// Descriptions come from the same data as the service pages, so the menu never says something different
const formDescription = (id: string): BilingualText | undefined => legalForms.find((form) => form.id === id)?.description;
const operationDescription = (id: string): BilingualText | undefined =>
  modificationTypes.find((operation) => operation.id === id)?.description;

interface MenuItem {
  name: BilingualText;
  href: string;
  /** Underline in the colour of the service area, as the brand charter asks (mobile menu) */
  accent: string;
  /** Dot in the same colour before the column title (desktop panel) */
  dot: string;
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
    dot: 'bg-section-creation',
    rubriques: [
      { name: { fr: 'Créer une SAS', en: 'Create a SAS' }, href: '/creation-entreprise/sas', description: formDescription('sas'), icon: '1ICONE_BICHROME.svg' },
      { name: { fr: 'Créer une SARL', en: 'Create a SARL' }, href: '/creation-entreprise/sarl', description: formDescription('sarl'), icon: '3ICONE_BICHROME.svg' },
      { name: { fr: 'Créer une SARLU', en: 'Create a SARLU' }, href: '/creation-entreprise/sarlu', description: formDescription('sarlu'), icon: '18ICONE_BICHROME.svg' },
      { name: { fr: 'Créer un Établissement', en: 'Create an Establishment' }, href: '/creation-entreprise/etablissement', description: formDescription('individual'), icon: '44ICONE_BICHROME.svg' },
      { name: { fr: 'Créer une Association', en: 'Create an Association' }, href: '/creation-entreprise/association', description: formDescription('association'), icon: '25ICONE_BICHROME.svg' },
      { name: { fr: 'Tous les statuts', en: 'All Legal Forms' }, href: '/creation-entreprise', description: { fr: 'Comparer et choisir le bon statut', en: 'Compare and pick the right structure' }, icon: '6ICONE_BICHROME.svg' },
    ],
  },
  {
    name: { fr: 'Modification d\'entreprise', en: 'Business Modification' },
    href: '/modification-entreprise',
    accent: 'border-section-gestion',
    dot: 'bg-section-gestion',
    rubriques: [
      { name: { fr: 'Transfert de siège social', en: 'Headquarters Transfer' }, href: '/modification-entreprise/transfert-siege', description: operationDescription('transfert-siege'), icon: '32ICONE_BICHROME.svg' },
      { name: { fr: 'Transformation SAS en SARL', en: 'SAS to SARL Conversion' }, href: '/modification-entreprise/sas-vers-sarl', description: operationDescription('sas-vers-sarl'), icon: '26ICONE_BICHROME.svg' },
      { name: { fr: 'Transformation SARL en SAS', en: 'SARL to SAS Conversion' }, href: '/modification-entreprise/sarl-vers-sas', description: operationDescription('sarl-vers-sas'), icon: '30ICONE_BICHROME.svg' },
      { name: { fr: 'Dissolution d\'entreprise', en: 'Business Dissolution' }, href: '/modification-entreprise/dissolution', description: operationDescription('dissolution'), icon: '34ICONE_BICHROME.svg' },
      { name: { fr: 'Toutes les modifications', en: 'All Modifications' }, href: '/modification-entreprise', description: { fr: 'Dirigeant, capital, objet social…', en: 'Director, share capital, business purpose…' }, icon: '4ICONE_BICHROME.svg' },
    ],
  },
  {
    name: { fr: 'Accompagnement', en: 'Support' },
    href: '/prendre-un-rendez-vous',
    accent: 'border-section-accompagnement',
    dot: 'bg-section-accompagnement',
    rubriques: [
      { name: { fr: 'Devis', en: 'Quote' }, href: '/contact#formulaire', description: { fr: 'Gratuit, envoyé par e-mail sous 48h', en: 'Free, emailed within 48h' }, icon: '9ICONE_BICHROME.svg' },
      { name: { fr: 'Avec un expert', en: 'With an Expert' }, href: '/prendre-un-rendez-vous', description: { fr: 'Consultation de 30 min, vidéo ou téléphone', en: '30-min consultation, video or phone' }, icon: '2ICONE_BICHROME.svg' },
      { name: { fr: 'Assistance LegalCameroun', en: 'LegalCameroun Assistance' }, href: '/contact', description: { fr: 'Une question ? Écrivez-nous', en: 'A question? Write to us' }, icon: '38ICONE_BICHROME.svg' },
    ],
  },
];

// The logo links home, so the bar keeps only what a visitor looks for
const navigation: NavItem[] = [
  { name: { fr: 'Nos Offres', en: 'Our Services' }, href: '#', dropdown: 'offers' },
  { name: { fr: 'Tarifs', en: 'Pricing' }, href: '/tarifs' },
  { name: { fr: 'À propos', en: 'About' }, href: '/a-propos' },
  { name: { fr: 'Actualité', en: 'Blog' }, href: '/actualite' },
  { name: { fr: 'Ressources', en: 'Resources' }, href: '#', dropdown: 'resources' },
  { name: { fr: 'Contact', en: 'Contact' }, href: '/contact' },
];

const resourceLinks: MenuRubrique[] = [
  { name: { fr: 'Fiches pratiques', en: 'Practical guides' }, href: '/fiches-pratiques' },
  { name: { fr: 'Simulateurs', en: 'Simulators' }, href: '/simulateurs' },
];

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

  // Escape closes the open dropdown and puts focus back on its button; a click elsewhere closes it too
  useEffect(() => {
    if (!openMenu) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenMenu(null);
      document.getElementById(`menu-button-${openMenu}`)?.focus();
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target as Element | null)?.closest('header')) setOpenMenu(null);
    };
    window.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [openMenu]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar */}
      <div
        className="bg-navy-ink"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end gap-4 h-8">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className={`text-xs font-medium transition-colors ${
                'text-white/70 hover:text-white'
              }`}
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>

            <span className={`text-xs ${'text-white/30'}`}>|</span>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`transition-colors ${
                'text-white/70 hover:text-white'
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
        className={`relative bg-navy transition-shadow duration-300 ${isScrolled || openMenu ? 'shadow-lg' : ''}`}
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
                filter: 'brightness(0) invert(1)'
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
            {navigation.map((item) => {
              const linkColor = 'text-white/90 hover:text-white';

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
                  // The offers panel spans the whole bar, so only the small resources list is positioned here
                  className={dropdown === 'resources' ? 'relative' : ''}
                  onPointerEnter={(event) => event.pointerType === 'mouse' && openDropdown(dropdown)}
                  onPointerLeave={(event) => event.pointerType === 'mouse' && closeDropdownSoon()}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeDropdown();
                  }}
                >
                  <button
                    id={`menu-button-${dropdown}`}
                    // A mouse has already opened it on hover, so its click keeps it open; touch and keyboard toggle it
                    onClick={(event) => {
                      if ((event.nativeEvent as PointerEvent).pointerType === 'mouse') openDropdown(dropdown);
                      else setOpenMenu(isOpen ? null : dropdown);
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`menu-panel-${dropdown}`}
                    className={`flex items-center gap-1 font-medium transition-colors ${
                      isOpen ? 'text-secondary-300' : linkColor
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

                  {/* Mega menu: right after its button, so Tab moves from the button into its links.
                      A dark blue floating card like the bar; gold titles keep the colour of their service area */}
                  {dropdown === 'offers' && (
                    <div
                      id="menu-panel-offers"
                      className={`hidden lg:block absolute left-0 right-0 top-full whitespace-normal transition duration-200 ease-out ${
                        isMegaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-b-2xl bg-navy-ink border border-white/10 border-t-secondary-400 shadow-2xl p-6 xl:p-8">
                          <div className="grid grid-cols-3 divide-x divide-white/10">
                            {menuItems.map((item) => (
                              <div key={item.name.fr} className="px-5 first:pl-0 last:pr-0">
                                <Link
                                  href={item.href}
                                  onClick={closeDropdown}
                                  className="flex items-center gap-2 px-2 mb-4 text-xs font-bold uppercase tracking-[0.18em] text-secondary-300 hover:text-secondary-200"
                                >
                                  <span className={`h-2 w-2 rounded-full ${item.dot}`} aria-hidden="true" />
                                  {item.name[language]}
                                </Link>
                                <div className="space-y-1">
                                  {item.rubriques.map((rubrique) => (
                                    <Link
                                      key={rubrique.name.fr}
                                      href={rubrique.href}
                                      onClick={closeDropdown}
                                      className="group/item flex items-start gap-3 rounded-lg p-2 hover:bg-white/5 transition-colors duration-150"
                                    >
                                      {rubrique.icon && (
                                        <span className="shrink-0 w-9 h-9 rounded-lg bg-white flex items-center justify-center" aria-hidden="true">
                                          <Image src={`/custom-icons/SVG/${rubrique.icon}`} alt="" width={22} height={22} />
                                        </span>
                                      )}
                                      <span className="min-w-0">
                                        <span className="block text-sm font-semibold text-white group-hover/item:text-secondary-200">
                                          {rubrique.name[language]}
                                        </span>
                                        {rubrique.description && (
                                          <span className="block text-xs text-gray-400 leading-snug">{rubrique.description[language]}</span>
                                        )}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Small list under the button; the top padding bridges the gap so hovering down keeps it open */}
                  {dropdown === 'resources' && (
                    <div
                      id="menu-panel-resources"
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
                className={`hidden xl:inline-flex items-center rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                  'border-white/40 text-white hover:bg-white hover:text-gray-900'
                }`}
              >
                {t.nav.appointment}
              </Link>
              {/* Main action in the charter's gold, readable on the dark blue bar */}
              <Link href="/contact?sujet=creation" className="btn-gold text-sm">
                {createCompanyLabel[language]}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6 text-white"
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

        {/* Mobile Menu: same dark blue panel, gold titles, icons and one-line descriptions as the desktop one */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[calc(100vh-6rem)] opacity-100' : 'max-h-0 opacity-0'
          }`}
          inert={!isMobileMenuOpen}
        >
          <div className="bg-navy-ink border-t border-secondary-400/60 px-4 py-5 max-h-[calc(100vh-6rem)] overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name.fr}>
                {item.dropdown === 'offers' ? (
                  <div className="pb-2">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-300 mb-2">{mobileOffersLabel[language]}</p>
                    {menuItems.map((menuItem, idx) => (
                      <div key={menuItem.name.fr} className="border-b border-white/10">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                          aria-expanded={activeDropdown === idx}
                          className="flex items-center justify-between w-full py-3 text-white font-semibold"
                        >
                          <span className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${menuItem.dot}`} aria-hidden="true" />
                            {menuItem.name[language]}
                          </span>
                          <svg
                            className={`w-4 h-4 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-200 ${
                            activeDropdown === idx ? 'max-h-[40rem] pb-3' : 'max-h-0'
                          }`}
                        >
                          {menuItem.rubriques.map((rubrique) => (
                            <Link
                              key={rubrique.name.fr}
                              href={rubrique.href}
                              className="flex items-start gap-3 rounded-lg p-2 active:bg-white/5"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {rubrique.icon && (
                                <span className="shrink-0 w-9 h-9 rounded-lg bg-white flex items-center justify-center" aria-hidden="true">
                                  <Image src={`/custom-icons/SVG/${rubrique.icon}`} alt="" width={22} height={22} />
                                </span>
                              )}
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-white">{rubrique.name[language]}</span>
                                {rubrique.description && (
                                  <span className="block text-xs text-gray-400 leading-snug">{rubrique.description[language]}</span>
                                )}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : item.dropdown === 'resources' ? (
                  <div className="border-b border-white/10">
                    <button
                      onClick={() => setIsMobileResourcesOpen((open) => !open)}
                      aria-expanded={isMobileResourcesOpen}
                      className="flex items-center justify-between w-full py-3 text-white font-medium"
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
                    <div className={`overflow-hidden transition-all duration-200 ${isMobileResourcesOpen ? 'max-h-60 pb-2' : 'max-h-0'}`}>
                      {resourceLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block py-2 pl-4 text-sm text-gray-300 hover:text-secondary-200"
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
                    className="block py-3 text-white font-medium border-b border-white/10 hover:text-secondary-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name[language]}
                  </Link>
                )}
              </div>
            ))}

            <Link
              href="/contact?sujet=creation"
              className="btn-gold w-full mt-5 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {createCompanyLabel[language]}
            </Link>
            <Link
              href="/prendre-un-rendez-vous"
              className="block w-full mt-3 text-center rounded-lg border-2 border-white/40 px-6 py-3 font-semibold text-white hover:bg-white hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.nav.appointment}
            </Link>

            {/* Language and Theme - Mobile */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                className="text-sm text-white/70 hover:text-white"
              >
                {language === 'fr' ? 'English' : 'Français'}
              </button>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="text-white/70 hover:text-white"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

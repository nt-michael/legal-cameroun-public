'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { translations, Language, Translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // Priority 1: URL prefix (middleware rewrites, but client sees the original URL)
    const pathname = window.location.pathname;
    if (pathname.startsWith('/en')) {
      setLanguageState('en');
      localStorage.setItem('language', 'en');
      document.cookie = `lang=en; path=/; max-age=31536000; SameSite=Lax`;
      return;
    }
    if (pathname.startsWith('/fr')) {
      setLanguageState('fr');
      localStorage.setItem('language', 'fr');
      document.cookie = `lang=fr; path=/; max-age=31536000; SameSite=Lax`;
      return;
    }

    // Priority 2: localStorage
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang === 'fr' || savedLang === 'en') {
      setLanguageState(savedLang);
      document.cookie = `lang=${savedLang}; path=/; max-age=31536000; SameSite=Lax`;
      return;
    }

    // Priority 3: cookie set by middleware
    const cookieLang = document.cookie
      .split('; ')
      .find(row => row.startsWith('lang='))
      ?.split('=')[1] as Language | undefined;
    if (cookieLang === 'fr' || cookieLang === 'en') {
      setLanguageState(cookieLang);
      localStorage.setItem('language', cookieLang);
      return;
    }

    // Final fallback: navigator.language
    const browserLang = navigator.language || 'fr';
    const detectedLang: Language = browserLang.toLowerCase().startsWith('en') ? 'en' : 'fr';
    setLanguageState(detectedLang);
    document.cookie = `lang=${detectedLang}; path=/; max-age=31536000; SameSite=Lax`;
    localStorage.setItem('language', detectedLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.cookie = `lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;

    const currentPath = window.location.pathname;
    let newPath: string;
    if (lang === 'en') {
      newPath = currentPath.startsWith('/en') || currentPath.startsWith('/fr')
        ? '/en' + currentPath.slice(3)
        : '/en' + currentPath;
    } else {
      newPath = (currentPath.startsWith('/en') || currentPath.startsWith('/fr'))
        ? currentPath.slice(3) || '/'
        : currentPath;
    }
    router.push(newPath);
  };

  const t = translations[language];

  // Prevent hydration mismatch by returning default language during SSR
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'fr', setLanguage, t: translations.fr }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

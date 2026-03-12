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

    // Priority: localStorage > existing cookie (set by middleware) > navigator
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang === 'fr' || savedLang === 'en') {
      setLanguageState(savedLang);
      document.cookie = `lang=${savedLang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      return;
    }

    // Read cookie set by middleware (available via document.cookie)
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
    document.cookie = `lang=${detectedLang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    localStorage.setItem('language', detectedLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    router.refresh();
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

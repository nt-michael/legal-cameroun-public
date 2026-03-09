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

    // Check localStorage first
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      setLanguageState(savedLang);
      document.cookie = `lang=${savedLang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      return;
    }

    // Detect browser language
    const browserLang = navigator.language || (navigator as unknown as { userLanguage?: string }).userLanguage || 'fr';
    const detectedLang = browserLang.toLowerCase().startsWith('en') ? 'en' : 'fr';
    setLanguageState(detectedLang);
    document.cookie = `lang=${detectedLang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
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

// Bilingual text type for inline translations
// Usage: { fr: 'Bonjour', en: 'Hello' }

export type Language = 'fr' | 'en';

export interface BilingualText {
  fr: string;
  en: string;
}

// Helper to create a bilingual text object
export function bi(fr: string, en: string): BilingualText {
  return { fr, en };
}

// Get text from a BilingualText or plain string
export function getText(value: BilingualText | string | undefined | null, language: Language): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[language];
}

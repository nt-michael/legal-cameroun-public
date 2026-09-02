import { cookies, headers } from 'next/headers';
import type { Language } from './translations';

/**
 * Language for the current request.
 *
 * The middleware rewrites /en/* to /* and sets a `lang` cookie that Next.js makes
 * visible to this render, so the cookie is the primary signal. The Accept-Language
 * fallback covers the first request of a session, before the cookie exists.
 */
export async function getRequestLanguage(): Promise<Language> {
  const cookieLang = (await cookies()).get('lang')?.value;
  if (cookieLang === 'en' || cookieLang === 'fr') return cookieLang;

  const acceptLang = (await headers()).get('accept-language') ?? '';
  const primary = acceptLang.split(',')[0].split(';')[0].trim().toLowerCase();
  return primary.startsWith('en') ? 'en' : 'fr';
}

/**
 * Canonical origin for the public site.
 *
 * Production serves https://www.legalcameroun.com — the apex domain 307-redirects
 * to it — so every absolute URL we emit (canonical, hreflang, og:url, sitemap,
 * robots) must use the www host. Keeping it in one place stops the two hosts
 * drifting apart again.
 */
export const SITE_URL = (
  process.env.Frontend_SITE_URL || 'https://www.legalcameroun.com'
).replace(/\/+$/, '');

/** Absolute URL for a site-relative path, in the given language. */
export function absoluteUrl(path: string, lang: 'fr' | 'en' = 'fr'): string {
  const clean = path === '/' ? '' : path;
  return lang === 'en' ? `${SITE_URL}/en${clean}` : `${SITE_URL}${clean || '/'}`;
}

/** Image shown when a page is shared (WhatsApp, LinkedIn, Facebook) and has no image of its own */
export const DEFAULT_SHARE_IMAGE = {
  url: '/images/og-default.png',
  width: 1200,
  height: 630,
  alt: 'Legal Cameroun, votre legaltech au Cameroun',
};

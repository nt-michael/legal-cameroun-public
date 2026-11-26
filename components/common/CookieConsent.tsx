'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ConsentChoice,
  GA_ID,
  OPEN_SETTINGS_EVENT,
  deleteAnalyticsCookies,
  readConsent,
  saveConsent,
  subscribeConsent,
} from '@/lib/consent';

// 13 months of 30.4 days, in seconds
const GA_COOKIE_LIFETIME_SECONDS = 13 * 30.4 * 24 * 60 * 60;

const text = {
  title: { fr: 'Mesure d’audience', en: 'Audience measurement' },
  body: {
    fr: 'Avec votre accord, nous utilisons Google Analytics pour savoir quelles pages sont lues et améliorer le site. Sans accord, aucun cookie de mesure n’est déposé.',
    en: 'With your consent, we use Google Analytics to see which pages are read and improve the site. Without consent, no measurement cookie is set.',
  },
  privacy: { fr: 'Politique de confidentialité', en: 'Privacy Policy' },
  refuse: { fr: 'Refuser', en: 'Decline' },
  accept: { fr: 'Accepter', en: 'Accept' },
};

// Cookie banner plus Google Analytics, which loads only after the visitor accepts.
// Nothing renders when NEXT_PUBLIC_GA_ID is not set.
export default function CookieConsent() {
  const { language } = useLanguage();
  // 'unknown' on the server and during hydration, so the banner never flashes before the stored choice is read
  const consent = useSyncExternalStore<ConsentChoice | null | 'unknown'>(subscribeConsent, readConsent, () => 'unknown');
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!GA_ID) return null;

  const bannerOpen = consent === null || reopened;

  const choose = (choice: ConsentChoice) => {
    const wasGranted = consent === 'granted';
    saveConsent(choice);
    setReopened(false);
    // Google Analytics is already running in this page: clear its cookies and reload without it
    if (choice === 'denied' && wasGranted) {
      deleteAnalyticsCookies();
      window.location.reload();
    }
  };

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          {/* Cookies last 13 months at most (privacy policy, section 5): GA's default is 2 years,
              and cookie_update: false stops each new visit from pushing the expiry back */}
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { cookie_expires: ${GA_COOKIE_LIFETIME_SECONDS}, cookie_update: false });`}
          </Script>
        </>
      )}

      {bannerOpen && (
        <div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-body"
          className="fixed inset-x-4 bottom-4 z-[60] sm:right-auto sm:max-w-md rounded-2xl bg-navy text-white p-6 shadow-2xl motion-safe:animate-[fadeInUp_300ms_ease-out]"
        >
          <h2 id="cookie-consent-title" className="text-base font-bold">
            {text.title[language]}
          </h2>
          <p id="cookie-consent-body" className="mt-2 text-sm leading-relaxed text-white/80">
            {text.body[language]}{' '}
            <Link href="/politique-de-confidentialite" className="underline underline-offset-2 hover:text-secondary-300">
              {text.privacy[language]}
            </Link>
          </p>
          {/* Both choices get the same size and weight: declining must be as easy as accepting */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => choose('denied')}
              className="rounded-lg border-2 border-white/40 py-2.5 text-sm font-semibold hover:border-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-300"
            >
              {text.refuse[language]}
            </button>
            <button
              type="button"
              onClick={() => choose('granted')}
              className="btn-gold text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-300"
            >
              {text.accept[language]}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

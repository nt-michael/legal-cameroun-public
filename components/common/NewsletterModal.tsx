'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const DISMISSED_KEY = 'newsletter_dismissed';
const SUBSCRIBED_KEY = 'newsletter_subscribed';
const SCROLL_THRESHOLD = 0.3;

const text = {
  title: { fr: 'Restez informé', en: 'Stay informed' },
  subtitle: {
    fr: "Rejoignez des milliers d'entrepreneurs camerounais et recevez nos analyses juridiques et guides pratiques chaque semaine.",
    en: 'Join thousands of Cameroonian entrepreneurs and receive our legal analyses and practical guides every week.',
  },
  firstNamePlaceholder: { fr: 'Prénom', en: 'First name' },
  lastNamePlaceholder: { fr: 'Nom', en: 'Last name' },
  emailPlaceholder: { fr: 'Votre adresse email', en: 'Your email address' },
  subscribe: { fr: "S'abonner gratuitement", en: 'Subscribe for free' },
  subscribing: { fr: 'Inscription…', en: 'Subscribing…' },
  noSpam: { fr: 'Pas de spam. Désabonnez-vous à tout moment.', en: 'No spam. Unsubscribe at any time.' },
  successTitle: { fr: 'Merci !', en: 'Thank you!' },
  successMsg: {
    fr: "Vous êtes inscrit ! Vous recevrez bientôt nos analyses et guides pratiques.",
    en: "You're subscribed! You'll soon receive our analyses and practical guides.",
  },
  errorInvalid: { fr: 'Adresse email invalide.', en: 'Invalid email address.' },
  errorGeneric: { fr: 'Une erreur est survenue. Veuillez réessayer.', en: 'An error occurred. Please try again.' },
};

export default function NewsletterModal() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const open = useCallback(() => {
    setVisible(true);
    // Small delay so the initial class renders before transition kicks in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimateIn(true));
    });
  }, []);

  const close = useCallback(() => {
    setAnimateIn(false);
    setTimeout(() => setVisible(false), 350);
    try { localStorage.setItem(DISMISSED_KEY, '1'); } catch {}
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISSED_KEY) || localStorage.getItem(SUBSCRIBED_KEY)) return;
    } catch {}

    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
      if (scrolled >= SCROLL_THRESHOLD) {
        window.removeEventListener('scroll', onScroll);
        open();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  const handleSubscribe = async () => {
    setSubStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      const data = await res.json();
      if (res.ok || data.error === 'already_subscribed') {
        setSubStatus('success');
        try { localStorage.setItem(SUBSCRIBED_KEY, '1'); } catch {}
      } else if (data.error === 'invalid_email') {
        setSubStatus('error');
        setErrorMsg(text.errorInvalid[language]);
      } else {
        setSubStatus('error');
        setErrorMsg(text.errorGeneric[language]);
      }
    } catch {
      setSubStatus('error');
      setErrorMsg(text.errorGeneric[language]);
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
        animateIn ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={close}
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl transition-all duration-400 ease-out ${
          animateIn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
        }`}
        style={{ transitionDuration: '400ms' }}
      >
        {/* Header band */}
        <div className="relative bg-gradient-to-r from-primary-700 to-primary-600 px-8 py-7 text-white">
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-8 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 pointer-events-none" />

          <div className="relative flex items-center gap-4">
            <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <div>
              <h2 className="text-xl font-bold leading-tight">{text.title[language]}</h2>
              <p className="text-primary-100 text-sm mt-0.5 leading-snug">{text.subtitle[language]}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white dark:bg-gray-800 px-8 py-7">
          {subStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center py-4 text-center gap-3">
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/40">
                <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{text.successTitle[language]}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{text.successMsg[language]}</p>
              <button
                onClick={close}
                className="mt-2 px-6 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors text-sm"
              >
                OK
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={text.firstNamePlaceholder[language]}
                  disabled={subStatus === 'loading'}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none disabled:opacity-60 transition text-sm"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={text.lastNamePlaceholder[language]}
                  disabled={subStatus === 'loading'}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none disabled:opacity-60 transition text-sm"
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={text.emailPlaceholder[language]}
                disabled={subStatus === 'loading'}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none disabled:opacity-60 transition text-sm"
              />
              <button
                onClick={handleSubscribe}
                disabled={subStatus === 'loading'}
                className="w-full py-3 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 active:scale-95 transition-all disabled:opacity-60 shadow-md shadow-primary-600/30 text-sm"
              >
                {subStatus === 'loading' ? text.subscribing[language] : text.subscribe[language]}
              </button>

              {subStatus === 'error' && errorMsg && (
                <p className="text-xs text-red-600 dark:text-red-400 text-center">{errorMsg}</p>
              )}

              <p className="text-xs text-gray-400 dark:text-gray-500 text-center flex items-center justify-center gap-1.5 mt-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {text.noSpam[language]}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

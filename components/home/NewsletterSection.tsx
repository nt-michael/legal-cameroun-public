'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

const text = {
  badge: { fr: 'Newsletter', en: 'Newsletter' },
  title: { fr: 'Rejoignez notre communauté', en: 'Join our community' },
  subtitle: {
    fr: "Des milliers d'entrepreneurs camerounais font confiance à nos analyses. Recevez chaque semaine nos guides pratiques directement dans votre boîte mail.",
    en: 'Thousands of Cameroonian entrepreneurs trust our analyses. Receive our practical guides in your inbox every week.',
  },
  benefits: {
    fr: [
      'Analyses juridiques et fiscales exclusives',
      'Guides pratiques pour créer et gérer votre entreprise',
      'Alertes sur les changements réglementaires au Cameroun',
    ],
    en: [
      'Exclusive legal and tax analyses',
      'Practical guides to create and manage your business',
      'Alerts on regulatory changes in Cameroon',
    ],
  },
  firstNamePlaceholder: { fr: 'Prénom', en: 'First name' },
  lastNamePlaceholder: { fr: 'Nom', en: 'Last name' },
  emailPlaceholder: { fr: 'Votre adresse email', en: 'Your email address' },
  subscribe: { fr: "S'abonner gratuitement", en: 'Subscribe for free' },
  subscribing: { fr: 'Inscription…', en: 'Subscribing…' },
  successTitle: { fr: 'Bienvenue !', en: 'Welcome!' },
  successMsg: {
    fr: 'Vous êtes maintenant inscrit à notre newsletter. À très bientôt !',
    en: "You're now subscribed to our newsletter. See you soon!",
  },
  errorInvalid: { fr: 'Adresse email invalide.', en: 'Invalid email address.' },
  errorGeneric: { fr: 'Une erreur est survenue. Veuillez réessayer.', en: 'An error occurred. Please try again.' },
  privacy: {
    fr: 'Pas de spam. Désabonnez-vous à tout moment.',
    en: 'No spam. Unsubscribe at any time.',
  },
};

export default function NewsletterSection() {
  const { language } = useLanguage();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '50px' });

  const handleSubscribe = async () => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFirstName('');
        setLastName('');
        setEmail('');
      } else if (data.error === 'invalid_email') {
        setStatus('error');
        setErrorMsg(text.errorInvalid[language]);
      } else if (data.error === 'already_subscribed') {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(text.errorGeneric[language]);
      }
    } catch {
      setStatus('error');
      setErrorMsg(text.errorGeneric[language]);
    }
  };

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-[#f5f0e8] via-white to-[#e6f0f3] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Decorative SVG dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="newsletter-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#0a3d4f" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#newsletter-dots)" />
        </svg>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-100/40 dark:bg-primary-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary-200/40 dark:bg-secondary-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left: Copy */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {text.badge[language]}
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {text.title[language]}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {text.subtitle[language]}
            </p>

            <ul className="space-y-4">
              {text.benefits[language].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/60 dark:shadow-gray-900/60 p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{text.successTitle[language]}</h3>
                <p className="text-gray-600 dark:text-gray-300">{text.successMsg[language]}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={text.firstNamePlaceholder[language]}
                    disabled={status === 'loading'}
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none disabled:opacity-60 transition"
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={text.lastNamePlaceholder[language]}
                    disabled={status === 'loading'}
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none disabled:opacity-60 transition"
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={text.emailPlaceholder[language]}
                  disabled={status === 'loading'}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:outline-none disabled:opacity-60 transition"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === 'loading'}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-primary-600 hover:bg-primary-700 active:scale-95 transition-all duration-200 disabled:opacity-60 shadow-md shadow-primary-600/30"
                >
                  {status === 'loading' ? text.subscribing[language] : text.subscribe[language]}
                </button>

                {status === 'error' && errorMsg && (
                  <p className="text-sm text-red-600 dark:text-red-400 text-center">{errorMsg}</p>
                )}

                <p className="text-xs text-gray-400 dark:text-gray-500 text-center flex items-center justify-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  {text.privacy[language]}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

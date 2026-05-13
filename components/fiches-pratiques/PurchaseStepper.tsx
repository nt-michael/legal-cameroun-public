'use client';

import { useState } from 'react';
import gsap from 'gsap';
import { Pack } from '@/lib/packs-config';
import { useLanguage } from '@/contexts/LanguageContext';

interface PurchaseStepperProps {
  pack: Pack;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const text: Record<string, any> = {
  step0Title: { fr: 'Vos coordonnées', en: 'Your details' },
  step0Subtitle: { fr: 'Pour recevoir votre pack par email', en: 'To receive your pack by email' },
  step1Title: { fr: 'Récapitulatif', en: 'Summary' },
  step1Subtitle: { fr: 'Vérifiez avant de payer', en: 'Review before paying' },
  firstName: { fr: 'Prénom', en: 'First name' },
  lastName: { fr: 'Nom', en: 'Last name' },
  email: { fr: 'Email', en: 'Email' },
  emailPlaceholder: { fr: 'votre@email.com', en: 'your@email.com' },
  phone: { fr: 'Téléphone', en: 'Phone' },
  pack: { fr: 'Pack', en: 'Pack' },
  price: { fr: 'Prix', en: 'Price' },
  name: { fr: 'Nom', en: 'Name' },
  payNote: {
    fr: 'Vous serez redirigé vers Notch Pay pour finaliser le paiement.',
    en: 'You will be redirected to Notch Pay to complete payment.',
  },
  back: { fr: 'Retour', en: 'Back' },
  continue: { fr: 'Continuer', en: 'Continue' },
  pay: { fr: 'Payer maintenant', en: 'Pay now' },
  processing: { fr: 'Traitement...', en: 'Processing...' },
  errFirstName: { fr: 'Prénom requis', en: 'First name required' },
  errLastName: { fr: 'Nom requis', en: 'Last name required' },
  errEmail: { fr: 'Email requis', en: 'Email required' },
  errEmailInvalid: { fr: 'Format email invalide', en: 'Invalid email format' },
  errPhone: { fr: 'Téléphone requis', en: 'Phone required' },
  errGeneral: { fr: 'Une erreur est survenue', en: 'An error occurred' },
};

export default function PurchaseStepper({ pack, onClose }: PurchaseStepperProps) {
  const { language } = useLanguage();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({ firstName: '', lastName: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!formData.firstName.trim()) e.firstName = text.errFirstName[language];
    if (!formData.lastName.trim()) e.lastName = text.errLastName[language];
    if (!formData.email.trim()) {
      e.email = text.errEmail[language];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = text.errEmailInvalid[language];
    }
    if (!formData.phone.trim()) e.phone = text.errPhone[language];
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const animateStep = (next: number) => {
    const dir = next > step ? -20 : 20;
    gsap.to('.purchase-step', {
      opacity: 0, y: -dir, duration: 0.2,
      onComplete: () => {
        setStep(next);
        gsap.fromTo('.purchase-step', { opacity: 0, y: dir }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      },
    });
  };

  const next = () => { if (validate()) animateStep(1); };
  const back = () => animateStep(0);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});
    try {
      const res = await fetch('/api/purchases/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packSlug: pack.slug, ...formData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error('No payment URL returned');
      }
    } catch (err: any) {
      setErrors({ general: err.message || text.errGeneral[language] });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Modal header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-wider">
              {step === 0 ? text.step0Title[language] : text.step1Title[language]}
            </p>
            <h2 className="text-white font-bold text-lg">{pack.name[language]}</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex h-1 bg-gray-100 dark:bg-gray-700">
          <div
            className="bg-primary-500 transition-all duration-500"
            style={{ width: step === 0 ? '50%' : '100%' }}
          />
        </div>

        {/* Step content */}
        <div className="p-6 purchase-step">
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">{text.step0Subtitle[language]}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {text.firstName[language]}
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => update('firstName', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 focus:outline-none transition-colors ${
                      errors.firstName
                        ? 'border-red-500'
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {text.lastName[language]}
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 focus:outline-none transition-colors ${
                      errors.lastName
                        ? 'border-red-500'
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {text.email[language]}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder={text.emailPlaceholder[language]}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-red-500'
                      : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {text.phone[language]}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="+237 6 XX XX XX XX"
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 focus:outline-none transition-colors ${
                    errors.phone
                      ? 'border-red-500'
                      : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{text.step1Subtitle[language]}</p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-5 space-y-3 mb-5">
                {[
                  { label: text.pack[language], value: pack.name[language] },
                  { label: text.name[language], value: `${formData.firstName} ${formData.lastName}` },
                  { label: text.email[language], value: formData.email },
                  { label: text.phone[language], value: formData.phone },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center text-sm border-b border-gray-200 dark:border-gray-600 pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-500 dark:text-gray-400">{label}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-1">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{text.price[language]}</span>
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(pack.price)}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{text.payNote[language]}</p>
              {errors.general && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl text-sm text-center">
                  {errors.general}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 pb-6">
          {step === 1 ? (
            <button
              onClick={back}
              disabled={isSubmitting}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-5 py-2.5 rounded-xl font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {text.back[language]}
            </button>
          ) : (
            <span />
          )}

          {step === 0 ? (
            <button
              onClick={next}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-7 py-2.5 rounded-xl font-semibold transition-colors"
            >
              {text.continue[language]}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-7 py-2.5 rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {text.processing[language]}
                </>
              ) : (
                <>
                  {text.pay[language]}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

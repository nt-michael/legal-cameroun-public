'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactSubjects, formLabels } from '@/lib/contact-data';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Input focus animation
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    gsap.to(e.target, {
      borderColor: '#0a3d4f',
      boxShadow: '0 0 0 3px rgba(37,99,235,0.2)',
      duration: 0.3,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const hasError = errors[e.target.name as keyof FormErrors];
    gsap.to(e.target, {
      borderColor: hasError ? '#ef4444' : '#d1d5db',
      boxShadow: 'none',
      duration: 0.3,
    });
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Le nom est requis';
        if (value.length < 2) return 'Le nom doit contenir au moins 2 caractères';
        break;
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email invalide';
        break;
      case 'phone':
        if (!value.trim()) return 'Le téléphone est requis';
        if (!/^[\d\s+()-]{8,}$/.test(value)) return 'Numéro invalide';
        break;
      case 'subject':
        if (!value) return 'Veuillez sélectionner un sujet';
        break;
      case 'message':
        if (!value.trim()) return 'Le message est requis';
        if (value.length < 10) return 'Le message doit contenir au moins 10 caractères';
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Animate success modal
    if (successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }
      );
    }
  };

  if (isSuccess) {
    return (
      <section ref={sectionRef} className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={successRef}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 text-center shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {formLabels.successTitle[language]}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {formLabels.successMessage[language]}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {formLabels.successCta[language]}
            </p>
            <Link
              href="/prendre-un-rendez-vous"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Réserver un RDV
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 800 800">
          <pattern id="contact-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 Q 15 15, 30 30 T 60 30" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary-600" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#contact-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formLabels.fullName[language]} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none transition-all duration-300`}
                placeholder={formLabels.fullNamePlaceholder[language]}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email & Phone Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formLabels.email[language]} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none transition-all duration-300`}
                  placeholder={formLabels.emailPlaceholder[language]}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {formLabels.phone[language]} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none transition-all duration-300`}
                  placeholder="+237 6XX XXX XXX"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formLabels.subject[language]} <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none transition-all duration-300`}
              >
                <option value="">Sélectionnez un sujet</option>
                {contactSubjects.map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label[language]}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formLabels.message[language]} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                rows={5}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none transition-all duration-300 resize-none`}
                placeholder={formLabels.messagePlaceholder[language]}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            {/* File Upload (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formLabels.file[language]}
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-primary-400 transition-colors">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {formLabels.filePlaceholder[language]}
                  </span>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {formLabels.submitting[language]}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {formLabels.submit[language]}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

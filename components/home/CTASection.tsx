'use client';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

const ctaText = {
  title: { fr: 'Besoin d\'un Conseil Juridique?', en: 'Need Legal Advice?' },
  subtitle: {
    fr: 'Notre equipe d\'experts est prete a vous accompagner. Beneficiez d\'une consultation initiale gratuite pour discuter de votre situation.',
    en: 'Our team of experts is ready to assist you. Benefit from a free initial consultation to discuss your situation.',
  },
  appointment: { fr: 'Prendre Rendez-vous', en: 'Book an Appointment' },
  address: { fr: 'Adresse', en: 'Address' },
  hours: { fr: 'Horaires', en: 'Hours' },
  hoursValue: { fr: 'Lun - Ven: 8h - 18h', en: 'Mon - Fri: 8am - 6pm' },
};

export default function CTASection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
  });
  const { language } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 ${
            inView ? 'animate-scale-in' : 'opacity-0'
          }`}
          style={{ background: 'linear-gradient(to right, #2563eb, #1e40af)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full animate-bubble-1" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full animate-bubble-2" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full animate-bubble-pulse" />
          <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-bubble-3" />
          <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-white/10 rounded-full animate-bubble-1 animation-delay-500" />
          <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-bubble-2 animation-delay-300" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
                {ctaText.title[language]}
              </h2>
              <p className="text-lg max-w-xl" style={{ color: '#dbeafe' }}>
                {ctaText.subtitle[language]}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/prendre-un-rendez-vous"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {ctaText.appointment[language]}
              </Link>
              <a
                href="tel:+237233420000"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 border border-white/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +237 233 42 00 00
              </a>
            </div>
          </div>

          <div className="relative z-10 mt-12 pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 group" style={{ color: '#ffffff' }}>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#bfdbfe' }}>{ctaText.address[language]}</p>
                  <p className="font-medium" style={{ color: '#ffffff' }}>Bonanjo, Douala</p>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 group" style={{ color: '#ffffff' }}>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#bfdbfe' }}>{ctaText.hours[language]}</p>
                  <p className="font-medium" style={{ color: '#ffffff' }}>{ctaText.hoursValue[language]}</p>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 group" style={{ color: '#ffffff' }}>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm" style={{ color: '#bfdbfe' }}>Email</p>
                  <p className="font-medium" style={{ color: '#ffffff' }}>contact@legalcameroun.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

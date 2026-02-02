'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: { fr: 'Prise de Contact', en: 'Initial Contact' },
    description: {
      fr: 'Contactez-nous par telephone, email ou via notre formulaire en ligne pour planifier votre consultation initiale gratuite.',
      en: 'Contact us by phone, email, or through our online form to schedule your free initial consultation.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: { fr: 'Analyse du Dossier', en: 'Case Analysis' },
    description: {
      fr: 'Nos avocats analysent votre situation en profondeur et identifient les meilleures strategies juridiques pour votre cas.',
      en: 'Our lawyers thoroughly analyze your situation and identify the best legal strategies for your case.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '03',
    title: { fr: 'Strategie & Devis', en: 'Strategy & Quote' },
    description: {
      fr: 'Nous vous presentons notre plan d\'action detaille et un devis transparent avant de commencer toute procedure.',
      en: 'We present our detailed action plan and a transparent quote before starting any procedure.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: { fr: 'Execution & Suivi', en: 'Execution & Follow-up' },
    description: {
      fr: 'Nous executons la strategie avec rigueur et vous tenons informe a chaque etape jusqu\'a la resolution de votre affaire.',
      en: 'We execute the strategy rigorously and keep you informed at every step until your case is resolved.',
    },
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const sectionText = {
  badge: { fr: 'Comment Ca Marche', en: 'How It Works' },
  title: { fr: 'Un Processus Simple et Efficace', en: 'A Simple and Effective Process' },
  subtitle: {
    fr: 'De votre premier contact a la resolution de votre affaire, nous vous accompagnons a chaque etape avec professionnalisme.',
    en: 'From your first contact to the resolution of your case, we support you at every step with professionalism.',
  },
  cta: {
    fr: 'Pret a commencer? Contactez-nous pour une consultation gratuite.',
    en: 'Ready to start? Contact us for a free consultation.',
  },
  ctaButton: { fr: 'Prendre Rendez-vous', en: 'Book an Appointment' },
};

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    const progressLine = progressLineRef.current;
    const stepsContainer = stepsContainerRef.current;

    if (!section || !progressLine || !stepsContainer) return;

    const ctx = gsap.context(() => {
      gsap.set(progressLine, { scaleX: 0 });

      stepRefs.current.forEach((step) => {
        if (!step) return;
        const card = step.querySelector('.step-card');
        const number = step.querySelector('.step-number');
        const connector = step.querySelector('.step-connector');

        gsap.set(card, { opacity: 0, y: 60, scale: 0.9 });
        gsap.set(number, { scale: 0, rotate: -180 });
        if (connector) gsap.set(connector, { scaleX: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      tl.to(progressLine, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power2.inOut'
      }, 0);

      stepRefs.current.forEach((step, index) => {
        if (!step) return;

        const card = step.querySelector('.step-card');
        const number = step.querySelector('.step-number');
        const connector = step.querySelector('.step-connector');

        const delay = index * 0.15;

        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        }, delay);

        tl.to(number, {
          scale: 1,
          rotate: 0,
          duration: 0.4,
          ease: 'back.out(1.7)',
        }, delay + 0.2);

        if (connector) {
          tl.to(connector, {
            scaleX: 1,
            duration: 0.3,
            ease: 'power2.out',
          }, delay + 0.4);
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-medium mb-4">
            {sectionText.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {sectionText.title[language]}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {sectionText.subtitle[language]}
          </p>
        </div>

        <div ref={stepsContainerRef} className="relative">
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-1 bg-gray-200 rounded-full" />
          <div
            ref={progressLineRef}
            className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 rounded-full origin-left"
            style={{ transform: 'scaleX(0)' }}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[index] = el; }}
                className="relative"
              >
                <div className="step-number absolute -top-3 left-1/2 -translate-x-1/2 lg:top-[3rem] z-20 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-600/30">
                  {index + 1}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className="step-connector hidden lg:block absolute top-[4.5rem] left-[60%] right-[-40%] h-1 bg-primary-400 origin-left z-10"
                    style={{ transform: 'scaleX(0)' }}
                  />
                )}

                <div className="step-card bg-white rounded-2xl p-6 pt-10 lg:pt-16 lg:mt-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title[language]}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            {sectionText.cta[language]}
          </p>
          <Link href="/prendre-un-rendez-vous" className="btn-primary">
            {sectionText.ctaButton[language]}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

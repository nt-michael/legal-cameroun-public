'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { contactHeroData } from '@/lib/contact-data';
import { useLanguage } from '@/contexts/LanguageContext';

interface ParticleStyle {
  width: number;
  height: number;
  left: number;
}

const actionIcons: Record<string, React.ReactNode> = {
  calendar: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  document: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
};

export default function ContactHero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const phoneBtnRef = useRef<HTMLAnchorElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [particleStyles, setParticleStyles] = useState<ParticleStyle[]>([]);
  const { language } = useLanguage();

  // Generate particle styles on client only to avoid hydration mismatch
  useEffect(() => {
    const styles = [...Array(20)].map(() => ({
      width: 4 + Math.random() * 8,
      height: 4 + Math.random() * 8,
      left: Math.random() * 100,
    }));
    setParticleStyles(styles);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
      }

      // Content stagger
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
        );
      }

      // Actions animation
      if (actionsRef.current) {
        gsap.fromTo(
          actionsRef.current.children,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.6, ease: 'back.out(1.4)' }
        );
      }

      // Phone button pulse
      if (phoneBtnRef.current) {
        gsap.to(phoneBtnRef.current, {
          scale: 1.03,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // Animate particles
      if (particlesRef.current) {
        const particles = particlesRef.current.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
          const duration = 8 + Math.random() * 6;
          const delay = index * 0.3;

          gsap.fromTo(
            particle,
            {
              y: '100vh',
              x: Math.random() * 100 - 50,
              opacity: 0,
              scale: 0.5 + Math.random() * 0.5
            },
            {
              y: '-100vh',
              x: `+=${Math.random() * 200 - 100}`,
              opacity: 0.6,
              duration: duration,
              delay: delay,
              repeat: -1,
              ease: 'none',
            }
          );
        });
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom right, #041c28, #0a3d4f, #041c28)',
      }}
    >
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {particleStyles.map((style, i) => (
          <div
            key={i}
            className="particle absolute rounded-full bg-primary-400/30"
            style={{
              width: `${style.width}px`,
              height: `${style.height}px`,
              left: `${style.left}%`,
              bottom: '-20px',
            }}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-primary-400/10 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6">
            {contactHeroData.badge[language]}
          </span>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {contactHeroData.title[language]}
          </h1>

          {/* Content */}
          <div ref={contentRef} className="space-y-4 mb-10">
            <p className="text-xl text-gray-300">
              {contactHeroData.subtitle[language]}
            </p>
            <p className="text-lg text-primary-300 font-medium">
              {contactHeroData.responseTime[language]}
            </p>
            <p className="text-gray-400">
              {contactHeroData.trustBadge[language]}
            </p>
          </div>

          {/* Quick Actions */}
          <div ref={actionsRef} className="flex flex-col sm:flex-row gap-4">
            {contactHeroData.quickActions.map((action, index) => (
              action.variant === 'phone' ? (
                <a
                  key={action.text[language]}
                  ref={index === 2 ? phoneBtnRef : null}
                  href={action.href}
                  className="inline-flex flex-col items-center justify-center bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg shadow-green-600/30"
                >
                  <span className="flex items-center gap-2">
                    {actionIcons[action.icon]}
                    {action.text[language]}
                  </span>
                  {action.subtext && (
                    <span className="text-sm text-green-100 mt-1">{action.subtext}</span>
                  )}
                </a>
              ) : action.variant === 'primary' ? (
                <Link
                  key={action.text[language]}
                  href={action.href}
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-primary-500/30 hover:scale-105"
                >
                  {actionIcons[action.icon]}
                  {action.text[language]}
                </Link>
              ) : (
                <Link
                  key={action.text[language]}
                  href={action.href}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {actionIcons[action.icon]}
                  {action.text[language]}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
    </section>
  );
}

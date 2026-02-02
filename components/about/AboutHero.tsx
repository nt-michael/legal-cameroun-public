'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { aboutHeroData } from '@/lib/about-data';
import { useLanguage } from '@/contexts/LanguageContext';

const heroText = {
  badge: { fr: 'À Propos de Nous', en: 'About Us' },
  bookConsultation: { fr: 'Réserver une consultation', en: 'Book a consultation' },
  discoverServices: { fr: 'Découvrez nos services', en: 'Discover our services' },
};

interface ParticleStyle {
  width: number;
  height: number;
  left: number;
}

export default function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
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
      // Title letters stagger animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        );
      }

      // Content fade in
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.4, ease: 'power2.out' }
        );
      }

      // Stats fade in
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 1, ease: 'back.out(1.7)' }
        );
      }

      // Gentle floating animation for decorative elements
      gsap.to('.hero-float', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

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
      className="relative min-h-[90vh] flex items-center overflow-hidden"
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
      <div className="hero-float absolute top-20 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
      <div className="hero-float absolute bottom-32 right-20 w-48 h-48 bg-primary-400/10 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      <div className="hero-float absolute top-1/2 left-1/4 w-24 h-24 bg-primary-600/10 rounded-full blur-xl" style={{ animationDelay: '0.5s' }} />

      {/* Map lines decoration (subtle) */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M100 400 Q 400 200, 600 400 T 1100 400" stroke="currentColor" strokeWidth="1" className="text-primary-400" strokeDasharray="10 5" />
          <path d="M200 500 Q 500 300, 700 500 T 1000 300" stroke="currentColor" strokeWidth="1" className="text-primary-300" strokeDasharray="10 5" />
          <circle cx="200" cy="400" r="8" fill="currentColor" className="text-primary-500" />
          <circle cx="600" cy="350" r="8" fill="currentColor" className="text-primary-400" />
          <circle cx="900" cy="450" r="8" fill="currentColor" className="text-primary-300" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6">
            {heroText.badge[language]}
          </span>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {aboutHeroData.welcomeText[language]}
          </h1>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-xl text-gray-300">
              {aboutHeroData.tagline[language]}
            </p>
            <p className="text-2xl font-semibold text-primary-300">
              {aboutHeroData.highlight[language]}
            </p>
            <p className="text-lg text-gray-300">
              {aboutHeroData.description[language]}<br />
              <span className="text-white font-semibold">{aboutHeroData.values[language]}</span>
            </p>
            <p className="text-gray-400">
              {aboutHeroData.origin[language]}
            </p>
            <p className="text-gray-300 italic">
              {aboutHeroData.promise[language]}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/prendre-un-rendez-vous"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-primary-500/30 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {heroText.bookConsultation[language]}
              </Link>
              <Link
                href="/creation-entreprise"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                {heroText.discoverServices[language]}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            {aboutHeroData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label[language]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
    </section>
  );
}

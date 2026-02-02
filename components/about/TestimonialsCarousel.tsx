'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonialsData } from '@/lib/about-data';
import { useLanguage } from '@/contexts/LanguageContext';

const sectionText = {
  badge: { fr: 'Témoignages', en: 'Testimonials' },
  title: { fr: 'Ce Que Disent Nos Entrepreneurs', en: 'What Our Entrepreneurs Say' },
  subtitle: { fr: 'La satisfaction de nos clients est notre plus belle récompense', en: 'Our clients\' satisfaction is our greatest reward' },
  paused: { fr: 'En pause', en: 'Paused' },
  autoScroll: { fr: 'Défilement automatique', en: 'Auto-scrolling' },
};

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const { language } = useLanguage();

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

  useEffect(() => {
    const section = sectionRef.current;
    const carousel = carouselRef.current;
    if (!section || !carousel) return;

    const ctx = gsap.context(() => {
      // Section fade in
      gsap.fromTo(
        section.querySelector('.carousel-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Infinite horizontal drift animation
      const totalWidth = carousel.scrollWidth / 2;
      animationRef.current = gsap.to(carousel, {
        x: -totalWidth,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (animationRef.current) {
      if (isPaused) {
        animationRef.current.pause();
      } else {
        animationRef.current.resume();
      }
    }
  }, [isPaused]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Header */}
      <div className="carousel-header max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium mb-4">
          {sectionText.badge[language]}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {sectionText.title[language]}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {sectionText.subtitle[language]}
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-amber-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-amber-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />

        <div
          ref={carouselRef}
          className="flex gap-6 px-4"
          style={{ width: 'fit-content' }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.author}-${index}`}
              className="w-[350px] shrink-0 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-500 mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote[language]}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role[language]}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pause indicator */}
      <div className="text-center mt-8">
        <span className={`inline-flex items-center gap-2 text-sm ${isPaused ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'}`}>
          {isPaused ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
              {sectionText.paused[language]}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              {sectionText.autoScroll[language]}
            </>
          )}
        </span>
      </div>
    </section>
  );
}

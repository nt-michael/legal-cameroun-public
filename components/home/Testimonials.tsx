'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonials = [
  {
    id: 1,
    content: {
      fr: "Je tiens à exprimer ma satisfaction quant aux services exceptionnels offerts par RODEC Conseils vers qui le site m'a redirigé. Leurs compétences dans la transmission et l'acquisition d'entreprises ont grandement facilité nos processus.",
      en: "I want to express my satisfaction with the exceptional services offered by RODEC Conseils, to whom the site redirected me. Their expertise in business transfers and acquisitions greatly facilitated our processes.",
    },
    author: 'Laurent NORTH',
    role: { fr: 'Directeur, BlueWindow Ltd', en: 'Director, BlueWindow Ltd' },
    rating: 5,
    image: '/testimonials/laurent-north.png',
  },
  {
    id: 2,
    content: {
      fr: "Grâce à RODEC Conseils, nous avons pu mener à bien nos opérations de manière fluide et efficace. Leur expertise en fusions et acquisitions ainsi que leur soutien en secrétariat juridique ont largement dépassé nos attentes.",
      en: "Thanks to RODEC Conseils, we were able to carry out our operations smoothly and efficiently. Their expertise in mergers and acquisitions as well as their legal secretariat support far exceeded our expectations.",
    },
    author: 'Romeo FOKO',
    role: { fr: 'Associé, Pategou Consulting', en: 'Partner, Pategou Consulting' },
    rating: 5,
    image: '/testimonials/romeo-foko.png',
  },
  {
    id: 3,
    content: {
      fr: "L'accompagnement de RODEC Conseils en secrétariat juridique et expertise comptable a été indispensable pour maintenir notre conformité légale à un niveau optimal.",
      en: "RODEC Conseils' support in legal secretariat and accounting expertise was essential in maintaining our legal compliance at an optimal level.",
    },
    author: 'Calvin JOB',
    role: { fr: 'Fondateur, Calvin Job & Partners', en: 'Founder, Calvin Job & Partners' },
    rating: 5,
    image: '/testimonials/calvin-job.png',
  },
  {
    id: 4,
    content: {
      fr: "Nous avons été impressionnés par la qualité des conseils prodigués par leur équipe. Je recommande sans hésitation RODEC Conseils à toute entreprise cherchant un partenaire de confiance.",
      en: "We were impressed by the quality of advice provided by their team. I unhesitatingly recommend RODEC Conseils to any business seeking a trusted partner.",
    },
    author: 'Marius TOLOLO',
    role: { fr: 'Directeur, TECTRA Benin', en: 'Director, TECTRA Benin' },
    rating: 5,
    image: '/testimonials/marius-tololo.png',
  },
];

const sectionText = {
  badge: { fr: 'Temoignages', en: 'Testimonials' },
  title: { fr: 'Ce Que Disent Nos Clients', en: 'What Our Clients Say' },
  subtitle: {
    fr: 'La satisfaction de nos clients est notre plus belle recompense. Decouvrez leurs experiences avec notre cabinet.',
    en: 'Our clients\' satisfaction is our greatest reward. Discover their experiences with our firm.',
  },
  prevLabel: { fr: 'Temoignage precedent', en: 'Previous testimonial' },
  nextLabel: { fr: 'Temoignage suivant', en: 'Next testimonial' },
  goToLabel: { fr: 'Aller au temoignage', en: 'Go to testimonial' },
  paused: { fr: 'En pause', en: 'Paused' },
  autoplay: { fr: 'Lecture automatique', en: 'Auto-playing' },
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { language } = useLanguage();

  const goToTestimonial = useCallback((index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  }, [isAnimating, activeIndex]);

  const nextTestimonial = useCallback(() => {
    goToTestimonial((activeIndex + 1) % testimonials.length);
  }, [activeIndex, goToTestimonial]);

  const prevTestimonial = useCallback(() => {
    goToTestimonial((activeIndex - 1 + testimonials.length) % testimonials.length);
  }, [activeIndex, goToTestimonial]);

  useEffect(() => {
    if (isPaused || !inView) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isPaused, inView, nextTestimonial]);

  return (
    <section className="section-padding text-white overflow-hidden relative" style={{ background: 'linear-gradient(to bottom right, #0a3d4f, #083242, #041c28)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary-400/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary-400/20 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary-300/30 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '4.5s', animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-4">
            {sectionText.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {sectionText.title[language]}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {sectionText.subtitle[language]}
          </p>
        </div>

        <div
          ref={ref}
          className={`relative ${inView ? 'animate-fade-in' : 'opacity-0'}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute top-0 left-0 text-primary-700 opacity-30 animate-float" style={{ animationDuration: '6s' }}>
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div className="absolute bottom-0 right-0 text-primary-700 opacity-20 animate-float rotate-180" style={{ animationDuration: '7s', animationDelay: '1s' }}>
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div className="relative max-w-4xl mx-auto text-center px-8">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-secondary-400 transition-all duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{
                    animation: inView ? `starPop 0.4s ease-out ${i * 0.1}s both` : 'none',
                  }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <div className="relative overflow-hidden min-h-[160px]">
              <blockquote
                className={`text-xl sm:text-2xl font-light leading-relaxed mb-8 transition-all duration-300 ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                &ldquo;{testimonials[activeIndex].content[language]}&rdquo;
              </blockquote>
            </div>

            <div
              className={`flex items-center justify-center gap-4 transition-all duration-300 ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg shadow-primary-600/30 ring-4 ring-white/10">
                <Image
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].author}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">{testimonials[activeIndex].author}</p>
                <p className="text-gray-400">{testimonials[activeIndex].role[language]}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 flex items-center justify-center transition-all duration-300 active:scale-95"
              aria-label={sectionText.prevLabel[language]}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? 'bg-primary-400 w-8'
                      : 'bg-white/30 hover:bg-white/50 w-3'
                  }`}
                  aria-label={`${sectionText.goToLabel[language]} ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 flex items-center justify-center transition-all duration-300 active:scale-95"
              aria-label={sectionText.nextLabel[language]}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-gray-500' : 'bg-primary-400 animate-pulse'}`} />
              {isPaused ? sectionText.paused[language] : sectionText.autoplay[language]}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

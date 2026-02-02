'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { useLanguage } from '@/contexts/LanguageContext';

const heroContent = {
  badge: {
    fr: 'Cabinet d\'Avocats de Premier Plan au Cameroun',
    en: 'Leading Law Firm in Cameroon',
  },
  title1: {
    fr: 'Votre Partenaire Juridique',
    en: 'Your Trusted Legal',
  },
  title2: {
    fr: 'de Confiance',
    en: 'Partner',
  },
  subtitle: {
    fr: 'Expertise juridique d\'excellence pour les entreprises et les particuliers. Plus de 15 ans d\'experience au service de vos interets.',
    en: 'Excellence in legal expertise for businesses and individuals. Over 15 years of experience serving your interests.',
  },
  ctaPrimary: {
    fr: 'Consultation Gratuite',
    en: 'Free Consultation',
  },
  ctaSecondary: {
    fr: 'Nos Services',
    en: 'Our Services',
  },
  badges: [
    { fr: '+500 Clients Satisfaits', en: '+500 Satisfied Clients' },
    { fr: '15+ Ans d\'Experience', en: '15+ Years of Experience' },
    { fr: '98% Taux de Succes', en: '98% Success Rate' },
  ],
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const scene = new THREE.Scene();
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let isVisible = true;
    let animationId: number;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener('resize', handleResize);

    // Visibility observer - pause animation when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    if (section) {
      observer.observe(section);
    }

    // Animation loop - only runs when visible
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return;

      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0005;

      // Smooth mouse follow
      particlesMesh.rotation.x += mouseY * 0.0003;
      particlesMesh.rotation.y += mouseX * 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)' }}>
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-down">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-primary-300 text-sm font-medium mb-6">
            {heroContent.badge[language]}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up animation-delay-100">
          {heroContent.title1[language]}
          <span className="block gradient-text-gold">{heroContent.title2[language]}</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          {heroContent.subtitle[language]}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
          <Link href="/contact" className="btn-primary text-lg px-8 py-4">
            {heroContent.ctaPrimary[language]}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/services" className="btn-secondary text-lg px-8 py-4 border-white/30 text-white hover:bg-white hover:text-gray-900">
            {heroContent.ctaSecondary[language]}
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-in-up animation-delay-400">
          {heroContent.badges.map((badge) => (
            <div key={badge.fr} className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{badge[language]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

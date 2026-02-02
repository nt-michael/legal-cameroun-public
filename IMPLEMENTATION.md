# Legal Cameroun Website - Complete Implementation Guide

## Project Context

Modern legal services website for Legal Cameroun (by RODEC Conseils) featuring:
- Clean, minimal navigation inspired by Apple Siri and Ventriloc
- Advanced animations using Three.js, GSAP, and Anime.js
- WordPress backend integration for blog (headless CMS approach)
- Bilingual support (French/English)
- Full SEO optimization

## Architecture Overview

### Frontend Stack
- **Framework:** Next.js 16 (App Router)
- **React:** 19.x
- **Styling:** Tailwind CSS 4
- **Animations:** Three.js, GSAP, Anime.js
- **Forms:** React Hook Form + Zod validation
- **SEO:** next-seo, next-sitemap
- **CMS:** WordPress (Headless) via REST API or GraphQL (WPGraphQL)

### WordPress Integration
WordPress serves as the backend CMS for:
- Blog posts
- Case studies
- Guides & resources
- Team members
- Testimonials (manageable via admin)

Frontend fetches content via WordPress REST API or WPGraphQL.

---

## Installation & Setup

### 1. Initialize Next.js Project
```bash
npx create-next-app@latest legal-cameroun
cd legal-cameroun

# Select options:
# ✓ TypeScript: Yes
# ✓ ESLint: Yes
# ✓ Tailwind CSS: Yes
# ✓ src/ directory: No
# ✓ App Router: Yes
# ✓ Import alias: Yes (@/*)
```

### 2. Install Dependencies
```bash
# Core dependencies
npm install three gsap animejs react-intersection-observer

# Form handling
npm install react-hook-form zod @hookform/resolvers

# WordPress integration
npm install axios

# SEO
npm install next-sitemap

# Type definitions
npm install -D @types/three
```

### 3. Project Structure
```
legal-cameroun/
├── public/
│   ├── images/
│   │   ├── logo-blue.png
│   │   ├── logo-white.png
│   │   └── testimonials/
│   └── models/              # 3D models for Three.js
├── app/
│   ├── layout.tsx
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Global styles & Tailwind theme
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── constitution/page.tsx
│   │   ├── modification/page.tsx
│   │   └── [service]/page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Stats.tsx
│   │   └── BlogPreview.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   └── animations/
│       ├── ParticleBackground.tsx
│       ├── ScrollReveal.tsx
│       └── NumberCounter.tsx
├── lib/
│   ├── wordpress.ts         # WordPress API functions
│   ├── constants.ts
│   └── utils.ts
├── types/
│   ├── wordpress.ts
│   └── index.ts
├── .env.local
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
└── package.json
```

---

## Complete Code Implementation

### 1. Environment Variables

Create `.env.local`:
```env
# WordPress API
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://legalcameroun.com
NEXT_PUBLIC_SITE_NAME=Legal Cameroun

# Contact Form (optional - for email service)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

### 2. Next.js Configuration

`next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'legalcameroun.com',
      },
      {
        protocol: 'https',
        hostname: 'your-wordpress-site.com',
      },
    ],
  },
};

export default nextConfig;
```

### 3. Tailwind CSS 4 Configuration

Tailwind CSS 4 uses CSS-based configuration instead of a JS config file. Custom theme values are defined in `app/globals.css` using `@theme`.

**Note:** Tailwind 4 auto-detects content files, so no `content` configuration is needed.

### 4. Global Styles

`app/globals.css`:
```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  /* Primary color palette */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e3a8a;
  --color-primary-900: #1e293b;

  /* Custom animations */
  --animate-fade-in-down: fadeInDown 0.5s ease-out;
  --animate-fade-in-up: fadeInUp 0.5s ease-out;
  --animate-scale-in: scaleIn 0.5s ease-out;
  --animate-bounce-slow: bounce-slow 3s ease-in-out infinite;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

@keyframes fadeInDown {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

/* Glassmorphism utility */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Gradient Text utility */
.gradient-text {
  color: transparent;
  background-clip: text;
  background-image: linear-gradient(to right, #2563eb, #06b6d4);
}

/* Card Hover Effect */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2563eb;
}

/* Selection */
::selection {
  background: #3b82f6;
  color: white;
}

/* Focus Visible */
*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

### 5. ESLint Configuration

`eslint.config.mjs`:
```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

### 6. WordPress Integration

`lib/wordpress.ts`:
```typescript
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';

export interface Post {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export async function getPosts(perPage: number = 10): Promise<Post[]> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?_embed&per_page=${perPage}`,
    {
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return null;
  }

  const posts = await res.json();
  return posts[0] || null;
}

export async function getPostsByCategory(
  categoryId: number,
  perPage: number = 10
): Promise<Post[]> {
  const res = await fetch(
    `${WORDPRESS_API_URL}/posts?categories=${categoryId}&_embed&per_page=${perPage}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts by category');
  }

  return res.json();
}
```

### 7. Root Layout

`app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legal Cameroun - Expert Juridique au Cameroun",
  description:
    "Accompagnement juridique complet pour entreprises par des experts assermentés. Création, modification, dissolution de sociétés au Cameroun.",
  keywords:
    "création entreprise cameroun, services juridiques, expert comptable douala, constitution société",
  openGraph: {
    title: "Legal Cameroun - Expert Juridique au Cameroun",
    description: "Accompagnement juridique complet pour entreprises",
    url: "https://legalcameroun.com",
    siteName: "Legal Cameroun",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### 8. Header Component

`components/layout/Header.tsx`:
```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Constitution de Sociétés', href: '/services/constitution' },
    { name: 'Modification d\'Entreprise', href: '/services/modification' },
    { name: 'Secrétariat Juridique', href: '/services/secretariat' },
    { name: 'Immobilier', href: '/services/immobilier' },
    { name: 'Transmission & Acquisition', href: '/services/transmission' },
    { name: 'Comptabilité', href: '/services/comptabilite' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/images/logo-blue.png"
              alt="Legal Cameroun"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === '/' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === '/about' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              About Us
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`text-sm font-medium transition-colors hover:text-blue-600 flex items-center ${
                  pathname.startsWith('/services')
                    ? 'text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                Services
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
                    activeDropdown === 'services' ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fadeInDown">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link
                      href="/services"
                      className="block px-4 py-3 text-sm text-blue-600 font-medium hover:bg-blue-50"
                    >
                      Voir tous les services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === '/pricing' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === '/contact' ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-1">
              <button className="px-3 py-1 text-xs font-medium bg-white text-blue-600 rounded-full">
                FR
              </button>
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-blue-600">
                EN
              </button>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-all hover:shadow-lg hover:scale-105"
            >
              Consultation Gratuite →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-fadeInDown">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-blue-600 py-2">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 py-2">
                About Us
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 py-2">
                Services
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 py-2">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 py-2">
                Contact
              </Link>
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-full text-center font-medium mt-4"
              >
                Consultation Gratuite
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
```

### 9. Hero Component with Three.js

`components/home/Hero.tsx`:
```typescript
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import Link from 'next/link';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.03;

      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // GSAP animations
    gsap.from('.hero-title', {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });

    gsap.from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
    });

    gsap.from('.hero-cta', {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.7,
      stagger: 0.2,
      ease: 'power3.out',
    });

    gsap.from('.hero-stats', {
      y: 20,
      opacity: 0,
      duration: 1,
      delay: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6">
          Votre Partenaire Juridique
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            de Confiance
          </span>
          <br />
          au Cameroun
        </h1>

        <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Accompagnement juridique complet pour entreprises
          <br />
          par des experts assermentés
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/services"
            className="hero-cta bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-all hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center"
          >
            Créer Mon Entreprise
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <Link
            href="/contact"
            className="hero-cta bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-all hover:scale-105"
          >
            Consultation Gratuite
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="hero-stats">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">15,000+</div>
            <div className="text-gray-400 text-sm md:text-base">Entreprises Créées</div>
          </div>
          <div className="hero-stats">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">8</div>
            <div className="text-gray-400 text-sm md:text-base">Ans d'Expérience</div>
          </div>
          <div className="hero-stats">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">2</div>
            <div className="text-gray-400 text-sm md:text-base">Bureaux en Afrique</div>
          </div>
          <div className="hero-stats">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400 text-sm md:text-base">En Ligne</div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

### 10. Homepage

`app/page.tsx`:
```typescript
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import BlogPreview from '@/components/home/BlogPreview';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <Stats />
      <BlogPreview />
      <CTASection />
    </>
  );
}
```

### 11. Blog Integration

`app/blog/page.tsx`:
```typescript
import { getPosts } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';

export default async function BlogPage() {
  const posts = await getPosts(12);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog & Ressources
          </h1>
          <p className="text-xl text-gray-600">
            Guides, actualités et conseils juridiques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              {post._embedded?.['wp:featuredmedia']?.[0] && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                <h2
                  className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                <div
                  className="text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />

                <div className="mt-4 flex items-center text-blue-600 font-medium">
                  Lire la suite
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

`app/blog/[slug]/page.tsx`:
```typescript
import { getPostBySlug, getPosts } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export async function generateStaticParams() {
  const posts = await getPosts(100);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <div className="text-sm text-gray-500 mb-4">
            {new Date(post.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {post._embedded?.['wp:featuredmedia']?.[0] && (
            <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post._embedded['wp:featuredmedia'][0].alt_text || ''}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Besoin d'Aide Juridique?
          </h3>
          <p className="text-blue-100 mb-6">
            Nos experts sont là pour vous accompagner
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </article>
  );
}
```

---

## WordPress Setup Instructions

### 1. Install WordPress
```bash
# Standard WordPress installation
# Or use Local by Flywheel, XAMPP, or MAMP
```

### 2. Install Required Plugins
```
1. WPGraphQL (optional, if using GraphQL)
2. Advanced Custom Fields (for custom fields)
3. Yoast SEO (for SEO optimization)
4. WP REST API Controller (for API management)
```

### 3. Configure Permalinks

Go to **Settings → Permalinks** and set to "Post name"

### 4. Enable REST API

WordPress REST API is enabled by default. Test at:
```
https://your-site.com/wp-json/wp/v2/posts
```

### 5. Create Custom Post Types (Optional)

For case studies, testimonials, etc., add to `functions.php`:
```php
function create_case_study_post_type() {
    register_post_type('case_study',
        array(
            'labels' => array(
                'name' => __('Case Studies'),
                'singular_name' => __('Case Study')
            ),
            'public' => true,
            'has_archive' => true,
            'show_in_rest' => true,
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt')
        )
    );
}
add_action('init', 'create_case_study_post_type');
```

---

## Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

### 2. Build for Production
```bash
npm run build
npm start
```

### 3. Deploy

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

---

## Testing Checklist

- [ ] All pages load without errors
- [ ] Three.js animations work smoothly
- [ ] GSAP scroll animations trigger correctly
- [ ] Mobile responsive on all devices
- [ ] WordPress blog posts load
- [ ] Forms submit successfully
- [ ] SEO meta tags present
- [ ] Core Web Vitals pass
- [ ] Accessibility (WCAG AA)
- [ ] Cross-browser compatibility

---

## Performance Optimization

### 1. Image Optimization
- Use Next.js Image component
- Convert to WebP/AVIF
- Lazy load below fold

### 2. Code Splitting
- Dynamic imports for heavy components
- Lazy load Three.js only on hero

### 3. Caching
- Enable ISR (Incremental Static Regeneration)
- Set revalidation times for WordPress content

### 4. Bundle Optimization
- Tree shaking
- Minification
- Remove unused CSS

---

## SEO Configuration

### 1. Install next-sitemap
```bash
npm install next-sitemap
```

Create `next-sitemap.config.js`:
```javascript
module.exports = {
  siteUrl: 'https://legalcameroun.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
```

Add to `package.json`:
```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

### 2. Meta Tags per Page

Use `next-seo` for dynamic meta tags based on content.

---

## Maintenance & Updates

### Regular Tasks
1. Update dependencies monthly
2. WordPress security updates
3. Backup database weekly
4. Monitor Core Web Vitals
5. Review analytics monthly
6. Update blog content regularly

---

## Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Three.js Docs:** https://threejs.org/docs
- **GSAP Docs:** https://greensock.com/docs/
- **WordPress REST API:** https://developer.wordpress.org/rest-api/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## Project Completion Checklist

### Phase 1: Foundation ✓
- [x] Project setup
- [x] Header component
- [x] Footer component
- [x] Basic routing

### Phase 2: Core Pages
- [ ] Homepage with all sections
- [ ] About page
- [ ] Services pages
- [ ] Pricing page
- [ ] Contact page

### Phase 3: WordPress Integration
- [ ] WordPress setup
- [ ] API integration
- [ ] Blog listing page
- [ ] Blog post template

### Phase 4: Animations
- [ ] Three.js hero
- [ ] GSAP scroll animations
- [ ] Anime.js counters
- [ ] Micro-interactions

### Phase 5: Polish
- [ ] SEO optimization
- [ ] Performance tuning
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Mobile optimization

### Phase 6: Launch
- [ ] Production build
- [ ] Deploy to hosting
- [ ] DNS configuration
- [ ] SSL certificate
- [ ] Analytics setup
- [ ] Monitoring setup

---

**End of Implementation Guide**

This document contains everything needed to build Legal Cameroun from scratch. Follow the phases sequentially for best results.

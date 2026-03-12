import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import BlogPreview from '@/components/home/BlogPreview';
import CTASection from '@/components/home/CTASection';
import { getFeaturedPosts } from '@/lib/wordpress';
import { transformPosts } from '@/lib/wordpress-utils';
import { createPageMetadata } from '@/lib/seo-utils';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/', {
    fr: {
      title: "Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale",
      description: "Créez votre entreprise, modifiez vos statuts ou obtenez un conseil fiscal expert au Cameroun. +15 000 entrepreneurs accompagnés. Réponse sous 48h.",
      keywords: "legal cameroun, création entreprise cameroun, accompagnement juridique douala, conseil fiscal cameroun, droit des affaires OHADA",
      openGraph: {
        title: "Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale",
        description: "Créez votre entreprise, modifiez vos statuts ou obtenez un conseil fiscal expert au Cameroun. +15 000 entrepreneurs accompagnés. Réponse sous 48h.",
        type: 'website',
        url: 'https://legalcameroun.com',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale",
        description: "Créez votre entreprise, modifiez vos statuts ou obtenez un conseil fiscal expert au Cameroun. +15 000 entrepreneurs accompagnés. Réponse sous 48h.",
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com',
          'en': 'https://legalcameroun.com',
          'x-default': 'https://legalcameroun.com',
        },
      },
    },
    en: {
      title: "Legal Cameroun | Your LegalTech in Cameroon | Legal, Accounting & Tax Platform",
      description: "Create your company, amend your articles or get expert tax advice in Cameroon. +15,000 entrepreneurs supported. Response within 48h.",
      keywords: "legal cameroun, company formation cameroon, legal services douala, tax advice cameroon, OHADA business law",
      openGraph: {
        title: "Legal Cameroun | Your LegalTech in Cameroon | Legal, Accounting & Tax Platform",
        description: "Create your company, amend your articles or get expert tax advice in Cameroon. +15,000 entrepreneurs supported. Response within 48h.",
        type: 'website',
        url: 'https://legalcameroun.com',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Legal Cameroun | Your LegalTech in Cameroon | Legal, Accounting & Tax Platform",
        description: "Create your company, amend your articles or get expert tax advice in Cameroon. +15,000 entrepreneurs supported. Response within 48h.",
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com',
          'en': 'https://legalcameroun.com',
          'x-default': 'https://legalcameroun.com',
        },
      },
    },
  });
}

export default async function Home() {
  let latestPosts;
  try {
    const wpPosts = await getFeaturedPosts(3);
    latestPosts = wpPosts.length > 0 ? transformPosts(wpPosts) : undefined;
  } catch {
    latestPosts = undefined;
  }

  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <BlogPreview posts={latestPosts} />
      <CTASection />
    </>
  );
}

import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import KeyArguments from '@/components/home/KeyArguments';
import CreationSteps from '@/components/home/CreationSteps';
import HomeTeam from '@/components/home/HomeTeam';
import BlogPreview from '@/components/home/BlogPreview';
import NewsletterSection from '@/components/home/NewsletterSection';
import CTASection from '@/components/home/CTASection';
import LegalFormsPreview from '@/components/home/LegalFormsPreview';
import HomeFAQ from '@/components/home/HomeFAQ';
import { getFeaturedPosts } from '@/lib/wordpress';
import { transformPosts } from '@/lib/wordpress-utils';
import { createPageMetadata } from '@/lib/seo-utils';
import { getRequestLanguage } from '@/lib/lang';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/', {
    fr: {
      title: "Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale",
      description: "Créez votre entreprise, modifiez vos statuts ou obtenez un conseil fiscal expert au Cameroun. +500 entrepreneurs accompagnés. Réponse sous 48h.",
      keywords: "legal cameroun, création entreprise cameroun, accompagnement juridique douala, conseil fiscal cameroun, droit des affaires OHADA",
      openGraph: {
        title: "Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale",
        description: "Créez votre entreprise, modifiez vos statuts ou obtenez un conseil fiscal expert au Cameroun. +500 entrepreneurs accompagnés. Réponse sous 48h.",
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale",
        description: "Créez votre entreprise, modifiez vos statuts ou obtenez un conseil fiscal expert au Cameroun. +500 entrepreneurs accompagnés. Réponse sous 48h.",
      },
    },
    en: {
      title: "Legal Cameroun | Your LegalTech in Cameroon | Legal, Accounting & Tax Platform",
      description: "Create your company, amend your articles or get expert tax advice in Cameroon. +500 entrepreneurs supported. Response within 48h.",
      keywords: "legal cameroun, company formation cameroon, legal services douala, tax advice cameroon, OHADA business law",
      openGraph: {
        title: "Legal Cameroun | Your LegalTech in Cameroon | Legal, Accounting & Tax Platform",
        description: "Create your company, amend your articles or get expert tax advice in Cameroon. +500 entrepreneurs supported. Response within 48h.",
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Legal Cameroun | Your LegalTech in Cameroon | Legal, Accounting & Tax Platform",
        description: "Create your company, amend your articles or get expert tax advice in Cameroon. +500 entrepreneurs supported. Response within 48h.",
      },
    },
  });
}

export default async function Home() {
  const lang = await getRequestLanguage();
  let latestPosts;
  try {
    const wpPosts = await getFeaturedPosts(3);
    // Dates and category names in the page language (English names come from the WP "name_en" field)
    latestPosts = wpPosts.length > 0 ? transformPosts(wpPosts, lang) : undefined;
  } catch {
    latestPosts = undefined;
  }

  return (
    <>
      <Hero />
      <KeyArguments />
      <LegalFormsPreview />
      <CreationSteps />
      <HomeTeam />
      <Services />
      <Testimonials />
      <HomeFAQ />
      <BlogPreview posts={latestPosts} />
      <NewsletterSection />
      <CTASection />
    </>
  );
}

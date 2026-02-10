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

export const metadata: Metadata = {
  title: "Legal Cameroun | Plateforme d'accompagnement juridique, comptable et fiscale au Cameroun",
  description: "Legal Cameroun par RODEC Conseils. Création d'entreprise, modification de statuts, dissolution, liquidation et radiation. Accompagnement juridique, comptable et fiscal expert au Cameroun.",
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com',
      'en': 'https://legalcameroun.com',
      'x-default': 'https://legalcameroun.com',
    },
  },
};

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

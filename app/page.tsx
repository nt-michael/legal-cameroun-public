import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Stats from '@/components/home/Stats';
import BlogPreview from '@/components/home/BlogPreview';
import CTASection from '@/components/home/CTASection';

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

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <BlogPreview />
      <CTASection />
    </>
  );
}

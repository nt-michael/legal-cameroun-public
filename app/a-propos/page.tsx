import { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/a-propos', {
    title: 'À Propos de Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale',
    description: "Découvrez Legal Cameroun, votre partenaire juridique de confiance au Cameroun. 8 ans d'expérience, +15 000 entrepreneurs accompagnés. Bureaux à Douala, Paris et Cotonou.",
    keywords: ['legal cameroun', 'accompagnement juridique douala', 'expertise comptable cameroun', 'legaltech cameroun', 'droit des affaires OHADA'],
    openGraph: {
      title: 'À Propos de Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale',
      description: "Découvrez Legal Cameroun, votre partenaire juridique de confiance au Cameroun. 8 ans d'expérience, +15 000 entrepreneurs accompagnés. Bureaux à Douala, Paris et Cotonou.",
      type: 'website',
      url: 'https://legalcameroun.com/a-propos',
      siteName: 'Legal Cameroun',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'À Propos de Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale',
      description: "Découvrez Legal Cameroun, votre partenaire juridique de confiance au Cameroun. 8 ans d'expérience, +15 000 entrepreneurs accompagnés. Bureaux à Douala, Paris et Cotonou.",
    },
    alternates: {
      languages: {
        'fr': 'https://legalcameroun.com/a-propos',
        'en': 'https://legalcameroun.com/a-propos',
        'x-default': 'https://legalcameroun.com/a-propos',
      },
    },
  });
}

export default function AboutPage() {
  return <AboutPageContent />;
}

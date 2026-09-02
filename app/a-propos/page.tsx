import { Metadata } from 'next';
import AboutPageContent from './AboutPageContent';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/a-propos', {
    fr: {
      title: 'À Propos de Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale',
      description: "Découvrez Legal Cameroun, votre partenaire juridique de confiance au Cameroun. 8 ans d'expérience, +15 000 entrepreneurs accompagnés. Bureaux à Douala, Paris et Cotonou.",
      keywords: ['legal cameroun', 'accompagnement juridique douala', 'expertise comptable cameroun', 'legaltech cameroun', 'droit des affaires OHADA'],
      openGraph: {
        title: 'À Propos de Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale',
        description: "Découvrez Legal Cameroun, votre partenaire juridique de confiance au Cameroun. 8 ans d'expérience, +15 000 entrepreneurs accompagnés. Bureaux à Douala, Paris et Cotonou.",
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'À Propos de Legal Cameroun | Votre LegalTech au Cameroun | Plateforme Juridique, Comptable & Fiscale',
        description: "Découvrez Legal Cameroun, votre partenaire juridique de confiance au Cameroun. 8 ans d'expérience, +15 000 entrepreneurs accompagnés. Bureaux à Douala, Paris et Cotonou.",
      },
    },
    en: {
      title: 'About Us | Legal Cameroun - RODEC Conseils',
      description: 'Learn about Legal Cameroun and the RODEC Conseils team: our mission, values and commitment to businesses in Cameroon.',
      keywords: ['legal cameroun', 'legal services douala', 'accounting cameroon', 'legaltech cameroon', 'OHADA business law'],
      openGraph: {
        title: 'About Us | Legal Cameroun - RODEC Conseils',
        description: 'Learn about Legal Cameroun and the RODEC Conseils team: our mission, values and commitment to businesses in Cameroon.',
        type: 'website',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'About Us | Legal Cameroun - RODEC Conseils',
        description: 'Learn about Legal Cameroun and the RODEC Conseils team: our mission, values and commitment to businesses in Cameroon.',
      },
    },
  });
}

export default function AboutPage() {
  return <AboutPageContent />;
}

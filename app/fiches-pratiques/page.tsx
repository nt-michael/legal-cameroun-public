import { Metadata } from 'next';
import { FichesHero, FichesGrid, FichesFooterCTA } from '@/components/fiches-pratiques';

export const metadata: Metadata = {
  title: 'Fiches Pratiques | Legal Cameroun - Guides Juridiques & Fiscaux',
  description:
    'Guides simples, clairs et concrets pour vos démarches juridiques et fiscales au Cameroun. Téléchargez nos fiches pratiques gratuites.',
  keywords: [
    'fiches pratiques cameroun',
    'guide juridique cameroun',
    'guide fiscal cameroun',
    'prix de transfert cameroun',
    'immatriculation fiscale ATOM',
    'création entreprise cameroun guide',
  ],
  openGraph: {
    title: 'Fiches Pratiques | Legal Cameroun',
    description:
      'Guides simples, clairs et concrets pour vos démarches juridiques et fiscales au Cameroun.',
    type: 'website',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/fiches-pratiques',
      'en': 'https://legalcameroun.com/fiches-pratiques',
      'x-default': 'https://legalcameroun.com/fiches-pratiques',
    },
  },
};

export default function FichesPratiquesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <FichesHero />

      {/* Fiches Grid */}
      <FichesGrid />

      {/* Footer CTA */}
      <FichesFooterCTA />
    </main>
  );
}

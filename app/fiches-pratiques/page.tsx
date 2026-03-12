import { Metadata } from 'next';
import { FichesHero, FichesGrid, FichesFooterCTA } from '@/components/fiches-pratiques';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/fiches-pratiques', {
    fr: {
      title: 'Fiches Pratiques | Guides Juridiques et Fiscaux pour le Cameroun',
      description:
        'Guides pratiques gratuits pour vos démarches juridiques et fiscales au Cameroun. Immatriculation ATOM, prix de transfert, choix de structure et plus. Téléchargeables en PDF.',
      keywords: [
        'fiches pratiques cameroun',
        'guide juridique cameroun',
        'guide fiscal cameroun',
        'prix de transfert cameroun',
        'immatriculation fiscale ATOM',
        'création entreprise cameroun guide',
      ],
      openGraph: {
        title: 'Fiches Pratiques | Guides Juridiques et Fiscaux pour le Cameroun',
        description:
          'Guides pratiques gratuits pour vos démarches juridiques et fiscales au Cameroun. Immatriculation ATOM, prix de transfert, choix de structure et plus. Téléchargeables en PDF.',
        type: 'website',
        url: 'https://legalcameroun.com/fiches-pratiques',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Fiches Pratiques | Guides Juridiques et Fiscaux pour le Cameroun',
        description:
          'Guides pratiques gratuits pour vos démarches juridiques et fiscales au Cameroun. Immatriculation ATOM, prix de transfert, choix de structure et plus. Téléchargeables en PDF.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/fiches-pratiques',
          'en': 'https://legalcameroun.com/fiches-pratiques',
          'x-default': 'https://legalcameroun.com/fiches-pratiques',
        },
      },
    },
    en: {
      title: 'Practical Guides | Legal Cameroun',
      description: 'Practical legal and tax guides for businesses in Cameroon. Free resources from our experts.',
      keywords: [
        'practical guides cameroon',
        'legal guide cameroon',
        'tax guide cameroon',
        'transfer pricing cameroon',
        'ATOM fiscal registration',
        'company formation cameroon guide',
      ],
      openGraph: {
        title: 'Practical Guides | Legal Cameroun',
        description: 'Practical legal and tax guides for businesses in Cameroon. Free resources from our experts.',
        type: 'website',
        url: 'https://legalcameroun.com/fiches-pratiques',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Practical Guides | Legal Cameroun',
        description: 'Practical legal and tax guides for businesses in Cameroon. Free resources from our experts.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/fiches-pratiques',
          'en': 'https://legalcameroun.com/fiches-pratiques',
          'x-default': 'https://legalcameroun.com/fiches-pratiques',
        },
      },
    },
  });
}

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

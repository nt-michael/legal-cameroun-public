import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FichePageTemplate } from '@/components/fiches-pratiques';
import { getFicheBySlug } from '@/lib/fiches-pratiques-data';
import { createPageMetadata } from '@/lib/seo-utils';

const fiche = getFicheBySlug('prix-des-transferts');

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/fiches-pratiques/prix-des-transferts', {
    fr: {
      title: 'Les Règles Camerounaises sur les Prix de Transfert | Legal Cameroun',
      description:
        "Guide pratique complet sur les prix de transfert au Cameroun. Avant et après l'adhésion à l'OCDE. Téléchargez le guide PDF gratuit.",
      keywords: [
        'prix de transfert cameroun',
        'OCDE cameroun',
        'fiscalité internationale cameroun',
        'charges financières déductibles',
        'documentation prix transfert',
      ],
      openGraph: {
        title: 'Les Règles Camerounaises sur les Prix de Transfert',
        description:
          'Guide essentiel pour les groupes et opérations transfrontalières au Cameroun.',
        type: 'article',
        url: 'https://legalcameroun.com/fiches-pratiques/prix-des-transferts',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Les Règles Camerounaises sur les Prix de Transfert | Legal Cameroun',
        description: "Guide pratique complet sur les prix de transfert au Cameroun. Avant et après l'adhésion à l'OCDE. Téléchargez le guide PDF gratuit.",
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/fiches-pratiques/prix-des-transferts',
          'en': 'https://legalcameroun.com/fiches-pratiques/prix-des-transferts',
          'x-default': 'https://legalcameroun.com/fiches-pratiques/prix-des-transferts',
        },
      },
    },
    en: {
      title: 'Transfer Pricing in Cameroon | Legal Cameroun',
      description: 'Practical guide to transfer pricing rules and obligations in Cameroon.',
      keywords: [
        'transfer pricing cameroon',
        'OECD cameroon',
        'international tax cameroon',
        'deductible financial charges',
        'transfer pricing documentation',
      ],
      openGraph: {
        title: 'Transfer Pricing Rules in Cameroon',
        description: 'Essential guide for groups and cross-border operations in Cameroon.',
        type: 'article',
        url: 'https://legalcameroun.com/fiches-pratiques/prix-des-transferts',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Transfer Pricing in Cameroon | Legal Cameroun',
        description: 'Practical guide to transfer pricing rules and obligations in Cameroon.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/fiches-pratiques/prix-des-transferts',
          'en': 'https://legalcameroun.com/fiches-pratiques/prix-des-transferts',
          'x-default': 'https://legalcameroun.com/fiches-pratiques/prix-des-transferts',
        },
      },
    },
  });
}

export default function PrixDesTransfertsPage() {
  if (!fiche) {
    notFound();
  }

  return <FichePageTemplate fiche={fiche} />;
}

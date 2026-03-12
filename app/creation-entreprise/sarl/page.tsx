import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, pricingTiers } from '@/lib/creation-data';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/creation-entreprise/sarl', {
    fr: {
      title: 'Créer une SARL au Cameroun | Legal Cameroun',
      description: 'Créez votre SARL au Cameroun. Structure sécurisée et encadrée, idéale pour PME et commerces stables. Responsabilité limitée, gestion simple. Accompagnement expert en 48h.',
      keywords: ['SARL cameroun', 'créer SARL cameroun', 'société responsabilité limitée cameroun', 'PME cameroun', 'OHADA SARL'],
      openGraph: {
        title: 'Créer une SARL au Cameroun | Legal Cameroun',
        description: 'Créez votre SARL au Cameroun. Structure sécurisée et encadrée, idéale pour PME et commerces stables. Responsabilité limitée, gestion simple. Accompagnement expert en 48h.',
        type: 'website',
        url: 'https://legalcameroun.com/creation-entreprise/sarl',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Créer une SARL au Cameroun | Legal Cameroun',
        description: 'Créez votre SARL au Cameroun. Structure sécurisée et encadrée, idéale pour PME et commerces stables. Responsabilité limitée, gestion simple. Accompagnement expert en 48h.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/creation-entreprise/sarl',
          'en': 'https://legalcameroun.com/creation-entreprise/sarl',
          'x-default': 'https://legalcameroun.com/creation-entreprise/sarl',
        },
      },
    },
    en: {
      title: 'SARL Formation in Cameroon | Legal Cameroun',
      description: 'Create your SARL in Cameroon. Our experts guide you through every step.',
      keywords: ['SARL cameroon', 'create SARL cameroon', 'limited liability company cameroon', 'SME cameroon', 'OHADA SARL'],
      openGraph: {
        title: 'SARL Formation in Cameroon | Legal Cameroun',
        description: 'Create your SARL in Cameroon. Our experts guide you through every step.',
        type: 'website',
        url: 'https://legalcameroun.com/creation-entreprise/sarl',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'SARL Formation in Cameroon | Legal Cameroun',
        description: 'Create your SARL in Cameroon. Our experts guide you through every step.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/creation-entreprise/sarl',
          'en': 'https://legalcameroun.com/creation-entreprise/sarl',
          'x-default': 'https://legalcameroun.com/creation-entreprise/sarl',
        },
      },
    },
  });
}

export default function SARLPage() {
  return (
    <SubpageLayout
      data={subpagesData.sarl}
      pricingTiers={pricingTiers}
    />
  );
}

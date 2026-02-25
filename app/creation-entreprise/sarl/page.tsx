import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, pricingTiers } from '@/lib/creation-data';

export const metadata: Metadata = {
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
};

export default function SARLPage() {
  return (
    <SubpageLayout
      data={subpagesData.sarl}
      pricingTiers={pricingTiers}
    />
  );
}

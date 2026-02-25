import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, pricingTiers } from '@/lib/creation-data';

export const metadata: Metadata = {
  title: 'Créer une SAS ou SASU au Cameroun | Legal Cameroun',
  description: 'Créez votre SAS ou SASU au Cameroun. Structure souple, idéale pour startups et projets innovants. Capital libre, gouvernance flexible. Accompagnement expert, traitement en 48h.',
  keywords: ['SAS cameroun', 'SASU cameroun', 'créer SAS cameroun', 'société par actions simplifiée', 'startup cameroun', 'OHADA'],
  openGraph: {
    title: 'Créer une SAS ou SASU au Cameroun | Legal Cameroun',
    description: 'Créez votre SAS ou SASU au Cameroun. Structure souple, idéale pour startups et projets innovants. Capital libre, gouvernance flexible. Accompagnement expert, traitement en 48h.',
    type: 'website',
    url: 'https://legalcameroun.com/creation-entreprise/sas',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Créer une SAS ou SASU au Cameroun | Legal Cameroun',
    description: 'Créez votre SAS ou SASU au Cameroun. Structure souple, idéale pour startups et projets innovants. Capital libre, gouvernance flexible. Accompagnement expert, traitement en 48h.',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/creation-entreprise/sas',
      'en': 'https://legalcameroun.com/creation-entreprise/sas',
      'x-default': 'https://legalcameroun.com/creation-entreprise/sas',
    },
  },
};

export default function SASPage() {
  return (
    <SubpageLayout
      data={subpagesData.sas}
      pricingTiers={pricingTiers}
    />
  );
}

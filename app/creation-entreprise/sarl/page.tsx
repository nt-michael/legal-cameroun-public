import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, pricingTiers } from '@/lib/creation-data';

export const metadata: Metadata = {
  title: 'Creer une SARL au Cameroun | Legal Cameroun',
  description: 'Creez votre SARL au Cameroun. Structure securisee et encadree, ideale pour PME stables. Accompagnement expert, traitement en 48h.',
  keywords: ['sarl cameroun', 'creer sarl', 'creation sarl cameroun', 'societe responsabilite limitee cameroun'],
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

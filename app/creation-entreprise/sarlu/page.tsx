import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, pricingTiers } from '@/lib/creation-data';

export const metadata: Metadata = {
  title: 'Creer une SARLU au Cameroun | Legal Cameroun',
  description: 'Creez une SARLU (EURL) au Cameroun. Structure unipersonnelle avec responsabilite limitee. Accompagnement expert, traitement en 48h.',
  keywords: ['sarlu cameroun', 'eurl cameroun', 'creer sarlu', 'creation eurl cameroun', 'societe unipersonnelle cameroun'],
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/creation-entreprise/sarlu',
      'en': 'https://legalcameroun.com/creation-entreprise/sarlu',
      'x-default': 'https://legalcameroun.com/creation-entreprise/sarlu',
    },
  },
};

export default function SARLUPage() {
  return (
    <SubpageLayout
      data={subpagesData.sarlu}
      pricingTiers={pricingTiers}
    />
  );
}

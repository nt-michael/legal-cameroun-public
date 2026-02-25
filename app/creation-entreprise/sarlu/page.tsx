import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, pricingTiers } from '@/lib/creation-data';

export const metadata: Metadata = {
  title: 'Créer une SARLU au Cameroun | Entreprise Unipersonnelle',
  description: 'Créez votre SARLU (société unipersonnelle) au Cameroun. Responsabilité limitée pour un seul associé, idéale pour les entrepreneurs solo. Traitement en 48h.',
  keywords: ['SARLU cameroun', 'EURL cameroun', 'entreprise unipersonnelle cameroun', 'société unipersonnelle', 'créer SARLU OHADA'],
  openGraph: {
    title: 'Créer une SARLU au Cameroun | Entreprise Unipersonnelle',
    description: 'Créez votre SARLU (société unipersonnelle) au Cameroun. Responsabilité limitée pour un seul associé, idéale pour les entrepreneurs solo. Traitement en 48h.',
    type: 'website',
    url: 'https://legalcameroun.com/creation-entreprise/sarlu',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Créer une SARLU au Cameroun | Entreprise Unipersonnelle',
    description: 'Créez votre SARLU (société unipersonnelle) au Cameroun. Responsabilité limitée pour un seul associé, idéale pour les entrepreneurs solo. Traitement en 48h.',
  },
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

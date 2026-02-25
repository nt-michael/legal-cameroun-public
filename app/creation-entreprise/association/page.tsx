import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, associationPricingTiers } from '@/lib/creation-data';

export const metadata: Metadata = {
  title: 'Créer une Association au Cameroun | Legal Cameroun',
  description: 'Créez votre association au Cameroun facilement. Structure idéale pour projets culturels, caritatifs ou éducatifs. Déclaration simplifiée, accompagnement complet.',
  keywords: ['association cameroun', 'créer association cameroun', 'ONG cameroun', 'association culturelle cameroun', 'déclaration association'],
  openGraph: {
    title: 'Créer une Association au Cameroun | Legal Cameroun',
    description: 'Créez votre association au Cameroun facilement. Structure idéale pour projets culturels, caritatifs ou éducatifs. Déclaration simplifiée, accompagnement complet.',
    type: 'website',
    url: 'https://legalcameroun.com/creation-entreprise/association',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Créer une Association au Cameroun | Legal Cameroun',
    description: 'Créez votre association au Cameroun facilement. Structure idéale pour projets culturels, caritatifs ou éducatifs. Déclaration simplifiée, accompagnement complet.',
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/creation-entreprise/association',
      'en': 'https://legalcameroun.com/creation-entreprise/association',
      'x-default': 'https://legalcameroun.com/creation-entreprise/association',
    },
  },
};

export default function AssociationPage() {
  return (
    <SubpageLayout
      data={subpagesData.association}
      pricingTiers={associationPricingTiers}
    />
  );
}

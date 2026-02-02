import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, associationPricingTiers } from '@/lib/creation-data';

export const metadata: Metadata = {
  title: 'Creer une Association au Cameroun | Legal Cameroun',
  description: 'Creez votre association au Cameroun. Structure ideale pour projets culturels, caritatifs ou educatifs. Accompagnement expert, declaration simplifiee.',
  keywords: ['association cameroun', 'creer association', 'creation association cameroun', 'association loi 1901 cameroun'],
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

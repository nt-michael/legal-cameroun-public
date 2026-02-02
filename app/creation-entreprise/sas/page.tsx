import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, pricingTiers } from '@/lib/creation-data';

export const metadata: Metadata = {
  title: 'Creer une SAS/SASU au Cameroun | Legal Cameroun',
  description: 'Creez votre SAS ou SASU au Cameroun. Structure souple et flexible, ideale pour startups et projets innovants. Accompagnement expert, traitement en 48h.',
  keywords: ['sas cameroun', 'sasu cameroun', 'creer sas', 'creer sasu', 'creation societe cameroun'],
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

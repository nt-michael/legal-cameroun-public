import { Metadata } from 'next';
import { SubpageLayout } from '@/components/creation';
import { subpagesData, associationPricingTiers } from '@/lib/creation-data';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/creation-entreprise/association', {
    fr: {
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
    },
    en: {
      title: 'Association Formation in Cameroon | Legal Cameroun',
      description: 'Register your association in Cameroon. Our experts handle the legal formalities.',
      keywords: ['association cameroon', 'register association cameroon', 'NGO cameroon', 'cultural association cameroon', 'association declaration'],
      openGraph: {
        title: 'Association Formation in Cameroon | Legal Cameroun',
        description: 'Register your association in Cameroon. Our experts handle the legal formalities.',
        type: 'website',
        url: 'https://legalcameroun.com/creation-entreprise/association',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Association Formation in Cameroon | Legal Cameroun',
        description: 'Register your association in Cameroon. Our experts handle the legal formalities.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/creation-entreprise/association',
          'en': 'https://legalcameroun.com/creation-entreprise/association',
          'x-default': 'https://legalcameroun.com/creation-entreprise/association',
        },
      },
    },
  });
}

export default function AssociationPage() {
  return (
    <SubpageLayout
      data={subpagesData.association}
      pricingTiers={associationPricingTiers}
    />
  );
}

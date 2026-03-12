import { Metadata } from 'next';
import CreationPageContent from './CreationPageContent';
import { createPageMetadata } from '@/lib/seo-utils';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata('/creation-entreprise', {
    fr: {
      title: "Création d'Entreprise au Cameroun | SAS, SARL, SARLU, Association",
      description: "Créez votre entreprise au Cameroun avec l'aide de nos experts. SAS, SARL, SARLU, Association — immatriculation complète, accompagnement de A à Z. Dès 150 000 FCFA.",
      keywords: ['création entreprise cameroun', 'créer société cameroun', 'SAS cameroun', 'SARL cameroun', 'immatriculation RCCM', 'OHADA'],
      openGraph: {
        title: "Création d'Entreprise au Cameroun | SAS, SARL, SARLU, Association",
        description: "Créez votre entreprise au Cameroun avec l'aide de nos experts. SAS, SARL, SARLU, Association — immatriculation complète, accompagnement de A à Z. Dès 150 000 FCFA.",
        type: 'website',
        url: 'https://legalcameroun.com/creation-entreprise',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Création d'Entreprise au Cameroun | SAS, SARL, SARLU, Association",
        description: "Créez votre entreprise au Cameroun avec l'aide de nos experts. SAS, SARL, SARLU, Association — immatriculation complète, accompagnement de A à Z. Dès 150 000 FCFA.",
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/creation-entreprise',
          'en': 'https://legalcameroun.com/creation-entreprise',
          'x-default': 'https://legalcameroun.com/creation-entreprise',
        },
      },
    },
    en: {
      title: 'Company Formation in Cameroon | Legal Cameroun',
      description: 'Create your SARL, SAS, SARLU or association in Cameroon. Fast, secure and affordable company formation.',
      keywords: ['company formation cameroon', 'incorporate cameroon', 'SAS cameroon', 'SARL cameroon', 'RCCM registration', 'OHADA'],
      openGraph: {
        title: 'Company Formation in Cameroon | Legal Cameroun',
        description: 'Create your SARL, SAS, SARLU or association in Cameroon. Fast, secure and affordable company formation.',
        type: 'website',
        url: 'https://legalcameroun.com/creation-entreprise',
        siteName: 'Legal Cameroun',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Company Formation in Cameroon | Legal Cameroun',
        description: 'Create your SARL, SAS, SARLU or association in Cameroon. Fast, secure and affordable company formation.',
      },
      alternates: {
        languages: {
          'fr': 'https://legalcameroun.com/creation-entreprise',
          'en': 'https://legalcameroun.com/creation-entreprise',
          'x-default': 'https://legalcameroun.com/creation-entreprise',
        },
      },
    },
  });
}

export default function CreationEntreprisePage() {
  return <CreationPageContent />;
}

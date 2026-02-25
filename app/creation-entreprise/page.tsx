import { Metadata } from 'next';
import CreationPageContent from './CreationPageContent';

export const metadata: Metadata = {
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
};

export default function CreationEntreprisePage() {
  return <CreationPageContent />;
}

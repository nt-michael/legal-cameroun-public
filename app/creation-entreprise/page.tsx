import { Metadata } from 'next';
import CreationPageContent from './CreationPageContent';

export const metadata: Metadata = {
  title: 'Creation d\'Entreprise au Cameroun | Legal Cameroun',
  description: 'Creez votre entreprise au Cameroun facilement et rapidement. SAS, SARL, SARLU, Association... Accompagnement par des juristes experts. Traitement en 48h.',
  keywords: ['creation entreprise cameroun', 'creer societe cameroun', 'sas cameroun', 'sarl cameroun', 'sarlu cameroun', 'association cameroun'],
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

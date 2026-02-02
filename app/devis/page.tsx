import { Metadata } from 'next';
import DevisPageContent from './DevisPageContent';

export const metadata: Metadata = {
  title: 'Demande de Devis Gratuit | Legal Cameroun',
  description: 'Obtenez un devis gratuit pour la création de votre entreprise au Cameroun. SAS, SARL, SARLU, Association... Réponse sous 24h.',
  keywords: ['devis creation entreprise', 'devis gratuit cameroun', 'tarif creation societe'],
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/devis',
      'en': 'https://legalcameroun.com/devis',
      'x-default': 'https://legalcameroun.com/devis',
    },
  },
};

export default function DevisPage() {
  return <DevisPageContent />;
}

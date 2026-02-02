import { Metadata } from 'next';
import TransfertSiegeContent from './TransfertSiegeContent';

export const metadata: Metadata = {
  title: 'Transfert de Siège Social Cameroun | Changement Adresse Entreprise',
  description: 'Transférez le siège social de votre entreprise au Cameroun facilement. Accompagnement juridique expert pour le changement d\'adresse de votre société.',
  keywords: ['transfert siège social cameroun', 'changement adresse entreprise', 'déménagement siège société'],
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/gestion-entreprise/transfert-siege',
      'en': 'https://legalcameroun.com/gestion-entreprise/transfert-siege',
      'x-default': 'https://legalcameroun.com/gestion-entreprise/transfert-siege',
    },
  },
};

export default function TransfertSiegePage() {
  return <TransfertSiegeContent />;
}

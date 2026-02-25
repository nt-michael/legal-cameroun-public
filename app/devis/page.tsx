import { Metadata } from 'next';
import DevisPageContent from './DevisPageContent';

export const metadata: Metadata = {
  title: "Devis Gratuit | Création d'Entreprise au Cameroun — Legal Cameroun",
  description: "Obtenez une estimation gratuite pour la création ou modification de votre entreprise au Cameroun. SAS, SARL, SARLU, Association. Réponse personnalisée sous 24h.",
  keywords: ['devis création entreprise cameroun', 'tarif création société', 'devis gratuit SARL SAS cameroun', 'coût immatriculation'],
  openGraph: {
    title: "Devis Gratuit | Création d'Entreprise au Cameroun — Legal Cameroun",
    description: "Obtenez une estimation gratuite pour la création ou modification de votre entreprise au Cameroun. SAS, SARL, SARLU, Association. Réponse personnalisée sous 24h.",
    type: 'website',
    url: 'https://legalcameroun.com/devis',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Devis Gratuit | Création d'Entreprise au Cameroun — Legal Cameroun",
    description: "Obtenez une estimation gratuite pour la création ou modification de votre entreprise au Cameroun. SAS, SARL, SARLU, Association. Réponse personnalisée sous 24h.",
  },
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

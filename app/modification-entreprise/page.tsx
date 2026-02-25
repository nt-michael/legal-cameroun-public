import { Metadata } from 'next';
import GestionPageContent from './GestionPageContent';

export const metadata: Metadata = {
  title: "Modification d'Entreprise au Cameroun | Transfert, Dissolution, Transformation",
  description: "Modifiez les statuts de votre entreprise au Cameroun : transfert de siège social, transformation SAS/SARL, dissolution. Accompagnement juridique expert de A à Z.",
  keywords: ['modification statuts cameroun', 'transfert siège social', 'transformation SAS SARL cameroun', 'dissolution entreprise', 'OHADA modification'],
  openGraph: {
    title: "Modification d'Entreprise au Cameroun | Transfert, Dissolution, Transformation",
    description: "Modifiez les statuts de votre entreprise au Cameroun : transfert de siège social, transformation SAS/SARL, dissolution. Accompagnement juridique expert de A à Z.",
    type: 'website',
    url: 'https://legalcameroun.com/modification-entreprise',
    siteName: 'Legal Cameroun',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Modification d'Entreprise au Cameroun | Transfert, Dissolution, Transformation",
    description: "Modifiez les statuts de votre entreprise au Cameroun : transfert de siège social, transformation SAS/SARL, dissolution. Accompagnement juridique expert de A à Z.",
  },
  alternates: {
    languages: {
      'fr': 'https://legalcameroun.com/modification-entreprise',
      'en': 'https://legalcameroun.com/modification-entreprise',
      'x-default': 'https://legalcameroun.com/modification-entreprise',
    },
  },
};

export default function GestionEntreprisePage() {
  return <GestionPageContent />;
}
